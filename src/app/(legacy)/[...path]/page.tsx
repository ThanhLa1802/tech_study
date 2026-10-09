import { redirect } from "next/navigation";
import { courses } from "@/lib/course";

export function generateStaticParams() {
  return [
    { path: ["learn"] },
    ...courses.flatMap((course) => [
      { path: ["learn", course.slug] },
      ...course.modules.flatMap((courseModule) =>
        courseModule.lessons.map((lesson) => ({
          path: ["learn", course.slug, lesson.slug],
        })),
      ),
    ]),
  ];
}

export default async function LegacyRoute({
  params,
}: {
    params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  redirect(`/vi${path.length ? `/${path.join("/")}` : ""}`);
}
