import type { Locale } from "./locale";

export type StatTone = "amber" | "rose" | "indigo" | "emerald" | "slate";

export type NodeState = "idle" | "active" | "success" | "warn" | "down";

export type DiagramShape = "box" | "bucket";

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

/**
 * Locale-specific user-visible text for a diagram. Only the fields provided are
 * replaced; node geometry, ids, and edge topology stay untouched. Vietnamese
 * remains the default, so Vietnamese specs need no overrides.
 */
export type DiagramSpecOverrides = {
  title?: string;
  legend?: Partial<Record<NodeState | "packet", string>>;
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

/** Applies a spec's locale overrides to its title and legend labels. */
export function localizeDiagramSpec(
  spec: DiagramSpec,
  locale: Locale,
): DiagramSpec {
  const overrides = spec.overrides?.[locale];
  if (!overrides) return spec;
  return {
    ...spec,
    title: overrides.title ?? spec.title,
    legend: spec.legend.map((item) => ({
      ...item,
      label: overrides.legend?.[item.state] ?? item.label,
    })),
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
