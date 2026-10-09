import type { DiagramEdge, DiagramNode } from "@/lib/diagram";
import type { Lesson, LessonBlock, Quiz } from "@/lib/course-types";

type QuizQuestionTranslation = {
  prompt: string;
  options: string[];
  explanation: string;
  tag?: string;
  code?: string;
};

type QuizTranslation = Pick<Quiz, "title" | "description"> & {
  questions: QuizQuestionTranslation[];
};

/**
 * English text for the natural-language content of code/pseudocode snippets,
 * keyed by snippet position within a source code block. Each entry replaces
 * that snippet's `code` while preserving its `lang`. An `undefined` entry (or
 * a missing block index) leaves the snippet unchanged, so pure code examples
 * need no duplicate.
 */
export type CodeBlockTranslation = (string | undefined)[];

/** User-visible text overrides for a diagram node; geometry is preserved. */
export type DiagramNodeTranslation = {
  label?: string;
  sub?: string;
};

/** User-visible text overrides for a diagram edge; topology is preserved. */
export type DiagramEdgeTranslation = {
  label?: string;
};

/**
 * Diagram text overrides keyed by stable node/edge id. Only the listed fields
 * are replaced; coordinates, ids, and edges stay intact.
 */
export type DiagramTranslation = {
  nodes?: Record<string, DiagramNodeTranslation>;
  edges?: Record<string, DiagramEdgeTranslation>;
};

export type LessonTranslation = {
  title: string;
  module: string;
  summary: string;
  duration?: string;
  blockText: Record<number, string | string[]>;
  /** Keyed by source block index; see {@link CodeBlockTranslation}. */
  codeText?: Record<number, CodeBlockTranslation>;
  /** Keyed by source block index; see {@link DiagramTranslation}. */
  diagramText?: Record<number, DiagramTranslation>;
  quiz?: QuizTranslation;
};

export const englishCourses = {
  dsa: {
    title: "Data Structures & Algorithms",
    tagline: "Build strong foundations in algorithms and data structures",
    description:
      "Learn core data structures and algorithms through concise explanations, code examples, and step-by-step visualizations.",
  },
  "system-design": {
    title: "System Design",
    tagline: "Design reliable, scalable distributed systems",
    description:
      "Build a foundation in distributed systems: scaling, caching, sharding, replication, CAP, and reliability.",
  },
} as const;

export const englishModules: Record<string, string> = {
  welcome: "Getting Started",
  "big-o": "Big O Complexity",
  sorting: "Sorting Algorithms",
  "linked-list": "Linked Lists",
  "stacks-queues": "Stacks & Queues",
  "sd-foundations": "Introduction to System Design",
  "sd-core-concepts": "Core Concepts",
  "sd-building-blocks": "Building Blocks",
  data: "Data",
  "sd-data": "Data",
  reliability: "Reliability",
  "sd-reliability": "Reliability",
  trees: "Trees",
  heaps: "Heaps",
  "two-pointers": "Two Pointers",
  "binary-search": "Binary Search",
  "sliding-window": "Sliding Window",
  "recursion-backtracking": "Recursion & Backtracking",
  graphs: "Graphs",
  "dynamic-programming": "Dynamic Programming",
};

export const englishLessons: Record<string, LessonTranslation> = {
  "course-introduction": {
    title: "Welcome to Learning Hub",
    module: "Getting Started",
    summary:
      "Learn DSA through concise explanations, practical examples, and clear visualizations.",
    blockText: {
      0: "Welcome to Learning Hub! Here, you will learn data structures and algorithms (DSA) by understanding how they work—not by memorizing definitions.",
      1: "Each lesson focuses on the main idea and includes code examples. When a topic has a visualization, you can follow the algorithm step by step and try different inputs.",
      2: "What will you learn?",
      3: [
        "Big O: estimate how an algorithm's running time and memory use grow.",
        "Common data structures: arrays, strings, hash tables, linked lists, stacks, queues, trees, heaps, and graphs.",
        "Problem-solving techniques: two pointers, sliding window, binary search, recursion, and dynamic programming.",
        "Core algorithms: sorting, searching, and graph traversal.",
      ],
      4: "A suggested learning path",
      5: "If you are new to DSA, start with the first lessons. Read the explanation, follow the examples, then explain to yourself why the algorithm reaches its result. You can also jump to a topic you need and come back to review at any time.",
    },
  },
  "how-to-use-this-hub": {
    title: "How to Learn with Learning Hub",
    module: "Getting Started",
    summary:
      "Explore lessons, interact with visualizations, and review at your own pace.",
    blockText: {
      0: "Lessons are grouped by course and topic. Choose a lesson from the sidebar to begin, then use “Previous” and “Next” at the bottom of the page to move through the course. The thin bar at the top shows your reading progress in the current lesson.",
      1: "Use the visualizations",
      2: "When a lesson includes a visualization, you can control how you explore the process:",
      3: [
        "Select “Play” to watch the full process, or use “Next” and “Back” to inspect one step at a time.",
        "Adjust the speed to slow down or speed up the animation, or select “Restart” to begin again.",
        "If there is an input field, try different values and see how the algorithm responds.",
      ],
      4: "Learn actively and remember more",
      5: [
        "Before selecting “Next,” predict what will happen.",
        "Explain in your own words what just happened and why.",
        "If a lesson has a quiz, choose your answer before reading the explanation.",
        "Take your time. Pause, retry, or revisit an earlier lesson whenever you need to.",
      ],
    },
  },
  "bubble-sort": {
    title: "Bubble Sort",
    module: "Sorting Algorithms",
    summary:
      "An introductory sorting algorithm: compare adjacent values and swap them until the array is ordered.",
    blockText: {
      0: "Bubble Sort makes repeated passes through an array. On each pass, it compares adjacent values and swaps them when they are out of order. After each pass, the largest remaining value moves to the end of the array.",
      1: "Use the visualization below to follow each comparison and swap.",
      2: "Pseudocode",
      4: "Implementation",
      6: "Complexity",
      7: [
        "Time: O(n²) on average and in the worst case; O(n) when the array is already sorted, thanks to the swapped flag.",
        "Space: O(1)—the algorithm sorts in place.",
        "Stable: yes. It swaps adjacent values only when the left value is strictly greater.",
      ],
    },
  },
  "big-o-introduction": {
    title: "Introduction to Big O",
    module: "Big O Complexity",
    summary:
      "Use Big O to understand how an algorithm's workload grows as its input gets larger.",
    blockText: {
      0: "Big O helps estimate how much work an algorithm does as its input grows. Code that runs quickly with 10 items may be far too slow with a million.",
      1: "Understanding Big O helps you spot when an approach stops working well for large inputs and compare solutions before choosing one. It is also a common topic in programming interviews.",
      2: "What does Big O tell us?",
      3: "Big O describes an upper bound on how an algorithm's workload grows with input size n. It does not predict an exact runtime in seconds. Instead, it shows how the number of operations grows as n gets larger. In these examples, n usually means the number of items or the length of the input.",
      4: "When the input doubles, the workload might double, quadruple, or stay almost the same—it depends on the algorithm. Big O lets us compare these growth patterns without running the program on every machine.",
      5: "A faster computer can reduce the actual runtime, but it does not change the algorithm's growth pattern. When comparing programs, also consider the implementation and the cost of built-in operations in each language.",
      6: "Why learn Big O?",
      7: [
        "Estimate how a solution behaves as the input grows.",
        "Compare two approaches without depending on a specific computer.",
        "Recognize when a solution may become too slow or use too much memory.",
        "Explain time and space costs in exercises and interviews.",
      ],
      8: "O, Ω, and Θ: three ways to describe growth",
      9: "These three notations describe bounds on workload growth. They can be used to analyze best-, worst-, or average-case inputs; the notation itself does not choose the case.",
      10: [
        "O (Big O)—upper bound: for sufficiently large inputs, the workload grows no faster than the stated rate.",
        "Ω (Big Omega)—lower bound: the workload grows at least as fast as the stated rate.",
        "Θ (Big Theta)—tight bound: the workload grows at the same order as the stated rate, which is both an upper and a lower bound.",
      ],
      11: "In everyday conversation, people often use “Big O” to mean worst-case complexity. That usage is common, but technically Big O is an upper bound; “worst case” describes which inputs we analyze.",
      12: "Count work, not seconds",
      13: "Actual runtime depends on the computer, language, and specific input. For Big O, count basic operations such as comparisons, assignments, or reads, then see how that count grows with n.",
      15: "In the next lesson, you will analyze code line by line, combine the work where appropriate, and simplify the result.",
      16: "Use the visualization below to compare growth rates as n changes. The vertical axis uses a logarithmic scale: moving up one unit means the workload grows tenfold. Grid lines may skip several units at larger values. A steeper curve means faster growth.",
    },
    codeText: {
      14: [
        "count = 0\nfor x in array:        // loop n times\n  count = count + 1    // do a constant amount of work each time\n\n// total: n constant-work steps = O(n)",
      ],
    },
  },
  "big-o-time-complexities": {
    title: "Common Time Complexities",
    module: "Big O Complexity",
    summary:
      "Explore seven common growth rates, from O(1) to O(n!), with code examples and an interactive visualization.",
    duration: "18 min",
    blockText: {
      0: "Here are seven time complexities you will encounter often, ordered from slowest-growing to fastest-growing. Notice how the workload changes as the number of items n increases.",
      1: "O(1)—Constant",
      2: "O(1) means the number of operations does not grow with the number of items n. For example, accessing an array item by index with a[i] takes roughly the same amount of work whether the array has 10 items or 10 million.",
      4: "O(log n)—Logarithmic",
      5: "At each step, the algorithm discards a fixed fraction of the remaining data—usually half. So even when the input grows dramatically, the number of steps increases only a little. Binary search is a familiar example.",
      7: "At each step, half of the remaining items are discarded. For example, 8 items take at most 3 steps; 1,000 items take about 10; 1 million take about 20; and 1 billion take about 30.",
      8: "O(n)—Linear",
      9: "The number of operations grows in proportion to the number of items. If the input size doubles, the workload roughly doubles too. Finding the largest value in an array is one example.",
      11: "An algorithm that visits each item once and does a constant amount of work per item typically has O(n) time complexity.",
      12: "O(n log n)—Linearithmic",
      13: "This growth rate often appears when an algorithm divides the data over about log n levels and processes roughly n items at each level. Merge sort is a classic example.",
      15: "O(n log n) grows faster than O(n), but it can still handle large inputs well in many cases. Many efficient sorting algorithms have this growth rate.",
      16: "O(n²)—Quadratic",
      17: "The number of operations grows roughly as n × n. This often happens when, for each item, the algorithm visits many other items—for example, with two nested loops that each run n times.",
      19: "Bubble sort, selection sort, and insertion sort can each take O(n²) operations in the worst case. At n = 1,000, that is about 1 million operations; at n = 10,000, about 100 million. For large inputs, we usually look for a slower-growing approach when one is available.",
      20: "O(2ⁿ)—Exponential",
      21: "O(2ⁿ) often appears when each item creates two choices, such as whether to include it. With n items there are 2ⁿ subsets, so checking every subset can require exponential work.",
      23: "O(2ⁿ) grows so quickly that it is usually practical only for small inputs. For some problems, memoization or dynamic programming avoids repeated work; however, not every problem can be reduced from exponential to polynomial time.",
      24: "O(n!)—Factorial",
      25: "There are n! ways to arrange n items. This number grows extremely quickly: even 15 items have more than a trillion permutations. If you need to generate and record every permutation, you also have to process n items for each result.",
      27: "Trying every possible arrangement is usually practical only for very small n. When the problem allows it, dynamic programming, branch and bound, or approximation methods can reduce the number of cases to consider.",
      28: "Quick reference",
      29: [
        "O(1)—Access an array item by index",
        "O(log n)—Binary search in a sorted array",
        "O(n)—Traverse an array once",
        "O(n log n)—Merge sort, heapsort",
        "O(n²)—Compare many pairs of items; some basic sorting algorithms",
        "O(2ⁿ)—Consider every subset of n items",
        "O(n!)—Arrange n items in every possible order; recording every arrangement can take O(n·n!) time",
      ],
      30: "Reading the growth chart",
      31: "In the visualization below, toggle curves to compare them, then move the n slider to see the estimated workload. The vertical axis is logarithmic, so fast-growing functions such as O(2ⁿ) and O(n!) rise sharply as n increases.",
    },
    codeText: {
      22: [
        "n = 20  → ~1,000,000 subsets\nn = 30  → ~1,000,000,000 subsets\nn = 40  → ~1,000,000,000,000 subsets",
      ],
    },
  },
  "big-o-space-complexity": {
    title: "Space Complexity",
    module: "Big O Complexity",
    summary:
      "Learn how much extra memory an algorithm needs, including the call stack used by recursion.",
    duration: "10 min",
    blockText: {
      0: "Big O describes memory use as well as running time. This lesson focuses on auxiliary space—the extra memory an algorithm needs beyond its input.",
      1: "For example, if the input is already an array, we do not count that array as auxiliary space. But if the algorithm creates another array to do its work, we count the new array.",
      2: [
        "Temporary data structures such as arrays, hash tables, stacks, or queues.",
        "Function calls waiting on the call stack during recursion.",
        "Buffers or intermediate storage used during computation.",
      ],
      3: "An algorithm can run quickly and still use too much memory. Here are some common space complexities.",
      4: "O(1)—Constant space",
      5: "When finding the largest value in an array, we only need one extra variable to store the current result. The number of extra variables stays the same no matter how many items are in the array.",
      7: "O(n)—Linear space",
      8: "If we create a new array to store the even numbers, the number of extra slots grows with the input size. Even if the new array contains only about half as many items, its space still grows as O(n).",
      10: "O(n²)—Quadratic space",
      11: "An n-by-n matrix needs n × n memory cells, so it uses O(n²) space. An adjacency matrix for a graph and some dynamic programming tables are common examples.",
      13: "Space used by recursion",
      14: "Whenever a function calls itself, the program stores that call on the call stack. The deeper the chain of calls waiting to finish, the more stack memory it uses.",
      15: "For example, the simple recursive Fibonacci algorithm makes many calls and takes O(2ⁿ) time. But those calls are not all on the stack at once: the maximum depth is about n, so the call stack uses O(n) space.",
      16: "For a recursive tree traversal, stack depth depends on the tree's height h. A balanced tree typically has h = O(log n); a skewed tree can reach O(n) height, so its call stack can also use O(n) space.",
      17: "Quick reference",
      18: [
        "O(1): only a fixed number of extra variables is needed.",
        "O(log n): the call stack for recursive binary search on data that is halved at each step.",
        "O(n): an auxiliary array that grows with the input, or a recursive call stack up to n calls deep.",
        "O(n²): a matrix or dynamic programming table with n rows and n columns.",
      ],
    },
    codeText: {
      6: [
        "function findMax(a) {\n  let max = a[0];          // one extra variable\n  for (let i = 1; i < a.length; i++) {\n    if (a[i] > max) max = a[i];\n  }\n  return max;\n}\n// Auxiliary space: O(1)",
      ],
      9: [
        "function collectEvens(a) {\n  const evens = [];        // grows in proportion to n\n  for (const x of a) {\n    if (x % 2 === 0) evens.push(x);\n  }\n  return evens;\n}\n// Auxiliary space: O(n)",
      ],
      12: [
        "// n × n adjacency matrix\nconst adj = Array.from(\n  { length: n },\n  () => new Array(n).fill(0)\n);\n// Auxiliary space: O(n²)",
      ],
    },
  },
  "big-o-rules": {
    title: "How to Analyze Big O from Code",
    module: "Big O Complexity",
    summary:
      "Use four rules to analyze loops, combine sequential steps, and simplify the result.",
    duration: "11 min",
    blockText: {
      0: "To estimate Big O, break a program into parts, count the work each part does, and then combine the results. These four rules help you analyze most basic code.",
      1: "Rule 1: Add the costs of sequential steps",
      2: "If the program finishes one part before starting another, add the work for each part. If the parts depend on different input sizes, keep each variable—for example, O(m + n²).",
      4: "Rule 2: Multiply the counts for nested loops",
      5: "If the outer loop runs n times and the inner loop runs m times per outer iteration, the inner body executes n × m times. So the complexity is O(n·m).",
      7: "Rule 3: Drop constant factors",
      8: "Big O focuses on how the workload grows as n gets large, so we omit constant multipliers. That is why n operations and 5n operations both simplify to O(n).",
      9: [
        "O(2n²) → O(n²)",
        "O(5n + 100) → O(n)",
        "O(n/3) → O(n)",
      ],
      11: "Rule 4: Keep the fastest-growing term",
      12: "When terms depend on the same n, keep the one that grows fastest. For very large n, slower-growing terms have little effect on the overall trend. For example, when n = 1,000,000, n² = 1,000,000,000,000, far greater than n.",
      13: [
        "O(n² + n) → O(n²)",
        "O(n³ + 10n) → O(n³)",
        "O(n³ + n² + n) → O(n³)",
      ],
      14: "Example: analyzing multiple steps",
      15: "Consider a program that sorts an array and then traverses it. Assume sorting takes O(n log n) work:",
      17: "For large n, n log n grows faster than n, so the sum simplifies to O(n log n). The actual cost of sort depends on how the library or programming language implements it.",
      18: "Common pitfalls",
      19: [
        "Two loops running one after the other, each n times: O(n) + O(n) = O(n), not O(n²).",
        "Two nested loops, each running n times: typically O(n·n) = O(n²) operations.",
        "Built-in functions also have costs. For example, copying an array of n items typically takes O(n); sorting cost depends on the implementation.",
        "Repeated string concatenation can take O(n²) if each operation copies the entire string built so far; the exact cost depends on the language and implementation.",
        "For recursion, consider both the number of calls and the work per call; a recursion tree or the Master Theorem can help.",
      ],
    },
    codeText: {
      3: [
        "// Part A — O(m)\nfor (let i = 0; i < m; i++) {\n  doWork();\n}\n\n// Part B — O(n²)\nfor (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    doWork();\n  }\n}\n// Total: O(m + n²)",
      ],
      6: [
        "for (let i = 0; i < n; i++) {      // n iterations\n  for (let j = 0; j < m; j++) {    // m iterations\n    doWork();                      // constant amount of work\n  }\n}\n// Total: O(n·m)",
      ],
      10: [
        "for (const x of a) doWork();  // O(n)\nfor (const x of a) doWork();  // O(n)\n// 2 × O(n) = O(n)",
      ],
      16: [
        "function process(a) {\n  a.sort((x, y) => x - y);  // assume O(n log n)\n  for (const x of a) {      // O(n)\n    console.log(x);\n  }\n}\n// O(n log n) + O(n) = O(n log n)",
      ],
    },
  },
  "big-o-best-worst-average": {
    title: "Best, Worst, and Average Cases",
    module: "Big O Complexity",
    summary:
      "The same algorithm can do more or less work depending on its input.",
    duration: "8 min",
    blockText: {
      0: "The same algorithm can do different amounts of work on different inputs. We often analyze the best, worst, and average cases to understand how its workload can vary.",
      1: "Three ways to analyze inputs",
      2: [
        "Best case: the input that makes the algorithm do the least work.",
        "Worst case: the input that makes the algorithm do the most work. This is often used to bound the cost when the input is unfavorable.",
        "Average case: the expected workload over a specified input distribution. To analyze it, we need to state our assumptions about the data.",
      ],
      3: "Do not confuse these cases with O, Ω, and Θ. O is an upper bound, Ω is a lower bound, and Θ is a tight bound; each notation can be used to analyze any of the three cases.",
      4: "Example: linear search",
      6: [
        "Best case: the target is the first item, so only one comparison is needed → O(1).",
        "Worst case: the target is last or absent, so the algorithm may check all n items → O(n).",
        "Average case: if the target is equally likely to be at any position, about n/2 items are checked. The growth rate is still O(n).",
      ],
      7: "Example: insertion sort",
      8: [
        "Best case: the array is already sorted, so the algorithm makes one pass → O(n).",
        "Worst case: the array is in reverse order, so each item must move past many others → O(n²).",
        "Average case: O(n²).",
      ],
      9: "Example: quicksort",
      10: "On average, quicksort takes O(n log n) time. But if the pivot repeatedly splits the array into highly uneven parts—for example, leaving one item on one side—the worst-case time complexity can be O(n²).",
      11: [
        "Best and average cases: O(n log n).",
        "Worst case: O(n²) when the partitions are repeatedly unbalanced.",
        "Choosing a random pivot reduces the chance of unbalanced partitions, but does not eliminate the worst case.",
      ],
      12: "How to report complexity",
      13: "When explaining a solution, say whether you are analyzing time or space, and which case you mean. If the cases have different costs, explain what kind of input leads to each one.",
    },
  },
  "complexity-drill": {
    title: "Big O Complexity Practice",
    module: "Big O Complexity",
    summary:
      "Review how to identify Big O with 10 timed questions.",
    duration: "10 min",
    blockText: {
      0: "This practice set has 10 mixed-difficulty questions. You have 25 seconds per question; when time runs out, the question is marked incorrect.",
      1: [
        "Read the code or prompt, then choose one of the four answers.",
        "After each question, read the explanation to see how to identify the complexity.",
        "If you are unsure, revisit the related lesson and try again.",
      ],
    },
    quiz: {
      title: "Big O Practice",
      description:
        "10 mixed-difficulty questions, with 25 seconds for each. Choose an answer, then read the explanation.",
      questions: [
        {
          tag: "Array",
          prompt: "What is the time complexity of accessing a[i] by index?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "An array lets you access an element directly by index. The number of operations does not grow with the number of items n, so the complexity is O(1).",
        },
        {
          tag: "Loops",
          prompt: "What is the time complexity of traversing an array once?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "The loop runs n times and does a constant amount of work per iteration, for a total of O(n).",
        },
        {
          tag: "Loops",
          prompt: "What is the complexity of two nested loops that each run n times?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
          explanation:
            "For each outer-loop iteration, the inner loop runs n times. That gives n × n iterations in total, so the complexity is O(n²).",
        },
        {
          tag: "Search",
          prompt: "What is the time complexity of binary search on a sorted array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Each step discards half of the remaining items, so the number of steps grows as log₂n → O(log n).",
        },
        {
          tag: "Loops",
          prompt: "What is the complexity of a loop that doubles i after each iteration?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "i takes the values 1, 2, 4, 8, ...; it takes about log₂n iterations to reach n, so the complexity is O(log n).",
        },
        {
          tag: "Sorting",
          prompt:
            "Assume sort takes O(n log n). What is the complexity of sorting an array and then traversing it?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          explanation:
            "Under the assumption, sort() takes O(n log n), while the loop takes O(n). Add the two costs and keep the faster-growing term: O(n log n).",
        },
        {
          tag: "Array",
          prompt: "What is the complexity of finding the maximum with one array traversal?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "In the worst case, the algorithm must check every item once → O(n).",
        },
        {
          tag: "Loops",
          prompt: "The outer loop runs n times and the inner loop runs m times. What is the total complexity?",
          options: ["O(n + m)", "O(n·m)", "O(n²)", "O(log(n·m))"],
          explanation:
            "For each outer-loop iteration, the inner loop runs m times, for n × m iterations in total → O(n·m).",
        },
        {
          tag: "Addition rule",
          prompt:
            "Two loops run one after the other, and each runs n times. What is their total complexity?",
          options: ["O(n)", "O(n²)", "O(2n²)", "O(log n)"],
          explanation:
            "The loops run sequentially, so add their costs: O(n) + O(n) = O(2n). Drop the constant factor 2 to get O(n).",
        },
        {
          tag: "Dynamic array",
          prompt:
            "What is the amortized complexity of appending an item to a dynamic array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "Most appends take one operation. Occasionally, the array must grow and copy its elements; amortized across a sequence of appends, the cost per append is still O(1). This is called amortized complexity.",
        },
      ],
    },
  },
  "complexity-quiz-easy": {
    title: "Big O Quiz — Beginner",
    module: "Big O Complexity",
    summary:
      "Practice identifying O(1), O(log n), O(n), O(n log n), and O(n²) in simple examples.",
    duration: "8 min",
    blockText: {
      0: "This quiz covers basic examples involving loops, nested loops, and built-in functions. There is no time limit; try to explain why your answer is correct.",
    },
    quiz: {
      title: "Big O Quiz — Beginner",
      description: "10 beginner questions, with no time limit.",
      questions: [
        {
          tag: "Array",
          prompt: "What is the time complexity of accessing a[i] by index?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "Accessing an element by index takes a constant number of operations, regardless of the array's length → O(1).",
        },
        {
          tag: "Loops",
          prompt: "A loop runs n times and does a constant amount of work each time. What is its complexity?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "Each iteration does a constant amount of work, and there are n iterations in total → O(n).",
        },
        {
          tag: "Loops",
          prompt: "Two nested loops each run n times. What is their complexity?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
          explanation:
            "The inner loop runs n times for each outer-loop iteration: n × n = O(n²).",
        },
        {
          tag: "Search",
          prompt: "What is the complexity of binary search on a sorted array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Each step discards half of the remaining items → O(log n).",
        },
        {
          tag: "Addition rule",
          prompt:
            "Two loops run one after the other, and each traverses the array once. What is their total complexity?",
          options: ["O(n)", "O(n²)", "O(n log n)", "O(1)"],
          explanation:
            "The loops run sequentially, so add their costs: O(n) + O(n) = O(2n). Drop the constant factor 2 to get O(n).",
        },
        {
          tag: "Array",
          prompt:
            "What is the worst-case time complexity of finding x with includes() in an unsorted array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "In the worst case, includes() must check all n items (if x is last or is not in the array) → O(n).",
        },
        {
          tag: "Concepts",
          prompt: "At each step, the amount of data to process is cut in half. What is the complexity?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "The remaining data is halved at each step, so it takes about log₂n steps → O(log n).",
        },
        {
          tag: "Concepts",
          prompt: "The number of operations stays the same regardless of input size. What is the complexity?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "The number of operations does not grow with the input size n → O(1).",
        },
        {
          tag: "Sorting",
          prompt: "What is the time complexity of merge sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          explanation:
            "Merge sort divides the data over about log n levels and processes n items in total at each level → O(n log n).",
        },
        {
          tag: "Simplification",
          prompt: "Simplify O(4n + 20).",
          options: ["O(4n)", "O(n)", "O(n + 20)", "O(1)"],
          explanation:
            "Drop the constant factor 4 and the constant term 20; the remaining growth rate is O(n).",
        },
      ],
    },
  },
  "complexity-quiz-medium": {
    title: "Big O Quiz — Intermediate",
    module: "Big O Complexity",
    summary:
      "Analyze loops with changing increments, multiple input sizes, recursion, and data operations.",
    duration: "12 min",
    blockText: {
      0: "This quiz covers loops with changing increments, multiple input sizes, recursion, and operations on arrays or strings. There is no time limit.",
    },
    quiz: {
      title: "Big O Quiz — Intermediate",
      description: "10 intermediate questions, with no time limit.",
      questions: [
        {
          tag: "Loops",
          prompt:
            "The inner loop starts at i and runs up to n. What is the complexity of the two loops?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
          explanation:
            "The total number of iterations is about n + (n−1) + ... + 1 = n(n+1)/2. Drop the constant factor and lower-order term to get O(n²).",
        },
        {
          tag: "Loops",
          prompt: "A loop multiplies i by 3 after each iteration. What is its complexity?",
          options: ["O(log₃ n)", "O(n)", "O(n log n)", "O(3ⁿ)"],
          explanation:
            "i takes the values 1, 3, 9, 27, ...; it takes about log₃n iterations. The logarithm's base does not change its growth rate → O(log n).",
        },
        {
          tag: "Loops",
          prompt: "The outer loop runs n times, and the inner loop runs m times per outer iteration. What is the complexity?",
          options: ["O(n + m)", "O(n·m)", "O(max(n, m))", "O(n log m)"],
          explanation:
            "The outer loop runs n times, with m inner iterations each time, for n × m operations in total → O(n·m).",
        },
        {
          tag: "Sorting",
          prompt:
            "Assume sort takes O(n log n). What is the total complexity of sorting an array and then traversing it?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          explanation:
            "Add the costs of the two steps: O(n log n) + O(n). For large n, n log n grows faster than n, so the result is O(n log n).",
        },
        {
          tag: "Recursion",
          prompt:
            "Each call solves a problem of size n/2 and does a constant amount of extra work: T(n) = T(n/2) + O(1). What is the complexity?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "The problem size is halved with each call, so there are about log₂n recursive levels. Each level does constant work → O(log n).",
        },
        {
          tag: "Strings",
          prompt:
            "If each concatenation creates a new string and copies the entire old string, how much time can this code take?",
          options: ["O(1)", "O(n)", "O(n²)", "O(n log n)"],
          explanation:
            "If each concatenation copies the string built so far, the total copying is 1 + 2 + ... + n, which is O(n²). The actual cost depends on how the language and runtime handle strings.",
        },
        {
          tag: "Loops",
          prompt: "The outer loop runs n times; on each iteration, the inner loop doubles j. What is the total complexity?",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
          explanation:
            "The outer loop runs n times, and the inner loop runs about log₂n times → O(n·log n).",
        },
        {
          tag: "Data structures",
          prompt: "What is the average-case complexity of looking up a key in a hash table?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "A hash table typically supports lookup in O(1) on average. If many keys collide, the worst case can be O(n).",
        },
        {
          tag: "Addition rule",
          prompt:
            "A program runs a loop n times, then runs two nested loops for n × n iterations. What is its total complexity?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
          explanation:
            "Add the two costs: O(n) + O(n²). Since n² grows faster than n, the result simplifies to O(n²).",
        },
        {
          tag: "Loops",
          prompt: "What is the complexity of comparing every pair of items with two nested loops?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
          explanation:
            "There are about n²/2 pairs to check, which is still O(n²). A set can reduce the average running time to O(n).",
        },
      ],
    },
  },
  "complexity-quiz-hard": {
    title: "Big O Quiz — Advanced",
    module: "Big O Complexity",
    summary:
      "Take on recursion, auxiliary space, dynamic programming, and cases that need careful analysis.",
    duration: "15 min",
    blockText: {
      0: "This advanced quiz covers recursion, auxiliary space, dynamic programming, and common points of confusion. There is no time limit; read each question's assumptions carefully.",
    },
    quiz: {
      title: "Big O Quiz — Advanced",
      description: "10 advanced questions, with no time limit.",
      questions: [
        {
          tag: "Recursion",
          prompt:
            "What is the time complexity of the naive recursive Fibonacci algorithm, which does not store previously computed results?",
          options: ["O(n)", "O(n log n)", "O(2ⁿ)", "O(n!)"],
          explanation:
            "Many calls repeat the same work, and the call tree grows exponentially. A commonly used upper bound is O(2ⁿ), so this approach is practical only for small n.",
        },
        {
          tag: "Recursion",
          prompt:
            "A function makes two recursive calls on inputs of size n/2, then does O(n) additional work: T(n) = 2T(n/2) + O(n). What is its complexity?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          explanation:
            "Each recursive level processes about n items in total, and there are about log n levels → O(n log n). Merge sort has this recurrence.",
        },
        {
          tag: "Recursion",
          prompt:
            "Each call solves a problem one unit smaller and does O(1) extra work: T(n) = T(n − 1) + O(1). What is the complexity?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "The problem size decreases by one from n to 0, giving about n calls → O(n).",
        },
        {
          tag: "Space",
          prompt: "How much auxiliary space does merge sort need to merge its elements?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Merging requires a temporary array proportional to n → O(n). The recursion stack uses another O(log n), but total auxiliary space is still O(n).",
        },
        {
          tag: "Dynamic programming",
          prompt:
            "A dynamic programming table for choosing numbers that sum to W has n rows and W columns. What is the time complexity?",
          options: ["O(n)", "O(n + W)", "O(n·W)", "O(2ⁿ)"],
          explanation:
            "There are about n × W cells, and each takes a constant amount of work → O(n·W). The complexity depends on both the number of items n and the target sum W.",
        },
        {
          tag: "Space",
          prompt:
            "An iterative binary search uses only a few variables. What is its auxiliary space complexity?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "The iterative version stores only a few variables, such as lo, hi, and mid → O(1). A recursive version may use O(log n) space for the call stack.",
        },
        {
          tag: "Loops",
          prompt: "Three nested loops each run n times. What is their complexity?",
          options: ["O(n²)", "O(n² log n)", "O(n³)", "O(3ⁿ)"],
          explanation:
            "The three loops perform about n × n × n operations → O(n³).",
        },
        {
          tag: "Loops",
          prompt: "The outer loop runs n times, and the inner loop always runs 100 times. What is the complexity?",
          options: ["O(100)", "O(n)", "O(n²)", "O(n·100²)"],
          explanation:
            "100 does not vary with n, so it is a constant. There are 100n iterations in total, which simplifies to O(n).",
        },
        {
          tag: "Space",
          prompt:
            "How much call-stack space does recursive search in a balanced binary search tree need?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "A balanced tree has height O(log n), so at most O(log n) recursive calls are active on the stack.",
        },
        {
          tag: "Permutations",
          prompt: "How does the number of ways to arrange n items grow?",
          options: ["O(n²)", "O(2ⁿ)", "O(n!)", "O(n log n)"],
          explanation:
            "There are n! ways to arrange n items. If every arrangement must be generated and recorded, each result also takes n items to process, so the total time can be Θ(n·n!).",
        },
      ],
    },
  },
  "selection-sort": {
    title: "Selection Sort",
    module: "Sorting Algorithms",
    summary:
      "On each pass, find the smallest value in the unsorted portion and move it to the front.",
    duration: "6 min",
    blockText: {
      0: "Selection Sort divides the array into two parts: the sorted portion on the left and the unsorted portion on the right. On each pass, it finds the smallest value in the unsorted portion and swaps it with the first value in that portion.",
      1: "Implementation",
      3: "Complexity",
      4: [
        "Time: O(n²) in every case.",
        "Space: O(1).",
        "Among O(n²) sorting algorithms, Selection Sort uses the fewest swaps: at most n - 1.",
      ],
    },
  },
  "insertion-sort": {
    title: "Insertion Sort",
    module: "Sorting Algorithms",
    summary:
      "Insert each value into its correct position in the sorted portion on the left.",
    duration: "6 min",
    blockText: {
      0: "Insertion Sort works like sorting a hand of cards: take one card at a time and insert it into the correct position among the cards already sorted.",
      1: "Implementation",
      3: "Complexity",
      4: [
        "Time: O(n²) in the worst case, but O(n) when the array is nearly sorted.",
        "Space: O(1).",
        "Stable, and very efficient for small arrays.",
      ],
    },
  },
  "sd-what-is-system-design": {
    title: "What is System Design?",
    module: "Introduction to System Design",
    summary:
      "What system design involves, why it matters, and how to move from requirements to architecture through a photo-sharing app example.",
    duration: "12 min",
    blockText: {
      0: "Imagine building a photo-sharing app: users sign up, upload photos, follow one another, and view a feed of photos from people they follow. You write the code, deploy everything on one server—and it works perfectly for the first few thousand users.",
      1: "But when ten million people visit each day, the photo-upload code may stay the same while the problems you need to solve change completely.",
      2: "The Problem",
      3: [
        "Storage: where will hundreds of terabytes of photos live?",
        "Failure: what happens when the server running the app goes down?",
        "Distance: how do you keep the feed fast for users in India when the server is in the US?",
        "Traffic spikes: what happens when a celebrity posts a photo and a million people view it at once?",
      ],
      4: "These problems can no longer be solved inside a single function. They depend on how the entire system is designed and how its components work together.",
      5: "What Is System Design?",
      6: "System design is the process of deciding which components a system needs, what each one is responsible for, how they communicate, and how data flows between them so the system can meet its requirements.",
      7: "It operates at a higher level than writing code. When coding, you think about functions, classes, data structures, and algorithms. When designing a system, you think about servers, databases, caches, queues, storage, and the networks connecting them.",
      8: [
        "Building blocks — Coding: functions, classes, data structures. System design: servers, databases, caches, queues, storage.",
        "Connections — Coding: function calls and return values. System design: network requests, messages, replication.",
        "Typical question — Coding: is this algorithm correct and efficient? System design: can the components handle the load, and what happens when one fails?",
      ],
      9: "You also need to consider what happens when a component slows down or fails, and how the system behaves as traffic and data grow. A design that works well on an ordinary day with one server should still work when the database is slow, a server goes down, or traffic doubles overnight.",
      10: "Start with Requirements",
      11: "Every system design starts with requirements: you cannot evaluate a design until you know what the system needs to do. Requirements usually fall into two groups.",
      12: "Functional requirements describe what the system does. For the photo app: upload photos, follow other users, like posts, and view a feed.",
      13: "Non-functional requirements describe how well the system does it: the feed loads in under 200 ms, the app stays available if a server fails, and uploaded photos are not lost.",
      14: "These two groups affect the design in different ways. Functional requirements determine which features, APIs, and components you need; each feature often maps to an API, and each API touches specific parts of the system.",
      16: "Non-functional requirements shape how components are designed, how much capacity is needed, how failures are handled, and where the system is deployed. A 200 ms feed target may lead you to add a cache; an availability requirement means you need more than one server; a durability requirement affects how and where photos are stored.",
      17: "A common pitfall is starting with technology: “Use Kafka, Redis, Kubernetes, and Cassandra.” A better approach is to start with the requirements: “We need to handle high write volume, absorb traffic spikes, and process events asynchronously.” That points toward a queue or log-based system.",
      18: "Building Blocks",
      19: "Most large systems are assembled from a small set of common building blocks. Here is how they fit together in a photo-sharing app:",
      20: [
        "Clients: mobile apps and browsers send requests to the system.",
        "DNS: translates a domain name into a server address.",
        "Load balancer: distributes requests across multiple application servers.",
        "Application servers: run the business logic.",
        "Databases: store structured data such as users, follows, and photo metadata.",
        "Object storage: holds large files such as the photos themselves.",
        "Caches: keep frequently read data in memory so the database does not need to be queried every time.",
        "CDN: stores copies of static content (photos) on servers near users for faster delivery.",
        "Message queues: move work that does not need to finish immediately into the background, so users do not have to wait.",
      ],
      21: "Much of system design is deciding which building blocks you need and how they should work together.",
      22: "A Request Through the System",
      23: "Consider a photo-upload flow. The request passes through a load balancer to an application server. The server stores metadata (owner, caption, timestamp) in the database, then creates a pre-signed URL that lets the photo upload directly to object storage. The photo bytes do not pass through the application server, so large uploads do not tie it up.",
      24: "After the upload finishes, the system puts a job on a message queue. Background workers take the job and handle slower tasks, such as generating thumbnails or updating the feeds of followers.",
      25: "Reading the feed follows a different path. When a user opens it, the application server checks the cache first for a list of posts. If the list is not there, it reads from the database and caches the result for later requests. The photos themselves are served through a CDN, so users download them from a nearby server instead of fetching every photo from the origin storage system.",
      26: "Architecture of a large-scale photo-sharing app.",
      27: "Each component is there for a reason:",
      28: [
        "CDN: reduces latency when loading photos.",
        "Message queue: keeps slow work out of the request path.",
        "Cache: reduces database load for repeated reads.",
        "Object storage: provides scalable storage for large files.",
      ],
      29: "What We Design For",
      30: [
        "Scalability: handle more users, traffic, and data as demand grows.",
        "Availability: keep the system accessible when users need it, even if some components fail.",
        "Reliability: keep the system behaving correctly without losing, duplicating, or corrupting data.",
        "Performance: latency (how long one request takes) and throughput (how many requests are handled per unit of time).",
        "Consistency: ensure users and services see the same latest version of the data.",
        "Maintainability: make the system easier to operate, debug, update, and extend over time.",
        "Cost: meet requirements without using more servers, storage, bandwidth, or effort than necessary.",
      ],
      31: "Every Choice Involves Trade-offs",
      32: "Improving one quality often comes at a cost elsewhere. For example, adding a cache reduces database load and makes reads much faster, but cached data can become stale until it is refreshed or expires. Likewise, adding replicas and redundancy can improve performance and availability, but it also raises costs and makes the system more complex to operate.",
      33: "There is rarely a design that is best in every way. Much of system design is understanding these trade-offs, deciding which qualities matter most for your requirements, and explaining why you chose one approach over another.",
      34: "Design Evolves Over Time",
      35: "Real systems are rarely built in their complete form from day one. A photo app might start with one application server and one database—more than enough for the first few thousand users.",
      36: "As usage grows, bottlenecks emerge: the database is overloaded, photo delivery is too slow, or background work starts delaying user requests. That is when you add the component that addresses each specific problem.",
      37: "Adding everything too early often creates complexity, more things to debug, and higher costs without much benefit. A good design meets today's requirements while leaving room to grow as they change.",
      38: "Why Learn System Design?",
      39: "If you work on backend systems, you make system-design decisions all the time—even when building a small feature. Consider the Like feature in a photo app: should you cache the like count, update it synchronously in the request or send it to a queue, and what happens if traffic spikes after a celebrity posts?",
      40: [
        "Cache the like count? Yes—it is read much more often than it changes. Trade-off: the count may be temporarily stale.",
        "Update in the request or through a queue? Put it on a queue so users get a quick response. Trade-off: more components to run and monitor.",
        "Traffic spike? Add servers and spread the load. Trade-off: higher cost.",
      ],
      41: "System Design Interviews",
      42: "At many technology companies, a system design interview is a standard part of the process for mid-level and senior engineers. Prompts are usually open-ended: design a URL shortener, a chat app, or a photo-sharing app. You typically have 45–60 minutes; there is no single correct answer, and you do not need to write code that passes test cases.",
      43: "Instead, follow a process:",
      44: [
        "Clarify requirements: agree on the core features and non-functional goals before drawing anything.",
        "Estimate scale: make rough estimates of users, requests per second, and storage to identify the main pressures.",
        "Sketch the high-level design: start with the main building blocks and trace how a request flows through them.",
        "Explore a few important areas in depth: the database, caching, data flow, or failure handling.",
      ],
      45: "Throughout the process, explain your decisions and their trade-offs. You do not need to memorize standard designs. If you understand the core building blocks, the problems they solve, and the trade-offs they bring, you can reason about systems you have never seen before.",
      46: "Conclusion",
      47: "System design turns a set of requirements into a system of components, defines how they work together, and makes trade-offs suited to the problem at hand. In the lessons ahead, we will explore each building block and concept, the problems it solves, and when to use it.",
    },
    codeText: {
      15: [
        "Feature        API             Related components\nUpload photo   POST /photos    App server, database, object storage\nFollow         POST /follows    App server, database\nLike post      POST /likes      App server, database\nView feed      GET  /feed       App server, cache, database",
      ],
    },
    diagramText: {
      26: {
        edges: {
          "cdn-client": { label: "photo" },
        },
      },
    },
  },
  "sd-top-30-concepts": {
    title: "30 Must-Know Concepts",
    module: "Introduction to System Design",
    summary:
      "Review 30 key system design concepts across six areas, from networking and APIs to scaling, distributed systems, and architecture.",
    duration: "23 min",
    blockText: {
      0: "System design can seem overwhelming at first: hundreds of concepts, countless technologies, and endless ways to architect a system. The good news is that you do not need to know everything. Most system design problems—whether in practice or in interviews—draw on the same core ideas.",
      1: "This lesson covers 30 essential concepts, grouped into six building blocks: Networking, APIs & Communication, Data Storage, Scaling, Distributed Systems, and Architecture Patterns. Think of it as both an introduction and a quick review before an interview.",
      2: "Group 1: Networking Fundamentals",
      3: "Before designing any system, you need to understand how computers communicate. Every request in a distributed system travels over a network; these six concepts are the foundation.",
      4: "1. Client–Server Model",
      5: "A client (a browser, app, or another server) sends requests; a server listens, processes them, and returns responses. Separating client and server lets you change the client without changing the server, and scale the server independently.",
      6: "The client–server flow: the client sends a request, the server processes it and returns a response. Separating the two roles lets each side change and scale independently.",
      7: "2. IP Address",
      8: "Every device on the Internet has a unique IP address used for routing. IPv4 (about 4.3 billion addresses) is exhausted; IPv6 provides a nearly unlimited address space. In system design, IP addresses identify servers, load balancers, and database nodes on the network.",
      9: "A packet is routed toward the destination IP address. On a private network, devices use private IPs; a NAT router maps them to a public IP on the way out to the Internet.",
      10: "3. DNS (Domain Name System)",
      11: "DNS is the Internet's “phone book”: it translates a domain name (google.com) into an IP address. Resolution passes through local caches, a resolver, root servers, TLD servers, and an authoritative server; the result is cached at each layer. DNS is also used for load balancing and failover.",
      12: "DNS resolves a domain through the local cache, resolver, root, TLD, and authoritative servers; the client then uses the IP address to reach the server.",
      13: "4. Forward Proxy vs. Reverse Proxy",
      14: "A forward proxy sits in front of clients and hides their identities (for example, a VPN or corporate proxy); it is used for privacy, content filtering, and bypassing regional restrictions. A reverse proxy sits in front of servers and hides them (for example, Nginx or HAProxy); it can handle TLS termination, caching, compression, and load balancing.",
      15: "A forward proxy sits in front of clients and hides their identity; a reverse proxy sits in front of servers, hides them, and handles TLS, caching, and load balancing.",
      16: "5. Latency",
      17: "Latency is the time it takes data to travel from A to B, measured in milliseconds. 100 ms is barely noticeable, 1 second feels slow, and at 3 seconds users leave. Sources of latency include physical distance, data serialization, server processing, and queueing under load. CDNs, caches, and regionally placed servers can reduce it.",
      18: "6. HTTP / HTTPS",
      19: "HTTP defines the structure of web requests and responses between clients and servers. HTTPS is HTTP encrypted with TLS to prevent eavesdropping. HTTP is stateless, which makes it easier to scale, but cookies, tokens, or sessions are needed to maintain state. Key details include methods (GET/POST/PUT/DELETE), status codes (200/404/500), and headers.",
      20: "Group 2: APIs & Communication",
      21: "Once you know how machines connect, the next question is how applications exchange structured data. An API is a contract that defines what you can ask for and what you get back.",
      22: "7. API (Application Programming Interface)",
      23: "An API is a contract between two pieces of software: what you can request, how to request it, and what you get back. Most modern APIs exchange JSON over HTTP: a client calls an endpoint, and the server returns a status code with data.",
      24: "8. REST API",
      25: "REST treats everything as a resource and uses standard HTTP methods that map naturally to CRUD: POST creates, GET reads, PUT/PATCH updates, and DELETE removes. Its core principles include statelessness, cacheability, and a uniform interface. REST is simple, but getting data from many resources may require multiple requests.",
      26: "9. GraphQL",
      27: "GraphQL lets clients specify exactly which data they need in one query, and the server returns that shape—avoiding multiple REST endpoints. The trade-offs are greater server complexity (resolvers for each field), harder caching (queries vary), and the risk of slow, deeply nested queries.",
      28: "10. WebSockets",
      29: "HTTP is one-way—the client initiates each exchange—but chat, live scores, and collaborative editors need the server to push data to clients. A WebSocket starts with HTTP, then upgrades to a persistent, two-way connection so either side can send messages at any time. The trade-off is statefulness, which makes scaling harder; if the server goes down, its connections are lost.",
      30: "11. Webhooks",
      31: "Webhooks reverse the polling model: instead of a client asking repeatedly, a server sends a notification to a callback URL when an event occurs (for example, a Stripe payment or a GitHub code push). The main challenge is reliability—you need retries, event logging, and idempotent handling when the destination server is down.",
      32: "Group 3: Data Storage",
      33: "Choosing a storage strategy is one of the most important decisions in system design. This group covers database types, indexing, partitioning, caching, and more.",
      34: "12. Databases",
      35: "There is no single “best” database. Relational databases (PostgreSQL, MySQL) store related tables and suit transactional data that needs consistency. Document databases (MongoDB) store flexible JSON documents. Key-value stores (Redis, DynamoDB) offer fast, hash-map-like lookups. Graph databases (Neo4j) model relationships and suit social networks and recommendations. Choose based on the data model, query patterns, and scaling needs.",
      36: "13. SQL vs. NoSQL",
      37: "SQL databases enforce a strict schema and support ACID. NoSQL databases trade some constraints for flexibility and horizontal scaling. Choose SQL when you need strong consistency, complex joins, and a stable schema. Choose NoSQL when you need horizontal scaling, a changing schema, high write throughput, or unstructured data such as logs and posts. Many real systems use both—the important thing is to explain why.",
      38: "14. Database Indexing",
      39: "Without an index, finding a row requires scanning the whole table—fine for 100 rows, disastrous for 100 million. An index is a data structure that speeds up lookups, often a B-tree with O(log n) search. The trade-off: indexes speed up reads but slow writes and use storage. Index columns used in WHERE and JOIN clauses, but do not add indexes indiscriminately.",
      40: "15. Vertical Partitioning",
      41: "When a table has too many columns, vertical partitioning splits it into narrower tables, each holding a subset of the columns and linked by a shared key. The goal is to match access patterns: a profile page needs a name and avatar, not a billing address. Each query touches only the columns it needs, reading fewer bytes and running faster. This can also help with security and independent optimization.",
      42: "16. Caching",
      43: "A cache stores frequently read data in a fast layer (RAM), avoiding a database lookup on every request—it is one of the most effective ways to improve read performance. A common pattern is cache-aside: the app checks the cache first; on a hit, it returns the data; on a miss, it reads from the database, caches the result, and returns it. The hard part is invalidation: TTL, write-through, and write-behind.",
      44: "With cache-aside, the application checks the cache first: on a hit, it returns the result immediately; on a miss, it reads from the database and updates the cache. Cache invalidation is the hard part.",
      45: "17. Denormalization",
      46: "Normalized databases split data across tables to avoid duplication, but joining five tables to load one page can be slow. Denormalization deliberately duplicates data to reduce joins. The trade-off: if a user changes their name, it must be updated in multiple places. Use it when a system is read-heavy and those reads require expensive joins; always have a strategy for keeping duplicated data consistent.",
      47: "18. Blob Storage",
      48: "Photos, videos, and PDFs are binary large objects that do not fit well in rows and columns. Blob storage (such as Amazon S3) stores large blocks of data cheaply and durably. A common pattern is to put the file in blob storage, get a URL, and store that URL in the database. The database stays small (a URL instead of a 10 MB image), while blob storage handles durability, replication, and delivery (often with a CDN).",
      49: "Group 4: Scaling",
      50: "As an application grows, one server may no longer be enough. Scaling means handling more traffic, data, and users without breaking down. There are two basic approaches, and they are not mutually exclusive.",
      51: "19. Vertical Scaling (Scale Up)",
      52: "The simplest approach is to buy a more powerful machine—with more CPU, RAM, and faster storage. No code changes are needed. The drawbacks: hardware has limits, higher-end machines become disproportionately expensive, and the machine remains a single point of failure—if it goes down, everything goes down.",
      53: "20. Horizontal Scaling (Scale Out)",
      54: "Instead of making one server bigger, add more servers. Large systems use this approach. The trade-off is that the application must be designed for it: servers must be stateless, sessions must live in a shared store (such as Redis), a load balancer is needed, and the database needs its own scaling strategy (replication, sharding).",
      55: "21. Load Balancers",
      56: "A load balancer sits between clients and a pool of servers, distributing requests so no server is overloaded. Common algorithms include Round Robin (take turns), Least Connections (send to the server with the fewest connections), and Weighted (send more to stronger servers). A load balancer also runs health checks and automatically removes servers that stop responding. It supports both scaling and availability.",
      57: "22. Replication",
      58: "Replication copies data across multiple database servers. A common setup is primary–replica: all writes go to the primary, and changes are copied to replicas that serve reads. Since most applications are read-heavy, sending reads to replicas reduces load on the primary. The trade-off is replication lag: a replica may return slightly stale data. That may be fine for a feed, but account balances should be read from the primary.",
      59: "23. Sharding",
      60: "Sharding splits data across multiple nodes, with each node holding a subset (unlike replication, where every node has all the data). It distributes both storage and write load. A shard key determines which shard holds each record; common approaches are hash-based and range-based. A poor shard key creates a hot shard. Challenges include cross-shard queries, rebalancing when shards are added, and operational complexity.",
      62: "Replication copies the full dataset to reduce read load; sharding partitions the dataset by shard key to distribute traffic and storage.",
      63: "Group 5: Distributed Systems",
      64: "With multiple servers, databases, and caches spread across a network, you are working with distributed systems. Tasks that are simple on one machine—such as keeping data consistent—become much harder when machines can fail independently and the network can partition.",
      65: "24. CAP Theorem",
      66: "CAP says a distributed system can guarantee only two of three properties: Consistency (reads see the latest write), Availability (every request gets a response), and Partition Tolerance (the system keeps operating when the network between nodes breaks). Because partitions cannot be avoided, the practical choice is CP (such as MongoDB or HBase—useful for banking and inventory) or AP (such as Cassandra or DynamoDB—useful for feeds and catalogs, where availability matters more than strict correctness).",
      67: "25. CDN (Content Delivery Network)",
      68: "A CDN is a global network of servers that caches and serves content from locations near users. It mainly serves static content (photos, CSS, JavaScript, and video); some CDNs also cache dynamic content or run serverless code at the edge. The first user in a region may get a cache miss and fetch from the origin; later users get the cached copy much faster. Providers include CloudFront, Cloudflare, and Akamai.",
      69: "The first request in a region misses the cache and goes to the origin; later requests are served from an edge cache near the user.",
      70: "26. Idempotency",
      71: "In a distributed system, requests can fail and be retried. A timeout does not prove the request failed—the server may have processed it while the response was lost, so a retry could charge twice. An operation is idempotent if it has the same result no matter how many times it runs. GET and DELETE are inherently idempotent; POST is not, so use an idempotency key: the client sends a unique key with each request, and if the server has already processed it, the server returns the previous result instead of processing it again.",
      73: "Group 6: Architecture Patterns",
      74: "Once you have the building blocks for networking, storage, and scaling, the final question is how to organize them into a coherent system. Architecture patterns provide proven blueprints.",
      75: "27. Microservices",
      76: "As an application grows, a single codebase (a monolith) can become difficult to maintain, deploy, and scale. Microservices split it into small, independent services, each responsible for a business capability and its own database. Each service can be developed, deployed, and scaled independently; different teams can use different languages. The drawbacks include distributed-systems complexity (network calls instead of function calls), keeping data consistent across services, and the cost of operating, monitoring, deploying, and debugging dozens of services.",
      77: "28. Message Queues",
      78: "Synchronous communication (A calls B and waits) creates tight coupling: if B is slow, A is slow too. A message queue decouples services by storing messages until a consumer is ready to process them. After an order is placed, the Order Service does not need to wait for an email, an inventory update, or analytics—it puts a message on the queue and continues. Benefits include decoupling, buffering traffic spikes, durable messages, and scaling by adding consumers. Common options include Kafka, RabbitMQ, and SQS.",
      79: "29. Rate Limiting",
      80: "When an API is public (or internal), you need to protect it from overload. Rate limiting caps how many requests a client can send in a time window. Common algorithms include Token Bucket (tokens refill at a fixed rate, and each request consumes one), Sliding Window, and Fixed Window. A rate limiter is often placed at the API gateway and uses a fast store such as Redis to count requests per client. This helps defend against DDoS attacks, protect expensive operations, and enforce usage tiers.",
      81: "30. API Gateway",
      82: "An API gateway is a single entry point for all client requests. Instead of calling dozens of microservices directly, a client calls the gateway, which handles routing, authentication, rate limiting, and other cross-cutting concerns. Without a gateway, each service must handle authentication, rate limiting, and logging itself; the gateway centralizes them. It can also transform requests and responses, combine responses from multiple services, cache, and perform circuit breaking. Common options include Kong, AWS API Gateway, and Nginx.",
      83: "The API gateway is the system’s entry point, handling routing, authentication, and rate limiting. Services can enqueue asynchronous work for workers to process.",
      84: "Conclusion",
      85: "You do not need to memorize these 30 concepts. What matters is understanding the problem each building block solves and its trade-offs. Then you can combine them to design a wide range of systems and reason about ones you have never encountered.",
    },
    codeText: {
      72: [
        "POST /payments\nIdempotency-Key: abc-123\namount: $50\n→ 200 OK { payment_id: 789 }\n\n# client retries with the same key abc-123\n→ 200 OK { payment_id: 789 }   # no second charge",
      ],
    },
    diagramText: {
      6: {
        nodes: {
          client: { sub: "sends request" },
          server: { sub: "processes · responds" },
          "client-resp": { sub: "receives response" },
        },
      },
      9: {
        nodes: {
          device: { label: "Device", sub: "private IP 192.168.1.5" },
          router: { label: "NAT Router", sub: "public IP 203.0.113.7" },
          internet: { sub: "forwards by destination IP" },
          dest: { label: "Destination server", sub: "IP 93.184.216.34" },
        },
        edges: {
          "device-router": { label: "send" },
          "internet-dest": { label: "route" },
        },
      },
      12: {
        nodes: {
          "local-cache": { label: "Local cache" },
          resolver: { sub: "resolves" },
          root: { sub: "refers TLD" },
          tld: { sub: "refers authoritative" },
          auth: { sub: "returns IP" },
          server: { sub: "serves HTTP(S)" },
        },
        edges: {
          "client-local-cache": { label: "hostname" },
          "resolver-root": { label: "query" },
        },
      },
      15: {
        nodes: {
          "client-fwd": { sub: "anonymous" },
          "fwd-proxy": { sub: "hides clients · filters" },
          "dest-server": { sub: "sees the proxy IP" },
          "client-rev": { sub: "only sees the proxy" },
          "rev-proxy": { sub: "hides servers · TLS · cache" },
        },
        edges: {
          "fwd-proxy-dest": { label: "on behalf of the client" },
          "rev-proxy-backend": { label: "on behalf of the server" },
        },
      },
      44: {
        nodes: {
          app: { label: "App", sub: "reads data" },
          cache: { sub: "checks" },
          db: { sub: "on a miss" },
          "cache-fill": { sub: "writes back" },
          result: { label: "Result", sub: "back to the app" },
        },
        edges: {
          "app-cache": { label: "1. read" },
          "cache-result": { label: "2a. hit" },
          "cache-db": { label: "2b. miss" },
          "db-cachefill": { label: "3. write back" },
          "cachefill-result": { label: "4. return" },
        },
      },
      62: {
        nodes: {
          primary: { sub: "full dataset" },
          replica: { sub: "complete copy" },
        },
        edges: {
          "primary-replica": { label: "copies everything" },
        },
      },
      69: {
        nodes: {
          user1: { label: "User 1", sub: "first request" },
          edge: { sub: "near the user" },
          origin: { sub: "source of content" },
          "edge-cache": { sub: "cached content" },
          resp1: { label: "User 1", sub: "receives content" },
          user2: { label: "User 2", sub: "later request" },
          resp2: { label: "User 2", sub: "served from cache" },
        },
        edges: {
          "edge-origin": { label: "2. fetch from origin" },
          "origin-edgecache": { label: "3. cache content" },
          "edgecache-resp1": { label: "4. return" },
          "edge-resp2": { label: "6. serve from cache" },
        },
      },
      83: {
        nodes: {
          gateway: { sub: "auth · rate limit" },
          service: { sub: "business logic" },
          queue: { sub: "async work" },
        },
        edges: {
          "gateway-service": { label: "routing" },
          "service-db": { label: "read/write" },
        },
      },
    },
  },
  "sd-scalability": {
    title: "Scalability",
    module: "Core Concepts",
    summary:
      "Compare horizontal and vertical scaling, and learn what a system needs to scale horizontally.",
    duration: "7 min",
    blockText: {
      0: "Scalability is the ability to handle more load by adding resources, rather than rewriting the system.",
      1: "Two Ways to Scale",
      2: [
        "Vertical scaling: upgrade one machine's CPU or RAM—simple, but limited and creates a single point of failure (SPOF).",
        "Horizontal scaling: add more servers—more complex but nearly unlimited, and requires load balancing.",
      ],
      3: "Requirements for Horizontal Scaling",
      4: [
        "Services must be stateless: move state to an external store (Redis or a database).",
        "A load balancer is needed to distribute requests.",
        "Data may need sharding and/or replication.",
      ],
    },
  },
  "sd-availability": {
    title: "Availability",
    module: "Core Concepts",
    summary:
      "What availability means, how to measure it in “nines”, and the techniques that keep a system serving during failures.",
    duration: "6 min",
    blockText: {
      0: "Availability is a system's ability to keep serving users when they need it, even when part of the infrastructure fails.",
      1: "Measuring in “Nines”",
      2: [
        "99% (two nines): about 3.65 days of downtime per year.",
        "99.9% (three nines): about 8.7 hours per year.",
        "99.99% (four nines): about 52 minutes per year.",
        "99.999% (five nines): about 5 minutes per year—every component must be redundant.",
      ],
      3: "How to Achieve It",
      4: [
        "Redundancy: run multiple copies so one failure leaves another running.",
        "Automatic failover: health checks detect a failed node and move traffic to a healthy one.",
        "Remove single points of failure (SPOF) from the request path.",
        "Graceful degradation: disable secondary features to keep the core ones working.",
      ],
      5: "Trade-offs",
      6: "Redundancy improves availability but costs more and adds complexity. In distributed systems, high availability often means giving up some consistency (see CAP).",
    },
  },
  "sd-reliability": {
    title: "Reliability",
    module: "Core Concepts",
    summary:
      "What reliability means, how it differs from availability, and the techniques that keep data correct and intact.",
    duration: "6 min",
    blockText: {
      0: "Reliability is a system's ability to keep behaving correctly over time: without losing, duplicating, or corrupting data.",
      1: "Reliability vs. Availability",
      2: "A system can be highly available yet unreliable: it always responds, but sometimes responds incorrectly or loses data. Availability is about having a response; reliability is about the response being correct and the data staying intact.",
      3: "How to Achieve It",
      4: [
        "Replication and backups: keep multiple copies and backups to guard against data loss.",
        "Idempotency: make repeated operations produce the same result, so retries are safe.",
        "Retry with backoff and jitter to ride out transient failures.",
        "Chaos testing to expose false assumptions before a real incident.",
      ],
      5: "Foundations",
      6: "Reliability is built from replication, consistency, and correct error handling. That is why these concepts recur throughout the course.",
    },
  },
  "sd-single-point-of-failure": {
    title: "Single Point of Failure (SPOF)",
    module: "Core Concepts",
    summary:
      "What a single point of failure is, how to find one, and how to remove it with redundancy and failover.",
    duration: "6 min",
    blockText: {
      0: "A single point of failure (SPOF) is a component whose failure alone takes down the entire system.",
      1: "Typical Examples",
      2: [
        "A single load balancer in front of all servers.",
        "A primary database with no replica.",
        "A single DNS provider or a single cloud provider.",
        "A shared component such as a message broker or a centralized cache.",
      ],
      3: "Finding a SPOF",
      4: "Ask: “If this component failed right now, could the system still serve requests?” Follow the path of a request and look for anything that exists as only one copy.",
      5: "How to Remove It",
      6: [
        "Redundancy: run multiple instances behind a load balancer.",
        "Failover: automatically switch to a standby when the primary fails.",
        "Spread across zones (multi-AZ/multi-region) to survive a whole-area failure.",
        "If a shared component is unavoidable, design it to be distributed.",
      ],
      7: "A single load balancer is a single point of failure: if it fails, every request fails even though the servers are healthy.",
    },
    diagramText: {
      7: {
        nodes: { lb: { sub: "single instance" } },
      },
    },
  },
  "sd-consistent-hashing": {
    title: "Consistent Hashing",
    module: "Core Concepts",
    summary:
      "Distribute keys across nodes on a hash ring so that adding or removing a node moves only a few keys.",
    duration: "7 min",
    blockText: {
      0: "Consistent hashing distributes keys across nodes so that adding or removing a node moves only a small fraction of the keys.",
      1: "Why It Matters",
      2: "With plain hashing (hash mod N), changing the number of nodes N remaps almost every key, making caches miss en masse. Consistent hashing avoids that shock.",
      3: "How It Works",
      4: [
        "Map both keys and nodes onto a hash ring.",
        "Each key belongs to the nearest node clockwise.",
        "Adding or removing a node only affects the keys between that node and the one before it.",
        "Virtual nodes (vnodes) spread data more evenly when there are few nodes.",
      ],
      5: "Where It Is Used",
      6: "DynamoDB, Cassandra, and many distributed caches use consistent hashing to partition data and balance load.",
      7: "key → hash(key) → position on the ring → the next node clockwise",
      8: "A key's hash falls on the ring between two nodes; the key belongs to the next node clockwise.",
    },
    codeText: {
      7: [
        "key → hash(key) → position on the ring → the next node clockwise",
      ],
    },
    diagramText: {
      8: {
        edges: {
          "ring-a-b": { label: "clockwise" },
          "key-node-b": { label: "map to the next node" },
        },
      },
    },
  },
  "sd-latency-throughput": {
    title: "Latency vs Throughput vs Bandwidth",
    module: "Core Concepts",
    summary:
      "Tell latency, throughput, and bandwidth apart, understand p99, and learn how to improve each metric.",
    duration: "7 min",
    blockText: {
      0: "Latency is how long one request takes; throughput is how many requests are processed per second; bandwidth is how much data can travel per second. These are three independent metrics describing different aspects of performance.",
      1: "The Three Metrics",
      2: [
        "Latency: how long one request takes, usually measured with p50/p95/p99.",
        "Throughput: how many requests per second (RPS/QPS).",
        "Bandwidth: how many bits per second a link can carry (Mbps/Gbps).",
      ],
      3: "They are independent: a high-bandwidth link can still have high latency, and throughput can rise while latency stays the same.",
      4: "Percentiles",
      5: [
        "p50: the median—half of all requests are faster than this value.",
        "p99: the slowest 1% of requests—often where problems become visible.",
        "Improving p99 often benefits the user experience more than improving the average.",
      ],
      6: "How to Improve Each Metric",
      7: [
        "Use caching and a CDN to reduce latency.",
        "Use batching and pipelining to increase throughput.",
        "Compress data and use lightweight protocols to save bandwidth.",
        "Process work asynchronously through a message queue to smooth traffic spikes.",
      ],
    },
    codeText: {
      8: [
        "Little's Law: L (requests in the system) = λ (throughput) × W (latency)",
      ],
    },
  },
  "sd-load-balancing": {
    title: "Load Balancing",
    module: "Building Blocks",
    summary:
      "Distribute requests across multiple servers with load-balancing algorithms, health checks, and L4 vs. L7 routing.",
    duration: "8 min",
    blockText: {
      0: "A load balancer distributes requests across multiple servers to use resources efficiently, increase throughput, and tolerate node failures.",
      1: "Common Algorithms",
      2: [
        "Round Robin: rotate through servers in turn.",
        "Least Connections: choose the server with the fewest active connections.",
        "IP Hash: send the same client to the same server to preserve session affinity.",
        "Weighted: send more requests to more powerful servers.",
      ],
      3: "Health Checks",
      4: "The load balancer periodically calls the /health endpoint; failed servers are removed from the pool. Use both active checks (proactive probes) and passive checks (based on real failures).",
      5: "Layer 4 vs. Layer 7",
      6: [
        "L4: route by IP/TCP—fast, but it cannot inspect HTTP content.",
        "L7: route by URL, header, or cookie—more flexible, but uses more resources.",
      ],
    },
    codeText: {
      7: [
        "Client → [Load Balancer] → pool [ s1 (healthy) | s2 (healthy) | s3 (down, removed from the pool) ]",
      ],
    },
  },
  "sd-caching": {
    title: "Caching",
    module: "Building Blocks",
    summary:
      "Learn caching strategies, data consistency, cache stampedes, and eviction algorithms.",
    duration: "9 min",
    blockText: {
      0: "A cache keeps frequently accessed data in fast storage (RAM), avoiding recomputation or database queries and reducing both latency and load on downstream layers.",
      1: "Caching Strategies",
      2: [
        "Cache-aside (lazy): check the cache first; on a miss, read from the database and then write the result to the cache.",
        "Write-through: write to both the cache and the database at the same time—more consistent, but slower.",
        "Write-behind: write to the cache first and the database later—faster, but with a risk of data loss.",
      ],
      3: "Consistency and Invalidation",
      4: [
        "TTL: when an entry expires, reload it automatically from the source.",
        "Invalidation: remove or overwrite a cache entry when the source data changes.",
        "Cache stampede: many requests miss at once—use a lock or early refresh to prevent it.",
      ],
      5: "Eviction Algorithms",
      6: [
        "LRU (Least Recently Used), LFU (Least Frequently Used), and FIFO.",
      ],
      8: "On a cache hit, return the data immediately. On a miss, query the database, write the result to the cache, then return it to the client.",
    },
    codeText: {
      7: [
        "App → Cache? hit → return data\n                miss → DB → write to cache → return data",
      ],
    },
    diagramText: {
      8: {
        nodes: {
          client: { sub: "send request" },
          cache: { sub: "check" },
          database: { sub: "on cache miss" },
          "cache-fill": { sub: "store result" },
          "client-response": { sub: "receive data" },
        },
        edges: {
          "client-cache": { label: "request" },
          "cache-client-response": { label: "hit: return data" },
          "cache-database": { label: "miss: query" },
          "database-cache-fill": { label: "result" },
          "cache-fill-client-response": { label: "return data" },
        },
      },
    },
  },
  "sd-cdn": {
    title: "CDN",
    module: "Building Blocks",
    summary:
      "A content delivery network caches content at the edge, reducing latency and protecting the origin.",
    duration: "5 min",
    blockText: {
      0: "A CDN (Content Delivery Network) is a network of servers close to users that serves static content and can also cache dynamic content.",
      1: "Benefits",
      2: [
        "Reduce latency by serving content from the point closest to the user.",
        "Reduce load on the origin server.",
        "Absorb traffic spikes and provide basic DDoS protection.",
      ],
      3: "Edge Caching",
      4: [
        "Control caching with TTLs and purge content when it changes.",
        "Version content with a query string (for example, ?v=2) to avoid serving an old copy.",
      ],
      6: "The CDN serves a cache hit from the nearest edge. On a miss, it fetches the content from the origin, caches it at the edge, and returns it to the user.",
    },
    codeText: {
      5: [
        "User → Edge (nearest) → [hit] return content\n                          [miss] → Origin → cache content at the edge",
      ],
    },
    diagramText: {
      6: {
        nodes: {
          user: { sub: "send request" },
          edge: { sub: "nearest · check cache" },
          origin: { sub: "content source" },
          "edge-cache": { sub: "cache content" },
          "user-response": { sub: "receive content" },
        },
        edges: {
          "user-edge": { label: "request" },
          "edge-user-response": { label: "hit: return content" },
          "edge-origin": { label: "miss: fetch from origin" },
          "origin-edge-cache": { label: "content" },
          "edge-cache-user-response": { label: "cache, then return" },
        },
      },
    },
  },
  "sd-sharding": {
    title: "Database Sharding",
    module: "Data",
    summary:
      "Split data across shards: choose a shard key, understand the challenges, and use consistent hashing.",
    duration: "9 min",
    blockText: {
      0: "Sharding splits data into shards stored on different machines, scaling both storage capacity and write capacity.",
      1: "Choosing a Shard Key",
      2: [
        "Range: partition by ranges—easy to query across a range, but prone to uneven load.",
        "Hash: distributes data evenly—good for writes, but makes range queries difficult.",
        "Directory/lookup: use a lookup table—flexible, but adds a dependency.",
      ],
      3: "Challenges",
      4: [
        "Cross-shard queries and transactions become more complex.",
        "A skewed key distribution can create a hot shard.",
        "Resharding is needed when data must be rebalanced.",
      ],
      5: "Consistent Hashing",
      6: "Consistent hashing reduces the number of keys that need to move when nodes are added or removed by mapping both keys and nodes onto a ring.",
      8: "A key's hash falls on the ring between nodes; map the key to the next node clockwise.",
    },
    codeText: {
      7: ["key → hash → ring → next node clockwise"],
    },
    diagramText: {
      8: {
        nodes: {
          "node-a": { label: "Node A", sub: "position on the ring" },
          "node-b": { label: "Node B", sub: "position on the ring" },
          "node-c": { label: "Node C", sub: "position on the ring" },
          "node-d": { label: "Node D", sub: "position on the ring" },
          key: { label: "Key K", sub: "hash position on the ring" },
        },
        edges: {
          "ring-a-b": { label: "clockwise" },
          "key-node-b": { label: "map to the next node" },
        },
      },
    },
  },
  "sd-replication": {
    title: "Replication",
    module: "Data",
    summary:
      "Copy data to multiple nodes with leader–follower, synchronous or asynchronous replication, and failover.",
    duration: "7 min",
    blockText: {
      0: "Replication copies data to multiple nodes to increase read capacity, improve fault tolerance, and reduce the geographic distance to users.",
      1: "Replication Models",
      2: [
        "Leader–follower: one node accepts writes while multiple nodes serve reads.",
        "Multi-leader: multiple nodes accept writes, so conflicts must be resolved.",
        "Leaderless: use read and write quorums (as in Dynamo and Cassandra).",
      ],
      3: "Synchronous vs. Asynchronous",
      4: [
        "Synchronous: safer, but slower.",
        "Asynchronous: faster, but reads may return stale data (replication lag).",
      ],
      5: "Failover",
      6: "If the leader fails, elect a new one. Avoid split-brain by using a lease or a majority quorum.",
      7: "The leader accepts writes and replicates the data to its followers.",
    },
    diagramText: {
      7: {
        nodes: {
          leader: { sub: "accepts writes" },
          "follower-1": { sub: "replica" },
          "follower-2": { sub: "replica" },
        },
        edges: {
          "leader-follower-1": { label: "replicate data" },
          "leader-follower-2": { label: "replicate data" },
        },
      },
    },
  },
  "sd-cap": {
    title: "CAP Theorem",
    module: "Core Concepts",
    summary:
      "Understand the CAP theorem and PACELC: trade-offs among consistency, availability, and latency.",
    duration: "8 min",
    blockText: {
      0: "The CAP theorem says that during a network partition, a distributed system can guarantee only two of three properties: Consistency, Availability, and Partition Tolerance.",
      1: "In Practice",
      2: [
        "Partition tolerance (P) is nearly mandatory in real-world distributed systems.",
        "So the practical choice is between C and A: CP systems prioritize consistency, while AP systems prioritize availability.",
      ],
      3: "PACELC",
      4: "PACELC extends CAP: even when there is no partition (Else), a system must still choose between Latency (L) and Consistency (C).",
      5: [
        "CP: reject requests to preserve consistency (for example, HBase).",
        "AP: always respond, but the data may be stale (for example, Cassandra or DynamoDB).",
      ],
      6: "During a network partition (P), a system cannot guarantee both Consistency (C) and Availability (A).",
    },
    diagramText: {
      6: {
        nodes: {
          consistency: { sub: "Consistency" },
          availability: { sub: "Availability" },
          partition: { sub: "Partition tolerance" },
        },
        edges: {
          "consistency-availability": { label: "during P: cannot guarantee both" },
          "consistency-partition": { label: "CP: favor Consistency" },
          "partition-availability": { label: "AP: favor Availability" },
        },
      },
    },
  },
  "sd-message-queues": {
    title: "Message Queues",
    module: "Reliability",
    summary:
      "Decouple producers and consumers, ensure delivery, and handle failures with a dead-letter queue.",
    duration: "7 min",
    blockText: {
      0: "A message queue decouples producers and consumers, buffers traffic spikes, and enables asynchronous processing.",
      1: "Delivery Guarantees",
      2: [
        "At-most-once: messages may be lost, but are never delivered more than once.",
        "At-least-once: messages are not lost, but may be delivered more than once—consumers need idempotent handling.",
        "Exactly-once: difficult to guarantee absolutely; it is often simulated with an idempotency key.",
      ],
      3: "Components",
      4: [
        "Producer, broker (Kafka/RabbitMQ/SQS), and consumer group.",
        "Dead-letter queue (DLQ): receives messages that repeatedly fail processing.",
      ],
    },
    codeText: {
      5: [
        "Producer → [ Queue ] → Consumer(s)\n                       repeated failures → DLQ",
      ],
    },
  },
  "sd-rate-limiting": {
    title: "Rate Limiting",
    module: "Reliability",
    summary:
      "Limit requests to protect a system with fixed and sliding windows or a token bucket.",
    duration: "6 min",
    blockText: {
      0: "Rate limiting caps the number of requests within a time window to protect a system from abuse and overload.",
      1: "Algorithms",
      2: [
        "Fixed window: count requests in fixed intervals—simple, but can cause a boundary effect.",
        "Sliding window: smooths the boundary effect and is more accurate.",
        "Token bucket: refill tokens steadily to allow controlled bursts.",
        "Leaky bucket: release requests at a fixed rate to smooth traffic.",
      ],
      3: "Where to Apply It",
      4: "Rate limiting is usually placed at the API gateway or edge. When a client exceeds the limit, return 429 with a Retry-After header.",
    },
  },
  "sorting-quiz": {
    title: "Quiz: Sorting Algorithms",
    module: "Sorting Algorithms",
    summary:
      "Check your understanding of complexity, stability, and the core sorting algorithms.",
    blockText: {
      0: "Answer these six questions to review the differences between Bubble Sort, Selection Sort, and Insertion Sort.",
    },
    quiz: {
      title: "Sorting Algorithms Quiz",
      description: "Six questions on complexity, stability, and the number of swaps.",
      questions: [
        {
          tag: "Bubble Sort",
          prompt: "When does Bubble Sort run in O(n) time?",
          options: [
            "When the array is already sorted",
            "When the array is sorted in descending order",
            "When the array contains duplicate values",
            "Bubble Sort always takes O(n²)",
          ],
          explanation:
            "The swapped flag lets the algorithm stop after a pass with no swaps. That pass takes O(n), and it confirms the array is sorted.",
        },
        {
          tag: "Selection Sort",
          prompt: "What is the maximum number of swaps Selection Sort performs?",
          options: ["O(1)", "O(log n)", "n - 1", "O(n²)"],
          explanation:
            "There are n - 1 passes, and each pass performs at most one swap, so the maximum is n - 1.",
        },
        {
          tag: "Insertion Sort",
          prompt:
            "Which algorithm can run in O(n) on a nearly sorted array and is stable?",
          options: ["Selection Sort", "Insertion Sort", "Heap Sort", "Quick Sort"],
          explanation:
            "Insertion Sort places each value into the sorted prefix. On a nearly sorted array, each value moves very little.",
        },
        {
          tag: "Stability",
          prompt: "What does it mean for a sorting algorithm to be stable?",
          options: [
            "It uses no extra memory",
            "Equal values keep their original relative order",
            "It always runs in O(n log n)",
            "It never swaps values",
          ],
          explanation:
            "A stable sort preserves the original relative order of values with equal keys.",
        },
        {
          tag: "Performance",
          prompt: "Which O(n²) algorithm uses the fewest swaps?",
          options: [
            "Bubble Sort",
            "Insertion Sort",
            "Selection Sort",
            "All three use the same number",
          ],
          explanation:
            "Selection Sort performs at most n - 1 swaps, which is fewer than Bubble Sort or Insertion Sort may perform.",
        },
        {
          tag: "Complexity",
          prompt: "What is the average time complexity of all three algorithms?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
          explanation:
            "Bubble Sort, Selection Sort, and Insertion Sort all have O(n²) average time complexity because they use nested loops.",
        },
      ],
    },
  },
  "array-basics": {
    title: "Arrays and Dynamic Arrays",
    module: "Arrays & Strings",
    summary:
      "Arrays store elements in contiguous memory: indexed access takes O(1), insertion or deletion in the middle takes O(n), and appending to a dynamic array is O(1) amortized.",
    duration: "14 min",
    blockText: {
      0: "Arrays are the foundation of many algorithms you will study: loops, sorting, two pointers, sliding windows, prefix sums, and dynamic programming tables are all commonly built on arrays. Understand how arrays store data contiguously and what each operation costs so you can grasp the ideas behind these patterns instead of just memorizing formulas.",
      1: "What Is an Array?",
      2: "An array stores a sequence of elements in a contiguous region of memory. If you need to store 100 numbers, creating variables num1, num2, …, num100 would be difficult to manage. An array groups them under one name, and each element is accessed by an index: a[0], a[1], a[2].",
      3: "The five cells are stored next to one another. Indexing starts at 0, so the last index in an array of n elements is n − 1, not n.",
      4: "Most programming languages use zero-based indexing. For an array of length n, valid indices range from 0 to n − 1. Accessing a[n] is out of bounds: C/C++ has undefined behavior, Java throws an exception, JavaScript returns undefined, and Python raises IndexError.",
      5: "Why Is Array Access O(1)?",
      6: "A CPU does not work with the concept of an “array”; it works with addresses and calculations. The address of a[i] is computed as base + i × the size of one element—one multiplication and one addition before the data is read. The number of calculations does not depend on i or n, which is a major advantage over a linked list.",
      8: "This formula applies when the elements have the same size. For that reason, a raw array cannot store elements of different sizes. Java and JavaScript object arrays actually store references (pointers) of the same size, while the objects themselves live elsewhere on the heap.",
      9: "Fixed-Size and Dynamic Arrays",
      10: "Raw arrays in C and arrays in Java have a fixed size once allocated. When they run out of space, they cannot grow in place: a larger array must be allocated and all elements copied, which takes O(n). JavaScript Array, Python list, Java ArrayList, and C++ vector are dynamic arrays that grow as needed when elements are added.",
      11: "A dynamic array tracks two values: size, the number of elements currently in use, and capacity, the number of allocated slots. For example, an array with 5 elements might have a buffer of 8 slots, so a few more appends can happen without another allocation.",
      12: "size is 5 and capacity is 8. The three empty cells are reserved space, not elements in the array.",
      13: "When size reaches capacity, the buffer is usually doubled and all elements are copied to a new region of memory. Each copy takes O(n), but these expansions happen less and less often.",
      15: "Why double capacity instead of increasing it by a fixed amount each time? With doubling, the total number of elements copied across all expansions is at most 2n. Spread that cost across n appends, and the amortized cost is O(1). If each expansion adds only k slots, the total copying grows as n², making the average cost per append O(n).",
      16: "Common Operations",
      17: "Indexed access — O(1)",
      18: "Reading or writing a[i] requires calculating an address. An array with 10 elements and one with 10 million elements have the same access cost.",
      19: "Traversal — O(n)",
      20: "Traversal processes each slot in turn—for example, to print values, calculate a sum, or find the maximum. Each element is visited once, so the time complexity is O(n).",
      22: "Insertion — depends on the position",
      23: "When there is spare capacity, inserting at the end means writing to the next slot and increasing size, which takes O(1). Because the array occasionally has to grow, append is O(1) amortized. Inserting at the beginning or in the middle requires shifting the following elements to the right. In an array of 1,000 elements, inserting at the beginning shifts 1,000 elements, so it takes O(n). list.insert and ArrayList.add(index, x) have the same cost: the library performs the loop for you, but the complexity remains.",
      25: "Deletion — also depends on the position",
      26: "Deleting the last element only decreases size; no shifting is needed, so it takes O(1). Deleting at the beginning or in the middle requires shifting the following elements left to fill the gap. Deleting the first element of a 1,000-element array shifts 999 elements, so it takes O(n).",
      27: "Searching",
      28: [
        "Unsorted array: scan the elements one by one in O(n). In the worst case, there is no faster approach without an auxiliary data structure.",
        "Sorted array: binary search halves the search range at each step, taking O(log n). See the Binary Search lesson for details.",
      ],
      29: "Four Common Interview Patterns",
      30: "Array problems rarely ask only for a simple traversal; many rely on a few familiar patterns. Each pattern has its own lesson later in the course. For now, focus on recognizing when to use each one.",
      31: [
        "Two pointers: two indices move through an array, often a sorted one. For Two Sum, this reduces the time from O(n²) when checking every pair to O(n), using O(1) extra space.",
        "Sliding window: a window represents a subarray and moves to the right. Update the result in O(1) per step instead of recalculating it; for all subarrays of length k, this reduces the total time from O(n·k) to O(n).",
        "Prefix sum: O(n) preprocessing lets you find the sum of a range [L, R] with one O(1) subtraction. The next lesson explores this pattern in more detail.",
        "DP table: each cell stores the solution to a subproblem. Climbing Stairs, House Robber, and Knapsack all fill an array in an order that respects dependencies between subproblems.",
      ],
      33: [
        "Indexed access or update: O(1).",
        "Traversal: O(n).",
        "Search: O(n) if the array is unsorted; O(log n) if it is sorted and you use binary search.",
        "Insertion or deletion at the end: O(1). Append is O(1) amortized when the array occasionally needs to grow.",
        "Insertion or deletion at the beginning or in the middle: O(n), because elements must be shifted.",
        "Space: O(n), including unused capacity.",
      ],
      32: "Complexity",
    },
    codeText: {
      7: [
        "address of a[i] = base + i × sizeof(element)\n\nbase = 1000, 4 bytes per int\n  a[0] → 1000\n  a[3] → 1000 + 3 × 4 = 1012",
      ],
      24: [
        "function insertAt(a, index, value) {\n  a.push(0); // append a placeholder at the end to make room\n  for (let i = a.length - 1; i > index; i--) {\n    a[i] = a[i - 1];\n  }\n  a[index] = value;\n}",
        "def insert_at(a, index, value):\n    a.append(0)  # append a placeholder at the end to make room\n    i = len(a) - 1\n    while i > index:\n        a[i] = a[i - 1]\n        i -= 1\n    a[index] = value",
      ],
    },
    diagramText: {
      12: {
        nodes: {
          s0: { sub: "used" },
          s1: { sub: "used" },
          s2: { sub: "used" },
          s3: { sub: "used" },
          s4: { sub: "used" },
          s5: { sub: "empty" },
          s6: { sub: "empty" },
          s7: { sub: "empty" },
        },
      },
    },
  },
  "string-basics": {
    title: "Strings and Characters",
    module: "Arrays & Strings",
    summary:
      "Strings are immutable sequences of characters. Learn about Unicode, reversal, palindromes, and the cost of concatenation.",
    duration: "7 min",
    blockText: {
      0: "At its core, a string is a sequence of characters. In JavaScript and Python, strings are immutable: operations that appear to modify a string actually create a new one.",
      1: "Unicode and Code Points",
      2: "Unicode assigns a numeric value to each code point; ASCII is a small character set within Unicode. In JavaScript, charCodeAt reads a UTF-16 code unit, while codePointAt reads a code point. Python's ord() returns a code point. For a limited alphabet, such as English letters, a 26- or 128-element counting array can replace a hash map—often making the solution faster and more memory-efficient.",
      3: "Reversal and Palindromes",
      5: "Starting two pointers at opposite ends and moving them toward the middle lets you check whether a string is a palindrome using O(1) extra space, rather than creating a reversed copy that takes O(n) space.",
      6: "The Cost of String Concatenation",
      7: [
        "Using + to concatenate inside a loop creates a new string at each step; the total cost can be O(n²).",
        "A better approach is to collect the parts in an array and join them once—using array.join('') in JavaScript or ''.join(parts) in Python—to achieve O(n).",
      ],
    },
    codeText: {
      4: [
        "function isPalindrome(s) {\n  // Two pointers: l starts at the beginning, r at the end\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    // Compare characters mirrored across the center\n    if (s[l] !== s[r]) return false;\n    l++;\n    r--;\n  }\n  // They met in the middle without a mismatch, so it is a palindrome\n  return true;\n}",
        "def is_palindrome(s):\n    # Two pointers: l starts at the beginning, r at the end\n    l, r = 0, len(s) - 1\n    while l < r:\n        # Compare characters mirrored across the center\n        if s[l] != s[r]:\n            return False\n        l += 1\n        r -= 1\n    # They met in the middle without a mismatch, so it is a palindrome\n    return True",
      ],
    },
  },
  "prefix-sum": {
    title: "Prefix Sum",
    module: "Arrays & Strings",
    summary:
      "Preprocess an array to answer subarray-sum queries in O(1), trading O(n) extra space for faster queries.",
    duration: "6 min",
    blockText: {
      0: "A prefix sum is a preprocessing technique: calculate the sums of all prefixes in advance, then answer a query for the sum from l to r in O(1) instead of adding each element in the range again.",
      1: "Building a Prefix-Sum Array",
      2: "Define prefix[i] as the sum of the first i elements, so prefix[0] = 0. Then the sum of the inclusive range [l, r]—including both endpoints—is prefix[r + 1] - prefix[l].",
      4: "Complexity",
      5: [
        "Preprocessing: O(n) time and O(n) space.",
        "Each range-sum query: O(1).",
        "Extensions: 2D prefix sums for matrices, and difference arrays for repeated range updates.",
      ],
    },
  },
  "arrays-strings-quiz": {
    title: "Quiz: Arrays & Strings",
    module: "Arrays & Strings",
    summary:
      "Test your understanding of array complexity, string immutability, and prefix sums.",
    duration: "6 min",
    blockText: {
      0: "Answer these 10 questions to review indexing, size and capacity, operation costs, strings, and prefix sums.",
    },
    quiz: {
      title: "Quiz: Arrays & Strings",
      description:
        "10 questions on arrays, strings, and prefix sums. Each answer is followed by an explanation.",
      questions: [
        {
          tag: "Array",
          prompt: "What is the time complexity of accessing an element by index, a[i]?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "The address is calculated directly from the index, so access time does not depend on n.",
        },
        {
          tag: "Array",
          prompt: "What is the time complexity of inserting an element at the BEGINNING of an array with n elements?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "All n elements must shift one position to the right to make room, so the operation takes O(n).",
        },
        {
          tag: "Array",
          prompt: "An array has 5 elements. What is its valid index range?",
          options: ["1 to 5", "0 to 4", "0 to 5", "1 to 4"],
          explanation:
            "Indexing starts at 0, and the last index is n − 1. A 5-element array uses indices 0, 1, 2, 3, and 4.",
        },
        {
          tag: "Dynamic array",
          prompt: "In a dynamic array, what is the difference between size and capacity?",
          options: [
            "size is the number of allocated slots; capacity is the number of elements in use",
            "size is the number of elements in use; capacity is the number of allocated slots",
            "They mean the same thing; only the language-specific name differs",
            "capacity is always exactly twice size",
          ],
          explanation:
            "size counts the elements currently in use. capacity is the allocated buffer size, including any unused slots.",
        },
        {
          tag: "Array",
          prompt:
            "In the worst case, how long does it take to find a value in an unsorted array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Without an ordering, you must scan the elements one by one. Binary search takes O(log n) only when the array is sorted.",
        },
        {
          tag: "Dynamic array",
          prompt:
            "If a dynamic array adds only 10 slots each time it runs out of space, instead of doubling, what is the amortized cost of append?",
          options: [
            "Still O(1) amortized",
            "O(log n)",
            "O(n)",
            "Strictly O(1); no copying is needed",
          ],
          explanation:
            "Adding a fixed number of slots makes the total copying grow quadratically. Across n appends, that is O(n) amortized per append. Doubling is what keeps append O(1) amortized.",
        },
        {
          tag: "Dynamic array",
          prompt: "Why is appending to a dynamic array usually considered O(1) amortized?",
          options: [
            "The array automatically skips duplicate elements",
            "Each time it grows, capacity doubles, spreading the copying cost across many appends",
            "Append always writes at the end and never copies elements",
            "Dynamic arrays use a hash table internally",
          ],
          explanation:
            "Growing the array costs O(n), but it happens increasingly infrequently. Averaged across appends, the cost per operation is constant.",
        },
        {
          tag: "String",
          prompt:
            "Strings in JavaScript and Python are immutable. Which statement follows from this?",
          options: [
            "A character can be changed in place in O(1) time",
            "Each apparent modification creates a new string; repeated concatenation can cost O(n²)",
            "Reversing a string always takes O(1) space",
            "Accessing a character with s[i] takes O(n)",
          ],
          explanation:
            "Because strings are immutable, an apparent modification creates a new string. Repeated concatenation can therefore have quadratic total cost unless the parts are collected and joined.",
        },
        {
          tag: "String",
          prompt: "How can you check whether a string is a palindrome using O(1) space?",
          options: [
            "Create a reversed copy and compare it",
            "Move two pointers from opposite ends toward the middle",
            "Put the string into a hash set",
            "Split the string in half and compare the two halves",
          ],
          explanation:
            "Two pointers compare mirrored character pairs using only a few variables, so the extra space is constant.",
        },
        {
          tag: "Prefix Sum",
          prompt:
            "After O(n) prefix-sum preprocessing, how long does a query for the sum of [l, r] take?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "The range sum is the difference between two prefix sums, which requires one subtraction and takes O(1).",
        },
      ],
    },
  },
  "hash-table-basics": {
    title: "How Hash Tables Work",
    module: "Hash Tables",
    summary:
      "A hash function maps each key to a bucket. With well-distributed hashes and a suitable load factor, lookups and deletions take expected O(1) time; the worst case is O(n).",
    duration: "8 min",
    blockText: {
      0: "A hash table stores key–value pairs. When hashes are well distributed and the load factor is suitable, lookups and deletions take expected O(1) time. Insertions take O(1) amortized when occasional resizes are included. The trade-offs are extra memory use and, in general, no guaranteed iteration order.",
      1: "Hash Functions and Buckets",
      2: "A hash function takes a key and determines which bucket will hold its key–value pair. For integer keys, a simple example is h(k) = k mod m, where m is the number of buckets. A good hash function is fast and distributes keys fairly evenly to reduce collisions.",
      3: "With five buckets, h(12) = 12 mod 5 = 2 and h(22) = 22 mod 5 = 2. Two different keys map to bucket 2, which is a collision. Separate chaining stores both entries in the same list.",
      4: "To look up key = 22, compute h(22) to reach bucket 2, then compare keys in that bucket's list until 22 is found. A bucket narrows down where to search, but it does not replace key comparisons: different keys can map to the same bucket.",
      5: "In many implementations, a key is first converted to an integer hash code, then mapped to a bucket index from 0 to m − 1. A collision means that two different keys have the same bucket index; their hash codes may still differ before this mapping.",
      6: "Handling Collisions",
      7: [
        "Separate chaining: each bucket holds a linked list of key–value pairs.",
        "Open addressing: if a bucket is occupied, probe other buckets using linear probing, quadratic probing, or double hashing.",
        "When deleting from an open-addressed table, leave a tombstone so a later search does not stop prematurely in the probe sequence.",
      ],
      8: "With separate chaining, lookup scans the list in the computed bucket. With open addressing, it follows the same probe sequence used during insertion; a tombstone is not treated as a slot that has never been used.",
      9: "Load Factor and Resizing",
      10: "The load factor α = n / m, where n is the number of key–value pairs and m is the number of buckets (or slots). With separate chaining, α is the average number of entries per bucket and can exceed 1. With open addressing, α is the fraction of occupied slots, so it must stay below 1. A high load factor often slows lookups, but the resize threshold depends on the implementation—0.75 is not a universal rule.",
      11: "For example, Java HashMap uses a default load factor of 0.75. Once the number of entries exceeds its threshold, it increases the number of buckets to roughly twice as many and rehashes the entries. One resize costs O(n), but when capacity grows geometrically, that cost is spread across insertions, making insertion O(1) amortized (averaged over many insertions).",
      12: "Complexity",
      13: [
        "Lookup and deletion: expected O(1) time when hashes are well distributed and the load factor is suitable. Insertion: expected O(1) if resizing is excluded, and O(1) amortized when capacity grows geometrically; a single resize costs O(n).",
        "For basic implementations, the worst case is O(n)—for example, when all keys end up in the same bucket or probe sequence.",
        "Space: O(n + m), where m is the number of buckets or slots. This is often written as O(n) when table capacity stays proportional to the number of entries.",
        "Hash tables generally do not guarantee iteration order. JavaScript's Map is an exception: it preserves insertion order.",
      ],
    },
    diagramText: {
      3: {
        nodes: {
          key12: { label: "key = 12" },
          key22: { label: "key = 22" },
          hash: { label: "h(k) = k mod 5", sub: "example hash function" },
          bucket0: { label: "bucket 0" },
          bucket1: { label: "bucket 1" },
          bucket2: { label: "bucket 2", sub: "index 2" },
          bucket3: { label: "bucket 3" },
          bucket4: { label: "bucket 4" },
          entry12: { label: "12 → A", sub: "key–value pair" },
          entry22: { label: "22 → B", sub: "key–value pair" },
        },
        edges: {
          "hash-bucket2": { label: "2" },
          "entry12-entry22": { label: "next" },
        },
      },
    },
  },
  "hash-map-patterns": {
    title: "Common Hash Map Patterns",
    module: "Hash Tables",
    summary:
      "Four common patterns: counting frequencies, Two Sum on an unsorted array, removing duplicates, and grouping items by a key.",
    duration: "9 min",
    blockText: {
      0: "A hash map trades extra memory for speed: instead of scanning an array again, we store information we have already seen so it can be looked up quickly. Here are four patterns that often appear in coding interviews.",
      1: "1. Count Frequencies",
      3: "2. Two Sum on an Unsorted Array",
      4: "For each value, check whether its complement (target - x) has appeared already. Store values as you go so each lookup takes expected O(1) time when hashes are well distributed and the load factor is controlled.",
      6: "3. Remove Duplicates",
      8: "4. Group by Key",
      9: "Group anagrams by sorting the characters in each word and using the sorted string as a shared key.",
      11: "Complexity",
      12: [
        "Frequency counting, Two Sum, and deduplication: expected O(n) time when hashes are well distributed and the load factor is controlled; O(n) space, where n is the number of input items.",
        "Grouping anagrams: for m strings with maximum length k, sorting each string takes O(m·k log k) time. Storing the keys and groups takes O(m·k) space. Hash map operations are expected O(1) when hashes are well distributed and the load factor is controlled.",
        "The trade-off is extra memory, which can avoid repeatedly scanning the data—for example, with nested loops that take O(n²) time.",
      ],
    },
  },
  "hash-tables-quiz": {
    title: "Quiz: Hash Tables",
    module: "Hash Tables",
    summary:
      "Review hash functions, collisions, load factor, and common uses of hash maps.",
    duration: "6 min",
    blockText: {
      0: "Use these six questions to review how hash tables work and when to use them.",
    },
    quiz: {
      title: "Quiz: Hash Tables",
      description:
        "Six questions on hash tables and common hash map patterns.",
      questions: [
        {
          tag: "Basics",
          prompt: "What is the AVERAGE lookup time in a hash table?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "With well-distributed hashes and a controlled load factor, each bucket holds few entries on average, so lookup takes expected O(1) time.",
        },
        {
          tag: "Basics",
          prompt: "What can make a hash table lookup take O(n) time in the worst case?",
          options: [
            "The array is too small",
            "All keys collide and land in the same bucket",
            "The values are floating-point numbers",
            "The number of buckets is prime",
          ],
          explanation:
            "If every key lands in the same bucket, a lookup may have to scan the entire list, taking O(n) time.",
        },
        {
          tag: "Collisions",
          prompt:
            "Which technique stores multiple key–value pairs in a bucket using a linked list?",
          options: [
            "Separate chaining",
            "Binary search",
            "Merge sort",
            "Tombstone",
          ],
          explanation:
            "Separate chaining keeps a list of entries in each bucket. A tombstone marks a deleted entry in open addressing.",
        },
        {
          tag: "Load Factor",
          prompt: "How is a hash table's load factor calculated?",
          options: [
            "Number of buckets divided by number of entries",
            "Number of entries divided by number of buckets",
            "Key size divided by value size",
            "Number of collisions divided by number of hash operations",
          ],
          explanation:
            "The load factor α = n / m, where n is the number of stored entries and m is the number of buckets.",
        },
        {
          tag: "Load Factor",
          prompt:
            "What does a hash table typically do when its load factor exceeds a threshold (for example, 0.75)?",
          options: [
            "Delete some older entries",
            "Switch to a different hash function but keep the same number of buckets",
            "Add more buckets (often doubling their number) and rehash every key",
            "Move everything into a linear array",
          ],
          explanation:
            "The table adds buckets and rehashes its keys to keep searches short. A resize costs O(n), but with geometric growth, insertion is O(1) amortized.",
        },
        {
          tag: "Applications",
          prompt:
            "What is the time and space complexity of using a hash map for Two Sum on an UNSORTED array?",
          options: [
            "O(1) time, O(1) space",
            "O(n) time, O(n) space",
            "O(n log n) time, O(1) space",
            "O(n²) time, O(1) space",
          ],
          explanation:
            "One pass stores values already seen in a map, giving expected O(n) time when hashes are well distributed and the load factor is controlled, with O(n) extra space.",
        },
      ],
    },
  },
  "linked-list-basics": {
    title: "Linked Lists and Pointers",
    module: "Linked Lists",
    summary:
      "Nodes linked by pointers: insertion is O(1) when the insertion reference is known; deletion in a singly linked list is O(1) when its predecessor is known. Finding a position can still take O(n).",
    duration: "8 min",
    blockText: {
      0: "A linked list connects nodes with pointers. Insertion and deletion can be fast when you already have a reference to the right position, but accessing a node requires traversing the list from the head.",
      1: "Nodes and Pointers",
      2: "The head points to the first node, and the last node points to null. To reach the kth node, start at the head and follow each next pointer until you get there.",
      3: "Comparison with Arrays",
      4: [
        "Indexed access: an array provides O(1) access by index; a linked list takes O(n) because you must traverse it.",
        "Insertion and deletion: insertion is O(1) when you have the needed reference; in a singly linked list, deletion is O(1) when you have the predecessor. Finding the position can still take O(n). An array may need to shift elements, which takes O(n).",
        "Memory and performance: linked lists use extra memory for pointers, and their nodes may be scattered in memory, resulting in worse cache locality.",
      ],
      5: "Pseudocode",
      7: "Complexity",
      8: [
        "Access and search: O(n), because you may need to traverse the list.",
        "Insertion: O(1) when the needed reference is known. Deletion in a singly linked list: O(1) when the predecessor is known. Finding the position can take O(n).",
        "Space: O(n) for the nodes, plus the memory used by their pointers.",
      ],
    },
    codeText: {
      6: [
        "node = {\n  value: number,\n  next: next node or null\n}\n\nhead -> node -> node -> null",
      ],
    },
  },
  "linked-list-operations": {
    title: "Insert, Delete, and Reverse",
    module: "Linked Lists",
    summary:
      "The core linked-list operations and the three-pointer technique for reversing in place.",
    duration: "9 min",
    blockText: {
      0: "In a linked list, insertion takes O(1) when you already have the needed insertion reference. In a singly linked list, deletion takes O(1) when you know the predecessor. Finding the position can still take O(n).",
      1: "Insert at Head",
      3: "Delete a Node by Value",
      5: "Reverse the List",
      6: "Use three pointers: prev tracks the previous node, cur the current node, and next saves the following node before you reverse the link. This takes O(n) time and O(1) extra space.",
      8: "Fast and Slow Pointers (Floyd)",
      9: "Move one pointer one step at a time and the other two steps at a time. If they meet, the list contains a cycle. If the faster pointer reaches the end, there is no cycle; the slower pointer will be at the middle.",
    },
  },
  "linked-list-quiz": {
    title: "Quiz: Linked Lists",
    module: "Linked Lists",
    summary:
      "Check your understanding of linked-list complexity and operations.",
    duration: "5 min",
    blockText: {
      0: "Six questions to reinforce the characteristics, costs, and techniques of linked lists.",
    },
    quiz: {
      title: "Quiz: Linked Lists",
      description: "Six questions on linked-list complexity and operations.",
      questions: [
        {
          tag: "Access",
          prompt:
            "What is the time complexity of accessing the kth node in a singly linked list?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "You must traverse the list from the head one node at a time to reach the kth node, so access takes O(n) time.",
        },
        {
          tag: "Insertion",
          prompt:
            "What is the time complexity of inserting a node at the front of a linked list when you know the head?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "Point the new node to the old head, then update the head to the new node. This takes O(1) time.",
        },
        {
          tag: "Structure",
          prompt: "What does the next pointer of the last node point to?",
          options: ["The head", "Itself", "null (None)", "The middle node"],
          explanation:
            "In a standard linked list, the last node points to null to mark the end. A circular list is an exception because it contains a cycle.",
        },
        {
          tag: "Reversal",
          prompt:
            "How many pointers are typically used to reverse a linked list in place?",
          options: ["1", "2", "3", "4"],
          explanation:
            "The prev, cur, and next pointers let you reverse each link without losing the rest of the list.",
        },
        {
          tag: "Technique",
          prompt: "What are fast and slow pointers used for?",
          options: [
            "Sorting a linked list",
            "Detecting a cycle and finding the middle node",
            "Summing the node values",
            "Counting nodes with even values",
          ],
          explanation:
            "If a cycle exists, the fast pointer eventually catches the slow pointer. If there is no cycle, the slow pointer reaches the middle as the fast pointer reaches the end.",
        },
        {
          tag: "Comparison",
          prompt: "What is a main disadvantage of linked lists compared with arrays?",
          options: [
            "They cannot support insertion or deletion",
            "They do not provide O(1) random access and require extra memory for pointers",
            "They cannot store numbers",
            "They are always slower for every operation",
          ],
          explanation:
            "Linked lists require sequential traversal to reach a node, use extra memory for pointers, and often have worse cache locality than arrays.",
        },
      ],
    },
  },
  stack: {
    title: "Stack (LIFO)",
    module: "Stacks & Queues",
    summary:
      "A stack follows last in, first out; all operations at the top take O(1) time.",
    duration: "7 min",
    blockText: {
      0: "A stack is a LIFO (last in, first out) data structure: the last item added is the first one removed, like a stack of plates.",
      1: "Operations",
      2: [
        "push(x): add x to the top of the stack — O(1).",
        "pop(): return and remove the top item — O(1).",
        "peek()/top(): view the top item without removing it — O(1).",
        "isEmpty(), size: check whether the stack is empty and how many items it contains.",
      ],
      3: "Implementation",
      5: "Common Uses",
      6: [
        "Undo functionality and a program's call stack.",
        "Checking balanced parentheses and evaluating expressions (RPN).",
        "Depth-first search (DFS) on graphs or trees.",
      ],
    },
  },
  queue: {
    title: "Queue (FIFO)",
    module: "Stacks & Queues",
    summary:
      "A queue follows first in, first out; use an implementation that avoids O(n) array shifts.",
    duration: "7 min",
    blockText: {
      0: "A queue is a FIFO (first in, first out) data structure: the first item added is the first one removed, like a line of people waiting for tickets.",
      1: "Operations",
      2: [
        "enqueue(x): add x to the back of the queue — O(1).",
        "dequeue(): return and remove the front item — O(1) with a suitable implementation.",
        "front()/peek(): view the front item — O(1).",
      ],
      3: "Implementation",
      4: "If you use an array and call shift() or pop(0) to dequeue, every remaining item has to move, making the operation O(n). To keep dequeue at O(1), use an increasing head index in JavaScript or a deque in Python.",
      6: "Common Uses",
      7: [
        "Breadth-first search (BFS) on trees and graphs.",
        "Task queues, event processing, and print jobs handled in order.",
        "Circular buffers and sliding windows.",
      ],
    },
  },
  "stacks-queues-quiz": {
    title: "Quiz: Stacks & Queues",
    module: "Stacks & Queues",
    summary: "Review LIFO, FIFO, and the cost of common operations.",
    duration: "5 min",
    blockText: {
      0: "Six questions on the differences between stacks and queues and how to implement them efficiently.",
    },
    quiz: {
      title: "Quiz: Stacks & Queues",
      description: "Six questions on LIFO, FIFO, and operation complexity.",
      questions: [
        {
          tag: "Stack",
          prompt: "Which principle does a stack follow?",
          options: [
            "FIFO — first in, first out",
            "LIFO — last in, first out",
            "Ascending order",
            "Random access",
          ],
          explanation:
            "A stack is Last In, First Out: the last item added is the first one removed.",
        },
        {
          tag: "Queue",
          prompt: "Which principle does a queue follow?",
          options: [
            "LIFO — last in, first out",
            "FIFO — first in, first out",
            "Always remove the smallest item",
            "No fixed order",
          ],
          explanation:
            "A queue is First In, First Out: the earliest item added is processed first.",
        },
        {
          tag: "Complexity",
          prompt: "What is the time complexity of push and pop on an array-backed stack?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Both operations affect only the top of the stack, so each takes constant time.",
        },
        {
          tag: "Implementation",
          prompt: "Why should you avoid using an array's shift() to dequeue in JavaScript?",
          options: [
            "Because shift() does not exist",
            "Because shift() moves every remaining item, making it O(n)",
            "Because shift() loses an item",
            "Because shift() does not return a value",
          ],
          explanation:
            "Moving every remaining item makes dequeue O(n). Use a head index or a deque to keep it O(1).",
        },
        {
          tag: "Applications",
          prompt: "Which data structure is best suited to breadth-first search (BFS)?",
          options: ["Stack", "Queue", "Hash map", "Linked list"],
          explanation:
            "BFS processes vertices in the order they are discovered, which is FIFO order—so it uses a queue.",
        },
        {
          tag: "Applications",
          prompt: "Which data structure is commonly used to check whether parentheses are balanced?",
          options: ["Queue", "Stack", "Heap", "Trie"],
          explanation:
            "Push each opening parenthesis onto the stack. When a closing one appears, pop and match it. LIFO naturally handles nested pairs.",
        },
      ],
    },
  },
  "heap-basics": {
    title: "Binary Heap",
    module: "Heaps",
    summary:
      "A complete binary tree stored in an array. Each parent is ≤ (or ≥) its children, so the minimum or maximum can be read in O(1).",
    duration: "9 min",
    blockText: {
      0: "A binary heap is a complete binary tree (filled from left to right) that satisfies the heap property. In a min-heap, every parent is less than or equal to its children, so the smallest value is always at the root. A max-heap follows the reverse rule.",
      1: "Min-heap: each parent is ≤ its children, so the smallest value, 1, is at the root. The number below each node is its array index i.",
      2: "Max-heap: each parent is ≥ its children, so the largest value, 9, is at the root. It is the same tree with a different comparison rule.",
      3: "Array Representation",
      4: "Because the tree is complete, it can be stored in a flat array without pointers. For a node at index i, its parent is at (i-1)/2, its left child at 2i+1, and its right child at 2i+2.",
      5: "Heap Operations: Sift-Up and Sift-Down",
      6: "To insert a value, place it at the end and move it up (sift-up). To remove the root, move the last value to the root and move it down (sift-down).",
      8: "Complexity",
      9: [
        "peek (read the minimum or maximum): O(1).",
        "push / pop: O(log n)—each operation follows a single path from the root to a leaf.",
        "Build a heap from an existing array: O(n), by sifting down from the middle toward the beginning.",
      ],
    },
  },
  "priority-queue": {
    title: "Priority Queues and Top-K",
    module: "Heaps",
    summary:
      "Heaps are the foundation of priority queues. The top-K pattern uses a heap of size k to achieve O(n log k) time.",
    duration: "7 min",
    blockText: {
      0: "A priority queue returns the item with the highest priority, rather than the one that arrived first. A heap is the standard data structure used to implement one.",
      1: "Applications",
      2: [
        "Scheduling tasks by priority and managing event queues.",
        "Dijkstra's and Prim's algorithms—repeatedly select the closest vertex.",
        "Top-K problems: keep the k best items from a data stream.",
      ],
      3: "The Top-K Pattern",
      4: "To keep the k smallest values, use a max-heap of size k. Whenever the heap grows beyond k, remove its largest value. Processing each item takes O(log k), instead of sorting all n items in O(n log n) time.",
      6: "Heap vs. Sorted Array",
      7: [
        "If you only need the minimum or maximum and perform frequent insertions and removals: each heap operation takes O(log n), while inserting into a sorted array takes O(n).",
        "For arbitrary lookups or ordered traversal, a sorted array or a balanced tree is a better fit.",
      ],
    },
    codeText: {
      5: [
        "// Keep the k smallest numbers in a max-heap of size k\nfunction topKSmallest(nums, k) {\n  const heap = []; // max-heap (negate values to reuse min-heap code)\n  for (const x of nums) {\n    push(heap, -x);\n    if (heap.length > k) pop(heap);\n  }\n  return heap.map((v) => -v);\n}",
        "import heapq\n\ndef top_k_smallest(nums, k):\n    # heapq is a min-heap; use negative values to simulate a max-heap\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, -x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return [-v for v in heap]",
      ],
    },
  },
  "heaps-quiz": {
    title: "Quiz: Heaps",
    module: "Heaps",
    summary: "Review heap properties, array indices, and the top-K pattern.",
    duration: "5 min",
    blockText: {
      0: "Six questions on binary heaps and how they are used in priority queues.",
    },
    quiz: {
      title: "Quiz: Heaps",
      description: "Six questions on binary heaps, complexity, and top-K.",
      questions: [
        {
          tag: "Heap property",
          prompt: "In a min-heap, where is the smallest value?",
          options: ["The leftmost leaf", "At the root", "Always in the middle of the array", "Cannot be determined"],
          explanation:
            "The min-heap property ensures each parent is ≤ its children, so the smallest value is at the root.",
        },
        {
          tag: "Array indices",
          prompt:
            "For a node at index i, what is the index of its left child (using zero-based indexing)?",
          options: ["2i", "2i + 1", "2i + 2", "i / 2"],
          explanation:
            "The left child is at 2i+1, the right child at 2i+2, and the parent at (i-1)/2.",
        },
        {
          tag: "Complexity",
          prompt: "What is the time complexity of adding an item to a heap?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Sift-up follows a single path from the leaf to the root, taking at most log n steps.",
        },
        {
          tag: "Complexity",
          prompt: "What is the time complexity of reading the minimum value in a min-heap?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "The minimum is always at the root, so you only need to read heap[0].",
        },
        {
          tag: "Top-K",
          prompt:
            "Which data structure should you use to keep the k smallest numbers from a data stream?",
          options: [
            "A min-heap of size n",
            "A max-heap of size k",
            "Sort all values after every item",
            "A hash map",
          ],
          explanation:
            "A max-heap of size k lets you remove the largest value whenever the heap exceeds k items, in O(log k) time per step.",
        },
        {
          tag: "Building a heap",
          prompt: "What is the time complexity of building a heap from an existing array of n items?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Sifting down from the middle toward the beginning takes O(n), not O(n log n) as inserting items one by one would.",
        },
      ],
    },
  },
  "two-sum": {
    title: "Two Sum on a Sorted Array",
    module: "Two Pointers",
    summary:
      "Use two pointers at opposite ends of a sorted array to find a pair that adds up to the target.",
    duration: "7 min",
    blockText: {
      0: "In a sorted array, start one pointer at the beginning and the other at the end. If their sum is less than the target, move the left pointer forward; if it is greater, move the right pointer backward. If it matches, you have found the pair.",
      1: "Implementation",
      3: "Complexity",
      4: [
        "Time: O(n)—each step removes one element from the search range.",
        "Space: O(1).",
      ],
    },
  },
  "two-pointers-quiz": {
    title: "Quiz: Two Pointers",
    module: "Two Pointers",
    summary:
      "Review the two-pointer technique and when it applies.",
    duration: "5 min",
    blockText: {
      0: "Five questions on using two pointers with sorted arrays.",
    },
    quiz: {
      title: "Two Pointers Quiz",
      description:
        "Five questions on two pointers, when to use them, and common variations.",
      questions: [
        {
          tag: "Conditions",
          prompt:
            "What property must an array have for Two Sum to work with two pointers?",
          options: [
            "No duplicate elements",
            "It must be sorted",
            "Its length must be even",
            "It must contain only positive numbers",
          ],
          explanation:
            "Only when the array is sorted can we rely on moving L forward to increase the sum and moving R backward to decrease it.",
        },
        {
          tag: "Algorithm",
          prompt: "If a[L] + a[R] is less than the target, what should you do?",
          options: ["Decrease R", "Increase L", "Increase R", "Stop"],
          explanation:
            "Because the array is sorted, moving L forward to a larger value increases the sum toward the target.",
        },
        {
          tag: "Complexity",
          prompt:
            "What is the complexity of solving Two Sum with two pointers on a sorted array?",
          options: [
            "O(1) time, O(1) space",
            "O(n) time, O(1) space",
            "O(n log n) time, O(n) space",
            "O(n²) time, O(1) space",
          ],
          explanation:
            "Each step removes one element from the search range, so there are at most O(n) steps. The algorithm uses no extra space.",
        },
        {
          tag: "Variations",
          prompt: "Which problem is NOT a natural fit for the two-pointer technique?",
          options: [
            "Checking whether a string is a palindrome",
            "Reversing an array in place",
            "Finding a pair with a target sum in a sorted array",
            "Counting character frequencies",
          ],
          explanation:
            "A hash map is a natural fit for counting frequencies. The other three problems can be solved by moving two indices toward each other.",
        },
        {
          tag: "Variations",
          prompt:
            "On a sorted array, how long does it take to count pairs with a target sum using two pointers?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "The two pointers still make one pass through the array. Handle duplicate pairs by grouping equal values.",
        },
      ],
    },
  },
  "binary-search": {
    title: "Binary Search",
    module: "Binary Search",
    summary:
      "Halve the search range in a sorted array to achieve O(log n).",
    duration: "8 min",
    blockText: {
      0: "Binary Search repeatedly narrows the search range: compare the middle element with the target, then discard the half that cannot contain it.",
      1: "Implementation",
      3: "Notes",
      4: [
        "The array must be sorted first.",
        "In languages with bounded integers, avoid overflow when computing mid: use lo + (hi - lo) / 2.",
        "Time: O(log n); space: O(1).",
      ],
    },
  },
  "binary-search-quiz": {
    title: "Quiz: Binary Search",
    module: "Binary Search",
    summary:
      "Review the prerequisites, complexity, and common boundary errors in binary search.",
    duration: "5 min",
    blockText: {
      0: "Five questions on binary search and common off-by-one errors.",
    },
    quiz: {
      title: "Binary Search Quiz",
      description:
        "Five questions on prerequisites, complexity, and boundary conditions in binary search.",
      questions: [
        {
          tag: "Prerequisites",
          prompt:
            "What property must an array have for binary search to work correctly?",
          options: [
            "It must contain no duplicate elements",
            "It must be sorted",
            "It must contain only integers",
            "Its length must be a power of 2",
          ],
          explanation:
            "The array must be sorted so that comparing the middle element tells us which half could contain the target.",
        },
        {
          tag: "Complexity",
          prompt: "What is the time complexity of binary search?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "Each step halves the search range, so the number of steps grows as log₂(n).",
        },
        {
          tag: "Boundary conditions",
          prompt:
            "Why use mid = lo + (hi - lo) / 2 instead of (lo + hi) / 2?",
          options: [
            "To make it run faster",
            "To avoid overflow when lo + hi exceeds the integer limit",
            "Because the result is different",
            "To prevent an infinite loop",
          ],
          explanation:
            "In languages with bounded integers, lo + hi can overflow; using the difference avoids that overflow.",
        },
        {
          tag: "Boundary conditions",
          prompt: "When does the while (lo <= hi) loop terminate?",
          options: [
            "When the target is found",
            "When lo > hi (the range is empty)",
            "When hi = 0",
            "When mid = 0",
          ],
          explanation:
            "The <= condition checks even a one-element range. When lo passes hi, no elements remain to check.",
        },
        {
          tag: "Applications",
          prompt:
            "When the target is not in a sorted array, what does search insert position return?",
          options: [
            "Always -1",
            "The index where it should be inserted to keep the array sorted",
            "The index of the middle element",
            "Half the array's length",
          ],
          explanation:
            "When the loop ends, lo is the insertion position—the first index where a value is greater than or equal to the target.",
        },
      ],
    },
  },
  "fixed-sliding-window": {
    title: "Fixed-Size Sliding Window",
    module: "Sliding Window",
    summary:
      "Slide a window of size k across an array: add one element and remove one at each step—in O(n) time.",
    duration: "7 min",
    blockText: {
      0: "Sliding Window is a technique for processing contiguous subarrays or substrings without starting over each time. Instead of recalculating the whole window after every move, update only what changes.",
      1: "When to Use It",
      2: [
        "Problems involving contiguous subarrays or substrings.",
        "Finding an optimum (maximum or minimum), counting, or checking a property of a range.",
        "The condition is monotonic, so you can tell when expanding or shrinking the window is valid.",
      ],
      3: "Fixed-Size Window",
      4: "First calculate the sum of the first k elements. Then, for each move to the right, add the new element and subtract the one that leaves the window.",
      6: "Complexity",
      7: [
        "Time: O(n)—each element enters and leaves the window exactly once.",
        "Space: O(1), beyond the input array.",
      ],
      8: "For k = 3, the current window contains a[0]–a[2]. When it slides right, a[3] enters the window.",
    },
    diagramText: {
      8: {
        nodes: {
          w0: { sub: "a[0] · in window" },
          w1: { sub: "a[1] · in window" },
          w2: { sub: "a[2] · in window" },
          w3: { sub: "a[3] · enters next" },
          w4: { sub: "a[4] · outside window" },
        },
      },
    },
  },
  "variable-sliding-window": {
    title: "Variable-Size Sliding Window",
    module: "Sliding Window",
    summary:
      "Adjust the window with two pointers: expand on the right, then shrink on the left once the condition is met.",
    duration: "8 min",
    blockText: {
      0: "When the window size is not fixed, use two pointers: r expands to the right to add elements, and l moves in from the left to shrink the window once its condition is met but can still be narrowed.",
      1: "General Pattern",
      3: "Example: Shortest Subarray with Sum ≥ Target",
      4: "Expand r and keep a running sum. Once the sum reaches ≥ target, record the length, then move l forward to look for a shorter subarray. Each element enters and leaves the window once, so the algorithm still runs in O(n).",
      6: "Complexity",
      7: [
        "Time: O(n), even with a nested while loop—each element is removed at most once.",
        "Space: O(1).",
      ],
    },
    codeText: {
      2: [
        "l = 0\nfor r in 0..n-1:\n  add a[r] to the window\n  while <window satisfies condition>:\n    update result\n    remove a[l] from the window; l++",
      ],
    },
  },
  "sliding-window-quiz": {
    title: "Quiz: Sliding Window",
    module: "Sliding Window",
    summary:
      "Review when to use sliding windows and why the technique can run in O(n) time.",
    duration: "5 min",
    blockText: {
      0: "Six questions on fixed-size and variable-size sliding windows.",
    },
    quiz: {
      title: "Sliding Window Quiz",
      description: "Six questions on the sliding-window technique.",
      questions: [
        {
          tag: "Concepts",
          prompt: "What type of problem is best suited to the sliding-window technique?",
          options: [
            "A contiguous subarray or substring",
            "A graph with cycles",
            "A binary search tree",
            "Comparison-based sorting",
          ],
          explanation:
            "Sliding windows process contiguous ranges. Discrete structures such as graphs require a different technique.",
        },
        {
          tag: "Fixed-Size Window",
          prompt:
            "When a fixed-size window of length k moves one position to the right, how should you update its sum?",
          options: [
            "Recalculate the sum from scratch",
            "Add the new element and subtract the one that leaves",
            "Double the previous sum",
            "Subtract only the element that leaves",
          ],
          explanation:
            "Updating the sum by adding and subtracting takes O(1) per move, instead of O(k).",
        },
        {
          tag: "Variable-Size Window",
          prompt:
            "In a variable-size window, when should you shrink it by moving pointer l forward?",
          options: [
            "When the window does not yet satisfy the condition",
            "When the window satisfies the condition and you want to try a shorter range",
            "When r reaches the end of the array",
            "Never shrink it",
          ],
          explanation:
            "Shrink the window after the condition is met to optimize the result—for example, to find the shortest subarray.",
        },
        {
          tag: "Complexity",
          prompt:
            "Why is a variable-size sliding window still O(n) even with a nested while loop?",
          options: [
            "Because the while loop runs only a few times",
            "Because each element is added and removed at most once",
            "Because it uses a hash map",
            "Because the array is sorted",
          ],
          explanation:
            "Both l and r move forward at most n times in total, so the amortized running time is O(n).",
        },
        {
          tag: "Applications",
          prompt: "Which problem is NOT a good fit for the sliding-window technique?",
          options: [
            "Finding the longest substring without repeating characters",
            "Finding the maximum sum of k consecutive elements",
            "Checking whether a graph has a cycle",
            "Finding the shortest subarray with sum ≥ target",
          ],
          explanation:
            "Detecting cycles in a graph calls for BFS or DFS, not a window over an array.",
        },
        {
          tag: "Space",
          prompt: "How much extra space does a sliding window on an array use?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "The technique needs only a few variables and two pointers, so its auxiliary space is constant.",
        },
      ],
    },
  },
  "recursion-basics": {
    title: "Recursion & the Call Stack",
    module: "Recursion & Backtracking",
    summary:
      "A function calls itself: it needs a base case to stop, and each call uses a frame on the call stack.",
    duration: "8 min",
    blockText: {
      0: "Recursion is a technique in which a function calls itself to solve a smaller version of a problem. Every recursive function needs two parts: a base case (the stopping condition) and a recursive case (a call on a smaller problem).",
      1: "The Call Stack",
      2: "Each function call creates a frame containing its parameters and local variables. A recursion depth of n uses O(n) stack space; recursion that goes too deep can cause a stack overflow.",
      3: "Example",
      5: "Recursive Fibonacci: Repeated Work",
      6: "Naive recursive Fibonacci recomputes the same subproblems many times, taking O(2ⁿ) time. Memoizing computed results brings the time down to O(n).",
      8: "Recursion vs. Iteration",
      9: [
        "Recursion naturally expresses problems that break down into smaller ones, such as trees, divide and conquer, and backtracking.",
        "Loops use less stack space; tail recursion can sometimes be replaced with a loop.",
        "Recursion with depth O(n) uses O(n) stack space; an iterative version often uses only O(1) auxiliary space.",
      ],
    },
  },
  backtracking: {
    title: "Backtracking",
    module: "Recursion & Backtracking",
    summary:
      "Use depth-first search with backtracking: try a choice, continue, then undo it to explore another choice.",
    duration: "9 min",
    blockText: {
      0: "Backtracking systematically explores potential solutions: at each step, choose a candidate, recurse, and—if it does not lead to a solution—undo the choice and try another candidate.",
      1: "General Pattern",
      3: "Example: Generate All Subsets",
      5: "Permutations & N-Queens",
      6: "The same pattern applies to permutations (choose an unused position each time) and N-Queens (place a queen in each row, ruling out attacked columns and diagonals). The key is to prune branches as early as possible.",
      7: "Complexity",
      8: [
        "Subsets: O(2ⁿ) results; permutations: O(n!).",
        "Recursion stack: O(n) space for the depth, not including space for stored results.",
        "Pruning can greatly reduce the number of branches explored in practice compared with the upper bound.",
      ],
      9: "For nums = [1, 2], each level chooses or skips an element. The four leaves are all possible subsets.",
    },
    codeText: {
      2: [
        "function backtrack(state):\n  if <base case>:\n    record solution\n    return\n  for choice in <available choices>:\n    choose(choice)\n    backtrack(new state)\n    undo choice   // backtrack",
      ],
      4: [
        "function subsets(nums) {\n  const result = [];\n  const path = [];\n  function backtrack(start) {\n    result.push([...path]);\n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]);   // choose\n      backtrack(i + 1);     // continue\n      path.pop();           // backtrack\n    }\n  }\n  backtrack(0);\n  return result;\n}",
        undefined,
      ],
    },
    diagramText: {
      9: {
        nodes: {
          start: { label: "Start", sub: "nums = [1, 2]" },
          "skip-1": { sub: "after considering 1" },
          "choose-1": { sub: "after considering 1" },
          "leaf-empty": { sub: "result" },
          "leaf-two": { sub: "result" },
          "leaf-one": { sub: "result" },
          "leaf-one-two": { sub: "result" },
        },
        edges: {
          "start-skip-1": { label: "Skip 1" },
          "start-choose-1": { label: "Choose 1" },
          "skip-1-leaf-empty": { label: "Skip 2" },
          "skip-1-leaf-two": { label: "Choose 2" },
          "choose-1-leaf-one": { label: "Skip 2" },
          "choose-1-leaf-one-two": { label: "Choose 2" },
        },
      },
    },
  },
  "recursion-backtracking-quiz": {
    title: "Quiz: Recursion & Backtracking",
    module: "Recursion & Backtracking",
    summary: "Review base cases, the call stack, and the backtracking pattern.",
    duration: "5 min",
    blockText: {
      0: "Six questions on recursion and backtracking.",
    },
    quiz: {
      title: "Recursion & Backtracking Quiz",
      description: "Six questions on recursion, memoization, and backtracking.",
      questions: [
        {
          tag: "Recursion",
          prompt: "Which part MUST a correct recursive function include?",
          options: [
            "A for loop",
            "A base case that stops recursion",
            "A hash map",
            "An auxiliary array",
          ],
          explanation:
            "Without a base case, the function keeps calling itself, leading to infinite recursion and a stack overflow.",
        },
        {
          tag: "Call Stack",
          prompt: "How much stack space does a recursion depth of n use?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "Each call holds a frame. With n frames stacked, the recursion uses O(n) space.",
        },
        {
          tag: "Memoization",
          prompt: "Why does naive recursive Fibonacci take O(2ⁿ) time?",
          options: [
            "Because it uses an array",
            "Because it recomputes the same subproblems many times",
            "Because it has no base case",
            "Because it uses nested loops",
          ],
          explanation:
            "The call tree branches and repeats work. Memoizing computed results brings the time down to O(n).",
        },
        {
          tag: "Backtracking",
          prompt: "What does the backtracking step do?",
          options: [
            "Restarts the program",
            "Undoes the choice just tried so another choice can be explored",
            "Sorts the array again",
            "Deletes all results",
          ],
          explanation:
            "Undoing a choice restores the previous state, allowing the algorithm to try the next branch.",
        },
        {
          tag: "Complexity",
          prompt: "How many subsets does a set of n elements have?",
          options: ["n", "n²", "2ⁿ", "n!"],
          explanation:
            "Each element has two options—include it or leave it out—so there are 2ⁿ subsets.",
        },
        {
          tag: "Technique",
          prompt: "What is the purpose of pruning in backtracking?",
          options: [
            "Reduce the number of branches by discarding hopeless ones early",
            "Increase memory use",
            "Reverse the result order",
            "Turn recursion into iteration",
          ],
          explanation:
            "The earlier the algorithm detects a branch that cannot lead to a solution, the more work it saves.",
        },
      ],
    },
  },
  "graph-basics": {
    title: "Graphs & Representations",
    module: "Graphs",
    summary:
      "A set of vertices connected by edges; the choice of representation affects memory use and operation costs.",
    duration: "8 min",
    blockText: {
      0: "A graph consists of vertices and edges that connect them. Edges can be directed or undirected, weighted or unweighted.",
      1: "Terminology",
      2: [
        "degree: the number of edges connected to a vertex.",
        "path: a sequence of adjacent vertices; cycle: a path that loops back to its start.",
        "connected: every pair of vertices has a path between them.",
        "DAG: a directed acyclic graph.",
      ],
      3: "Representations",
      4: [
        "Adjacency list: each vertex stores a list of its neighbors—O(V + E) space and fast neighbor traversal. This is the most common representation.",
        "Adjacency matrix: a V × V array—O(V²) space, with O(1) checks for whether two vertices are adjacent.",
        "Edge list: stores only the edges; compact when you need to process edges.",
      ],
      6: "When to Use Each",
      7: "Use an adjacency list for most traversal and path-finding problems. Use an adjacency matrix for dense graphs when you need to check frequently whether two vertices are adjacent.",
      8: "Vertices are connected by edges; an adjacency list records each vertex's neighbors.",
    },
  },
  "graph-traversal": {
    title: "BFS & DFS",
    module: "Graphs",
    summary:
      "Two ways to traverse a graph: BFS explores level by level with a queue; DFS follows a branch using a stack or recursion.",
    duration: "9 min",
    blockText: {
      0: "There are two basic graph-traversal strategies. BFS explores level by level, while DFS follows one branch as far as it can before backtracking. With an adjacency list, both take O(V + E) time.",
      1: "BFS — Level-Order Traversal",
      2: "BFS uses a queue: add the source vertex, then remove vertices one at a time and add their unvisited neighbors to the back of the queue. Because it explores level by level, BFS finds a shortest path in an unweighted graph.",
      4: "DFS — Explore Deeply",
      5: "DFS uses a stack (or recursion). Whenever it encounters an unvisited neighbor, it explores that neighbor immediately. DFS is used to detect cycles, find connected components, and produce a topological ordering.",
      7: "Complexity",
      8: [
        "Time: O(V + E) with an adjacency list.",
        "Space: O(V) for the visited set and the queue or stack.",
      ],
    },
  },
  "graphs-quiz": {
    title: "Quiz: Graphs",
    module: "Graphs",
    summary: "Review graph representations, BFS and DFS, and their complexity.",
    duration: "5 min",
    blockText: {
      0: "Six questions on graph representations and traversal.",
    },
    quiz: {
      title: "Graphs Quiz",
      description: "Six questions on graphs, BFS, DFS, and complexity.",
      questions: [
        {
          tag: "Representations",
          prompt:
            "Which graph representation uses the least memory for a sparse graph?",
          options: [
            "Adjacency list",
            "Adjacency matrix",
            "V × V matrix",
            "Two-dimensional array",
          ],
          explanation:
            "An adjacency list uses O(V + E) space, while an adjacency matrix always uses O(V²), even for a sparse graph.",
        },
        {
          tag: "BFS",
          prompt: "Which data structure does BFS use?",
          options: ["Stack", "Queue", "Heap", "Hash set"],
          explanation:
            "BFS processes vertices in discovery order (FIFO), so it uses a queue.",
        },
        {
          tag: "DFS",
          prompt: "How is DFS commonly implemented?",
          options: [
            "With a queue",
            "With a stack or recursion",
            "With a heap",
            "With a priority queue",
          ],
          explanation:
            "DFS explores deeply, using a stack (LIFO) or recursive calls.",
        },
        {
          tag: "Applications",
          prompt: "On what kind of graph does BFS find a shortest path?",
          options: [
            "Any weighted graph",
            "An unweighted graph (all edges have equal cost)",
            "Only a directed graph",
            "Only a binary tree",
          ],
          explanation:
            "BFS minimizes the number of edges. With different edge weights, use Dijkstra's algorithm.",
        },
        {
          tag: "Complexity",
          prompt:
            "What is the complexity of traversing an entire graph with BFS or DFS using an adjacency list?",
          options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
          explanation:
            "Each vertex and each edge is processed once, so the complexity is O(V + E).",
        },
        {
          tag: "Structures",
          prompt: "What is a DAG?",
          options: [
            "A complete undirected graph",
            "A directed graph with no cycles",
            "A graph with negative edge weights",
            "A connected graph",
          ],
          explanation:
            "DAG stands for Directed Acyclic Graph: it is directed and contains no cycles, so a topological ordering exists.",
        },
      ],
    },
  },
  "dp-basics": {
    title: "What Is Dynamic Programming?",
    module: "Dynamic Programming",
    summary:
      "Break a problem into overlapping subproblems and store results so you do not have to recompute them.",
    duration: "8 min",
    blockText: {
      0: "Dynamic Programming (DP) solves a larger problem by combining solutions to subproblems and storing computed results. DP is useful when a problem has both of the following properties.",
      1: "Two Requirements",
      2: [
        "Overlapping subproblems: the same subproblem is solved repeatedly.",
        "Optimal substructure: an optimal solution can be built from optimal solutions to subproblems.",
      ],
      3: "Memoization vs. Tabulation",
      4: [
        "Memoization (top-down): recursion plus a cache; the code often follows the recurrence closely.",
        "Tabulation (bottom-up): fill a table from the smallest subproblems upward, usually with iteration and less stack use.",
      ],
      6: "Recognizing DP Problems",
      7: "Common clues include questions about the number of ways, a maximum or minimum value, or whether something is achievable—and a solution that can be expressed as a recurrence over indices or states.",
    },
    codeText: {
      5: [
        "// Bottom-up: fib(n) with O(1) space\nfunction fib(n) {\n  let prev = 0, cur = 1;\n  for (let i = 0; i < n; i++) {\n    [prev, cur] = [cur, prev + cur];\n  }\n  return prev;\n}",
        "# Bottom-up: fib(n) with O(1) space\ndef fib(n):\n    prev, cur = 0, 1\n    for _ in range(n):\n        prev, cur = cur, prev + cur\n    return prev",
      ],
    },
  },
  "dp-patterns": {
    title: "One-Dimensional DP Patterns",
    module: "Dynamic Programming",
    summary:
      "House Robber: use dp[i] = max(dp[i-1], dp[i-2] + nums[i]), then optimize the memory use.",
    duration: "9 min",
    blockText: {
      0: "A one-dimensional DP pattern uses an array dp indexed by i. For example, in House Robber, you cannot rob two adjacent houses; find the maximum amount you can rob.",
      1: "Recurrence",
      2: "At house i, you have two choices: skip it (keep dp[i-1]) or rob it (dp[i-2] + nums[i]). Take the larger value. Only the two most recent values are needed, so space is O(1).",
      4: "Two-Dimensional Pattern: Knapsack",
      5: "When a state needs two dimensions (item index and capacity), use a 2D dp table. For 0/1 knapsack, dp[i][c] is the maximum value using the first i items at capacity c. The table can be compressed to 1D by iterating through capacities in descending order.",
      7: "Complexity",
      8: [
        "1D DP: O(n) time and, in some cases, O(1) space.",
        "2D DP / knapsack: O(n × C) time and space; space can be reduced to O(C).",
      ],
      9: "Each cell dp[i][c] stores the maximum value achievable using the first i items at capacity c.",
    },
    diagramText: {
      9: {
        nodes: {
          "row-0": { sub: "0 items considered" },
          "row-1": { sub: "1 item considered" },
          "row-2": { sub: "2 items considered" },
        },
      },
    },
  },
  "dp-quiz": {
    title: "Quiz: Dynamic Programming",
    module: "Dynamic Programming",
    summary:
      "Review DP's two key properties, memoization vs. tabulation, and recurrence relations.",
    duration: "5 min",
    blockText: {
      0: "Six questions on Dynamic Programming.",
    },
    quiz: {
      title: "Dynamic Programming Quiz",
      description: "Six questions on DP, memoization, tabulation, and complexity.",
      questions: [
        {
          tag: "Concepts",
          prompt: "What two properties make a problem suitable for DP?",
          options: [
            "A sorted array with no duplicates",
            "Overlapping subproblems and optimal substructure",
            "A connected, weighted graph",
            "Recursion and iteration",
          ],
          explanation:
            "DP relies on repeated subproblems and an optimal solution built from optimal subproblem solutions.",
        },
        {
          tag: "Techniques",
          prompt: "How do memoization (top-down) and tabulation (bottom-up) differ?",
          options: [
            "Memoization uses recursion and a cache; tabulation fills a table from smaller problems upward with iteration",
            "Memoization is always faster",
            "Tabulation does not store results",
            "Memoization is only used for graphs",
          ],
          explanation:
            "Memoization uses recursion and solves subproblems as needed; tabulation fills the table in a chosen order.",
        },
        {
          tag: "House Robber",
          prompt: "What is the recurrence for House Robber?",
          options: [
            "dp[i] = dp[i-1] + nums[i]",
            "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
            "dp[i] = min(dp[i-1], nums[i])",
            "dp[i] = nums[i] * 2",
          ],
          explanation:
            "Choose the larger of skipping house i (dp[i-1]) and robbing it (dp[i-2] plus its value).",
        },
        {
          tag: "Space Optimization",
          prompt: "How much space can House Robber be optimized to use?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          explanation:
            "Only dp[i-1] and dp[i-2] are needed, so the auxiliary space is constant.",
        },
        {
          tag: "Complexity",
          prompt: "What is the complexity of 0/1 knapsack with n items and capacity C?",
          options: ["O(n)", "O(C)", "O(n × C)", "O(2ⁿ)"],
          explanation:
            "The state table has n × C cells, and each cell takes O(1) work to process.",
        },
        {
          tag: "Recognizing DP",
          prompt: "Which clue often suggests that DP may be useful?",
          options: [
            "The array needs to be sorted",
            "The question asks for a count, a maximum or minimum, or whether a result is achievable",
            "Only the middle element needs to be accessed",
            "The graph has exactly one cycle",
          ],
          explanation:
            "Optimization or counting questions with a recurrence are common clues that DP may apply.",
        },
      ],
    },
  },
  "tree-basics": {
    title: "Trees and Binary Trees",
    module: "Trees",
    summary:
      "A hierarchical structure with roots, leaves, and subtrees; a binary tree has at most two children per node.",
    duration: "8 min",
    blockText: {
      0: "A tree is a hierarchical structure made up of connected nodes with no cycles. A binary tree has at most two children per node: a left child and a right child.",
      1: "Terminology",
      2: [
        "root: the topmost node, with no parent.",
        "parent / child: the relationship between two adjacent nodes.",
        "leaf: a node with no children.",
        "depth of a node: the number of edges from the root to that node; height of a tree: its maximum depth.",
        "subtree: a node together with all its descendants.",
      ],
      3: "Representations",
      4: "A common representation gives each node a value, a left child, and a right child. A full binary tree can also be stored in an array: node i has left child 2i+1 and right child 2i+2 (the representation used by heaps).",
      6: "Complexity",
      7: [
        "Operations on a balanced tree: O(log n), where the height h = log n.",
        "A tree that is completely skewed to one side degenerates into a linked list: O(n).",
      ],
    },
    codeText: {
      5: [
        "node = {\n  value: number,\n  left: node or null,\n  right: node or null\n}",
      ],
    },
  },
  "binary-search-tree": {
    title: "Binary Search Tree",
    module: "Trees",
    summary:
      "An ordered binary tree: left < node < right, enabling search and insertion in proportion to the tree's height.",
    duration: "9 min",
    blockText: {
      0: "A Binary Search Tree (BST) is a binary tree with this property: every value in a node's left subtree is smaller than the node, and every value in its right subtree is larger. This lets each comparison eliminate half the tree.",
      1: "Search",
      3: "Insertion",
      5: "In-Order Traversal",
      6: "In-order traversal (left → node → right) of a BST produces the values in ascending order. It is one way to check whether a tree is a BST.",
      7: "Complexity",
      8: [
        "Search/insert/delete: O(h), where h is the tree's height.",
        "Balanced tree: O(log n); skewed tree: O(n). Self-balancing variants (AVL, Red-Black) keep h ≈ log n.",
      ],
    },
  },
  "tree-traversal": {
    title: "Tree Traversal",
    module: "Trees",
    summary:
      "Four traversal methods: pre-order, in-order, and post-order (DFS), plus level-order (BFS).",
    duration: "8 min",
    blockText: {
      0: "Tree traversal visits every node in a defined order. The three DFS methods differ in when they visit a node relative to its two subtrees; BFS visits nodes one level at a time.",
      1: "DFS: Pre-Order, In-Order, and Post-Order",
      3: [
        "pre-order: node → left → right (used to copy a tree).",
        "in-order: left → node → right (produces ascending values in a BST).",
        "post-order: left → right → node (used to free a tree).",
      ],
      4: "BFS: Level-Order Traversal",
      5: "Level-order uses a queue: enqueue the root, then repeatedly dequeue a node, record it, and enqueue its children at the back of the queue.",
      7: "Complexity",
      8: [
        "All traversal methods: O(n) time.",
        "DFS uses O(h) space for the call stack; BFS uses O(w), where w is the maximum width of any level.",
      ],
    },
    codeText: {
      2: [
        "function inOrder(node, out = []) {\n  if (!node) return out;\n  inOrder(node.left, out);   // left\n  out.push(node.value);      // node\n  inOrder(node.right, out);  // right\n  return out;\n}",
        undefined,
      ],
    },
  },
  "sd-dns-networking": {
    title: "Client–Server and DNS",
    module: "Networking & APIs",
    summary:
      "Learn the client–server model, how hostnames relate to IP addresses, and how DNS resolution works: stub and recursive resolvers, referrals from root/TLD/authoritative servers, caching, and TTL.",
    duration: "10 min",
    blockText: {
      0: "At the lowest level, distributed systems are machines sending data to one another over a network. This lesson covers two foundations: the client–server model and how DNS translates a domain name into an IP address.",
      1: "By the end, you will be able to trace DNS resolution and see who asks whom, understand why DNS is a distributed system rather than a single machine, and explain the roles of caching and TTL.",
      2: "Client–Server",
      3: "The client starts a request; the server listens, processes it, and returns a response. Separating these roles lets clients and servers evolve, deploy, and scale independently.",
      4: "A client is not necessarily an end user's device. Browsers and mobile apps are clients, but a microservice calling another service acts as a client too.",
      5: [
        "The client starts the exchange; the server mainly responds (the request/response model).",
        "A server can serve many clients at once and scale horizontally behind a load balancer.",
        "A process can be a server to one service and a client to another.",
      ],
      6: "Hostnames and IP addresses",
      7: "An IP address is a number used to route packets (IPv4 is 32-bit, with about 4.3 billion addresses; IPv6 is 128-bit). A hostname, such as example.com, is a human-readable name.",
      8: "The key idea is not simply that an IP is a number and a hostname is a name. It is indirection: clients use a name instead of a hard-coded IP address.",
      9: [
        "Infrastructure changes: you can change an IP address or provider without requiring clients to know about it.",
        "Load balancing and failover: one name can map to multiple IP addresses; DNS can omit a failed IP or distribute requests.",
        "Lifecycle management: many systems use the domain-name layer for global failover.",
      ],
      10: "What is DNS?",
      11: "DNS (Domain Name System) is a distributed, hierarchical database that maps domain names to records—often A/AAAA records containing IP addresses. Its core specifications are RFC 1034 and RFC 1035.",
      12: "There is no single central DNS server. DNS is a hierarchy: root servers at the top, TLDs (such as com, org, and vn) below them, then zones managed by individual organizations.",
      13: "How DNS resolution works",
      14: "One common misconception is that the client itself asks the root, TLD, and authoritative servers in sequence. In practice, two different roles are involved.",
      15: "Stub resolver and local cache",
      16: "The application asks the operating system's stub resolver. The stub checks local caches (such as the OS or browser cache); on a miss, it forwards the query to the configured recursive resolver. The stub does not resolve the entire chain itself.",
      17: "Recursive resolver",
      18: "A recursive resolver, often run by an internet service provider or a public service such as 1.1.1.1 or 8.8.8.8, works on the client's behalf. If the answer is not cached, it queries other servers until it gets a final answer, then caches it.",
      19: "Root, TLD, and authoritative servers",
      20: "The recursive resolver uses iterative queries. It asks a root server, which does not return the final answer but refers it to a TLD server. It then asks the TLD server, which refers it to the zone's authoritative server. Finally, the authoritative server returns the actual A/AAAA record.",
      21: "At each step, the response points to a server closer to the answer; this is called a referral. Only an authoritative server is the source of record for the domain it manages.",
      23: "DNS resolution flow: the client asks its stub resolver. On a cache miss, the stub forwards the query to a recursive resolver. The recursive resolver follows referrals from root to TLD to authoritative servers, then returns the IP address for the client to contact the web server.",
      24: "Caching and TTL",
      25: "Each record has a TTL (time to live). After receiving an answer, the recursive resolver—and possibly the stub resolver or browser cache—keeps it for that period. Later queries can be answered from cache without going through the DNS hierarchy again.",
      26: [
        "A TTL is a non-negative number up to 2^31 − 1 seconds (RFC 8499 cites RFC 2181).",
        "Long TTL: fewer queries and less load, but IP changes take longer to propagate.",
        "Short TTL: faster failover, but more queries and higher average latency.",
      ],
      27: "Why this matters in system design",
      28: [
        "DNS is an early part of the critical path: slow resolution delays every request that follows.",
        "DNS is a control point for failover, region changes, and domain-based load distribution.",
        "DNS caching is essential to handling global traffic; choosing a TTL also means choosing cache behavior.",
      ],
      29: "Quick recap",
      30: [
        "The client starts; the server responds.",
        "A hostname is for people, an IP address is for routing, and DNS provides indirection between them.",
        "The stub resolver asks the recursive resolver; the recursive resolver follows referrals from root to TLD to authoritative servers.",
        "Caching and TTL affect both speed and load.",
      ],
    },
    codeText: {
      22: [
        "resolve www.example.com (cache miss)\n\n  stub resolver  --query-->  recursive resolver  (recursive query, RD=1)\n                              |\n                              +--query--> Root server     → referral: see TLD .com\n                              +--query--> TLD server      → referral: authoritative for example.com\n                              +--query--> Authoritative   → A record 93.184.216.34 (TTL 3600s)\n                              |\n  stub resolver  <--answer--  recursive resolver  (cached)\n  client uses that IP address to open an HTTP(S) connection",
      ],
    },
    diagramText: {
      23: {
        nodes: {
          client: { label: "Client", sub: "application" },
          stub: { label: "Stub resolver", sub: "local cache" },
          recursive: { label: "Recursive resolver", sub: "queries on client's behalf" },
          root: { label: "Root server", sub: "refers to TLD" },
          tld: { label: "TLD server", sub: "refers to authoritative server" },
          auth: { label: "Authoritative server", sub: "returns A record" },
          server: { label: "Web server", sub: "receives HTTP(S)" },
        },
        edges: {
          "client-stub": { label: "domain name query" },
          "stub-recursive": { label: "cache miss" },
          "root-recursive": { label: "TLD referral" },
          "tld-recursive": { label: "authoritative referral" },
          "auth-recursive": { label: "A record" },
          "client-server": { label: "HTTP(S)" },
        },
      },
    },
  },
  "sd-http-proxy-latency": {
    title: "HTTP, Proxies, and Latency",
    module: "Networking & APIs",
    summary:
      "Learn HTTP request/response and statelessness, HTTPS/TLS handshake costs, the difference between forward and reverse proxies (gateways), and how latency adds up along the critical path.",
    duration: "10 min",
    blockText: {
      0: "Once two machines can find each other, they need a shared way to communicate. HTTP is an application-layer protocol for that exchange. Along the way, intermediaries such as proxies, gateways, and CDNs may handle the request.",
      1: "By the end, you will understand HTTP and HTTPS at a high level, distinguish forward from reverse proxies, and know which steps contribute to a request's latency on the critical path.",
      2: "HTTP: stateless request/response",
      3: "HTTP is a family of stateless, application-layer protocols based on request/response (RFC 9110). A client sends a request with a method, target, headers, and optional content. The server interprets it for the target resource and returns a response with a status code, headers, and content.",
      4: "“Stateless” means each request can be understood on its own; its meaning does not depend on an earlier request over the same connection. This makes HTTP work well with proxies, caches, and load balancers.",
      5: "Because HTTP does not keep session state, information such as login status or a shopping cart must be handled separately—for example, with cookies, tokens, or a shared session store.",
      6: "Methods and status codes",
      7: "A method describes the client's intent. GET and HEAD are safe: they do not ask the server to change state. GET, HEAD, PUT, and DELETE are idempotent: repeating the same request has the same intended effect. POST has no such guarantee (RFC 9110, Section 9.2).",
      8: [
        "2xx success: 200 OK, 201 Created, 204 No Content.",
        "3xx redirection: 301 permanent, 302 temporary, 304 Not Modified.",
        "4xx client errors: 400, 401, 403, 404, 429.",
        "5xx server errors: 500, 502, 503, 504.",
      ],
      10: "HTTPS and TLS",
      11: "HTTPS is HTTP over TLS (RFC 9110, Section 4.2.2). TLS provides authentication (of the server, and optionally the client), confidentiality (encryption), and integrity (protection against tampering)—even if an attacker controls the network path (RFC 8446).",
      12: "TLS has two main parts: the handshake, which negotiates the version and algorithms and establishes shared keys, and the record layer, which then protects application data.",
      13: "TLS round-trip costs",
      14: "A full TLS 1.3 handshake takes one round-trip after the TCP connection is established. For a completely new connection, setup can therefore take one TCP RTT plus one TLS RTT before the first HTTP byte is sent.",
      15: "TLS 1.3 can resume a session with PSK to avoid that extra round-trip on later connections. Its 0-RTT mode can send data immediately, but has weaker security: it lacks forward secrecy and may be vulnerable to replay.",
      16: "That is why keep-alive connections and HTTP/2 or HTTP/3 multiplexing spread the handshake cost across multiple requests instead of paying it again for every request.",
      17: "Forward and reverse proxies",
      18: "RFC 9110, Section 3.7 defines three kinds of intermediary: proxy, gateway, and tunnel. The key distinction is who chooses the intermediary and which side it represents.",
      19: [
        "Forward proxy (often just called a “proxy”): chosen by the client through its configuration and acts on the client's behalf. Uses include egress control, privacy, content filtering, and shared caching.",
        "Reverse proxy: acts as the origin server to outside connections while forwarding requests to internal servers. The client does not know it is there.",
        "Tunnel: a blind relay between two endpoints (for example, CONNECT to carry TLS); it does not read or modify the message.",
      ],
      20: "Terminology note: RFC 9110 formally defines what is commonly called a “reverse proxy” as a gateway. A reverse proxy often handles TLS termination, caching, compression, hiding the origin, and load balancing.",
      21: "Latency and the critical path",
      22: "A request's latency is the time taken by its critical path: the sequence of steps that must finish before the next step can begin. Work that runs in parallel does not add its full duration to the critical path.",
      23: "Steps on the critical path of a cold request",
      24: [
        "DNS lookup: resolve the domain name to an IP address (one round-trip to a resolver on a cache miss).",
        "TCP handshake: one round-trip to establish the connection.",
        "TLS handshake: one additional round-trip for TLS 1.3 on a new connection.",
        "Server processing: from receiving the request to the first response byte (TTFB).",
        "Data transfer: the time until the full response body reaches the client.",
      ],
      25: "Physical distance sets a lower bound on latency. In fiber, light travels at about 200,000 km/s—roughly 1 ms for every 200 km one way. No server can beat that limit.",
      26: "How proxies and CDNs affect latency",
      27: [
        "Terminate TLS closer to users to reduce handshake round-trips.",
        "Cache static content at the edge to avoid a trip to the origin.",
        "Keep connections to the origin open (keep-alive) to avoid repeating handshakes.",
        "Compression and multiplexing reduce the number of bytes and trips needed.",
      ],
      29: "A cold connection pays for DNS, TCP, and then the TLS handshake (about one RTT each) before sending the request. A warm connection reuses the keep-alive connection, so its critical path is just request → TTFB → body.",
      30: "Quick recap",
      31: [
        "HTTP is stateless: each request is read independently; session state lives in a cookie, token, or session store.",
        "HTTPS is HTTP over TLS; a new connection adds a TLS handshake round-trip.",
        "The client chooses a forward proxy; a reverse proxy (gateway) represents the server.",
        "Latency follows the critical path; proxies and CDNs can shorten it.",
      ],
    },
    codeText: {
      28: [
        "Cold connection:\n  DNS (1 RTT)  →  TCP (1 RTT)  →  TLS 1.3 (1 RTT)  →  request  →  TTFB  →  body\n\nWarm connection (keep-alive, DNS cached):\n  request  →  TTFB  →  body",
      ],
    },
    diagramText: {
      29: {
        nodes: {
          "c-cold": { label: "Client", sub: "cold connection" },
          dns: { label: "DNS", sub: "1 RTT" },
          tcp: { label: "TCP", sub: "1 RTT" },
          tls: { label: "TLS 1.3", sub: "1 RTT" },
          "s-cold": { label: "Server", sub: "request → body" },
          "c-warm": { label: "Client", sub: "warm connection" },
          "s-warm": { label: "Server", sub: "request → body" },
        },
        edges: {
          "warm-client-server": { label: "keep-alive: reuse DNS/TCP/TLS" },
        },
      },
    },
  },
  "sd-rest-graphql": {
    title: "REST and GraphQL",
    module: "Networking & APIs",
    summary:
      "Treat APIs as contracts; understand REST as a resource-oriented architectural style with a uniform interface (not just CRUD), GraphQL queries and resolvers, and when each approach fits.",
    duration: "11 min",
    blockText: {
      0: "Once two machines can communicate, the next question is how applications exchange structured data. That is the role of an API, and REST and GraphQL are two widely used API styles.",
      1: "By the end, you will understand APIs as contracts, REST at the right conceptual level (resources and a uniform interface, not just CRUD), GraphQL queries and resolvers, and the trade-offs involved in choosing between them.",
      2: "An API is a contract",
      3: "An API defines what you can ask for, how to ask for it, and what you get back. A clear contract lets clients and servers evolve independently as long as both follow it.",
      4: "A breaking change violates that contract. Maintaining backward compatibility is part of API design, not just documentation work.",
      5: "REST: resources, not a list of CRUD operations",
      6: "REST is an architectural style described by Roy Fielding in 2000, not a library or a standard. Its central concept is the resource—anything that can be named. Clients act on resources through their representations.",
      7: "REST's distinguishing characteristic is its uniform interface. On the web, HTTP provides that interface: URIs identify resources, while methods and status codes carry meaning. The trade-off is that a general interface may be less efficient than one tailored to a specific application, in exchange for independent evolution and interoperability.",
      8: "So do not reduce REST to “POST creates, GET reads, PUT updates, DELETE removes.” That mapping is a useful mnemonic, but REST also involves statelessness, cacheability, layering, and modeling resources around the domain.",
      9: "Example resource model",
      11: "An action that does not fit naturally into CRUD (such as “send an invoice”) can be modeled as a sub-resource or controller resource instead of putting a verb in the URL.",
      12: "GraphQL: clients describe exactly what data they need",
      13: "GraphQL is a query language for APIs, together with a server-side runtime. The client writes a query naming the fields it needs, and the server returns data in that shape. A single request can traverse related objects instead of calling several endpoints.",
      14: "The server defines a schema (type system) describing what can be queried. Each field has a resolver—a function that fetches its data from any source, such as a database, another service, or a cache.",
      16: "The result matches the query's shape. Because clients choose the fields, GraphQL can avoid over-fetching (getting more data than needed) and under-fetching (needing extra requests)—two issues that can arise when REST returns a fixed representation.",
      17: "A REST client may call several resource endpoints when the data is spread across resources. A GraphQL client sends one query to an endpoint, and the schema and resolvers fetch each field from a suitable source. This is a common pattern; a GraphQL server may still make several calls to its data sources.",
      18: "Compare and choose",
      19: [
        "Caching: REST can use standard HTTP caching by URL. GraphQL often sends different queries to one endpoint, which can make HTTP caching harder.",
        "Round-trips: REST may need several requests for data from multiple resources; GraphQL can combine them in one query.",
        "Server complexity: REST organizes logic by endpoint. GraphQL puts more work in resolvers and requires controls for deeply nested queries, query cost, and the N+1 problem.",
        "Schema evolution: GraphQL can add fields without breaking existing clients; REST APIs often need to manage versions.",
        "Tooling: GraphQL introspection lets clients explore the schema. REST is simpler and widely supported by many kinds of clients.",
      ],
      20: "REST is a good fit for public, simple APIs that benefit from caching. GraphQL can fit when many clients need different data and queries need to be combined. They are not mutually exclusive: a GraphQL gateway can sit in front of REST services and hide the backend.",
      21: "Quick recap",
      22: [
        "An API is a contract; a change that breaks it is a breaking change.",
        "REST is about resources and a uniform interface (HTTP), not just CRUD.",
        "GraphQL lets clients choose fields and has the server resolve them. It can avoid over- and under-fetching, but adds complexity and can be harder to cache.",
      ],
    },
    codeText: {
      10: [
        "GET    /users/42          → read one user\nGET    /users/42/orders   → that user's orders\nPOST   /users             → create a user\nPATCH  /users/42          → update part of a user\nDELETE /users/42          → delete a user",
      ],
    },
    diagramText: {
      17: {
        nodes: {
          "r-client": { label: "REST client" },
          "r-ep1": { label: "GET /users/42" },
          "r-ep2": { label: "GET /users/42/orders" },
          "r-ep3": { label: "GET /orders/12" },
          "r-src": { label: "Data sources", sub: "multiple resources" },
          "g-client": { label: "GraphQL client" },
          "g-ep": { label: "GraphQL endpoint" },
          "g-res": { label: "Schema / resolvers" },
          "g-src": { label: "Data sources" },
        },
        edges: {
          "r-client-ep2": { label: "separate request" },
          "g-client-ep": { label: "one query" },
          "g-ep-res": { label: "resolve fields" },
          "g-res-src": { label: "call data sources" },
        },
      },
    },
  },
  "sd-realtime-communication": {
    title: "Real-Time Communication",
    module: "Networking & APIs",
    summary:
      "Compare three ways to communicate in real time: polling, persistent two-way WebSocket connections, and server-initiated HTTP callbacks (webhooks), including provider-dependent delivery behavior, signatures, and idempotency.",
    duration: "11 min",
    blockText: {
      0: "HTTP request/response exchanges are started by the client. But chat, notifications, live scores, and collaborative editors often need the server to push data to a client. Three common approaches differ in who initiates communication and how long the connection stays open.",
      1: "By the end, you will be able to distinguish polling, WebSocket, and webhooks, understand why WebSockets are harder to scale, and recognize reliability needs such as retries, signatures, and idempotency when receiving webhooks.",
      2: "Polling: the client checks periodically",
      3: "The simplest approach is for a client to repeat a GET request on a schedule (for example, every five seconds) to check for updates. It uses plain HTTP and is easy to implement and pass through proxies and firewalls.",
      4: [
        "The delay can be as long as one polling interval.",
        "Requests are wasted when nothing has changed: every check still uses a request.",
        "Load grows with the number of clients multiplied by the polling frequency.",
      ],
      5: "Long polling improves on this by having the server keep a request open until data is available or a timeout occurs; the client then opens another request. This can reduce latency, but each waiting client occupies a connection.",
      6: "WebSocket: a persistent, two-way connection",
      7: "A WebSocket starts with an HTTP request to upgrade the protocol: the client sends GET with Upgrade: websocket and Sec-WebSocket-Key. If accepted, the server returns 101 Switching Protocols. The same TCP connection then becomes a two-way channel; either side can send messages at any time without HTTP headers on every message.",
      8: "Use ws:// for an unencrypted connection and wss:// for one over TLS (ports 80 and 443 by default). WebSocket is an option when you need genuinely two-way real-time communication.",
      10: "Why WebSockets are harder to scale",
      11: [
        "They are stateful: the server must track which connections are open, rather than handling independent requests.",
        "If a server fails, all its connections drop; clients must reconnect, often with backoff.",
        "Messages must reach the server holding the recipient's connection—often using a pub/sub backplane (such as Redis) or sticky routing.",
        "Load balancers, proxies, and timeouts must support protocol upgrades and long-lived connections.",
      ],
      12: "Webhook: the server calls your endpoint",
      13: "A webhook reverses the polling model. Instead of the client asking repeatedly, it registers a callback URL. When an event occurs, the source system sends an HTTP POST to that URL. For example, Stripe can report a successful payment, and GitHub can report a code push.",
      14: "A webhook is one-way, event-driven communication. It is useful when you need events from a third-party system without maintaining a two-way connection.",
      15: "Reliability challenges",
      16: [
        "Event order depends on the provider; do not assume events always arrive in the order they were created.",
        "Duplicate deliveries are possible. Make handling idempotent: record processed event IDs and ignore duplicates.",
        "Retry behavior depends on the provider. Some retry failed deliveries, often with exponential backoff.",
        "Respond quickly: return 2xx, then process asynchronously to avoid a timeout.",
        "Verify signatures according to the provider's documentation. Some providers require the raw body (for example, Stripe-Signature or X-Hub-Signature-256).",
        "Replay protection depends on the provider. Some signature formats include a timestamp (Stripe is one example); only check one when the provider's format supports it.",
      ],
      18: "Which approach should you choose?",
      19: [
        "Need two-way communication, low latency, and a connected client (chat, games, collaboration) → WebSocket.",
        "Need one-way events from a third-party system → webhook.",
        "Low update frequency, latency is acceptable, and simplicity matters most → polling.",
        "Need near-real-time updates but cannot use WebSocket → long polling.",
      ],
      20: "The three real-time patterns differ in who initiates communication: polling has the client repeat requests; WebSocket keeps a two-way channel open between client and server; a webhook has a provider send a one-way HTTP POST to a callback URL.",
      21: "Quick recap",
      22: [
        "The client pulls with polling; a server pushes with a webhook; WebSocket provides a persistent two-way channel.",
        "WebSockets are stateful and harder to scale; plan for reconnects and message routing.",
        "For webhooks, verify signatures, use provider-supported replay protection, handle events idempotently, and return 2xx quickly.",
      ],
    },
    codeText: {
      17: [
        "def handle_webhook(raw_body, signature_header):\n    if not verify_signature(raw_body, signature_header, secret):\n        return 400                     # invalid signature → reject\n    event = json.loads(raw_body)\n    if already_processed(event[\"id\"]):\n        return 200                     # duplicate delivery → ignore, still return 200\n    enqueue(event)                     # process asynchronously\n    return 200                         # respond before processing finishes",
      ],
    },
    diagramText: {
      20: {
        nodes: {
          polling: { label: "Polling", sub: "client pulls periodically" },
          "poll-client": { label: "Client" },
          "poll-server": { label: "Server" },
          ws: { label: "WebSocket", sub: "persistent connection" },
          "ws-client": { label: "Client" },
          "ws-server": { label: "Server" },
          webhook: { label: "Webhook", sub: "server pushes" },
          "hook-provider": { label: "Provider", sub: "third party" },
          "hook-callback": { label: "Callback URL", sub: "your server" },
        },
        edges: {
          "poll-client-server": { label: "repeated GET" },
          "ws-server-client": { label: "two-way" },
          "hook-provider-callback": { label: "HTTP POST" },
        },
      },
    },
  },
  "trees-quiz": {
    title: "Quiz: Trees",
    module: "Trees",
    summary: "Review BSTs, tree traversals, and tree complexity.",
    duration: "5 min",
    blockText: {
      0: "Six questions on binary trees, BSTs, and tree traversals.",
    },
    quiz: {
      title: "Quiz: Trees",
      description: "Six questions on tree structures, BSTs, and tree traversal.",
      questions: [
        {
          tag: "BST",
          prompt: "Which property defines a Binary Search Tree?",
          options: [
            "Every node has exactly two children",
            "Left < node < right for every node",
            "All leaves are at the same depth",
            "Larger values are always on the left",
          ],
          explanation:
            "A BST is ordered: every value in the left subtree is smaller than the node, and every value in the right subtree is larger.",
        },
        {
          tag: "BST",
          prompt: "What is the search complexity in a BST in terms of its height h?",
          options: ["O(1)", "O(log h)", "O(h)", "O(h²)"],
          explanation:
            "Each step moves down one level, so search takes O(h). If the tree is balanced, h ≈ log n.",
        },
        {
          tag: "Tree Traversal",
          prompt: "Which traversal of a BST produces values in ascending order?",
          options: ["pre-order", "in-order", "post-order", "level-order"],
          explanation:
            "In-order visits left → node → right, which follows the BST's sorted order.",
        },
        {
          tag: "Tree Traversal",
          prompt: "Which data structure does level-order traversal use?",
          options: ["Stack", "Queue", "Hash map", "Heap"],
          explanation:
            "Level-order is BFS: it uses a queue to process nodes in the order they are discovered.",
        },
        {
          tag: "Complexity",
          prompt: "When a BST is completely skewed, what does search degrade to?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          explanation:
            "A skewed tree becomes a linked list, so its height is h = n and search takes O(n).",
        },
        {
          tag: "Memory",
          prompt: "How much auxiliary space does DFS traversal of a tree use?",
          options: ["O(1)", "O(h) for the call stack", "O(n²)", "O(2ⁿ)"],
          explanation:
            "The recursion depth is the tree's height, so the call stack uses O(h) space.",
        },
      ],
    },
  },
};

export function applyLessonTranslation(
  lesson: Lesson,
  translation: LessonTranslation,
): Lesson | undefined {
  const hasUntranslatedText = lesson.blocks.some((block, index) => {
    if (block.type === "code") return false;
    return translation.blockText[index] === undefined;
  });
  if (hasUntranslatedText) return undefined;
  if (Boolean(lesson.quiz) !== Boolean(translation.quiz)) return undefined;
  if (
    lesson.quiz &&
    translation.quiz &&
    lesson.quiz.questions.length !== translation.quiz.questions.length
  ) {
    return undefined;
  }

  const blocks = translateBlocks(lesson.blocks, translation);
  if (!blocks) return undefined;

  return {
    ...lesson,
    title: translation.title,
    module: translation.module,
    summary: translation.summary,
    duration: translation.duration ?? lesson.duration.replace("phút", "min"),
    blocks,
    quiz:
      lesson.quiz && translation.quiz
        ? {
            ...lesson.quiz,
            title: translation.quiz.title,
            description: translation.quiz.description,
            questions: lesson.quiz.questions.map((question, index) => ({
              ...question,
              ...translation.quiz!.questions[index],
            })),
          }
        : undefined,
  };
}

function applyNodeTranslation(
  node: DiagramNode,
  patch: DiagramNodeTranslation,
): DiagramNode {
  return {
    ...node,
    ...(patch.label !== undefined ? { label: patch.label } : {}),
    ...(patch.sub !== undefined ? { sub: patch.sub } : {}),
  };
}

function applyEdgeTranslation(
  edge: DiagramEdge,
  patch: DiagramEdgeTranslation,
): DiagramEdge {
  return {
    ...edge,
    ...(patch.label !== undefined ? { label: patch.label } : {}),
  };
}

function translateBlocks(
  blocks: LessonBlock[],
  translation: LessonTranslation,
): LessonBlock[] | undefined {
  // Fail closed when a code override targets a non-code block or its snippet
  // count does not match the source block.
  for (const [key, snippetText] of Object.entries(translation.codeText ?? {})) {
    const block = blocks[Number(key)];
    if (!block || block.type !== "code") return undefined;
    if (snippetText.length !== block.snippets.length) return undefined;
  }
  // Fail closed when a diagram override targets a non-diagram block or an
  // unknown node/edge id.
  for (const [key, overrides] of Object.entries(translation.diagramText ?? {})) {
    const block = blocks[Number(key)];
    if (!block || block.type !== "diagram") return undefined;
    for (const nodeId of Object.keys(overrides.nodes ?? {})) {
      if (!block.nodes.some((node) => node.id === nodeId)) return undefined;
    }
    for (const edgeId of Object.keys(overrides.edges ?? {})) {
      if (!block.edges.some((edge) => edge.id === edgeId)) return undefined;
    }
  }

  return blocks.map((block, index) => {
    const text = translation.blockText[index];

    if (block.type === "code") {
      const snippetText = translation.codeText?.[index];
      if (!snippetText) return block;
      return {
        ...block,
        snippets: block.snippets.map((snippet, snippetIndex) => {
          const code = snippetText[snippetIndex];
          return code === undefined ? snippet : { ...snippet, code };
        }),
      };
    }

    if (block.type === "diagram") {
      const withCaption =
        typeof text === "string" ? { ...block, caption: text } : block;
      const overrides = translation.diagramText?.[index];
      if (!overrides) return withCaption;

      let nodes = withCaption.nodes;
      if (overrides.nodes) {
        const nodeOverrides = overrides.nodes;
        nodes = withCaption.nodes.map((node) => {
          const patch = nodeOverrides[node.id];
          return patch ? applyNodeTranslation(node, patch) : node;
        });
      }
      let edges = withCaption.edges;
      if (overrides.edges) {
        const edgeOverrides = overrides.edges;
        edges = withCaption.edges.map((edge) => {
          const patch = edgeOverrides[edge.id];
          return patch ? applyEdgeTranslation(edge, patch) : edge;
        });
      }
      return { ...withCaption, nodes, edges };
    }

    if (text === undefined) return block;
    if (block.type === "ul" && Array.isArray(text)) {
      return { ...block, items: text };
    }
    if (
      (block.type === "p" || block.type === "h2" || block.type === "h3") &&
      typeof text === "string"
    ) {
      return { ...block, text };
    }
    return block;
  });
}

export function translateLesson(lesson: Lesson): Lesson | undefined {
  const translation = englishLessons[lesson.slug];
  if (!translation) return undefined;
  return applyLessonTranslation(lesson, translation);
}
