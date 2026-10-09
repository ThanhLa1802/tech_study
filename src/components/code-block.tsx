"use client";

import { useState } from "react";
import type { CodeSnippet } from "@/lib/course";
import type { Locale } from "@/lib/locale";
import { prioritizePython } from "@/lib/code-snippets";

const LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  text: "Mã giả",
};

export default function CodeBlock({
  snippets,
  locale = "vi",
}: {
  snippets: CodeSnippet[];
  locale?: Locale;
}) {
  const [activeLang, setActiveLang] = useState<string | null>(null);
  const orderedSnippets = prioritizePython(snippets);
  const active = activeLang ?? orderedSnippets[0]?.lang;
  const snippet = orderedSnippets.find((item) => item.lang === active) ?? orderedSnippets[0];

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/70">
      {snippets.length > 1 ? (
        <div
          role="tablist"
          aria-label={locale === "en" ? "Choose language" : "Chọn ngôn ngữ"}
          className="flex items-center gap-1 border-b border-zinc-800 px-2 py-1.5"
        >
          {orderedSnippets.map((item) => {
            const selected = item.lang === active;
            return (
              <button
                key={item.lang}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveLang(item.lang)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium uppercase tracking-wide transition ${
                  selected
                    ? "bg-green-500/15 text-green-200"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-300"
                }`}
              >
                {item.lang === "text"
                  ? locale === "en" ? "Pseudocode" : LABELS.text
                  : LABELS[item.lang] ?? item.lang}
              </button>
            );
          })}
        </div>
      ) : null}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.9375rem] leading-7 text-zinc-200">
        {snippet.code}
      </pre>
    </div>
  );
}
