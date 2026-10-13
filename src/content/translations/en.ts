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
  group?: string;
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
  "sd-load-balancing": "Load Balancing",
  "sd-caching": "Caching",
  data: "Data",
  "sd-data": "Database Scaling Techniques",
  reliability: "Reliability",
  "sd-reliability": "Reliability",
  "sd-database-fundamentals": "Databases",
  "sd-distributed-systems": "Distributed Systems",
  "sd-architecture-patterns": "Architecture Patterns",
  "sd-design-process": "Design Process",
  "sd-case-studies": "Case Studies",
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
      29: "Visualizing the upload and feed flows",
      30: "What We Design For",
      31: [
        "Scalability: handle more users, traffic, and data as demand grows.",
        "Availability: keep the system accessible when users need it, even if some components fail.",
        "Reliability: keep the system behaving correctly without losing, duplicating, or corrupting data.",
        "Performance: latency (how long one request takes) and throughput (how many requests are handled per unit of time).",
        "Consistency: ensure users and services see the same latest version of the data.",
        "Maintainability: make the system easier to operate, debug, update, and extend over time.",
        "Cost: meet requirements without using more servers, storage, bandwidth, or effort than necessary.",
      ],
      32: "Every Choice Involves Trade-offs",
      33: "Improving one quality often comes at a cost elsewhere. For example, adding a cache reduces database load and makes reads much faster, but cached data can become stale until it is refreshed or expires. Likewise, adding replicas and redundancy can improve performance and availability, but it also raises costs and makes the system more complex to operate.",
      34: "There is rarely a design that is best in every way. Much of system design is understanding these trade-offs, deciding which qualities matter most for your requirements, and explaining why you chose one approach over another.",
      35: "Design Evolves Over Time",
      36: "Real systems are rarely built in their complete form from day one. A photo app might start with one application server and one database—more than enough for the first few thousand users.",
      37: "As usage grows, bottlenecks emerge: the database is overloaded, photo delivery is too slow, or background work starts delaying user requests. That is when you add the component that addresses each specific problem.",
      38: "Adding everything too early often creates complexity, more things to debug, and higher costs without much benefit. A good design meets today's requirements while leaving room to grow as they change.",
      39: "Why Learn System Design?",
      40: "If you work on backend systems, you make system-design decisions all the time—even when building a small feature. Consider the Like feature in a photo app: should you cache the like count, update it synchronously in the request or send it to a queue, and what happens if traffic spikes after a celebrity posts?",
      41: [
        "Cache the like count? Yes—it is read much more often than it changes. Trade-off: the count may be temporarily stale.",
        "Update in the request or through a queue? Put it on a queue so users get a quick response. Trade-off: more components to run and monitor.",
        "Traffic spike? Add servers and spread the load. Trade-off: higher cost.",
      ],
      42: "System Design Interviews",
      43: "At many technology companies, a system design interview is a standard part of the process for mid-level and senior engineers. Prompts are usually open-ended: design a URL shortener, a chat app, or a photo-sharing app. You typically have 45–60 minutes; there is no single correct answer, and you do not need to write code that passes test cases.",
      44: "Instead, follow a process:",
      45: [
        "Clarify requirements: agree on the core features and non-functional goals before drawing anything.",
        "Estimate scale: make rough estimates of users, requests per second, and storage to identify the main pressures.",
        "Sketch the high-level design: start with the main building blocks and trace how a request flows through them.",
        "Explore a few important areas in depth: the database, caching, data flow, or failure handling.",
      ],
      46: "Throughout the process, explain your decisions and their trade-offs. You do not need to memorize standard designs. If you understand the core building blocks, the problems they solve, and the trade-offs they bring, you can reason about systems you have never seen before.",
      47: "Conclusion",
      48: "System design turns a set of requirements into a system of components, defines how they work together, and makes trade-offs suited to the problem at hand. In the lessons ahead, we will explore each building block and concept, the problems it solves, and when to use it.",
    },
    codeText: {
      15: [
        "Feature        API             Related components\nUpload photo   POST /photos    App server, database, object storage\nFollow         POST /follows    App server, database\nLike post      POST /likes      App server, database\nView feed      GET  /feed       App server, cache, database",
      ],
    },
    diagramText: {
      26: {
        edges: {
          "client-obj": { label: "direct photo upload" },
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
  "sd-what-are-load-balancers": {
    title: "What are Load Balancers?",
    module: "Load Balancing",
    summary: "The role and benefits of a load balancer in a system.",
    duration: "5 min",
    blockText: {
      0: "A load balancer distributes requests across multiple servers to use resources efficiently, increase throughput, and tolerate node failures.",
      1: "A single server is limited by CPU, memory, and concurrent connections. A load balancer sits in front of a pool of servers and spreads traffic across them, so the system scales horizontally by adding servers.",
      2: [
        "Clients see only one address (a virtual IP or a domain name); the load balancer chooses the server behind it.",
        "Servers can be added to or removed from the pool without changing anything on the client side.",
        "A load balancer can also terminate TLS or route based on request content.",
      ],
    },
  },
  "sd-load-balancing-algorithms": {
    title: "Load Balancing Algorithms",
    module: "Load Balancing",
    summary:
      "Load-balancing algorithms, health checks, and Layer 4 vs. Layer 7.",
    duration: "8 min",
    blockText: {
      0: "A load balancer distributes requests across multiple servers to use resources efficiently, increase throughput, and tolerate node failures.",
      1: "Common Algorithms",
      2: [
        "Round Robin: rotate through servers in turn.",
        "Least Connections: choose the server with the fewest active connections.",
        "IP Hash: usually sends a client to the same server to preserve session affinity, as long as the client IP and server pool stay stable. Pool changes or server failures can remap clients, and many users behind one NAT or proxy may share an IP.",
        "Weighted: send more requests to more powerful servers.",
      ],
      3: "Health Checks",
      4: "Health checks can be configured for TCP, HTTP(S) (with a chosen path), or gRPC. The load balancer removes a server after the configured number of consecutive failures and restores it after the configured number of consecutive successes. Combine active checks (proactive probes) with passive checks (based on real failures). A TCP probe can pass even when the HTTP app is broken. The load balancer also needs redundancy (multiple or managed load balancers) to avoid becoming a single point of failure.",
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
  "sd-dns-load-balancing": {
    title: "DNS Load Balancing",
    module: "Load Balancing",
    summary: "Spread traffic with DNS: how it works and its trade-offs.",
    duration: "5 min",
    blockText: {
      0: "With DNS load balancing, one domain name resolves to several IP addresses, and the client picks one of them (often in the returned order or at random).",
      1: [
        "DNS round robin: a name returns multiple IPs, rotating the order on each response to spread clients across servers.",
        "No health awareness: DNS does not check whether a server is alive, so it can still return the IP of a failed node.",
        "TTL controls how quickly a DNS record change propagates: a long TTL slows failover, while a short TTL increases query volume.",
        "Weighted or geoDNS: return IPs by weight or by the client's approximate location to steer traffic.",
      ],
    },
  },
  "sd-anycast-routing": {
    title: "Anycast Routing",
    module: "Load Balancing",
    summary: "Anycast routes a shared IP to the nearest server via BGP.",
    duration: "5 min",
    blockText: {
      0: "With anycast, many servers (usually in different locations) share one IP address, and the network routes each request to the nearest server according to BGP.",
      1: [
        "Multiple servers advertise the same IP; BGP picks a path by hop count and preference, so a request reaches the server that is closest in routing terms.",
        "Anycast is used by DNS root servers, CDNs, and DDoS mitigation: traffic is spread across many points.",
        "It is not guaranteed to be geographically closest and can change as BGP re-converges; because different packets can reach different nodes, anycast suits stateless services (like DNS over UDP) more than long-lived TCP sessions.",
      ],
    },
  },
  "sd-load-balancing-exercises": {
    title: "Load Balancing - Exercises",
    module: "Load Balancing",
    summary:
      "Practice choosing algorithms, configuring health checks, and reasoning about routing.",
    duration: "5 min",
    blockText: {
      0: "Apply what you have learned: choose an algorithm, trace the request flow, and reason about failures.",
      1: [
        "A web app runs three identical servers and must keep login sessions stable. Which load-balancing algorithm would you choose, and why?",
        "Server s2 hangs but still accepts TCP connections. Why might a TCP-only health check miss this, and how would you change the configuration?",
        "A site with users around the world wants lower read latency. Compare DNS load balancing, anycast routing, and a CDN for this goal.",
      ],
    },
  },
  "sd-what-is-caching": {
    title: "What is Caching?",
    module: "Caching",
    group: "Caching Fundamentals",
    summary:
      "Why caching works: keep hot data in fast storage to cut latency and load.",
    duration: "6 min",
    blockText: {
      0: "A cache is a layer that keeps hot data—data accessed often or needing a quick response—in storage that is faster to access than the primary source. Caches can live in the CPU, application, database, browser, or CDN; RAM is common, but it is not the only option.",
      1: "A cache hit means the requested data is present; a cache miss means it must be fetched from a slower source, such as a database. Hit rate is useful only in the context of a workload and actual latency: a high hit rate may not help much if each hit saves very little time.",
      2: "Where Caches Live",
      3: "Each cache layer involves different trade-offs. A CPU or in-process application cache is usually very fast but has limited scope. A cache shared across machines is easier to share, but adds a network hop and an operational dependency.",
      4: [
        "CPU caches keep data close to the processor; browser caches keep web assets on a user's device.",
        "An application cache can hold computed results or frequently read data; databases also have their own caches.",
        "A CDN cache places content near users; a distributed cache spreads hot data across application servers.",
        "Choose a layer based on the data, sharing scope, freshness needs, and operational cost—not just peak speed.",
      ],
      5: "For example, a product page may cache catalog details shared by many visitors, while a personalized shopping cart usually should not go into a shared cache. Caching can reduce read latency and load on the primary source, but it uses memory, may serve stale data, and needs a plan for slow or unavailable cache services.",
      6: "Measure Value Against the Workload",
      7: [
        "Track hit rate alongside p95/p99 latency (the latency at or below which 95%/99% of requests fall), database load, cache size, and refresh cost.",
        "A miss still reads from the primary source. If many keys miss after a restart (a cold cache), the database can receive a sudden surge of traffic.",
      ],
      8: "Quick Self-Check",
      9: [
        "Does a high hit rate always mean lower latency? Why or why not?",
        "What might happen to the database when a cache has just started and contains no data?",
      ],
    },
  },
  "sd-caching-strategies": {
    title: "Caching Strategies",
    module: "Caching",
    group: "Caching Fundamentals",
    summary:
      "Compare cache-aside, read-through, write-through, write-behind, and write-around strategies.",
    duration: "8 min",
    blockText: {
      0: "Caching Strategies",
      1: [
        "Cache-aside (lazy loading): check the cache first; on a miss, read from the database and store the result in the cache. On writes, this pattern usually updates the database and then deletes the cache entry so the next read reloads it.",
        "Read-through: the application reads through the cache, which fetches from the source on a miss. Refresh-ahead refreshes data before it expires to reduce misses, but may refresh data no one needs again.",
        "Write-through: update the database and cache as part of the write request; the coordination method affects latency. This does not, by itself, guarantee strong consistency or atomicity across both stores.",
        "Write-behind: acknowledge a cache write and update the database later. It can be faster, but the cache temporarily acts as the source of truth, so a failure before the flush can lose writes.",
        "Write-around: write directly to the database without filling the cache on writes. This avoids caching rarely read data, but the next read may miss.",
      ],
      3: "On a cache hit, return the data immediately. On a miss, query the database, write the result to the cache, then return it to the client.",
      4: "Choose a Strategy for the Access Pattern",
      5: "Cache-aside is a common starting point because the application decides which keys to cache. For example, a category page checks the cache first; on a miss, the app queries the database, stores the result, and returns it. When the category changes, the usual approach is to update the database and delete the cache entry rather than setting it directly. The two operations have no shared transaction, however, so a concurrent read can still repopulate the cache with stale data.",
      6: [
        "Use read-through when you want the cache to own the loading logic; understand how it handles source failures.",
        "Use refresh-ahead when misses are expensive and upcoming demand is predictable; it can also create unnecessary refresh work.",
        "Write-through is useful when the cache should be updated in the write path, but a failure between the two writes can still leave them out of sync without coordination.",
        "Write-behind can suit data that tolerates delayed persistence; account for a growing queue, failed flushes, and recovery.",
      ],
      8: "Quick Self-Check",
      9: [
        "Why might write-around make sense for data that is read only occasionally?",
        "Why can updating the database and then deleting the cache still leave a race condition?",
      ],
    },
    codeText: {
      2: [
        "App → Cache? hit → return data\n                miss → DB → write to cache → return data",
      ],
      7: [
        "Cache-aside read: cache → miss → DB → set cache\nCache-aside write: DB → delete cache entry",
      ],
    },
    diagramText: {
      3: {
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
  "sd-cache-eviction-policies": {
    title: "Cache Eviction Policies",
    module: "Caching",
    group: "Caching Fundamentals",
    summary: "LRU, LFU, and FIFO, and how eviction differs from TTL expiry.",
    duration: "7 min",
    blockText: {
      0: "Eviction Algorithms",
      1: [
        "LRU (Least Recently Used) favors removing entries that have not been accessed recently; it works well when recently used data is likely to be used again soon.",
        "LFU (Least Frequently Used) favors keeping frequently accessed entries; it may retain data that used to be popular even after demand has shifted.",
        "FIFO (First In, First Out) removes the oldest inserted entry, regardless of usage. Random is simple to implement but may evict a useful entry.",
      ],
      2: "Keep TTL/expiry (time-based expiration) separate from eviction (removal to free space). An entry can expire while the cache still has room; conversely, the cache can evict an unexpired entry to make room.",
      3: "Which Policy Fits?",
      4: [
        "If recent access predicts what will be needed next, LRU is an easy place to start.",
        "If a small set of keys is read repeatedly, LFU may keep them longer; remember that old frequency counts may no longer reflect current demand.",
        "FIFO and Random can be simple, but they use less information about how entries are accessed.",
        "Production systems often use approximations to reduce tracking costs; a policy's name does not guarantee identical behavior across implementations.",
      ],
      5: "For example, recently viewed products may be viewed again soon, making LRU a reasonable first choice. LFU may help when a few products stay popular, but any policy can keep the wrong data or evict a key that is still needed. Evaluate hit rate for the workload, latency, and source load rather than choosing by algorithm name alone.",
      6: "Quick Self-Check",
      7: [
        "The cache has free space, but an entry reaches its TTL. Is that expiry or eviction?",
        "Why might LFU keep data that is no longer popular?",
      ],
    },
  },
  "sd-cache-invalidation": {
    title: "Cache Invalidation",
    module: "Caching",
    group: "Caching Fundamentals",
    summary:
      "Manage stale cache data with TTLs, delete-on-write, and protection against cache stampedes.",
    duration: "8 min",
    blockText: {
      0: "Consistency and Invalidation",
      1: [
        "TTL (time to live) limits how long an entry is considered fresh; reaching the TTL does not necessarily mean the entry is immediately removed from memory.",
        "Invalidation actively deletes or refreshes a copy. With cache-aside, a write usually updates the database and then deletes the cache entry. Because there is no shared transaction, a race between a read and write can still put stale data back in the cache.",
        "A cache stampede (thundering herd) happens when many requests miss the same hot key and all query the source. Request coalescing (single-flight) lets one request load the data for others; a bounded lock is another option.",
      ],
      2: "Combine Refresh and Invalidation Methods",
      3: "A cache is a copy of source data, so some staleness may be acceptable depending on the product. A TTL bounds how long data can remain fresh by configuration; deleting entries after writes and publishing an event or purge when data changes can refresh sooner, but each mechanism can be delayed or fail.",
      4: [
        "Add TTL jitter (a small random offset) so many entries do not expire at the same moment.",
        "Refresh early or use stale-while-revalidate: serve the old copy while one request refreshes it in the background, when the product allows it.",
        "Use negative caching to briefly cache a “not found” result and avoid repeated lookups for missing keys. A long TTL can hide data that has just been created.",
        "Track misses, refresh failures, data age, and source load; plan for failures of both the cache and the source.",
      ],
      5: "For example, if many requests ask for the same expired profile, single-flight lets one request read the database while the others share its result. This reduces a traffic surge but can make waiting requests slower. Stale-while-revalidate reduces waiting when briefly serving old data is acceptable.",
      6: "Quick Self-Check",
      7: [
        "How does a TTL differ from invalidation?",
        "When is stale-while-revalidate a poor fit for data that must be immediately accurate?",
      ],
    },
  },
  "sd-distributed-cache-architecture": {
    title: "Distributed Cache Architecture",
    module: "Caching",
    group: "Distributed Caching",
    summary:
      "Spread cache data across nodes with consistent hashing, replication, and hot-key handling.",
    duration: "8 min",
    blockText: {
      0: "When one cache is not enough, data is spread across many cache nodes—a distributed cache. Data is partitioned by key so each node holds only a share of it.",
      1: [
        "Consistent hashing: place both keys and nodes on a ring and map each key to the next node, so adding or removing a node moves only a fraction of the keys.",
        "Replication keeps copies on several nodes to improve availability or spread reads. A replica does not guarantee durability; with asynchronous replication, a recent write can be lost before it reaches the replica.",
        "A hot key receives a disproportionate share of requests; a big key holds a large value. Hot keys create request pressure, while big keys consume memory and bandwidth, so they need different remedies.",
      ],
      2: "Reduce Risks in a Distributed Cache",
      3: [
        "Consistent hashing limits how many keys move when nodes are added or removed, but does not eliminate misses while the partitioning changes.",
        "Replication can improve availability or read capacity. With asynchronous replication, there is a window in which the primary has accepted a write that a replica has not received yet.",
        "Caches usually hold data that can be rebuilt from a primary source; do not treat multiple replicas as durable backups unless the system explicitly guarantees that.",
        "When a node fails or a cache starts cold, misses can surge toward the database. Jitter, early refresh, controlled cache warming, load shedding (rejecting some requests under overload), and graceful degradation help protect the source.",
      ],
      4: "For example, a very popular article can be a hot key and overload a node even if its value is small; splitting reads across copies or adding a local cache may help. A key containing a huge list is a big key; splitting the data or limiting its size may be a better fit. Replication and extra cache layers can improve service capacity, but make refresh, freshness measurement, and failure handling more complex.",
      6: "Quick Self-Check",
      7: [
        "Does asynchronous replication completely eliminate the possibility of losing a recent write?",
        "How do hot keys and big keys put different kinds of pressure on a cache?",
      ],
    },
    codeText: {
      5: [
        "key → consistent hash → cache node\nnode failure / cold cache → misses → DB (protect with limits and gradual warming)",
      ],
    },
  },
  "sd-cdn": {
    title: "Content Delivery Network (CDN)",
    module: "Caching",
    group: "Distributed Caching",
    summary:
      "A content delivery network caches content at the edge, reducing latency and protecting the origin.",
    duration: "8 min",
    blockText: {
      0: "A CDN (Content Delivery Network) is a network of servers close to users that serves static content and often accelerates dynamic responses too. Cache dynamic content only when it is safe to share across requests and configured accordingly.",
      1: "Benefits",
      2: [
        "Reduce latency by serving content from the point closest to the user.",
        "Reduce load on the origin server.",
        "Absorb some traffic spikes and help mitigate certain attacks; a CDN is not a replacement for dedicated DDoS protection.",
      ],
      3: "Edge Caching",
      4: [
        "Control freshness with Cache-Control/TTLs and purge cached content when it changes.",
        "Query-string versioning (for example, ?v=2) works only if the query string is included in the CDN cache key; versioned filenames or paths are usually more reliable.",
      ],
      6: "The CDN serves a cache hit from the nearest edge. On a miss, it fetches the content from the origin, caches it at the edge, and returns it to the user.",
      7: "The Cache Key Determines a Hit",
      8: "An edge can reuse a cached response only when the request matches its cache key. The key usually includes the URL; depending on configuration, query strings, headers, or cookies may also be included. The Vary header can create content variants, for example by compression or language. Too many key components fragment the cache and reduce hits; leaving out a necessary component can serve the wrong response.",
      9: [
        "Cache-Control: public allows shared caching when other conditions permit; private is for a user's private cache, while no-store says not to store the response.",
        "s-maxage sets freshness for shared caches such as a CDN; it does not make personalized content safe to share.",
        "A version query string creates a different key only if the CDN includes that query string in its cache key. Versioned filenames or paths depend less on that configuration.",
        "Purge or invalidation removes content before its TTL expires; be clear about which keys and variants are affected.",
      ],
      10: "For example, a shared logo image can be publicly cached at a versioned path. An account page with private information must not be cached publicly; a misconfigured key could expose one user's response to another. Broad caching can increase hit rate and reduce origin load, but requires careful privacy and freshness checks.",
      11: "Quick Self-Check",
      12: [
        "Why might adding a cookie to the cache key reduce the hit rate?",
        "Is a personal account page suitable for a public shared cache?",
      ],
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
    module: "Database Scaling Techniques",
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
    module: "Database Scaling Techniques",
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
      6: "Fixed window vs sliding window",
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
  "sd-data-models": {
    title: "Choosing a Data Model: Relational, Document, or Key-Value",
    module: "Databases",
    summary: "Choose a data model based on your application's access patterns: relational tables for connected data, documents for self-contained records, and key-value stores for lookups by key.",
    duration: "11 min",
    blockText: {
      0: "Choosing a database is one of the earliest—and hardest to reverse—decisions in system design. The question is not “Which database is best?” but “Which data model fits the way the application actually queries its data?”",
      1: "By the end of this lesson, you should understand three common models—relational, document, and key-value—how they store data, which access patterns suit each one, and why a system may use several models at once.",
      2: "What is a data model?",
      3: "A data model defines how data is organized and queried. The same data can be represented as tables (relational), JSON documents, key-value pairs, or a graph. Each model makes some kinds of queries natural and others awkward.",
      4: "Relational: structured data with many relationships",
      5: "Relational databases store data in tables of rows and columns, queried with SQL. Their strength is handling relationships: one-to-many and many-to-many relationships map naturally to foreign keys and JOINs.",
      6: ["A good fit when data is highly related and queries need JOINs.", "A strict schema (schema-on-write) validates structure when data is written; the database rejects malformed data.", "Supports transactions and ACID guarantees—useful for financial records, orders, and inventory.", "Examples: PostgreSQL, MySQL, SQL Server."],
      7: "An order is related to several entities—users, orders, and products—and JOINs are a natural way to combine their data.",
      9: "Document: self-contained data in one document",
      10: "A document database stores each record as a potentially nested, self-contained document, usually in JSON or BSON. The core principle is: data that is usually accessed together should be stored together.",
      11: ["Read an entire data tree at once instead of joining multiple tables; locality can make this faster.", "A flexible schema (schema-on-read) leaves structure interpretation to the application when data is read.", "Works well for data with few relationships that resembles code objects, such as user profiles, posts, and product catalogs.", "Less suitable for densely connected many-to-many data, which often requires duplicated data or references.", "Example: MongoDB."],
      13: "Embed child data when it is always read with its parent; use references when the child data is queried independently or changes frequently.",
      14: "Key-value: look up data by key",
      15: "Key-value is the simplest model: a map from keys to values. The database optimizes two operations: get(key) to retrieve a value and put(key, value) to write one. It does not understand the value's internal structure.",
      16: ["Very fast lookups and straightforward horizontal scaling, because requests are made by key.", "Does not support complex queries (filtering by attributes or JOINs) without additional indexes—structures that enable other lookup patterns.", "You need to know the application's access patterns in advance to design suitable keys.", "Examples: Redis (cache/session) and DynamoDB."],
      17: "In DynamoDB, a primary key can consist of a partition key, which is hashed to determine where data is stored, and a sort key, which orders items within a partition. To support other query patterns, add a secondary index (GSI/LSI).",
      19: "Choose based on access patterns",
      20: "Start with the queries the application actually needs to run, not with technology names. These questions can help guide your choice:",
      21: ["Is child data always read with its parent? Yes → document; no → relational or separate tables.", "Are there many-to-many relationships? Yes → relational (or graph).", "Are query patterns known in advance and mostly key lookups? → key-value.", "Do you need strong consistency and transactions? → relational is often the safer choice.", "Does one data type frequently change shape? → document offers more flexibility."],
      22: "An application can combine models: relational for connected data (orders, payments), documents for self-contained data (profiles, posts), and key-value for key lookups (sessions, cache—a fast-access data store).",
      23: "Strict or flexible schemas?",
      24: "Relational databases usually use schema-on-write: define the structure first, and the database validates data on write. Document databases often use schema-on-read: the database does not enforce the structure, and the application interprets data when it is read. The trade-off: strict schemas catch errors early and can improve optimization; flexible schemas make change easier but move validation into application code. “Schemaless” is an imprecise term—the schema still exists; it simply is not declared explicitly.",
      25: "Quick recap",
      26: ["There is no best database for every situation; choose based on the application's access patterns.", "Relational: related data, JOINs, ACID. Document: self-contained data, flexible schema. Key-value: very fast lookups by key.", "Many real systems use polyglot persistence: the right model for each kind of data.", "Choosing a model is about data; scaling from one machine to many is covered in Database Scaling Techniques—see Sharding and Replication."],
    },
    codeText: {
      18: ["GET  user:42         → user profile\nPUT  session:abc123  → login session\n\nDynamoDB: (PK = USER#42, SK = ORDER#2026-01)\n           → user's orders by time"],
    },
    diagramText: {
      22: {
        nodes: { app: { label: "Application", sub: "queries follow access patterns" }, rel: { sub: "tables · JOINs · ACID" }, doc: { sub: "JSON · self-contained · flexible" }, kv: { sub: "get/put by key" } },
        edges: { "app-rel": { label: "relationships" }, "app-doc": { label: "read whole tree" }, "app-kv": { label: "lookup by key" } },
      },
    },
  },
  "sd-transactions-acid": {
    title: "Schemas, Transactions, ACID, and Isolation",
    module: "Databases",
    summary: "Compare schema-on-write with schema-on-read; learn how all-or-nothing transactions work, the four ACID properties, and why isolation has several levels.",
    duration: "12 min",
    blockText: {
      0: "Transferring 100,000 VND from account A to account B takes two steps: subtract from A, then add to B. If the system fails after the first step, the money may disappear. A transaction groups multiple steps into one indivisible unit.",
      1: "By the end of this lesson, you should understand whether a schema is checked on write or read, what transactions solve, the four ACID properties, and why there are different isolation levels.",
      2: "Schema: validate on write or on read?",
      3: "A schema describes the structure of data: its tables or collections, columns or fields, data types, and constraints (for example, that an email must be unique). Validation can happen at two different times.",
      4: ["Schema-on-write: the database validates data as it is written and rejects malformed data. This is common in relational databases. It catches errors early and keeps data consistent, but structural changes require a migration to update the schema and data.", "Schema-on-read: the database accepts data as provided, and the application interprets it when reading. Many document stores use this approach. It makes structural changes easier, but data problems may surface later and multiple shapes may coexist."],
      5: "Both approaches involve trade-offs: schema-on-write validates during writes; schema-on-read shifts validation into application code each time data is read.",
      6: "What is a transaction?",
      7: "A transaction groups multiple read/write operations into an all-or-nothing unit: either all succeed or none take effect. Other transactions cannot see its intermediate states.",
      8: "When transferring money, both updates belong in the same transaction:",
      10: "The four ACID properties",
      11: ["Atomicity: all-or-nothing—either every operation takes effect or none does. If an error occurs partway through, the database rolls back the transaction.", "Consistency: a transaction moves the database from one valid state to another while respecting constraints. This meaning differs from the C in CAP.", "Isolation: concurrent transactions do not see one another's unfinished changes; the result is equivalent to running them one at a time.", "Durability: once a transaction commits, its data is stored persistently (often through a write-ahead log on disk) and survives system failures."],
      12: "In PostgreSQL, each SQL statement also runs in an implicit transaction by default.",
      13: "Isolation and anomalies",
      14: "Perfect isolation is equivalent to serial execution (serializable), but it can be expensive. SQL defines four isolation levels; each prevents some anomalies caused by concurrent transactions.",
      15: ["Dirty read: reading data that another transaction has not committed yet—and may still roll back.", "Non-repeatable read: reading the same row twice in one transaction and getting different values because another transaction committed between the reads.", "Phantom read: rerunning a query with the same condition returns a different set of rows because another transaction inserted matching rows.", "Serialization anomaly: the committed result does not correspond to any serial ordering (for example, write skew)."],
      16: "The four isolation levels, from weakest to strongest:",
      17: ["Read uncommitted: allows dirty reads. PostgreSQL treats this as Read committed.", "Read committed: PostgreSQL's default. Prevents dirty reads, but non-repeatable and phantom reads can still occur.", "Repeatable read: a transaction sees a stable snapshot. PostgreSQL also prevents phantom reads (stronger than the standard's minimum), but serialization anomalies can still occur.", "Serializable: the strongest level, simulating serial execution. A transaction may be aborted with a serialization failure, so the application must retry."],
      18: "For example, two doctors are on call. Each transaction checks that “at least two doctors are on call” and then lets one doctor leave. Each transaction is valid on its own, but if both run concurrently, nobody may remain on call. Only Serializable detects this case because the result cannot correspond to any serial ordering.",
      19: "One notable difference between databases: PostgreSQL defaults to Read committed, while MySQL's InnoDB defaults to Repeatable read.",
      20: "The four isolation levels prevent progressively more anomalies, but at increasing cost and with more potential retries. Serializable is the only level that prevents serialization anomalies.",
      21: "Trade-offs",
      22: "Higher isolation reduces anomalies but increases lock contention, reduces concurrency, and raises retry rates. Many applications work well with Read committed. For complex business rules spanning multiple rows, consider Serializable and handle retries rather than patching the problem with manual locks.",
      23: "Quick recap",
      24: ["Schema-on-write validates on write (relational); schema-on-read validates on read (document).", "A transaction is an all-or-nothing unit; ACID stands for Atomicity, Consistency, Isolation, and Durability.", "The isolation levels progressively prevent dirty reads, non-repeatable reads, phantom reads, and serialization anomalies.", "Higher isolation limits anomalies but may reduce concurrency; Serializable may require retries."],
    },
    codeText: {
      9: ["BEGIN;\nUPDATE accounts SET balance = balance - 100000 WHERE id = 'A';\nUPDATE accounts SET balance = balance + 100000 WHERE id = 'B';\nCOMMIT;     -- both succeed\n-- ROLLBACK; -- or both are rolled back"],
    },
    diagramText: {
      20: {
        nodes: { ru: { sub: "dirty reads possible" }, rc: { sub: "PostgreSQL default" }, rr: { sub: "stable snapshot" }, se: { sub: "serial execution · retries possible" } },
        edges: { "ru-rc": { label: "stronger" }, "rc-rr": { label: "stronger" }, "rr-se": { label: "stronger" } },
      },
    },
  },
  "sd-indexes-queries": {
    title: "Indexes, Queries, and the Read/Write/Storage Trade-off",
    module: "Databases",
    summary: "Learn how indexes replace full table scans with logarithmic lookups, how B-trees, composite indexes, and the leftmost-prefix rule work, and how indexes trade read speed for write speed and storage.",
    duration: "12 min",
    blockText: {
      0: "Without an index, the database must scan the entire table and check each row to find matching data. That is negligible for 100 rows but can be expensive for 100 million. An index is a supporting structure that speeds up reads at the cost of slower writes and extra storage.",
      1: "By the end of this lesson, you should understand indexes, how B-trees support queries, the leftmost-prefix rule for composite indexes, covering indexes, and when not to add an index.",
      2: "Why do we need indexes?",
      3: "Without an index, a database performs a full table scan: it checks each row, taking O(n) time. With an index, it traverses a search tree to quickly find matching rows in O(log n) time. PostgreSQL compares an index to the index at the back of a thick book.",
      4: "B-tree: the default index type",
      5: ["A B-tree (usually a B+ tree in practice) is balanced: every leaf node is at the same depth, so lookups take O(log n).", "Keys are sorted and leaf nodes are linked, making range scans and ordered results efficient.", "Supports equality (=), range comparisons (<, >, BETWEEN), and ORDER BY.", "The default index type in PostgreSQL and MySQL/InnoDB."],
      7: "Composite indexes and the leftmost-prefix rule",
      8: "A composite index orders data by its declared columns. It works best when a query includes the leftmost column.",
      10: ["An index on (a, b, c) supports queries on (a), (a, b), or (a, b, c)—but not queries on (b) or (c) alone.", "A common rule of thumb: put equality-filtered columns first, then columns used for range queries.", "A wrong column order is a common mistake: a query may not use the index and may have to scan the whole table."],
      11: "Covering indexes",
      12: "If an index contains every column a query needs—both its filters and its returned columns—the database can answer directly from the index without reading the table (an index-only scan). This helps frequent queries but makes the index larger and writes slower.",
      13: "The read, write, and storage trade-off",
      14: ["Reads: faster when query conditions match an index; without a suitable index, the database must scan the entire table.", "Writes: every INSERT/UPDATE/DELETE must update the relevant indexes. More indexes mean slower writes (write amplification: additional write work).", "Storage: indexes take disk space; their total size can exceed the table's size.", "Maintenance: indexes can fragment over time and need vacuuming or rebuilding; more indexes also give the query planner more options to consider."],
      15: "Storage differs by database. In InnoDB/MySQL, the primary (clustered) index is the table itself, ordered by primary key. Secondary indexes contain the primary key and need an extra lookup to fetch a row, so a short primary key keeps them smaller. PostgreSQL stores the table separately from its indexes (the heap); secondary indexes point to row locations.",
      16: "With an index, the query traverses a B-tree (~log n pages) and fetches the matching row; without one, the database scans the table row by row (O(n)).",
      17: "When not to add an index",
      18: ["A column with low cardinality, such as a boolean or a status with three values: the index filters out very little.", "A small table: a full table scan is already faster than traversing an index.", "A column that never appears in WHERE, JOIN, or ORDER BY.", "A duplicate index: if (a, b) already exists, a separate index on (a) is often redundant."],
      19: "How this connects to Database Scaling Techniques",
      20: "Indexes help a single database answer queries faster, but they cannot make its data exceed the limits of one machine. When a node can no longer handle the data or traffic, we distribute data across nodes (sharding) and replicate it to improve read capacity and fault tolerance. These topics are covered in the Database Scaling Techniques module—continue with Sharding and Replication.",
      21: "Quick recap",
      22: ["Indexes use extra storage and slow writes to speed up reads: O(log n) instead of O(n).", "B-tree is the default index type and supports equality, range queries, and sorting.", "Composite indexes follow the leftmost-prefix rule: an index on (a, b, c) supports queries on a, (a, b), and (a, b, c).", "A covering index can answer a query directly; avoid creating indexes indiscriminately."],
    },
    codeText: {
      9: ["CREATE INDEX idx_orders_user_time ON orders (user_id, created_at);\n\n-- supported:\n--   WHERE user_id = 42\n--   WHERE user_id = 42 AND created_at > '2026-01-01'\n\n-- NOT efficient (leftmost column is missing):\n--   WHERE created_at > '2026-01-01'"],
      6: ["Simplified B-tree:\n            [ 50 ]\n          /        \\\n      [10 30]     [70 90]     ← internal nodes: route the search\n      /  |  \\      /  |  \\\n    leaf leaf leaf leaf leaf leaf   ← leaves: keys + pointers to rows\n\neach lookup visits only a few levels, not the whole table"],
    },
    diagramText: {
      16: {
        nodes: { query: { label: "Query" }, index: { sub: "lookup ~log n" }, row: { label: "Row", sub: "fetch matching row" }, table: { label: "Full table", sub: "scan O(n), row by row" } },
        edges: { "query-index": { label: "with index" }, "index-row": { label: "points to row" }, "query-table": { label: "no index" } },
      },
    },
  },
  "sd-consistency-models": {
    title: "Consistency Models",
    module: "Distributed Systems",
    summary: "From linearizability to eventual consistency, learn what each model guarantees and how to choose one based on business requirements.",
    duration: "9 min",
    blockText: {
      0: "A consistency model is a contract describing what clients may observe when they read and write replicated data. It answers a more specific question than CAP: which values can a read return, and in what order?",
      1: "How this relates to CAP and PACELC",
      2: ["CAP (see sd-cap) describes a system's choice during a network partition: a CP system rejects some requests to preserve consistency; an AP system continues responding but may return stale data.", "PACELC adds that even without a partition (Else), a system still trades off latency and consistency.", "Consistency models go further: they specify exactly which operation histories a system may produce—that is, what clients see and in what order."],
      3: "Linearizability: strong consistency",
      4: "Linearizability is one of the strongest models for a single object. Each operation appears to take effect atomically at some point between its invocation and response. The order must respect real time: if A completes before B starts, B must see A's result.",
      5: ["As a result, a read always sees the latest successful write—there are no stale reads.", "Trade-off: nodes must coordinate through consensus or read/write quorums, increasing latency and reducing availability during a network partition (CP under CAP).", "The scope of an “object” depends on the system: linearizability per key does not imply linearizability across multiple keys. For guarantees across objects, see strict serializability."],
      6: "Eventual consistency",
      7: "Eventual consistency makes one promise: if no more writes occur, all replicas will converge on the same latest value after an unspecified amount of time. Before they converge, replicas may return stale data.",
      8: ["It does not specify a convergence time or guarantee read order: a client may see a new value and then an old one, as if time had gone backward.", "High availability, partition tolerance, and low latency make it suitable for feeds, product catalogs, and view counters.", "It is unsuitable for account balances, inventory, or duplicate checks, where stale data can cause business errors."],
      9: "Useful models in between",
      10: ["Causal consistency preserves cause-and-effect order: anyone who sees a cause also sees its effect, while concurrent writes may be observed in different orders.", "Read-your-writes: users always see changes they made themselves.", "Monotonic reads: a client never sees data move back to an older version."],
      11: "Reading stale data",
      12: "For example, you change your profile picture, reload the page, and still see the old one. The write reached the leader, but the next read went to a follower that had not caught up yet (replication lag). This is a typical stale read in an AP system.",
      13: ["The fix depends on the requirement: for read-your-writes, route the writer's reads to the leader or require a minimum version; for monotonic reads, keep each user on the same replica; otherwise wait for replication or use a stronger read quorum.", "Bounded staleness guarantees that data is no more than a limit—such as a few seconds or a number of versions—behind. This is a common compromise."],
      14: "Which model should you choose?",
      15: "The key question is not “Which model is strongest?” but “How much inconsistency can clients tolerate?” Is data being a few seconds old acceptable? Could one incorrect result lose money? If some staleness is acceptable, eventual consistency or bounded staleness can reduce latency and improve availability. Otherwise, use linearizability or a higher-level transaction.",
      17: "The stronger the model (higher in the diagram), the more coordination nodes need: latency rises and availability during partitions falls. Lower down, availability improves, but clients may see stale data.",
    },
    codeText: { 16: ["Linearizable:  write(x = 1) → read() == 1        (always sees the latest write)\nEventual:      write(x = 1) → read() may == 0    (stale value), then later == 1"] },
    diagramText: {
      17: {
        nodes: { strong: { sub: "strongest · requires coordination" }, middle: { sub: "preserves causality · may still be stale" }, eventual: { label: "Eventual consistency", sub: "converges · reads may be stale" } },
        edges: { "strong-middle": { label: "weaker → more available" }, "middle-eventual": { label: "weaker → more available" } },
      },
    },
  },
  "sd-timeouts-retries-idempotency": {
    title: "Timeouts, Retries, and Idempotency",
    module: "Distributed Systems",
    summary: "Learn to set timeouts, retry with exponential backoff and jitter, and use idempotency for safe retries—exactly-once delivery cannot be guaranteed.",
    duration: "10 min",
    blockText: {
      0: "A network call can fail temporarily because of a timeout, packet loss, or an overloaded service. Three basic tools for handling these failures are timeouts, retries with backoff and jitter, and idempotency. The key point: retries do not guarantee exactly-once processing; they are safe only when the operation is idempotent.",
      1: "Timeouts: stop waiting instead of waiting forever",
      2: "Without a timeout, a stalled dependency holds threads and connections until resources run out—a resource-exhaustion failure that can trigger cascading failures. On the other hand, a timeout that is too short may interrupt normal requests.",
      3: ["Set a timeout on every network call: long enough for most requests to succeed, but short enough to avoid holding resources for too long.", "Deadline propagation: set a deadline at the top level (the frontend) and pass it down; each layer subtracts the time already spent. Servers should check the deadline before each step so they do not keep working after the client has given up.", "When a client cancels a request, cancel downstream work too, to free resources."],
      4: "Retries and the risk of a retry storm",
      5: "Retries can recover from random, transient failures. But if the cause is overload, each retry adds more load: as the system fails, it receives even more retries, creating a positive feedback loop (a retry storm or error amplification).",
      6: ["Retry only transient failures, such as timeouts, 429, and 503. Do not retry errors that will not fix themselves, such as 400, 401, and 422—a retry will not make the request succeed.", "Limit the number of retries and total retry time; set a retry budget, such as at most X retries per minute across the whole process.", "Avoid retries nested across multiple layers: attempts can multiply exponentially (see the diagram). If retries are limited, honor the Retry-After header."],
      7: "Exponential backoff + jitter: wait longer, and spread out retries",
      8: "Instead of retrying immediately, a client waits longer after each failure—exponential backoff—up to a maximum delay (a cap). If all clients use the same schedule, they retry together and create another spike. Adding randomness (jitter) spreads out retry times.",
      10: ["Full jitter: sleep = random(0, min(cap, base × 2^attempt))—spreads delays across the entire range and effectively reduces synchronized load.", "Equal jitter: keep half the backoff delay fixed, then randomize the other half to avoid excessively short waits.", "Decorrelated jitter: gradually widen a random delay range based on the previous delay, spreading retry times further.", "These approaches do not change how many operations need processing, but they greatly reduce synchronized load and completion time."],
      11: "Idempotency: make retries safe",
      12: "An operation is idempotent if repeating it produces the same result or effect as doing it once. This makes retries safe from duplicate side effects, such as creating two orders or charging twice.",
      13: ["In HTTP, GET, PUT, and DELETE are defined as idempotent; POST is not (RFC 9110). Do not automatically retry POST unless you have handled idempotency.", "An idempotency key: the client creates a unique key (such as a UUID) for each operation; the server stores the key with the result and returns that result for duplicate requests.", "Saving the key and changing the data must be atomic, to avoid saving the key without creating the resource—or the reverse.", "Define how long keys are kept (usually in line with the resource's lifetime). If the same key arrives with different parameters, return a validation error rather than merging two different intentions."],
      15: "What to remember: exactly-once cannot be promised",
      16: ["After a timeout, you do not know whether the operation ran: the request may have reached the server and completed, while the response was lost. A timeout does not mean the operation failed.", "Retries provide at-least-once delivery. Combined with an idempotent operation, server-side effects can be “effectively once”—in practice, an order is created only once—or at-most-once at the effect level.", "An absolute exactly-once guarantee is extremely hard to achieve in a distributed system. In practice, idempotency simulates this behavior; retries alone do not."],
      17: "A client request can multiply into many attempts when retries are nested across layers (3 × 3 × 3 ≈ 27). During overload, retries can turn a small incident into a system-wide failure.",
    },
    codeText: {
      9: ["import random\n\ndef delay(attempt: int, base: float = 0.1, cap: float = 10.0) -> float:\n    # Full jitter: random delay in [0, backoff]\n    backoff = min(cap, base * (2 ** attempt))\n    return random.uniform(0, backoff)"],
      14: ["POST /orders              # create an order — NOT idempotent\nIdempotency-Key: 7f3c...  # generated by the client\n\nserver:\n  if seen(key): return stored_response   # duplicate request\n  result = create_order(...)             # within one transaction\n  store(key, result)\n  return result"],
    },
    diagramText: {
      17: {
        nodes: { client: { sub: "one request" }, frontend: { sub: "3 retries" }, backend: { sub: "3 retries" }, database: { sub: "up to ~27 attempts" } },
        edges: { "client-frontend": { label: "one request" }, "frontend-backend": { label: "3 attempts" }, "backend-database": { label: "3 per failure" } },
      },
    },
  },
  "sd-failure-detection": {
    title: "Failure Detection and Health Checks",
    module: "Distributed Systems",
    summary: "Detect failed nodes in distributed systems with heartbeats, timeout thresholds, liveness and readiness checks, while avoiding false positives.",
    duration: "8 min",
    blockText: {
      0: "Before traffic can be moved away from a failed node, the system has to detect the failure. But in an asynchronous network, there is no way to know for certain whether a node has died or is simply slow—or whether the network is slow.",
      1: "Why is failure detection hard?",
      2: "Because message delivery has no fixed time limit, any judgment based on a timeout can be wrong in either direction: a false positive reports a healthy node as failed; a false negative fails to detect a dead node.",
      3: ["False positives are especially dangerous: a healthy node is removed from the pool, pushing more load onto the remaining nodes and potentially triggering a cascading failure.", "So do not conclude that a node has failed based on a single timeout; consider repeated failures, elapsed time, and an appropriate threshold."],
      4: "Common mechanisms",
      5: ["Heartbeat: a node sends a periodic signal. If none arrives within the threshold, the system marks the node as suspect (using a pull or push approach).", "Use a threshold for consecutive failures over a time window to avoid repeated up/down transitions (flapping) when the network is unstable.", "A phi-accrual failure detector reports a continuously valued suspicion level rather than true/false, adapting to network conditions. It is used in systems such as Cassandra and Akka.", "Gossip: nodes spread information about one another's status across the cluster without a central coordinator."],
      6: "Health checks: liveness and readiness",
      7: ["Liveness asks whether the process is still responding. If not, restart it.", "Readiness asks whether an instance has finished starting and its critical dependencies are working well enough to serve traffic. If not, remove it from the load balancer, but do not restart it.", "Keep these signals separate: a shared dependency failure should not cause every instance to restart."],
      8: "Shallow and deep checks",
      9: ["A shallow check only confirms that the process responds; it does not call dependencies. It is inexpensive and suitable for liveness.", "A deep check also checks critical dependencies (DB, cache), making it suitable for readiness.", "Warning: a deep check that calls network dependencies on every probe can create false positives and make monitoring itself a source of failure. Bound each dependency timeout, use a circuit breaker for unstable dependencies, and report “degraded” rather than “unhealthy” when a noncritical dependency fails."],
      10: "Implementation principles",
      11: ["Probes should be lightweight, read-only, and must not modify production data; use separate endpoints for liveness and readiness.", "Base alerts on SLOs and critical flows, not on individual probes.", "If a shared dependency fails, do not let the load balancer remove every instance—instead, degrade functionality in a controlled way at the application layer (see the next lesson)."],
      13: "Return 200 from /healthz/live if the process is running (without checking dependencies); return 200 from /healthz/ready if the DB and cache are OK, otherwise 503.",
      14: "A liveness probe checks only the application process; readiness also checks critical dependencies. Do not let an unstable dependency in a deep check cause healthy instances to be removed.",
    },
    codeText: { 12: ["GET /healthz/live  → 200 if the process is running (does not check dependencies)\nGET /healthz/ready → 200 if DB + cache are OK; otherwise 503"] },
    diagramText: {
      14: {
        nodes: { live: { sub: "detects a stalled process" }, ready: { sub: "ready to receive traffic" }, app: { label: "App instance" }, db: { sub: "critical dependency" } },
        edges: { "live-app": { label: "process only" }, "ready-app": { label: "checks dependencies" }, "app-db": { label: "readiness checks DB" } },
      },
    },
  },
  "sd-cascading-failures": {
    title: "Circuit Breakers, Bulkheads, and Graceful Degradation",
    module: "Distributed Systems",
    summary: "Prevent cascading failures with circuit breakers, bulkheads, load shedding, and graceful degradation or fallbacks.",
    duration: "10 min",
    blockText: {
      0: "A cascading failure occurs when one failing component overloads another, which then fails too, creating a positive feedback loop. A common cause is overload, often made worse by retries. Circuit breakers, bulkheads, and graceful degradation help stop this spiral.",
      1: "Circuit breakers",
      2: "A circuit breaker is a proxy placed in front of a dependency that often fails. It counts recent failures; once they pass a threshold, the circuit “opens” and requests fail fast instead of waiting for a timeout, which prevents resources from being tied up.",
      3: ["Closed: allow requests through and count failures. Once the threshold is exceeded, move to Open.", "Open: fail requests immediately and wait through a cooldown so the dependency can recover. Then move to Half-Open.", "Half-Open: allow a small number of requests through as a test. If they succeed, return to Closed; if they fail, return to Open.", "A circuit breaker is not a retry: retries try again in the hope that an operation will succeed; a breaker blocks calls that are almost certain to fail. When combining them, stop retrying if the breaker reports a non-transient failure. You also need observability and a way to reset the breaker manually.", "Be careful when sharing a breaker across independent shards or tenants: one shard's failure could trip the breaker for healthy shards too."],
      4: "A circuit breaker is a state machine: it counts failures in Closed, trips in Open, and cautiously allows retries in Half-Open before closing again.",
      5: "Bulkheads",
      6: "A bulkhead divides resources into isolated compartments (thread pools, connection pools, queues, or instances), so one flooded compartment cannot bring down the whole system. The idea is inspired by bulkheads on ships.",
      7: ["Consumer bulkhead: dedicate a connection or thread pool to each dependency so a stalled service cannot consume the pools used by other services.", "Service bulkhead: run each tenant or user group on a separate instance or queue (cell-based architecture) to isolate the impact.", "Trade-off: better isolation uses resources less efficiently and makes operations more complex."],
      8: "Graceful degradation and fallbacks",
      9: "Instead of failing completely, a system can return a less complete but still useful result: serve stale cached data, disable a secondary feature, or use a cheaper computation. The goal is to keep core functionality working.",
      10: ["Load shedding: deliberately reject some requests as the system approaches overload (often with a 503) to prioritize important requests.", "Fallback: use a default value, stale cached data, or an alternate path. A fallback must make sense for the business; incorrect data is worse than an error.", "Warning: a degraded code path runs rarely and can hide bugs. Test it regularly, keep it simple, and have a quick way to disable it if it triggers further failures."],
      11: "Combine multiple layers of protection",
      12: ["Timeouts, retries (backoff + jitter), circuit breakers, bulkheads, and fallbacks complement one another; none is a substitute for the others.", "Track failure rates, breaker trips, and fallback rates to detect incidents early.", "Avoid retries within the same layer (intra-layer); they add dependencies. Usually, let the client retry the correct node.", "Related topics: availability (sd-availability) and SPOF (single point of failure, sd-single-point-of-failure) cover eliminating single points of failure; this lesson focuses on keeping the system running when part of it has already failed."],
      13: "When the circuit breaker trips for Dependency A, the service does not wait for a timeout; it uses the cache fallback instead. Meanwhile, bulkheads let Dependency B continue operating independently.",
    },
    diagramText: {
      4: {
        nodes: { closed: { sub: "pass through · count failures" }, open: { sub: "fail fast · cooldown" }, "half-open": { sub: "test a few requests" } },
        edges: { "closed-open": { label: "failure threshold exceeded" }, "open-half": { label: "cooldown ends" }, "half-closed": { label: "test succeeds" }, "half-open-again": { label: "test fails" } },
      },
      13: {
        nodes: { "dep-a": { sub: "failure · breaker Open" }, fallback: { sub: "stale result" }, "dep-b": { sub: "healthy" } },
        edges: { "gw-service": { label: "request" }, "service-dep-a": { label: "call" }, "service-fallback": { label: "A failed: degrade" }, "service-dep-b": { label: "call" } },
      },
    },
  },
  "sd-monolith-modular-microservices": {
    title: "Monoliths, Modular Monoliths, and Microservices",
    module: "Architecture Patterns",
    summary: "Compare three ways to organize code into deployment units—monoliths, modular monoliths, and microservices—and learn their trade-offs and when not to split a system.",
    duration: "11 min",
    blockText: {
      0: "These three architectural patterns answer the same question: how many units is an application packaged and deployed as, and how clearly are its internal parts separated?",
      1: "Do not equate “monolith” with “messy code”: a monolith can be divided into well-defined modules. Conversely, multiple services can be coupled so tightly that they become a “distributed monolith.” Distinguish the deployment unit from the degree of modularity within it.",
      2: "Three patterns along two dimensions",
      3: ["Monolith: one deployment unit, often sharing one database. It is easy to start with, but tightly coupled parts can turn the code into a “big ball of mud” over time.", "Modular monolith: still one deployment unit, but the code is divided into clearly bounded business-domain modules, such as customers, orders, and notifications.", "Microservices: multiple independently deployed units; each service owns a business capability and usually has its own database (database per service)."],
      4: "The key difference between a modular monolith and microservices is not whether the code is modular, but how boundaries are enforced: within one process or across a network between processes.",
      5: "One progression: monolith → modular monolith (business modules within one process) → microservices (separate, independent processes).",
      6: "Trade-offs",
      7: ["Deployment: monoliths and modular monoliths deploy as one unit. Microservices can be deployed independently, but need more infrastructure (service discovery, a gateway, and observability).", "Scaling: only microservices let you scale each service according to its needs; a monolith must be scaled as a whole.", "Team autonomy: microservices let teams deploy independently. A modular monolith gives teams more autonomy in one codebase, but they still share a pipeline.", "Data consistency: a shared database makes ACID transactions simpler; separate databases lead to distributed transactions and eventual consistency (see Saga/Outbox).", "Operational cost: more services mean more components to monitor, deploy, and debug—and network-call failures instead of function-call failures."],
      8: "The distributed-monolith trap",
      9: "If you split a system into multiple services but they still call one another synchronously in chains, share a database, and must be deployed together, you get the cost of a distributed system without the benefits of microservices. This is a distributed monolith, also called a “distributed big ball of mud.”",
      10: "What should you choose, and when should you avoid microservices?",
      11: "Choose microservices for specific benefits (independent deployment, scaling individual parts, greater team autonomy), not because the current codebase is messy. Ask yourself: if you have not built a well-structured monolith, why expect microservices to be better?",
      12: ["A new product, an unclear domain, or a small team: a monolith or modular monolith is usually a better starting point.", "No need for independent deployment or scaling: a distributed system adds cost without a corresponding benefit.", "No operational capabilities yet (CI/CD, monitoring, centralized logging): microservices will increase costs.", "Strong consistency across multiple entities is required: one shared database with local transactions is much simpler."],
      13: "Gateways and cross-cutting concerns such as authentication and rate limiting are covered elsewhere in the course. For now, remember that they are supporting infrastructure for service separation, not reasons to split a system.",
      14: "Quick recap",
      15: ["Monolith = one deployment unit; modular monolith = one unit with business modules; microservices = multiple independent units.", "Do not equate monoliths with messy code or assume that microservices are automatically better.", "Splitting services introduces distributed-data problems and operational costs.", "A distributed monolith is the worst of both worlds: plenty of complexity, without enough benefit."],
    },
    diagramText: {
      5: {
        nodes: { mono: { sub: "1 deployment unit" }, modular: { sub: "1 unit · clear modules" }, micro: { sub: "n independent units" } },
        edges: { "mono-modular": { label: "separate business modules" }, "modular-micro": { label: "separate processes" } },
      },
    },
  },
  "sd-sync-async-event-driven": {
    title: "Synchronous and Asynchronous Communication (Event-Driven)",
    module: "Architecture Patterns",
    summary: "Compare synchronous calls with asynchronous broker-based communication, commands with events, common event patterns, and when event-driven architecture is unnecessary.",
    duration: "11 min",
    blockText: {
      0: "When components need to coordinate, there are two basic communication styles: synchronous and asynchronous. The wrong choice can tightly couple them or add unnecessary complexity.",
      1: "Synchronous communication",
      2: "In synchronous communication, the caller sends a request and waits for a response. For example, A calls B over HTTP and continues only after the response arrives.",
      3: ["Tightly coupled at runtime: A and B must both be available while the request is being processed.", "Failures can cascade: if B is slow or fails, A may become slow or fail too.", "Timeouts, retries, and circuit breakers are needed to isolate failures.", "Suitable for queries that need an immediate result or flows where the next step depends on the previous result."],
      4: "You can reduce wait time by running independent synchronous calls in parallel instead of making them one after another.",
      5: "Asynchronous communication",
      6: "In asynchronous communication, the sender puts a message or event on an intermediary (a message broker) and continues. The receiver processes it when ready. The broker buffers messages if a consumer is slow or temporarily unavailable, so both sides do not need to be active at the same time.",
      7: ["Loosely coupled at runtime: the producer does not depend on whether a consumer is currently running.", "Buffering absorbs traffic spikes; the broker holds messages and can improve availability.", "The trade-off is a dependable broker and the need to handle delivery guarantees (at-least-once), ordering, and duplicate messages."],
      8: "Delivery guarantees and dead-letter queues are covered in the message-queue lesson; this lesson focuses on the two communication styles that use them.",
      9: "Commands, events, and event patterns",
      10: "Distinguish two kinds of message. A command means “do this”: it expresses an intention, can be rejected, and usually targets one recipient. An event means “this happened”: it records something in the past, cannot be rejected, and may interest multiple consumers.",
      11: "Martin Fowler describes several common event patterns. Knowing the terms helps avoid ambiguity in design:",
      12: ["Event notification: a brief “something changed” message with little data; consumers query the source for details. This reduces coupling but makes the flow harder to follow.", "Event-carried state transfer: an event includes enough data for consumers to update their own copies, reducing dependencies and read latency.", "Event sourcing: record every state change as a sequence of events. The event log is the source of truth, and state is rebuilt from it.", "CQRS: separate the read model from the write model. CQRS does not require events, but is often combined with event sourcing."],
      13: "A common trap is using an event as a “disguised command”: the sender is really asking a receiver to do a specific task. In that case, send a command to make the intent and flow clearer.",
      14: "Trade-offs",
      15: ["Consistency: asynchronous communication often leads to eventual consistency; data across components may be temporarily out of sync.", "Debugging: the flow is not visible in the call stack; correlation IDs, tracing, and centralized logs are needed to follow it.", "Ordering and duplicates: messages may arrive out of order or more than once; consumers need idempotent handling.", "Operations: the broker is an additional component to monitor and keep available."],
      16: "When not to use event-driven architecture",
      17: ["A simple request/response flow where low latency matters and synchronous communication already meets the need.", "An immediate result and strong consistency are required; an intermediate state is unacceptable.", "The team lacks monitoring or tracing infrastructure, so the operational cost would outweigh the benefit.", "There is only one producer and one consumer, with no need for buffering or decoupled processing times."],
      18: "Synchronous: Service A waits for Service B throughout the request, creating a runtime dependency. Asynchronous: A puts a message on the broker and continues; B processes it when ready.",
      19: "Quick recap",
      20: ["Synchronous = call and wait, with tight runtime coupling. Asynchronous = use a broker, with loose coupling but eventual consistency and added complexity.", "A command expresses intent; an event records something that has happened.", "Asynchronous communication is not free: handle idempotency, ordering, and tracing.", "Do not use event-driven architecture for a simple flow that needs immediate consistency."],
    },
    diagramText: {
      18: {
        nodes: { sc: { label: "Client" }, sa: { label: "Service A" }, sb: { label: "Service B" }, ac: { label: "Client" }, aa: { label: "Service A" }, q: { sub: "queue / topic" }, ab: { label: "Service B" } },
        edges: { "sc-sa": { label: "request" }, "sa-sb": { label: "call & wait" }, "ac-aa": { label: "request" }, "aa-q": { label: "publish" }, "q-ab": { label: "consume when ready" } },
      },
    },
  },
  "sd-saga-outbox": {
    title: "Saga and Transactional Outbox",
    module: "Architecture Patterns",
    summary: "Two patterns for cross-service data: Outbox reliably publishes messages; Saga maintains consistency through a sequence of local transactions and compensating transactions.",
    duration: "12 min",
    blockText: {
      0: "When each service has its own database, a business operation spanning several services cannot fit inside one ACID transaction. This lesson introduces two patterns for handling that problem and explains when not to use them.",
      1: "Why distributed transactions are hard",
      2: "With a database-per-service model, you cannot open one transaction across multiple databases. Two-phase commit (2PC) can do this in theory, but is usually avoided in microservices: it is a synchronous protocol that requires all participants to be available and tightly coupled—the very things we want to limit.",
      3: "Transactional Outbox: reliably publish messages",
      4: "The problem is that a service needs to update its database and send a message or event. If it commits the database first and then sends the message, it can fail between the two steps and lose the message. If it sends the message before the transaction commits, the transaction may roll back after the message has already been sent.",
      5: "Transactional Outbox solves this by writing the message to an outbox table in the same transaction as the business data. Since both writes belong to one transaction, they either both commit or both roll back. A separate process (the message relay) then reads the outbox and publishes messages to the broker.",
      6: ["Guarantee: a message is sent only if the transaction commits; messages are sent in the order the application wrote them.", "The relay may publish a message more than once (for example, if it fails after publishing but before marking it as sent), so consumers must handle messages idempotently.", "Two relay approaches are polling publishers (periodically scanning the outbox table) and transaction-log tailing/CDC (tracking database logs, for example with Debezium)."],
      7: "On the consumer side, the corresponding pattern is Inbox: record that a message was processed along with its business effect in one transaction, so duplicate messages can be handled safely.",
      8: "The service writes business data and an event to the outbox in the same transaction; a relay reads the outbox and publishes to the broker. No 2PC is needed.",
      9: "Saga: a long-running transaction made of local transactions",
      10: "A Saga replaces a distributed transaction with a sequence of local transactions. Each step updates one service's database, then emits a message or event to trigger the next step. If a step fails because a business rule is violated, the Saga runs compensating transactions to offset the steps that already completed.",
      11: ["Choreography: services exchange events without a central coordinator. This is simple with a few steps, but the flow becomes hard to follow as the number grows.", "Orchestration: an orchestrator manages the sequence, sends commands to participants, receives responses, and chooses the next step. The flow is clearer, but the orchestrator must be durable and must not become a single point of failure."],
      12: "Sagas are often paired with Outbox: each step needs to update its database and emit an event atomically—the Outbox problem described above.",
      13: "Saga trade-offs",
      14: ["No automatic rollback: unlike ACID, changes have already been committed, so you must write compensating transactions yourself.", "No isolation: concurrent Sagas may see intermediate data; additional measures such as semantic locks or versioning may be needed.", "Eventual consistency: intermediate states can persist. Sagas fit this model better than requirements for strong consistency.", "Harder debugging: logic is spread across components, and more steps make the flow harder to trace.", "Idempotent handling is required: retries and compensating transactions may run more than once."],
      15: "When not to use Saga or Outbox",
      16: ["An operation involves only one service and one database: use a local ACID transaction; no Saga is needed.", "Failures are mostly transient: retries with backoff may be enough; compensating transactions would only add complexity.", "The system cannot accept intermediate states or cannot recover to a valid state: use a strong-consistency mechanism instead of a Saga.", "There is no need to publish events externally: use Outbox only when you need to send messages to another service or broker."],
      17: "General rule: use distributed patterns only when service boundaries truly require them.",
      18: "Quick recap",
      19: ["Outbox: write data and an event in one transaction, then publish via a relay—messages are sent only if the transaction commits.", "Saga: a sequence of local transactions and compensating transactions provides eventual consistency without 2PC.", "Both require idempotent consumers; Sagas do not provide automatic rollback or isolation.", "Within one service, a local ACID transaction is still the right choice."],
    },
    diagramText: {
      8: {
        nodes: { service: { sub: "process command" }, db: { label: "Business DB", sub: "orders, ..." }, outbox: { label: "Outbox table", sub: "same transaction" }, relay: { sub: "poll / CDC" }, broker: { label: "Message broker" } },
        edges: { "service-db": { label: "1. write data" }, "service-outbox": { label: "1. write event" }, "outbox-relay": { label: "2. read" }, "relay-broker": { label: "3. publish" } },
      },
    },
  },
  "sd-design-process": {
    title: "A Step-by-Step System Design Process",
    module: "Design Process",
    summary: "Seven steps—from clarifying requirements and estimating capacity to designing APIs and data, high-level design, deep dives, bottlenecks, and a clear conclusion.",
    duration: "12 min",
    blockText: {
      0: "System design is more than drawing a diagram. A clear process helps you capture requirements, avoid choosing technologies too early, and know when to explore a problem in depth. The framework below works both in interviews and when designing real systems.",
      1: "Step 1 — Clarify requirements",
      2: "Do not start designing until you understand the problem. First, divide the requirements into two groups:",
      3: ["Functional requirements: what must the system do? List the features, then agree on scope—time is limited, so focus on two or three core features.", "Non-functional requirements: scale (users and request volume), latency, availability, consistency, cost, and security.", "Questions to settle: Who will use the system? Is read or write traffic higher? How stale can data be? Is real-time behavior required?"],
      4: "Write down assumptions as you make them. Explicit assumptions are part of the solution, not something to hide.",
      5: "Step 2 — Estimate capacity",
      6: "The goal is not an exact number, but an order-of-magnitude estimate to guide architecture: 12 RPS may need only one server; 12 million RPS may require sharding, caching, and a CDN. Basic formulas:",
      7: ["Average RPS = (daily active users × requests per user per day) / 86,400 seconds.", "Peak RPS = average RPS × peak multiplier (often 2–3, sometimes higher).", "Storage = write rate × record size × retention period; if multiple copies are stored, multiply by the replication factor.", "Bandwidth = RPS × response size; calculate ingress and egress separately."],
      8: "The read/write ratio helps identify where caching and replicas may be useful; many systems have much more read traffic than write traffic. Every number depends on assumptions, so state them and test sensitivity: would the conclusion change if an assumption were off by a factor of two?",
      9: "The next lesson walks through a short capacity-estimation example.",
      10: "Step 3 — API and data model",
      11: "Define a few key endpoints (such as POST /urls and GET /{code}) along with the core data model. Answer questions such as: What is the primary key? Which data needs an index? Should you choose SQL or NoSQL based on how the system accesses data—not personal preference?",
      12: "An API is a contract between the client and the system; the data model reveals decisions that affect scalability.",
      13: "Step 4 — High-level design",
      14: "Draw the main components and request flow: client → LB/gateway → service → cache/database → queue/worker. Separate read and write paths to identify where caching is needed and what should be processed asynchronously.",
      15: "At this stage, apply components you have studied: load balancing, caching, CDNs, sharding, replication, and queues. Start from requirements, not a list of technologies.",
      16: "Step 5 — Deep dive",
      17: "Choose one or two of the hardest problems and analyze them carefully: How do you avoid a hot shard? Handle a cache stampede? Ensure a message is not lost? This is where you demonstrate depth, so focus on the key issues instead of covering everything superficially.",
      18: "A good deep dive clearly states the problem, possible approaches, selection criteria, and the final choice with its trade-offs.",
      19: "Step 6 — Bottlenecks, failures, and trade-offs",
      20: ["Bottleneck: which component will hit its limit first? Is it a single point of failure?", "Failure modes: if the primary database, cache, or broker fails, can the system still serve requests? How does it degrade gracefully?", "Trade-offs: consistency or availability, latency or throughput, SQL or NoSQL, synchronous or asynchronous. Explain what you give up as well as what you gain."],
      21: "Step 7 — Conclude and communicate",
      22: "Summarize the design in a few sentences: the main requirements, key decisions, reasons for choosing them, and trade-offs. State what the design covers and what remains unresolved. A good conclusion gives listeners the big picture without requiring them to revisit the diagram.",
      23: ["Describe a request's end-to-end flow.", "Explain what would change if the system grew by a factor of 10 or 100.", "Call out open questions, if any, instead of assuming every problem has been solved."],
      24: "The seven steps are not strictly linear—you may revisit an earlier step after discovering a bad assumption—but this order helps ensure you do not miss anything.",
      25: "Quick recap",
      26: ["Clarify requirements first and agree on the core scope.", "Estimate to guide architecture, not to find an exact number.", "Derive the design from requirements; do not start with technology.", "Explore one or two hard problems in depth; always discuss failure modes and trade-offs.", "Finish with a summary and the assumptions you made."],
    },
    diagramText: {
      24: {
        nodes: { "step-1": { label: "1. Clarify requirements" }, "step-2": { label: "2. Estimate capacity" }, "step-3": { label: "3. API & data" }, "step-4": { label: "4. High-level design" }, "step-5": { label: "5. Deep dive" }, "step-6": { label: "6. Bottlenecks & trade-offs" }, "step-7": { label: "7. Conclude & communicate" } },
        edges: { "s3-s4": { label: "draw components" } },
      },
    },
  },
  "sd-back-of-envelope-estimation": {
    title: "Back-of-the-Envelope Estimation",
    module: "Design Process",
    summary: "Estimate RPS, storage, and bandwidth with basic formulas and a short example; focus on orders of magnitude and assumptions, not exact figures.",
    duration: "10 min",
    blockText: {
      0: "Quick estimates turn vague requirements (“a few million users”) into numbers that can guide a design. An error by a factor of two usually does not change the conclusion; an error by a factor of a hundred might require a different architecture.",
      1: "Useful constants to remember",
      2: ["Seconds in a day ≈ 86,400 (often rounded to 10^5).", "Storage orders of magnitude: thousand ≈ 10^3 (KB), million ≈ 10^6 (MB), billion ≈ 10^9 (GB), trillion ≈ 10^12 (TB).", "Reference sizes: a metadata record is about 1 KB; a compressed image is a few hundred KB; one minute of HD video is about 50 MB."],
      3: "Actual sizes vary by format and compression; these figures are only for order-of-magnitude estimates.",
      4: "Formulas",
      5: ["Average RPS = (DAU × requests per user per day) / 86,400.", "Peak RPS = average RPS × peak multiplier (2–3, or more if traffic is concentrated).", "Daily storage = new records per day × record size; then multiply by the retention period and replication factor.", "Bandwidth = RPS × response size; calculate ingress and egress separately.", "Number of servers ≈ peak RPS / capacity per server (an estimate, not a constant)."],
      6: "If the read/write ratio is significantly different from 1:1, estimate read RPS and write RPS separately, then apply the relevant formulas.",
      7: "Short example: a URL-shortening service",
      8: "Suppose there are 10 million daily active users (DAU), and each creates 0.1 URLs and visits 5 URLs. Ignore bot traffic and unusual spikes.",
      9: ["Writes: 10^7 × 0.1 = 10^6 new URLs/day → average write RPS = 10^6 / 86,400 ≈ 12; at 3× peak, about 36.", "Reads: 10^7 × 5 = 5 × 10^7 visits/day → average read RPS ≈ 580; at 3× peak, about 1,740.", "Read/write ratio ≈ 50:1 → the system is read-heavy, so caching is a priority.", "Storage: assuming each URL record is 500 bytes, 10^6 × 500 B = 500 MB/day, or about 180 GB/year; with a replication factor of 3, about 540 GB/year. This does not yet require sharding.", "Bandwidth: most traffic is redirects with very small responses (a few hundred bytes), so bandwidth is not a hot spot."],
      10: "Estimate takeaway: at this scale, one stateless service behind a load balancer, a replicated database, and a cache for reads should be enough. Sharding is only needed after several more orders of magnitude of growth.",
      11: "Common mistakes",
      12: ["Giving overly precise figures without stating assumptions, so listeners cannot check the result.", "Ignoring peak multipliers even though real traffic is not evenly distributed over time.", "Forgetting replication and retention when estimating storage.", "Confusing throughput (the amount of data actually transferred per second) with bandwidth (the maximum capacity of the connection)."],
      13: "Latency references (orders of magnitude)",
      14: "These reference figures (from Jeff Dean, approximately from the 2010s) illustrate relative costs. Hardware has changed, but the orders of magnitude are still useful:",
      15: ["Main memory access: ~100 ns.", "Random 4 KB read from an SSD: ~150 µs.", "Round trip within the same datacenter: ~0.5 ms (~500 µs).", "Disk seek on a spinning drive: ~10 ms.", "Send a packet from California to the Netherlands and back: ~150 ms."],
      16: "Key takeaway: one network call can take thousands of times longer than a memory access, and geographic distance imposes a minimum latency.",
      17: "Starting from the same assumptions, estimate RPS, storage, and bandwidth; each result informs a different design decision.",
      18: "Quick recap",
      19: ["Divide by 86,400 to convert daily totals to per-second rates; multiply by a peak factor for headroom.", "Storage = write rate × size × retention period × replication factor.", "Bandwidth = RPS × response size; calculate ingress and egress separately.", "Always state your assumptions and focus on orders of magnitude."],
    },
    diagramText: {
      17: {
        nodes: { assumptions: { label: "Assumptions", sub: "DAU · requests · size" }, rps: { sub: "÷ 86,400 × peak factor" }, storage: { sub: "writes × size × retention" }, bandwidth: { sub: "RPS × response" } },
      },
    },
  },
  "sd-case-url-shortener": {
    title: "Case Study: URL Shortener",
    module: "Case Studies",
    summary: "Apply the design process to a URL-shortening service: generate codes, redirect requests, cache the read path, and evaluate trade-offs.",
    duration: "10 min",
    blockText: {
      0: "A URL shortener is a simple way to practice the design process: it has clear requirements, read-heavy traffic, and easy-to-see trade-offs. This lesson brings together components from earlier lessons—load balancers, cache-aside, sharding, replication, and message queues—to build a complete system.",
      1: "By the end of this lesson, you should be able to design the system from requirements to architecture, explain when to use 302 or 301, generate unique codes, and identify bottlenecks as the system grows.",
      2: "Requirements and assumptions",
      3: "Functional requirements: accept a long URL and return a short one; when someone visits the short URL, redirect them to the original. Optional features include custom aliases, expiration dates, and click counts.",
      4: ["Redirects must be fast and handle heavy read traffic.", "Short codes must be unique; if links are private, codes should be hard to guess.", "Created links must be stored durably and never lost.", "It may need to be possible to change a destination or revoke a link, for example if it is found to be malicious."],
      5: "Non-functional requirements directly affect the design, so state assumptions instead of treating them as universal numbers. Example assumptions: about 2 million new URLs per day, a read/write ratio of about 100:1, and a seven-character code.",
      6: "Estimate only what you need",
      7: "The goal of estimation is to identify where the system will be under pressure. Using the assumptions above:",
      9: "Initial conclusion: this is a read-heavy system, so the redirect path needs a cache and replicas. Write traffic is much lower and can be optimized later.",
      10: "API and data model",
      13: "High-level architecture",
      14: "Separate the write path (create a code) from the read path (redirect). Reads check the cache first; click events go to a queue so they do not delay redirects.",
      15: "Request flow",
      16: ["Create a link: the API validates the URL, gets a new code from the ID generator, writes the mapping to the database, and returns the short URL. Persisting the mapping is the only operation on this path that must finish durably.", "Redirect: the API checks the cache first. On a hit, it returns 302 immediately; on a miss, it reads the database, writes the result to the cache (cache-aside), and returns 302. Meanwhile, it sends the click event to a queue for later processing.", "Analytics: a worker reads click_event records from the queue and aggregates them; the user does not have to wait."],
      17: "Why use 302 instead of 301? With 301 (Moved Permanently), browsers and proxies may cache the redirect permanently. Later visits then bypass the system—reducing load, but also preventing click tracking and making it harder to change a destination or revoke a link. With 302 (Found), each visit still passes through the system, so links can be tracked and controlled. Use 302 when tracking or destination changes matter.",
      18: "Bottlenecks and failure modes",
      19: ["A shared ID generator can become a single point of failure and a bottleneck. Replace it with a Key Generation Service that allocates ID ranges to nodes, or use distributed IDs such as Snowflake.", "Duplicate codes: if codes are random or truncated hashes, check for collisions and retry. If codes are generated by encoding an incrementing ID in Base62, uniqueness is guaranteed by construction, so no collision check is needed.", "Cache stampede on a popular link: many requests miss the same code at once. A lock, early refresh, or small queue can help.", "Primary database failure: cached reads and replicas may continue to serve redirects, but writes are temporarily interrupted. Failover is needed to keep link creation available.", "Abuse: malicious URLs or spam may appear. Use rate limiting, blocklists, and revocation; 302 keeps links under ongoing control.", "Expired links: return 404/410 and remove the code from the cache so stale data is no longer served."],
      20: "Trade-offs and evolution",
      21: "Start simple: one application server and one database can serve the first few thousand links. As reads grow, add a cache and then replicas. As data grows, shard the mapping table by a hash of short_code to spread load evenly; because lookups always use short_code, no cross-shard queries are needed.",
      22: ["Sequential codes are easy to guess; if codes must be hard to guess, use distributed or random IDs instead of a counter.", "Caching reduces read load but may briefly return stale data; when a destination changes, refresh or invalidate the cache entry.", "301 reduces load but also reduces control; 302 adds a request but supports analytics and revocation.", "Putting analytics in a queue keeps the redirect path lean, but metrics may be delayed by a few seconds."],
      23: "Quick recap",
      24: ["This is a read-heavy system: cache redirects, use replicas for reads, and keep mapping writes simple.", "Generate codes from IDs and encode them in Base62 to guarantee uniqueness; a KGS or distributed IDs avoid a counter bottleneck.", "Use 302 for tracking and link control; use 301 when the destination is fixed and reducing load is the priority.", "Put click events on a queue; shard by short_code as the data grows."],
    },
    codeText: {
      8: ["Writes:  2,000,000 / day ÷ 86,400 s ≈ 23 writes/s (10× peak ≈ 230 writes/s)\nReads:   23 × 100             ≈ 2,300 reads/s (10× peak ≈ 23,000 reads/s)\nStorage: ~100 bytes/record × 2,000,000/day × 30 ≈ 6 GB/month\n7-character Base62 code: 62^7 ≈ 3.5 × 10^12 codes — enough for many years"],
      11: [undefined],
      12: ["-- Mapping, looked up by the short_code primary key\nurl_mapping(\n  short_code  PK,\n  long_url    TEXT,\n  created_at  TIMESTAMP,\n  expires_at  TIMESTAMP NULL,\n  owner_id    BIGINT NULL\n)\n\n-- Click events, written asynchronously through a queue\nclick_event(short_code, ts, referrer, country)"],
    },
    diagramText: {
      14: {
        nodes: { client: { sub: "browser/app" }, lb: { sub: "distributes traffic" }, shorten: { sub: "generate code" }, redirect: { sub: "hot path (reads)" }, kgs: { sub: "generate IDs" }, cache: { sub: "code → URL" }, db: { sub: "durable mapping" }, queue: { sub: "click events" }, analytics: { sub: "count clicks" } },
        edges: { "client-lb": { label: "request" }, "lb-shorten": { label: "POST /links" }, "lb-redirect": { label: "GET /{code}" }, "shorten-kgs": { label: "get code" }, "shorten-db": { label: "write mapping" }, "redirect-cache": { label: "check cache" }, "cache-redirect": { label: "hit: return URL" }, "cache-db": { label: "miss" }, "redirect-queue": { label: "log click" }, "queue-analytics": { label: "process in background" } },
      },
    },
  },
  "sd-case-news-feed": {
    title: "Case Study: News Feed",
    module: "Case Studies",
    summary: "Design a news feed with fan-out, hot keys from accounts with many followers, cached inboxes and queues, and read/write trade-offs.",
    duration: "12 min",
    blockText: {
      0: "A news feed is a classic trade-off between write cost and read latency. This lesson combines social graphs, caching, queues, and sharding to design a near-real-time feed, including for accounts with millions of followers.",
      1: "By the end of this lesson, you should understand why write-time and read-time fan-out are combined, how to store an inbox in an ordered data structure, and how to spot bottlenecks as traffic spikes.",
      2: "Requirements and assumptions",
      3: "Functional requirements: users can post, follow other users, and view a paginated feed of recent posts from the accounts they follow.",
      4: ["The feed should load quickly (target under a few hundred milliseconds) and handle heavy read traffic.", "Published posts must not be lost; ordering within each feed must be stable.", "Eventual consistency is acceptable: followers may see a new post a few seconds later.", "Prioritize availability and low read latency over strong consistency (an AP-leaning choice under CAP)."],
      5: "Illustrative assumptions (not universal figures): 50 million daily active users, an average of 200 followers per account, 0.2 posts per user per day, and a small group of accounts with more than 1 million followers.",
      6: "Estimate only what you need",
      8: "Two figures stand out: reads are about 50 times writes, while fan-out creates about 200 write operations per post. Pushing a post to every follower would create 1 million writes for a post from an account with 1 million followers—so we need a hybrid model.",
      9: "API and data model",
      12: "Inbox as a sorted set",
      13: "Each user has a sorted set of post IDs ordered by time. Use ZADD to add an entry and reverse ZRANGE to fetch the N newest items; both operations take O(log N). Keep only a few hundred to a few thousand recent entries and evict older ones, since feed reads usually need only the first page or so.",
      14: "High-level architecture",
      15: "Hybrid architecture: new posts are fanned out asynchronously through a queue to followers' cached inboxes; posts from accounts with many followers are held back and merged (pulled) at read time to avoid a write explosion.",
      16: "Request flow",
      17: ["Post: the Post Store durably saves the post, then enqueues a job. A worker fetches the follower list and adds the post ID to each follower's cached inbox (write-time fan-out). Skip this step for accounts with many followers because the cost is too high.", "Read the feed: the Feed API gets the ordered inbox from cache, merges in recent posts from followed high-follower accounts (read-time fan-out), fetches post content in batches, filters duplicates or deleted posts, and returns a page.", "Pagination: use a cursor based on (score, post_id) instead of an offset to avoid repeating or skipping posts as the feed changes."],
      18: "Bottlenecks and failure modes",
      19: ["Celebrity problem: a post from a large account can create millions of writes and overwhelm the queue. Use a hybrid model with a follower threshold to choose push or pull, rather than one approach for every account.", "Hot key: some inboxes or posts are accessed extremely often. Replicate the cache and create dedicated cache entries for hot content to avoid concentrating load on one node.", "Slow fan-out: followers see a post after a delay. This is a trade-off for eventual consistency; monitor queue latency and apply backpressure.", "Duplicate writes and ordering: retries while updating an inbox may repeat an operation. Since post_id is the sorted-set key, writing the same ID again has no additional effect (idempotent).", "Simultaneous cache misses after a restart or expiration can flood the Post Store. Limit load, warm the cache, and use early refresh.", "Unfollow, block, or delete: already fanned-out posts may remain in inboxes, so filter them again when reading."],
      20: "Trade-offs and evolution",
      21: "Write-time fan-out makes reads fast but costs many writes and more storage; read-time fan-out lowers write cost but aggregates posts from multiple sources on each read. Real systems usually combine both: push for most accounts and pull for those with many followers.",
      22: ["When reads greatly outnumber writes, optimize the read path with caching and precomputation, while accepting that new posts may appear a few seconds late.", "The social graph is read frequently; storing it in a system optimized for fast lookups and using a cache can substantially reduce load.", "A queue absorbs spikes and separates fan-out from post creation.", "To rank by relevance rather than time, add a scoring step during reads. Since scoring costs compute, it is usually better to retrieve candidate posts from cache and rank them afterward.", "Shard the Post Store by author_id; inboxes can be sharded by user_id; replicas can increase read capacity."],
      23: "Quick recap",
      24: ["Feed design trades write cost for read latency; choose based on the actual read/write ratio.", "Store inboxes as sorted sets for fast inserts, deletes, and reads while preserving order.", "Fan out asynchronously through a queue; use a follower threshold to switch large accounts to pull.", "Accept eventual consistency, but filter posts from accounts that were unfollowed or blocked and posts that were deleted."],
    },
    codeText: {
      7: ["New posts: 50,000,000 × 0.2 = 10,000,000/day ≈ 116 posts/s\nFan-out (push to followers): 10,000,000 × 200 = 2,000,000,000/day ≈ 23,000 writes/s\nFeed reads: assume 10 per user/day → 500,000,000/day ≈ 5,800 reads/s (5× peak ≈ 29,000/s)"],
      10: [undefined],
      11: ["-- Social graph\nfollow(follower_id, followee_id, created_at)   -- PK(follower_id, followee_id)\n\n-- Posts (sharded by author_id)\npost(post_id, author_id, body, created_at, media_url)\n\n-- Cached inbox: Redis sorted set, descending by time\nfeed:{user_id}   member = post_id,  score = created_at"],
    },
    diagramText: {
      15: {
        nodes: { client: { sub: "app" }, feedapi: { sub: "read/write" }, inbox: { sub: "inbox (sorted set)" }, postdb: { sub: "sharded by author" }, graph: { sub: "follow relationships" }, queue: { sub: "absorbs spikes" }, worker: { sub: "push post_id" }, celeb: { sub: "merge at read time" } },
        edges: { "client-lb": { label: "request" }, "feedapi-inbox": { label: "1. read inbox" }, "feedapi-postdb": { label: "2. fetch content" }, "feedapi-graph": { label: "3. get follows" }, "feedapi-celeb": { label: "merge celebrity posts" }, "postdb-queue": { label: "new post" }, "queue-worker": { label: "job" }, "worker-inbox": { label: "push post_id" } },
      },
    },
  },
  "sd-case-chat": {
    title: "Case Study: Chat",
    module: "Case Studies",
    summary: "Design chat with realtime WebSocket connections, durable message storage, per-conversation ordering, at-least-once delivery, and presence tracking.",
    duration: "12 min",
    blockText: {
      0: "Chat differs from the previous examples: the server must proactively send data to clients, so connections are stateful and harder to scale horizontally. This design uses WebSockets, pub/sub, idempotency, and sharding to prevent message loss, handle duplicate delivery safely, and preserve order within each conversation.",
      1: "By the end of this lesson, you should understand why WebSockets are hard to scale, how to assign sequence numbers and prevent duplicate processing, how to route messages to the server holding a recipient's connection, and how to track presence with heartbeats.",
      2: "Requirements and assumptions",
      3: "Functional requirements: send and receive messages in real time; support one-to-one and small-group chats; view history; know whether messages were sent, delivered, or read; and display online status.",
      4: ["Low latency: messages arrive almost immediately while both participants are online.", "Messages must not be lost. Delivery may be repeated, but receivers must prevent duplicate processing (at-least-once).", "Ordering is required within each conversation, not across the whole system.", "Presence can be approximate and a few seconds late; it does not need to be exact.", "Messages sent while the recipient is offline must be stored and delivered when they reconnect."],
      5: "Illustrative assumptions: 20 million daily active users, 40 messages sent per user per day, about 10% online at once, and an average message size of 200 bytes.",
      6: "Estimate only what you need",
      8: "The system faces two main pressures: 2 million persistent connections (which stress memory and routing, not throughput) and a high message-write volume (which requires sharding and may benefit from queues for some work).",
      9: "API and data model",
      12: "The client generates message_id and includes it in the Idempotency-Key header. If the client times out and retries, the server recognizes the key and returns the previous result instead of creating a second message.",
      13: "High-level architecture",
      14: "The WS gateway holds realtime connections; the message service durably stores messages and assigns sequence numbers per conversation; pub/sub routes messages to the gateway holding the recipient's connection; presence is stored with a TTL and refreshed by heartbeats.",
      15: "Request flow",
      16: ["Connect: the client opens a WebSocket (wss) to a gateway. After the handshake, HTTP Upgrade returns 101 Switching Protocols and establishes a two-way channel. The gateway records the user and the server holding the connection in a routing table.", "Send a message: the client sends it over WebSocket with message_id; the message service checks the idempotency key, assigns a conversation sequence number, durably stores the message, and then acknowledges the sender (sent status).", "Deliver: the message service looks up the recipient's gateway in the routing table and sends the message over pub/sub. The gateway forwards it over WebSocket, and the recipient acknowledges it (delivered status). If the recipient is offline, hold the message until they reconnect.", "Fetch missed messages: after reconnecting, the client sends the last sequence number it received. The server returns messages with higher sequence numbers from the Message Store, so the entire history does not need to be synchronized again.", "Presence: the gateway periodically refreshes a presence key with a heartbeat. If the key expires because heartbeats stop, the user is considered offline."],
      17: "Bottlenecks and failure modes",
      18: ["WebSockets are stateful: if a server fails, all its connections drop. Clients need to reconnect with backoff, and gateways must be replicated so they do not become a single point of failure.", "Routing to the right server: without a routing table or pub/sub backplane, a message cannot reach someone connected through another gateway. A shared routing layer is needed.", "Ordering: machine clocks may not be synchronized, so do not sort messages by time. Use increasing sequence numbers per conversation; ordering is needed only within each conversation.", "Duplicate messages: a timeout followed by a retry may create two records. Use an idempotency key on the server and deduplicate by message_id on the client.", "Message loss: if the server acknowledges before durable storage, a failure can lose the message. Persist it first, then acknowledge (at-least-once), while accepting that delivery may be repeated.", "Presence is imprecise: heartbeats that are too infrequent delay offline status; those that are too frequent waste resources. Choose a suitable interval and timeout, and treat presence as an estimate.", "Large groups: one message must be fanned out to many members; a queue can handle this without blocking the send path."],
      19: "Trade-offs and evolution",
      20: ["WebSockets offer low latency and two-way communication, but stateful connections are harder to scale. Polling is simpler but increases latency and request volume. In practice, chat almost always uses WebSockets.", "Synchronous durable writes improve reliability but increase send latency; writes can be queued if a small delivery delay is acceptable.", "At-least-once is easier to implement than exactly-once. A practical approach is at-least-once delivery with deduplication at the receiver.", "Shard the Message Store by conversation_id to spread load and keep each conversation's messages on one shard, making ordering easier to maintain.", "Separate WS gateways from the message service so each layer can scale independently; store images and videos in object storage and keep only their URLs in messages.", "End-to-end encryption protects message contents but limits search and server-side processing because the server cannot read them."],
      21: "Quick recap",
      22: ["Use WebSockets for realtime chat; plan to manage stateful connections and support reconnects.", "Durably store a message before acknowledging it; use an idempotency key to prevent duplicate processing on retries.", "Use per-conversation sequence numbers to preserve ordering; use pub/sub to route messages to the correct gateway.", "Hold messages for offline recipients until they reconnect; presence is approximate and based on heartbeats and TTLs."],
    },
    codeText: {
      7: ["Messages: 20,000,000 × 40 = 800,000,000/day ≈ 9,300 messages/s (5× peak ≈ 46,000/s)\nConcurrent connections: 10% × 20,000,000 = 2,000,000 WebSockets\nStorage: 800,000,000 × 200 bytes ≈ 160 GB/day → ~58 TB/year (requires sharding + cold storage)"],
      10: [undefined],
      11: ["message(\n  message_id      PK,        -- client-generated UUID, used as the idempotency key\n  conversation_id,\n  sender_id,\n  seq             BIGINT,    -- increases within each conversation\n  body, created_at,\n  status                     -- pending | sent | delivered | read\n)\n\nconversation(conversation_id PK, type, last_seq)\nconversation_member(conversation_id, user_id, last_read_seq)\npresence:{user_id} → { server_id, last_seen }   -- key with TTL, refreshed by heartbeat"],
    },
    diagramText: {
      14: {
        nodes: { "client-a": { sub: "WebSocket" }, "client-b": { sub: "WebSocket" }, "ws-a": { sub: "holds connection" }, "ws-b": { sub: "holds connection" }, bus: { sub: "routing" }, msg: { sub: "idempotent + sequence number" }, store: { sub: "sharded by conversation" }, presence: { sub: "heartbeat + TTL" } },
        edges: { "a-wsa": { label: "connect" }, "b-wsb": { label: "connect" }, "wsa-msg": { label: "1. send + persist" }, "msg-store": { label: "2. store by sequence" }, "msg-bus": { label: "3. route" }, "bus-wsb": { label: "4. deliver" }, "wsb-clientb": { label: "5. receive" }, "wsa-presence": { label: "heartbeat" } },
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
    group: translation.group ?? lesson.group,
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
