"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";
import {
  COMPLEXITY_SERIES as SERIES,
  DANGER_COMPLEXITY_KEYS as DANGER_KEYS,
  MAX_COMPLEXITY_N as MAX_N,
  MIN_COMPLEXITY_N as MIN_N,
  SAFE_COMPLEXITY_KEYS as SAFE_KEYS,
  formatComplexityValue as formatValue,
} from "@/lib/complexity";

const W = 720;
const H = 340;
const PAD = { l: 58, r: 18, t: 18, b: 34 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;

export default function ComplexityVisualizer({
  locale,
}: {
  locale: Locale;
}) {
  const en = locale === "en";
  const [selected, setSelected] = useState<string[]>(SAFE_KEYS);
  const [n, setN] = useState(24);

  const active = useMemo(
    () => SERIES.filter((series) => selected.includes(series.key)),
    [selected],
  );

  const maxLog = active.reduce(
    (acc, series) => Math.max(acc, series.log10(MAX_N)),
    0,
  );
  const yMax = Math.max(1, Math.ceil(maxLog));

  const x = (value: number) =>
    PAD.l + ((value - MIN_N) / (MAX_N - MIN_N)) * PLOT_W;
  const y = (logValue: number) =>
    PAD.t + PLOT_H * (1 - Math.min(1, logValue / yMax));

  const paths = active.map((series) => {
    let d = "";
    for (let value = MIN_N; value <= MAX_N; value++) {
      d += `${value === MIN_N ? "M" : "L"} ${x(value).toFixed(1)} ${y(
        series.log10(value),
      ).toFixed(1)} `;
    }
    return { series, d };
  });

  const gridStep = yMax <= 12 ? 1 : Math.ceil(yMax / 6);
  const gridLines: number[] = [];
  for (let k = 0; k <= yMax; k += gridStep) gridLines.push(k);

  const xTicks = [MIN_N, 16, 32, 48, MAX_N];
  const maxLogCurrent = active.reduce(
    (acc, series) => Math.max(acc, series.log10(n)),
    0,
  );

  function toggle(key: string) {
    setSelected((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-50">
            {en ? "Compare Big O growth rates" : "So sánh tốc độ tăng của các mức Big O"}
          </h3>
          <p className="text-sm text-zinc-400">
            {en ? "Values at n = " : "Giá trị mô phỏng khi n = "}<span className="text-green-300">{n}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelected(SAFE_KEYS)}
            className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 transition hover:bg-zinc-800"
          >
            {en ? "Slower growth" : "Mức tăng chậm hơn"}
          </button>
          <button
            type="button"
            onClick={() => setSelected(DANGER_KEYS)}
            className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 transition hover:bg-zinc-800"
          >
            {en ? "Faster growth" : "Mức tăng nhanh hơn"}
          </button>
          <button
            type="button"
            onClick={() => setSelected(SERIES.map((series) => series.key))}
            className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 transition hover:bg-zinc-800"
          >
            {en ? "All" : "Tất cả"}
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {SERIES.map((series) => {
          const on = selected.includes(series.key);
          return (
            <button
              key={series.key}
              type="button"
              onClick={() => toggle(series.key)}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                on ? "bg-zinc-800/80" : "border-zinc-800 text-zinc-400"
              }`}
              style={on ? { borderColor: series.color } : undefined}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: on ? series.color : "transparent",
                  boxShadow: on ? "none" : `inset 0 0 0 1.5px ${series.color}`,
                }}
              />
              <span style={{ color: on ? series.color : undefined }}>
                {series.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_240px]">
        <div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto w-full"
              role="img"
              aria-label={en ? "Complexity growth chart" : "Đồ thị tăng trưởng của các độ phức tạp"}
            >
              {gridLines.map((k) => {
                const gy = y(k);
                return (
                  <g key={k}>
                    <line
                      x1={PAD.l}
                      y1={gy}
                      x2={W - PAD.r}
                      y2={gy}
                      className="stroke-zinc-800"
                      strokeWidth={1}
                    />
                    <text
                      x={PAD.l - 8}
                      y={gy + 3}
                      textAnchor="end"
                      className="fill-zinc-400 text-[10px]"
                    >
                      10
                      <tspan dy="-4" fontSize="7">
                        {k}
                      </tspan>
                    </text>
                  </g>
                );
              })}

              {xTicks.map((tick) => (
                <text
                  key={tick}
                  x={x(tick)}
                  y={H - PAD.b + 16}
                  textAnchor="middle"
                  className="fill-zinc-400 text-[10px]"
                >
                  {tick}
                </text>
              ))}

              <line
                x1={PAD.l}
                y1={PAD.t}
                x2={PAD.l}
                y2={H - PAD.b}
                className="stroke-zinc-700"
                strokeWidth={1}
              />
              <line
                x1={PAD.l}
                y1={H - PAD.b}
                x2={W - PAD.r}
                y2={H - PAD.b}
                className="stroke-zinc-700"
                strokeWidth={1}
              />

              <line
                x1={x(n)}
                y1={PAD.t}
                x2={x(n)}
                y2={H - PAD.b}
                className="stroke-green-500/50"
                strokeWidth={1}
                strokeDasharray="4 4"
              />

              {paths.map(({ series, d }) => (
                <path
                  key={series.key}
                  d={d}
                  fill="none"
                  stroke={series.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {active.map((series) => (
                <circle
                  key={series.key}
                  cx={x(n)}
                  cy={y(series.log10(n))}
                  r={4}
                  fill={series.color}
                  stroke="#0a0a0b"
                  strokeWidth={1.5}
                />
              ))}
            </svg>
          </div>

          <label className="mt-3 flex items-center gap-3 text-sm text-zinc-400">
            <span className="shrink-0">{en ? "Input size (n)" : "Số phần tử đầu vào (n)"}</span>
            <input
              type="range"
              min={MIN_N}
              max={MAX_N}
              value={n}
              onChange={(event) => setN(Number(event.target.value))}
              className="flex-1 accent-green-500"
            />
            <span className="w-8 shrink-0 text-right font-medium text-green-300">
              {n}
            </span>
          </label>

          <p className="mt-2 text-xs leading-5 text-zinc-400">
            {en
              ? "The vertical axis uses a logarithmic scale: moving up one unit means the value grows tenfold, and grid lines may skip several units. If n doubles, O(n) doubles and O(n²) quadruples; O(2ⁿ) doubles every time n increases by one. This is why fast-growing functions quickly outpace the others."
              : "Trục dọc dùng thang logarit: đi lên một đơn vị tương ứng giá trị tăng gấp 10; các vạch có thể cách nhau nhiều đơn vị. Nếu n tăng gấp đôi, O(n) tăng gấp đôi, O(n²) tăng gấp bốn; O(2ⁿ) còn tăng gấp đôi mỗi khi n tăng thêm 1. Vì vậy, các mức tăng nhanh sẽ sớm vượt xa những mức còn lại."}
          </p>
        </div>

        <aside className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {en ? "Values at n = " : "Giá trị mô phỏng khi n = "}{n}
          </p>
          {active.length === 0 ? (
            <p className="text-sm text-zinc-400">{en ? "Select at least one complexity to show the chart." : "Chọn ít nhất một mức để hiện đồ thị."}</p>
          ) : (
            <ul className="space-y-2.5">
              {[...active]
                .sort((a, b) => a.log10(n) - b.log10(n))
                .map((series) => {
                  const logValue = series.log10(n);
                  const width =
                    maxLogCurrent > 0
                      ? Math.max(4, (logValue / maxLogCurrent) * 100)
                      : 100;
                  return (
                    <li key={series.key}>
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-medium" style={{ color: series.color }}>
                          {series.label}
                        </span>
                        <span className="truncate text-zinc-400">
                          {formatValue(logValue, series.value(n))}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${width}%`,
                            background: series.color,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          )}
        </aside>
      </div>
    </section>
  );
}
