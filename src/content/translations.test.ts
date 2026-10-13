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
import {
  localizeVisualizerSpec,
  visualizerLabels,
} from "@/components/visualizers/algorithm-visualizer";
import { visualizers } from "@/components/visualizers/specs";
import { diagramVisualizers } from "@/components/visualizers/diagram-specs";
import {
  structureArrayVisualizers,
  structureDiagramVisualizers,
} from "@/components/visualizers/structure-specs";
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
      "stack",
      "queue",
      "stacks-queues-quiz",
      "tree-basics",
      "binary-search-tree",
      "tree-traversal",
      "trees-quiz",
      "heap-basics",
      "priority-queue",
      "heaps-quiz",
      "bubble-sort",
      "selection-sort",
      "insertion-sort",
      "sorting-quiz",
      "two-sum",
      "two-pointers-quiz",
      "binary-search",
      "binary-search-quiz",
      "fixed-sliding-window",
      "variable-sliding-window",
      "sliding-window-quiz",
      "recursion-basics",
      "backtracking",
      "recursion-backtracking-quiz",
      "graph-basics",
      "graph-traversal",
      "graphs-quiz",
      "dp-basics",
      "dp-patterns",
      "dp-quiz",
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
    expect(
      findLessonForLocale("system-design", "sd-what-is-system-design", "en")
        ?.title,
    ).toBe("What is System Design?");
  });

  it("publishes the translated System Design lessons in order", () => {
    const course = getCourseForLocale("system-design", "en");
    const slugs = course?.modules.flatMap((courseModule) =>
      courseModule.lessons.map((lesson) => lesson.slug),
    );
    expect(slugs).toEqual([
      "sd-what-is-system-design",
      "sd-top-30-concepts",
      "sd-scalability",
      "sd-availability",
      "sd-reliability",
      "sd-single-point-of-failure",
      "sd-latency-throughput",
      "sd-consistent-hashing",
      "sd-cap",
      "sd-dns-networking",
      "sd-http-proxy-latency",
      "sd-rest-graphql",
      "sd-realtime-communication",
      "sd-what-are-load-balancers",
      "sd-load-balancing-algorithms",
      "sd-dns-load-balancing",
      "sd-anycast-routing",
      "sd-load-balancing-exercises",
      "sd-what-is-caching",
      "sd-caching-strategies",
      "sd-cache-eviction-policies",
      "sd-cache-invalidation",
      "sd-cdn",
      "sd-distributed-cache-architecture",
      "sd-data-models",
      "sd-transactions-acid",
      "sd-indexes-queries",
      "sd-sharding",
      "sd-replication",
      "sd-consistency-models",
      "sd-timeouts-retries-idempotency",
      "sd-failure-detection",
      "sd-cascading-failures",
      "sd-message-queues",
      "sd-rate-limiting",
      "sd-monolith-modular-microservices",
      "sd-sync-async-event-driven",
      "sd-saga-outbox",
      "sd-design-process",
      "sd-back-of-envelope-estimation",
      "sd-case-url-shortener",
      "sd-case-news-feed",
      "sd-case-chat",
    ]);

    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-what-is-system-design",
        "en",
      ),
    ).toMatchObject({ prev: undefined });
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-what-is-system-design",
        "en",
      ).next?.slug,
    ).toBe("sd-top-30-concepts");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-top-30-concepts", "en").prev
        ?.slug,
    ).toBe("sd-what-is-system-design");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-top-30-concepts", "en").next
        ?.slug,
    ).toBe("sd-scalability");

    // The Core Concepts chain stays contiguous and hands off to Networking & APIs.
    const chain = [
      "sd-scalability",
      "sd-availability",
      "sd-reliability",
      "sd-single-point-of-failure",
      "sd-latency-throughput",
      "sd-consistent-hashing",
      "sd-cap",
      "sd-dns-networking",
    ];
    const start = slugs!.indexOf(chain[0]);
    expect(slugs!.slice(start, start + chain.length)).toEqual(chain);
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cap", "en").next?.slug,
    ).toBe("sd-dns-networking");
  });

  it("navigates through the translated Networking & APIs lessons in order", () => {
    // Core Concepts hands off to the first Networking lesson.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cap", "en").next?.slug,
    ).toBe("sd-dns-networking");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-dns-networking", "en").prev
        ?.slug,
    ).toBe("sd-cap");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-dns-networking", "en").next
        ?.slug,
    ).toBe("sd-http-proxy-latency");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-http-proxy-latency", "en")
        .prev?.slug,
    ).toBe("sd-dns-networking");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-http-proxy-latency", "en")
        .next?.slug,
    ).toBe("sd-rest-graphql");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-rest-graphql", "en").prev
        ?.slug,
    ).toBe("sd-http-proxy-latency");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-rest-graphql", "en").next
        ?.slug,
    ).toBe("sd-realtime-communication");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-realtime-communication",
        "en",
      ).prev?.slug,
    ).toBe("sd-rest-graphql");
    // Load Balancing is translated next, so the last Networking & APIs
    // lesson hands off to the first Load Balancing lesson.
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-realtime-communication",
        "en",
      ).next?.slug,
    ).toBe("sd-what-are-load-balancers");

    // The Networking & APIs chain sits between Core Concepts and Load
    // Balancing.
    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-cap",
      "sd-dns-networking",
      "sd-http-proxy-latency",
      "sd-rest-graphql",
      "sd-realtime-communication",
      "sd-what-are-load-balancers",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Databases lessons in order", () => {
    // Distributed Caching hands off to the first Databases lesson.
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-distributed-cache-architecture",
        "en",
      ).next?.slug,
    ).toBe("sd-data-models");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-data-models", "en").prev
        ?.slug,
    ).toBe("sd-distributed-cache-architecture");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-data-models", "en").next
        ?.slug,
    ).toBe("sd-transactions-acid");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-transactions-acid", "en").prev
        ?.slug,
    ).toBe("sd-data-models");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-transactions-acid", "en").next
        ?.slug,
    ).toBe("sd-indexes-queries");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-indexes-queries", "en").prev
        ?.slug,
    ).toBe("sd-transactions-acid");
    // Database Scaling Techniques is translated next, so the last Databases
    // lesson hands off.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-indexes-queries", "en").next
        ?.slug,
    ).toBe("sd-sharding");

    // The Databases chain sits between Caching and Database Scaling
    // Techniques.
    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-distributed-cache-architecture",
      "sd-data-models",
      "sd-transactions-acid",
      "sd-indexes-queries",
      "sd-sharding",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("publishes all four Networking & APIs lessons with reviewed English text", () => {
    const slugs = [
      "sd-dns-networking",
      "sd-http-proxy-latency",
      "sd-rest-graphql",
      "sd-realtime-communication",
    ];
    for (const slug of slugs) {
      const lesson = findLessonForLocale("system-design", slug, "en");
      expect(lesson, slug).toBeDefined();
      expect(lesson?.module, slug).toBe("Networking & APIs");
    }
  });

  it("translates the four Networking & APIs diagrams while preserving topology", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const cases = [
      {
        slug: "sd-dns-networking",
        blockIndex: 23,
        caption:
          "DNS resolution flow: the client asks its stub resolver. On a cache miss, the stub forwards the query to a recursive resolver. The recursive resolver follows referrals from root to TLD to authoritative servers, then returns the IP address for the client to contact the web server.",
      },
      {
        slug: "sd-http-proxy-latency",
        blockIndex: 29,
        caption:
          "A cold connection pays for DNS, TCP, and then the TLS handshake (about one RTT each) before sending the request. A warm connection reuses the keep-alive connection, so its critical path is just request → TTFB → body.",
      },
      {
        slug: "sd-rest-graphql",
        blockIndex: 17,
        caption:
          "A REST client may call several resource endpoints when the data is spread across resources. A GraphQL client sends one query to an endpoint, and the schema and resolvers fetch each field from a suitable source. This is a common pattern; a GraphQL server may still make several calls to its data sources.",
      },
      {
        slug: "sd-realtime-communication",
        blockIndex: 20,
        caption:
          "The three real-time patterns differ in who initiates communication: polling has the client repeat requests; WebSocket keeps a two-way channel open between client and server; a webhook has a provider send a one-way HTTP POST to a callback URL.",
      },
    ];

    for (const { slug, blockIndex, caption } of cases) {
      const source = findLesson("system-design", slug)?.blocks[blockIndex];
      const translated = findLessonForLocale(
        "system-design",
        slug,
        "en",
      )?.blocks[blockIndex];
      expect(source?.type, slug).toBe("diagram");
      expect(translated?.type, slug).toBe("diagram");
      if (source?.type !== "diagram" || translated?.type !== "diagram") {
        continue;
      }

      expect(translated.caption, slug).toBe(caption);
      // The overlay preserves stable ids and edge topology.
      expect(translated.nodes.map((node) => node.id), slug).toEqual(
        source.nodes.map((node) => node.id),
      );
      expect(translated.edges.map((edge) => edge.id), slug).toEqual(
        source.edges.map((edge) => edge.id),
      );

      const prose = [
        translated.caption ?? "",
        ...translated.nodes.flatMap((node) => [
          node.label,
          ...(node.sub ? [node.sub] : []),
        ]),
        ...translated.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
      ];
      expect(prose.filter((text) => vietnamese.test(text)), slug).toEqual([]);
    }
  });

  it("navigates through the translated Load Balancing and Caching lessons in order", () => {
    // Networking & APIs hands off to the first Load Balancing lesson.
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-realtime-communication",
        "en",
      ).next?.slug,
    ).toBe("sd-what-are-load-balancers");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-what-are-load-balancers",
        "en",
      ).prev?.slug,
    ).toBe("sd-realtime-communication");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-what-are-load-balancers",
        "en",
      ).next?.slug,
    ).toBe("sd-load-balancing-algorithms");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-load-balancing-algorithms",
        "en",
      ).prev?.slug,
    ).toBe("sd-what-are-load-balancers");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-load-balancing-algorithms",
        "en",
      ).next?.slug,
    ).toBe("sd-dns-load-balancing");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-dns-load-balancing",
        "en",
      ).prev?.slug,
    ).toBe("sd-load-balancing-algorithms");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-dns-load-balancing", "en")
        .next?.slug,
    ).toBe("sd-anycast-routing");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-anycast-routing", "en")
        .prev?.slug,
    ).toBe("sd-dns-load-balancing");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-anycast-routing", "en")
        .next?.slug,
    ).toBe("sd-load-balancing-exercises");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-load-balancing-exercises",
        "en",
      ).prev?.slug,
    ).toBe("sd-anycast-routing");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-load-balancing-exercises",
        "en",
      ).next?.slug,
    ).toBe("sd-what-is-caching");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-what-is-caching", "en")
        .prev?.slug,
    ).toBe("sd-load-balancing-exercises");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-what-is-caching", "en")
        .next?.slug,
    ).toBe("sd-caching-strategies");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-caching-strategies", "en")
        .prev?.slug,
    ).toBe("sd-what-is-caching");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-caching-strategies", "en")
        .next?.slug,
    ).toBe("sd-cache-eviction-policies");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-cache-eviction-policies",
        "en",
      ).prev?.slug,
    ).toBe("sd-caching-strategies");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-cache-eviction-policies",
        "en",
      ).next?.slug,
    ).toBe("sd-cache-invalidation");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cache-invalidation", "en")
        .prev?.slug,
    ).toBe("sd-cache-eviction-policies");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cache-invalidation", "en")
        .next?.slug,
    ).toBe("sd-cdn");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cdn", "en").prev?.slug,
    ).toBe("sd-cache-invalidation");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cdn", "en").next?.slug,
    ).toBe("sd-distributed-cache-architecture");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-distributed-cache-architecture",
        "en",
      ).prev?.slug,
    ).toBe("sd-cdn");
    // Databases is translated next, so the last Caching lesson hands off.
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-distributed-cache-architecture",
        "en",
      ).next?.slug,
    ).toBe("sd-data-models");

    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-realtime-communication",
      "sd-what-are-load-balancers",
      "sd-load-balancing-algorithms",
      "sd-dns-load-balancing",
      "sd-anycast-routing",
      "sd-load-balancing-exercises",
      "sd-what-is-caching",
      "sd-caching-strategies",
      "sd-cache-eviction-policies",
      "sd-cache-invalidation",
      "sd-cdn",
      "sd-distributed-cache-architecture",
      "sd-data-models",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Database Scaling Techniques lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-indexes-queries", "en").next
        ?.slug,
    ).toBe("sd-sharding");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-sharding", "en").prev?.slug,
    ).toBe("sd-indexes-queries");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-sharding", "en").next?.slug,
    ).toBe("sd-replication");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-replication", "en").prev
        ?.slug,
    ).toBe("sd-sharding");
    // Distributed Systems is translated next, so the last Database Scaling
    // Techniques lesson hands off.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-replication", "en").next
        ?.slug,
    ).toBe("sd-consistency-models");

    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-indexes-queries",
      "sd-sharding",
      "sd-replication",
      "sd-consistency-models",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Distributed Systems lessons in order", () => {
    // Database Scaling Techniques hands off to the first Distributed Systems lesson.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-replication", "en").next
        ?.slug,
    ).toBe("sd-consistency-models");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-consistency-models", "en")
        .prev?.slug,
    ).toBe("sd-replication");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-consistency-models", "en")
        .next?.slug,
    ).toBe("sd-timeouts-retries-idempotency");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-timeouts-retries-idempotency",
        "en",
      ).prev?.slug,
    ).toBe("sd-consistency-models");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-timeouts-retries-idempotency",
        "en",
      ).next?.slug,
    ).toBe("sd-failure-detection");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-failure-detection", "en")
        .prev?.slug,
    ).toBe("sd-timeouts-retries-idempotency");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-failure-detection", "en")
        .next?.slug,
    ).toBe("sd-cascading-failures");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cascading-failures", "en")
        .prev?.slug,
    ).toBe("sd-failure-detection");
    // Reliability is translated next, so the last Distributed Systems lesson
    // hands off to it.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cascading-failures", "en")
        .next?.slug,
    ).toBe("sd-message-queues");

    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-replication",
      "sd-consistency-models",
      "sd-timeouts-retries-idempotency",
      "sd-failure-detection",
      "sd-cascading-failures",
      "sd-message-queues",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Reliability lessons in order", () => {
    // Distributed Systems hands off to the first Reliability lesson.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-cascading-failures", "en")
        .next?.slug,
    ).toBe("sd-message-queues");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-message-queues", "en").prev
        ?.slug,
    ).toBe("sd-cascading-failures");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-message-queues", "en").next
        ?.slug,
    ).toBe("sd-rate-limiting");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-rate-limiting", "en").prev
        ?.slug,
    ).toBe("sd-message-queues");
    // Architecture Patterns is translated next, so the last lesson hands off.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-rate-limiting", "en").next
        ?.slug,
    ).toBe("sd-monolith-modular-microservices");

    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-cascading-failures",
      "sd-message-queues",
      "sd-rate-limiting",
      "sd-monolith-modular-microservices",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Architecture Patterns lessons in order", () => {
    // Reliability hands off to the first Architecture Patterns lesson.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-rate-limiting", "en").next
        ?.slug,
    ).toBe("sd-monolith-modular-microservices");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-monolith-modular-microservices",
        "en",
      ).prev?.slug,
    ).toBe("sd-rate-limiting");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-monolith-modular-microservices",
        "en",
      ).next?.slug,
    ).toBe("sd-sync-async-event-driven");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-sync-async-event-driven",
        "en",
      ).prev?.slug,
    ).toBe("sd-monolith-modular-microservices");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-sync-async-event-driven",
        "en",
      ).next?.slug,
    ).toBe("sd-saga-outbox");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-saga-outbox", "en").prev
        ?.slug,
    ).toBe("sd-sync-async-event-driven");
    // Design Process is translated next, so the last lesson hands off.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-saga-outbox", "en").next
        ?.slug,
    ).toBe("sd-design-process");

    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-rate-limiting",
      "sd-monolith-modular-microservices",
      "sd-sync-async-event-driven",
      "sd-saga-outbox",
      "sd-design-process",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Design Process lessons in order", () => {
    // Architecture Patterns hands off to the first Design Process lesson.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-saga-outbox", "en").next
        ?.slug,
    ).toBe("sd-design-process");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-design-process", "en").prev
        ?.slug,
    ).toBe("sd-saga-outbox");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-design-process", "en").next
        ?.slug,
    ).toBe("sd-back-of-envelope-estimation");
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-back-of-envelope-estimation",
        "en",
      ).prev?.slug,
    ).toBe("sd-design-process");
    // Case Studies is translated next, so the last lesson hands off.
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-back-of-envelope-estimation",
        "en",
      ).next?.slug,
    ).toBe("sd-case-url-shortener");

    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-saga-outbox",
      "sd-design-process",
      "sd-back-of-envelope-estimation",
      "sd-case-url-shortener",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Case Studies lessons in order", () => {
    // Design Process hands off to the first Case Study.
    expect(
      getAdjacentLessonsForLocale(
        "system-design",
        "sd-back-of-envelope-estimation",
        "en",
      ).next?.slug,
    ).toBe("sd-case-url-shortener");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-case-url-shortener", "en")
        .prev?.slug,
    ).toBe("sd-back-of-envelope-estimation");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-case-url-shortener", "en")
        .next?.slug,
    ).toBe("sd-case-news-feed");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-case-news-feed", "en").prev
        ?.slug,
    ).toBe("sd-case-url-shortener");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-case-news-feed", "en").next
        ?.slug,
    ).toBe("sd-case-chat");
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-case-chat", "en").prev?.slug,
    ).toBe("sd-case-news-feed");
    // Case Studies is the final System Design module, so the last lesson has no next.
    expect(
      getAdjacentLessonsForLocale("system-design", "sd-case-chat", "en").next,
    ).toBeUndefined();

    const published = getCourseForLocale("system-design", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sd-back-of-envelope-estimation",
      "sd-case-url-shortener",
      "sd-case-news-feed",
      "sd-case-chat",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
    expect(published.at(-1)).toBe("sd-case-chat");
  });

  it("translates the sd-what-is-system-design diagram and natural-language code", () => {
    const lesson = findLessonForLocale(
      "system-design",
      "sd-what-is-system-design",
      "en",
    );
    const diagram = lesson?.blocks[26];
    expect(diagram?.type).toBe("diagram");
    if (diagram?.type !== "diagram") return;
    expect(diagram.caption).toBe(
      "Architecture of a large-scale photo-sharing app.",
    );
    expect(
      diagram.edges.find((edge) => edge.id === "cdn-client")?.label,
    ).toBe("photo");

    // Both locales show the client uploading bytes directly to object storage,
    // and neither implies the bytes flow through the app server.
    const source = findLesson("system-design", "sd-what-is-system-design");
    const sourceDiagram = source?.blocks[26];
    expect(sourceDiagram?.type).toBe("diagram");
    if (sourceDiagram?.type !== "diagram") return;
    const directUpload = (edges: typeof diagram.edges) =>
      edges.find((edge) => edge.id === "client-obj");
    const noAppByteFlow = (edges: typeof diagram.edges) =>
      edges.some((edge) => edge.from === "app" && edge.to === "obj");

    expect(directUpload(sourceDiagram.edges)).toMatchObject({
      from: "client",
      to: "obj",
      label: "upload ảnh trực tiếp",
    });
    expect(noAppByteFlow(sourceDiagram.edges)).toBe(false);
    expect(directUpload(diagram.edges)).toMatchObject({
      from: "client",
      to: "obj",
      label: "direct photo upload",
    });
    expect(noAppByteFlow(diagram.edges)).toBe(false);

    const code = lesson?.blocks[15];
    expect(code?.type).toBe("code");
    if (code?.type !== "code") return;
    expect(code.snippets[0].code).toContain("Upload photo   POST /photos");
    expect(code.snippets[0].code).not.toContain("Đăng ảnh");

    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const prose = [
      diagram.caption ?? "",
      ...diagram.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
      ...code.snippets.map((snippet) => snippet.code),
    ];
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // Other natural-language code comments in the module are translated too.
    const concepts = findLessonForLocale(
      "system-design",
      "sd-top-30-concepts",
      "en",
    );
    const idempotency = concepts?.blocks[72];
    expect(idempotency?.type).toBe("code");
    if (idempotency?.type !== "code") return;
    expect(idempotency.snippets[0].code).toContain("no second charge");
    expect(idempotency.snippets[0].code).not.toContain("không trừ tiền");
  });

  it("translates the sd-caching-strategies and sd-cdn diagrams while preserving topology", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const cases = [
      {
        slug: "sd-caching-strategies",
        blockIndex: 3,
        caption:
          "On a cache hit, return the data immediately. On a miss, query the database, write the result to the cache, then return it to the client.",
      },
      {
        slug: "sd-cdn",
        blockIndex: 6,
        caption:
          "The CDN serves a cache hit from the nearest edge. On a miss, it fetches the content from the origin, caches it at the edge, and returns it to the user.",
      },
    ];

    for (const { slug, blockIndex, caption } of cases) {
      const source = findLesson("system-design", slug)?.blocks[blockIndex];
      const translated = findLessonForLocale(
        "system-design",
        slug,
        "en",
      )?.blocks[blockIndex];
      expect(source?.type, slug).toBe("diagram");
      expect(translated?.type, slug).toBe("diagram");
      if (source?.type !== "diagram" || translated?.type !== "diagram") {
        continue;
      }

      expect(translated.caption).toBe(caption);
      // The overlay preserves stable ids and edge topology.
      expect(translated.nodes.map((node) => node.id)).toEqual(
        source.nodes.map((node) => node.id),
      );
      expect(
        translated.edges.map((edge) => ({
          id: edge.id,
          from: edge.from,
          to: edge.to,
        })),
      ).toEqual(
        source.edges.map((edge) => ({
          id: edge.id,
          from: edge.from,
          to: edge.to,
        })),
      );

      const prose = [
        translated.caption ?? "",
        ...translated.nodes.flatMap((node) => [
          node.label,
          ...(node.sub ? [node.sub] : []),
        ]),
        ...translated.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
      ];
      expect(prose.filter((text) => vietnamese.test(text)), slug).toEqual([]);
    }
  });

  it("translates the three Data diagrams while preserving topology", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const cases: {
      slug: string;
      blockIndex: number;
      caption: string;
      nodeLabels?: Record<string, string>;
      nodeSubs?: Record<string, string>;
      edgeLabels?: Record<string, string>;
    }[] = [
      {
        slug: "sd-sharding",
        blockIndex: 8,
        caption:
          "A key's hash falls on the ring between nodes; map the key to the next node clockwise.",
        nodeLabels: { "node-a": "Node A", key: "Key K" },
        nodeSubs: {
          "node-a": "position on the ring",
          key: "hash position on the ring",
        },
        edgeLabels: {
          "ring-a-b": "clockwise",
          "key-node-b": "map to the next node",
        },
      },
      {
        slug: "sd-replication",
        blockIndex: 7,
        caption:
          "The leader accepts writes and replicates the data to its followers.",
        nodeLabels: { leader: "Leader", "follower-1": "Follower 1" },
        nodeSubs: { leader: "accepts writes", "follower-1": "replica" },
        edgeLabels: { "leader-follower-1": "replicate data" },
      },
      {
        slug: "sd-cap",
        blockIndex: 6,
        caption:
          "During a network partition (P), a system cannot guarantee both Consistency (C) and Availability (A).",
        nodeSubs: {
          consistency: "Consistency",
          partition: "Partition tolerance",
        },
        edgeLabels: {
          "consistency-availability": "during P: cannot guarantee both",
          "consistency-partition": "CP: favor Consistency",
        },
      },
    ];

    for (const {
      slug,
      blockIndex,
      caption,
      nodeLabels,
      nodeSubs,
      edgeLabels,
    } of cases) {
      const source = findLesson("system-design", slug)?.blocks[blockIndex];
      const translated = findLessonForLocale(
        "system-design",
        slug,
        "en",
      )?.blocks[blockIndex];
      expect(source?.type, slug).toBe("diagram");
      expect(translated?.type, slug).toBe("diagram");
      if (source?.type !== "diagram" || translated?.type !== "diagram") {
        continue;
      }

      expect(translated.caption).toBe(caption);
      // The overlay preserves stable ids and edge topology.
      expect(translated.nodes.map((node) => node.id), slug).toEqual(
        source.nodes.map((node) => node.id),
      );
      expect(translated.edges.map((edge) => edge.id), slug).toEqual(
        source.edges.map((edge) => edge.id),
      );

      const byNodeId = new Map(translated.nodes.map((node) => [node.id, node]));
      for (const [id, label] of Object.entries(nodeLabels ?? {})) {
        expect(byNodeId.get(id)?.label, `${slug}:${id}`).toBe(label);
      }
      for (const [id, sub] of Object.entries(nodeSubs ?? {})) {
        expect(byNodeId.get(id)?.sub, `${slug}:${id}`).toBe(sub);
      }
      const byEdgeId = new Map(translated.edges.map((edge) => [edge.id, edge]));
      for (const [id, label] of Object.entries(edgeLabels ?? {})) {
        expect(byEdgeId.get(id)?.label, `${slug}:${id}`).toBe(label);
      }

      const prose = [
        translated.caption ?? "",
        ...translated.nodes.flatMap((node) => [
          node.label,
          ...(node.sub ? [node.sub] : []),
        ]),
        ...translated.edges.flatMap((edge) =>
          edge.label ? [edge.label] : [],
        ),
      ];
      expect(prose.filter((text) => vietnamese.test(text)), slug).toEqual([]);
    }
  });

  it("translates the eight sd-top-30-concepts diagrams at their indices", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const cases = [
      {
        blockIndex: 6,
        caption:
          "The client–server flow: the client sends a request, the server processes it and returns a response. Separating the two roles lets each side change and scale independently.",
      },
      {
        blockIndex: 9,
        caption:
          "A packet is routed toward the destination IP address. On a private network, devices use private IPs; a NAT router maps them to a public IP on the way out to the Internet.",
      },
      {
        blockIndex: 12,
        caption:
          "DNS resolves a domain through the local cache, resolver, root, TLD, and authoritative servers; the client then uses the IP address to reach the server.",
      },
      {
        blockIndex: 15,
        caption:
          "A forward proxy sits in front of clients and hides their identity; a reverse proxy sits in front of servers, hides them, and handles TLS, caching, and load balancing.",
      },
      {
        blockIndex: 44,
        caption:
          "With cache-aside, the application checks the cache first: on a hit, it returns the result immediately; on a miss, it reads from the database and updates the cache. Cache invalidation is the hard part.",
      },
      {
        blockIndex: 62,
        caption:
          "Replication copies the full dataset to reduce read load; sharding partitions the dataset by shard key to distribute traffic and storage.",
      },
      {
        blockIndex: 69,
        caption:
          "The first request in a region misses the cache and goes to the origin; later requests are served from an edge cache near the user.",
      },
      {
        blockIndex: 83,
        caption:
          "The API gateway is the system’s entry point, handling routing, authentication, and rate limiting. Services can enqueue asynchronous work for workers to process.",
      },
    ];

    const source = findLesson("system-design", "sd-top-30-concepts");
    const translated = findLessonForLocale(
      "system-design",
      "sd-top-30-concepts",
      "en",
    );

    for (const { blockIndex, caption } of cases) {
      const src = source?.blocks[blockIndex];
      const out = translated?.blocks[blockIndex];
      expect(src?.type, `${blockIndex}:source`).toBe("diagram");
      expect(out?.type, `${blockIndex}:translated`).toBe("diagram");
      if (src?.type !== "diagram" || out?.type !== "diagram") continue;

      expect(out.caption, `${blockIndex}:caption`).toBe(caption);
      // The overlay preserves stable ids and edge topology.
      expect(out.nodes.map((node) => node.id), `${blockIndex}:ids`).toEqual(
        src.nodes.map((node) => node.id),
      );
      expect(out.edges.map((edge) => edge.id), `${blockIndex}:edges`).toEqual(
        src.edges.map((edge) => edge.id),
      );

      const prose = [
        out.caption ?? "",
        ...out.nodes.flatMap((node) => [
          node.label,
          ...(node.sub ? [node.sub] : []),
        ]),
        ...out.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
      ];
      expect(
        prose.filter((text) => vietnamese.test(text)),
        `${blockIndex}:leak`,
      ).toEqual([]);
    }
  });

  it("keeps the HTTP/HTTPS inline visualizer on h3 section 6 in both locales", () => {
    const source = findLesson("system-design", "sd-top-30-concepts");
    const translated = findLessonForLocale(
      "system-design",
      "sd-top-30-concepts",
      "en",
    );

    // The h3 for section 6 carries the inline visualizer (index shifted by the
    // Proxy diagram added in section 4).
    expect(source?.blocks[18]).toMatchObject({
      type: "h3",
      text: "6. HTTP / HTTPS",
      visualizer: "http-https",
    });
    expect(translated?.blocks[18]).toMatchObject({
      type: "h3",
      text: "6. HTTP / HTTPS",
      visualizer: "http-https",
    });

    // The animation sits between the heading and the HTTP/HTTPS paragraph,
    // without shifting any neighbouring block.
    expect(source?.blocks[17]?.type).toBe("p");
    expect(source?.blocks[19]?.type).toBe("p");
    expect(translated?.blocks[19]?.type).toBe("p");
  });

  it("exposes the new System Design motion visuals in both locales", () => {
    // The photo-app request flow is an inline h3 visualizer; the English lesson
    // keeps the same block index and the visualizer wiring.
    const source = findLesson("system-design", "sd-what-is-system-design");
    const translated = findLessonForLocale(
      "system-design",
      "sd-what-is-system-design",
      "en",
    );
    const flowIndex =
      source?.blocks.findIndex(
        (block) => block.type === "h3" && block.visualizer === "request-flow",
      ) ?? -1;
    expect(flowIndex).toBeGreaterThan(-1);
    expect(translated?.blocks[flowIndex]).toMatchObject({
      type: "h3",
      visualizer: "request-flow",
    });
    expect(
      translated?.blocks[flowIndex]?.type === "h3"
        ? translated.blocks[flowIndex].text
        : "",
    ).toBe("Visualizing the upload and feed flows");

    // Rate limiting keeps its lesson-level Token Bucket and adds the fixed vs
    // sliding comparison inline in both locales.
    for (const locale of ["vi", "en"] as const) {
      const lesson =
        locale === "vi"
          ? findLesson("system-design", "sd-rate-limiting")
          : findLessonForLocale("system-design", "sd-rate-limiting", "en");
      expect(lesson?.visualizer, locale).toBe("token-bucket");
      expect(
        lesson?.blocks.some(
          (block) =>
            block.type === "h3" && block.visualizer === "rate-limit-window",
        ),
        locale,
      ).toBe(true);
    }

    // Consistent hashing attaches the ring visualizer as a lesson-level visual.
    expect(
      findLesson("system-design", "sd-consistent-hashing")?.visualizer,
    ).toBe("consistent-hashing-ring");
    expect(
      findLessonForLocale("system-design", "sd-consistent-hashing", "en")
        ?.visualizer,
    ).toBe("consistent-hashing-ring");
  });

  it("localizes the Round Robin visualizer without leaking Vietnamese", () => {
    const spec = diagramVisualizers["load-balancer-round-robin"];
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    expect(localized.title).toBe("Round Robin — simulation");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Waiting",
      "Routing",
      "Processed",
      "Unavailable",
      "Request",
    ]);
    expect(localized.pseudo.join("\n")).toContain(
      "// skip servers that are down",
    );
    expect(localized.pseudo.join("\n")).not.toContain("bỏ qua server down");

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math/arrow symbols such as "→", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // The reviewed English copy is used verbatim.
    expect(frames[0].note).toBe("Initialize i = 0. All 3 servers are healthy.");
    expect(frames[0].stats.map((stat) => stat.label)).toEqual([
      "Request",
      "index i",
      "Available servers",
    ]);
    expect(frames[0].stats.at(-1)?.value).toBe("3/3");
    expect(frames[1].note).toBe(
      "Request 1: i = 0 → select Server 1 (i % 3).",
    );
    expect(
      frames.find((frame) => frame.note.startsWith("Health check"))?.note,
    ).toBe(
      "Health check: Server 2 is not responding → remove it from rotation.",
    );
    expect(frames.at(-1)?.note).toBe(
      "Completed 6 requests using round robin.",
    );

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.pseudo.join("\n")).toContain("bỏ qua server down");
    expect(spec.build()[0].note).toContain("khỏe mạnh");
    expect(spec.build()[0].stats.at(-1)?.label).toBe("Server khả dụng");
  });

  it("localizes the Token Bucket visualizer without leaking Vietnamese", () => {
    const spec = diagramVisualizers["token-bucket"];
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    expect(localized.title).toBe("Token Bucket — simulation");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Waiting",
      "Refill / transfer",
      "Allowed",
      "Rejected (429)",
      "Request",
    ]);
    expect(localized.pseudo.join("\n")).toContain(
      "// refill tokens over time",
    );
    expect(localized.pseudo.join("\n")).not.toContain("nạp token theo thời gian");

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math/arrow symbols such as "≥" or "→", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // The reviewed English copy is used verbatim.
    expect(frames[0].note).toBe(
      "Initialize with a full bucket: 5 tokens.",
    );
    expect(frames[0].stats.map((stat) => stat.label)).toEqual([
      "Request",
      "Token",
      "Result",
    ]);
    expect(frames[1].note).toBe("Request 1 arrives. Check tokens = 5.");
    expect(frames[2].note).toBe(
      "tokens ≥ 1 → subtract 1; 4/5 remaining.",
    );
    expect(
      frames.find((frame) => frame.note.startsWith("Time elapsed"))?.note,
    ).toBe("Time elapsed → refill 1 token (4/5 now).");
    expect(
      frames.find((frame) => frame.note.startsWith("tokens = 0 → reject"))
        ?.note,
    ).toBe(
      "tokens = 0 → reject request 8: 429 Too Many Requests.",
    );
    expect(frames.at(-1)?.note).toBe(
      "Finished: 0/5 tokens remaining.",
    );

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.pseudo.join("\n")).toContain("nạp token theo thời gian");
    expect(spec.build()[0].note).toContain("bộ đếm đầy");
    expect(spec.build()[0].stats.at(-1)?.label).toBe("Kết quả");
  });

  it("localizes the HTTP/HTTPS visualizer without leaking Vietnamese", () => {
    const spec = diagramVisualizers["http-https"];
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    expect(localized.title).toBe("HTTP / HTTPS — simulation");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Waiting",
      "In transit",
      "Protected",
      "Plaintext exposed",
      "Unreadable",
      "Data",
    ]);
    expect(localized.pseudo.join("\n")).toContain("observer: reads everything");
    expect(localized.pseudo.join("\n")).toContain("derive the session key");
    expect(localized.pseudo.join("\n")).not.toContain("đọc được tất cả");

    // Node labels/subs are localized, not accidentally left in Vietnamese.
    const enNode = (id: string) =>
      localized.nodes.find((node) => node.id === id);
    expect(enNode("observer")).toMatchObject({
      label: "Observer",
      sub: "on the network",
    });
    expect(enNode("cert")).toMatchObject({
      label: "Certificate",
      sub: "identity",
    });
    expect(enNode("key")).toMatchObject({
      label: "Session key",
      sub: "derived by both sides",
    });

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...localized.nodes.flatMap((node) => [
        node.label,
        ...(node.sub ? [node.sub] : []),
      ]),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
        ...(frame.packets ?? []).flatMap((packet) =>
          packet.label ? [packet.label] : [],
        ),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math/arrow symbols such as "→" or "⇄", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // Reviewed English copy is used verbatim for the key teaching frames.
    expect(frames[0].note).toBe(
      "HTTP: requests and responses travel as plaintext on the network.",
    );
    expect(frames[5].packets?.[0]?.label).toBe("certificate");
    // The session key is derived from the handshake; no key is sent as a packet.
    expect(frames[6].packets ?? []).toEqual([]);
    expect(frames[6].note).toContain("no secret key is sent");
    expect(frames[7].note).toContain("TLS uses the session key");
    expect(frames[9].stats.map((stat) => stat.label)).toEqual([
      "Scheme",
      "In transit",
      "Observer",
    ]);

    // Vietnamese stays the default and its node text is genuinely localized.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.build()[0].note).toContain("văn bản thường");
    expect(spec.build()[5].packets?.[0]?.label).toBe("chứng chỉ");
    expect(spec.build()[9].stats[0].label).toBe("Giao thức");
    expect(spec.nodes.find((node) => node.id === "observer")?.label).toBe(
      "Người quan sát",
    );
    expect(spec.nodes.find((node) => node.id === "key")?.label).toBe(
      "Khoá phiên",
    );
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
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-quiz", "en").next?.slug,
    ).toBe("stack");
  });

  it("navigates through the translated Stacks & Queues lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "linked-list-quiz", "en").next?.slug,
    ).toBe("stack");
    expect(
      getAdjacentLessonsForLocale("dsa", "stack", "en").prev?.slug,
    ).toBe("linked-list-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "stack", "en").next?.slug,
    ).toBe("queue");
    expect(
      getAdjacentLessonsForLocale("dsa", "queue", "en").prev?.slug,
    ).toBe("stack");
    expect(
      getAdjacentLessonsForLocale("dsa", "queue", "en").next?.slug,
    ).toBe("stacks-queues-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "stacks-queues-quiz", "en").prev?.slug,
    ).toBe("queue");
    // The Stacks & Queues chain stays contiguous and ends at its quiz; the Trees
    // lessons now follow it, but are asserted in their own coverage below.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "linked-list-quiz",
      "stack",
      "queue",
      "stacks-queues-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Trees lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "stacks-queues-quiz", "en").next?.slug,
    ).toBe("tree-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "tree-basics", "en").prev?.slug,
    ).toBe("stacks-queues-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "tree-basics", "en").next?.slug,
    ).toBe("binary-search-tree");
    expect(
      getAdjacentLessonsForLocale("dsa", "binary-search-tree", "en").prev?.slug,
    ).toBe("tree-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "binary-search-tree", "en").next?.slug,
    ).toBe("tree-traversal");
    expect(
      getAdjacentLessonsForLocale("dsa", "tree-traversal", "en").prev?.slug,
    ).toBe("binary-search-tree");
    expect(
      getAdjacentLessonsForLocale("dsa", "tree-traversal", "en").next?.slug,
    ).toBe("trees-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "trees-quiz", "en").prev?.slug,
    ).toBe("tree-traversal");
    // Heaps are translated next, so the Trees quiz hands off to the Heaps batch.
    expect(
      getAdjacentLessonsForLocale("dsa", "trees-quiz", "en").next?.slug,
    ).toBe("heap-basics");
  });

  it("navigates through the translated Heaps lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "trees-quiz", "en").next?.slug,
    ).toBe("heap-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "heap-basics", "en").prev?.slug,
    ).toBe("trees-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "heap-basics", "en").next?.slug,
    ).toBe("priority-queue");
    expect(
      getAdjacentLessonsForLocale("dsa", "priority-queue", "en").prev?.slug,
    ).toBe("heap-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "priority-queue", "en").next?.slug,
    ).toBe("heaps-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "heaps-quiz", "en").prev?.slug,
    ).toBe("priority-queue");
    expect(
      getAdjacentLessonsForLocale("dsa", "heaps-quiz", "en").next?.slug,
    ).toBe("bubble-sort");
    // The Heaps chain stays contiguous between Trees and Sorting.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "trees-quiz",
      "heap-basics",
      "priority-queue",
      "heaps-quiz",
      "bubble-sort",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Sorting lessons in order", () => {
    // Heaps still hand off to Bubble Sort now that the rest of Sorting is live.
    expect(
      getAdjacentLessonsForLocale("dsa", "heaps-quiz", "en").next?.slug,
    ).toBe("bubble-sort");
    expect(
      getAdjacentLessonsForLocale("dsa", "bubble-sort", "en").prev?.slug,
    ).toBe("heaps-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "bubble-sort", "en").next?.slug,
    ).toBe("selection-sort");
    expect(
      getAdjacentLessonsForLocale("dsa", "selection-sort", "en").prev?.slug,
    ).toBe("bubble-sort");
    expect(
      getAdjacentLessonsForLocale("dsa", "selection-sort", "en").next?.slug,
    ).toBe("insertion-sort");
    expect(
      getAdjacentLessonsForLocale("dsa", "insertion-sort", "en").prev?.slug,
    ).toBe("selection-sort");
    expect(
      getAdjacentLessonsForLocale("dsa", "insertion-sort", "en").next?.slug,
    ).toBe("sorting-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "sorting-quiz", "en").prev?.slug,
    ).toBe("insertion-sort");
    // The Sorting quiz hands off to the Two Pointers batch.
    expect(
      getAdjacentLessonsForLocale("dsa", "sorting-quiz", "en").next?.slug,
    ).toBe("two-sum");

    // The Sorting chain stays contiguous through the new lessons.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "bubble-sort",
      "selection-sort",
      "insertion-sort",
      "sorting-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Two Pointers lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "sorting-quiz", "en").next?.slug,
    ).toBe("two-sum");
    expect(
      getAdjacentLessonsForLocale("dsa", "two-sum", "en").prev?.slug,
    ).toBe("sorting-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "two-sum", "en").next?.slug,
    ).toBe("two-pointers-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "two-pointers-quiz", "en").prev?.slug,
    ).toBe("two-sum");
    // Binary Search is translated next, so the Two Pointers quiz hands off to it.
    expect(
      getAdjacentLessonsForLocale("dsa", "two-pointers-quiz", "en").next?.slug,
    ).toBe("binary-search");

    // The Two Pointers chain stays contiguous after Sorting.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sorting-quiz",
      "two-sum",
      "two-pointers-quiz",
      "binary-search",
      "binary-search-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Binary Search lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "two-pointers-quiz", "en").next?.slug,
    ).toBe("binary-search");
    expect(
      getAdjacentLessonsForLocale("dsa", "binary-search", "en").prev?.slug,
    ).toBe("two-pointers-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "binary-search", "en").next?.slug,
    ).toBe("binary-search-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "binary-search-quiz", "en").prev?.slug,
    ).toBe("binary-search");
    // Sliding Window is translated next, so the Binary Search quiz hands off.
    expect(
      getAdjacentLessonsForLocale("dsa", "binary-search-quiz", "en").next?.slug,
    ).toBe("fixed-sliding-window");

    // The Binary Search chain stays contiguous after Two Pointers.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "two-pointers-quiz",
      "binary-search",
      "binary-search-quiz",
      "fixed-sliding-window",
      "variable-sliding-window",
      "sliding-window-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Sliding Window lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "binary-search-quiz", "en").next?.slug,
    ).toBe("fixed-sliding-window");
    expect(
      getAdjacentLessonsForLocale("dsa", "fixed-sliding-window", "en").prev?.slug,
    ).toBe("binary-search-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "fixed-sliding-window", "en").next?.slug,
    ).toBe("variable-sliding-window");
    expect(
      getAdjacentLessonsForLocale("dsa", "variable-sliding-window", "en").prev
        ?.slug,
    ).toBe("fixed-sliding-window");
    expect(
      getAdjacentLessonsForLocale("dsa", "variable-sliding-window", "en").next
        ?.slug,
    ).toBe("sliding-window-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "sliding-window-quiz", "en").prev?.slug,
    ).toBe("variable-sliding-window");
    // Recursion & Backtracking is translated next, so the quiz hands off to it.
    expect(
      getAdjacentLessonsForLocale("dsa", "sliding-window-quiz", "en").next?.slug,
    ).toBe("recursion-basics");

    // The Sliding Window chain stays contiguous after Binary Search.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "binary-search-quiz",
      "fixed-sliding-window",
      "variable-sliding-window",
      "sliding-window-quiz",
      "recursion-basics",
      "backtracking",
      "recursion-backtracking-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Recursion & Backtracking lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "sliding-window-quiz", "en").next?.slug,
    ).toBe("recursion-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "recursion-basics", "en").prev?.slug,
    ).toBe("sliding-window-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "recursion-basics", "en").next?.slug,
    ).toBe("backtracking");
    expect(
      getAdjacentLessonsForLocale("dsa", "backtracking", "en").prev?.slug,
    ).toBe("recursion-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "backtracking", "en").next?.slug,
    ).toBe("recursion-backtracking-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "recursion-backtracking-quiz", "en").prev
        ?.slug,
    ).toBe("backtracking");
    // Graphs is translated next, so the quiz hands off to graph-basics.
    expect(
      getAdjacentLessonsForLocale("dsa", "recursion-backtracking-quiz", "en").next
        ?.slug,
    ).toBe("graph-basics");

    // The Recursion & Backtracking chain stays contiguous after Sliding Window.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "sliding-window-quiz",
      "recursion-basics",
      "backtracking",
      "recursion-backtracking-quiz",
      "graph-basics",
      "graph-traversal",
      "graphs-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Graphs lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "recursion-backtracking-quiz", "en").next
        ?.slug,
    ).toBe("graph-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "graph-basics", "en").prev?.slug,
    ).toBe("recursion-backtracking-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "graph-basics", "en").next?.slug,
    ).toBe("graph-traversal");
    expect(
      getAdjacentLessonsForLocale("dsa", "graph-traversal", "en").prev?.slug,
    ).toBe("graph-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "graph-traversal", "en").next?.slug,
    ).toBe("graphs-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "graphs-quiz", "en").prev?.slug,
    ).toBe("graph-traversal");
    // Dynamic Programming is translated next, so the quiz hands off to it.
    expect(
      getAdjacentLessonsForLocale("dsa", "graphs-quiz", "en").next?.slug,
    ).toBe("dp-basics");

    // The Graphs chain stays contiguous after Recursion & Backtracking.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "recursion-backtracking-quiz",
      "graph-basics",
      "graph-traversal",
      "graphs-quiz",
      "dp-basics",
      "dp-patterns",
      "dp-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
  });

  it("navigates through the translated Dynamic Programming lessons in order", () => {
    expect(
      getAdjacentLessonsForLocale("dsa", "graphs-quiz", "en").next?.slug,
    ).toBe("dp-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "dp-basics", "en").prev?.slug,
    ).toBe("graphs-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "dp-basics", "en").next?.slug,
    ).toBe("dp-patterns");
    expect(
      getAdjacentLessonsForLocale("dsa", "dp-patterns", "en").prev?.slug,
    ).toBe("dp-basics");
    expect(
      getAdjacentLessonsForLocale("dsa", "dp-patterns", "en").next?.slug,
    ).toBe("dp-quiz");
    expect(
      getAdjacentLessonsForLocale("dsa", "dp-quiz", "en").prev?.slug,
    ).toBe("dp-patterns");
    // Dynamic Programming is the final DSA module, so the quiz has no next.
    expect(getAdjacentLessonsForLocale("dsa", "dp-quiz", "en").next).toBeUndefined();

    // The Dynamic Programming chain stays contiguous and closes out the course.
    const published = getCourseForLocale("dsa", "en")!.modules.flatMap(
      (courseModule) => courseModule.lessons.map((lesson) => lesson.slug),
    );
    const chain = [
      "graphs-quiz",
      "dp-basics",
      "dp-patterns",
      "dp-quiz",
    ];
    const start = published.indexOf(chain[0]);
    expect(published.slice(start, start + chain.length)).toEqual(chain);
    expect(published.at(-1)).toBe("dp-quiz");
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

  it("keeps the Stacks & Queues quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "stacks-queues-quiz": [1, 1, 0, 1, 1, 1],
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

  it("keeps the Trees quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "trees-quiz": [1, 2, 1, 1, 2, 1],
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

  it("keeps the Heaps quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "heaps-quiz": [1, 1, 1, 0, 1, 2],
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

  it("keeps the Two Pointers quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "two-pointers-quiz": [1, 1, 1, 3, 2],
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

  it("keeps the Binary Search quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "binary-search-quiz": [1, 1, 1, 1, 1],
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

  it("keeps the Sliding Window quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "sliding-window-quiz": [0, 1, 1, 1, 2, 0],
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

  it("keeps the Recursion & Backtracking quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "recursion-backtracking-quiz": [1, 2, 1, 1, 2, 0],
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

  it("keeps the Graphs quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "graphs-quiz": [0, 1, 1, 1, 2, 1],
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

  it("keeps the Dynamic Programming quiz answer indices from the Vietnamese source", () => {
    const expectedAnswers: Record<string, number[]> = {
      "dp-quiz": [1, 0, 1, 0, 2, 1],
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

  it("localizes the BST visualizer without leaking Vietnamese", () => {
    const spec = structureDiagramVisualizers["binary-search-tree"];
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    expect(localized.title).toBe("BST — search");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Not checked",
      "Comparing",
      "Found",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as "→", which decomposes to a combining overlay.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("tìm kiếm");
    expect(spec.build()[0].note).toContain("Bắt đầu tìm từ gốc");
  });

  it("localizes the Stack and Queue visualizers without leaking Vietnamese", () => {
    const stack = localizeVisualizerSpec(
      structureArrayVisualizers.stack,
      "en",
    );
    const queue = localizeVisualizerSpec(
      structureArrayVisualizers.queue,
      "en",
    );

    expect(stack.title).toBe("Stack (LIFO) — visualization");
    expect(stack.legend.map((item) => item.label)).toEqual([
      "In stack",
      "Top",
      "Just popped",
    ]);
    expect(queue.title).toBe("Queue (FIFO) — visualization");
    expect(queue.legend.map((item) => item.label)).toEqual([
      "In queue",
      "Just enqueued (rear)",
      "Just dequeued (front)",
    ]);

    const stackFrames = structureArrayVisualizers.stack.build(
      structureArrayVisualizers.stack.defaultInput,
      0,
      "en",
    );
    const queueFrames = structureArrayVisualizers.queue.build(
      structureArrayVisualizers.queue.defaultInput,
      0,
      "en",
    );
    expect(queueFrames[1].stats.map((stat) => stat.label)).toContain(
      "Most recent operation",
    );

    const prose = [
      stack.title,
      ...stack.pseudo,
      ...stack.legend.map((item) => item.label),
      ...queue.title,
      ...queue.pseudo,
      ...queue.legend.map((item) => item.label),
      ...[...stackFrames, ...queueFrames].flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as "≠", which decomposes to a combining overlay.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(structureArrayVisualizers.stack.title).toContain("mô phỏng");
    expect(
      structureArrayVisualizers.queue.build(
        structureArrayVisualizers.queue.defaultInput,
        0,
      )[0].note,
    ).toContain("phần tử vào trước ra trước");
  });

  it("localizes the Binary Heap visualizer without leaking Vietnamese", () => {
    const spec = structureArrayVisualizers["binary-heap"];
    const localized = localizeVisualizerSpec(spec, "en");
    const frames = spec.build(spec.defaultInput, 0, "en");

    expect(localized.title).toBe("Binary Heap (min-heap) — visualization");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "In heap",
      "Current node",
      "Parent / child being compared",
      "Just swapped",
      "Just inserted / root",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as "≤" or "→", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.build(spec.defaultInput, 0)[0].note).toContain(
      "mỗi nút cha đều ≤ hai nút con",
    );
  });

  it("localizes the Selection Sort visualizer without leaking Vietnamese", () => {
    const spec = visualizers["selection-sort"];
    const localized = localizeVisualizerSpec(spec, "en");
    const frames = spec.build(spec.defaultInput, 0, "en");
    const translate = (text: string) => visualizerLabels[text] ?? text;

    expect(localized.title).toBe("Selection Sort — visualization");
    expect(localized.legend.map((item) => translate(item.label))).toEqual([
      "Sorted",
      "Current minimum",
      "Checking",
      "Just swapped",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => translate(item.label)),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [
          translate(stat.label),
          String(stat.value),
        ]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as ">", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.build(spec.defaultInput, 0)[0].note).toBe(
      "Bắt đầu với mảng ban đầu.",
    );
  });

  it("localizes the Insertion Sort visualizer without leaking Vietnamese", () => {
    const spec = visualizers["insertion-sort"];
    const localized = localizeVisualizerSpec(spec, "en");
    const frames = spec.build(spec.defaultInput, 0, "en");
    const translate = (text: string) => visualizerLabels[text] ?? text;

    expect(localized.title).toBe("Insertion Sort — visualization");
    expect(localized.legend.map((item) => translate(item.label))).toEqual([
      "Sorted",
      "Key / insertion position",
      "Comparing",
      "Just shifted",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => translate(item.label)),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [
          translate(stat.label),
          String(stat.value),
        ]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as ">", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.build(spec.defaultInput, 0)[0].note).toBe(
      "Phần tử đầu tiên coi như đã sắp xếp.",
    );
  });

  it("localizes the Two Sum visualizer without leaking Vietnamese", () => {
    const spec = visualizers["two-sum"];
    const target = spec.target?.default ?? 0;
    const localized = localizeVisualizerSpec(spec, "en");
    const frames = spec.build(spec.defaultInput, target, "en");
    const translate = (text: string) => visualizerLabels[text] ?? text;

    expect(localized.title).toBe("Two Sum (Sorted) — visualization");
    expect(localized.legend.map((item) => translate(item.label))).toEqual([
      "L / R",
      "Eliminated",
      "Matching pair",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => translate(item.label)),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [
          translate(stat.label),
          String(stat.value),
        ]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as ">", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // The reviewed English frame-note templates are used verbatim.
    expect(frames[0].note).toBe(
      "Two pointers: L starts at the beginning and R at the end of the sorted array.",
    );
    expect(frames[1].note).toBe("Sum a[0] + a[5] = 1 + 15 = 16.");
    expect(frames[2].note).toBe(
      "Since 16 > 9, move R backward to decrease the sum.",
    );
    expect(frames.at(-1)?.note).toBe("Sum matches target 9. Return [1, 3].");

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.build(spec.defaultInput, target)[0].note).toContain(
      "Hai con trỏ",
    );
  });

  it("localizes the Binary Search visualizer without leaking Vietnamese", () => {
    const spec = visualizers["binary-search"];
    const target = spec.target?.default ?? 0;
    const localized = localizeVisualizerSpec(spec, "en");
    const frames = spec.build(spec.defaultInput, target, "en");
    const translate = (text: string) => visualizerLabels[text] ?? text;

    expect(localized.title).toBe("Binary Search — visualization");
    expect(localized.legend.map((item) => translate(item.label))).toEqual([
      "Middle element",
      "Eliminated",
      "Found",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => translate(item.label)),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [
          translate(stat.label),
          String(stat.value),
        ]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as ">" or "→", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // The reviewed English frame-note templates are used verbatim.
    expect(frames[0].note).toBe(
      "The initial search range is the entire array [0, 7].",
    );
    expect(frames[1].note).toBe("mid = (0 + 7) / 2 = 3; a[3] = 6.");
    expect(frames[2].note).toBe(
      "a[3] = 6 < 9, so discard the left half and set lo = 0 → 4.",
    );
    expect(frames.at(-1)?.note).toBe("Target 9 found at index 4.");

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("mô phỏng");
    expect(spec.build(spec.defaultInput, target)[0].note).toContain(
      "toàn mảng",
    );
  });

  it("localizes the Sliding Window visualizer without leaking Vietnamese", () => {
    const spec = structureArrayVisualizers["sliding-window"];
    const target = spec.target?.default ?? 0;
    const localized = localizeVisualizerSpec(spec, "en");
    const frames = spec.build(spec.defaultInput, target, "en");
    const translate = (text: string) => visualizerLabels[text] ?? text;

    expect(localized.title).toBe(
      "Sliding Window — shortest subarray with sum ≥ target",
    );
    expect(localized.legend.map((item) => translate(item.label))).toEqual([
      "In window",
      "Just expanded (r)",
      "Just shrunk (l)",
      "Best window",
      "Outside window",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => translate(item.label)),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [
          translate(stat.label),
          String(stat.value),
        ]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as "≥" or "→", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // The reviewed English frame-note templates are used verbatim.
    expect(frames[0].note).toBe(
      "Start with an empty window. Goal: find the shortest subarray whose sum is ≥ target.",
    );
    expect(frames[1].note).toBe("Expand: add a[0] = 2 → sum = 2.");
    expect(frames[5].note).toBe("sum ≥ target → best = 4 (subarray [0, 3]).");
    expect(frames[6].note).toBe("Shrink: remove a[0] = 2 → sum = 6.");
    expect(frames.at(-1)?.note).toBe("Done: shortest length = 2.");

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("tổng nhỏ nhất");
    expect(spec.build(spec.defaultInput, target)[0].note).toContain(
      "Khởi tạo cửa sổ rỗng",
    );
  });

  it("translates the fixed sliding-window diagram and does not leak Vietnamese", () => {
    const lesson = findLessonForLocale("dsa", "fixed-sliding-window", "en");
    const block = lesson?.blocks[8];
    expect(block?.type).toBe("diagram");
    if (block?.type !== "diagram") return;

    expect(block.caption).toBe(
      "For k = 3, the current window contains a[0]–a[2]. When it slides right, a[3] enters the window.",
    );
    expect(block.nodes.map((node) => node.sub)).toEqual([
      "a[0] · in window",
      "a[1] · in window",
      "a[2] · in window",
      "a[3] · enters next",
      "a[4] · outside window",
    ]);

    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const prose = [
      block.caption ?? "",
      ...block.nodes.flatMap((node) => [
        node.label,
        ...(node.sub ? [node.sub] : []),
      ]),
    ];
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);
  });

  it("translates the backtracking subset-tree diagram and does not leak Vietnamese", () => {
    const lesson = findLessonForLocale("dsa", "backtracking", "en");
    const block = lesson?.blocks[9];
    expect(block?.type).toBe("diagram");
    if (block?.type !== "diagram") return;

    expect(block.caption).toBe(
      "For nums = [1, 2], each level chooses or skips an element. The four leaves are all possible subsets.",
    );
    expect(block.nodes.map((node) => node.label)).toEqual([
      "Start",
      "[]",
      "[1]",
      "[]",
      "[2]",
      "[1]",
      "[1,2]",
    ]);
    expect(block.nodes.map((node) => node.sub)).toEqual([
      "nums = [1, 2]",
      "after considering 1",
      "after considering 1",
      "result",
      "result",
      "result",
      "result",
    ]);
    expect(block.edges.map((edge) => edge.label)).toEqual([
      "Skip 1",
      "Choose 1",
      "Skip 2",
      "Choose 2",
      "Skip 2",
      "Choose 2",
    ]);

    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const prose = [
      block.caption ?? "",
      ...block.nodes.flatMap((node) => [
        node.label,
        ...(node.sub ? [node.sub] : []),
      ]),
      ...block.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
    ];
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);
  });

  it("localizes the Graph BFS visualizer without leaking Vietnamese", () => {
    const spec = structureDiagramVisualizers["graph-bfs"];
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    expect(localized.title).toBe("BFS — Level-Order Graph Traversal");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Unvisited",
      "In queue",
      "Being explored",
      "Visited",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as "→", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // The reviewed English copy is used verbatim.
    expect(frames[0].note).toBe("Initialize: add source vertex A to the queue.");
    expect(frames[1].note).toBe("Dequeue A and mark it as visited.");
    expect(frames[2].note).toBe("Check neighbor B: unvisited → enqueue.");
    expect(frames[0].stats.map((stat) => stat.label)).toEqual([
      "Queue",
      "Visited",
    ]);
    expect(frames[0].stats[0].value).toBe("A");
    expect(frames.at(-1)?.note).toBe("Queue is empty → BFS complete.");

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("duyệt đồ thị theo tầng");
    expect(spec.build()[0].note).toContain("đỉnh nguồn A");
    expect(spec.build()[0].stats.map((stat) => stat.label)).toEqual([
      "hàng đợi",
      "đã thăm",
    ]);
  });

  it("localizes the DP 1D visualizer without leaking Vietnamese", () => {
    const spec = structureArrayVisualizers["dp-1d"];
    const localized = localizeVisualizerSpec(spec, "en");
    const frames = spec.build(spec.defaultInput, 0, "en");

    expect(localized.title).toBe("DP 1D — House Robber");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Computed dp entries",
      "Decision cells",
      "Not yet computed",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
      ]),
    ];

    // Vietnamese-only letters; unlike the NFD combining-mark check above, this
    // ignores math symbols such as "—" or "→", which are outside the ranges.
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

    expect(prose).not.toEqual([]);
    expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);

    // The reviewed English frame notes and stat labels are used verbatim.
    expect(frames[0].note).toBe(
      "nums = [2, 7, 9, 3, 1]. dp[i] = the maximum amount you can rob from houses 0 through i.",
    );
    expect(frames[1].note).toBe("Base case: dp[0] = nums[0] = 2.");
    expect(frames[2].note).toBe("Base case: dp[1] = max(nums[0], nums[1]) = 7.");
    expect(frames[3].note).toBe(
      "At i = 2: take = dp[0] + nums[2] = 11; skip = dp[1] = 7.",
    );
    expect(frames[4].note).toBe("dp[2] = max(11, 7) = 11.");
    expect(frames.at(-1)?.note).toBe("Result: dp[4] = 12.");
    expect(frames[0].stats.map((stat) => stat.label)).toEqual([
      "i",
      "Take",
      "Skip",
    ]);
    expect(frames[0].stats[1].value).toBe("—");

    // Vietnamese stays the default: the source spec keeps its own copy.
    expect(spec.title).toContain("House Robber");
    expect(spec.build(spec.defaultInput, 0)[0].note).toContain(
      "số tiền lớn nhất",
    );
    expect(
      spec.build(spec.defaultInput, 0)[0].stats.map((stat) => stat.label),
    ).toEqual(["i", "lấy", "bỏ"]);
  });

  it("translates the DP 2D knapsack diagram and does not leak Vietnamese", () => {
    const lesson = findLessonForLocale("dsa", "dp-patterns", "en");
    const block = lesson?.blocks[9];
    expect(block?.type).toBe("diagram");
    if (block?.type !== "diagram") return;

    expect(block.caption).toBe(
      "Each cell dp[i][c] stores the maximum value achievable using the first i items at capacity c.",
    );
    const rows = block.nodes.filter((node) => node.id.startsWith("row-"));
    expect(rows.map((node) => node.sub)).toEqual([
      "0 items considered",
      "1 item considered",
      "2 items considered",
    ]);

    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    const prose = [
      block.caption ?? "",
      ...block.nodes.flatMap((node) => [
        node.label,
        ...(node.sub ? [node.sub] : []),
      ]),
      ...block.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
    ];
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
