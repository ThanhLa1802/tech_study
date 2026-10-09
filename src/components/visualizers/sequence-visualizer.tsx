"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/course-icons";
import { NODE_TONE } from "@/components/diagram-svg";
import {
  layoutSequence,
  localizeSequenceSpec,
  type SequenceSpec,
} from "@/lib/sequence";
import type { Locale } from "@/lib/locale";

const ARROW_COLOR = "#e4e4e7";
const STEP_MS = 800;

export default function SequenceVisualizer({
  spec,
  locale,
}: {
  spec: SequenceSpec;
  locale: Locale;
}) {
  const en = locale === "en";
  const display = useMemo(
    () => localizeSequenceSpec(spec, locale),
    [spec, locale],
  );
  const layout = useMemo(() => layoutSequence(display), [display]);
  const frames = useMemo(() => spec.build(locale), [spec, locale]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const atEnd = step >= frames.length - 1;
  const isPlaying = playing && !atEnd;
  const frame = frames[Math.min(step, frames.length - 1)];
  const total = display.messages.length;

  // Prefer the localized message label for the active step so the caption and
  // the arrow always read the same text in the selected language.
  const activeMessage = frame.activeId
    ? display.messages.find((message) => message.id === frame.activeId)
    : undefined;
  const note = activeMessage?.label ?? frame.note;

  useEffect(() => {
    if (!playing || atEnd) return;
    const timer = setTimeout(
      () => setStep((current) => Math.min(current + 1, frames.length - 1)),
      STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [playing, step, frames.length, atEnd]);

  const { height, width, lifelineTop, contentBottom, bandX1, bandX2 } = layout;
  const { lineHeight, labelPaddingY, headerWidth, headerHeight, headerY } =
    layout.options;
  const headerTop = headerY;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">{display.title}</h3>
          <p className="text-sm text-zinc-400">
            {en ? "Message" : "Bước"} {frame.step} / {total}
          </p>
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          style={{ minWidth: width }}
          role="img"
          aria-label={`${display.title}. ${note}`}
        >
          <defs>
            <marker
              id="seq-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="8"
              refY="4.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0 0 L9 4.5 L0 9 z" fill={ARROW_COLOR} />
            </marker>
          </defs>

          {layout.participants.map((participant) => (
            <line
              key={participant.id}
              x1={participant.x}
              y1={lifelineTop}
              x2={participant.x}
              y2={contentBottom}
              className="stroke-zinc-600"
              strokeWidth={1.5}
              strokeDasharray="6 6"
            />
          ))}

          {layout.bands.map((band) => {
            const source = display.bands?.[band.index];
            if (!source) return null;
            const revealed = step > band.beforeIndex;
            return (
              <g
                key={band.index}
                style={{ opacity: revealed ? 1 : 0 }}
                className="transition-opacity duration-300"
              >
                <rect
                  x={bandX1}
                  y={band.y}
                  width={bandX2 - bandX1}
                  height={band.height}
                  rx={10}
                  className="fill-amber-500"
                />
                <text
                  x={width / 2}
                  y={band.y + band.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-zinc-950 text-xs font-semibold"
                >
                  {source.label}
                </text>
              </g>
            );
          })}

          {layout.messages.map((message) => {
            const source = display.messages[message.index];
            const revealed = message.index < frame.step;
            const active = message.index === frame.step - 1;
            const { labelBox } = message;
            const firstLineTop =
              labelBox.y + labelPaddingY + lineHeight / 2;
            return (
              <g
                key={message.id}
                style={{ opacity: !revealed ? 0 : active ? 1 : 0.45 }}
                className="transition-opacity duration-300"
              >
                <line
                  x1={message.fromX}
                  y1={message.arrowY}
                  x2={message.toX}
                  y2={message.arrowY}
                  stroke={ARROW_COLOR}
                  strokeWidth={1.5}
                  strokeDasharray={source?.dashed ? "6 5" : undefined}
                  markerEnd="url(#seq-arrow)"
                />
                {/* Mask the label area so lifelines never run through the text. */}
                <rect
                  x={labelBox.x}
                  y={labelBox.y}
                  width={labelBox.width}
                  height={labelBox.height}
                  rx={5}
                  className="fill-zinc-950"
                />
                {message.lines.map((line, lineIndex) => (
                  <text
                    key={lineIndex}
                    x={message.labelX}
                    y={firstLineTop + lineIndex * lineHeight}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-zinc-100 text-xs font-medium"
                  >
                    {line.text}
                  </text>
                ))}
              </g>
            );
          })}

          {layout.participants.map((participant) => {
            const source = spec.participants.find(
              (item) => item.id === participant.id,
            );
            if (!source) return null;
            const label = display.participants.find(
              (item) => item.id === participant.id,
            )?.label;
            return (
              <g key={participant.id}>
                <text
                  x={participant.x}
                  y={headerY - 12}
                  textAnchor="middle"
                  className="fill-zinc-100 text-[13px] font-semibold"
                >
                  {label}
                </text>
                <rect
                  x={participant.x - headerWidth / 2}
                  y={headerTop}
                  width={headerWidth}
                  height={headerHeight}
                  rx={12}
                  strokeWidth={1.5}
                  className={NODE_TONE[source.tone]}
                />
                <Icon
                  name={source.icon}
                  x={participant.x - 14}
                  y={headerY + headerHeight / 2 - 14}
                  width={28}
                  height={28}
                  className="text-white"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-3 min-h-6 text-sm text-zinc-300">{note}</p>

      <div className="mt-4 flex items-center justify-center gap-2">
        <ControlButton
          label={en ? "Restart" : "Chạy lại"}
          onClick={() => {
            setStep(0);
            setPlaying(false);
          }}
        >
          <path d="M4 12a8 8 0 1 0 2.4-5.7" />
          <path d="M4 4.5V8h3.6" />
        </ControlButton>
        <ControlButton
          label={en ? "Previous" : "Lùi"}
          onClick={() => {
            setPlaying(false);
            setStep((current) => Math.max(0, current - 1));
          }}
          disabled={step === 0}
        >
          <path d="M14 6l-6 6 6 6" />
        </ControlButton>
        <ControlButton
          label={isPlaying ? (en ? "Pause" : "Tạm dừng") : en ? "Play" : "Chạy"}
          onClick={() => {
            if (atEnd) {
              setStep(0);
              setPlaying(true);
              return;
            }
            setPlaying((value) => !value);
          }}
          primary
        >
          {isPlaying ? (
            <>
              <path d="M8 5v14" />
              <path d="M16 5v14" />
            </>
          ) : (
            <path d="M7 5l12 7-12 7z" />
          )}
        </ControlButton>
        <ControlButton
          label={en ? "Next" : "Tiến"}
          onClick={() => {
            setPlaying(false);
            setStep((current) => Math.min(frames.length - 1, current + 1));
          }}
          disabled={atEnd}
        >
          <path d="M10 6l6 6-6 6" />
        </ControlButton>
        <span className="ml-2 text-sm tabular-nums text-zinc-400">
          {frame.step} / {total}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {display.messages.map((message, index) => (
          <span
            key={message.id}
            className={`h-1.5 w-1.5 rounded-full ${
              index < frame.step ? "bg-green-400" : "bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function ControlButton({
  label,
  onClick,
  disabled,
  primary,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-30 ${
        primary
          ? "border-green-500 bg-green-500 text-white hover:bg-green-400"
          : "border-zinc-700 text-zinc-200 hover:bg-zinc-800"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        {children}
      </svg>
    </button>
  );
}
