"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COURSE_ICONS, Icon } from "@/components/course-icons";
import { getCoursesForLocale, type Course } from "@/lib/course";
import { localePath, type Locale } from "@/lib/locale";

export default function CourseSwitcher({
  active,
  locale,
}: {
  active: Course;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const courses = getCoursesForLocale(locale);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-2.5 py-2 text-left transition hover:border-zinc-700"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-green-500/15 text-green-300">
          <Icon
            name={COURSE_ICONS[active.slug] ?? "module"}
            className="h-5 w-5"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-zinc-100">
            {active.title}
          </span>
          <span className="block truncate text-xs text-zinc-400">
            {active.tagline}
          </span>
        </span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            fill="currentColor"
            d="M5.5 7.5a1 1 0 0 1 1.6-.8l4.9 3.9 4.9-3.9a1 1 0 0 1 1.6.8 1 1 0 0 1-.4.8l-5.3 4.2a1.5 1.5 0 0 1-1.9 0L5.9 8.3a1 1 0 0 1-.4-.8Z"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute inset-x-0 z-20 mt-1.5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 shadow-2xl shadow-black/40"
        >
          {courses.map((course) => {
            const isActive = course.slug === active.slug;
            const courseLessons = course.modules.flatMap((courseModule) => courseModule.lessons);
            const firstLesson = courseLessons[0];
            const href = firstLesson
              ? localePath(locale, `/learn/${course.slug}/${firstLesson.slug}`)
              : localePath(locale, `/learn/${course.slug}`);
            const lessonCount = courseLessons.length;
            return (
              <Link
                key={course.slug}
                href={href}
                role="menuitem"
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition ${
                  isActive
                    ? "bg-green-500/15 text-green-200"
                    : "text-zinc-300 hover:bg-zinc-800/70"
                }`}
              >
                <Icon
                  name={COURSE_ICONS[course.slug] ?? "module"}
                  className="h-5 w-5 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {course.title}
                  </span>
                  <span className="block truncate text-xs text-zinc-400">
                    {locale === "en" ? `${lessonCount} lessons` : `${lessonCount} bài học`}
                  </span>
                </span>
                {isActive ? (
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-green-300"
                  >
                    <path
                      fill="currentColor"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                    />
                  </svg>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
