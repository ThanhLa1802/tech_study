import { describe, expect, it } from "vitest";
import { diagramVisualizers } from "@/components/visualizers/diagram-specs";
import { findLesson, findLessonForLocale } from "@/lib/course";
import { localizeDiagramSpec, edgeLabelAnchor } from "@/lib/diagram";
import type { DiagramEdge, DiagramNode } from "@/lib/diagram";

const viChars = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;

describe("cache-aside visualizer", () => {
  const spec = diagramVisualizers["cache-aside"];

  it("is registered with a complete VI default and EN override", () => {
    expect(spec).toBeDefined();
    expect(spec.title).toContain("mô phỏng");
    expect(spec.overrides?.en?.title).toBe("Cache-aside — simulation");
  });

  it("builds a faithful read/write trace with state-matching frames", () => {
    const frames = spec.build("vi");

    // Intro and summary bookend the trace.
    expect(frames[0].note).toContain("Cache-aside");
    expect(frames.at(-1)?.note).toContain("Đánh đổi");

    // A HIT frame must carry success on the cache and return a value packet.
    const hit = frames.find((frame) => frame.stats[1].value === "HIT");
    expect(hit).toBeDefined();
    expect(hit?.states.cache).toBe("success");
    expect(hit?.packets?.some((packet) => packet.from === "cache")).toBe(true);

    // A MISS frame must carry warn on the cache before any database work.
    const miss = frames.find((frame) => frame.stats[1].value === "MISS");
    expect(miss).toBeDefined();
    expect(miss?.states.cache).toBe("warn");

    // The write/invalidate tail sets the cache to the removed state.
    const invalidated = frames.find(
      (frame) => frame.stats[1].value === "vô hiệu hoá",
    );
    expect(invalidated?.states.cache).toBe("down");
    expect(invalidated?.states.db).toBe("success");

    // Every frame's pseudocode highlight points at a real line.
    for (const frame of frames) {
      expect(frame.line).toBeGreaterThanOrEqual(0);
      expect(frame.line).toBeLessThan(spec.pseudo.length);
    }
  });

  it("localizes every user-visible string without leaking Vietnamese", () => {
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...localized.nodes.flatMap((node) => [
        node.label,
        ...(node.sub ? [node.sub] : []),
      ]),
      ...localized.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
        ...(frame.packets ?? []).flatMap((packet) =>
          packet.label ? [packet.label] : [],
        ),
      ]),
    ];

    expect(prose.filter((text) => viChars.test(text))).toEqual([]);
    expect(localized.nodes.find((n) => n.id === "db")?.sub).toBe(
      "source of truth",
    );
    expect(localized.edges.find((e) => e.id === "client-db")?.label).toBe(
      "write: update",
    );
  });
});

describe("cache-stampede visualizer", () => {
  const spec = diagramVisualizers["cache-stampede"];

  it("builds a single-flight trace whose stats never over-count DB queries", () => {
    const frames = spec.build("vi");

    const dbQueries = (frame: (typeof frames)[number]) =>
      Number(frame.stats[1].value);
    for (const frame of frames) {
      expect(dbQueries(frame)).toBeLessThanOrEqual(1);
    }

    // Every load frame after the lock shows exactly one database query.
    const loading = frames.filter((frame) => frame.states.db === "active");
    expect(loading.length).toBeGreaterThan(0);
    for (const frame of loading) expect(dbQueries(frame)).toBe(1);

    // All three requests share the cached result by the end.
    const served = frames.find((frame) => frame.states.r2 === "success");
    expect(served?.states.r1).toBe("success");
    expect(served?.states.r3).toBe("success");

    for (const frame of frames) {
      expect(frame.line).toBeGreaterThanOrEqual(0);
      expect(frame.line).toBeLessThan(spec.pseudo.length);
    }
  });

  it("localizes node labels and notes without leaking Vietnamese", () => {
    const localized = localizeDiagramSpec(spec, "en");
    const frames = spec.build("en");

    expect(localized.nodes.find((n) => n.id === "r1")?.label).toBe("Request 1");
    expect(localized.nodes.find((n) => n.id === "r1")?.sub).toBe("same hot key");
    expect(localized.legend.map((item) => item.label)).toEqual([
      "Waiting",
      "Processing",
      "Served",
      "Waiting (lock)",
      "Data",
    ]);

    const prose = [
      localized.title,
      ...localized.pseudo,
      ...localized.legend.map((item) => item.label),
      ...localized.nodes.flatMap((node) => [
        node.label,
        ...(node.sub ? [node.sub] : []),
      ]),
      ...localized.edges.flatMap((edge) => (edge.label ? [edge.label] : [])),
      ...frames.flatMap((frame) => [
        frame.note,
        ...frame.stats.flatMap((stat) => [stat.label, String(stat.value)]),
        ...(frame.packets ?? []).flatMap((packet) =>
          packet.label ? [packet.label] : [],
        ),
      ]),
    ];
    expect(prose.filter((text) => viChars.test(text))).toEqual([]);
  });
});

describe("caching diagram topology and label geometry", () => {
  const cases = [
    { slug: "sd-caching-strategies", blockIndex: 3 },
    { slug: "sd-cdn", blockIndex: 6 },
  ] as const;

  it("keeps every edge endpoint resolvable to a node", () => {
    for (const spec of Object.values(diagramVisualizers)) {
      const ids = new Set(spec.nodes.map((node) => node.id));
      expect(ids.size).toBe(spec.nodes.length);
      for (const edge of spec.edges) {
        expect(ids.has(edge.from), `${spec.title}:${edge.id}:from`).toBe(true);
        expect(ids.has(edge.to), `${spec.title}:${edge.id}:to`).toBe(true);
      }
    }
  });

  it("separates the crossing edge labels in the caching block diagrams", () => {
    for (const { slug, blockIndex } of cases) {
      const block = findLesson("system-design", slug)?.blocks[blockIndex];
      expect(block?.type, slug).toBe("diagram");
      if (block?.type !== "diagram") continue;

      const byId = new Map(block.nodes.map((node) => [node.id, node]));
      const anchors = block.edges
        .filter((edge) => edge.label)
        .map((edge) => {
          const from = byId.get(edge.from) as DiagramNode;
          const to = byId.get(edge.to) as DiagramNode;
          return edgeLabelAnchor(from, to);
        });

      // No two label anchors may sit close enough for 11px text to overlap.
      for (let i = 0; i < anchors.length; i++) {
        for (let j = i + 1; j < anchors.length; j++) {
          const distance = Math.hypot(
            anchors[i].x - anchors[j].x,
            anchors[i].y - anchors[j].y,
          );
          expect(distance, `${slug}: anchors ${i}/${j}`).toBeGreaterThan(20);
        }
      }
    }
  });

  it("separates the new visualizers' edge labels", () => {
    for (const id of ["cache-aside", "cache-stampede"] as const) {
      const spec = diagramVisualizers[id];
      const byId = new Map(spec.nodes.map((node) => [node.id, node]));
      const anchors = spec.edges
        .filter((edge) => edge.label)
        .map((edge) =>
          edgeLabelAnchor(
            byId.get(edge.from) as DiagramNode,
            byId.get(edge.to) as DiagramNode,
          ),
        );
      for (let i = 0; i < anchors.length; i++) {
        for (let j = i + 1; j < anchors.length; j++) {
          const distance = Math.hypot(
            anchors[i].x - anchors[j].x,
            anchors[i].y - anchors[j].y,
          );
          expect(distance, `${id}: anchors ${i}/${j}`).toBeGreaterThan(20);
        }
      }
    }
  });

  it("preserves the diagram topology across the English overlay", () => {
    for (const { slug, blockIndex } of cases) {
      const source = findLesson("system-design", slug)?.blocks[blockIndex];
      const translated = findLessonForLocale("system-design", slug, "en")
        ?.blocks[blockIndex];
      expect(source?.type).toBe("diagram");
      expect(translated?.type).toBe("diagram");
      if (source?.type !== "diagram" || translated?.type !== "diagram") continue;

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
        source.edges.map((edge: DiagramEdge) => ({
          id: edge.id,
          from: edge.from,
          to: edge.to,
        })),
      );
      // Geometry is copied through, so the layout fix holds in both locales.
      expect(translated.nodes.map((node) => node.x)).toEqual(
        source.nodes.map((node) => node.x),
      );
    }
  });
});
