import type { IconName } from "@/components/course-icons";
import type { NodeTone } from "@/lib/diagram";
import type { Locale } from "@/lib/locale";

export type SequenceParticipant = {
  id: string;
  label: string;
  icon: IconName;
  /** Header color; reuse the diagram tone palette for consistency. */
  tone: NodeTone;
};

export type SequenceMessage = {
  id: string;
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
};

export type SequenceBand = {
  label: string;
  /** Band sits directly above the message at this 0-based index. */
  beforeIndex: number;
};

export type SequenceFrame = {
  /** Number of messages revealed in this frame (0 = nothing yet). */
  step: number;
  /** Message revealed in this frame; undefined for the initial frame. */
  activeId?: string;
  note: string;
};

/**
 * Locale-specific user-visible text for a sequence diagram. Only the provided
 * fields are replaced; participant/message ids and topology stay untouched.
 * Vietnamese remains the default, so Vietnamese specs need no overrides.
 */
export type SequenceOverrides = {
  title?: string;
  /** Participant label by id. */
  participants?: Record<string, string>;
  /** Message label by id. */
  messages?: Record<string, string>;
  /** Band label by band index. */
  bands?: Record<number, string>;
};

export type SequenceSpec = {
  title: string;
  participants: SequenceParticipant[];
  messages: SequenceMessage[];
  bands?: SequenceBand[];
  build: (locale?: Locale) => SequenceFrame[];
  overrides?: Partial<Record<Locale, SequenceOverrides>>;
};

export function localizeSequenceSpec(
  spec: SequenceSpec,
  locale: Locale,
): SequenceSpec {
  const overrides = spec.overrides?.[locale];
  if (!overrides) return spec;
  return {
    ...spec,
    title: overrides.title ?? spec.title,
    participants: spec.participants.map((participant) => ({
      ...participant,
      label: overrides.participants?.[participant.id] ?? participant.label,
    })),
    messages: spec.messages.map((message) => ({
      ...message,
      label: overrides.messages?.[message.id] ?? message.label,
    })),
    bands: spec.bands?.map((band, index) => ({
      ...band,
      label: overrides.bands?.[index] ?? band.label,
    })),
  };
}

/* --------------------------------------------------------------------------
 * Layout
 *
 * The renderer measures nothing at runtime: labels wrap and rows size
 * themselves from a pure, deterministic layout so the same geometry can be
 * unit-tested. Widths use a per-character heuristic (no DOM measuring), which
 * is deliberately conservative so real text is never wider than the reserved
 * box. Keep `estimateTextWidth` in sync with the font size used by the SVG.
 * ------------------------------------------------------------------------ */

/** Narrow glyphs that take noticeably less than the average advance width. */
const NARROW_GLYPHS = new Set([
  ".",
  ",",
  ":",
  ";",
  "'",
  "`",
  "|",
  "!",
  "i",
  "l",
  "j",
  "t",
  "f",
  "r",
  "I",
  "/",
  "\\",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
]);

/** Wide glyphs (mostly capitals and round letters). */
const WIDE_GLYPHS = new Set(["m", "w", "M", "W", "@", "%", "·"]);

/**
 * Rough advance width of `text` in user units, using narrow/wide glyph
 * heuristics relative to `fontSize`. This is not a font metric — it is a
 * stable upper-ish bound for layout, so visual smoke checks are still advised.
 */
export function estimateTextWidth(text: string, fontSize: number): number {
  let units = 0;
  for (const char of text) {
    if (char === " ") units += 0.3;
    else if (NARROW_GLYPHS.has(char)) units += 0.34;
    else if (WIDE_GLYPHS.has(char)) units += 0.92;
    else if (char >= "A" && char <= "Z") units += 0.68;
    else if (char >= "0" && char <= "9") units += 0.62;
    else units += 0.56;
  }
  return units * fontSize;
}

export type SequenceLine = { text: string; width: number };

/** Greedy word wrap; a single over-long word is kept whole so it never clips. */
export function wrapLabel(
  text: string,
  maxWidth: number,
  fontSize: number,
): SequenceLine[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && estimateTextWidth(candidate, fontSize) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  if (lines.length === 0) lines.push(text);
  return lines.map((line) => ({
    text: line,
    width: estimateTextWidth(line, fontSize),
  }));
}

export type SequenceLayoutOptions = {
  marginX?: number;
  /** Horizontal distance between adjacent participant lifelines. */
  columnGap?: number;
  headerWidth?: number;
  headerHeight?: number;
  headerY?: number;
  topGap?: number;
  fontSize?: number;
  lineHeight?: number;
  labelPaddingX?: number;
  labelPaddingY?: number;
  /** Vertical gap between the label block and its arrow. */
  labelArrowGap?: number;
  /** Vertical space reserved below an arrow before the next row/band. */
  rowGapAfterArrow?: number;
  bandHeight?: number;
  bandGap?: number;
  bottomPadding?: number;
  /** Hard cap on a wrapped label line; defaults to `columnGap - 24`. */
  maxLabelWidth?: number;
};

export type SequenceLabelBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SequenceMessageLayout = {
  id: string;
  index: number;
  fromX: number;
  toX: number;
  arrowY: number;
  labelX: number;
  lines: SequenceLine[];
  labelBox: SequenceLabelBox;
};

export type SequenceBandLayout = {
  index: number;
  beforeIndex: number;
  y: number;
  height: number;
};

export type SequenceLayout = {
  width: number;
  height: number;
  lifelineTop: number;
  contentBottom: number;
  bandX1: number;
  bandX2: number;
  participants: { id: string; x: number }[];
  bands: SequenceBandLayout[];
  messages: SequenceMessageLayout[];
  options: Required<SequenceLayoutOptions>;
};

export const SEQUENCE_LAYOUT_DEFAULTS: Required<SequenceLayoutOptions> = {
  marginX: 92,
  columnGap: 160,
  headerWidth: 96,
  headerHeight: 64,
  headerY: 42,
  topGap: 40,
  fontSize: 12,
  lineHeight: 15,
  labelPaddingX: 7,
  labelPaddingY: 3,
  labelArrowGap: 7,
  rowGapAfterArrow: 30,
  bandHeight: 30,
  bandGap: 16,
  bottomPadding: 26,
  maxLabelWidth: 136,
};

/**
 * Pure geometry for a sequence diagram. Every message reserves a wrapped label
 * block above its arrow and advances the row cursor by that block's height, so
 * rows never overlap regardless of label length. Callers pass a localized spec.
 */
export function layoutSequence(
  spec: SequenceSpec,
  options: SequenceLayoutOptions = {},
): SequenceLayout {
  const merged: Required<SequenceLayoutOptions> = {
    ...SEQUENCE_LAYOUT_DEFAULTS,
    ...options,
  };
  const opts: Required<SequenceLayoutOptions> = {
    ...merged,
    // Default the wrap width to the gap between adjacent lifelines, so a taller
    // `columnGap` automatically buys wider single-line labels.
    maxLabelWidth: options.maxLabelWidth ?? merged.columnGap - 24,
  };

  const count = spec.participants.length;
  const width = opts.marginX * 2 + Math.max(0, count - 1) * opts.columnGap;
  const xById = new Map(
    spec.participants.map((participant, index) => [
      participant.id,
      opts.marginX + index * opts.columnGap,
    ]),
  );
  const participants = spec.participants.map((participant, index) => ({
    id: participant.id,
    x: opts.marginX + index * opts.columnGap,
  }));

  const lifelineTop = opts.headerY + opts.headerHeight;
  let y = lifelineTop + opts.topGap;

  const bands: SequenceBandLayout[] = [];
  const messages: SequenceMessageLayout[] = [];

  spec.messages.forEach((message, index) => {
    const band = spec.bands?.find((item) => item.beforeIndex === index);
    if (band) {
      bands.push({
        index: bands.length,
        beforeIndex: index,
        y,
        height: opts.bandHeight,
      });
      y += opts.bandHeight + opts.bandGap;
    }

    const lines = wrapLabel(message.label, opts.maxLabelWidth, opts.fontSize);
    const blockHeight = lines.length * opts.lineHeight + opts.labelPaddingY * 2;
    const labelTop = y;
    const arrowY = labelTop + blockHeight + opts.labelArrowGap;
    const fromX = xById.get(message.from) ?? 0;
    const toX = xById.get(message.to) ?? 0;
    const labelX = (fromX + toX) / 2;
    const maxLineWidth = lines.reduce(
      (acc, line) => Math.max(acc, line.width),
      0,
    );
    const blockWidth = maxLineWidth + opts.labelPaddingX * 2;

    messages.push({
      id: message.id,
      index,
      fromX,
      toX,
      arrowY,
      labelX,
      lines,
      labelBox: {
        x: labelX - blockWidth / 2,
        y: labelTop,
        width: blockWidth,
        height: blockHeight,
      },
    });

    y = arrowY + opts.rowGapAfterArrow;
  });

  const lastArrowY =
    messages.length > 0 ? messages[messages.length - 1].arrowY : y;
  const contentBottom = lastArrowY + opts.bottomPadding;

  const bandX1 =
    count > 0 ? opts.marginX - opts.headerWidth / 2 : opts.marginX;
  const bandX2 =
    count > 0
      ? opts.marginX + (count - 1) * opts.columnGap + opts.headerWidth / 2
      : opts.marginX;

  return {
    width,
    height: contentBottom + 8,
    lifelineTop,
    contentBottom,
    bandX1,
    bandX2,
    participants,
    bands,
    messages,
    options: opts,
  };
}
