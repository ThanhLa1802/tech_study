import {
  arrowPoints,
  diagramBounds,
  edgeGeometry,
  edgeLabelAnchor,
  lerpPoint,
  nodeCenter,
  type DiagramEdge,
  type DiagramNode,
  type DiagramPacket,
  type NodeState,
  type NodeTone,
} from "@/lib/diagram";
import { Icon } from "@/components/course-icons";

export const NODE_FILL: Record<NodeState, string> = {
  idle: "fill-zinc-800 stroke-zinc-600",
  active: "fill-sky-950 stroke-sky-400",
  success: "fill-green-950 stroke-green-400",
  warn: "fill-amber-950 stroke-amber-400",
  down: "fill-rose-950 stroke-rose-600",
};

/**
 * Filled, saturated node accents from the asset style
 * (`asset/dsa-patterns-cheatsheet.html`) with bold white labels. Used for the
 * node-flow look (e.g. Your Device → Router Gateway → Internet Backbone).
 */
export const NODE_TONE: Record<NodeTone, string> = {
  emerald: "fill-emerald-500 stroke-emerald-400",
  sky: "fill-sky-500 stroke-sky-400",
  amber: "fill-amber-500 stroke-amber-400",
  rose: "fill-rose-500 stroke-rose-400",
  violet: "fill-violet-500 stroke-violet-400",
  zinc: "fill-zinc-700 stroke-zinc-500",
};

export const NODE_TEXT: Record<NodeState, string> = {
  idle: "fill-zinc-200",
  active: "fill-sky-100",
  success: "fill-green-100",
  warn: "fill-amber-100",
  down: "fill-rose-300",
};

export const EDGE_STROKE: Record<NodeState, string> = {
  idle: "stroke-zinc-700",
  active: "stroke-sky-400",
  success: "stroke-green-400",
  warn: "stroke-amber-400",
  down: "stroke-rose-600",
};

type Props = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  states?: Record<string, NodeState>;
  edgeStates?: Record<string, NodeState>;
  packets?: DiagramPacket[];
  buckets?: Record<string, number>;
  animate?: boolean;
  /** Accessible name announced for the `role="img"` SVG. */
  ariaLabel?: string;
};

export default function DiagramSvg({
  nodes,
  edges,
  states = {},
  edgeStates = {},
  packets = [],
  buckets = {},
  animate = false,
  ariaLabel,
}: Props) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const { width, height } = diagramBounds(nodes);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label={ariaLabel}
    >
      {edges.map((edge) => {
        const from = byId.get(edge.from);
        const to = byId.get(edge.to);
        if (!from || !to) return null;
        const geometry = edgeGeometry(from, to);
        const state = edgeStates[edge.id] ?? "idle";
        return (
          <g key={edge.id}>
            <line
              x1={geometry.start.x}
              y1={geometry.start.y}
              x2={geometry.end.x}
              y2={geometry.end.y}
              strokeWidth={2}
              strokeDasharray={edge.dashed ? "6 5" : undefined}
              className={`${EDGE_STROKE[state]} ${
                animate ? "transition-colors duration-300" : ""
              }`}
            />
            <polygon
              points={arrowPoints(geometry.end, geometry.ux, geometry.uy)}
              className={`${EDGE_STROKE[state]} ${
                animate ? "transition-colors duration-300" : ""
              }`}
            />
            {edge.label ? (
              <text
                x={edgeLabelAnchor(from, to).x}
                y={edgeLabelAnchor(from, to).y}
                textAnchor="middle"
                className="fill-zinc-400 text-[11px]"
              >
                {edge.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {nodes.map((node) => {
        const state = states[node.id] ?? "idle";
        const center = nodeCenter(node);
        if (node.shape === "bucket") {
          const tokens = buckets[node.id] ?? node.capacity ?? 0;
          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={10}
                strokeWidth={1.5}
                className={`${NODE_FILL[state]} ${
                  animate ? "transition-colors duration-300" : ""
                }`}
              />
              <text
                x={center.x}
                y={node.y + 20}
                textAnchor="middle"
                className={`${NODE_TEXT[state]} text-xs font-medium`}
              >
                {node.label} {tokens}/{node.capacity ?? tokens}
              </text>
              {Array.from({ length: Math.max(0, tokens) }).map((_, index) => {
                const radius = 7;
                const gap = 6;
                const total =
                  tokens * radius * 2 + Math.max(0, tokens - 1) * gap;
                const startX = center.x - total / 2 + radius;
                return (
                  <circle
                    key={index}
                    cx={startX + index * (radius * 2 + gap)}
                    cy={node.y + node.h - 26}
                    r={radius}
                    className="fill-green-400"
                  />
                );
              })}
            </g>
          );
        }
        const toneClass =
          node.tone !== undefined && state === "idle"
            ? NODE_TONE[node.tone]
            : undefined;
        return (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx={12}
              strokeWidth={1.5}
              className={`${toneClass ?? NODE_FILL[state]} ${
                animate ? "transition-colors duration-300" : ""
              }`}
            />
            {node.icon ? (
              <Icon
                name={node.icon}
                x={center.x - 12}
                y={node.y + 9}
                width={24}
                height={24}
                className="text-white"
              />
            ) : null}
            <text
              x={center.x}
              y={
                node.icon
                  ? node.y + node.h - 24
                  : node.sub
                    ? center.y - 6
                    : center.y
              }
              textAnchor="middle"
              dominantBaseline="middle"
              className={
                toneClass
                  ? "fill-white text-xs font-semibold"
                  : `${NODE_TEXT[state]} text-xs font-medium`
              }
            >
              {node.label}
            </text>
            {node.sub ? (
              <text
                x={center.x}
                y={node.icon ? node.y + node.h - 8 : center.y + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                className={
                  toneClass ? "fill-white/80 text-[10px]" : "fill-zinc-400 text-[10px]"
                }
              >
                {node.sub}
              </text>
            ) : null}
          </g>
        );
      })}

      {packets.map((packet) => {
        const from = byId.get(packet.from);
        const to = byId.get(packet.to);
        if (!from || !to) return null;
        const geometry = edgeGeometry(from, to);
        const position = lerpPoint(geometry.start, geometry.end, packet.t);
        return (
          <g
            key={packet.id}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: animate ? "transform 320ms linear" : undefined,
            }}
          >
            <circle r={8} className="fill-green-400" />
            {packet.label ? (
              <text
                y={-14}
                textAnchor="middle"
                className="fill-green-200 text-[10px] font-medium"
              >
                {packet.label}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
