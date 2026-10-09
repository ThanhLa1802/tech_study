import type {
  DiagramEdge,
  DiagramFrame,
  DiagramNode,
  DiagramSpec,
  NodeState,
} from "@/lib/diagram";
import type { Locale } from "@/lib/locale";
import type {
  BarMark,
  StepFrame,
  VisualizerSpec,
} from "./algorithm-visualizer";

const LL_VALUES = [5, 8, 2, 9];

const llNodes: DiagramNode[] = [
  ...LL_VALUES.map((value, index) => ({
    id: `ll${index}`,
    label: String(value),
    sub: index === 0 ? "head" : undefined,
    x: 20 + index * 112,
    y: 70,
    w: 88,
    h: 48,
  })),
  {
    id: "null",
    label: "null",
    x: 20 + LL_VALUES.length * 112,
    y: 70,
    w: 64,
    h: 48,
  },
];

const llEdges: DiagramEdge[] = LL_VALUES.map((_, index) => ({
  id: `ll-e${index}`,
  from: `ll${index}`,
  to: index === LL_VALUES.length - 1 ? "null" : `ll${index + 1}`,
}));

function idleLinkedStates(): Record<string, NodeState> {
  const states: Record<string, NodeState> = {};
  for (let index = 0; index < LL_VALUES.length; index++) {
    states[`ll${index}`] = "idle";
  }
  states.null = "idle";
  return states;
}

function buildLinkedList(locale?: Locale): DiagramFrame[] {
  const en = locale === "en";
  const frames: DiagramFrame[] = [];
  const target = 2;
  const stats = (index: number) => [
    { label: "target", value: target, tone: "indigo" as const },
    { label: "node", value: index, tone: "slate" as const },
  ];

  frames.push({
    states: { ...idleLinkedStates(), ll0: "active" },
    line: 1,
    note: en
      ? "cur = head → start at the first node (value 5)."
      : "cur = head → bắt đầu từ node đầu tiên (giá trị 5).",
    stats: stats(0),
  });

  for (let i = 0; i < LL_VALUES.length; i++) {
    const value = LL_VALUES[i];
    const incoming = i > 0 ? { [`ll-e${i - 1}`]: "active" as NodeState } : undefined;

    frames.push({
      states: { ...idleLinkedStates(), [`ll${i}`]: "active" },
      edgeStates: incoming,
      line: 3,
      note: en
        ? `Compare cur.value = ${value} with target = ${target}.`
        : `So sánh cur.value = ${value} với target = ${target}.`,
      stats: stats(i),
    });

    if (value === target) {
      frames.push({
        states: { ...idleLinkedStates(), [`ll${i}`]: "success" },
        edgeStates: incoming,
        line: 3,
        note: en
          ? `Found ${target} at index ${i}. Return this node.`
          : `Tìm thấy ${target} tại vị trí ${i}. Trả về node này.`,
        stats: stats(i),
      });
      return frames;
    }

    const nextId = i === LL_VALUES.length - 1 ? "null" : `ll${i + 1}`;
    frames.push({
      states: { ...idleLinkedStates(), [nextId]: "active" },
      edgeStates: { [`ll-e${i}`]: "active" },
      line: 4,
      note: en
        ? `${value} ≠ ${target} → cur = cur.next, move to the next node.`
        : `${value} ≠ ${target} → cur = cur.next, đi sang node kế tiếp.`,
      stats: stats(i + 1),
    });
  }

  frames.push({
    states: { ...idleLinkedStates(), null: "down" },
    line: 5,
    note: en
      ? "cur = null → reached the end without finding target."
      : "cur = null → đã duyệt hết mà không tìm thấy target.",
    stats: stats(LL_VALUES.length),
  });
  return frames;
}

const bstNodes: DiagramNode[] = [
  { id: "n50", label: "50", x: 330, y: 20, w: 56, h: 44 },
  { id: "n30", label: "30", x: 200, y: 110, w: 56, h: 44 },
  { id: "n70", label: "70", x: 460, y: 110, w: 56, h: 44 },
  { id: "n20", label: "20", x: 130, y: 200, w: 56, h: 44 },
  { id: "n40", label: "40", x: 270, y: 200, w: 56, h: 44 },
  { id: "n60", label: "60", x: 390, y: 200, w: 56, h: 44 },
  { id: "n80", label: "80", x: 530, y: 200, w: 56, h: 44 },
];

const bstEdges: DiagramEdge[] = [
  { id: "e-50-30", from: "n50", to: "n30", label: "L" },
  { id: "e-50-70", from: "n50", to: "n70", label: "R" },
  { id: "e-30-20", from: "n30", to: "n20", label: "L" },
  { id: "e-30-40", from: "n30", to: "n40", label: "R" },
  { id: "e-70-60", from: "n70", to: "n60", label: "L" },
  { id: "e-70-80", from: "n70", to: "n80", label: "R" },
];

function idleBstStates(): Record<string, NodeState> {
  const states: Record<string, NodeState> = {};
  for (const node of bstNodes) {
    states[node.id] = "idle";
  }
  return states;
}

function buildBinarySearchTree(locale?: Locale): DiagramFrame[] {
  const en = locale === "en";
  const frames: DiagramFrame[] = [];
  const target = 40;
  const stats = (node: string) => [
    { label: "target", value: target, tone: "indigo" as const },
    { label: "cur", value: node, tone: "slate" as const },
  ];

  frames.push({
    states: { ...idleBstStates(), n50: "active" },
    line: 1,
    note: en
      ? "cur = root = 50. Start the search at the root."
      : "cur = root = 50. Bắt đầu tìm từ gốc.",
    stats: stats("50"),
  });

  frames.push({
    states: { ...idleBstStates(), n50: "active" },
    line: 3,
    note: en
      ? `Compare target = ${target} with 50. They are not equal.`
      : `So sánh target = ${target} với 50. Chưa bằng.`,
    stats: stats("50"),
  });

  frames.push({
    states: { ...idleBstStates(), n50: "active", n30: "active" },
    edgeStates: { "e-50-30": "active" },
    line: 4,
    note: en
      ? `${target} < 50 → move to the left subtree (30).`
      : `${target} < 50 → đi sang cây con bên trái (30).`,
    stats: stats("30"),
  });

  frames.push({
    states: { ...idleBstStates(), n30: "active" },
    edgeStates: { "e-50-30": "active" },
    line: 3,
    note: en
      ? `Compare target = ${target} with 30. They are not equal.`
      : `So sánh target = ${target} với 30. Chưa bằng.`,
    stats: stats("30"),
  });

  frames.push({
    states: { ...idleBstStates(), n30: "active", n40: "active" },
    edgeStates: { "e-50-30": "active", "e-30-40": "active" },
    line: 5,
    note: en
      ? `${target} > 30 → move to the right subtree (40).`
      : `${target} > 30 → đi sang cây con bên phải (40).`,
    stats: stats("40"),
  });

  frames.push({
    states: { ...idleBstStates(), n40: "success" },
    edgeStates: { "e-50-30": "active", "e-30-40": "active" },
    line: 3,
    note: en
      ? `target = ${target} matches the node value → found at node 40.`
      : `target = ${target} bằng giá trị node → tìm thấy tại node 40.`,
    stats: stats("40"),
  });

  return frames;
}

function buildStack(
  input: number[],
  _target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const stack: number[] = [];

  const stats = () => [
    { label: "size", value: stack.length, tone: "indigo" as const },
    {
      label: "top",
      value: stack.length ? stack[stack.length - 1] : "—",
      tone: "amber" as const,
    },
  ];
  const contentMarks = (): BarMark[] => stack.map(() => "sorted" as BarMark);

  frames.push({
    array: [...stack],
    marks: [],
    line: 1,
    note: en
      ? "Stack is empty. LIFO: the last item added is the first one removed."
      : "Stack rỗng. LIFO: phần tử vào sau cùng ra đầu tiên.",
    stats: stats(),
  });

  for (const value of input) {
    stack.push(value);
    const marks = contentMarks();
    marks[stack.length - 1] = "active";
    frames.push({
      array: [...stack],
      marks,
      pointers: { [stack.length - 1]: "top" },
      line: 2,
      note: en
        ? `push(${value}) → ${value} is now at the top of the stack.`
        : `push(${value}) → ${value} nằm trên đỉnh stack.`,
      stats: stats(),
    });
  }

  while (stack.length > 0) {
    const top = stack.length - 1;
    const marks = contentMarks();
    marks[top] = "swap";
    frames.push({
      array: [...stack],
      marks,
      pointers: { [top]: "top" },
      line: 4,
      note: en
        ? `pop() removes ${stack[top]} from the top.`
        : `pop() lấy ${stack[top]} ở đỉnh ra.`,
      stats: stats(),
    });
    stack.pop();
    frames.push({
      array: [...stack],
      marks: contentMarks(),
      pointers: stack.length ? { [stack.length - 1]: "top" } : {},
      line: 4,
      note: en
        ? `The stack now contains ${stack.length} item(s).`
        : `Còn lại ${stack.length} phần tử trong stack.`,
      stats: stats(),
    });
  }

  frames.push({
    array: [],
    marks: [],
    line: 4,
    note: en
      ? "Stack is empty again—the items that were pushed have all been popped."
      : "Stack rỗng trở lại — bốn lần pop đối xứng với bốn lần push.",
    stats: stats(),
  });
  return frames;
}

function buildQueue(
  input: number[],
  _target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  let queue: number[] = [];

  const stats = (note: string) => [
    { label: "size", value: queue.length, tone: "indigo" as const },
    { label: "front", value: queue.length ? queue[0] : "—", tone: "amber" as const },
    { label: "rear", value: queue.length ? queue[queue.length - 1] : "—", tone: "slate" as const },
    {
      label: en ? "Most recent operation" : "vừa",
      value: note,
      tone: "emerald" as const,
    },
  ];
  const contentMarks = (): BarMark[] => queue.map(() => "sorted" as BarMark);

  frames.push({
    array: [],
    marks: [],
    line: 1,
    note: en
      ? "Queue is empty. FIFO: the first item added is the first one removed."
      : "Queue rỗng. FIFO: phần tử vào trước ra trước.",
    stats: stats("—"),
  });

  for (const value of input) {
    queue = [...queue, value];
    const marks = contentMarks();
    marks[queue.length - 1] = "active";
    frames.push({
      array: queue,
      marks,
      pointers: { [queue.length - 1]: "rear" },
      line: 2,
      note: en
        ? `enqueue(${value}) → added to the back of the queue.`
        : `enqueue(${value}) → vào cuối hàng đợi.`,
      stats: stats(`enqueue ${value}`),
    });
  }

  while (queue.length > 0) {
    const marks = contentMarks();
    marks[0] = "swap";
    frames.push({
      array: queue,
      marks,
      pointers: { 0: "front" },
      line: 4,
      note: en
        ? `dequeue() removes ${queue[0]} from the front of the queue.`
        : `dequeue() lấy ${queue[0]} ở đầu hàng đợi.`,
      stats: stats(`dequeue ${queue[0]}`),
    });
    queue = queue.slice(1);
    frames.push({
      array: queue,
      marks: contentMarks(),
      pointers: queue.length ? { 0: "front" } : {},
      line: 4,
      note: en
        ? `The queue now contains ${queue.length} item(s).`
        : `Còn lại ${queue.length} phần tử trong hàng đợi.`,
      stats: stats("—"),
    });
  }

  frames.push({
    array: [],
    marks: [],
    line: 4,
    note: en ? "Queue is empty again." : "Queue rỗng trở lại.",
    stats: stats("—"),
  });
  return frames;
}

function buildBinaryHeap(
  input: number[],
  _target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const heap: number[] = [];

  const stats = () => [
    { label: "size", value: heap.length, tone: "indigo" as const },
    {
      label: "min (root)",
      value: heap.length ? heap[0] : "—",
      tone: "emerald" as const,
    },
  ];
  const contentMarks = (): BarMark[] => heap.map(() => "sorted" as BarMark);
  const emit = (
    marks: BarMark[],
    note: string,
    line: number,
    pointers: Record<number, string> = {},
  ) => {
    frames.push({ array: [...heap], marks, pointers, line, note, stats: stats() });
  };

  emit(
    [],
    en
      ? "Heap is empty. In a min-heap, every parent is ≤ its children."
      : "Heap rỗng. Min-heap: mỗi nút cha đều ≤ hai nút con.",
    1,
  );

  for (const value of input) {
    heap.push(value);
    let i = heap.length - 1;
    const inserted = contentMarks();
    inserted[i] = "active";
    emit(
      inserted,
      en
        ? `Add ${value} to the end of the array at index ${i}.`
        : `Thêm ${value} vào cuối mảng tại vị trí ${i}.`,
      3,
      { [i]: "i" },
    );

    let parent = Math.floor((i - 1) / 2);
    while (i > 0 && heap[i] < heap[parent]) {
      const compare = contentMarks();
      compare[i] = "active";
      compare[parent] = "compare";
      emit(
        compare,
        en
          ? `Compare ${heap[i]} with parent ${heap[parent]}: the child is smaller, so they need to be swapped.`
          : `So sánh ${heap[i]} với cha ${heap[parent]}: con nhỏ hơn → cần đổi chỗ.`,
        3,
        { [i]: "i", [parent]: "parent" },
      );

      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      const swapped = contentMarks();
      swapped[i] = "swap";
      swapped[parent] = "swap";
      emit(
        swapped,
        en
          ? `Swap them to move ${heap[parent]} up.`
          : `Đổi chỗ để ${heap[parent]} nổi lên trên.`,
        3,
        { [parent]: "i" },
      );

      i = parent;
      parent = Math.floor((i - 1) / 2);
    }

    const placed = contentMarks();
    placed[i] = "found";
    emit(
      placed,
      en
        ? `${value} is in the correct position—the heap property still holds.`
        : `${value} đã về đúng vị trí — heap vẫn hợp lệ.`,
      2,
      { [i]: "i" },
    );
  }

  if (heap.length > 0) {
    const minimum = heap[0];
    const highlightRoot = contentMarks();
    highlightRoot[0] = "found";
    emit(
      highlightRoot,
      en
        ? `extractMin(): remove ${minimum} from the root.`
        : `extractMin(): lấy ${minimum} ở gốc.`,
      4,
      { 0: "root" },
    );

    const last = heap.length - 1;
    [heap[0], heap[last]] = [heap[last], heap[0]];
    const removed = heap.pop() as number;
    emit(
      contentMarks(),
      en
        ? `Move ${removed} to the end, then remove it from the heap.`
        : `Đưa ${removed} xuống cuối rồi loại khỏi heap.`,
      4,
      heap.length ? { 0: "root" } : {},
    );

    let i = 0;
    for (;;) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;
      if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
      if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
      if (smallest === i) break;

      const compare = contentMarks();
      compare[i] = "active";
      compare[smallest] = "compare";
      emit(
        compare,
        en
          ? `Node ${i} is larger than child ${smallest}, so they need to be swapped (sift-down).`
          : `Nút ${i} lớn hơn con ${smallest} → cần đổi chỗ (sift-down).`,
        4,
        { [i]: "i", [smallest]: "child" },
      );

      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      const swapped = contentMarks();
      swapped[i] = "swap";
      swapped[smallest] = "swap";
      emit(
        swapped,
        en
          ? "Swap them to move the smaller node up."
          : "Đổi chỗ để nút nhỏ nổi lên.",
        4,
        { [i]: "i" },
      );

      i = smallest;
    }
  }

  emit(
    contentMarks(),
    en
      ? "Done: the array still satisfies the min-heap property."
      : "Hoàn tất: mảng vẫn thoả tính chất min-heap.",
    5,
  );
  return frames;
}

const graphNodes: DiagramNode[] = [
  { id: "A", label: "A", sub: "d=0", x: 20, y: 130, w: 52, h: 46 },
  { id: "B", label: "B", sub: "d=1", x: 170, y: 30, w: 52, h: 46 },
  { id: "C", label: "C", sub: "d=1", x: 170, y: 230, w: 52, h: 46 },
  { id: "D", label: "D", sub: "d=2", x: 340, y: 30, w: 52, h: 46 },
  { id: "E", label: "E", sub: "d=2", x: 340, y: 230, w: 52, h: 46 },
  { id: "F", label: "F", sub: "d=3", x: 500, y: 130, w: 52, h: 46 },
];

const graphEdges: DiagramEdge[] = [
  { id: "A-B", from: "A", to: "B" },
  { id: "A-C", from: "A", to: "C" },
  { id: "B-D", from: "B", to: "D" },
  { id: "C-E", from: "C", to: "E" },
  { id: "D-F", from: "D", to: "F" },
  { id: "E-F", from: "E", to: "F" },
];

function emptyGraphStates(): Record<string, NodeState> {
  const states: Record<string, NodeState> = {};
  for (const node of graphNodes) states[node.id] = "idle";
  return states;
}

function buildGraphBfs(locale: Locale = "vi"): DiagramFrame[] {
  const en = locale === "en";
  const adjacency: Record<string, string[]> = {
    A: ["B", "C"],
    B: ["A", "D"],
    C: ["A", "E"],
    D: ["B", "F"],
    E: ["C", "F"],
    F: ["D", "E"],
  };
  const frames: DiagramFrame[] = [];
  const visited = new Set<string>();
  const order: string[] = [];
  const queue: string[] = [];

  const stats = () => [
    {
      label: en ? "Queue" : "hàng đợi",
      value: queue.length ? queue.join(" → ") : en ? "Empty" : "rỗng",
      tone: "indigo" as const,
    },
    { label: en ? "Visited" : "đã thăm", value: order.length, tone: "emerald" as const },
  ];
  const decorate = (
    overrides: Record<string, NodeState>,
  ): Record<string, NodeState> => {
    const states = emptyGraphStates();
    for (const id of order) states[id] = "success";
    for (const id of queue) states[id] = "warn";
    return { ...states, ...overrides };
  };
  const edgeId = (a: string, b: string) => (a < b ? `${a}-${b}` : `${b}-${a}`);

  visited.add("A");
  queue.push("A");
  frames.push({
    states: decorate({ A: "warn" }),
    line: 1,
    note: en
      ? "Initialize: add source vertex A to the queue."
      : "Khởi tạo: đưa đỉnh nguồn A vào hàng đợi.",
    stats: stats(),
  });

  while (queue.length > 0) {
    const node = queue.shift() as string;
    order.push(node);
    frames.push({
      states: decorate({ [node]: "active" }),
      line: 3,
      note: en
        ? `Dequeue ${node} and mark it as visited.`
        : `Lấy ${node} ra khỏi hàng đợi và đánh dấu đã thăm.`,
      stats: stats(),
    });

    for (const neighbor of adjacency[node]) {
      const isNew = !visited.has(neighbor);
      if (isNew) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
      frames.push({
        states: decorate({
          [node]: "active",
          [neighbor]: isNew ? "warn" : "success",
        }),
        edgeStates: { [edgeId(node, neighbor)]: isNew ? "active" : "idle" },
        line: 5,
        note: isNew
          ? en
            ? `Check neighbor ${neighbor}: unvisited → enqueue.`
            : `Xét hàng xóm ${neighbor}: chưa thăm → đưa vào hàng đợi.`
          : en
            ? `Check neighbor ${neighbor}: already visited → skip.`
            : `Xét hàng xóm ${neighbor}: đã thăm → bỏ qua.`,
        stats: stats(),
      });
    }

    frames.push({
      states: decorate({}),
      line: 2,
      note: en
        ? `${node} has finished exploring all its neighbors.`
        : `${node} đã duyệt xong mọi hàng xóm.`,
      stats: stats(),
    });
  }

  frames.push({
    states: decorate({}),
    line: 2,
    note: en
      ? "Queue is empty → BFS complete."
      : "Hàng đợi rỗng → BFS hoàn tất.",
    stats: stats(),
  });
  return frames;
}

function buildSlidingWindow(
  input: number[],
  targetValue: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const frames: StepFrame[] = [];
  const target = targetValue > 0 ? targetValue : 7;
  const n = input.length;
  let left = 0;
  let sum = 0;
  let best = Infinity;
  let bestRange: [number, number] | null = null;

  const resultStats = (right: number) => [
    { label: "sum", value: sum, tone: "indigo" as const },
    { label: "l", value: left, tone: "slate" as const },
    { label: "r", value: right, tone: "amber" as const },
    {
      label: "best",
      value: Number.isFinite(best) ? best : "∞",
      tone: "emerald" as const,
    },
  ];
  const marks = (
    right: number,
    entering: number | null,
    leaving: number | null,
  ): BarMark[] => {
    const m = input.map(() => "neutral" as BarMark);
    for (let k = 0; k < n; k++) {
      m[k] = k >= left && k <= right ? "active" : "eliminated";
    }
    if (bestRange) {
      for (let k = bestRange[0]; k <= bestRange[1]; k++) m[k] = "found";
    }
    if (entering !== null) m[entering] = "compare";
    if (leaving !== null) m[leaving] = "swap";
    return m;
  };

  frames.push({
    array: [...input],
    marks: input.map(() => "eliminated" as BarMark),
    pointers: { 0: "l" },
    line: 1,
    note: en
      ? "Start with an empty window. Goal: find the shortest subarray whose sum is ≥ target."
      : "Khởi tạo cửa sổ rỗng. Mục tiêu: đoạn ngắn nhất có tổng ≥ target.",
    stats: resultStats(-1),
  });

  for (let right = 0; right < n; right++) {
    sum += input[right];
    frames.push({
      array: [...input],
      marks: marks(right, right, null),
      pointers: { [left]: "l", [right]: "r" },
      line: 3,
      note: en
        ? `Expand: add a[${right}] = ${input[right]} → sum = ${sum}.`
        : `Mở rộng: cộng a[${right}] = ${input[right]} → sum = ${sum}.`,
      stats: resultStats(right),
    });

    while (sum >= target) {
      const length = right - left + 1;
      if (length < best) {
        best = length;
        bestRange = [left, right];
      }
      frames.push({
        array: [...input],
        marks: marks(right, null, null),
        pointers: { [left]: "l", [right]: "r" },
        line: 5,
        note: en
          ? `sum ≥ target → best = ${best} (subarray [${left}, ${right}]).`
          : `sum ≥ target → best = ${best} (đoạn [${left}, ${right}]).`,
        stats: resultStats(right),
      });

      sum -= input[left];
      const leaving = left;
      left++;
      frames.push({
        array: [...input],
        marks: marks(right, null, leaving),
        pointers: left < n ? { [left]: "l", [right]: "r" } : { [right]: "r" },
        line: 6,
        note: en
          ? `Shrink: remove a[${leaving}] = ${input[leaving]} → sum = ${sum}.`
          : `Thu hẹp: bỏ a[${leaving}] = ${input[leaving]} → sum = ${sum}.`,
        stats: resultStats(right),
      });
    }
  }

  frames.push({
    array: [...input],
    marks:
      bestRange !== null
        ? marks(n - 1, null, null)
        : input.map(() => "eliminated" as BarMark),
    line: 7,
    note: en
      ? `Done: shortest length = ${
          Number.isFinite(best) ? best : "not found"
        }.`
      : `Kết thúc: độ dài nhỏ nhất = ${
          Number.isFinite(best) ? best : "không tồn tại"
        }.`,
    stats: resultStats(n - 1),
  });
  return frames;
}

function buildDpOneD(
  input: number[],
  _target: number,
  locale: Locale = "vi",
): StepFrame[] {
  const en = locale === "en";
  const nums = input.length ? input : [2, 7, 9, 3, 1];
  const n = nums.length;
  const dp: number[] = new Array<number>(n).fill(0);
  const frames: StepFrame[] = [];

  const resultStats = (i: number, take: number | null, skip: number | null) => [
    { label: "i", value: i, tone: "indigo" as const },
    { label: en ? "Take" : "lấy", value: take ?? "—", tone: "emerald" as const },
    { label: en ? "Skip" : "bỏ", value: skip ?? "—", tone: "amber" as const },
  ];
  const marksFor = (upto: number, hot: number[]): BarMark[] => {
    const m = dp.map(() => "eliminated" as BarMark);
    for (let k = 0; k <= upto; k++) m[k] = "sorted";
    for (const k of hot) m[k] = "compare";
    return m;
  };

  frames.push({
    array: [...dp],
    marks: dp.map(() => "eliminated" as BarMark),
    line: 1,
    note: en
      ? `nums = [${nums.join(", ")}]. dp[i] = the maximum amount you can rob from houses 0 through i.`
      : `nums = [${nums.join(", ")}]. dp[i] = số tiền lớn nhất cướp được xét tới nhà i.`,
    stats: resultStats(-1, null, null),
  });

  if (n >= 1) {
    dp[0] = nums[0];
    frames.push({
      array: [...dp],
      marks: marksFor(0, [0]),
      line: 2,
      note: en
        ? `Base case: dp[0] = nums[0] = ${nums[0]}.`
        : `Cơ sở: dp[0] = nums[0] = ${nums[0]}.`,
      stats: resultStats(0, nums[0], 0),
    });
  }
  if (n >= 2) {
    dp[1] = Math.max(nums[0], nums[1]);
    frames.push({
      array: [...dp],
      marks: marksFor(1, [0, 1]),
      line: 3,
      note: en
        ? `Base case: dp[1] = max(nums[0], nums[1]) = ${dp[1]}.`
        : `Cơ sở: dp[1] = max(nums[0], nums[1]) = ${dp[1]}.`,
      stats: resultStats(1, nums[1], dp[0]),
    });
  }
  for (let i = 2; i < n; i++) {
    const take = dp[i - 2] + nums[i];
    const skip = dp[i - 1];
    frames.push({
      array: [...dp],
      marks: marksFor(i - 1, [i - 1, i - 2]),
      line: 5,
      note: en
        ? `At i = ${i}: take = dp[${i - 2}] + nums[${i}] = ${take}; skip = dp[${i - 1}] = ${skip}.`
        : `Tại i = ${i}: lấy = dp[${i - 2}] + nums[${i}] = ${take}; bỏ = dp[${i - 1}] = ${skip}.`,
      stats: resultStats(i, take, skip),
    });
    dp[i] = Math.max(take, skip);
    frames.push({
      array: [...dp],
      marks: marksFor(i, [i]),
      line: 5,
      note: `dp[${i}] = max(${take}, ${skip}) = ${dp[i]}.`,
      stats: resultStats(i, take, skip),
    });
  }
  frames.push({
    array: [...dp],
    marks: marksFor(n - 1, []),
    line: 6,
    note: en
      ? `Result: dp[${n - 1}] = ${dp[n - 1]}.`
      : `Kết quả: dp[${n - 1}] = ${dp[n - 1]}.`,
    stats: resultStats(n - 1, null, null),
  });
  return frames;
}

export const structureDiagramVisualizers: Record<
  "linked-list" | "binary-search-tree" | "graph-bfs",
  DiagramSpec
> = {
  "linked-list": {
    title: "Linked List — tìm kiếm",
    nodes: llNodes,
    edges: llEdges,
    pseudo: [
      "function search(head, target):",
      "  cur = head",
      "  while cur != null:",
      "    if cur.value == target: return cur",
      "    cur = cur.next",
      "  return null",
    ],
    legend: [
      { state: "idle", label: "Chưa xét" },
      { state: "active", label: "Con trỏ cur" },
      { state: "success", label: "Tìm thấy" },
      { state: "down", label: "null" },
    ],
    build: buildLinkedList,
    overrides: {
      en: {
        title: "Linked List — search",
        legend: {
          idle: "Not checked",
          active: "cur pointer",
          success: "Found",
          down: "null",
        },
      },
    },
  },
  "binary-search-tree": {
    title: "BST — tìm kiếm",
    nodes: bstNodes,
    edges: bstEdges,
    pseudo: [
      "function search(root, target):",
      "  cur = root",
      "  while cur != null:",
      "    if target == cur.value: return cur",
      "    if target < cur.value: cur = cur.left",
      "    else: cur = cur.right",
      "  return null",
    ],
    legend: [
      { state: "idle", label: "Chưa xét" },
      { state: "active", label: "Đang so sánh" },
      { state: "success", label: "Tìm thấy" },
    ],
    build: buildBinarySearchTree,
    overrides: {
      en: {
        title: "BST — search",
        legend: {
          idle: "Not checked",
          active: "Comparing",
          success: "Found",
        },
      },
    },
  },
  "graph-bfs": {
    title: "BFS — duyệt đồ thị theo tầng",
    nodes: graphNodes,
    edges: graphEdges,
    pseudo: [
      "function bfs(start):",
      "  queue = [start]; visited = {start}",
      "  while queue:",
      "    node = queue.dequeue()",
      "    for nb in adj[node]:",
      "      if nb not in visited: visited.add(nb); queue.enqueue(nb)",
    ],
    legend: [
      { state: "idle", label: "Chưa thăm" },
      { state: "warn", label: "Trong hàng đợi" },
      { state: "active", label: "Đang xét" },
      { state: "success", label: "Đã thăm" },
    ],
    overrides: {
      en: {
        title: "BFS — Level-Order Graph Traversal",
        legend: {
          idle: "Unvisited",
          warn: "In queue",
          active: "Being explored",
          success: "Visited",
        },
      },
    },
    build: buildGraphBfs,
  },
};

export const structureArrayVisualizers: Record<
  "stack" | "queue" | "binary-heap" | "sliding-window" | "dp-1d",
  VisualizerSpec
> = {
  stack: {
    title: "Stack (LIFO) — mô phỏng",
    pseudo: [
      "function demoStack(a):",
      "  stack = []",
      "  for x in a: stack.push(x)",
      "  while stack:",
      "    stack.pop()",
    ],
    legend: [
      { mark: "sorted", label: "Trong stack" },
      { mark: "active", label: "Đỉnh (top)" },
      { mark: "swap", label: "Vừa lấy ra" },
    ],
    overrides: {
      en: {
        legend: {
          sorted: "In stack",
          active: "Top",
          swap: "Just popped",
        },
      },
    },
    defaultInput: [3, 7, 5, 1],
    build: buildStack,
  },
  queue: {
    title: "Queue (FIFO) — mô phỏng",
    pseudo: [
      "function demoQueue(a):",
      "  queue = []",
      "  for x in a: queue.enqueue(x)",
      "  while queue:",
      "    queue.dequeue()",
    ],
    legend: [
      { mark: "sorted", label: "Trong hàng đợi" },
      { mark: "active", label: "Vừa enqueue (rear)" },
      { mark: "swap", label: "Vừa dequeue (front)" },
    ],
    overrides: {
      en: {
        legend: {
          sorted: "In queue",
          active: "Just enqueued (rear)",
          swap: "Just dequeued (front)",
        },
      },
    },
    defaultInput: [3, 7, 5, 1],
    build: buildQueue,
  },
  "binary-heap": {
    title: "Binary Heap (min-heap) — mô phỏng",
    pseudo: [
      "function demoHeap(a):",
      "  heap = []",
      "  for x in a:",
      "    heap.push(x); siftUp(len-1)",
      "  extractMin()   // swap root, pop, siftDown(0)",
      "  return heap",
    ],
    legend: [
      { mark: "sorted", label: "Trong heap" },
      { mark: "active", label: "Nút đang xét" },
      { mark: "compare", label: "Nút cha / con so sánh" },
      { mark: "swap", label: "Vừa đổi chỗ" },
      { mark: "found", label: "Vừa chèn xong / root" },
    ],
    overrides: {
      en: {
        legend: {
          sorted: "In heap",
          active: "Current node",
          compare: "Parent / child being compared",
          swap: "Just swapped",
          found: "Just inserted / root",
        },
      },
    },
    defaultInput: [5, 3, 8, 1, 9, 2],
    build: buildBinaryHeap,
  },
  "sliding-window": {
    title: "Sliding Window — tổng nhỏ nhất ≥ target",
    pseudo: [
      "function minWindow(a, target):",
      "  l = 0; sum = 0; best = ∞",
      "  for r in 0..n-1:",
      "    sum += a[r]",
      "    while sum >= target:",
      "      best = min(best, r - l + 1)",
      "      sum -= a[l]; l++",
      "  return best",
    ],
    legend: [
      { mark: "active", label: "Trong cửa sổ" },
      { mark: "compare", label: "Vừa mở rộng (r)" },
      { mark: "swap", label: "Vừa thu hẹp (l)" },
      { mark: "found", label: "Cửa sổ tốt nhất" },
      { mark: "eliminated", label: "Ngoài cửa sổ" },
    ],
    overrides: {
      en: {
        title: "Sliding Window — shortest subarray with sum ≥ target",
        legend: {
          active: "In window",
          compare: "Just expanded (r)",
          swap: "Just shrunk (l)",
          found: "Best window",
          eliminated: "Outside window",
        },
      },
    },
    defaultInput: [2, 3, 1, 2, 4, 3],
    target: { label: "target", default: 7 },
    build: buildSlidingWindow,
  },
  "dp-1d": {
    title: "DP 1D — House Robber",
    pseudo: [
      "function rob(nums):",
      "  dp = [0] * n",
      "  dp[0] = nums[0]",
      "  dp[1] = max(nums[0], nums[1])",
      "  for i in 2..n-1:",
      "    dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
      "  return dp[n-1]",
    ],
    legend: [
      { mark: "sorted", label: "dp đã tính" },
      { mark: "compare", label: "Ô dùng để quyết định" },
      { mark: "eliminated", label: "Chưa tính" },
    ],
    overrides: {
      en: {
        legend: {
          sorted: "Computed dp entries",
          compare: "Decision cells",
          eliminated: "Not yet computed",
        },
      },
    },
    defaultInput: [2, 7, 9, 3, 1],
    build: buildDpOneD,
  },
};
