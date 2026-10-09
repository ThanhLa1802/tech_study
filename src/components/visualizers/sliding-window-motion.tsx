"use client";

import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Locale } from "@/lib/locale";

const CELL = 52;
const GAP = 8;
const STEP = CELL + GAP;

const idx = (i: number) => `a[${i}]`;

type Frame = {
  l: number;
  r: number;
  sum: number;
  best: number | null;
  bestL: number;
  bestR: number;
  line: number;
  note: string;
};

function buildFrames(values: number[], target: number, en: boolean): Frame[] {
  const frames: Frame[] = [];
  const n = values.length;
  let l = 0;
  let sum = 0;
  let best = Infinity;
  let bestL = -1;
  let bestR = -1;
  const bestLen = () => (best === Infinity ? null : best);

  frames.push({
    l,
    r: -1,
    sum,
    best: bestLen(),
    bestL,
    bestR,
    line: 1,
    note: en
      ? "Start with an empty window. Goal: the shortest subarray whose sum is ≥ target."
      : "Bắt đầu với cửa sổ rỗng. Mục tiêu: đoạn ngắn nhất có tổng ≥ target.",
  });

  for (let r = 0; r < n; r++) {
    sum += values[r];
    frames.push({
      l,
      r,
      sum,
      best: bestLen(),
      bestL,
      bestR,
      line: 3,
      note: en
        ? `Expand right: add ${idx(r)} = ${values[r]}, sum = ${sum}.`
        : `Mở rộng phải: thêm ${idx(r)} = ${values[r]}, sum = ${sum}.`,
    });
    while (sum >= target) {
      const len = r - l + 1;
      if (len < best) {
        best = len;
        bestL = l;
        bestR = r;
      }
      frames.push({
        l,
        r,
        sum,
        best: bestLen(),
        bestL,
        bestR,
        line: 5,
        note: en
          ? `sum = ${sum} ≥ ${target}: window length ${len}.`
          : `sum = ${sum} ≥ ${target}: độ dài cửa sổ ${len}.`,
      });
      sum -= values[l];
      l++;
      frames.push({
        l,
        r,
        sum,
        best: bestLen(),
        bestL,
        bestR,
        line: 6,
        note: en
          ? `Shrink left: remove ${idx(l - 1)}, sum = ${sum}, l → ${l}.`
          : `Thu hẹp trái: bỏ ${idx(l - 1)}, sum = ${sum}, l → ${l}.`,
      });
    }
  }

  frames.push({
    l,
    r: n - 1,
    sum,
    best: bestLen(),
    bestL,
    bestR,
    line: 7,
    note:
      best === Infinity
        ? en
          ? "No subarray reaches the target."
          : "Không có đoạn nào đạt target."
        : en
          ? `Done. Shortest length = ${best}.`
          : `Hoàn tất. Độ dài ngắn nhất = ${best}.`,
  });

  return frames;
}

function parseArray(value: string): number[] | null {
  const parts = value.split(/[\s,]+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums.map((n) => Math.round(n));
}

const spring = { type: "spring" as const, stiffness: 260, damping: 30 };

export default function SlidingWindowMotion({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const [input, setInput] = useState<number[]>([2, 3, 1, 2, 4, 3]);
  const [inputText, setInputText] = useState("2, 3, 1, 2, 4, 3");
  const [target, setTarget] = useState(7);
  const [targetText, setTargetText] = useState("7");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);

  const frames = useMemo(
    () => buildFrames(input, target, en),
    [input, target, en],
  );
  const frame = frames[Math.min(step, frames.length - 1)];
  const atEnd = step >= frames.length - 1;
  const isPlaying = playing && !atEnd;

  useEffect(() => {
    if (!playing || atEnd) return;
    const timer = setTimeout(() => {
      setStep((current) => Math.min(current + 1, frames.length - 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [playing, step, speed, frames.length, atEnd]);

  function restart(nextInput: number[], nextTarget = target) {
    setInput(nextInput);
    setInputText(nextInput.join(", "));
    setTarget(nextTarget);
    setTargetText(String(nextTarget));
    setStep(0);
    setPlaying(false);
  }

  function togglePlay() {
    if (atEnd) {
      setStep(0);
      setPlaying(true);
      return;
    }
    setPlaying((value) => !value);
  }

  function shuffle() {
    const next = [...input];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    restart(next);
  }

  const windowLeft = frame.r >= frame.l ? frame.l * STEP : 0;
  const windowWidth =
    frame.r >= frame.l
      ? (frame.r - frame.l + 1) * CELL + (frame.r - frame.l) * GAP
      : 0;
  const bestLeft = frame.best != null ? frame.bestL * STEP : 0;
  const bestWidth =
    frame.best != null
      ? (frame.bestR - frame.bestL + 1) * CELL +
        (frame.bestR - frame.bestL) * GAP
      : 0;
  const trackWidth = Math.max(1, input.length) * STEP - GAP;

  const pseudo = [
    "function minWindow(a, target):",
    "  l = 0; sum = 0; best = ∞",
    "  for r in 0..n-1:",
    "    sum += a[r]",
    "    while sum >= target:",
    "      best = min(best, r - l + 1)",
    "      sum -= a[l]; l++",
    "  return best",
  ];

  const stats = [
    { label: en ? "Sum" : "Tổng", value: frame.sum, tone: "text-sky-300" },
    { label: en ? "Target" : "Mục tiêu", value: target, tone: "text-zinc-300" },
    {
      label: en ? "Best" : "Ngắn nhất",
      value: frame.best ?? "∞",
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
                ? "Sliding Window — shortest sum ≥ target"
                : "Sliding Window — tổng nhỏ nhất ≥ target"}
            </h3>
            <p className="text-sm text-zinc-400">
              {en ? "Step" : "Bước"} {Math.min(step + 1, frames.length)} /{" "}
              {frames.length}
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
                  animate={{ x: windowLeft, width: windowWidth }}
                  transition={spring}
                />
                <m.div
                  className="absolute -bottom-2 left-0 h-1 rounded-full bg-green-400"
                  initial={false}
                  animate={{
                    x: bestLeft,
                    width: bestWidth,
                    opacity: frame.best != null ? 1 : 0,
                  }}
                  transition={spring}
                />
                <div
                  className="relative z-10 flex"
                  style={{ gap: GAP, height: CELL }}
                >
                  {input.map((value, index) => {
                    const inWindow = index >= frame.l && index <= frame.r;
                    const isRight = index === frame.r;
                    const inBest =
                      frame.best != null &&
                      index >= frame.bestL &&
                      index <= frame.bestR;
                    const cls = isRight
                      ? "border-amber-400 bg-amber-400/15 text-amber-200"
                      : inWindow
                        ? "border-green-500/70 bg-green-500/15 text-green-200"
                        : "border-zinc-700 bg-zinc-800/60 text-zinc-400";
                    return (
                      <m.div
                        key={index}
                        className={`grid place-items-center rounded-xl border-2 font-mono text-lg font-semibold transition-colors duration-300 ${cls}`}
                        style={{ width: CELL, height: CELL }}
                        animate={{ scale: isRight ? 1.08 : 1 }}
                        transition={spring}
                        title={inBest ? (en ? "In best window" : "Thuộc cửa sổ tốt nhất") : undefined}
                      >
                        {value}
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-3 min-h-6 text-sm text-zinc-300">{frame.note}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
              >
                {isPlaying ? (en ? "Pause" : "Tạm dừng") : en ? "Play" : "Chạy"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep((s) => Math.max(0, s - 1));
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
                  setStep((s) => Math.min(frames.length - 1, s + 1));
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
              <button
                type="button"
                onClick={shuffle}
                className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
              >
                {en ? "Shuffle" : "Xáo trộn"}
              </button>
              <label className="ml-auto flex items-center gap-2 text-sm text-zinc-400">
                {en ? "Speed" : "Tốc độ"}
                <input
                  type="range"
                  min={120}
                  max={1200}
                  step={60}
                  value={1320 - speed}
                  onChange={(e) => setSpeed(1320 - Number(e.target.value))}
                  className="accent-green-500"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const parsed = parseArray(inputText);
                    if (parsed) restart(parsed);
                  }
                }}
                className="min-w-56 flex-1 rounded-lg border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-green-500"
              />
              <label className="flex items-center gap-2 text-sm text-zinc-400">
                target
                <input
                  value={targetText}
                  onChange={(e) => setTargetText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const parsed = Number(targetText);
                      if (Number.isFinite(parsed)) restart(input, Math.round(parsed));
                    }
                  }}
                  className="w-20 rounded-lg border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-green-500"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  const parsed = parseArray(inputText);
                  const parsedTarget = Number(targetText);
                  if (parsed && Number.isFinite(parsedTarget)) {
                    restart(parsed, Math.round(parsedTarget));
                  }
                }}
                className="rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-400"
              >
                {en ? "Apply" : "Áp dụng"}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm border-2 border-green-500 bg-green-500/20" />
                {en ? "In window" : "Trong cửa sổ"}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm border-2 border-amber-400 bg-amber-400/20" />
                {en ? "Just expanded (r)" : "Vừa mở rộng (r)"}
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
