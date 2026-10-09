import Link from "next/link";
import { localePath, type Locale } from "@/lib/locale";

export default function LanguageSwitcher({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  const nextLocale = locale === "vi" ? "en" : "vi";
  const localPath = pathname.replace(/^\/(?:vi|en)(?=\/|$)/, "") || "/";

  return (
    <Link
      href={localePath(nextLocale, localPath)}
      hrefLang={nextLocale}
      lang={nextLocale}
      aria-label={locale === "vi" ? "Switch to English" : "Switch to Vietnamese"}
      className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-green-500/50 hover:text-green-300"
    >
      {locale === "vi" ? "English" : "Vietnamese"}
    </Link>
  );
}
