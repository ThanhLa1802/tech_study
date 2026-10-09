import { describe, expect, it } from "vitest";
import { diagramVisualizers } from "@/components/visualizers/diagram-specs";
import { localizeDiagramSpec } from "@/lib/diagram";

const spec = diagramVisualizers["http-https"];

describe("HTTP/HTTPS diagram spec", () => {
  it("references only known nodes in edges, states, and packets", () => {
    const nodeIds = new Set(spec.nodes.map((node) => node.id));
    const edgeIds = new Set(spec.edges.map((edge) => edge.id));

    for (const edge of spec.edges) {
      expect(nodeIds.has(edge.from), edge.id).toBe(true);
      expect(nodeIds.has(edge.to), edge.id).toBe(true);
    }

    for (const frame of spec.build()) {
      for (const id of Object.keys(frame.states)) {
        expect(nodeIds.has(id), id).toBe(true);
      }
      for (const id of Object.keys(frame.edgeStates ?? {})) {
        expect(edgeIds.has(id), id).toBe(true);
      }
      for (const packet of frame.packets ?? []) {
        expect(nodeIds.has(packet.from), packet.id).toBe(true);
        expect(nodeIds.has(packet.to), packet.id).toBe(true);
      }
      expect(frame.line).toBeGreaterThanOrEqual(0);
      expect(frame.line).toBeLessThan(spec.pseudo.length);
    }
  });

  it("traces plaintext HTTP first, then the TLS handshake, then encrypted HTTP", () => {
    const frames = spec.build("en");
    expect(frames).toHaveLength(10);

    const statValue = (index: number, label: string) =>
      frames[index].stats.find((stat) => stat.label === label)?.value;

    // Phase 1 (frames 0-3): HTTP travels as plaintext the observer can read.
    for (const index of [0, 1, 2, 3]) {
      expect(statValue(index, "Scheme")).toBe("HTTP");
      expect(statValue(index, "In transit")).toBe("plaintext");
    }
    expect(frames[1].states.observer).toBe("warn");
    expect(frames[1].packets?.[0]).toMatchObject({
      from: "client",
      to: "server",
      label: "GET /login",
    });
    expect(frames[2].packets?.[0]).toMatchObject({
      from: "server",
      to: "client",
    });

    // Phase 2 (frame 4): the TLS handshake runs before any application data.
    expect(statValue(4, "In transit")).toBe("TLS handshake");

    // The certificate (frame 5) authenticates the server; it is not the secret key.
    expect(frames[5].states.cert).toBe("success");
    expect(frames[5].packets?.[0]?.label).toBe("certificate");

    // The session key (frame 6) is derived on both sides, never sent as a packet.
    expect(frames[6].states.key).toBe("success");
    expect(frames[6].packets ?? []).toEqual([]);
    expect(frames[6].note).toContain("derive");
    expect(frames[6].note).toContain("no secret key is sent");

    // Phase 3 (frames 7-8): the same HTTP message is now encrypted in transit.
    for (const index of [7, 8]) {
      expect(statValue(index, "In transit")).toBe("encrypted");
      expect(frames[index].states.observer).toBe("down");
      expect(frames[index].packets?.[0]?.label).toContain("encrypted");
    }

    // The final frame keeps the protected channel and a blocked observer.
    expect(frames[9].states.key).toBe("success");
    expect(frames[9].states.observer).toBe("down");
  });

  it("localizes node labels and subs for both Vietnamese and English", () => {
    const vi = spec; // The base spec is Vietnamese.
    const en = localizeDiagramSpec(spec, "en");

    const node = (
      localized: typeof vi,
      id: string,
    ): { label?: string; sub?: string } | undefined =>
      localized.nodes.find((item) => item.id === id);

    // Vietnamese base labels/subs (not accidentally English).
    expect(node(vi, "observer")?.label).toBe("Người quan sát");
    expect(node(vi, "observer")?.sub).toBe("trên mạng");
    expect(node(vi, "cert")?.label).toBe("Chứng chỉ");
    expect(node(vi, "cert")?.sub).toBe("danh tính");
    expect(node(vi, "key")?.label).toBe("Khoá phiên");
    expect(node(vi, "key")?.sub).toBe("hai bên cùng suy ra");
    expect(node(vi, "client")?.sub).toBe("trình duyệt / app");
    expect(node(vi, "server")?.sub).toBe("trang web");

    // English overrides replace the Vietnamese text.
    expect(node(en, "observer")?.label).toBe("Observer");
    expect(node(en, "observer")?.sub).toBe("on the network");
    expect(node(en, "cert")?.label).toBe("Certificate");
    expect(node(en, "cert")?.sub).toBe("identity");
    expect(node(en, "key")?.label).toBe("Session key");
    expect(node(en, "key")?.sub).toBe("derived by both sides");
    expect(node(en, "client")?.sub).toBe("browser / app");
    expect(node(en, "server")?.sub).toBe("website");

    // Geometry and ids are preserved through localization.
    expect(en.nodes.map((item) => item.id)).toEqual(
      vi.nodes.map((item) => item.id),
    );
    expect(en.edges.map((item) => item.id)).toEqual(
      vi.edges.map((item) => item.id),
    );
  });

  it("keeps Vietnamese as the default copy", () => {
    const vi = spec.build()[0];
    const en = spec.build("en")[0];

    expect(vi.note).toContain("văn bản thường");
    expect(en.note).toContain("plaintext");
    expect(vi.stats[0].label).toBe("Giao thức");
    expect(en.stats[0].label).toBe("Scheme");
    expect(spec.build()[5].packets?.[0]?.label).toBe("chứng chỉ");
  });
});
