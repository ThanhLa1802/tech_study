"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";

/**
 * Fixed window vs sliding window rate limiting, animated over the same request
 * stream. Fixed windows reset their counter at the boundary, so a burst that
 * straddles it is let through twice; the rolling counter never resets and
 * rejects the overflow.
 */
export const WINDOW_SIZE = 10;
export const LIMIT = 3;
export const REQUESTS = [7, 8, 9, 10, 11, 12];

export type LimitDecision = "allow" | "reject";
export type LimitTick = { t: number; decision: LimitDecision };
export type RateLimitFrame = {
  /** Request index, -1 for the intro, REQUESTS.length for the summary. */
  index: number;
  t: number;
  /** Fixed-window decisions for requests[0..index] (cumulative). */
  fixedTicks: LimitTick[];
  /** Sliding-window decisions for requests[0..index] (cumulative). */
  slidingTicks: LimitTick[];
  fixedWindow: number;
  /** Allowed requests in the current fixed window after this step. */
  fixedCount: number;
  /** Allowed requests in the rolling window after this step. */
  slidingCount: number;
  slidingStart: number;
  fixedAllowed: number;
  slidingAllowed: number;
  note: string;
};

export function buildRateLimitFrames(
  requests: number[],
  windowSize: number,
  limit: number,
  en: boolean,
): RateLimitFrame[] {
  const frames: RateLimitFrame[] = [];
  const fixedByWindow: number[] = [];
  const slidingTimes: number[] = [];
  let fixedAllowed = 0;
  let slidingAllowed = 0;
  const fixedTicks: LimitTick[] = [];
  const slidingTicks: LimitTick[] = [];

  frames.push({
    index: -1,
    t: requests.length ? requests[0] : 0,
    fixedTicks: [],
    slidingTicks: [],
    fixedWindow: 0,
    fixedCount: 0,
    slidingCount: 0,
    slidingStart: 0,
    fixedAllowed: 0,
    slidingAllowed: 0,
    note: en
      ? `Limit = ${limit} requests / ${windowSize}s. Six requests arrive around the window boundary; watch how each algorithm counts.`
      : `Giới hạn = ${limit} request / ${windowSize}s. Sáu request tới quanh mốc cửa sổ; hãy xem mỗi thuật toán đếm thế nào.`,
  });

  requests.forEach((t, index) => {
    const wi = Math.floor(t / windowSize);
    const fixedBefore = fixedByWindow[wi] ?? 0;
    const fixedAllow = fixedBefore < limit;
    if (fixedAllow) {
      fixedByWindow[wi] = fixedBefore + 1;
      fixedAllowed++;
    }

    const slidingBefore = slidingTimes.filter((x) => x > t - windowSize).length;
    const slidingAllow = slidingBefore < limit;
    if (slidingAllow) {
      slidingTimes.push(t);
      slidingAllowed++;
    }

    fixedTicks.push({ t, decision: fixedAllow ? "allow" : "reject" });
    slidingTicks.push({ t, decision: slidingAllow ? "allow" : "reject" });

    const fixedDecision = fixedAllow ? (en ? "ALLOW" : "CHO PHÉP") : en ? "REJECT" : "CHẶN";
    const slidingDecision = slidingAllow ? (en ? "ALLOW" : "CHO PHÉP") : en ? "REJECT" : "CHẶN";

    frames.push({
      index,
      t,
      fixedTicks: [...fixedTicks],
      slidingTicks: [...slidingTicks],
      fixedWindow: wi,
      fixedCount: fixedByWindow[wi] ?? 0,
      slidingCount: slidingTimes.filter((x) => x > t - windowSize).length,
      slidingStart: Math.max(0, t - windowSize),
      fixedAllowed,
      slidingAllowed,
      note: en
        ? `t = ${t}s · Fixed window #${wi + 1}: ${fixedBefore}/${limit} → ${fixedDecision}. Sliding rolling count: ${slidingBefore}/${limit} → ${slidingDecision}.`
        : `t = ${t}s · Cửa sổ cố định #${wi + 1}: ${fixedBefore}/${limit} → ${fixedDecision}. Đếm trượt: ${slidingBefore}/${limit} → ${slidingDecision}.`,
    });
  });

  frames.push({
    index: requests.length,
    t: requests.length ? requests[requests.length - 1] : 0,
    fixedTicks: [...fixedTicks],
    slidingTicks: [...slidingTicks],
    fixedWindow: requests.length ? Math.floor(requests[requests.length - 1] / windowSize) : 0,
    fixedCount: fixedByWindow[fixedByWindow.length - 1] ?? 0,
    slidingCount: slidingTimes.length,
    slidingStart: 0,
    fixedAllowed,
    slidingAllowed,
    note: en
      ? `Fixed window allowed ${fixedAllowed}, sliding window allowed ${slidingAllowed}. The burst that straddles the boundary slips past the fixed window but is caught by the rolling count.`
      : `Cửa sổ cố định cho qua ${fixedAllowed}, cửa sổ trượt cho qua ${slidingAllowed}. Cú bùng nổ vắt qua mốc lọt được qua cửa sổ cố định nhưng bị đếm trượt chặn lại.`,
  });

  return frames;
}

const T_MAX = 20;
const AXIS_LEFT = 72;
const AXIS_RIGHT = 556;
const ROW_H = 72;
const FIXED_BASE = 100;
const SLIDING_BASE = 224;
const AXIS_Y = 268;

const timeToX = (t: number) =>
  AXIS_LEFT + (Math.max(0, Math.min(t, T_MAX)) / T_MAX) * (AXIS_RIGHT - AXIS_LEFT);

export default function RateLimitWindow({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const frames = useMemo(
    () => buildRateLimitFrames(REQUESTS, WINDOW_SIZE, LIMIT, en),
    [en],
  );
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const frame = frames[Math.min(step, frames.length - 1)];
  const atEnd = step >= frames.length - 1;
  const isPlaying = playing && !atEnd;

  useEffect(() => {
    if (!playing || atEnd) return;
    const timer = setTimeout(
      () => setStep((current) => Math.min(current + 1, frames.length - 1)),
      1300,
    );
    return () => clearTimeout(timer);
  }, [playing, step, frames.length, atEnd]);

  const windowCount = Math.ceil(T_MAX / WINDOW_SIZE);
  const slidingWidth = Math.max(0, timeToX(frame.t) - timeToX(frame.slidingStart));

  const tickColor = (decision: LimitDecision) =>
    decision === "allow" ? "stroke-green-400" : "stroke-rose-500";

  function drawTicks(baseY: number, ticks: LimitTick[]) {
    return ticks.map((tick, i) => (
      <g key={`${tick.t}-${i}`}>
        <line
          x1={timeToX(tick.t)}
          y1={baseY}
          x2={timeToX(tick.t)}
          y2={baseY - 40}
          strokeWidth={3}
          strokeLinecap="round"
          className={`${tickColor(tick.decision)} transition-colors duration-300 motion-reduce:transition-none`}
        />
      </g>
    ));
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            {en
              ? "Fixed window vs sliding window"
              : "So sánh fixed window và sliding window"}
          </h3>
          <p className="text-sm text-zinc-400">
            {en ? "Step" : "Bước"} {Math.min(step + 1, frames.length)} /{" "}
            {frames.length} · {en ? "limit" : "giới hạn"} {LIMIT}/
            {WINDOW_SIZE}s
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-md bg-zinc-800/70 px-2 py-1 text-sky-300">
            {en ? "Fixed allowed" : "Fixed cho qua"}: {frame.fixedAllowed}
          </span>
          <span className="rounded-md bg-zinc-800/70 px-2 py-1 text-amber-300">
            {en ? "Sliding allowed" : "Sliding cho qua"}: {frame.slidingAllowed}
          </span>
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
        <svg
          viewBox={`0 0 ${AXIS_RIGHT + 30} ${AXIS_Y + 24}`}
          className="mx-auto h-auto w-full"
          role="img"
          aria-label={`${en ? "Fixed window versus sliding window rate limiting" : "So sánh rate limiting fixed window và sliding window"}. ${frame.note}`}
        >
          {/* Fixed window row. */}
          {Array.from({ length: windowCount }).map((_, w) => {
            const x1 = timeToX(w * WINDOW_SIZE);
            const x2 = timeToX((w + 1) * WINDOW_SIZE);
            const active = w === frame.fixedWindow && frame.index >= 0;
            return (
              <g key={`fw-${w}`}>
                <rect
                  x={x1}
                  y={FIXED_BASE - ROW_H}
                  width={x2 - x1}
                  height={ROW_H}
                  className={`transition-colors duration-300 motion-reduce:transition-none ${
                    active ? "fill-sky-500/10" : "fill-zinc-800/30"
                  }`}
                />
                <rect
                  x={x1}
                  y={FIXED_BASE - ROW_H}
                  width={x2 - x1}
                  height={ROW_H}
                  fill="none"
                  strokeWidth={1.5}
                  className={active ? "stroke-sky-400" : "stroke-zinc-700"}
                />
                <text
                  x={(x1 + x2) / 2}
                  y={FIXED_BASE - ROW_H + 16}
                  textAnchor="middle"
                  className="fill-zinc-500 text-[10px]"
                >
                  {en ? `Window ${w + 1}` : `Cửa sổ ${w + 1}`}
                </text>
              </g>
            );
          })}
          {drawTicks(FIXED_BASE, frame.fixedTicks)}
          <text
            x={AXIS_LEFT - 8}
            y={FIXED_BASE - ROW_H / 2}
            textAnchor="end"
            className="fill-zinc-300 text-[11px] font-semibold"
          >
            {en ? "Fixed" : "Cố định"}
          </text>
          <text
            x={AXIS_RIGHT + 4}
            y={FIXED_BASE - 28}
            className="fill-sky-300 text-[11px] font-medium"
          >
            {frame.fixedCount}/{LIMIT}
          </text>

          {/* Sliding window row. */}
          <rect
            x={AXIS_LEFT}
            y={SLIDING_BASE - ROW_H}
            width={AXIS_RIGHT - AXIS_LEFT}
            height={ROW_H}
            className="fill-zinc-800/30"
          />
          {frame.index >= 0 ? (
            <rect
              x={timeToX(frame.slidingStart)}
              y={SLIDING_BASE - ROW_H}
              width={slidingWidth}
              height={ROW_H}
              strokeWidth={1.5}
              strokeDasharray="6 5"
              className="fill-amber-500/10 stroke-amber-400"
            />
          ) : null}
          {drawTicks(SLIDING_BASE, frame.slidingTicks)}
          <text
            x={AXIS_LEFT - 8}
            y={SLIDING_BASE - ROW_H / 2}
            textAnchor="end"
            className="fill-zinc-300 text-[11px] font-semibold"
          >
            {en ? "Sliding" : "Trượt"}
          </text>
          <text
            x={AXIS_RIGHT + 4}
            y={SLIDING_BASE - 28}
            className="fill-amber-300 text-[11px] font-medium"
          >
            {frame.slidingCount}/{LIMIT}
          </text>

          {/* Shared time axis. */}
          <line
            x1={AXIS_LEFT}
            y1={AXIS_Y}
            x2={AXIS_RIGHT}
            y2={AXIS_Y}
            strokeWidth={1}
            className="stroke-zinc-700"
          />
          {[0, 5, 10, 15, 20].map((t) => (
            <g key={`axis-${t}`}>
              <line
                x1={timeToX(t)}
                y1={AXIS_Y}
                x2={timeToX(t)}
                y2={AXIS_Y + 5}
                strokeWidth={1}
                className="stroke-zinc-600"
              />
              <text
                x={timeToX(t)}
                y={AXIS_Y + 17}
                textAnchor="middle"
                className="fill-zinc-500 text-[10px]"
              >
                {t}s
              </text>
            </g>
          ))}
          <text
            x={(AXIS_LEFT + AXIS_RIGHT) / 2}
            y={AXIS_Y + 17}
            textAnchor="middle"
            className="fill-zinc-600 text-[10px]"
          >
            {en ? "time" : "thời gian"}
          </text>
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
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-1.5 rounded-full bg-green-400" />
          {en ? "Allowed" : "Cho phép"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-1.5 rounded-full bg-rose-500" />
          {en ? "Rejected (429)" : "Chặn (429)"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-sky-400 bg-sky-500/10" />
          {en ? "Current fixed window" : "Cửa sổ cố định hiện tại"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-dashed border-amber-400 bg-amber-500/10" />
          {en ? "Rolling window" : "Cửa sổ trượt"}
        </span>
      </div>
    </section>
  );
}
