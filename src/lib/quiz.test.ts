import { describe, expect, it } from "vitest";
import type { Quiz } from "@/lib/course-types";
import { quizMessage, quizPercent, scoreQuiz } from "@/lib/quiz";

const quiz: Quiz = {
  title: "Test",
  description: "d",
  questions: [
    { id: "1", prompt: "p", options: ["a", "b"], answer: 0, explanation: "e" },
    { id: "2", prompt: "p", options: ["a", "b"], answer: 1, explanation: "e" },
    { id: "3", prompt: "p", options: ["a", "b", "c"], answer: 2, explanation: "e" },
  ],
};

describe("scoreQuiz", () => {
  it("counts correct answers", () => {
    expect(scoreQuiz(quiz, [0, 1, 2])).toBe(3);
    expect(scoreQuiz(quiz, [1, 0, 0])).toBe(0);
  });

  it("treats unanswered as wrong", () => {
    expect(scoreQuiz(quiz, [0, null, 2])).toBe(2);
  });
});

describe("quizPercent", () => {
  it("rounds to the nearest percent", () => {
    expect(quizPercent(2, 3)).toBe(67);
  });

  it("guards against a zero total", () => {
    expect(quizPercent(0, 0)).toBe(0);
  });
});

describe("quizMessage", () => {
  it("changes tone at the 80% and 60% thresholds", () => {
    expect(quizMessage(80).tone).toBe("text-green-300");
    expect(quizMessage(60).tone).toBe("text-amber-300");
    expect(quizMessage(10).tone).toBe("text-rose-300");
  });
});
