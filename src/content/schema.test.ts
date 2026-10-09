import { describe, expect, it } from "vitest";
import { dsaModules } from "@/content/dsa";
import { validateCourseModules } from "@/content/schema";
import { systemDesignModules } from "@/content/system-design";

describe("validateCourseModules", () => {
  it("accepts all shipped content", () => {
    expect(validateCourseModules(dsaModules)).toHaveLength(dsaModules.length);
    expect(validateCourseModules(systemDesignModules)).toHaveLength(
      systemDesignModules.length,
    );
  });

  it("rejects an answer index outside the options", () => {
    const bad = [
      {
        id: "m",
        title: "M",
        lessons: [
          {
            slug: "l",
            title: "L",
            module: "M",
            summary: "s",
            duration: "1 phút",
            blocks: [],
            quiz: {
              title: "q",
              description: "d",
              questions: [
                {
                  id: "q1",
                  prompt: "p",
                  options: ["a", "b"],
                  answer: 5,
                  explanation: "e",
                },
              ],
            },
          },
        ],
      },
    ];
    expect(() => validateCourseModules(bad)).toThrow();
  });

  it("rejects a non kebab-case slug", () => {
    const bad = [
      {
        id: "m",
        title: "M",
        lessons: [
          {
            slug: "Bad Slug",
            title: "L",
            module: "M",
            summary: "s",
            duration: "1 phút",
            blocks: [],
          },
        ],
      },
    ];
    expect(() => validateCourseModules(bad)).toThrow();
  });

  it("rejects an unknown block type", () => {
    const bad = [
      {
        id: "m",
        title: "M",
        lessons: [
          {
            slug: "l",
            title: "L",
            module: "M",
            summary: "s",
            duration: "1 phút",
            blocks: [{ type: "video", src: "x" }],
          },
        ],
      },
    ];
    expect(() => validateCourseModules(bad)).toThrow();
  });

  it("accepts an inline h3 visualizer and rejects an unknown one", () => {
    const makeModule = (visualizer: string) => [
      {
        id: "m",
        title: "M",
        lessons: [
          {
            slug: "l",
            title: "L",
            module: "M",
            summary: "s",
            duration: "1 phút",
            blocks: [{ type: "h3", text: "Section", visualizer }],
          },
        ],
      },
    ];

    expect(validateCourseModules(makeModule("http-https"))).toHaveLength(1);
    expect(() => validateCourseModules(makeModule("not-a-visualizer"))).toThrow();
  });
});
