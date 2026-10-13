import { describe, expect, it } from "vitest";
import {
  assignKeys,
  buildHashFrames,
  movedKeys,
  nextNodeClockwise,
  type RingKey,
  type RingNode,
} from "./consistent-hashing-ring";

const base: RingNode[] = [
  { id: "a", label: "A", pos: 0 },
  { id: "b", label: "B", pos: 90 },
  { id: "c", label: "C", pos: 180 },
];
const keys: RingKey[] = [
  { id: "k1", label: "K1", pos: 30 },
  { id: "k5", label: "K5", pos: 60 },
  { id: "k2", label: "K2", pos: 100 },
  { id: "k3", label: "K3", pos: 200 },
  { id: "k4", label: "K4", pos: 240 },
];

describe("consistent hashing ring", () => {
  it("maps a key to the next node clockwise, wrapping past the end", () => {
    expect(nextNodeClockwise(base, 30)).toBe("b");
    expect(nextNodeClockwise(base, 90)).toBe("b"); // exactly on a node
    expect(nextNodeClockwise(base, 200)).toBe("a"); // wraps to the smallest
    expect(nextNodeClockwise(base, 350)).toBe("a");
    expect(nextNodeClockwise(base, 0)).toBe("a");
  });

  it("handles an empty ring without throwing", () => {
    expect(nextNodeClockwise([], 10)).toBe("");
    expect(assignKeys([], keys)).toEqual({});
  });

  it("assigns the baseline keys to the expected owners", () => {
    expect(assignKeys(base, keys)).toEqual({
      k1: "b",
      k5: "b",
      k2: "c",
      k3: "a",
      k4: "a",
    });
  });

  it("moves only the keys in the arc before a newly added node", () => {
    const withD = [...base, { id: "d", label: "D", pos: 270 }];
    const moved = movedKeys(assignKeys(base, keys), assignKeys(withD, keys));
    // K3 (200°) and K4 (240°) fall in the arc (180°, 270°) taken over by D.
    expect(moved.sort()).toEqual(["k3", "k4"]);
  });

  it("moves only the keys owned by a removed node to its successor", () => {
    const withoutB = base.filter((node) => node.id !== "b");
    const moved = movedKeys(assignKeys(base, keys), assignKeys(withoutB, keys));
    // B owned K1 (30°) and K5 (60°); they move to C.
    expect(moved.sort()).toEqual(["k1", "k5"]);
    expect(assignKeys(withoutB, keys)).toMatchObject({ k1: "c", k5: "c" });
  });

  it("builds a trace whose moved sets match the real reassignments", () => {
    const frames = buildHashFrames(false);
    const addFrame = frames.find((frame) => frame.added === "d" && frame.moved.length > 0);
    const removeFrame = frames.find(
      (frame) => frame.removed === "b" && frame.moved.length > 0,
    );
    expect(addFrame?.moved.sort()).toEqual(["k3", "k4"]);
    expect(removeFrame?.moved.sort()).toEqual(["k1", "k5"]);
    expect(frames[0].showOwners).toBe(false);
  });

  it("only ever points keys at nodes present in that frame", () => {
    for (const frame of buildHashFrames(false)) {
      const ids = new Set(frame.nodes.map((node) => node.id));
      for (const owner of Object.values(frame.owners)) {
        // A removed node is rendered as a down ghost, so it is allowed to own
        // keys in the frame that announces the removal.
        expect(ids.has(owner) || frame.removed === owner).toBe(true);
      }
    }
  });

  it("writes English notes with no Vietnamese diacritics", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    for (const frame of buildHashFrames(true)) {
      expect(vietnamese.test(frame.note)).toBe(false);
    }
    expect(buildHashFrames(true)[0].note).toContain("hashed onto the same ring");
    expect(buildHashFrames(false)[0].note).toContain("được băm lên cùng một vòng");
  });
});
