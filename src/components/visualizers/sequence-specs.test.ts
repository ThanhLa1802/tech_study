import { describe, expect, it } from "vitest";
import { sequenceVisualizers } from "@/components/visualizers/sequence-specs";
import {
  estimateTextWidth,
  layoutSequence,
  localizeSequenceSpec,
  wrapLabel,
  type SequenceLine,
  type SequenceSpec,
} from "@/lib/sequence";

/**
 * These are pure-geometry checks. They prove that reserved label boxes never
 * overlap each other, the arrow, bands, or the participant headers for the
 * shipped spec. They cannot measure real font metrics (no DOM in vitest), so a
 * visual smoke check at desktop and a narrow (≈360px) width is still advised.
 */
const spec = sequenceVisualizers["rest-request-flow"];

type Box = { x: number; y: number; width: number; height: number };

function overlaps(a: Box, b: Box): boolean {
  return (
    a.x < b.x + b.width &&
    b.x < a.x + a.width &&
    a.y < b.y + b.height &&
    b.y < a.y + a.height
  );
}

function totalWidth(lines: SequenceLine[]): number {
  return lines.reduce((acc, line) => Math.max(acc, line.width), 0);
}

describe("sequence label measurement", () => {
  it("scales with font size and distinguishes narrow from wide glyphs", () => {
    expect(estimateTextWidth("", 12)).toBe(0);
    expect(estimateTextWidth("mmm", 12)).toBeGreaterThan(
      estimateTextWidth("iii", 12),
    );
    expect(estimateTextWidth("message", 24)).toBeCloseTo(
      estimateTextWidth("message", 12) * 2,
      5,
    );
  });

  it("wraps on word boundaries and never exceeds the width for normal words", () => {
    const text = "1. GET /users/42 · Authorization: Bearer …";
    const lines = wrapLabel(text, 136, 12);
    expect(lines.length).toBeGreaterThan(1);
    for (const line of lines) {
      expect(line.width).toBeLessThanOrEqual(136 + 1e-9);
    }
    expect(lines.map((line) => line.text).join(" ")).toBe(text);
  });

  it("keeps a single over-long token whole instead of clipping it", () => {
    const token = "https://example.com/very/long/path?query=1234567890";
    const lines = wrapLabel(token, 40, 12);
    expect(lines).toHaveLength(1);
    expect(lines[0].text).toBe(token);
  });
});

describe("REST request sequence spec", () => {
  it("references only known participants in messages", () => {
    const ids = new Set(spec.participants.map((participant) => participant.id));
    for (const message of spec.messages) {
      expect(ids.has(message.from), message.id).toBe(true);
      expect(ids.has(message.to), message.id).toBe(true);
    }
  });

  it("builds one frame per message plus an initial frame", () => {
    const frames = spec.build("vi");
    expect(frames).toHaveLength(spec.messages.length + 1);
    expect(frames[0].step).toBe(0);
    expect(frames[0].activeId).toBeUndefined();
    frames.slice(1).forEach((frame, index) => {
      expect(frame.step).toBe(index + 1);
      expect(frame.activeId).toBe(spec.messages[index].id);
    });
  });

  it("keeps Vietnamese as the default copy", () => {
    const vi = localizeSequenceSpec(spec, "vi");
    expect(vi.messages[1].label).toBe("2. định tuyến (đã xác thực)");
    expect(vi.messages[3].label).toBe("4. trả bản ghi user");
    expect(vi.bands?.[0].label).toBe("Xác thực & định tuyến");
    expect(vi.title).toBe("Luồng một request REST — mô phỏng");
  });

  it("localizes messages, bands, and step notes to English", () => {
    const en = localizeSequenceSpec(spec, "en");
    expect(en.title).toBe("REST request flow — simulation");
    expect(en.messages[1].label).toBe("2. route (already authenticated)");
    expect(en.messages[3].label).toBe("4. return the user row");
    expect(en.bands?.[1].label).toBe("Query the data");
    // Language-neutral labels are preserved, not replaced.
    expect(en.messages[0].label).toBe(spec.messages[0].label);

    const frames = spec.build("en");
    expect(frames[0].note).toContain("Ready");
    expect(frames[2].note).toBe("2. route (already authenticated)");
    expect(frames[4].note).toBe("4. return the user row");
    expect(frames[5].note).toBe("5. 200 OK + JSON");
    expect(frames[6].note).toBe("6. 200 OK + JSON");
  });
});

describe("sequence layout geometry", () => {
  for (const locale of ["vi", "en"] as const) {
    describe(locale, () => {
      const localized = localizeSequenceSpec(spec, locale);
      const layout = layoutSequence(localized);
      const xById = new Map(
        localized.participants.map((participant, index) => [
          participant.id,
          layout.options.marginX + index * layout.options.columnGap,
        ]),
      );

      it("keeps every label block strictly above its arrow", () => {
        for (const message of layout.messages) {
          expect(message.labelBox.y + message.labelBox.height).toBeLessThanOrEqual(
            message.arrowY,
          );
        }
      });

      it("does not overlap consecutive label blocks", () => {
        for (let i = 1; i < layout.messages.length; i++) {
          const prev = layout.messages[i - 1].labelBox;
          const next = layout.messages[i].labelBox;
          expect(next.y).toBeGreaterThanOrEqual(prev.y + prev.height);
        }
      });

      it("does not let bands overlap their next label block", () => {
        for (const band of layout.bands) {
          const message = layout.messages.find(
            (item) => item.index === band.beforeIndex,
          );
          expect(message).toBeDefined();
          expect(band.y + band.height).toBeLessThanOrEqual(
            message!.labelBox.y,
          );
        }
      });

      it("keeps adjacent labels wrapped inside their lifelines", () => {
        for (const message of layout.messages) {
          const fromX = xById.get(localized.messages[message.index].from)!;
          const toX = xById.get(localized.messages[message.index].to)!;
          const isAdjacent =
            Math.abs(fromX - toX) === layout.options.columnGap;
          if (!isAdjacent) continue;
          const minX = Math.min(fromX, toX);
          const maxX = Math.max(fromX, toX);
          expect(message.labelBox.x).toBeGreaterThan(minX);
          expect(message.labelBox.x + message.labelBox.width).toBeLessThan(maxX);
        }
      });

      it("sizes each label box to its wrapped lines", () => {
        for (const message of layout.messages) {
          const { labelBox, lines } = message;
          expect(labelBox.width).toBeCloseTo(
            totalWidth(lines) + layout.options.labelPaddingX * 2,
            5,
          );
          expect(labelBox.height).toBeCloseTo(
            lines.length * layout.options.lineHeight +
              layout.options.labelPaddingY * 2,
            5,
          );
          for (const line of lines) {
            expect(line.width).toBeLessThanOrEqual(
              labelBox.width - layout.options.labelPaddingX * 2 + 1e-9,
            );
          }
        }
      });

      it("keeps everything inside the canvas and below the headers", () => {
        const firstY = Math.min(
          ...layout.messages.map((message) => message.labelBox.y),
          ...layout.bands.map((band) => band.y),
        );
        expect(firstY).toBeGreaterThanOrEqual(layout.lifelineTop);
        for (const message of layout.messages) {
          expect(message.labelBox.x).toBeGreaterThanOrEqual(0);
          expect(
            message.labelBox.x + message.labelBox.width,
          ).toBeLessThanOrEqual(layout.width);
        }
        for (const band of layout.bands) {
          expect(band.y + band.height).toBeLessThanOrEqual(layout.height);
        }
        for (const participant of layout.participants) {
          expect(participant.x).toBeGreaterThan(0);
          expect(participant.x).toBeLessThan(layout.width);
        }
      });

      it("never produces two overlapping label boxes", () => {
        for (let i = 0; i < layout.messages.length; i++) {
          for (let j = i + 1; j < layout.messages.length; j++) {
            expect(
              overlaps(
                layout.messages[i].labelBox,
                layout.messages[j].labelBox,
              ),
            ).toBe(false);
          }
        }
      });
    });
  }

  it("handles an empty message list without producing rows", () => {
    const empty: SequenceSpec = { ...spec, messages: [], bands: [] };
    const layout = layoutSequence(empty);
    expect(layout.messages).toEqual([]);
    expect(layout.height).toBeGreaterThan(layout.lifelineTop);
  });

  it("reserves a box wide enough for an unbreakable token", () => {
    const synthetic: SequenceSpec = {
      title: "synthetic",
      participants: spec.participants,
      messages: [
        {
          id: "long",
          from: "client",
          to: "gateway",
          label: "https://example.com/very/long/path?query=1234567890",
        },
      ],
      build: () => [],
    };
    const layout = layoutSequence(synthetic);
    const box = layout.messages[0].labelBox;
    expect(box.width).toBeGreaterThanOrEqual(
      estimateTextWidth(synthetic.messages[0].label, layout.options.fontSize),
    );
  });
});
