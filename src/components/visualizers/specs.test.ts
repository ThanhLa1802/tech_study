import { describe, expect, it } from "vitest";
import { visualizers } from "@/components/visualizers/specs";

describe("algorithm visualizer specs", () => {
  it("covers every DSA visualizer", () => {
    expect(Object.keys(visualizers)).toEqual(
      expect.arrayContaining([
        "bubble-sort",
        "selection-sort",
        "insertion-sort",
        "binary-search",
        "two-sum",
      ]),
    );
  });

  it("builds every spec without throwing", () => {
    for (const [key, spec] of Object.entries(visualizers)) {
      const frames = spec.build(spec.defaultInput, spec.target?.default ?? 0);
      expect(frames.length, key).toBeGreaterThan(0);
      for (const frame of frames) {
        expect(frame.array, key).toHaveLength(spec.defaultInput.length);
      }
    }
  });

  it("ends Bubble Sort with a sorted array", () => {
    const spec = visualizers["bubble-sort"];
    const input = [5, 2, 9, 1, 6, 3];
    const frames = spec.build(input, 0);
    expect(frames[0].array).toEqual(input);
    const last = frames[frames.length - 1].array;
    expect(last).toEqual([...last].sort((a, b) => a - b));
  });

  it("marks the found index in Binary Search", () => {
    const spec = visualizers["binary-search"];
    const frames = spec.build(spec.defaultInput, spec.target?.default ?? 0);
    const last = frames[frames.length - 1];
    expect(last.marks).toContain("found");
  });
});
