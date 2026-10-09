"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";

export default function ReadingProgress({ locale }: { locale: Locale }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const value = total > 0 ? doc.scrollTop / total : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-zinc-800/50"
      role="progressbar"
      aria-label={locale === "en" ? "Reading progress" : "Tiến độ đọc"}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full bg-green-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
