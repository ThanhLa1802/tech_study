import { describe, expect, it } from "vitest";
import {
  structureArrayVisualizers,
  structureDiagramVisualizers,
} from "@/components/visualizers/structure-specs";

describe("structure array visualizer specs", () => {
  it("builds every spec without throwing and keeps marks in sync", () => {
    for (const [key, spec] of Object.entries(structureArrayVisualizers)) {
      const frames = spec.build(spec.defaultInput, 0);
      expect(frames.length, key).toBeGreaterThan(0);
      for (const frame of frames) {
        expect(frame.marks, key).toHaveLength(frame.array.length);
      }
    }
  });
});

describe("structure diagram visualizer specs", () => {
  it("references only known nodes and builds frames", () => {
    for (const [key, spec] of Object.entries(structureDiagramVisualizers)) {
      const nodeIds = new Set(spec.nodes.map((node) => node.id));
      for (const edge of spec.edges) {
        expect(nodeIds.has(edge.from), `${key}:${edge.id}`).toBe(true);
        expect(nodeIds.has(edge.to), `${key}:${edge.id}`).toBe(true);
      }

      const frames = spec.build();
      expect(frames.length, key).toBeGreaterThan(0);
      for (const frame of frames) {
        for (const id of Object.keys(frame.states)) {
          expect(nodeIds.has(id), `${key}:${id}`).toBe(true);
        }
      }
    }
  });
});
