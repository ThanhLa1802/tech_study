"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";

export type TocItem = { id: string; text: string };

export default function LessonToc({
  items,
  locale,
}: {
  items: TocItem[];
  locale: Locale;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={locale === "en" ? "Lesson contents" : "Mục lục bài học"}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {locale === "en" ? "On this page" : "Trên trang này"}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`block border-l-2 py-1.5 pl-3 text-sm leading-5 transition ${
                  active
                    ? "border-green-500 text-green-200"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
