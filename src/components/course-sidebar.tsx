"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  COURSE_ICONS,
  Icon,
  MODULE_ICONS,
  type IconName,
} from "@/components/course-icons";
import CourseSwitcher from "@/components/course-switcher";
import { getCourseForLocale, getCoursesForLocale } from "@/lib/course";
import { localePath, type Locale } from "@/lib/locale";

const STORAGE_COLLAPSED = "lh:sidebar-collapsed";
const STORAGE_WIDTH = "lh:sidebar-width";
const DEFAULT_WIDTH = 288;
const MIN_WIDTH = 208;
const MAX_WIDTH = 448;
const RAIL_WIDTH = 64;
const KEYBOARD_STEP = 16;

export default function CourseSidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const courses = getCoursesForLocale(locale);
  const courseSlug = segments[2] ?? courses[0]?.slug;
  const activeLessonSlug = segments[3];

  const activeCourse =
    (courseSlug ? getCourseForLocale(courseSlug, locale) : undefined) ?? courses[0];
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<{ startX: number; startWidth: number } | null>(null);
  const widthRef = useRef(width);

  // Restore persisted preferences after hydration so the first render matches SSR.
  useEffect(() => {
    function restorePreferences() {
      const storedWidth = Number(localStorage.getItem(STORAGE_WIDTH));
      if (storedWidth >= MIN_WIDTH && storedWidth <= MAX_WIDTH) {
        widthRef.current = storedWidth;
        setWidth(storedWidth);
      }
      setCollapsed(localStorage.getItem(STORAGE_COLLAPSED) === "1");
    }
    restorePreferences();
  }, []);

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  useEffect(() => {
    if (!dragging) return;
    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    return () => {
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
    };
  }, [dragging]);

  if (!activeCourse) return null;

  const activeModuleId = activeCourse.modules.find((courseModule) =>
    courseModule.lessons.some((lesson) => lesson.slug === activeLessonSlug),
  )?.id;

  const labels =
    locale === "en"
      ? {
          toggle: collapsed ? "Expand sidebar" : "Collapse sidebar",
          resize: "Resize sidebar",
          nav: "Course navigation",
        }
      : {
          toggle: collapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên",
          resize: "Kéo để thay đổi kích thước thanh bên",
          nav: "Điều hướng khóa học",
        };

  const firstCourseLesson = activeCourse.modules.flatMap((m) => m.lessons)[0];
  const courseHref = firstCourseLesson
    ? localePath(
        locale,
        `/learn/${activeCourse.slug}/${firstCourseLesson.slug}`,
      )
    : localePath(locale, `/learn/${activeCourse.slug}`);

  function toggleModule(id: string, open: boolean) {
    setOverrides((prev) => ({ ...prev, [id]: !open }));
  }

  function toggleCollapsed() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(STORAGE_COLLAPSED, next ? "1" : "0");
  }

  function startResize(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    dragState.current = { startX: event.clientX, startWidth: widthRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function resize(event: PointerEvent<HTMLDivElement>) {
    const state = dragState.current;
    if (!state) return;
    const next = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, state.startWidth + (event.clientX - state.startX)),
    );
    widthRef.current = next;
    setWidth(next);
  }

  function endResize(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current) return;
    dragState.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    localStorage.setItem(STORAGE_WIDTH, String(widthRef.current));
  }

  function resizeByKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowLeft" ? -KEYBOARD_STEP : KEYBOARD_STEP;
    const next = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, widthRef.current + delta),
    );
    widthRef.current = next;
    setWidth(next);
    localStorage.setItem(STORAGE_WIDTH, String(next));
  }

  return (
    <aside
      className={`relative hidden shrink-0 border-r border-zinc-800 bg-zinc-950/40 lg:block ${
        dragging ? "" : "transition-[width] duration-200 ease-out"
      }`}
      style={{ width: collapsed ? RAIL_WIDTH : width }}
    >
      <div className="sticky top-0 flex h-screen flex-col">
        {collapsed ? (
          <div className="flex flex-col items-center border-b border-zinc-800 px-2 py-4">
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-expanded={!collapsed}
              aria-label={labels.toggle}
              className="grid h-9 w-9 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-800/70 hover:text-zinc-100"
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-4 w-4 rotate-180"
              >
                <path
                  fill="currentColor"
                  d="M12.7 5.3a1 1 0 0 0-1.4 0l-4 4a1 1 0 0 0 0 1.4l4 4a1 1 0 0 0 1.4-1.4L9.4 10l3.3-3.3a1 1 0 0 0 0-1.4Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="border-b border-zinc-800 px-4 py-4">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/${locale}`}
                className="flex min-w-0 items-center gap-2"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-green-500 font-bold text-white">
                  {"{}"}
                </span>
                <span className="font-semibold text-zinc-100">Learning Hub</span>
              </Link>
              <button
                type="button"
                onClick={toggleCollapsed}
                aria-expanded={!collapsed}
                aria-label={labels.toggle}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-800/70 hover:text-zinc-100"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M12.7 5.3a1 1 0 0 0-1.4 0l-4 4a1 1 0 0 0 0 1.4l4 4a1 1 0 0 0 1.4-1.4L9.4 10l3.3-3.3a1 1 0 0 0 0-1.4Z"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-3">
              <CourseSwitcher active={activeCourse} locale={locale} />
            </div>
          </div>
        )}

        {collapsed ? (
          <nav
            className="flex-1 overflow-y-auto px-2 py-4"
            aria-label={labels.nav}
          >
            <ul className="flex flex-col items-center gap-1.5">
              <li>
                <Link
                  href={courseHref}
                  title={activeCourse.title}
                  aria-label={activeCourse.title}
                  className="grid h-9 w-9 place-items-center rounded-lg text-green-300 transition hover:bg-zinc-800/70"
                >
                  <Icon
                    name={COURSE_ICONS[activeCourse.slug] ?? "module"}
                    className="h-5 w-5"
                  />
                </Link>
              </li>
              {activeCourse.modules.map((courseModule) => {
                const firstLesson = courseModule.lessons[0];
                const href = firstLesson
                  ? localePath(
                      locale,
                      `/learn/${activeCourse.slug}/${firstLesson.slug}`,
                    )
                  : localePath(locale, `/learn/${activeCourse.slug}`);
                const isActiveModule = courseModule.id === activeModuleId;
                return (
                  <li key={courseModule.id}>
                    <Link
                      href={href}
                      title={courseModule.title}
                      aria-label={courseModule.title}
                      className={`grid h-9 w-9 place-items-center rounded-lg transition ${
                        isActiveModule
                          ? "bg-zinc-800/70 text-green-300"
                          : "text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100"
                      }`}
                    >
                      <Icon
                        name={MODULE_ICONS[courseModule.id] ?? "module"}
                        className="h-5 w-5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : (
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
                      <span className="text-xs font-semibold uppercase tracking-wide">
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
                          .map((lesson, index, groupLessons) => {
                            const children = courseModule.lessons.filter(
                              (child) => child.parentSlug === lesson.slug,
                            );
                            const startsGroup =
                              Boolean(lesson.group) &&
                              lesson.group !== groupLessons[index - 1]?.group;

                            const renderItem = (
                              item: (typeof lesson),
                              nested: boolean,
                              grouped: boolean,
                            ) => {
                              const href = localePath(locale, `/learn/${activeCourse.slug}/${item.slug}`);
                              const active = pathname === href;
                              return (
                                <Link
                                  href={href}
                                  className={`flex items-center justify-between rounded-r-lg border-l-2 py-2 pr-2 text-sm transition ${
                                    nested
                                      ? grouped
                                        ? "pl-8 text-[13px]"
                                        : "pl-5 text-[13px]"
                                      : grouped
                                        ? "pl-6"
                                        : "pl-2.5"
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
                                    <span>{item.title}</span>
                                    {item.isNew ? (
                                      <span className="ml-2 shrink-0 rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-black">
                                        NEW
                                      </span>
                                    ) : null}
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
                              <Fragment key={lesson.slug}>
                                {startsGroup ? (
                                  <li>
                                    <span className="block px-2.5 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-green-300">
                                      {lesson.group}
                                    </span>
                                  </li>
                                ) : null}
                                <li>
                                  {renderItem(lesson, false, Boolean(lesson.group))}
                                  {children.length > 0 ? (
                                    <ul className="mt-1 space-y-1 pl-4">
                                      {children.map((child) => (
                                        <li key={child.slug}>
                                          {renderItem(child, true, Boolean(lesson.group))}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </li>
                              </Fragment>
                            );
                          })}
                      </ul>
                    </li>
                  </ul>
                </div>
              );
            })}
          </nav>
        )}

        {collapsed ? null : (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label={labels.resize}
            aria-valuemin={MIN_WIDTH}
            aria-valuemax={MAX_WIDTH}
            aria-valuenow={width}
            tabIndex={0}
            onPointerDown={startResize}
            onPointerMove={resize}
            onPointerUp={endResize}
            onPointerCancel={endResize}
            onKeyDown={resizeByKeyboard}
            className="absolute inset-y-0 right-0 z-10 w-1.5 cursor-col-resize touch-none select-none bg-transparent transition hover:bg-green-500/40 focus-visible:bg-green-500/60 focus-visible:outline-none"
          />
        )}
      </div>
    </aside>
  );
}
