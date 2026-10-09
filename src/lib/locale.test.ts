import { describe, expect, it } from "vitest";
import { isLocale, localePath } from "@/lib/locale";

describe("locale routing helpers", () => {
  it("accepts only supported locales", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("creates locale-prefixed paths without duplicate slashes", () => {
    expect(localePath("vi", "/learn/dsa/bubble-sort")).toBe(
      "/vi/learn/dsa/bubble-sort",
    );
    expect(localePath("en", "/")).toBe("/en");
  });
});
