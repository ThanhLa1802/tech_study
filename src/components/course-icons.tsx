import type { SVGProps } from "react";

export type IconName =
  | "welcome"
  | "big-o"
  | "sorting"
  | "two-pointers"
  | "binary-search"
  | "arrays"
  | "hash"
  | "linked-list"
  | "stack"
  | "tree"
  | "heap"
  | "window"
  | "recursion"
  | "graph"
  | "dp"
  | "quiz"
  | "drill"
  | "level-easy"
  | "level-medium"
  | "level-hard"
  | "module"
  | "lesson"
  | "layers"
  | "server"
  | "database"
  | "shield"
  | "concepts";

const PATHS: Record<IconName, string> = {
  welcome:
    "M12 6.5C10 5.2 7.8 4.6 5.5 4.6c-.6 0-1.1 0-1.5.1v12.8c.4-.1.9-.1 1.5-.1 2.3 0 4.5.6 6.5 1.9 2-1.3 4.2-1.9 6.5-1.9.6 0 1.1 0 1.5.1V4.7c-.4-.1-.9-.1-1.5-.1-2.3 0-4.5.6-6.5 1.9ZM12 6.5v12.8",
  "big-o": "M4 19.5h16M6.5 19.5v-5M11 19.5v-9M15.5 19.5v-13",
  sorting:
    "M4 7h11M4 12h8M4 17h5M18 6.5v11M18 17.5l-2.5-2.5M18 17.5l2.5-2.5",
  "two-pointers":
    "M3.5 12h6M6.5 8.5 3.5 12l3 3.5M20.5 12h-6M17.5 8.5l3 3.5-3 3.5",
  "binary-search":
    "M10.5 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM15 15l5 5M10.5 7.5v6",
  arrays: "M5.25 4.5 4.5 19.5M18.75 4.5l.75 15M8.25 9h7.5M8.25 15h7.5",
  hash: "M9.5 4.5 7.5 19.5M16.5 4.5 14.5 19.5M5 9h14.5M4.5 15h14.5",
  "linked-list":
    "M3.75 10.5h3.5v3h-3.5zM10.25 10.5h3.5v3h-3.5zM16.75 10.5h3.5v3h-3.5zM7.25 12h3M13.75 12h3",
  stack: "M4 4.75v14.5M20 4.75v14.5M6 8.25h12M6 12h12M6 15.75h12",
  tree: "M12 4.25v4M12 8.25 7 13M12 8.25l5 4.75M12 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM6.5 15a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM17.5 15a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z",
  heap: "M12 4 5 19h14L12 4ZM12 4v5.5M12 9.5 8.5 16M12 9.5l3.5 6.5",
  window: "M4.5 6.5h15v11h-15zM10 6.5v11M14 6.5v11",
  recursion: "M4.5 12a7.5 7.5 0 1 0 2.3-5.4M4.5 4.5v3.2h3.2",
  graph:
    "M6.5 7.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM18 15a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM18 4.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM7.9 6.1 15.9 4.8M8.4 8.5l7.5 4.8M18 9.2v3.5",
  dp: "M4.5 5.5h15v13h-15zM9.5 5.5v13M14.5 5.5v13M4.5 10h15M4.5 14.5h15",
  quiz: "M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.5 12.25l2.25 2.25 4.75-4.75",
  drill:
    "M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z",
  "level-easy": "M4.5 19.5h15M8 19.5v-4",
  "level-medium": "M4.5 19.5h15M8 19.5v-4M12 19.5v-8",
  "level-hard": "M4.5 19.5h15M8 19.5v-4M12 19.5v-8M16 19.5v-12",
  module: "M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z",
  lesson:
    "M7 3.75h7.5L19 8.25v12H7V3.75ZM14.5 3.75v4.5H19M10 12h6M10 15.5h4",
  layers:
    "M12 3.75 3.75 8.25 12 12.75l8.25-4.5L12 3.75ZM3.75 12 12 16.5l8.25-4.5M3.75 15.75 12 20.25l8.25-4.5",
  server:
    "M3.75 4.5h16.5v5.25H3.75zM3.75 14.25h16.5V19.5H3.75zM7 7.125h.01M7 16.875h.01",
  database:
    "M12 3.75c4.14 0 7.5 1.06 7.5 2.36S16.14 8.47 12 8.47 4.5 7.41 4.5 6.11 7.86 3.75 12 3.75ZM4.5 6.11v11.78c0 1.3 3.36 2.36 7.5 2.36s7.5-1.06 7.5-2.36V6.11M4.5 12c0 1.3 3.36 2.36 7.5 2.36s7.5-1.06 7.5-2.36",
  shield:
    "M12 3.75 5.25 6.15v5.6c0 4 2.7 6.9 6.75 8.25 4.05-1.35 6.75-4.25 6.75-8.25v-5.6L12 3.75Z",
  concepts:
    "M12 3.25a6 6 0 0 0-3.5 10.85V17h7v-2.9A6 6 0 0 0 12 3.25ZM9.5 19.5h5M10.5 21.75h3",
};

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export const COURSE_ICONS: Record<string, IconName> = {
  dsa: "sorting",
  "system-design": "layers",
};

export const MODULE_ICONS: Record<string, IconName> = {
  welcome: "welcome",
  "big-o": "big-o",
  sorting: "sorting",
  "two-pointers": "two-pointers",
  "binary-search": "binary-search",
  "arrays-strings": "arrays",
  "hash-tables": "hash",
  "linked-list": "linked-list",
  "stacks-queues": "stack",
  trees: "tree",
  heaps: "heap",
  "sliding-window": "window",
  "recursion-backtracking": "recursion",
  graphs: "graph",
  "dynamic-programming": "dp",
  "sd-foundations": "welcome",
  "sd-core-concepts": "concepts",
  "sd-building-blocks": "server",
  "sd-data": "database",
  "sd-reliability": "shield",
};
