"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";

export type BarMark =
  | "neutral"
  | "compare"
  | "swap"
  | "sorted"
  | "active"
  | "eliminated"
  | "found";

export type StatTone = "amber" | "rose" | "indigo" | "emerald" | "slate";

export type StepFrame = {
  array: number[];
  marks: BarMark[];
  pointers?: Record<number, string>;
  line: number;
  note: string;
  stats: { label: string; value: number | string; tone: StatTone }[];
};

export type LegendItem = { mark: BarMark; label: string };

export type VisualizerSpec = {
  title: string;
  pseudo: string[];
  legend: LegendItem[];
  defaultInput: number[];
  autoSort?: boolean;
  target?: { label: string; default: number };
  build: (input: number[], targetValue: number, locale?: Locale) => StepFrame[];
};

const MARK_CLASS: Record<BarMark, string> = {
  neutral: "bg-zinc-600",
  compare: "bg-amber-400",
  swap: "bg-rose-500",
  sorted: "bg-green-500",
  active: "bg-sky-400",
  eliminated: "bg-zinc-700/70",
  found: "bg-green-400",
};

const TONE_CLASS: Record<StatTone, string> = {
  amber: "bg-amber-500/10 text-amber-300",
  rose: "bg-rose-500/10 text-rose-300",
  indigo: "bg-sky-500/10 text-sky-300",
  emerald: "bg-green-500/10 text-green-300",
  slate: "bg-zinc-500/10 text-zinc-300",
};

function sortAsc(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

function parseArray(value: string): number[] | null {
  const parts = value
    .split(/[\s,]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums.map((n) => Math.round(n));
}

function prepareInput(spec: VisualizerSpec, values: number[]): number[] {
  return spec.autoSort ? sortAsc(values) : values;
}

export default function AlgorithmVisualizer({
  spec,
  locale,
}: {
  spec: VisualizerSpec;
  locale: Locale;
}) {
  const en = locale === "en";
  const initial = useMemo(() => prepareInput(spec, spec.defaultInput), [spec]);
  const [input, setInput] = useState<number[]>(initial);
  const [inputText, setInputText] = useState(initial.join(", "));
  const [target, setTarget] = useState<number>(spec.target?.default ?? 0);
  const [targetText, setTargetText] = useState<string>(
    String(spec.target?.default ?? 0),
  );
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const frames = useMemo(
    () => spec.build(input, target, locale),
    [spec, input, target, locale],
  );
  const frame = frames[Math.min(step, frames.length - 1)];
  const max = Math.max(1, ...input.map((value) => Math.abs(value)));
  const atEnd = step >= frames.length - 1;
  const isPlaying = playing && !atEnd;
  const labels: Record<string, string> = {
    "Chưa xét": "Not checked",
    "Đang so sánh": "Comparing",
    "Vừa đổi chỗ": "Just swapped",
    "Đã đúng vị trí": "In the right place",
    "Đã sắp xếp": "Sorted",
    "Vị trí min hiện tại": "Current minimum",
    "Đang xét": "Checking",
    "key / vị trí chèn": "Key / insertion position",
    "Vừa dịch chuyển": "Just shifted",
    "Phần tử mid": "Middle element",
    "Đã loại": "Eliminated",
    "Tìm thấy": "Found",
    "Cặp hợp lệ": "Matching pair",
    "So sánh": "Comparisons",
    "Đổi chỗ": "Swaps",
    "Dịch chuyển": "Shifts",
    "Mục tiêu": "Target",
    "Tổng": "Sum",
  };
  const translate = (text: string) => (en ? labels[text] ?? text : text);

  useEffect(() => {
    if (!playing || atEnd) return;
    const timer = setTimeout(() => {
      setStep((current) => Math.min(current + 1, frames.length - 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [playing, step, speed, frames.length, atEnd]);

  function restart(nextInput: number[], nextTarget = target) {
    const prepared = prepareInput(spec, nextInput);
    setInput(prepared);
    setInputText(prepared.join(", "));
    setTarget(nextTarget);
    setTargetText(String(nextTarget));
    setStep(0);
    setPlaying(false);
  }

  function applyInput() {
    const parsed = parseArray(inputText);
    if (parsed) {
      restart(parsed);
    } else {
      setInputText(input.join(", "));
    }
  }

  function applyTarget() {
    const parsed = Number(targetText);
    if (Number.isFinite(parsed)) {
      restart(input, Math.round(parsed));
    } else {
      setTargetText(String(target));
    }
  }

  function shuffle() {
    const next = [...input];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    restart(next);
  }

  function togglePlay() {
    if (atEnd) {
      setStep(0);
      setPlaying(true);
      return;
    }
    setPlaying((value) => !value);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            {en ? spec.title.replace(" — mô phỏng", " — visualization") : spec.title}
          </h3>
          <p className="text-sm text-zinc-400">
            {en ? "Step" : "Bước"} {Math.min(step + 1, frames.length)} / {frames.length}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {frame.stats.map((stat) => (
            <span
              key={stat.label}
              className={`rounded-md px-2 py-1 ${TONE_CLASS[stat.tone]}`}
            >
              {translate(stat.label)}: {stat.value}
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="flex h-72 items-end gap-2 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            {frame.array.map((value, index) => {
              const mark = frame.marks[index] ?? "neutral";
              const pointer = frame.pointers?.[index];
              return (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center justify-end gap-1"
                >
                  <span className="h-4 text-[10px] font-semibold uppercase leading-4 text-green-300">
                    {pointer ?? ""}
                  </span>
                  <span className="text-xs font-medium text-zinc-300">
                    {value}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      MARK_CLASS[mark]
                    } ${mark === "eliminated" ? "opacity-40" : ""}`}
                    style={{ height: `${Math.min(200, (Math.abs(value) / max) * 200)}px` }}
                  />
                </div>
              );
            })}
          </div>

          <p className="mt-3 min-h-6 text-sm text-zinc-300">{frame.note}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
            >
              {isPlaying ? (en ? "Pause" : "Tạm dừng") : (en ? "Play" : "Chạy")}
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
            {spec.autoSort ? null : (
              <button
                type="button"
                onClick={shuffle}
                className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
              >
                {en ? "Shuffle" : "Xáo trộn"}
              </button>
            )}
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
                if (e.key === "Enter") applyInput();
              }}
              placeholder={en ? "Enter numbers separated by commas" : "Nhập dãy số, cách nhau bởi dấu phẩy"}
              className="min-w-64 flex-1 rounded-lg border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-green-500"
            />
            {spec.target ? (
              <label className="flex items-center gap-2 text-sm text-zinc-400">
                {spec.target.label}
                <input
                  value={targetText}
                  onChange={(e) => setTargetText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applyTarget();
                  }}
                  className="w-20 rounded-lg border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-green-500"
                />
              </label>
            ) : null}
            <button
              type="button"
              onClick={() => {
                applyInput();
                if (spec.target) applyTarget();
              }}
              className="rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-400"
            >
              {en ? "Apply" : "Áp dụng"}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
            {spec.legend.map((item) => (
              <span key={item.mark} className="flex items-center gap-1">
                <span
                  className={`h-3 w-3 rounded-sm ${MARK_CLASS[item.mark]}`}
                />
                {translate(item.label)}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {en ? "Pseudocode" : "Mã giả"}
          </p>
          <pre className="overflow-x-auto font-mono text-xs leading-6">
            {spec.pseudo.map((line, index) => (
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
    </section>
  );
}
