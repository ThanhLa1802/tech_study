import type {
  DiagramEdge,
  DiagramFrame,
  DiagramNode,
  DiagramSpec,
  NodeState,
} from "@/lib/diagram";
import type { SystemDesignVisualizer } from "@/lib/course";

const RR_LABELS: Record<string, string> = {
  s1: "Server 1",
  s2: "Server 2",
  s3: "Server 3",
};

const rrNodes: DiagramNode[] = [
  { id: "client", label: "Client", x: 10, y: 130, w: 90, h: 56 },
  { id: "lb", label: "Load Balancer", x: 150, y: 130, w: 140, h: 56 },
  { id: "s1", label: "Server 1", x: 370, y: 30, w: 120, h: 56 },
  { id: "s2", label: "Server 2", x: 370, y: 122, w: 120, h: 56 },
  { id: "s3", label: "Server 3", x: 370, y: 214, w: 120, h: 56 },
];

const rrEdges: DiagramEdge[] = [
  { id: "client-lb", from: "client", to: "lb" },
  { id: "lb-s1", from: "lb", to: "s1" },
  { id: "lb-s2", from: "lb", to: "s2" },
  { id: "lb-s3", from: "lb", to: "s3" },
];

function buildRoundRobin(): DiagramFrame[] {
  const frames: DiagramFrame[] = [];
  const down = new Set<string>();
  const healthy = () => ["s1", "s2", "s3"].filter((id) => !down.has(id));
  const base = (): Record<string, NodeState> => {
    const states: Record<string, NodeState> = {
      client: "idle",
      lb: "idle",
      s1: "idle",
      s2: "idle",
      s3: "idle",
    };
    for (const id of down) states[id] = "down";
    return states;
  };
  const total = 6;
  let i = 0;
  const stats = (request: number): DiagramFrame["stats"] => [
    { label: "Request", value: request, tone: "indigo" },
    { label: "index i", value: i, tone: "slate" },
    { label: "Server khả dụng", value: `${healthy().length}/3`, tone: "emerald" },
  ];

  frames.push({
    states: base(),
    line: 1,
    note: "Khởi tạo i = 0. Cả 3 server đang khỏe mạnh.",
    stats: stats(0),
  });

  for (let request = 1; request <= total; request++) {
    if (request === 4) {
      down.add("s2");
      i = 0;
      frames.push({
        states: base(),
        edgeStates: { "lb-s2": "down" },
        line: 3,
        note: "Health check: Server 2 không phản hồi → loại khỏi vòng xoay.",
        stats: stats(request - 1),
      });
    }
    const pool = healthy();
    const target = pool[i % pool.length];
    frames.push({
      states: { ...base(), lb: "active", [target]: "active" },
      edgeStates: { [`lb-${target}`]: "active" },
      packets: [
        { id: "req", from: "lb", to: target, t: 0, label: `req ${request}` },
      ],
      line: 3,
      note: `Request ${request}: i = ${i} → chọn ${RR_LABELS[target]} (i % ${pool.length}).`,
      stats: stats(request),
    });
    frames.push({
      states: { ...base(), [target]: "success" },
      edgeStates: { [`lb-${target}`]: "success" },
      packets: [
        { id: "req", from: "lb", to: target, t: 1, label: `req ${request}` },
      ],
      line: 4,
      note: `Chuyển request ${request} tới ${RR_LABELS[target]}.`,
      stats: stats(request),
    });
    i++;
  }

  frames.push({
    states: base(),
    line: 5,
    note: `Hoàn tất ${total} request theo vòng xoay round robin.`,
    stats: stats(total),
  });
  return frames;
}

const tbNodes: DiagramNode[] = [
  { id: "client", label: "Client", x: 10, y: 140, w: 90, h: 56 },
  {
    id: "bucket",
    label: "Token Bucket",
    x: 170,
    y: 100,
    w: 160,
    h: 120,
    shape: "bucket",
    capacity: 5,
  },
  { id: "refill", label: "Refill (+1/s)", x: 170, y: 20, w: 160, h: 48 },
  { id: "server", label: "API Server", x: 400, y: 140, w: 120, h: 56 },
];

const tbEdges: DiagramEdge[] = [
  { id: "client-bucket", from: "client", to: "bucket" },
  { id: "bucket-server", from: "bucket", to: "server" },
  { id: "refill-bucket", from: "refill", to: "bucket", dashed: true },
];

function buildTokenBucket(): DiagramFrame[] {
  const frames: DiagramFrame[] = [];
  const capacity = 5;
  const total = 8;
  let tokens = capacity;

  const base = (): Record<string, NodeState> => ({
    client: "idle",
    bucket: "idle",
    server: "idle",
    refill: "idle",
  });
  const stats = (
    request: number,
    decision: string,
  ): DiagramFrame["stats"] => [
    { label: "Request", value: request, tone: "indigo" },
    { label: "Token", value: `${tokens}/${capacity}`, tone: "amber" },
    {
      label: "Kết quả",
      value: decision,
      tone: decision === "ALLOW" ? "emerald" : "rose",
    },
  ];

  frames.push({
    states: base(),
    buckets: { bucket: tokens },
    line: 1,
    note: `Khởi tạo bộ đếm đầy: ${tokens} token.`,
    stats: stats(0, "—"),
  });

  for (let request = 1; request <= total; request++) {
    if ((request === 3 || request === 6) && tokens < capacity) {
      tokens++;
      frames.push({
        states: { ...base(), refill: "active", bucket: "active" },
        edgeStates: { "refill-bucket": "active" },
        buckets: { bucket: tokens },
        line: 1,
        note: `Đã qua thời gian → nạp thêm 1 token (còn ${tokens}/${capacity}).`,
        stats: stats(request, "—"),
      });
    }

    frames.push({
      states: { ...base(), client: "active" },
      buckets: { bucket: tokens },
      line: 2,
      note: `Request ${request} tới. Kiểm tra tokens = ${tokens}.`,
      stats: stats(request, "—"),
    });

    if (tokens >= 1) {
      tokens--;
      frames.push({
        states: { ...base(), bucket: "success" },
        buckets: { bucket: tokens },
        line: 3,
        note: `tokens ≥ 1 → trừ 1, còn ${tokens}/${capacity}.`,
        stats: stats(request, "ALLOW"),
      });
      frames.push({
        states: { ...base(), client: "success", bucket: "active" },
        edgeStates: { "client-bucket": "success" },
        buckets: { bucket: tokens },
        packets: [
          { id: "in", from: "client", to: "bucket", t: 1 },
          { id: "out", from: "bucket", to: "server", t: 0 },
        ],
        line: 4,
        note: `Request ${request} vào bucket và được chuyển tiếp.`,
        stats: stats(request, "ALLOW"),
      });
      frames.push({
        states: { ...base(), server: "success" },
        edgeStates: { "bucket-server": "success" },
        buckets: { bucket: tokens },
        packets: [
          { id: "in", from: "client", to: "bucket", t: 1 },
          { id: "out", from: "bucket", to: "server", t: 1 },
        ],
        line: 4,
        note: `API Server xử lý request ${request}.`,
        stats: stats(request, "ALLOW"),
      });
    } else {
      frames.push({
        states: { ...base(), client: "warn" },
        buckets: { bucket: tokens },
        line: 5,
        note: `tokens = 0 → từ chối request ${request}: 429 Too Many Requests.`,
        stats: stats(request, "REJECT"),
      });
    }
  }

  frames.push({
    states: base(),
    buckets: { bucket: tokens },
    line: 5,
    note: `Kết thúc: còn ${tokens}/${capacity} token.`,
    stats: stats(total, "—"),
  });
  return frames;
}

export const diagramVisualizers: Record<SystemDesignVisualizer, DiagramSpec> = {
  "load-balancer-round-robin": {
    title: "Round Robin — mô phỏng",
    nodes: rrNodes,
    edges: rrEdges,
    pseudo: [
      "function roundRobin(servers):",
      "  i = 0",
      "  for request in requests:",
      "    s = servers[i % n]   // bỏ qua server down",
      "    forward(request, s)",
      "    i = i + 1",
    ],
    legend: [
      { state: "idle", label: "Chờ" },
      { state: "active", label: "Đang định tuyến" },
      { state: "success", label: "Đã xử lý" },
      { state: "down", label: "Không khả dụng" },
      { state: "packet", label: "Request" },
    ],
    build: buildRoundRobin,
  },
  "token-bucket": {
    title: "Token Bucket — mô phỏng",
    nodes: tbNodes,
    edges: tbEdges,
    pseudo: [
      "function allow(request):",
      "  refill()               // nạp token theo thời gian",
      "  if tokens >= 1:",
      "    tokens = tokens - 1",
      "    return ALLOW",
      "  return REJECT  // 429",
    ],
    legend: [
      { state: "idle", label: "Chờ" },
      { state: "active", label: "Nạp / luân chuyển" },
      { state: "success", label: "Cho phép" },
      { state: "warn", label: "Bị chặn (429)" },
      { state: "packet", label: "Request" },
    ],
    build: buildTokenBucket,
  },
};
