"use client";

import { useEffect, useMemo, useState } from "react";
import DiagramSvg from "@/components/diagram-svg";
import type {
  DiagramEdge,
  DiagramNode,
  DiagramPacket,
  NodeState,
} from "@/lib/diagram";
import type { Locale } from "@/lib/locale";

/**
 * Photo-app request flow with two scenarios:
 *  - upload: metadata is written synchronously, photo bytes go straight to
 *    object storage, and heavy work runs asynchronously through a queue.
 *  - feed: the app reads the post list from a cache, falls back to the database
 *    on a miss, and the photos are delivered from a CDN edge.
 */
export type FlowFrame = {
  states: Record<string, NodeState>;
  edgeStates?: Record<string, NodeState>;
  packets?: DiagramPacket[];
  note: string;
};

export type FlowScenario = {
  id: "upload" | "feed";
  label: (en: boolean) => string;
  nodes: DiagramNode[];
  nodesEn: DiagramNode[];
  edges: DiagramEdge[];
  edgesEn: DiagramEdge[];
  build: (en: boolean) => FlowFrame[];
};

const uploadNodes: DiagramNode[] = [
  { id: "client", label: "Client", sub: "app / trình duyệt", tone: "sky", x: 25, y: 150, w: 120, h: 56 },
  { id: "obj", label: "Object Storage", sub: "ảnh gốc", tone: "amber", x: 20, y: 268, w: 130, h: 56 },
  { id: "lb", label: "Load Balancer", tone: "violet", x: 200, y: 150, w: 110, h: 56 },
  { id: "app", label: "App Server", tone: "emerald", x: 360, y: 150, w: 120, h: 56 },
  { id: "db", label: "Database", sub: "metadata", tone: "amber", x: 540, y: 40, w: 130, h: 56 },
  { id: "queue", label: "Message Queue", tone: "violet", x: 540, y: 150, w: 130, h: 56 },
  { id: "worker", label: "Worker", sub: "chạy nền", tone: "emerald", x: 540, y: 260, w: 130, h: 56 },
];

const uploadNodesEn: DiagramNode[] = [
  { id: "client", label: "Client", sub: "app / browser", tone: "sky", x: 25, y: 150, w: 120, h: 56 },
  { id: "obj", label: "Object Storage", sub: "original photos", tone: "amber", x: 20, y: 268, w: 130, h: 56 },
  { id: "lb", label: "Load Balancer", tone: "violet", x: 200, y: 150, w: 110, h: 56 },
  { id: "app", label: "App Server", tone: "emerald", x: 360, y: 150, w: 120, h: 56 },
  { id: "db", label: "Database", sub: "metadata", tone: "amber", x: 540, y: 40, w: 130, h: 56 },
  { id: "queue", label: "Message Queue", tone: "violet", x: 540, y: 150, w: 130, h: 56 },
  { id: "worker", label: "Worker", sub: "background", tone: "emerald", x: 540, y: 260, w: 130, h: 56 },
];

const uploadEdges: DiagramEdge[] = [
  { id: "client-lb", from: "client", to: "lb" },
  { id: "lb-app", from: "lb", to: "app" },
  { id: "app-db", from: "app", to: "db", label: "metadata" },
  { id: "app-lb", from: "app", to: "lb", label: "pre-signed URL", dashed: true },
  { id: "lb-client", from: "lb", to: "client", dashed: true },
  { id: "app-queue", from: "app", to: "queue", label: "job" },
  { id: "queue-worker", from: "queue", to: "worker" },
  { id: "client-obj", from: "client", to: "obj", label: "byte ảnh (đi thẳng)" },
];

const uploadEdgesEn: DiagramEdge[] = [
  { id: "client-lb", from: "client", to: "lb" },
  { id: "lb-app", from: "lb", to: "app" },
  { id: "app-db", from: "app", to: "db", label: "metadata" },
  { id: "app-lb", from: "app", to: "lb", label: "pre-signed URL", dashed: true },
  { id: "lb-client", from: "lb", to: "client", dashed: true },
  { id: "app-queue", from: "app", to: "queue", label: "job" },
  { id: "queue-worker", from: "queue", to: "worker" },
  { id: "client-obj", from: "client", to: "obj", label: "photo bytes (direct)" },
];

const FEED_BASE: Record<string, NodeState> = {
  client: "idle",
  cdn: "idle",
  app: "idle",
  cache: "idle",
  db: "idle",
  obj: "idle",
};

const feedNodes: DiagramNode[] = [
  { id: "client", label: "Client", tone: "sky", x: 25, y: 80, w: 120, h: 56 },
  { id: "cdn", label: "CDN", sub: "edge gần người dùng", tone: "violet", x: 25, y: 220, w: 140, h: 56 },
  { id: "app", label: "App Server", tone: "emerald", x: 220, y: 140, w: 120, h: 56 },
  { id: "cache", label: "Cache", sub: "danh sách bài", tone: "amber", x: 420, y: 40, w: 130, h: 56 },
  { id: "db", label: "Database", tone: "amber", x: 420, y: 150, w: 130, h: 56 },
  { id: "obj", label: "Object Storage", sub: "ảnh gốc", tone: "amber", x: 420, y: 270, w: 130, h: 56 },
];

const feedNodesEn: DiagramNode[] = [
  { id: "client", label: "Client", tone: "sky", x: 25, y: 80, w: 120, h: 56 },
  { id: "cdn", label: "CDN", sub: "edge near the user", tone: "violet", x: 25, y: 220, w: 140, h: 56 },
  { id: "app", label: "App Server", tone: "emerald", x: 220, y: 140, w: 120, h: 56 },
  { id: "cache", label: "Cache", sub: "post list", tone: "amber", x: 420, y: 40, w: 130, h: 56 },
  { id: "db", label: "Database", tone: "amber", x: 420, y: 150, w: 130, h: 56 },
  { id: "obj", label: "Object Storage", sub: "original photos", tone: "amber", x: 420, y: 270, w: 130, h: 56 },
];

const feedEdges: DiagramEdge[] = [
  { id: "client-app", from: "client", to: "app", label: "GET /feed" },
  { id: "app-cache", from: "app", to: "cache", label: "1. đọc cache" },
  { id: "app-db", from: "app", to: "db", label: "2. cache miss" },
  { id: "cdn-client", from: "cdn", to: "client", label: "ảnh" },
  { id: "obj-cdn", from: "obj", to: "cdn", label: "origin", dashed: true },
];

const feedEdgesEn: DiagramEdge[] = [
  { id: "client-app", from: "client", to: "app", label: "GET /feed" },
  { id: "app-cache", from: "app", to: "cache", label: "1. read cache" },
  { id: "app-db", from: "app", to: "db", label: "2. cache miss" },
  { id: "cdn-client", from: "cdn", to: "client", label: "photos" },
  { id: "obj-cdn", from: "obj", to: "cdn", label: "origin", dashed: true },
];

function baseStates(nodes: DiagramNode[]): Record<string, NodeState> {
  return Object.fromEntries(nodes.map((node) => [node.id, "idle" as NodeState]));
}

function buildUploadFrames(en: boolean): FlowFrame[] {
  const base = () => baseStates(uploadNodes);
  const frames: FlowFrame[] = [];

  frames.push({
    states: base(),
    note: en
      ? "Upload a photo: the app stores metadata synchronously, but the photo bytes go straight to object storage and slow work runs in the background."
      : "Đăng ảnh: app lưu metadata đồng bộ, nhưng byte của ảnh đi thẳng lên object storage và việc chậm chạy nền.",
  });

  frames.push({
    states: { ...base(), client: "active", lb: "active" },
    edgeStates: { "client-lb": "active" },
    packets: [{ id: "req", from: "client", to: "lb", t: 0, label: "POST /photos" }],
    note: en
      ? "The client sends the upload request through the load balancer."
      : "Client gửi request upload qua load balancer.",
  });

  frames.push({
    states: { ...base(), lb: "active", app: "active" },
    edgeStates: { "lb-app": "active" },
    packets: [{ id: "req", from: "lb", to: "app", t: 1, label: "POST /photos" }],
    note: en
      ? "The load balancer forwards it to an application server."
      : "Load balancer chuyển tiếp tới một application server.",
  });

  frames.push({
    states: { ...base(), app: "active", db: "active" },
    edgeStates: { "app-db": "active" },
    packets: [{ id: "meta", from: "app", to: "db", t: 0, label: "metadata" }],
    note: en
      ? "The app writes metadata (owner, caption, timestamp) to the database."
      : "App lưu metadata (chủ sở hữu, caption, thời gian) vào database.",
  });

  frames.push({
    states: { ...base(), app: "active", db: "success", lb: "active" },
    edgeStates: { "app-db": "success", "app-lb": "active" },
    packets: [{ id: "url", from: "app", to: "lb", t: 0, label: "pre-signed URL" }],
    note: en
      ? "After writing metadata, the app creates a pre-signed URL and sends it back through the load balancer."
      : "Sau khi lưu metadata, app tạo một pre-signed URL và gửi ngược lại qua load balancer.",
  });

  frames.push({
    states: { ...base(), client: "active", lb: "success" },
    edgeStates: { "app-lb": "success", "lb-client": "active" },
    packets: [{ id: "url", from: "lb", to: "client", t: 1, label: "pre-signed URL" }],
    note: en
      ? "The load balancer hands the pre-signed URL to the client, which can now upload directly."
      : "Load balancer đưa pre-signed URL cho client để client tự upload trực tiếp.",
  });

  frames.push({
    states: { ...base(), client: "active", obj: "active", lb: "success" },
    edgeStates: { "client-obj": "active" },
    packets: [{ id: "bytes", from: "client", to: "obj", t: 0.5, label: "bytes" }],
    note: en
      ? "The photo bytes go straight from the client to object storage — they never pass through the app server."
      : "Byte của ảnh đi thẳng từ client tới object storage — không hề đi qua app server.",
  });

  frames.push({
    states: { ...base(), app: "active", queue: "active", obj: "success" },
    edgeStates: { "app-queue": "active" },
    packets: [{ id: "job", from: "app", to: "queue", t: 0, label: "job" }],
    note: en
      ? "When the upload finishes, the app puts a job on the message queue."
      : "Khi upload xong, app đặt một job vào message queue.",
  });

  frames.push({
    states: { ...base(), queue: "success", worker: "success" },
    edgeStates: { "queue-worker": "success" },
    packets: [{ id: "job", from: "queue", to: "worker", t: 1, label: "job" }],
    note: en
      ? "Background workers pick up the job for slow tasks like thumbnails or updating followers' feeds."
      : "Worker chạy nền nhận job cho các việc chậm như tạo thumbnail hoặc cập nhật feed người theo dõi.",
  });

  frames.push({
    states: base(),
    note: en
      ? "Direct object-storage upload keeps large bytes off the app server, and the queue keeps slow work out of the request path."
      : "Upload trực tiếp lên object storage giữ byte lớn khỏi app server, còn queue giữ việc chậm ra khỏi đường đi của request.",
  });

  return frames;
}

function buildFeedFrames(en: boolean): FlowFrame[] {
  const base = () => ({ ...FEED_BASE });
  const frames: FlowFrame[] = [];

  frames.push({
    states: base(),
    note: en
      ? "Read the feed: the app reads the post list from a cache and falls back to the database on a miss; the photos are delivered by a CDN."
      : "Đọc feed: app đọc danh sách bài từ cache, nếu miss thì đọc database; ảnh được CDN phục vụ.",
  });

  frames.push({
    states: { ...base(), client: "active", app: "active" },
    edgeStates: { "client-app": "active" },
    packets: [{ id: "feed", from: "client", to: "app", t: 0, label: "GET /feed" }],
    note: en
      ? "The user opens the feed; the request reaches the application server."
      : "Người dùng mở feed; request tới application server.",
  });

  frames.push({
    states: { ...base(), app: "active", cache: "active" },
    edgeStates: { "app-cache": "active" },
    packets: [{ id: "feed", from: "app", to: "cache", t: 1, label: "check cache" }],
    note: en
      ? "The app checks the cache first for the ordered list of posts (cache-aside)."
      : "App kiểm tra cache trước để lấy danh sách bài đã sắp thứ tự (cache-aside).",
  });

  frames.push({
    states: { ...base(), app: "active", cache: "warn", db: "active" },
    edgeStates: { "app-cache": "warn", "app-db": "active" },
    packets: [{ id: "feed", from: "app", to: "db", t: 0, label: "SELECT" }],
    note: en
      ? "Cache miss: the app reads the posts from the database."
      : "Cache miss: app đọc danh sách bài từ database.",
  });

  frames.push({
    states: { ...base(), app: "active", cache: "success", db: "success" },
    edgeStates: { "app-cache": "success", "app-db": "success" },
    packets: [{ id: "feed", from: "app", to: "cache", t: 1, label: "write back" }],
    note: en
      ? "The app writes the result back to the cache so later requests are fast."
      : "App ghi kết quả trở lại cache để các request sau nhanh hơn.",
  });

  frames.push({
    states: { ...base(), app: "success", client: "active", cache: "success" },
    edgeStates: { "client-app": "success", "app-cache": "success" },
    packets: [{ id: "feed", from: "app", to: "client", t: 1, label: "feed items" }],
    note: en
      ? "The app returns the ordered feed list to the client."
      : "App trả danh sách feed đã sắp thứ tự cho client.",
  });

  frames.push({
    states: { ...base(), client: "active", cdn: "active" },
    edgeStates: { "cdn-client": "active", "obj-cdn": "active" },
    packets: [{ id: "img", from: "cdn", to: "client", t: 0, label: "photos" }],
    note: en
      ? "The photos are served by the CDN edge near the user; on a cold edge the CDN pulls from the origin object storage."
      : "Ảnh được CDN edge gần người dùng phục vụ; nếu edge chưa có, CDN lấy từ object storage gốc.",
  });

  frames.push({
    states: base(),
    note: en
      ? "Cache-aside keeps the database off the common read path, and the CDN makes photo download fast from anywhere."
      : "Cache-aside giữ database khỏi đường đọc phổ biến, còn CDN giúp tải ảnh nhanh từ mọi nơi.",
  });

  return frames;
}

export const flowScenarios: FlowScenario[] = [
  {
    id: "upload",
    label: (en) => (en ? "Upload photo" : "Đăng ảnh"),
    nodes: uploadNodes,
    nodesEn: uploadNodesEn,
    edges: uploadEdges,
    edgesEn: uploadEdgesEn,
    build: buildUploadFrames,
  },
  {
    id: "feed",
    label: (en) => (en ? "Read feed" : "Đọc feed"),
    nodes: feedNodes,
    nodesEn: feedNodesEn,
    edges: feedEdges,
    edgesEn: feedEdgesEn,
    build: buildFeedFrames,
  },
];

export default function RequestFlow({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const [scenarioId, setScenarioId] = useState<FlowScenario["id"]>("upload");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scenario = flowScenarios.find((item) => item.id === scenarioId)!;
  const frames = useMemo(() => scenario.build(en), [scenario, en]);
  const frame = frames[Math.min(step, frames.length - 1)];
  const atEnd = step >= frames.length - 1;
  const isPlaying = playing && !atEnd;

  useEffect(() => {
    if (!playing || atEnd) return;
    const timer = setTimeout(
      () => setStep((current) => Math.min(current + 1, frames.length - 1)),
      1200,
    );
    return () => clearTimeout(timer);
  }, [playing, step, frames.length, atEnd]);

  function selectScenario(id: FlowScenario["id"]) {
    setScenarioId(id);
    setStep(0);
    setPlaying(false);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            {en ? "Photo app — request flow" : "Ứng dụng ảnh — luồng request"}
          </h3>
          <p className="text-sm text-zinc-400">
            {en ? "Step" : "Bước"} {Math.min(step + 1, frames.length)} /{" "}
            {frames.length}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {flowScenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectScenario(item.id)}
              className={`rounded-lg border px-3 py-1.5 transition ${
                item.id === scenarioId
                  ? "border-green-500 bg-green-500/10 text-green-300"
                  : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {item.label(en)}
            </button>
          ))}
        </div>
      </header>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
        <DiagramSvg
          nodes={en ? scenario.nodesEn : scenario.nodes}
          edges={en ? scenario.edgesEn : scenario.edges}
          states={frame.states}
          edgeStates={frame.edgeStates}
          packets={frame.packets}
          animate
          ariaLabel={`${scenario.label(en)}. ${frame.note}`}
        />
      </div>

      <p className="mt-3 min-h-6 text-sm text-zinc-300">{frame.note}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (atEnd) {
              setStep(0);
              setPlaying(true);
              return;
            }
            setPlaying((value) => !value);
          }}
          className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
        >
          {isPlaying ? (en ? "Pause" : "Tạm dừng") : en ? "Play" : "Chạy"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setStep((current) => Math.max(0, current - 1));
          }}
          disabled={step === 0}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {en ? "← Back" : "← Lùi"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setStep((current) => Math.min(frames.length - 1, current + 1));
          }}
          disabled={atEnd}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {en ? "Next →" : "Tiến →"}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setPlaying(false);
          }}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
        >
          {en ? "Restart" : "Chạy lại"}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-sky-400 bg-sky-950" />
          {en ? "In transit / active" : "Đang hoạt động"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-green-400 bg-green-950" />
          {en ? "Done" : "Hoàn tất"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border-2 border-amber-400 bg-amber-950" />
          {en ? "Cache miss / fallback" : "Cache miss / dự phòng"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-green-400" />
          {en ? "Request / bytes" : "Request / dữ liệu"}
        </span>
      </div>
    </section>
  );
}
