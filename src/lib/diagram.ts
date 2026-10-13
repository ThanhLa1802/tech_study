import type { IconName } from "@/components/course-icons";
import type { Locale } from "./locale";

export type StatTone = "amber" | "rose" | "indigo" | "emerald" | "slate";

export type NodeState = "idle" | "active" | "success" | "warn" | "down";

export type DiagramShape = "box" | "bucket";

/**
 * Static accent for a diagram node, following the asset palette
 * (`asset/dsa-patterns-cheatsheet.html`). Color carries meaning, not
 * decoration: emerald = compute/primary, sky = client/edge, amber = data,
 * violet = infrastructure (network/messaging), rose = danger/down,
 * zinc = muted/neutral. Only applied to nodes in the `idle` state; animation
 * states win.
 */
export type NodeTone = "emerald" | "sky" | "amber" | "rose" | "violet" | "zinc";

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  shape?: DiagramShape;
  capacity?: number;
  tone?: NodeTone;
  /** Optional icon drawn above the label (reuses `Icon`/`course-icons`). */
  icon?: IconName;
};

export type DiagramEdge = {
  id: string;
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

export type DiagramPacket = {
  id: string;
  from: string;
  to: string;
  t: number;
  label?: string;
};

export type DiagramFrame = {
  states: Record<string, NodeState>;
  edgeStates?: Record<string, NodeState>;
  packets?: DiagramPacket[];
  buckets?: Record<string, number>;
  line: number;
  note: string;
  stats: { label: string; value: string | number; tone: StatTone }[];
};

export type DiagramLegendItem = { state: NodeState | "packet"; label: string };

/** Locale-specific text overrides for one diagram node; geometry is preserved. */
export type DiagramNodeText = { label?: string; sub?: string };

/** Locale-specific text overrides for one diagram edge; topology is preserved. */
export type DiagramEdgeText = { label?: string };

/**
 * Locale-specific user-visible text for a diagram. Only the fields provided are
 * replaced; node geometry, ids, and edge topology stay untouched. Vietnamese
 * remains the default, so Vietnamese specs need no overrides.
 */
export type DiagramSpecOverrides = {
  title?: string;
  /** Full pseudocode replacement; use when a line contains natural language. */
  pseudo?: string[];
  legend?: Partial<Record<NodeState | "packet", string>>;
  /** Node label/sub overrides keyed by stable node id. */
  nodes?: Record<string, DiagramNodeText>;
  /** Edge label overrides keyed by stable edge id. */
  edges?: Record<string, DiagramEdgeText>;
};

export type DiagramSpec = {
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  pseudo: string[];
  legend: DiagramLegendItem[];
  build: (locale?: Locale) => DiagramFrame[];
  /** Per-locale overrides keyed by locale; see {@link DiagramSpecOverrides}. */
  overrides?: Partial<Record<Locale, DiagramSpecOverrides>>;
};

/** Applies a spec's locale overrides to its text (title, pseudo, legend, nodes, edges). */
export function localizeDiagramSpec(
  spec: DiagramSpec,
  locale: Locale,
): DiagramSpec {
  const overrides = spec.overrides?.[locale];
  if (!overrides) return spec;
  return {
    ...spec,
    title: overrides.title ?? spec.title,
    pseudo: overrides.pseudo ?? spec.pseudo,
    legend: spec.legend.map((item) => ({
      ...item,
      label: overrides.legend?.[item.state] ?? item.label,
    })),
    nodes: overrides.nodes
      ? spec.nodes.map((node) => {
          const patch = overrides.nodes?.[node.id];
          if (!patch) return node;
          return {
            ...node,
            ...(patch.label !== undefined ? { label: patch.label } : {}),
            ...(patch.sub !== undefined ? { sub: patch.sub } : {}),
          };
        })
      : spec.nodes,
    edges: overrides.edges
      ? spec.edges.map((edge) => {
          const patch = overrides.edges?.[edge.id];
          if (!patch) return edge;
          return patch.label !== undefined
            ? { ...edge, label: patch.label }
            : edge;
        })
      : spec.edges,
  };
}

export type Point = { x: number; y: number };

export function nodeCenter(node: DiagramNode): Point {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

function borderPoint(node: DiagramNode, ux: number, uy: number): Point {
  const center = nodeCenter(node);
  const hw = node.w / 2;
  const hh = node.h / 2;
  const scaleX = ux !== 0 ? hw / Math.abs(ux) : Infinity;
  const scaleY = uy !== 0 ? hh / Math.abs(uy) : Infinity;
  const scale = Math.min(scaleX, scaleY);
  return { x: center.x + ux * scale, y: center.y + uy * scale };
}

export function edgeGeometry(from: DiagramNode, to: DiagramNode) {
  const c1 = nodeCenter(from);
  const c2 = nodeCenter(to);
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const start = borderPoint(from, ux, uy);
  const end = borderPoint(to, -ux, -uy);
  return { start, end, ux, uy };
}

/**
 * Baseline anchor for an edge's label: the midpoint of the drawn segment,
 * lifted slightly above the line. Kept as a pure helper so label placement can
 * be unit-tested without rendering.
 */
export function edgeLabelAnchor(from: DiagramNode, to: DiagramNode): Point {
  const { start, end } = edgeGeometry(from, to);
  return { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 - 8 };
}

export function arrowPoints(tip: Point, ux: number, uy: number, size = 9) {
  const baseX = tip.x - ux * size;
  const baseY = tip.y - uy * size;
  const perpX = -uy;
  const perpY = ux;
  const spread = size * 0.6;
  return [
    `${tip.x},${tip.y}`,
    `${baseX + perpX * spread},${baseY + perpY * spread}`,
    `${baseX - perpX * spread},${baseY - perpY * spread}`,
  ].join(" ");
}

export function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export function diagramBounds(nodes: DiagramNode[], padding = 24) {
  const maxX = nodes.reduce((acc, n) => Math.max(acc, n.x + n.w), 0);
  const maxY = nodes.reduce((acc, n) => Math.max(acc, n.y + n.h), 0);
  return { width: maxX + padding, height: maxY + padding };
}
