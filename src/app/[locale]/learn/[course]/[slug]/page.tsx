import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CodeBlock from "@/components/code-block";
import DiagramBlock from "@/components/diagram-block";
import LessonToc, { type TocItem } from "@/components/lesson-toc";
import QuizView from "@/components/quiz-view";
import LessonVisualizer from "@/components/visualizers/lesson-visualizer";
import LanguageSwitcher from "@/components/language-switcher";
import {
  courses,
  findLesson,
  findLessonForLocale,
  getAdjacentLessonsForLocale,
  getCourseForLocale,
  type LessonBlock,
} from "@/lib/course";
import { isLocale, localePath, type Locale } from "@/lib/locale";

const VISUALIZER_SECTION_ID = "mo-phong";
const QUIZ_SECTION_ID = "bai-kiem-tra";

export function generateStaticParams() {
  return ["vi", "en"].flatMap((locale) =>
    courses.flatMap((course) =>
      course.modules.flatMap((module) =>
        module.lessons.map((lesson) => ({
          locale,
          course: course.slug,
          slug: lesson.slug,
        })),
      ),
    ),
  );
}

function Blocks({
  blocks,
  locale,
}: {
  blocks: LessonBlock[];
  locale: Locale;
}) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={`section-${index}`}
              className="scroll-mt-24 pt-4 text-2xl font-semibold text-zinc-100"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={index}
              className="pt-3 text-lg font-semibold text-zinc-200"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={index}
              className="list-disc space-y-1.5 pl-6 text-[1.0625rem] leading-8 text-zinc-300"
            >
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "code") {
          return <CodeBlock key={index} snippets={block.snippets} locale={locale} />;
        }
        if (block.type === "diagram") {
          return (
            <DiagramBlock
              key={index}
              nodes={block.nodes}
              edges={block.edges}
              caption={block.caption}
            />
          );
        }
        return (
          <p key={index} className="text-[1.0625rem] leading-8 text-zinc-300">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; course: string; slug: string }>;
}) {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContent params={params} />
    </Suspense>
  );
}

function LessonSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10">
      <div className="flex justify-center gap-10">
        <div className="w-full max-w-3xl">
          <div className="h-4 w-44 animate-pulse rounded bg-zinc-800" />
          <div className="mt-6 h-10 w-2/3 animate-pulse rounded bg-zinc-800" />
          <div className="mt-6 h-4 w-full animate-pulse rounded bg-zinc-800" />
          <div className="mt-3 h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

async function LessonContent({
  params,
}: {
  params: Promise<{ locale: string; course: string; slug: string }>;
}) {
  const { locale: requestedLocale, course: courseSlug, slug } = await params;
  if (!isLocale(requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const en = locale === "en";
  const sourceCourse = courses.find((item) => item.slug === courseSlug);
  if (!sourceCourse) notFound();

  const sourceLesson = findLesson(courseSlug, slug);
  if (!sourceLesson) notFound();
  const course = getCourseForLocale(courseSlug, locale);
  const lesson = findLessonForLocale(courseSlug, slug, locale);
  if (!course) notFound();
  if (!lesson) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-10">
        <div className="mb-8 flex justify-end">
          <LanguageSwitcher
            locale={locale}
            pathname={`/${locale}/learn/${courseSlug}/${slug}`}
          />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-green-400">
          {course.title}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-50">
          English translation in progress
        </h1>
        <p className="mt-4 leading-7 text-zinc-300">
          This lesson has not been translated yet. The Vietnamese version is
          available, and this page will show the English lesson once it has been
          reviewed.
        </p>
        <Link
          href={localePath("vi", `/learn/${courseSlug}/${slug}`)}
          className="mt-6 inline-flex rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
        >
          Read this lesson in Vietnamese
        </Link>
      </main>
    );
  }

  const { prev, next } = getAdjacentLessonsForLocale(courseSlug, slug, locale);

  const tocItems: TocItem[] = lesson.blocks
    .map((block, index) =>
      block.type === "h2"
        ? { id: `section-${index}`, text: block.text }
        : null,
    )
    .filter((item): item is TocItem => item !== null);

  if (lesson.visualizer) {
    tocItems.push({
      id: VISUALIZER_SECTION_ID,
      text: locale === "en" ? "Visualization" : "Mô phỏng",
    });
  }

  if (lesson.quiz) {
    tocItems.push({
      id: QUIZ_SECTION_ID,
      text: locale === "en" ? "Quiz" : "Bài kiểm tra",
    });
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10">
      <div className="mb-5 flex justify-end">
        <LanguageSwitcher
          locale={locale}
          pathname={`/${locale}/learn/${course.slug}/${lesson.slug}`}
        />
      </div>
      <div className="flex justify-center gap-10">
        <article className="w-full min-w-0 max-w-3xl">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
              <Link href={`/${locale}`} className="transition hover:text-zinc-300">
              {en ? "Home" : "Trang chủ"}
            </Link>
            <span>/</span>
            <Link
              href={localePath(locale, `/learn/${course.slug}`)}
              className="transition hover:text-zinc-300"
            >
              {course.tagline}
            </Link>
            <span>/</span>
              <span className="text-zinc-400">{lesson.module}</span>
          </nav>

          <header className="mb-8 border-b border-zinc-800 pb-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-green-400">
              <span className="h-3.5 w-0.5 rounded-full bg-green-500" />
              {lesson.module}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-50">
              {lesson.title}
            </h1>
            <p className="mt-3 text-lg text-zinc-400">{lesson.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-300">
                  {en ? `${lesson.duration} read` : `${lesson.duration} đọc`}
              </span>
              {lesson.visualizer ? (
                <span className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-400">
                  {en ? "Interactive visualization" : "Có mô phỏng tương tác"}
                </span>
              ) : null}
            </div>
          </header>

          <Blocks blocks={lesson.blocks} locale={locale} />

          {lesson.visualizer ? (
            <div id={VISUALIZER_SECTION_ID} className="mt-10 scroll-mt-24">
            <LessonVisualizer type={lesson.visualizer} locale={locale} />
            </div>
          ) : null}

          {lesson.quiz ? (
            <div id={QUIZ_SECTION_ID} className="mt-10 scroll-mt-24">
            <QuizView quiz={lesson.quiz} locale={locale} />
            </div>
          ) : null}

          <nav className="mt-12 flex items-center justify-between gap-4 border-t border-zinc-800 pt-6">
            {prev ? (
              <Link
                href={localePath(locale, `/learn/${course.slug}/${prev.slug}`)}
                className="group max-w-[45%] rounded-lg border border-zinc-800 px-4 py-3 transition hover:border-green-500/50"
              >
                <span className="text-xs text-zinc-400">{en ? "← Previous" : "← Trước"}</span>
                <span className="block truncate text-sm text-zinc-200 group-hover:text-green-300">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={localePath(locale, `/learn/${course.slug}/${next.slug}`)}
                className="group ml-auto max-w-[45%] rounded-lg border border-zinc-800 px-4 py-3 text-right transition hover:border-green-500/50"
              >
                <span className="text-xs text-zinc-400">{en ? "Next →" : "Tiếp →"}</span>
                <span className="block truncate text-sm text-zinc-200 group-hover:text-green-300">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </article>

        {tocItems.length > 0 ? (
          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-8">
            <LessonToc items={tocItems} locale={locale} />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
