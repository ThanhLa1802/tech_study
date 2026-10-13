import { describe, expect, it } from "vitest";
import { flowScenarios } from "./request-flow";

describe("photo-app request flow", () => {
  it("ships an upload and a feed scenario", () => {
    expect(flowScenarios.map((scenario) => scenario.id)).toEqual([
      "upload",
      "feed",
    ]);
  });

  it("keeps every edge and packet endpoint inside its scenario's nodes", () => {
    for (const scenario of flowScenarios) {
      const ids = new Set(scenario.nodes.map((node) => node.id));
      for (const edge of scenario.edges) {
        expect(ids.has(edge.from), `${scenario.id}:${edge.id} from`).toBe(true);
        expect(ids.has(edge.to), `${scenario.id}:${edge.id} to`).toBe(true);
      }
      for (const frame of scenario.build(true)) {
        for (const packet of frame.packets ?? []) {
          expect(ids.has(packet.from), `${scenario.id}:${packet.id} from`).toBe(
            true,
          );
          expect(ids.has(packet.to), `${scenario.id}:${packet.id} to`).toBe(
            true,
          );
        }
        for (const key of Object.keys(frame.states)) {
          expect(ids.has(key), `${scenario.id}:state ${key}`).toBe(true);
        }
      }
    }
  });

  it("shows a direct object-storage upload and async queue work", () => {
    const upload = flowScenarios.find((scenario) => scenario.id === "upload")!;
    const edge = (id: string) => upload.edges.find((item) => item.id === id);
    expect(edge("client-obj")).toMatchObject({ from: "client", to: "obj" });
    expect(edge("app-queue")).toMatchObject({ from: "app", to: "queue" });
    expect(edge("queue-worker")).toMatchObject({ from: "queue", to: "worker" });

    // Some frame carries the direct client → object-storage packet.
    const hasDirect = upload
      .build(false)
      .some((frame) =>
        (frame.packets ?? []).some(
          (packet) => packet.from === "client" && packet.to === "obj",
        ),
      );
    expect(hasDirect).toBe(true);
  });

  it("returns the pre-signed URL from the app through the load balancer to the client", () => {
    const upload = flowScenarios.find((scenario) => scenario.id === "upload")!;
    const edge = (id: string) => upload.edges.find((item) => item.id === id);

    // The app must not point a "pre-signed URL" edge at object storage.
    expect(upload.edges.some((item) => item.id === "app-obj")).toBe(false);
    expect(
      upload.edges.some((item) => item.from === "app" && item.to === "obj"),
    ).toBe(false);

    // The response travels app → load balancer → client.
    expect(edge("app-lb")).toMatchObject({
      from: "app",
      to: "lb",
      label: "pre-signed URL",
    });
    expect(edge("lb-client")).toMatchObject({ from: "lb", to: "client" });

    // Both legs of the response appear as packets in the upload frames.
    const frames = upload.build(false);
    const hasUrl = (from: string, to: string) =>
      frames.some((frame) =>
        (frame.packets ?? []).some(
          (packet) => packet.from === from && packet.to === to && packet.label === "pre-signed URL",
        ),
      );
    expect(hasUrl("app", "lb")).toBe(true);
    expect(hasUrl("lb", "client")).toBe(true);
  });

  it("shows a cache → database fallback and CDN delivery on the feed", () => {
    const feed = flowScenarios.find((scenario) => scenario.id === "feed")!;
    const edge = (id: string) => feed.edges.find((item) => item.id === id);
    expect(edge("app-cache")).toMatchObject({ from: "app", to: "cache" });
    expect(edge("app-db")).toMatchObject({ from: "app", to: "db" });
    expect(edge("cdn-client")).toMatchObject({ from: "cdn", to: "client" });
    expect(edge("obj-cdn")).toMatchObject({ from: "obj", to: "cdn" });

    // The cache goes miss (warn) on the fallback frame.
    const fallback = feed
      .build(false)
      .find((frame) => frame.states.cache === "warn");
    expect(fallback).toBeDefined();
    expect(fallback?.states.db).toBe("active");
  });

  it("localizes node subtitles and edge labels without leaking Vietnamese", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    for (const scenario of flowScenarios) {
      // The English variant preserves ids and topology.
      expect(scenario.nodesEn.map((node) => node.id)).toEqual(
        scenario.nodes.map((node) => node.id),
      );
      expect(scenario.edgesEn.map((edge) => edge.id)).toEqual(
        scenario.edges.map((edge) => edge.id),
      );
      expect(
        scenario.edgesEn.map((edge) => [edge.from, edge.to]),
      ).toEqual(scenario.edges.map((edge) => [edge.from, edge.to]));

      const prose = [
        ...scenario.nodesEn.flatMap((node) => [
          node.label,
          ...(node.sub ? [node.sub] : []),
        ]),
        ...scenario.edgesEn.flatMap((edge) => (edge.label ? [edge.label] : [])),
      ];
      expect(prose.filter((text) => vietnamese.test(text))).toEqual([]);
    }
  });

  it("writes English notes with no Vietnamese diacritics", () => {
    const vietnamese = /[\u00C0-\u01B0\u1EA0-\u1EF9]/;
    for (const scenario of flowScenarios) {
      for (const frame of scenario.build(true)) {
        expect(frame.note.length).toBeGreaterThan(0);
        expect(vietnamese.test(frame.note)).toBe(false);
      }
      // English and Vietnamese copy differ.
      expect(scenario.build(true)[0].note).not.toBe(
        scenario.build(false)[0].note,
      );
    }
  });
});
