import type { DsaVisualizer } from "@/lib/course";
import type { Locale } from "@/lib/locale";
import type { BarMark, StepFrame, VisualizerSpec } from "./algorithm-visualizer";

function makeMarks(n: number, base: BarMark = "neutral"): BarMark[] {
  return new Array<BarMark>(n).fill(base);
}

function buildBubble(
  input: number[],
  _target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;

  const stats = () => [
    { label: en ? "Comparisons" : "So sánh", value: comparisons, tone: "amber" as const },
    { label: en ? "Swaps" : "Đổi chỗ", value: swaps, tone: "rose" as const },
  ];

  const marks = (options: {
    sortedFrom?: number;
    comparing?: [number, number] | null;
    swapped?: boolean;
  }) => {
    const m = makeMarks(n);
    if (options.sortedFrom !== undefined) {
      for (let k = options.sortedFrom; k < n; k++) m[k] = "sorted";
    }
    if (options.comparing) {
      const cls: BarMark = options.swapped ? "swap" : "compare";
      m[options.comparing[0]] = cls;
      m[options.comparing[1]] = cls;
    }
    return m;
  };

  frames.push({
    array: [...a],
    marks: marks({}),
    line: 1,
    note: en ? "Start with the initial array." : "Bắt đầu với mảng ban đầu.",
    stats: stats(),
  });

  for (let i = 0; i < n - 1; i++) {
    let didSwap = false;
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      frames.push({
        array: [...a],
        marks: marks({ sortedFrom: n - i, comparing: [j, j + 1] }),
        line: 4,
        note: en
          ? `Compare a[${j}] = ${a[j]} and a[${j + 1}] = ${a[j + 1]}.`
          : `So sánh a[${j}] = ${a[j]} và a[${j + 1}] = ${a[j + 1]}.`,
        stats: stats(),
      });
      if (a[j] > a[j + 1]) {
        const left = a[j];
        const right = a[j + 1];
        a[j] = right;
        a[j + 1] = left;
        swaps++;
        didSwap = true;
        frames.push({
          array: [...a],
          marks: marks({ sortedFrom: n - i, comparing: [j, j + 1], swapped: true }),
          line: 5,
          note: en
            ? `${left} > ${right}, so swap these two values.`
            : `${left} > ${right} nên đổi chỗ hai phần tử này.`,
          stats: stats(),
        });
      }
    }
    frames.push({
      array: [...a],
      marks: marks({ sortedFrom: n - 1 - i }),
      line: 3,
      note: en
        ? `End of pass ${i + 1}: the largest remaining value is now in its correct position at index ${n - 1 - i}.`
        : `Hết lượt ${i + 1}: phần tử lớn nhất còn lại đã về đúng vị trí ${n - 1 - i}.`,
      stats: stats(),
    });
    if (!didSwap) {
      frames.push({
        array: [...a],
        marks: marks({ sortedFrom: 0 }),
        line: 6,
        note: en
          ? "No more pairs need swapping—the array is sorted."
          : "Không còn cặp nào cần đổi chỗ — mảng đã sắp xếp.",
        stats: stats(),
      });
      return frames;
    }
  }

  frames.push({
    array: [...a],
    marks: marks({ sortedFrom: 0 }),
    line: 6,
    note: en ? "Done! The array is sorted." : "Hoàn tất! Mảng đã được sắp xếp.",
    stats: stats(),
  });
  return frames;
}

function buildSelection(
  input: number[],
  _target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;

  const stats = () => [
    { label: "So sánh", value: comparisons, tone: "amber" as const },
    { label: "Đổi chỗ", value: swaps, tone: "rose" as const },
  ];

  const marks = (options: {
    sortedCount?: number;
    minIdx?: number | null;
    compareIdx?: number | null;
    swapPair?: [number, number] | null;
  }) => {
    const m = makeMarks(n);
    for (let k = 0; k < (options.sortedCount ?? 0); k++) m[k] = "sorted";
    if (options.minIdx != null) m[options.minIdx] = "active";
    if (options.compareIdx != null) m[options.compareIdx] = "compare";
    if (options.swapPair) {
      m[options.swapPair[0]] = "swap";
      m[options.swapPair[1]] = "swap";
    }
    return m;
  };

  frames.push({
    array: [...a],
    marks: marks({}),
    line: 1,
    note: en ? "Start with the original array." : "Bắt đầu với mảng ban đầu.",
    stats: stats(),
  });

  for (let i = 0; i < n - 1; i++) {
    let min = i;
    frames.push({
      array: [...a],
      marks: marks({ sortedCount: i, minIdx: min }),
      line: 3,
      note: en
        ? `Pass ${i + 1}: assume a[${i}] = ${a[i]} is the smallest.`
        : `Lượt ${i + 1}: giả sử a[${i}] = ${a[i]} là nhỏ nhất.`,
      stats: stats(),
    });
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      frames.push({
        array: [...a],
        marks: marks({ sortedCount: i, minIdx: min, compareIdx: j }),
        line: 5,
        note: en
          ? `Compare a[${j}] = ${a[j]} with min = ${a[min]}.`
          : `So sánh a[${j}] = ${a[j]} với min = ${a[min]}.`,
        stats: stats(),
      });
      if (a[j] < a[min]) {
        min = j;
        frames.push({
          array: [...a],
          marks: marks({ sortedCount: i, minIdx: min }),
          line: 5,
          note: en
            ? `Found a smaller value: min is now a[${min}] = ${a[min]}.`
            : `Tìm thấy giá trị nhỏ hơn: min giờ là a[${min}] = ${a[min]}.`,
          stats: stats(),
        });
      }
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      swaps++;
      frames.push({
        array: [...a],
        marks: marks({ sortedCount: i, swapPair: [i, min] }),
        line: 6,
        note: en
          ? `Swap a[${i}] and a[${min}] to move the smallest value to the front.`
          : `Đổi chỗ a[${i}] và a[${min}] để đưa giá trị nhỏ nhất về đầu.`,
        stats: stats(),
      });
    } else {
      frames.push({
        array: [...a],
        marks: marks({ sortedCount: i, minIdx: i }),
        line: 6,
        note: en
          ? `a[${i}] is already in the right position, so no swap is needed.`
          : `a[${i}] đã đúng vị trí, không cần đổi chỗ.`,
        stats: stats(),
      });
    }
  }

  frames.push({
    array: [...a],
    marks: marks({ sortedCount: n }),
    line: 7,
    note: en ? "Done! The array is sorted." : "Hoàn tất! Mảng đã được sắp xếp.",
    stats: stats(),
  });
  return frames;
}

function buildInsertion(
  input: number[],
  _target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let shifts = 0;

  const stats = () => [
    { label: "So sánh", value: comparisons, tone: "amber" as const },
    { label: "Dịch chuyển", value: shifts, tone: "rose" as const },
  ];

  const marks = (options: {
    sortedCount?: number;
    keyIdx?: number | null;
    compareIdx?: number | null;
    shiftPair?: [number, number] | null;
  }) => {
    const m = makeMarks(n);
    for (let k = 0; k < (options.sortedCount ?? 0); k++) m[k] = "sorted";
    if (options.compareIdx != null) m[options.compareIdx] = "compare";
    if (options.keyIdx != null) m[options.keyIdx] = "active";
    if (options.shiftPair) {
      m[options.shiftPair[0]] = "swap";
      m[options.shiftPair[1]] = "swap";
    }
    return m;
  };

  frames.push({
    array: [...a],
    marks: marks({ sortedCount: 0 }),
    line: 1,
    note: en
      ? "The first element is considered sorted."
      : "Phần tử đầu tiên coi như đã sắp xếp.",
    stats: stats(),
  });

  for (let i = 1; i < n; i++) {
    const key = a[i];
    frames.push({
      array: [...a],
      marks: marks({ sortedCount: i, keyIdx: i }),
      line: 2,
      note: en
        ? `Take key = a[${i}] = ${key} and insert it into the sorted portion.`
        : `Lấy key = a[${i}] = ${key} để chèn vào phần đã sắp xếp.`,
      stats: stats(),
    });
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      comparisons++;
      frames.push({
        array: [...a],
        marks: marks({ sortedCount: i, keyIdx: j + 1, compareIdx: j }),
        line: 4,
        note: en
          ? `a[${j}] = ${a[j]} > key = ${key}, so shift it to the right.`
          : `a[${j}] = ${a[j]} > key = ${key} nên dịch sang phải.`,
        stats: stats(),
      });
      a[j + 1] = a[j];
      shifts++;
      frames.push({
        array: [...a],
        marks: marks({ sortedCount: i, keyIdx: j, shiftPair: [j, j + 1] }),
        line: 5,
        note: en
          ? `Shift a[${j}] to position ${j + 1}.`
          : `Dịch a[${j}] sang vị trí ${j + 1}.`,
        stats: stats(),
      });
      j--;
    }
    if (j >= 0) comparisons++;
    a[j + 1] = key;
    frames.push({
      array: [...a],
      marks: marks({ sortedCount: i + 1, keyIdx: j + 1 }),
      line: 7,
      note: en
        ? `Insert key = ${key} at position ${j + 1}.`
        : `Chèn key = ${key} vào vị trí ${j + 1}.`,
      stats: stats(),
    });
  }

  frames.push({
    array: [...a],
    marks: marks({ sortedCount: n }),
    line: 8,
    note: en ? "Done! The array is sorted." : "Hoàn tất! Mảng đã được sắp xếp.",
    stats: stats(),
  });
  return frames;
}

function buildBinarySearch(
  input: number[],
  target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;

  const stats = () => [
    { label: "Mục tiêu", value: target, tone: "slate" as const },
    { label: "So sánh", value: comparisons, tone: "amber" as const },
  ];

  const marks = (lo: number, hi: number, mid: number | null, found: number | null) => {
    const m = makeMarks(n);
    for (let k = 0; k < n; k++) {
      if (k < lo || k > hi) m[k] = "eliminated";
    }
    if (mid !== null) m[mid] = "compare";
    if (found !== null) m[found] = "found";
    return m;
  };

  let lo = 0;
  let hi = n - 1;

  frames.push({
    array: [...a],
    marks: marks(lo, hi, null, null),
    pointers: { [lo]: "lo", [hi]: "hi" },
    line: 1,
    note: en
      ? `The initial search range is the entire array [${lo}, ${hi}].`
      : `Không gian tìm kiếm ban đầu là toàn mảng [${lo}, ${hi}].`,
    stats: stats(),
  });

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    comparisons++;
    frames.push({
      array: [...a],
      marks: marks(lo, hi, mid, null),
      pointers: { [lo]: "lo", [hi]: "hi", [mid]: "mid" },
      line: 3,
      note: en
        ? `mid = (${lo} + ${hi}) / 2 = ${mid}; a[${mid}] = ${a[mid]}.`
        : `mid = (${lo} + ${hi}) / 2 = ${mid}, giá trị a[${mid}] = ${a[mid]}.`,
      stats: stats(),
    });
    if (a[mid] === target) {
      frames.push({
        array: [...a],
        marks: marks(lo, hi, mid, mid),
        pointers: { [mid]: "mid" },
        line: 4,
        note: en
          ? `Target ${target} found at index ${mid}.`
          : `Tìm thấy target = ${target} tại vị trí ${mid}.`,
        stats: stats(),
      });
      return frames;
    }
    if (a[mid] < target) {
      const oldLo = lo;
      lo = mid + 1;
      frames.push({
        array: [...a],
        marks: marks(lo, hi, null, null),
        pointers: { [lo]: "lo", [hi]: "hi" },
        line: 5,
        note: en
          ? `a[${mid}] = ${a[mid]} < ${target}, so discard the left half and set lo = ${oldLo} → ${lo}.`
          : `a[${mid}] = ${a[mid]} < ${target} nên bỏ nửa trái, lo = ${oldLo} → ${lo}.`,
        stats: stats(),
      });
    } else {
      const oldHi = hi;
      hi = mid - 1;
      frames.push({
        array: [...a],
        marks: marks(lo, hi, null, null),
        pointers: lo <= hi ? { [lo]: "lo", [hi]: "hi" } : {},
        line: 6,
        note: en
          ? `a[${mid}] = ${a[mid]} > ${target}, so discard the right half and set hi = ${oldHi} → ${hi}.`
          : `a[${mid}] = ${a[mid]} > ${target} nên bỏ nửa phải, hi = ${oldHi} → ${hi}.`,
        stats: stats(),
      });
    }
  }

  frames.push({
    array: [...a],
    marks: makeMarks(n, "eliminated"),
    line: 7,
    note: en
      ? `${target} was not found in the array — return -1.`
      : `Không tìm thấy ${target} trong mảng — trả về -1.`,
    stats: stats(),
  });
  return frames;
}

function buildTwoSum(
  input: number[],
  target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;

  const stats = (sum: number | string) => [
    { label: "Tổng", value: sum, tone: "indigo" as const },
    { label: "Mục tiêu", value: target, tone: "slate" as const },
    { label: "So sánh", value: comparisons, tone: "amber" as const },
  ];

  const marks = (l: number, r: number, found: boolean) => {
    const m = makeMarks(n);
    for (let k = 0; k < n; k++) {
      if (k < l || k > r) m[k] = "eliminated";
    }
    if (l < n) m[l] = found ? "found" : "compare";
    if (r >= 0 && r !== l) m[r] = found ? "found" : "compare";
    return m;
  };

  let l = 0;
  let r = n - 1;

  frames.push({
    array: [...a],
    marks: marks(l, r, false),
    pointers: { [l]: "L", [r]: "R" },
    line: 1,
    note: en
      ? "Two pointers: L starts at the beginning and R at the end of the sorted array."
      : `Hai con trỏ: L ở đầu, R ở cuối mảng đã sắp xếp.`,
    stats: stats("-"),
  });

  while (l < r) {
    const sum = a[l] + a[r];
    comparisons++;
    frames.push({
      array: [...a],
      marks: marks(l, r, false),
      pointers: { [l]: "L", [r]: "R" },
      line: 3,
      note: en
        ? `Sum a[${l}] + a[${r}] = ${a[l]} + ${a[r]} = ${sum}.`
        : `Tổng a[${l}] + a[${r}] = ${a[l]} + ${a[r]} = ${sum}.`,
      stats: stats(sum),
    });
    if (sum === target) {
      frames.push({
        array: [...a],
        marks: marks(l, r, true),
        pointers: { [l]: "L", [r]: "R" },
        line: 4,
        note: en
          ? `Sum matches target ${target}. Return [${l}, ${r}].`
          : `Tổng bằng target = ${target}. Trả về [${l}, ${r}].`,
        stats: stats(sum),
      });
      return frames;
    }
    if (sum < target) {
      l++;
      frames.push({
        array: [...a],
        marks: marks(l, r, false),
        pointers: l <= r ? { [l]: "L", [r]: "R" } : r >= 0 ? { [r]: "R" } : {},
        line: 5,
        note: en
          ? `Since ${sum} < ${target}, move L forward to increase the sum.`
          : `Tổng ${sum} < ${target} nên tăng L để tăng tổng.`,
        stats: stats(sum),
      });
    } else {
      r--;
      frames.push({
        array: [...a],
        marks: marks(l, r, false),
        pointers: l <= r ? { [l]: "L", [r]: "R" } : l < n ? { [l]: "L" } : {},
        line: 6,
        note: en
          ? `Since ${sum} > ${target}, move R backward to decrease the sum.`
          : `Tổng ${sum} > ${target} nên giảm R để giảm tổng.`,
        stats: stats(sum),
      });
    }
  }

  frames.push({
    array: [...a],
    marks: makeMarks(n, "eliminated"),
    line: 7,
    note: en
      ? `Search range exhausted; no pair sums to ${target}.`
      : `Hết khoảng tìm kiếm, không có cặp nào có tổng bằng ${target}.`,
    stats: stats("-"),
  });
  return frames;
}

export const visualizers: Record<DsaVisualizer, VisualizerSpec> = {
  "bubble-sort": {
    title: "Bubble Sort — mô phỏng",
    pseudo: [
      "function bubbleSort(a):",
      "  n = length(a)",
      "  for i = 0 to n - 2:",
      "    for j = 0 to n - 2 - i:",
      "      if a[j] > a[j + 1]:",
      "        swap(a[j], a[j + 1])",
      "  return a",
    ],
    legend: [
      { mark: "neutral", label: "Chưa xét" },
      { mark: "compare", label: "Đang so sánh" },
      { mark: "swap", label: "Vừa đổi chỗ" },
      { mark: "sorted", label: "Đã đúng vị trí" },
    ],
    defaultInput: [5, 2, 9, 1, 6, 3],
    build: buildBubble,
  },
  "selection-sort": {
    title: "Selection Sort — mô phỏng",
    pseudo: [
      "function selectionSort(a):",
      "  n = length(a)",
      "  for i = 0 to n - 2:",
      "    min = i",
      "    for j = i + 1 to n - 1:",
      "      if a[j] < a[min]: min = j",
      "    if min != i: swap(a[i], a[min])",
      "  return a",
    ],
    legend: [
      { mark: "sorted", label: "Đã sắp xếp" },
      { mark: "active", label: "Vị trí min hiện tại" },
      { mark: "compare", label: "Đang xét" },
      { mark: "swap", label: "Vừa đổi chỗ" },
    ],
    defaultInput: [5, 2, 9, 1, 6, 3],
    build: buildSelection,
  },
  "insertion-sort": {
    title: "Insertion Sort — mô phỏng",
    pseudo: [
      "function insertionSort(a):",
      "  for i = 1 to n - 1:",
      "    key = a[i]",
      "    j = i - 1",
      "    while j >= 0 and a[j] > key:",
      "      a[j + 1] = a[j]",
      "      j = j - 1",
      "    a[j + 1] = key",
      "  return a",
    ],
    legend: [
      { mark: "sorted", label: "Đã sắp xếp" },
      { mark: "active", label: "key / vị trí chèn" },
      { mark: "compare", label: "Đang so sánh" },
      { mark: "swap", label: "Vừa dịch chuyển" },
    ],
    defaultInput: [5, 2, 9, 1, 6, 3],
    build: buildInsertion,
  },
  "binary-search": {
    title: "Binary Search — mô phỏng",
    pseudo: [
      "function binarySearch(a, target):",
      "  lo = 0, hi = n - 1",
      "  while lo <= hi:",
      "    mid = floor((lo + hi) / 2)",
      "    if a[mid] == target: return mid",
      "    if a[mid] < target: lo = mid + 1",
      "    else: hi = mid - 1",
      "  return -1",
    ],
    legend: [
      { mark: "compare", label: "Phần tử mid" },
      { mark: "eliminated", label: "Đã loại" },
      { mark: "found", label: "Tìm thấy" },
    ],
    defaultInput: [1, 3, 5, 6, 9, 12, 15, 20],
    autoSort: true,
    target: { label: "target", default: 9 },
    build: buildBinarySearch,
  },
  "two-sum": {
    title: "Two Sum (Sorted) — mô phỏng",
    pseudo: [
      "function twoSumSorted(a, target):",
      "  l = 0, r = n - 1",
      "  while l < r:",
      "    sum = a[l] + a[r]",
      "    if sum == target: return [l, r]",
      "    if sum < target: l = l + 1",
      "    else: r = r - 1",
      "  return []",
    ],
    legend: [
      { mark: "compare", label: "L / R" },
      { mark: "eliminated", label: "Đã loại" },
      { mark: "found", label: "Cặp hợp lệ" },
    ],
    defaultInput: [1, 2, 4, 7, 11, 15],
    autoSort: true,
    target: { label: "target", default: 9 },
    build: buildTwoSum,
  },
};
