"use client";

import { useEffect, useRef, useState } from "react";
import CodeBlock from "@/components/code-block";
import type { Quiz } from "@/lib/course";
import type { Locale } from "@/lib/locale";
import {
  quizMessage,
  quizPercent,
  scoreQuiz,
  type QuizAnswer,
} from "@/lib/quiz";

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const EXTEND_SECONDS = 15;

export default function QuizView({
  quiz,
  locale,
}: {
  quiz: Quiz;
  locale: Locale;
}) {
  const en = locale === "en";
  const total = quiz.questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>(() =>
    new Array<QuizAnswer>(total).fill(null),
  );
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(
    quiz.timedSeconds ?? null,
  );
  const [paused, setPaused] = useState(false);
  const [timerOff, setTimerOff] = useState(false);
  const timeoutRef = useRef<() => void>(() => {});

  const question = quiz.questions[index];
  const score = scoreQuiz(quiz, answers);
  const answeredCount = index + (checked ? 1 : 0);
  const percent = quizPercent(score, total);
  const isLast = index === total - 1;

  useEffect(() => {
    timeoutRef.current = () => {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = selected;
        return next;
      });
      setChecked(true);
    };
  });

  useEffect(() => {
    if (!quiz.timedSeconds || timerOff || paused || checked || finished) return;
    const id = setInterval(() => {
      setTimeLeft((value) => {
        if (value === null) return value;
        const nextValue = value - 1;
        if (nextValue <= 0) {
          timeoutRef.current();
          return 0;
        }
        return nextValue;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [quiz.timedSeconds, timerOff, paused, checked, finished, index]);

  function choose(optionIndex: number) {
    if (checked) return;
    setSelected(optionIndex);
  }

  function submit() {
    if (selected === null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = selected;
      return next;
    });
    setChecked(true);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
    setPaused(false);
    setTimeLeft(quiz.timedSeconds ?? null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers(new Array<QuizAnswer>(total).fill(null));
    setFinished(false);
    setPaused(false);
    setTimerOff(false);
    setTimeLeft(quiz.timedSeconds ?? null);
  }

  if (finished) {
    const message = quizMessage(percent, locale);
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-zinc-50">
              {quiz.title} — {en ? "Results" : "Kết quả"}
            </h3>
            <p className={`mt-1 text-sm ${message.tone}`}>{message.title}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-400">
              {score}
              <span className="text-lg text-zinc-400">/{total}</span>
            </p>
            <p className="text-xs text-zinc-400">
              {percent}% {en ? "correct" : "chính xác"}
            </p>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500 motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>

        <ul className="mt-6 space-y-3">
          {quiz.questions.map((item, i) => {
            const correct = answers[i] === item.answer;
            return (
              <li
                key={item.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      correct
                        ? "bg-green-500/15 text-green-300"
                        : "bg-rose-500/15 text-rose-300"
                    }`}
                    aria-hidden="true"
                  >
                    {correct ? "✓" : "✗"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-200">
                      {i + 1}. {item.prompt}
                    </p>
                    <p className="mt-1 text-sm text-green-300">
                      {en ? "Answer" : "Đáp án"}: {LETTERS[item.answer]}. {item.options[item.answer]}
                    </p>
                    {!correct ? (
                      <p className="mt-0.5 text-sm text-rose-300">
                        {en ? "Your answer:" : "Bạn chọn:"}{" "}
                        {answers[i] === null
                          ? en ? "no answer" : "không trả lời"
                          : `${LETTERS[answers[i] as number]}. ${
                              item.options[answers[i] as number]
                            }`}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={restart}
          className="mt-5 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
        >
          {en ? "Try again" : "Làm lại"}
        </button>
      </section>
    );
  }

  const progress = (answeredCount / total) * 100;
  const hasTimer = Boolean(quiz.timedSeconds);
  const timerActive = hasTimer && !timerOff;
  const low = timerActive && timeLeft !== null && timeLeft <= 5;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <header className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-zinc-50">{quiz.title}</h3>
          <div className="flex flex-wrap items-center gap-2">
            {timerActive ? (
              <span
                className={`rounded-md px-2.5 py-1 text-xs font-semibold tabular-nums ${
                  low
                    ? "bg-rose-500/15 text-rose-300"
                    : "bg-zinc-800 text-zinc-300"
                }`}
                aria-label={en ? "Time remaining" : "Thời gian còn lại"}
              >
                ⏱ {Math.max(0, timeLeft ?? 0)}s
              </span>
            ) : hasTimer ? (
              <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                {en ? "Timer is off" : "Đồng hồ đã tắt"}
              </span>
            ) : null}
            <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
              {index + 1}/{total}
            </span>
          </div>
        </div>

        {hasTimer ? (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {timerOff ? (
              <button
                type="button"
                onClick={() => setTimerOff(false)}
                className="min-h-6 rounded-md border border-zinc-700 px-2.5 py-1 text-zinc-300 transition hover:bg-zinc-800"
              >
                {en ? "Turn timer on" : "Bật đồng hồ"}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-pressed={paused}
                  className="min-h-6 rounded-md border border-zinc-700 px-2.5 py-1 text-zinc-300 transition hover:bg-zinc-800"
                >
                  {paused ? (en ? "Resume" : "Tiếp tục") : (en ? "Pause" : "Tạm dừng")}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTimeLeft((value) => (value ?? 0) + EXTEND_SECONDS)
                  }
                  className="min-h-6 rounded-md border border-zinc-700 px-2.5 py-1 text-zinc-300 transition hover:bg-zinc-800"
                >
                  +{EXTEND_SECONDS}s
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimerOff(true);
                    setPaused(false);
                  }}
                  className="min-h-6 rounded-md border border-zinc-700 px-2.5 py-1 text-zinc-400 transition hover:bg-zinc-800"
                >
                  {en ? "Turn timer off" : "Tắt đồng hồ"}
                </button>
              </>
            )}
          </div>
        ) : null}

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-300 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="flex items-center gap-2">
        {question.tag ? (
          <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
            {question.tag}
          </span>
        ) : null}
        <p className="text-[15px] font-medium leading-7 text-zinc-100">
          {question.prompt}
        </p>
      </div>

      {question.code ? (
        <div className="mt-4">
          <CodeBlock
            snippets={[{ lang: "javascript", code: question.code }]}
            locale={locale}
          />
        </div>
      ) : null}

        <div className="mt-4 space-y-2" role="group" aria-label={en ? "Answer choices" : "Đáp án"}>
        {question.options.map((option, i) => {
          const isAnswer = i === question.answer;
          const isSelected = i === selected;
          let cls =
            "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800";
          if (!checked && isSelected)
            cls = "border-zinc-300 bg-zinc-800 text-zinc-50";
          else if (checked && isAnswer)
            cls = "border-green-500 bg-green-500/10 text-green-200";
          else if (checked && isSelected)
            cls = "border-rose-500 bg-rose-500/10 text-rose-200";
          else if (checked) cls = "border-zinc-800 bg-zinc-900/40 text-zinc-400";

          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={checked}
              aria-pressed={isSelected}
              className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${cls} ${
                checked ? "cursor-default" : ""
              }`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-current/30 text-xs font-semibold">
                {LETTERS[i]}
              </span>
              <span className="min-w-0">{option}</span>
            </button>
          );
        })}
      </div>

      {checked ? (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-xl border p-4 ${
            selected === question.answer
              ? "border-green-500/40 bg-green-500/5"
              : "border-rose-500/40 bg-rose-500/5"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              selected === question.answer ? "text-green-300" : "text-rose-300"
            }`}
          >
            {selected === null
              ? en ? "Time is up — no answer" : "Hết giờ — không trả lời"
              : selected === question.answer
                ? en ? "Correct!" : "Chính xác!"
                : en ? "Not quite" : "Chưa đúng"}
          </p>
          <p className="mt-1 text-sm leading-6 text-zinc-300">
            {question.explanation}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-400">
          {en
            ? `${score}/${answeredCount} answered correctly`
            : `Đúng ${score}/${answeredCount} câu đã trả lời`}
        </p>
        {!checked ? (
          <button
            type="button"
            onClick={submit}
            disabled={selected === null}
            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {en ? "Check answer" : "Kiểm tra"}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
          >
            {isLast
              ? en ? "See results" : "Xem kết quả"
              : en ? "Next question →" : "Câu tiếp theo →"}
          </button>
        )}
      </div>
    </section>
  );
}
