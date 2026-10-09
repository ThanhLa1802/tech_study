import { describe, expect, it } from "vitest";
import { buildFrames } from "./fixed-sliding-window-motion";

function windowSum(values: number[], start: number, size: number): number {
  let sum = 0;
  for (let i = start; i < start + size; i++) sum += values[i];
  return sum;
}

describe("fixed sliding window frames", () => {
  it("keeps every frame's displayed sum equal to its window", () => {
    const inputs = [
      [2, 1, 3, 4, 5],
      [5, 5, 5, 1],
      [1, 2, 3],
      [4, 7],
      [-1, -2, -3, -4],
    ];
    for (const values of inputs) {
      for (const k of [1, 2, 3, 5]) {
        for (const frame of buildFrames(values, k, false)) {
          expect(windowSum(values, frame.start, frame.size)).toBe(frame.sum);
        }
      }
    }
  });

  it("ends on the best window with the best sum when the best is not last", () => {
    const frames = buildFrames([5, 5, 5, 1], 2, false);
    const last = frames[frames.length - 1];
    expect(last.best).toBe(10);
    expect(last.bestStart).toBe(0);
    expect(last.start).toBe(last.bestStart);
    expect(last.sum).toBe(last.best);
  });

  it("handles a single window when the array is no longer than k", () => {
    const frames = buildFrames([4, 7], 5, false);
    const last = frames[frames.length - 1];
    expect(frames).toHaveLength(2);
    expect(last.size).toBe(2);
    expect(last.sum).toBe(11);
    expect(last.best).toBe(11);
  });

  it("returns no frames for an empty array", () => {
    expect(buildFrames([], 3, false)).toEqual([]);
  });
});
