import Link from "next/link";
import { COURSE_ICONS, Icon } from "@/components/course-icons";
import { GlowCard } from "@/components/glow-card";
import LanguageSwitcher from "@/components/language-switcher";
import { NodeHopBoard } from "@/components/node-hop-board";
import { notFound } from "next/navigation";
import { getCoursesForLocale } from "@/lib/course";
import { isLocale, localePath, type Locale } from "@/lib/locale";

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  if (!isLocale(requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const en = locale === "en";
  const courses = getCoursesForLocale(locale);
  const lessons = courses.flatMap((course) =>
    course.modules.flatMap((courseModule) => courseModule.lessons),
  );
  const vizCount = lessons.filter((lesson) => lesson.visualizer).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <header className="mb-14">
        <div className="mb-8 flex justify-end">
          <LanguageSwitcher locale={locale} pathname={`/${locale}`} />
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
              {en ? "Learn through examples and visualizations" : "Cùng học qua ví dụ và mô phỏng"}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
              {en ? "Learn DSA & system design" : "Học DSA & thiết kế hệ thống"}
              <span className="block text-green-400">
                {en ? "visually" : "theo cách trực quan"}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-400">
              {en
                ? "Explore data structures, algorithms (DSA), and system design through concise lessons, clear code examples, and step-by-step visualizations. Understand how things work instead of memorizing theory."
                : "Khám phá cấu trúc dữ liệu, giải thuật (DSA) và cách thiết kế hệ thống qua bài học ngắn gọn, ví dụ mã nguồn dễ hiểu cùng mô phỏng từng bước. Bạn sẽ hiểu cách mọi thứ vận hành thay vì chỉ học thuộc lý thuyết."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={localePath(locale, "/learn/dsa/bubble-sort")}
                className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-400"
              >
                {en ? "Explore Bubble Sort" : "Xem mô phỏng Bubble Sort"}
              </Link>
              <Link
                href={localePath(locale, "/learn/dsa/course-introduction")}
                className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
              >
                {en ? "Start learning" : "Bắt đầu từ đầu"}
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              {en
                ? `${courses.length} courses · ${lessons.length} lessons · ${vizCount} visualizations`
                : `${courses.length} khóa · ${lessons.length} bài học · ${vizCount} mô phỏng`}
            </p>
          </div>
          <div className="hidden justify-center lg:flex">
            <GlowCard
              color="green"
              speed={9}
              innerClassName="flex flex-col items-center gap-4 p-7"
            >
              <NodeHopBoard />
              <p className="max-w-[13rem] text-center text-xs leading-5 text-zinc-400">
                {en
                  ? "Every algorithm plays step by step — watch each move come to life."
                  : "Mỗi thuật toán đều phát được từng bước — xem từng bước chuyển động."}
              </p>
            </GlowCard>
          </div>
        </div>
      </header>

      <section className="grid gap-5 sm:grid-cols-2">
        {courses.map((course) => {
          const courseLessons = course.modules.flatMap((courseModule) => courseModule.lessons);
          const first = courseLessons[0];
          const href = first
            ? localePath(locale, `/learn/${course.slug}/${first.slug}`)
            : localePath(locale, `/learn/${course.slug}`);
          return (
            <GlowCard
              key={course.id}
              color={course.slug === "system-design" ? "blue" : "green"}
              speed={10}
              className="h-full"
            >
              <Link
                href={href}
                className="group flex h-full flex-col p-6 transition hover:bg-zinc-900/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-green-500/15 text-green-300">
                  <Icon
                    name={COURSE_ICONS[course.slug] ?? "module"}
                    className="h-6 w-6"
                  />
                </span>
                <h2 className="mt-4 text-xl font-semibold text-zinc-100 group-hover:text-green-300">
                  {course.title}
                </h2>
                <p className="mt-1 text-sm text-green-300/80">
                  {course.tagline}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {course.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {course.modules.map((module) => (
                    <span
                      key={module.id}
                      className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
                    >
                      {module.title}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-4">
                  <span className="text-xs text-zinc-400">
                    {course.modules.length} {en ? "topics" : "chủ đề"} · {courseLessons.length} {en ? "lessons" : "bài"}
                  </span>
                  <span className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-green-400">
                    {first
                      ? `${en ? "Start:" : "Bắt đầu:"} ${first.title}`
                      : en ? "Start" : "Bắt đầu"}
                  </span>
                </div>
              </Link>
            </GlowCard>
          );
        })}
      </section>
    </div>
  );
}
