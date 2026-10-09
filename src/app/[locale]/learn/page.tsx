import { redirect } from "next/navigation";
import { courses } from "@/lib/course";

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }];
}

export default async function LearnIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/learn/${courses[0].slug}`);
}
