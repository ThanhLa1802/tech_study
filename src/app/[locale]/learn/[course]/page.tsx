import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { courses, getCourseForLocale } from "@/lib/course";
import { isLocale, localePath } from "@/lib/locale";

export function generateStaticParams() {
  return ["vi", "en"].flatMap((locale) =>
    courses.map((course) => ({ locale, course: course.slug })),
  );
}

export default async function CourseIndex({
  params,
}: {
  params: Promise<{ locale: string; course: string }>;
}) {
  const { locale: requestedLocale, course: courseSlug } = await params;
  if (!isLocale(requestedLocale)) notFound();
  const locale = requestedLocale;
  const course = getCourseForLocale(courseSlug, locale);
  if (!course) notFound();
  const first = course.modules[0]?.lessons[0];
  if (!first) {
    const sourceCourse = courses.find((item) => item.slug === courseSlug);
    const sourceFirst = sourceCourse?.modules[0]?.lessons[0];
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-10">
        <h1 className="text-3xl font-bold text-zinc-50">
          {locale === "en" ? "English course translation in progress" : "Bản dịch khóa học đang được chuẩn bị"}
        </h1>
        <p className="mt-4 leading-7 text-zinc-300">
          {locale === "en"
            ? "This course is not available in English yet. You can read the Vietnamese course while the translation is being reviewed."
            : "Khóa học này chưa có nội dung ở ngôn ngữ đã chọn."}
        </p>
        {sourceFirst ? (
          <Link
            href={localePath("vi", `/learn/${courseSlug}/${sourceFirst.slug}`)}
            className="mt-6 inline-flex rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
          >
            {locale === "en" ? "Read in Vietnamese" : "Mở khóa học"}
          </Link>
        ) : null}
      </main>
    );
  }
  redirect(`/${locale}/learn/${course.slug}/${first.slug}`);
}
