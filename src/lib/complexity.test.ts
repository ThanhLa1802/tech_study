import { describe, expect, it } from "vitest";
import {
  COMPLEXITY_SERIES,
  factorial,
  formatComplexityValue,
  log10Factorial,
} from "@/lib/complexity";

describe("factorial", () => {
  it("computes small factorials", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
  });

  it("returns Infinity instead of overflowing", () => {
    expect(factorial(200)).toBe(Infinity);
  });
});

describe("log10Factorial", () => {
  it("matches Math.log10 of the factorial for safe values", () => {
    expect(log10Factorial(5)).toBeCloseTo(Math.log10(120), 6);
  });
});

describe("formatComplexityValue", () => {
  it("renders small values as integers", () => {
    expect(formatComplexityValue(1, 24)).toBe("24");
  });

  it("uses scientific notation for very large values", () => {
    expect(formatComplexityValue(23.79, 6.2e23)).toMatch(/×10\^23$/);
  });
});

describe("COMPLEXITY_SERIES", () => {
  it("keeps the growth order from fastest to slowest at n = 64", () => {
    const n = 64;
    const log = Object.fromEntries(
      COMPLEXITY_SERIES.map((series) => [series.key, series.log10(n)]),
    );
    expect(log.o1).toBeLessThan(log.ologn);
    expect(log.ologn).toBeLessThan(log.on);
    expect(log.on).toBeLessThanOrEqual(log.onlogn);
    expect(log.onlogn).toBeLessThan(log.on2);
    expect(log.on2).toBeLessThan(log.o2n);
    expect(log.o2n).toBeLessThan(log.onfact);
  });

  it("exposes a value and log10 for every series", () => {
    for (const series of COMPLEXITY_SERIES) {
      expect(Number.isFinite(series.log10(32))).toBe(true);
      expect(series.value(32)).toBeGreaterThan(0);
    }
  });
});
