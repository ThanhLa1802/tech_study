import CourseSidebar from "@/components/course-sidebar";
import ReadingProgress from "@/components/reading-progress";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";

export default async function LearnLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="flex min-h-screen w-full">
      <CourseSidebar locale={locale} />
      <div className="min-w-0 flex-1">
        <ReadingProgress locale={locale} />
        {children}
      </div>
    </div>
  );
}
