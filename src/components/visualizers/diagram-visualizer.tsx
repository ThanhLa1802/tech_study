"use client";

import { useEffect, useMemo, useState } from "react";
import DiagramSvg, { NODE_FILL } from "@/components/diagram-svg";
import { localizeDiagramSpec, type DiagramSpec } from "@/lib/diagram";
import type { Locale } from "@/lib/locale";

const TONE_CLASS: Record<string, string> = {
  amber: "bg-amber-500/10 text-amber-300",
  rose: "bg-rose-500/10 text-rose-300",
  indigo: "bg-sky-500/10 text-sky-300",
  emerald: "bg-green-500/10 text-green-300",
  slate: "bg-zinc-500/10 text-zinc-300",
};

export default function DiagramVisualizer({
  spec,
  locale,
}: {
  spec: DiagramSpec;
  locale: Locale;
}) {
  const en = locale === "en";
  const display = localizeDiagramSpec(spec, locale);
  const frames = useMemo(() => spec.build(locale), [spec, locale]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);

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
          <h3 className="text-lg font-semibold text-zinc-100">{display.title}</h3>
          <p className="text-sm text-zinc-400">
            {en ? "Step" : "Bước"} {Math.min(step + 1, frames.length)} / {frames.length}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {frame.stats.map((stat) => (
            <span
              key={stat.label}
              className={`rounded-md px-2 py-1 ${TONE_CLASS[stat.tone]}`}
            >
              {stat.label}: {stat.value}
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
            <DiagramSvg
              nodes={spec.nodes}
              edges={spec.edges}
              states={frame.states}
              edgeStates={frame.edgeStates}
              packets={frame.packets}
              buckets={frame.buckets}
              animate
            />
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
            <label className="ml-auto flex items-center gap-2 text-sm text-zinc-400">
              {en ? "Speed" : "Tốc độ"}
              <input
                type="range"
                min={200}
                max={1400}
                step={100}
                value={1600 - speed}
                onChange={(e) => setSpeed(1600 - Number(e.target.value))}
                className="accent-green-500"
              />
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
            {display.legend.map((item) => (
              <span key={item.state} className="flex items-center gap-1.5">
                {item.state === "packet" ? (
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                ) : (
                  <svg width="14" height="14" aria-hidden="true">
                    <rect
                      width="14"
                      height="14"
                      rx="4"
                      strokeWidth={1.5}
                      className={NODE_FILL[item.state]}
                    />
                  </svg>
                )}
                {item.label}
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
