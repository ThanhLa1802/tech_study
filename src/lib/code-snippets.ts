import type { CodeSnippet } from "@/lib/course-types";

export function prioritizePython(snippets: CodeSnippet[]): CodeSnippet[] {
  return [...snippets].sort(
    (a, b) => Number(b.lang === "python") - Number(a.lang === "python"),
  );
}
