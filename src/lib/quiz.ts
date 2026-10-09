import type { Quiz, QuizQuestion } from "@/lib/course-types";
import type { Locale } from "@/lib/locale";

export type QuizAnswer = number | null;

export function isCorrect(
  question: QuizQuestion,
  answer: QuizAnswer,
): boolean {
  return answer === question.answer;
}

export function scoreQuiz(quiz: Quiz, answers: QuizAnswer[]): number {
  return quiz.questions.reduce(
    (acc, question, index) => (answers[index] === question.answer ? acc + 1 : acc),
    0,
  );
}

export function quizPercent(score: number, total: number): number {
  return total > 0 ? Math.round((score / total) * 100) : 0;
}

export function quizMessage(
  percent: number,
  locale: Locale = "vi",
): { title: string; tone: string } {
  const en = locale === "en";
  if (percent >= 80)
    return {
      title: en ? "Excellent! You have a strong grasp of this topic." : "Xuất sắc! Bạn đã nắm chắc phần này.",
      tone: "text-green-300",
    };
  if (percent >= 60)
    return {
      title: en ? "Good work — review the missed questions to reinforce your understanding." : "Khá tốt — xem lại vài câu sai để chắc chắn hơn.",
      tone: "text-amber-300",
    };
  return {
    title: en ? "Review this topic, read the explanations, and try again." : "Cần ôn lại — đọc phần giải thích rồi thử lại nhé.",
    tone: "text-rose-300",
  };
}
