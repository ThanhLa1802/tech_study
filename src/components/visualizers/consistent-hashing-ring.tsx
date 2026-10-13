"use client";

import { useEffect, useMemo, useState } from "react";
import { NODE_FILL, NODE_TONE } from "@/components/diagram-svg";
import type { Locale } from "@/lib/locale";

/**
 * Consistent hashing ring — a step-through of key assignment on a circular hash
 * space. A key belongs to the nearest node clockwise; adding or removing one
 * node only reassigns the keys in the arc between that node and its predecessor.
 *
 * Positions are degrees, 0° at the top, increasing clockwise.
 */
export type RingNode = { id: string; label: string; pos: number };
export type RingKey = { id: string; label: string; pos: number };

/** The node owning a key: the first node at or after the key's angle (clockwise), wrapping around. */
export function nextNodeClockwise(nodes: RingNode[], keyPos: number): string {
  if (nodes.length === 0) return "";
  const sorted = [...nodes].sort((a, b) => a.pos - b.pos);
  for (const node of sorted) if (node.pos >= keyPos) return node.id;
  return sorted[0].id;
}

/** Map every key id to the id of its owning node. */
export function assignKeys(
  nodes: RingNode[],
  keys: RingKey[],
): Record<string, string> {
  const owners: Record<string, string> = {};
  for (const key of keys) {
    const owner = nextNodeClockwise(nodes, key.pos);
    if (owner) owners[key.id] = owner;
  }
  return owners;
}

/** Key ids whose owner changed between two assignments. */
export function movedKeys(
  before: Record<string, string>,
  after: Record<string, string>,
): string[] {
  return Object.keys(after).filter((id) => before[id] !== after[id]);
}

const BASE_NODES: RingNode[] = [
  { id: "a", label: "A", pos: 0 },
  { id: "b", label: "B", pos: 90 },
  { id: "c", label: "C", pos: 180 },
];
const NODE_D: RingNode = { id: "d", label: "D", pos: 270 };
const KEYS: RingKey[] = [
  { id: "k1", label: "K1", pos: 30 },
  { id: "k5", label: "K5", pos: 60 },
  { id: "k2", label: "K2", pos: 100 },
  { id: "k3", label: "K3", pos: 200 },
  { id: "k4", label: "K4", pos: 240 },
];

const KNOWN_NODES: Record<string, RingNode> = Object.fromEntries(
  [...BASE_NODES, NODE_D].map((node) => [node.id, node]),
);

export type HashFrame = {
  nodes: RingNode[];
  keys: RingKey[];
  owners: Record<string, string>;
  /** Keys whose owner changed in this step (highlighted). */
  moved: string[];
  /** Node id that just joined the ring (highlighted as new). */
  added: string | null;
  /** Node id that just left the ring (rendered as down). */
  removed: string | null;
  showOwners: boolean;
  note: string;
};

/** Build the fixed teaching trace: assign → add a node → remove a node. */
export function buildHashFrames(en: boolean): HashFrame[] {
  const baseOwners = assignKeys(BASE_NODES, KEYS);

  const withD = [...BASE_NODES, NODE_D];
  const afterAdd = assignKeys(withD, KEYS);
  const addMoved = movedKeys(baseOwners, afterAdd);

  const withoutB = BASE_NODES.filter((node) => node.id !== "b");
  const afterRemove = assignKeys(withoutB, KEYS);
  const removeMoved = movedKeys(baseOwners, afterRemove);

  const frames: HashFrame[] = [
    {
      nodes: BASE_NODES,
      keys: KEYS,
      owners: {},
      moved: [],
      added: null,
      removed: null,
      showOwners: false,
      note: en
        ? "Both nodes and keys are hashed onto the same ring. Each key will belong to the nearest node clockwise."
        : "Cả node lẫn key đều được băm lên cùng một vòng. Mỗi key sẽ thuộc về node gần nhất theo chiều kim đồng hồ.",
    },
    {
      nodes: BASE_NODES,
      keys: KEYS,
      owners: baseOwners,
      moved: [],
      added: null,
      removed: null,
      showOwners: true,
      note: en
        ? "5 keys distributed across 3 nodes (A, B, C). Each key points to its owner."
        : "5 key được phân bổ lên 3 node (A, B, C). Mỗi key trỏ tới node sở hữu.",
    },
    {
      nodes: withD,
      keys: KEYS,
      owners: baseOwners,
      moved: [],
      added: "d",
      removed: null,
      showOwners: true,
      note: en
        ? "Node D joins the ring at 270°. Only the keys in the arc before D may change owner."
        : "Node D gia nhập vòng tại 270°. Chỉ các key nằm trong cung trước D mới có thể đổi chủ.",
    },
    {
      nodes: withD,
      keys: KEYS,
      owners: afterAdd,
      moved: addMoved,
      added: "d",
      removed: null,
      showOwners: true,
      note: en
        ? `Add D: ${addMoved.length} keys moved (${addMoved
            .map((id) => id.toUpperCase())
            .join(", ")}). The other ${KEYS.length - addMoved.length} keys stay put.`
        : `Thêm D: ${addMoved.length} key di chuyển (${addMoved
            .map((id) => id.toUpperCase())
            .join(", ")}). ${KEYS.length - addMoved.length} key còn lại giữ nguyên.`,
    },
    {
      nodes: BASE_NODES,
      keys: KEYS,
      owners: baseOwners,
      moved: [],
      added: null,
      removed: "b",
      showOwners: true,
      note: en
        ? "Now start from the same 3-node ring and remove node B. Only the keys B owned are affected."
        : "Giờ bắt đầu lại từ vòng 3 node ban đầu và bỏ node B. Chỉ các key thuộc B bị ảnh hưởng.",
    },
    {
      nodes: withoutB,
      keys: KEYS,
      owners: afterRemove,
      moved: removeMoved,
      added: null,
      removed: "b",
      showOwners: true,
      note: en
        ? `Remove B: ${removeMoved.length} keys moved (${removeMoved
            .map((id) => id.toUpperCase())
            .join(", ")}) to the next node clockwise. No other key changes owner.`
        : `Bỏ B: ${removeMoved.length} key di chuyển (${removeMoved
            .map((id) => id.toUpperCase())
            .join(", ")}) sang node kế tiếp theo chiều kim đồng hồ. Các key khác không đổi chủ.`,
    },
    {
      nodes: BASE_NODES,
      keys: KEYS,
      owners: baseOwners,
      moved: [],
      added: null,
      removed: null,
      showOwners: true,
      note: en
        ? "With consistent hashing, adding or removing one node only moves the keys in a single arc — not the whole keyspace."
        : "Với consistent hashing, thêm hoặc bớt một node chỉ di chuyển các key trong một cung — không phải toàn bộ không gian key.",
    },
  ];

  return frames;
}

const W = 520;
const H = 470;
const CX = W / 2;
const CY = 240;
const R = 172;
const RK = 112;

function polar(pos: number, radius: number) {
  const rad = (pos * Math.PI) / 180;
  return { x: CX + radius * Math.sin(rad), y: CY - radius * Math.cos(rad) };
}

export default function ConsistentHashingRing({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const frames = useMemo(() => buildHashFrames(en), [en]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const frame = frames[Math.min(step, frames.length - 1)];
  const atEnd = step >= frames.length - 1;
  const isPlaying = playing && !atEnd;

  useEffect(() => {
    if (!playing || atEnd) return;
    const timer = setTimeout(
      () => setStep((current) => Math.min(current + 1, frames.length - 1)),
      1600,
    );
    return () => clearTimeout(timer);
  }, [playing, step, frames.length, atEnd]);

  const nodeIds = new Set(frame.nodes.map((node) => node.id));
  const moved = new Set(frame.moved);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            {en ? "Consistent Hashing — ring" : "Consistent Hashing — vòng băm"}
          </h3>
          <p className="text-sm text-zinc-400">
            {en ? "Step" : "Bước"} {Math.min(step + 1, frames.length)} /{" "}
            {frames.length}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-md bg-zinc-800/70 px-2 py-1 text-emerald-300">
            {en ? "Nodes" : "Node"}: {frame.nodes.length}
          </span>
          <span className="rounded-md bg-zinc-800/70 px-2 py-1 text-amber-300">
            {en ? "Keys" : "Key"}: {frame.keys.length}
          </span>
          <span className="rounded-md bg-zinc-800/70 px-2 py-1 text-rose-300">
            {en ? "Moved" : "Di chuyển"}: {frame.moved.length}
          </span>
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto h-auto w-full"
          style={{ maxWidth: 520 }}
          role="img"
          aria-label={`${en ? "Consistent hashing ring" : "Vòng băm consistent hashing"}. ${frame.note}`}
        >
          <defs>
            <marker
              id="ring-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L8 3.5 L0 7 z" fill="#71717a" />
            </marker>
            <marker
              id="ring-arrow-moved"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L8 3.5 L0 7 z" fill="#fb7185" />
            </marker>
          </defs>

          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            className="stroke-zinc-700"
          />

          {/* Clockwise direction hint in the empty ring center. */}
          <text
            x={CX}
            y={CY - 2}
            textAnchor="middle"
            className="fill-zinc-600 text-[26px]"
          >
            ↻
          </text>
          <text
            x={CX}
            y={CY + 18}
            textAnchor="middle"
            className="fill-zinc-500 text-[10px]"
          >
            {en ? "clockwise" : "chiều kim đồng hồ"}
          </text>

          {/* Ownership lines drawn behind the markers. */}
          {frame.showOwners
            ? frame.keys.map((key) => {
                const owner = frame.owners[key.id];
                if (!owner) return null;
                const node = KNOWN_NODES[owner];
                if (!node || (!nodeIds.has(owner) && frame.removed !== owner)) {
                  return null;
                }
                const from = polar(key.pos, RK);
                const to = polar(node.pos, R);
                const isMoved = moved.has(key.id);
                return (
                  <line
                    key={`${key.id}-owner`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    strokeWidth={isMoved ? 2 : 1}
                    strokeDasharray="4 4"
                    markerEnd={`url(#${isMoved ? "ring-arrow-moved" : "ring-arrow"})`}
                    className={`transition-colors duration-300 motion-reduce:transition-none ${
                      isMoved ? "stroke-rose-400" : "stroke-zinc-700"
                    }`}
                  />
                );
              })
            : null}

          {/* Nodes: current ring. */}
          {frame.nodes.map((node) => {
            const p = polar(node.pos, R);
            const isNew = frame.added === node.id;
            const cls = isNew
              ? NODE_TONE.sky
              : frame.removed === node.id
                ? NODE_FILL.down
                : NODE_TONE.emerald;
            return (
              <g key={node.id}>
                <rect
                  x={p.x - 38}
                  y={p.y - 17}
                  width={76}
                  height={34}
                  rx={10}
                  strokeWidth={1.5}
                  className={`${cls} transition-colors duration-300 motion-reduce:transition-none`}
                />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-xs font-semibold"
                >
                  {en ? `Node ${node.label}` : `Node ${node.label}`}
                </text>
              </g>
            );
          })}

          {/* Removed node rendered as down. */}
          {frame.removed && !nodeIds.has(frame.removed) && KNOWN_NODES[frame.removed]
            ? (() => {
                const node = KNOWN_NODES[frame.removed];
                const p = polar(node.pos, R);
                return (
                  <g opacity={0.9}>
                    <rect
                      x={p.x - 38}
                      y={p.y - 17}
                      width={76}
                      height={34}
                      rx={10}
                      strokeWidth={1.5}
                      className={NODE_FILL.down}
                    />
                    <text
                      x={p.x}
                      y={p.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-rose-300 text-xs font-semibold"
                    >
                      {node.label} {en ? "(gone)" : "(bỏ)"}
                    </text>
                  </g>
                );
              })()
            : null}

          {/* Keys. */}
          {frame.keys.map((key) => {
            const p = polar(key.pos, RK);
            const isMoved = moved.has(key.id);
            const owner = frame.owners[key.id];
            return (
              <g key={key.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={16}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 motion-reduce:transition-none ${
                    isMoved
                      ? "fill-rose-500 stroke-rose-300"
                      : "fill-amber-500 stroke-amber-300"
                  }`}
                />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-zinc-950 text-[11px] font-bold"
                >
                  {key.label}
                </text>
                {frame.showOwners && owner ? (
                  <text
                    x={p.x}
                    y={p.y + 30}
                    textAnchor="middle"
                    className="fill-zinc-500 text-[9px]"
                  >
                    → {KNOWN_NODES[owner]?.label ?? owner.toUpperCase()}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-3 min-h-6 text-sm text-zinc-300">{frame.note}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (atEnd) {
              setStep(0);
              setPlaying(true);
              return;
            }
            setPlaying((value) => !value);
          }}
          className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
        >
          {isPlaying ? (en ? "Pause" : "Tạm dừng") : en ? "Play" : "Chạy"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setStep((current) => Math.max(0, current - 1));
          }}
          disabled={step === 0}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {en ? "← Back" : "← Lùi"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setStep((current) => Math.min(frames.length - 1, current + 1));
          }}
          disabled={atEnd}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {en ? "Next →" : "Tiến →"}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setPlaying(false);
          }}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
        >
          {en ? "Restart" : "Chạy lại"}
        </button>

        <div className="ml-auto flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep(1);
            }}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-200 transition hover:bg-zinc-800"
          >
            {en ? "Baseline" : "Ban đầu"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep(3);
            }}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-200 transition hover:bg-zinc-800"
          >
            {en ? "Add node" : "Thêm node"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep(5);
            }}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-200 transition hover:bg-zinc-800"
          >
            {en ? "Remove node" : "Bớt node"}
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-emerald-300 bg-emerald-500" />
          {en ? "Node on the ring" : "Node trên vòng"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-amber-300 bg-amber-500" />
          {en ? "Key" : "Key"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-rose-300 bg-rose-500" />
          {en ? "Key that moved" : "Key đã di chuyển"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-sky-300 bg-sky-500" />
          {en ? "New node" : "Node mới"}
        </span>
      </div>
    </section>
  );
}
