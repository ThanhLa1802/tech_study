import { describe, expect, it } from "vitest";
import { prioritizePython } from "@/lib/code-snippets";

describe("code example language order", () => {
  it("places Python first while preserving the other implementations", () => {
    const snippets = [
      { lang: "javascript", code: "const answer = 42;" },
      { lang: "python", code: "answer = 42" },
      { lang: "java", code: "int answer = 42;" },
    ];

    expect(prioritizePython(snippets).map(({ lang }) => lang)).toEqual([
      "python",
      "javascript",
      "java",
    ]);
    expect(snippets[0].lang).toBe("javascript");
  });
});
