"use client";

import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/locale";

const CELL = 52;
const GAP = 8;
const STEP = CELL + GAP;

// Fixed demo used by the auto-playing animation: max-sum window of k = 3
// over [2, 1, 3, 4, 5].
const VALUES = [2, 1, 3, 4, 5];
const K = 3;
const FRAME_MS = 900;

const idx = (i: number) => `a[${i}]`;

export type Frame = {
  start: number;
  size: number;
  sum: number;
  best: number;
  bestStart: number;
  added: number;
  removed: number;
  line: number;
  note: string;
};

export function buildFrames(values: number[], k: number, en: boolean): Frame[] {
  const frames: Frame[] = [];
  const n = values.length;
  if (n === 0) return frames;
  const size = Math.max(1, Math.min(Math.round(k), n));

  let sum = 0;
  for (let i = 0; i < size; i++) sum += values[i];
  let best = sum;
  let bestStart = 0;

  frames.push({
    start: 0,
    size,
    sum,
    best,
    bestStart,
    added: -1,
    removed: -1,
    line: 2,
    note: en
      ? `First window ${idx(0)}..${idx(size - 1)}, sum = ${sum}.`
      : `Cửa sổ đầu tiên ${idx(0)}..${idx(size - 1)}, sum = ${sum}.`,
  });

  for (let i = size; i < n; i++) {
    const removed = values[i - size];
    const added = values[i];
    sum += added - removed;
    const start = i - size + 1;
    let line = 4;
    if (sum > best) {
      best = sum;
      bestStart = start;
      line = 5;
    }
    frames.push({
      start,
      size,
      sum,
      best,
      bestStart,
      added: i,
      removed: i - size,
      line,
      note: en
        ? `Slide: +${idx(i)} = ${added}, −${idx(i - size)} = ${removed}, sum = ${sum}.`
        : `Trượt: +${idx(i)} = ${added}, −${idx(i - size)} = ${removed}, sum = ${sum}.`,
    });
  }

  // The final frame highlights the best window, so the displayed current sum
  // must equal the best sum — not the sum of the last window visited.
  frames.push({
    start: bestStart,
    size,
    sum: best,
    best,
    bestStart,
    added: -1,
    removed: -1,
    line: 6,
    note: en
      ? `Done. Max sum of ${size} consecutive = ${best}, starting at index ${bestStart}.`
      : `Hoàn tất. Tổng lớn nhất của ${size} phần tử liên tiếp = ${best}, bắt đầu tại vị trí ${bestStart}.`,
  });

  return frames;
}

export default function FixedSlidingWindowMotion({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  const frames = useMemo(() => buildFrames(VALUES, K, en), [en]);
  const frame = frames[Math.min(step, frames.length - 1)];

  // Auto-play: advance one frame at a time on mount, stop at the last frame.
  // The cleanup clears the pending timer when the component unmounts.
  useEffect(() => {
    if (step >= frames.length - 1) return;
    const timer = setTimeout(() => {
      setStep((current) => Math.min(current + 1, frames.length - 1));
    }, FRAME_MS);
    return () => clearTimeout(timer);
  }, [step, frames.length]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 30 };

  const windowWidth = frame.size * CELL + (frame.size - 1) * GAP;
  const bestLeft = frame.bestStart * STEP;
  const trackWidth = VALUES.length * STEP - GAP;

  const pseudo = [
    "function maxSumWindow(nums, k):",
    "  sum = sum(nums[0..k-1])",
    "  best = sum",
    "  for i = k to n-1:",
    "    sum += nums[i] - nums[i-k]",
    "    best = max(best, sum)",
    "  return best",
  ];

  const stats = [
    { label: en ? "Sum" : "Tổng", value: frame.sum, tone: "text-sky-300" },
    { label: "k", value: frame.size, tone: "text-zinc-300" },
    {
      label: en ? "Best" : "Lớn nhất",
      value: frame.best,
      tone: "text-green-300",
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <LazyMotion features={domAnimation} strict>
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">
              {en
                ? "Sliding Window — fixed size k"
                : "Sliding Window — cửa sổ cố định k"}
            </h3>
            <p className="text-sm text-zinc-400">
              {en ? "Step" : "Bước"} {Math.min(step + 1, frames.length)} /{" "}
              {frames.length} · {en ? "auto" : "tự động"}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {stats.map((stat) => (
              <span
                key={stat.label}
                className={`rounded-md bg-zinc-800/70 px-2 py-1 ${stat.tone}`}
              >
                {stat.label}: {stat.value}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
          <div>
            <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
              <div className="relative" style={{ width: trackWidth, height: CELL }}>
                <m.div
                  className="absolute left-0 top-0 h-full rounded-xl border-2 border-green-500 bg-green-500/10"
                  initial={false}
                  animate={{ x: frame.start * STEP, width: windowWidth }}
                  transition={transition}
                />
                <m.div
                  className="absolute -bottom-2 left-0 h-1 rounded-full bg-green-400"
                  initial={false}
                  animate={{ x: bestLeft, width: windowWidth }}
                  transition={transition}
                />
                <div
                  className="relative z-10 flex"
                  style={{ gap: GAP, height: CELL }}
                >
                  {VALUES.map((value, index) => {
                    const inWindow =
                      index >= frame.start && index < frame.start + frame.size;
                    const isAdded = index === frame.added;
                    const isRemoved = index === frame.removed;
                    const cls = isAdded
                      ? "border-amber-400 bg-amber-400/15 text-amber-200"
                      : isRemoved
                        ? "border-rose-500 bg-rose-500/15 text-rose-300"
                        : inWindow
                          ? "border-green-500/70 bg-green-500/15 text-green-200"
                          : "border-zinc-700 bg-zinc-800/60 text-zinc-400";
                    return (
                      <m.div
                        key={index}
                        className={`grid place-items-center rounded-xl border-2 font-mono text-lg font-semibold transition-colors duration-300 ${cls}`}
                        style={{ width: CELL, height: CELL }}
                        animate={{ scale: isAdded ? 1.08 : 1 }}
                        transition={transition}
                      >
                        {value}
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-3 min-h-6 text-sm text-zinc-300">{frame.note}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm border-2 border-green-500 bg-green-500/20" />
                {en ? "In window" : "Trong cửa sổ"}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm border-2 border-amber-400 bg-amber-400/20" />
                {en ? "Just added" : "Vừa thêm vào"}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm border-2 border-rose-500 bg-rose-500/20" />
                {en ? "Just removed" : "Vừa bỏ ra"}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm bg-green-400" />
                {en ? "Best window" : "Cửa sổ tốt nhất"}
              </span>
            </div>
          </div>

          <aside className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {en ? "Pseudocode" : "Mã giả"}
            </p>
            <pre className="overflow-x-auto font-mono text-xs leading-6">
              {pseudo.map((line, index) => (
                <span
                  key={index}
                  className={`block rounded px-2 ${
                    frame.line === index
                      ? "bg-green-500/20 text-green-200"
                      : "text-zinc-400"
                  }`}
                >
                  {line}
                </span>
              ))}
            </pre>
          </aside>
        </div>
      </LazyMotion>
    </section>
  );
}
