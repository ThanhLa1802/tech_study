"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, MODULE_ICONS, type IconName } from "@/components/course-icons";
import CourseSwitcher from "@/components/course-switcher";
import { getCourseForLocale, getCoursesForLocale } from "@/lib/course";
import { localePath, type Locale } from "@/lib/locale";

export default function CourseSidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const courses = getCoursesForLocale(locale);
  const courseSlug = segments[2] ?? courses[0]?.slug;
  const activeLessonSlug = segments[3];

  const activeCourse =
    (courseSlug ? getCourseForLocale(courseSlug, locale) : undefined) ?? courses[0];
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  if (!activeCourse) return null;

  const activeModuleId = activeCourse.modules.find((courseModule) =>
    courseModule.lessons.some((lesson) => lesson.slug === activeLessonSlug),
  )?.id;

  function toggleModule(id: string, open: boolean) {
    setOverrides((prev) => ({ ...prev, [id]: !open }));
  }

  return (
    <aside className="hidden w-72 shrink-0 border-r border-zinc-800 bg-zinc-950/40 lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-zinc-800 px-4 py-4">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-green-500 font-bold text-white">
              {"{}"}
            </span>
            <span className="font-semibold text-zinc-100">Learning Hub</span>
          </Link>
          <div className="mt-3">
            <CourseSwitcher active={activeCourse} locale={locale} />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {activeCourse.modules.map((courseModule) => {
            const isActiveModule = courseModule.id === activeModuleId;
            const open = overrides[courseModule.id] ?? isActiveModule;
            return (
              <div key={courseModule.id} className="mb-1.5">
                <button
                  type="button"
                  onClick={() => toggleModule(courseModule.id, open)}
                  aria-expanded={open}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition ${
                    isActiveModule
                      ? "text-green-200"
                      : "text-zinc-300 hover:bg-zinc-800/70"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon
                      name={MODULE_ICONS[courseModule.id] ?? "module"}
                      className="h-4 w-4 shrink-0"
                    />
                    <span className="truncate text-xs font-semibold uppercase tracking-wide">
                      {courseModule.title}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    {courseModule.lessons.length > 1 ? (
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                        {courseModule.lessons.length}
                      </span>
                    ) : null}
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                        open ? "rotate-90" : ""
                      }`}
                    >
                      <path
                        fill="currentColor"
                        d="M7.5 5.5a1 1 0 0 1 1.6-.8l6 4.5a1 1 0 0 1 0 1.6l-6 4.5a1 1 0 0 1-1.6-.8v-9Z"
                      />
                    </svg>
                  </span>
                </button>

                <ul
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <li className="min-h-0">
                    <ul className="space-y-1 py-1 pl-2">
                      {courseModule.lessons
                        .filter((lesson) => !lesson.parentSlug)
                        .map((lesson) => {
                          const children = courseModule.lessons.filter(
                            (child) => child.parentSlug === lesson.slug,
                          );

                          const renderItem = (
                            item: (typeof lesson),
                            nested: boolean,
                          ) => {
                            const href = localePath(locale, `/learn/${activeCourse.slug}/${item.slug}`);
                            const active = pathname === href;
                            return (
                              <Link
                                href={href}
                                className={`flex items-center justify-between rounded-r-lg border-l-2 py-2 pr-2 text-sm transition ${
                                  nested ? "pl-5 text-[13px]" : "pl-2.5"
                                } ${
                                  active
                                    ? "border-green-500 bg-zinc-800/70 text-green-300"
                                    : "border-transparent text-zinc-300 hover:bg-zinc-800/70"
                                }`}
                              >
                                <span className="flex min-w-0 items-center gap-2">
                                  <Icon
                                    name={(item.icon as IconName) ?? "lesson"}
                                    className={`h-3.5 w-3.5 shrink-0 ${
                                      active
                                        ? "text-green-300"
                                        : "text-zinc-400"
                                    }`}
                                  />
                                  <span className="truncate">
                                    {item.title}
                                  </span>
                                </span>
                                {item.quiz ? (
                                  <span className="ml-2 shrink-0 rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] font-medium text-green-300">
                                    quiz
                                  </span>
                                ) : item.visualizer ? (
                                  <span className="ml-2 shrink-0 rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] text-green-300">
                                    viz
                                  </span>
                                ) : null}
                              </Link>
                            );
                          };

                          return (
                            <li key={lesson.slug}>
                              {renderItem(lesson, false)}
                              {children.length > 0 ? (
                                <ul className="mt-1 space-y-1 pl-4">
                                  {children.map((child) => (
                                    <li key={child.slug}>
                                      {renderItem(child, true)}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
