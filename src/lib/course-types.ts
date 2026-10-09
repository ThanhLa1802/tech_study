import type { DiagramEdge, DiagramNode } from "@/lib/diagram";

export type CodeSnippet = { lang: string; code: string };

export type QuizQuestion = {
  id: string;
  prompt: string;
  code?: string;
  options: string[];
  answer: number;
  explanation: string;
  tag?: string;
};

export type Quiz = {
  title: string;
  description: string;
  timedSeconds?: number;
  questions: QuizQuestion[];
};

export type LessonBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; snippets: CodeSnippet[] }
  | {
      type: "diagram";
      nodes: DiagramNode[];
      edges: DiagramEdge[];
      caption?: string;
    };

export type DsaVisualizer =
  | "bubble-sort"
  | "selection-sort"
  | "insertion-sort"
  | "binary-search"
  | "two-sum";

export type ComplexityVisualizer = "big-o-growth";

export type SystemDesignVisualizer =
  | "load-balancer-round-robin"
  | "token-bucket";

export type DataStructureVisualizer =
  | "linked-list"
  | "binary-search-tree"
  | "stack"
  | "queue"
  | "binary-heap"
  | "sliding-window"
  | "graph-bfs"
  | "dp-1d";

export type Visualizer =
  | DsaVisualizer
  | ComplexityVisualizer
  | SystemDesignVisualizer
  | DataStructureVisualizer;

export type Lesson = {
  slug: string;
  title: string;
  module: string;
  summary: string;
  duration: string;
  visualizer?: Visualizer;
  quiz?: Quiz;
  icon?: string;
  parentSlug?: string;
  blocks: LessonBlock[];
};

export type CourseModule = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  modules: CourseModule[];
};
