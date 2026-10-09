export const MIN_COMPLEXITY_N = 2;
export const MAX_COMPLEXITY_N = 64;

export type ComplexitySeries = {
  key: string;
  label: string;
  color: string;
  value: (n: number) => number;
  log10: (n: number) => number;
};

export function log10Factorial(n: number): number {
  let sum = 0;
  for (let k = 2; k <= n; k++) sum += Math.log10(k);
  return sum;
}

export function factorial(n: number): number {
  if (n > 170) return Infinity;
  let result = 1;
  for (let k = 2; k <= n; k++) result *= k;
  return result;
}

export const COMPLEXITY_SERIES: ComplexitySeries[] = [
  {
    key: "o1",
    label: "O(1)",
    color: "#22c55e",
    value: () => 1,
    log10: () => 0,
  },
  {
    key: "ologn",
    label: "O(log n)",
    color: "#06b6d4",
    value: (n) => Math.ceil(Math.log2(Math.max(2, n))),
    log10: (n) => Math.log10(Math.max(1, Math.log2(Math.max(2, n)))),
  },
  {
    key: "on",
    label: "O(n)",
    color: "#3b82f6",
    value: (n) => n,
    log10: (n) => Math.log10(Math.max(1, n)),
  },
  {
    key: "onlogn",
    label: "O(n log n)",
    color: "#a855f7",
    value: (n) => Math.round(n * Math.log2(Math.max(2, n))),
    log10: (n) => Math.log10(Math.max(1, n * Math.log2(Math.max(2, n)))),
  },
  {
    key: "on2",
    label: "O(n²)",
    color: "#f59e0b",
    value: (n) => n * n,
    log10: (n) => Math.log10(Math.max(1, n * n)),
  },
  {
    key: "o2n",
    label: "O(2ⁿ)",
    color: "#f97316",
    value: (n) => Math.pow(2, n),
    log10: (n) => n * Math.log10(2),
  },
  {
    key: "onfact",
    label: "O(n!)",
    color: "#ef4444",
    value: (n) => factorial(n),
    log10: (n) => log10Factorial(n),
  },
];

export const SAFE_COMPLEXITY_KEYS = ["o1", "ologn", "on", "onlogn", "on2"];
export const DANGER_COMPLEXITY_KEYS = ["on2", "o2n", "onfact"];

export function formatComplexityValue(
  logValue: number,
  value: number,
): string {
  const finite = Number.isFinite(value) && logValue < 15;
  if (finite) return Math.round(value).toLocaleString("en-US");
  const exponent = Math.floor(logValue);
  const mantissa = Math.pow(10, logValue - exponent);
  return `${mantissa.toFixed(1)}×10^${exponent}`;
}
