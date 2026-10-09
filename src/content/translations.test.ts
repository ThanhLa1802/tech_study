import { describe, expect, it } from "vitest";
import {
  findLesson,
  findLessonForLocale,
  getAdjacentLessonsForLocale,
  getCourseForLocale,
} from "@/lib/course";
import {
  applyLessonTranslation,
  type LessonTranslation,
} from "@/content/translations/en";
import { structureDiagramVisualizers } from "@/components/visualizers/structure-specs";
import { localizeDiagramSpec } from "@/lib/diagram";
import type { Lesson } from "@/lib/course-types";

function baseTranslation(
  overrides: Partial<LessonTranslation> = {},
): LessonTranslation {
  return {
    title: "Title",
    module: "Module",
    summary: "Summary",
    blockText: {},
    ...overrides,
  };
}

function baseLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    slug: "synthetic",
    title: "Tiêu đề",
    module: "Mô-đun",
    summary: "Tóm tắt",
    duration: "5 phút",
    blocks: [],
    ...overrides,
  };
}

describe("English lesson translations", () => {
  it("publishes only lessons with complete English text", () => {
    const course = getCourseForLocale("dsa", "en");
    const slugs = course?.modules.flatMap((courseModule) =>
      courseModule.lessons.map((lesson) => lesson.slug),
    );

    expect(slugs).toEqual([
      "course-introduction",
      "how-to-use-this-hub",
      "big-o-introduction",
      "big-o-time-complexities",
      "big-o-space-complexity",
      "big-o-rules",
      "big-o-best-worst-average",
      "complexity-drill",
      "complexity-quiz-easy",
      "complexity-quiz-medium",
      "complexity-quiz-hard",
      "array-basics",
      "string-basics",
      "prefix-sum",
      "arrays-strings-quiz",
      "hash-table-basics",
      "hash-map-patterns",
      "hash-tables-quiz",
      "linked-list-basics",
      "linked-list-operations",
      "linked-list-quiz",
      "bubble-sort",
      "sorting-quiz",
    ]);
  });

  it("does not leak Vietnamese prose into a published English lesson", () => {
    const lessons = ["dsa", "system-design"].flatMap((courseSlug) =>
      getCourseForLocale(courseSlug, "en")?.modules.flatMap(
        (courseModule) => courseModule.lessons,
      ) ?? [],
    );
    const prose = lessons.flatMap((lesson) => [
      ...lesson.blocks.flatMap((block) => {
        if (block.type === "ul") return block.items;
        if (block.type === "p" || block.type === "h2" || block.type === "h3") {
          return [block.text];
        }
        if (block.type === "code") {
          return block.snippets.map((snippet) => snippet.code);
        }
        if (block.type === "diagram") {
          return [
            ...(block.caption ? [block.caption] : []),
            ...block.nodes.flatMap((node) => [
              node.label,
              ...(node.sub ? [node.sub] : []),
            ]),
            ...block.edges.flatMap((edge) =>
              edge.label ? [edge.label] : [],
            ),
          ];
        }
        return [];
      }),
      ...(lesson.quiz ?? { questions: [] }).questions.flatMap((question) => [
        question.prompt,
        question.explanation,
        ...question.options,
        ...(question.tag ? [question.tag] : []),
        ...(question.code ? [question.code] : []),
      ]),
    ]);

    expect(prose).not.toEqual([]);
    expect(
      prose.filter((text) => /[\u0300-\u036fđ]/iu.test(text.normalize("NFD"))),
    ).toEqual([]);
  });

  it("navigates between translated lessons without skipping the selected locale", () => {
    expect(getAdjacentLessonsForLocale("dsa", "how-to-use-this-hub", "en").next?.slug)
      .toBe("big-o-introduction");
    expect(getAdjacentLessonsForLocale("dsa", "big-o-introduction", "en").next?.slug)
      .toBe("big-o-time-complexities");
    expect(getAdjacentLessonsForLocale("dsa", "big-o-time-complexities", "en").next?.slug)
      .toBe("big-o-space-complexity");
    expect(getAdjacentLessonsForLocale("dsa", "big-o-space-complexity", "en").next?.slug)
      .toBe("big-o-rules");
    expect(getAdjacentLessonsForLocale("dsa", "big-o-rules", "en").next?.slug)
      .toBe("big-o-best-worst-average");
    expect(
      getAdjacentLessonsForLocale("dsa", "big-o-best-worst-average", "en").next
        ?.slug,
    ).toBe("complexity-drill");
    expect(
      getAdjacentLessonsForLocale("dsa", "complexity-drill", "en").next?.slug,
    ).toBe("complexity-quiz-easy");
    expect(
      getAdjacentLessonsForLocale("dsa", "complexity-quiz-easy", "en").next?.slug,
    ).toBe("complexity-quiz-medium");
    expect(
      getAdjacentLessonsForLocale("dsa", "complexity-quiz-medium", "en").next
        ?.slug,
    ).toBe("complexity-quiz-hard");
    expect(
      getAdjacentLessonsForLocale("dsa", "complexity-quiz-hard", "en").next?.slug,
    ).toBe("array-basics");
    expect(findLessonForLocale("system-design", "sd-introduction", "en")?.title)
      .toBe("Introduction to System Design");
  });

  it("navigates through the translated Arrays & Strings lessons in order", () => {
    const nextChain = getAdjacentLessonsForLocale("dsa", "array-basics", "en");
    expect(nextChain.next?.slug).toBe("string-basics");

    expect(
      getAdjacentLessonsForLocale("dsa", "string-basics", "en").prev?.slug,
    ).toBe("array-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "string-basics", "en").next?.slug,
    ).toBe("prefix-sum");
    expect(
      getAdjacentLessonsForLocale("dsa", "prefix-sum", "en").next?.slug,
    ).toBe("arrays-strings-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "arrays-strings-quiz", "en").prev?.slug,
    ).toBe("prefix-sum");
    expect(
      getAdjacentLessonsForLocale("dsa", "arrays-strings-quiz", "en").next?.slug,
    ).toBe("hash-table-basics");
  });

  it("navigates through the translated Hash Tables lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "hash-table-basics", "en").prev?.slug,
    ).toBe("arrays-strings-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "hash-table-basics", "en").next?.slug,
    ).toBe("hash-map-patterns");
    expect(
      getAdjacentLessonsForLocale("dsa", "hash-map-patterns", "en").prev?.slug,
    ).toBe("hash-table-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "hash-map-patterns", "en").next?.slug,
    ).toBe("hash-tables-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "hash-tables-quiz", "en").prev?.slug,
    ).toBe("hash-map-patterns");
    expect(
      getAdjacentLessonsForLocale("dsa", "hash-tables-quiz", "en").next?.slug,
    ).toBe("linked-list-basics");
  });

  it("navigates through the translated Linked Lists lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-basics", "en").prev?.slug,
    ).toBe("hash-tables-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-basics", "en").next?.slug,
    ).toBe("linked-list-operations");
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-operations", "en").prev
        ?.slug,
    ).toBe("linked-list-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-operations", "en").next
        ?.slug,
    ).toBe("linked-list-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-quiz", "en").prev?.slug,
    ).toBe("linked-list-operations");
    // The next Vietnamese lesson is `stack`, still untranslated.
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-quiz", "en").next,
    ).toBeUndefined();
  });

  it("keeps the quiz answer indices when translating quiz copy", () => {
    const sortingQuiz = findLessonForLocale("dsa", "sorting-quiz", "en")?.quiz;
    expect(sortingQuiz?.questions.map((question) => question.answer)).toEqual([
      0, 2, 1, 1, 2, 2,
    ]);

    const arraysStringsQuiz = findLessonForLocale(
      "dsa",
      "arrays-strings-quiz",
      "en",
    )?.quiz;
    expect(
      arraysStringsQuiz?.questions.map((question) => question.answer),
    ).toEqual([0, 2, 1, 1, 2, 2, 1, 1, 1, 0]);
  });

  it("keeps the Big O quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "complexity-drill": [0, 2, 2, 1, 1, 1, 2, 1, 0, 0],
      "complexity-quiz-easy": [0, 2, 2, 1, 0, 2, 1, 0, 1, 1],
      "complexity-quiz-medium": [2, 0, 1, 1, 1, 2, 2, 0, 2, 2],
      "complexity-quiz-hard": [2, 1, 2, 2, 2, 0, 2, 1, 1, 2],
    };

    for (const [slug, answers] of Object.entries(expectedAnswers)) {
      const sourceQuiz = findLesson("dsa", slug)?.quiz;
      const translatedQuiz = findLessonForLocale("dsa", slug, "en")?.quiz;

      expect(sourceQuiz?.questions.map((question) => question.answer)).toEqual(
        answers,
      );
      expect(
        translatedQuiz?.questions.map((question) => question.answer),
      ).toEqual(answers);
    }
  });

  it("keeps the Hash Tables quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "hash-tables-quiz": [0, 1, 0, 1, 2, 1],
    };

    for (const [slug, answers] of Object.entries(expectedAnswers)) {
      const sourceQuiz = findLesson("dsa", slug)?.quiz;
      const translatedQuiz = findLessonForLocale("dsa", slug, "en")?.quiz;

      expect(sourceQuiz?.questions.map((question) => question.answer)).toEqual(
        answers,
      );
      expect(
        translatedQuiz?.questions.map((question) => question.answer),
      ).toEqual(answers);
    }
  });

  it("keeps the Linked Lists quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "linked-list-quiz": [2, 0, 2, 2, 1, 1],
    };

    for (const [slug, answers] of Object.entries(expectedAnswers)) {
      const sourceQuiz = findLesson("dsa", slug)?.quiz;
      const translatedQuiz = findLessonForLocale("dsa", slug, "en")?.quiz;

      expect(sourceQuiz?.questions.map((question) => question.answer)).toEqual(
        answers,
      );
      expect(
        translatedQuiz?.questions.map((question) => question.answer),
      ).toEqual(answers);
    }
  });

  it("localizes the Linked List visualizer without leaking Vietnamese", () => {
    const spec = structureDiagramVisualizers["linked-list"];
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    expect(localized.title).toBe("Linked List — search");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Not checked",
      "cur pointer",
      "Found",
      "null",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.map((stat) => stat.label),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as "≠", which decomposes to a combining overlay.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);
  });
});

describe("translation overlays", () => {
  it("overlays code snippet text by block index and snippet position, preserving lang", () => {
    const lesson = baseLesson({
      blocks: [
        {
          type: "code",
          snippets: [
            { lang: "python", code: "# Ghi chú tiếng Việt" },
            { lang: "javascript", code: "const x = 1;" },
          ],
        },
      ],
    });
    const translation = baseTranslation({
      codeText: { 0: ["# English comment", undefined] },
    });

    const result = applyLessonTranslation(lesson, translation);

    expect(result?.blocks[0]).toEqual({
      type: "code",
      snippets: [
        { lang: "python", code: "# English comment" },
        { lang: "javascript", code: "const x = 1;" },
      ],
    });
  });

  it("leaves code blocks untouched when no code override is provided", () => {
    const lesson = baseLesson({
      blocks: [
        { type: "code", snippets: [{ lang: "python", code: "print('hi')" }] },
      ],
    });

    const result = applyLessonTranslation(lesson, baseTranslation());

    expect(result?.blocks[0]).toEqual(lesson.blocks[0]);
  });

  it("fails closed when a code override targets a non-code block", () => {
    const lesson = baseLesson({ blocks: [{ type: "p", text: "Đoạn văn" }] });
    const translation = baseTranslation({
      blockText: { 0: "Paragraph" },
      codeText: { 0: ["nope"] },
    });

    expect(applyLessonTranslation(lesson, translation)).toBeUndefined();
  });

  it("fails closed when a code override has a snippet count mismatch", () => {
    const lesson = baseLesson({
      blocks: [
        {
          type: "code",
          snippets: [
            { lang: "python", code: "a" },
            { lang: "javascript", code: "b" },
          ],
        },
      ],
    });
    const translation = baseTranslation({ codeText: { 0: ["only one"] } });

    expect(applyLessonTranslation(lesson, translation)).toBeUndefined();
  });

  it("overlays diagram node/edge text while preserving ids, geometry, and topology", () => {
    const lesson = baseLesson({
      blocks: [
        {
          type: "diagram",
          nodes: [
            { id: "api", label: "API", sub: "Cổng", x: 10, y: 20, w: 80, h: 40 },
            { id: "db", label: "DB", sub: "Kho", x: 120, y: 20, w: 80, h: 40 },
          ],
          edges: [{ id: "api-db", from: "api", to: "db", label: "truy vấn" }],
        },
      ],
    });
    const translation = baseTranslation({
      blockText: { 0: "Caption" },
      diagramText: {
        0: {
          nodes: { api: { label: "API Gateway", sub: "Edge" }, db: { sub: "Store" } },
          edges: { "api-db": { label: "query" } },
        },
      },
    });

    const result = applyLessonTranslation(lesson, translation);

    expect(result?.blocks[0]).toEqual({
      type: "diagram",
      caption: "Caption",
      nodes: [
        { id: "api", label: "API Gateway", sub: "Edge", x: 10, y: 20, w: 80, h: 40 },
        { id: "db", label: "DB", sub: "Store", x: 120, y: 20, w: 80, h: 40 },
      ],
      edges: [{ id: "api-db", from: "api", to: "db", label: "query" }],
    });
  });

  it("fails closed on unknown diagram node or edge ids", () => {
    const lesson = baseLesson({
      blocks: [
        {
          type: "diagram",
          nodes: [{ id: "api", label: "API", x: 10, y: 20, w: 80, h: 40 }],
          edges: [{ id: "api-db", from: "api", to: "api" }],
        },
      ],
    });

    expect(
      applyLessonTranslation(
        lesson,
        baseTranslation({
          blockText: { 0: "Caption" },
          diagramText: { 0: { nodes: { missing: { label: "X" } } } },
        }),
      ),
    ).toBeUndefined();
    expect(
      applyLessonTranslation(
        lesson,
        baseTranslation({
          blockText: { 0: "Caption" },
          diagramText: { 0: { edges: { missing: { label: "X" } } } },
        }),
      ),
    ).toBeUndefined();
  });

  it("fails closed when a diagram override targets a non-diagram block", () => {
    const lesson = baseLesson({ blocks: [{ type: "p", text: "Đoạn văn" }] });
    const translation = baseTranslation({
      blockText: { 0: "Paragraph" },
      diagramText: { 0: { nodes: { api: { label: "API" } } } },
    });

    expect(applyLessonTranslation(lesson, translation)).toBeUndefined();
  });

  it("overlays quiz question code without touching id, answer, or question count", () => {
    const lesson = baseLesson({
      quiz: {
        title: "Bài kiểm tra",
        description: "Mô tả",
        questions: [
          {
            id: "q1",
            prompt: "Câu hỏi",
            code: "// mã tiếng Việt",
            options: ["A", "B"],
            answer: 1,
            explanation: "Giải thích",
          },
        ],
      },
    });
    const translation = baseTranslation({
      quiz: {
        title: "Quiz",
        description: "Description",
        questions: [
          {
            prompt: "Question",
            options: ["A", "B"],
            explanation: "Explanation",
            code: "// English code",
          },
        ],
      },
    });

    const result = applyLessonTranslation(lesson, translation);
    const question = result?.quiz?.questions[0];

    expect(result?.quiz?.questions).toHaveLength(1);
    expect(question).toMatchObject({
      id: "q1",
      answer: 1,
      prompt: "Question",
      code: "// English code",
    });
  });
});
