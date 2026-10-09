import { describe, expect, it } from "vitest";
import {
  courses,
  findLesson,
  getAdjacentLessons,
  getCourseLessons,
} from "@/lib/course";

describe("course runtime data", () => {
  it("validates and exposes the two courses in order", () => {
    expect(courses.map((course) => course.slug)).toEqual([
      "dsa",
      "system-design",
    ]);
  });

  it("nests the complexity quizzes under the drill", () => {
    const children = getCourseLessons("dsa").filter(
      (lesson) => lesson.parentSlug === "complexity-drill",
    );
    expect(children.map((lesson) => lesson.slug)).toEqual([
      "complexity-quiz-easy",
      "complexity-quiz-medium",
      "complexity-quiz-hard",
    ]);
    expect(findLesson("dsa", "complexity-drill")?.icon).toBe("drill");
  });

  it("wires previous and next lessons across the flat order", () => {
    const { prev, next } = getAdjacentLessons("dsa", "complexity-drill");
    expect(prev?.slug).toBe("big-o-best-worst-average");
    expect(next?.slug).toBe("complexity-quiz-easy");
  });

  it("keeps every quiz answer within the options range", () => {
    for (const course of courses) {
      for (const lesson of getCourseLessons(course.slug)) {
        lesson.quiz?.questions.forEach((question) => {
          expect(question.answer).toBeGreaterThanOrEqual(0);
          expect(question.answer).toBeLessThan(question.options.length);
        });
      }
    }
  });
});
