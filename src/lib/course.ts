import { dsaModules as rawDsaModules } from "@/content/dsa";
import { systemDesignModules as rawSystemDesignModules } from "@/content/system-design";
import { validateCourse, validateCourseModules } from "@/content/schema";
import { englishCourses, englishModules, translateLesson } from "@/content/translations/en";
import type { Course, Lesson } from "@/lib/course-types";
import type { Locale } from "@/lib/locale";

export * from "@/lib/course-types";

export const dsaModules = validateCourseModules(rawDsaModules);
export const systemDesignModules = validateCourseModules(rawSystemDesignModules);

export const courses: Course[] = [
  validateCourse({
    id: "dsa",
    slug: "dsa",
    title: "Data Structures & Algorithms",
    tagline: "Nền tảng thuật toán & cấu trúc dữ liệu",
    description:
      "Lý thuyết ngắn gọn, code mẫu và mô phỏng từng bước cho các cấu trúc dữ liệu và thuật toán nền tảng.",
    modules: dsaModules,
  }),
  validateCourse({
    id: "system-design",
    slug: "system-design",
    title: "System Design",
    tagline: "Thiết kế hệ thống phân tán",
    description:
      "Xây nền tảng thiết kế hệ thống phân tán: scaling, caching, sharding, replication, CAP và reliability.",
    modules: systemDesignModules,
  }),
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesForLocale(locale: Locale): Course[] {
  if (locale === "vi") return courses;

  return courses.map((course) => {
    const translation = englishCourses[course.slug as keyof typeof englishCourses];
    return {
      ...course,
      ...translation,
      modules: course.modules
        .map((courseModule) => ({
          ...courseModule,
          title: englishModules[courseModule.id] ?? courseModule.title,
          lessons: courseModule.lessons
            .map(translateLesson)
            .filter((lesson): lesson is Lesson => lesson !== undefined),
        }))
        .filter((courseModule) => courseModule.lessons.length > 0),
    };
  });
}

export function getCourseForLocale(
  slug: string,
  locale: Locale,
): Course | undefined {
  return getCoursesForLocale(locale).find((course) => course.slug === slug);
}

export function findLessonForLocale(
  courseSlug: string,
  lessonSlug: string,
  locale: Locale,
): Lesson | undefined {
  const course = getCourseForLocale(courseSlug, locale);
  return course?.modules.flatMap((courseModule) => courseModule.lessons).find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getAdjacentLessonsForLocale(
  courseSlug: string,
  lessonSlug: string,
  locale: Locale,
): { prev?: Lesson; next?: Lesson } {
  const lessons = getCourseLessons(courseSlug);
  const index = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (index === -1) return {};
  const prev = index > 0 ? lessons[index - 1] : undefined;
  const next = index < lessons.length - 1 ? lessons[index + 1] : undefined;
  return {
    prev: prev ? findLessonForLocale(courseSlug, prev.slug, locale) : undefined,
    next: next ? findLessonForLocale(courseSlug, next.slug, locale) : undefined,
  };
}

export function getCourseLessons(courseSlug: string): Lesson[] {
  const course = getCourse(courseSlug);
  return course ? course.modules.flatMap((m) => m.lessons) : [];
}

export function getFirstLesson(course: Course): Lesson | undefined {
  return course.modules[0]?.lessons[0];
}

export function findLesson(
  courseSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCourseLessons(courseSlug).find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getAdjacentLessons(
  courseSlug: string,
  lessonSlug: string,
): {
  prev?: Lesson;
  next?: Lesson;
} {
  const lessons = getCourseLessons(courseSlug);
  const index = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? lessons[index - 1] : undefined,
    next: index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}
