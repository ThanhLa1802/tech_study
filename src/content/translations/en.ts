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
  "sd-foundations": "Foundations",
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
  "sd-introduction": {
    title: "Introduction to System Design",
    module: "Foundations",
    summary:
      "Learn what system design involves, follow a four-step process, and review key non-functional metrics.",
    blockText: {
      0: "System design shapes a system's architecture, components, and communication so it can meet business needs at scale—as data, users, and traffic continue to grow.",
      1: "Unlike coding, system design rarely has one uniquely correct answer. The goal is to propose a sensible design and clearly explain its trade-offs.",
      2: "A four-step process",
      3: [
        "Understand functional requirements and non-functional needs such as scale, latency, and availability.",
        "Estimate the workload: users, QPS, and storage capacity.",
        "Sketch the high-level architecture: client, API gateway, services, cache, database, and queue.",
        "Investigate bottlenecks and explain the trade-offs.",
      ],
      4: "Key non-functional metrics",
      5: [
        "Availability: 99.9% means about 8.7 hours of downtime per year.",
        "Latency: p50, p95, and p99 are often more useful than the average.",
        "Scalability: scale horizontally by adding machines, or vertically by using a more powerful machine.",
      ],
      6: "How a request travels",
      8: "A request flows from the client through the application layers to the data layer.",
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
