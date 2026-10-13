import { describe, expect, it } from "vitest";
import {
  buildRateLimitFrames,
  LIMIT,
  REQUESTS,
  WINDOW_SIZE,
} from "./rate-limit-window";

describe("fixed vs sliding window rate limiting", () => {
  it("allows the boundary burst under fixed windows but blocks it under sliding", () => {
    const frames = buildRateLimitFrames(REQUESTS, WINDOW_SIZE, LIMIT, false);
    const last = frames[frames.length - 1];
    // Window [0,10) allows the first 3 requests; the boundary resets, so the
    // next window allows the other 3 → 6 total.
    expect(last.fixedAllowed).toBe(6);
    // The rolling counter still sees 3 allowed requests in the last 10s and
    // rejects the rest.
    expect(last.slidingAllowed).toBe(3);
  });

  it("matches an independent fixed-window / sliding-window account per frame", () => {
    const frames = buildRateLimitFrames(REQUESTS, WINDOW_SIZE, LIMIT, false);

    const fixedWindow: number[] = [];
    const slidingAllowed: number[] = [];
    let fixedAllowed = 0;
    REQUESTS.forEach((t, index) => {
      const wi = Math.floor(t / WINDOW_SIZE);
      const before = fixedWindow[wi] ?? 0;
      const fixedAllow = before < LIMIT;
      if (fixedAllow) {
        fixedWindow[wi] = before + 1;
        fixedAllowed++;
      }

      const sBefore = slidingAllowed.filter((x) => x > t - WINDOW_SIZE).length;
      const slidingAllow = sBefore < LIMIT;
      if (slidingAllow) slidingAllowed.push(t);

      const frame = frames[index + 1];
      expect(frame.fixedTicks.length).toBe(index + 1);
      expect(frame.slidingTicks.length).toBe(index + 1);
      expect(frame.fixedTicks[index].decision).toBe(
        fixedAllow ? "allow" : "reject",
      );
      expect(frame.slidingTicks[index].decision).toBe(
        slidingAllow ? "allow" : "reject",
      );
      expect(frame.fixedCount).toBe(fixedWindow[wi]);
      expect(frame.slidingCount).toBe(
        slidingAllowed.filter((x) => x > t - WINDOW_SIZE).length,
      );
      expect(frame.fixedAllowed).toBe(fixedAllowed);
      expect(frame.slidingAllowed).toBe(slidingAllowed.length);
    });
  });

  it("marks the boundary burst green for fixed but rejected for sliding", () => {
    const frames = buildRateLimitFrames(REQUESTS, WINDOW_SIZE, LIMIT, false);
    const last = frames[frames.length - 1];

    // t = 7, 8, 9 fit inside window [0, 10) and the rolling window.
    for (const i of [0, 1, 2]) {
      expect(last.fixedTicks[i].decision).toBe("allow");
      expect(last.slidingTicks[i].decision).toBe("allow");
    }

    // t = 10, 11, 12 straddle the boundary: the fixed window resets and lets
    // them all through, but the rolling count already holds 3 requests, so the
    // sliding row must show them rejected.
    for (const i of [3, 4, 5]) {
      expect(last.fixedTicks[i].decision).toBe("allow");
      expect(last.slidingTicks[i].decision).toBe("reject");
    }
  });

  it("never lets the sliding count exceed the limit within a window", () => {
    const frames = buildRateLimitFrames(REQUESTS, WINDOW_SIZE, LIMIT, false);
    for (const frame of frames) {
      expect(frame.slidingCount).toBeLessThanOrEqual(LIMIT);
    }
  });

  it("routes a request exactly on a boundary into the later window", () => {
    const frames = buildRateLimitFrames([10], WINDOW_SIZE, LIMIT, false);
    expect(frames[1].fixedWindow).toBe(1);
    expect(frames[1].fixedTicks[0].decision).toBe("allow");
    expect(frames[1].slidingTicks[0].decision).toBe("allow");
  });

  it("handles a limit of one", () => {
    const frames = buildRateLimitFrames([1, 2, 3], WINDOW_SIZE, 1, false);
    const last = frames[frames.length - 1];
    expect(last.slidingAllowed).toBe(1);
    expect(last.fixedAllowed).toBe(1);
  });

  it("returns intro and summary frames for an empty request stream", () => {
    const frames = buildRateLimitFrames([], WINDOW_SIZE, LIMIT, false);
    expect(frames).toHaveLength(2);
    expect(frames[0].index).toBe(-1);
    expect(frames[1].fixedAllowed).toBe(0);
  });

  it("writes English notes with no Vietnamese diacritics", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    for (const frame of buildRateLimitFrames(REQUESTS, WINDOW_SIZE, LIMIT, true)) {
      expect(vietnamese.test(frame.note)).toBe(false);
    }
    expect(
      buildRateLimitFrames(REQUESTS, WINDOW_SIZE, LIMIT, true).at(-1)?.note,
    ).toContain("sliding window allowed 3");
  });
});
