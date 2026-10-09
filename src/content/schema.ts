import { z } from "zod";
import type { Course, CourseModule } from "@/lib/course-types";

const codeSnippetSchema = z.object({
  lang: z.string().min(1),
  code: z.string().min(1),
});

const quizQuestionSchema = z
  .object({
    id: z.string().min(1),
    prompt: z.string().min(1),
    code: z.string().optional(),
    options: z.array(z.string().min(1)).min(2),
    answer: z.number().int().min(0),
    explanation: z.string().min(1),
    tag: z.string().optional(),
  })
  .superRefine((question, ctx) => {
    if (question.answer >= question.options.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["answer"],
        message: `answer ${question.answer} is out of range for question "${question.id}"`,
      });
    }
  });

const quizSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  timedSeconds: z.number().int().positive().optional(),
  questions: z.array(quizQuestionSchema).min(1),
});

const diagramNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  sub: z.string().optional(),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  shape: z.enum(["box", "bucket"]).optional(),
  capacity: z.number().optional(),
});

const diagramEdgeSchema = z.object({
  id: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  label: z.string().optional(),
  dashed: z.boolean().optional(),
});

const visualizerSchema = z.enum([
  "bubble-sort",
  "selection-sort",
  "insertion-sort",
  "binary-search",
  "two-sum",
  "big-o-growth",
  "load-balancer-round-robin",
  "token-bucket",
  "linked-list",
  "binary-search-tree",
  "stack",
  "queue",
  "binary-heap",
  "sliding-window",
  "fixed-sliding-window",
  "graph-bfs",
  "dp-1d",
]);

const lessonBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), text: z.string().min(1) }),
  z.object({ type: z.literal("h2"), text: z.string().min(1) }),
  z.object({ type: z.literal("h3"), text: z.string().min(1) }),
  z.object({ type: z.literal("ul"), items: z.array(z.string().min(1)).min(1) }),
  z.object({
    type: z.literal("code"),
    snippets: z.array(codeSnippetSchema).min(1),
  }),
  z.object({
    type: z.literal("diagram"),
    nodes: z.array(diagramNodeSchema).min(1),
    edges: z.array(diagramEdgeSchema),
    caption: z.string().optional(),
  }),
]);

const lessonSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug phải ở dạng kebab-case"),
  title: z.string().min(1),
  module: z.string().min(1),
  summary: z.string().min(1),
  duration: z.string().min(1),
  visualizer: visualizerSchema.optional(),
  quiz: quizSchema.optional(),
  icon: z.string().optional(),
  parentSlug: z.string().optional(),
  blocks: z.array(lessonBlockSchema),
});

const courseModuleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  lessons: z.array(lessonSchema).min(1),
});

const courseSchema = z.object({
  id: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug phải ở dạng kebab-case"),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  modules: z.array(courseModuleSchema).min(1),
});

export function validateCourseModules(modules: unknown): CourseModule[] {
  return z.array(courseModuleSchema).parse(modules) as CourseModule[];
}

export function validateCourse(course: unknown): Course {
  return courseSchema.parse(course) as Course;
}
