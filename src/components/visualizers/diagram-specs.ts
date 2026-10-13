import type {
  DiagramEdge,
  DiagramFrame,
  DiagramNode,
  DiagramSpec,
  NodeState,
  StatTone,
} from "@/lib/diagram";
import type { SystemDesignVisualizer } from "@/lib/course";
import type { Locale } from "@/lib/locale";

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

function buildRoundRobin(locale: Locale = "vi"): DiagramFrame[] {
  const en = locale === "en";
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
    {
      label: en ? "Available servers" : "Server khả dụng",
      value: `${healthy().length}/3`,
      tone: "emerald",
    },
  ];

  frames.push({
    states: base(),
    line: 1,
    note: en
      ? "Initialize i = 0. All 3 servers are healthy."
      : "Khởi tạo i = 0. Cả 3 server đang khỏe mạnh.",
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
        note: en
          ? "Health check: Server 2 is not responding → remove it from rotation."
          : "Health check: Server 2 không phản hồi → loại khỏi vòng xoay.",
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
      note: en
        ? `Request ${request}: i = ${i} → select ${RR_LABELS[target]} (i % ${pool.length}).`
        : `Request ${request}: i = ${i} → chọn ${RR_LABELS[target]} (i % ${pool.length}).`,
      stats: stats(request),
    });
    frames.push({
      states: { ...base(), [target]: "success" },
      edgeStates: { [`lb-${target}`]: "success" },
      packets: [
        { id: "req", from: "lb", to: target, t: 1, label: `req ${request}` },
      ],
      line: 4,
      note: en
        ? `Forward request ${request} to ${RR_LABELS[target]}.`
        : `Chuyển request ${request} tới ${RR_LABELS[target]}.`,
      stats: stats(request),
    });
    i++;
  }

  frames.push({
    states: base(),
    line: 5,
    note: en
      ? `Completed ${total} requests using round robin.`
      : `Hoàn tất ${total} request theo vòng xoay round robin.`,
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

function buildTokenBucket(locale: Locale = "vi"): DiagramFrame[] {
  const en = locale === "en";
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
      label: en ? "Result" : "Kết quả",
      value: decision,
      tone: decision === "ALLOW" ? "emerald" : "rose",
    },
  ];

  frames.push({
    states: base(),
    buckets: { bucket: tokens },
    line: 1,
    note: en
      ? `Initialize with a full bucket: ${tokens} tokens.`
      : `Khởi tạo bộ đếm đầy: ${tokens} token.`,
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
        note: en
          ? `Time elapsed → refill 1 token (${tokens}/${capacity} now).`
          : `Đã qua thời gian → nạp thêm 1 token (còn ${tokens}/${capacity}).`,
        stats: stats(request, "—"),
      });
    }

    frames.push({
      states: { ...base(), client: "active" },
      buckets: { bucket: tokens },
      line: 2,
      note: en
        ? `Request ${request} arrives. Check tokens = ${tokens}.`
        : `Request ${request} tới. Kiểm tra tokens = ${tokens}.`,
      stats: stats(request, "—"),
    });

    if (tokens >= 1) {
      tokens--;
      frames.push({
        states: { ...base(), bucket: "success" },
        buckets: { bucket: tokens },
        line: 3,
        note: en
          ? `tokens ≥ 1 → subtract 1; ${tokens}/${capacity} remaining.`
          : `tokens ≥ 1 → trừ 1, còn ${tokens}/${capacity}.`,
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
        note: en
          ? `Request ${request} enters the bucket and is forwarded.`
          : `Request ${request} vào bucket và được chuyển tiếp.`,
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
        note: en
          ? `API Server processes request ${request}.`
          : `API Server xử lý request ${request}.`,
        stats: stats(request, "ALLOW"),
      });
    } else {
      frames.push({
        states: { ...base(), client: "warn" },
        buckets: { bucket: tokens },
        line: 5,
        note: en
          ? `tokens = 0 → reject request ${request}: 429 Too Many Requests.`
          : `tokens = 0 → từ chối request ${request}: 429 Too Many Requests.`,
        stats: stats(request, "REJECT"),
      });
    }
  }

  frames.push({
    states: base(),
    buckets: { bucket: tokens },
    line: 5,
    note: en
      ? `Finished: ${tokens}/${capacity} tokens remaining.`
      : `Kết thúc: còn ${tokens}/${capacity} token.`,
    stats: stats(total, "—"),
  });
  return frames;
}

const httpNodes: DiagramNode[] = [
  {
    id: "client",
    label: "Client",
    sub: "trình duyệt / app",
    tone: "sky",
    x: 20,
    y: 150,
    w: 120,
    h: 64,
  },
  {
    id: "observer",
    label: "Người quan sát",
    sub: "trên mạng",
    tone: "violet",
    x: 210,
    y: 150,
    w: 150,
    h: 64,
  },
  {
    id: "server",
    label: "Server",
    sub: "trang web",
    tone: "emerald",
    x: 430,
    y: 150,
    w: 130,
    h: 64,
  },
  {
    id: "cert",
    label: "Chứng chỉ",
    sub: "danh tính",
    tone: "zinc",
    x: 430,
    y: 30,
    w: 130,
    h: 56,
  },
  {
    id: "key",
    label: "Khoá phiên",
    sub: "hai bên cùng suy ra",
    tone: "zinc",
    x: 210,
    y: 30,
    w: 150,
    h: 56,
  },
];

const httpEdges: DiagramEdge[] = [
  { id: "client-observer", from: "client", to: "observer" },
  { id: "observer-server", from: "observer", to: "server" },
  { id: "server-cert", from: "server", to: "cert", dashed: true },
  { id: "client-key", from: "client", to: "key", dashed: true },
  { id: "server-key", from: "server", to: "key", dashed: true },
];

/**
 * Teaches the difference between HTTP and HTTPS. The first half sends plaintext
 * HTTP that an observer on the network can read; the second half performs the
 * TLS handshake (certificate + shared session key) and then protects the same
 * HTTP request/response in transit. Node/edge geometry is fixed; only states,
 * packets, notes, and stats change per frame.
 */
function buildHttpHttps(locale: Locale = "vi"): DiagramFrame[] {
  const en = locale === "en";
  const base = (): Record<string, NodeState> => ({
    client: "idle",
    observer: "idle",
    server: "idle",
    cert: "idle",
    key: "idle",
  });
  const stats = (
    scheme: string,
    transit: string,
    transitTone: StatTone,
    observer: string,
    observerTone: StatTone,
  ): DiagramFrame["stats"] => [
    { label: en ? "Scheme" : "Giao thức", value: scheme, tone: "slate" },
    {
      label: en ? "In transit" : "Trên đường",
      value: transit,
      tone: transitTone,
    },
    {
      label: en ? "Observer" : "Người quan sát",
      value: observer,
      tone: observerTone,
    },
  ];
  const plainEdges: Record<string, NodeState> = {
    "client-observer": "warn",
    "observer-server": "warn",
  };
  const activeEdges: Record<string, NodeState> = {
    "client-observer": "active",
    "observer-server": "active",
  };
  const secureEdges: Record<string, NodeState> = {
    "client-observer": "success",
    "observer-server": "success",
  };
  const packet = (
    id: string,
    from: string,
    to: string,
    t: number,
    label: string,
  ): DiagramFrame["packets"] => [{ id, from, to, t, label }];

  const frames: DiagramFrame[] = [];

  frames.push({
    states: base(),
    line: 0,
    note: en
      ? "HTTP: requests and responses travel as plaintext on the network."
      : "HTTP: request và response đi trên mạng dưới dạng văn bản thường (plaintext).",
    stats: stats("HTTP", "plaintext", "rose", "—", "slate"),
  });

  frames.push({
    states: { ...base(), client: "active", observer: "warn" },
    edgeStates: plainEdges,
    packets: packet("http-req", "client", "server", 0.15, "GET /login"),
    line: 1,
    note: en
      ? "The client sends an HTTP request; the observer reads the whole request."
      : "Client gửi HTTP request; người quan sát đọc được toàn bộ nội dung.",
    stats: stats(
      "HTTP",
      "plaintext",
      "rose",
      en ? "reads" : "đọc được",
      "rose",
    ),
  });

  frames.push({
    states: { ...base(), client: "active", observer: "warn", server: "active" },
    edgeStates: plainEdges,
    packets: packet("http-res", "server", "client", 0.15, "200 OK"),
    line: 2,
    note: en
      ? "The server returns an HTTP response; the observer reads it too."
      : "Server trả HTTP response; người quan sát vẫn đọc được nội dung.",
    stats: stats(
      "HTTP",
      "plaintext",
      "rose",
      en ? "reads" : "đọc được",
      "rose",
    ),
  });

  frames.push({
    states: { ...base(), observer: "warn" },
    edgeStates: plainEdges,
    line: 3,
    note: en
      ? "Because HTTP is plaintext, the observer reads every request and response."
      : "Vì HTTP là plaintext, người quan sát đọc được mọi request và response.",
    stats: stats(
      "HTTP",
      "plaintext",
      "rose",
      en ? "reads everything" : "đọc tất cả",
      "rose",
    ),
  });

  frames.push({
    states: { ...base(), client: "active", observer: "active", server: "active" },
    edgeStates: activeEdges,
    packets: packet("hello", "client", "server", 0.15, "ClientHello"),
    line: 4,
    note: en
      ? "HTTPS: before any data, the client and server perform a TLS handshake."
      : "HTTPS: trước khi gửi dữ liệu, client và server bắt tay TLS.",
    stats: stats(
      "HTTPS",
      "TLS handshake",
      "indigo",
      en ? "sees handshake" : "thấy bắt tay",
      "indigo",
    ),
  });

  frames.push({
    states: {
      ...base(),
      client: "active",
      observer: "active",
      server: "active",
      cert: "success",
    },
    edgeStates: { ...activeEdges, "server-cert": "success" },
    packets: packet(
      "cert",
      "server",
      "client",
      0.15,
      en ? "certificate" : "chứng chỉ",
    ),
    line: 5,
    note: en
      ? "The server sends a certificate so the client can verify it is the real server. A certificate proves identity; it is not the secret key used to encrypt data."
      : "Server gửi chứng chỉ để client xác thực đúng là server thật. Chứng chỉ chứng minh danh tính, không phải khoá bí mật dùng để mã hoá dữ liệu.",
    stats: stats(
      "HTTPS",
      en ? "certificate" : "chứng chỉ",
      "amber",
      en ? "sees handshake" : "thấy bắt tay",
      "indigo",
    ),
  });

  frames.push({
    states: {
      ...base(),
      client: "active",
      observer: "active",
      server: "active",
      key: "success",
    },
    edgeStates: {
      ...activeEdges,
      "client-key": "success",
      "server-key": "success",
    },
    line: 6,
    note: en
      ? "Both sides derive a shared session key from the TLS handshake; no secret key is sent over the network. In a normal authenticated TLS connection, the observer sees the handshake messages but cannot derive the session key."
      : "Hai bên cùng suy ra một khoá phiên từ quá trình bắt tay TLS; khoá bí mật không được gửi qua mạng. Trong một kết nối TLS xác thực bình thường, người quan sát chỉ thấy các thông điệp bắt tay và không suy ra được khoá phiên.",
    stats: stats(
      "HTTPS",
      en ? "key agreement" : "thoả thuận khoá",
      "amber",
      en ? "cannot derive" : "không suy ra được",
      "emerald",
    ),
  });

  frames.push({
    states: {
      ...base(),
      client: "active",
      observer: "down",
      server: "active",
      key: "success",
    },
    edgeStates: secureEdges,
    packets: packet(
      "enc-req",
      "client",
      "server",
      0.15,
      en ? "encrypted GET" : "GET đã mã hoá",
    ),
    line: 7,
    note: en
      ? "The request is still HTTP, but TLS uses the session key to encrypt it in transit; the observer only sees ciphertext."
      : "Request vẫn là HTTP, nhưng TLS dùng khoá phiên để mã hoá nó khi truyền; người quan sát chỉ thấy dữ liệu đã mã hoá.",
    stats: stats(
      "HTTPS",
      en ? "encrypted" : "đã mã hoá",
      "emerald",
      en ? "ciphertext only" : "chỉ thấy mã hoá",
      "emerald",
    ),
  });

  frames.push({
    states: {
      ...base(),
      client: "active",
      observer: "down",
      server: "active",
      key: "success",
    },
    edgeStates: secureEdges,
    packets: packet(
      "enc-res",
      "server",
      "client",
      0.15,
      en ? "encrypted 200 OK" : "200 OK đã mã hoá",
    ),
    line: 8,
    note: en
      ? "The response is encrypted in transit with the same session key."
      : "Response cũng được mã hoá khi truyền bằng khoá phiên đó.",
    stats: stats(
      "HTTPS",
      en ? "encrypted" : "đã mã hoá",
      "emerald",
      en ? "ciphertext only" : "chỉ thấy mã hoá",
      "emerald",
    ),
  });

  frames.push({
    states: { ...base(), observer: "down", key: "success" },
    edgeStates: secureEdges,
    line: 9,
    note: en
      ? "HTTPS = HTTP inside a TLS channel. The content is still HTTP; TLS protects the data in transit, while routing and IP addresses still work as usual."
      : "HTTPS = HTTP chạy trong kênh TLS. Nội dung vẫn là HTTP; TLS bảo vệ dữ liệu khi truyền, còn việc định tuyến và địa chỉ IP vẫn diễn ra bình thường.",
    stats: stats(
      "HTTPS",
      en ? "encrypted" : "đã mã hoá",
      "emerald",
      en ? "unreadable" : "không đọc được",
      "emerald",
    ),
  });

  return frames;
}

const caNodes: DiagramNode[] = [
  {
    id: "client",
    label: "Client",
    sub: "gửi yêu cầu",
    tone: "sky",
    x: 20,
    y: 150,
    w: 120,
    h: 56,
  },
  {
    id: "cache",
    label: "Cache",
    sub: "đọc/ghi",
    tone: "amber",
    x: 220,
    y: 150,
    w: 130,
    h: 56,
  },
  {
    id: "db",
    label: "Database",
    sub: "nguồn chính",
    tone: "amber",
    x: 430,
    y: 30,
    w: 130,
    h: 56,
  },
  {
    id: "response",
    label: "Client",
    sub: "nhận dữ liệu",
    tone: "sky",
    x: 640,
    y: 150,
    w: 130,
    h: 56,
  },
];

const caEdges: DiagramEdge[] = [
  { id: "client-cache", from: "client", to: "cache", label: "yêu cầu" },
  { id: "cache-response", from: "cache", to: "response", label: "trả dữ liệu" },
  { id: "cache-db", from: "cache", to: "db", label: "miss: truy vấn" },
  { id: "client-db", from: "client", to: "db", label: "ghi: cập nhật", dashed: true },
];

/**
 * Animates the cache-aside read path (hit, miss, fill) and the write path
 * (update the database, then delete the cache entry). Frames are a faithful
 * trace: a HIT frame carries `success` on the cache and returns a value packet;
 * a MISS frame carries `warn` on the cache and queries the database.
 */
function buildCacheAside(locale: Locale = "vi"): DiagramFrame[] {
  const en = locale === "en";
  const base = (): Record<string, NodeState> => ({
    client: "idle",
    cache: "idle",
    db: "idle",
    response: "idle",
  });
  const stats = (
    op: string,
    result: string,
    tone: StatTone,
  ): DiagramFrame["stats"] => [
    { label: en ? "Operation" : "Thao tác", value: op, tone: "slate" },
    { label: en ? "Result" : "Kết quả", value: result, tone },
  ];
  const packet = (
    id: string,
    from: string,
    to: string,
    t: number,
    label: string,
  ): DiagramFrame["packets"] => [{ id, from, to, t, label }];
  const read = en ? "read" : "đọc";
  const write = en ? "write" : "ghi";

  const frames: DiagramFrame[] = [];

  frames.push({
    states: base(),
    line: 0,
    note: en
      ? "Cache-aside: the app checks the cache first, reads from the database on a miss, and stores the result for next time."
      : "Cache-aside: ứng dụng kiểm tra cache trước; khi miss thì đọc database và lưu kết quả cho lần sau.",
    stats: stats("—", "—", "slate"),
  });

  frames.push({
    states: { ...base(), client: "active", cache: "active" },
    edgeStates: { "client-cache": "active" },
    packets: packet("r1", "client", "cache", 1, "GET"),
    line: 1,
    note: en
      ? "The client requests a product; the request goes to the cache first."
      : "Client yêu cầu một sản phẩm; request đi tới cache trước.",
    stats: stats(read, "—", "slate"),
  });

  frames.push({
    states: { ...base(), client: "active", cache: "success", response: "active" },
    edgeStates: { "cache-response": "success" },
    packets: packet("v1", "cache", "response", 1, en ? "value" : "dữ liệu"),
    line: 2,
    note: en
      ? "Hit: the cache already holds the key, so the value is returned immediately without touching the database."
      : "Hit: cache đã có key nên trả giá trị ngay, không cần chạm database.",
    stats: stats(read, "HIT", "emerald"),
  });

  frames.push({
    states: { ...base(), client: "active" },
    edgeStates: { "client-cache": "active" },
    packets: packet("r2", "client", "cache", 1, "GET"),
    line: 1,
    note: en
      ? "Later the client requests the same key, but the entry is no longer in the cache."
      : "Sau đó client yêu cầu đúng key này, nhưng entry không còn trong cache.",
    stats: stats(read, "—", "slate"),
  });

  frames.push({
    states: { ...base(), client: "active", cache: "warn" },
    edgeStates: { "client-cache": "warn" },
    line: 3,
    note: en
      ? "Miss: the cache does not have the key, so the app must load it from the database."
      : "Miss: cache không có key nên ứng dụng phải nạp từ database.",
    stats: stats(read, "MISS", "rose"),
  });

  frames.push({
    states: { ...base(), cache: "active", db: "active" },
    edgeStates: { "cache-db": "active" },
    packets: packet("q", "cache", "db", 1, "SELECT"),
    line: 3,
    note: en
      ? "The app queries the database for the missing key."
      : "Ứng dụng truy vấn database cho key bị thiếu.",
    stats: stats(read, "MISS", "rose"),
  });

  frames.push({
    states: { ...base(), cache: "success", db: "success" },
    edgeStates: { "cache-db": "success" },
    packets: packet("row", "db", "cache", 1, en ? "row" : "bản ghi"),
    line: 4,
    note: en
      ? "The result is written back into the cache so the next read is fast."
      : "Kết quả được ghi lại vào cache để lần đọc sau nhanh hơn.",
    stats: stats(read, en ? "fill" : "nạp cache", "amber"),
  });

  frames.push({
    states: { ...base(), cache: "success", response: "active" },
    edgeStates: { "cache-response": "success" },
    packets: packet("v2", "cache", "response", 1, en ? "value" : "dữ liệu"),
    line: 5,
    note: en
      ? "The value now comes from the cache, and the database is off the common read path."
      : "Giá trị giờ đến từ cache, database được đưa ra khỏi đường đọc phổ biến.",
    stats: stats(read, en ? "served" : "đã trả", "emerald"),
  });

  frames.push({
    states: { ...base(), client: "active", db: "active" },
    edgeStates: { "client-db": "active" },
    packets: packet("w", "client", "db", 1, "UPDATE"),
    line: 7,
    note: en
      ? "On a write, the app updates the database directly; the cache is not updated in place."
      : "Khi ghi, ứng dụng cập nhật thẳng database; cache không được cập nhật tại chỗ.",
    stats: stats(write, en ? "update DB" : "cập nhật DB", "amber"),
  });

  frames.push({
    states: { ...base(), db: "success", cache: "down" },
    edgeStates: { "client-db": "success" },
    line: 8,
    note: en
      ? "Then the cache entry is deleted. The next read misses and reloads fresh data."
      : "Sau đó entry cache bị xoá. Lần đọc kế tiếp sẽ miss và nạp lại dữ liệu mới.",
    stats: stats(write, en ? "invalidate" : "vô hiệu hoá", "amber"),
  });

  frames.push({
    states: base(),
    line: 8,
    note: en
      ? "Trade-off: cache-aside keeps the database off the common read path, but delete-on-write plus a concurrent read can briefly reload stale data. TTLs and versioning bound that window."
      : "Đánh đổi: cache-aside giữ database khỏi đường đọc phổ biến, nhưng xoá-khi-ghi cùng một lần đọc đồng thời có thể nạp lại dữ liệu cũ trong chốc lát. TTL và versioning giúp giới hạn khoảng đó.",
    stats: stats("—", "—", "slate"),
  });

  return frames;
}

const csNodes: DiagramNode[] = [
  {
    id: "r1",
    label: "Yêu cầu 1",
    sub: "cùng key nóng",
    tone: "sky",
    x: 20,
    y: 40,
    w: 130,
    h: 56,
  },
  { id: "r2", label: "Yêu cầu 2", tone: "sky", x: 20, y: 150, w: 130, h: 56 },
  { id: "r3", label: "Yêu cầu 3", tone: "sky", x: 20, y: 260, w: 130, h: 56 },
  {
    id: "cache",
    label: "Cache",
    sub: "key nóng",
    tone: "amber",
    x: 250,
    y: 150,
    w: 130,
    h: 56,
  },
  {
    id: "db",
    label: "Database",
    sub: "nguồn chính",
    tone: "amber",
    x: 470,
    y: 150,
    w: 130,
    h: 56,
  },
];

const csEdges: DiagramEdge[] = [
  { id: "r1-cache", from: "r1", to: "cache" },
  { id: "r2-cache", from: "r2", to: "cache" },
  { id: "r3-cache", from: "r3", to: "cache" },
  { id: "cache-db", from: "cache", to: "db", label: "truy vấn" },
];

/**
 * Animates a cache stampede (thundering herd) protected by single-flight: three
 * requests miss the same hot key at once, but only one takes the lock and loads
 * the key, so the database sees a single query while the rest share the result.
 */
function buildCacheStampede(locale: Locale = "vi"): DiagramFrame[] {
  const en = locale === "en";
  const base = (): Record<string, NodeState> => ({
    r1: "idle",
    r2: "idle",
    r3: "idle",
    cache: "idle",
    db: "idle",
  });
  const stats = (
    waiting: number,
    queries: number,
  ): DiagramFrame["stats"] => [
    {
      label: en ? "Waiting" : "Đang chờ",
      value: waiting,
      tone: waiting > 0 ? "amber" : "slate",
    },
    {
      label: en ? "DB queries" : "Truy vấn DB",
      value: queries,
      tone: queries > 0 ? "indigo" : "slate",
    },
  ];
  const packet = (
    id: string,
    from: string,
    to: string,
    t: number,
    label?: string,
  ): DiagramFrame["packets"] => [{ id, from, to, t, label }];

  const frames: DiagramFrame[] = [];

  frames.push({
    states: base(),
    line: 0,
    note: en
      ? "A hot key expires. Three requests for the same key arrive at the same moment."
      : "Một key nóng hết hạn. Ba request cho cùng key tới cùng một thời điểm.",
    stats: stats(0, 0),
  });

  frames.push({
    states: { ...base(), r1: "active", r2: "active", r3: "active", cache: "warn" },
    edgeStates: { "r1-cache": "warn", "r2-cache": "warn", "r3-cache": "warn" },
    line: 1,
    note: en
      ? "All three requests miss the cache at the same time — a cache stampede waiting to happen."
      : "Cả ba request cùng miss cache — một cú cache stampede đang chực xảy ra.",
    stats: stats(3, 0),
  });

  frames.push({
    states: { ...base(), r1: "active", r2: "warn", r3: "warn", cache: "active" },
    edgeStates: { "r1-cache": "active", "r2-cache": "warn", "r3-cache": "warn" },
    line: 3,
    note: en
      ? "Single-flight: request 1 takes the lock to load the key; requests 2 and 3 wait instead of querying the database."
      : "Single-flight: yêu cầu 1 nhận khoá để nạp key; yêu cầu 2 và 3 chờ thay vì truy vấn database.",
    stats: stats(2, 0),
  });

  frames.push({
    states: { ...base(), r1: "active", cache: "active", db: "active" },
    edgeStates: { "r1-cache": "active", "cache-db": "active" },
    packets: packet("q", "cache", "db", 1, "SELECT"),
    line: 4,
    note: en
      ? "Only request 1 queries the database for the missing key."
      : "Chỉ yêu cầu 1 truy vấn database cho key bị thiếu.",
    stats: stats(2, 1),
  });

  frames.push({
    states: { ...base(), cache: "success", db: "success" },
    edgeStates: { "cache-db": "success" },
    packets: packet("row", "db", "cache", 1, en ? "row" : "bản ghi"),
    line: 5,
    note: en
      ? "The database returns the value, and the cache stores it once."
      : "Database trả về giá trị, và cache lưu lại một lần.",
    stats: stats(2, 1),
  });

  frames.push({
    states: { ...base(), r1: "success", cache: "success" },
    edgeStates: { "r1-cache": "success" },
    packets: packet("v1", "cache", "r1", 1, en ? "value" : "dữ liệu"),
    line: 6,
    note: en
      ? "Request 1 is served from the freshly cached value."
      : "Yêu cầu 1 được phục vụ từ giá trị vừa được cache.",
    stats: stats(2, 1),
  });

  frames.push({
    states: { ...base(), r1: "success", r2: "success", r3: "success", cache: "success" },
    edgeStates: { "r1-cache": "success", "r2-cache": "success", "r3-cache": "success" },
    packets: [
      ...(packet("v2", "cache", "r2", 1, en ? "value" : "dữ liệu") ?? []),
      ...(packet("v3", "cache", "r3", 1, en ? "value" : "dữ liệu") ?? []),
    ],
    line: 2,
    note: en
      ? "Requests 2 and 3 are served from the cache — no extra database load."
      : "Yêu cầu 2 và 3 được phục vụ từ cache — không thêm tải cho database.",
    stats: stats(0, 1),
  });

  frames.push({
    states: base(),
    line: 6,
    note: en
      ? "Only one database query served three requests. Without coalescing, every miss would query the source and overload it."
      : "Chỉ một truy vấn database phục vụ ba request. Không gom request, mỗi lần miss đều truy vấn nguồn và có thể làm quá tải.",
    stats: stats(0, 1),
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
    overrides: {
      en: {
        title: "Round Robin — simulation",
        pseudo: [
          "function roundRobin(servers):",
          "  i = 0",
          "  for request in requests:",
          "    s = servers[i % n]   // skip servers that are down",
          "    forward(request, s)",
          "    i = i + 1",
        ],
        legend: {
          idle: "Waiting",
          active: "Routing",
          success: "Processed",
          down: "Unavailable",
          packet: "Request",
        },
      },
    },
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
    overrides: {
      en: {
        title: "Token Bucket — simulation",
        pseudo: [
          "function allow(request):",
          "  refill()               // refill tokens over time",
          "  if tokens >= 1:",
          "    tokens = tokens - 1",
          "    return ALLOW",
          "  return REJECT  // 429",
        ],
        legend: {
          idle: "Waiting",
          active: "Refill / transfer",
          success: "Allowed",
          warn: "Rejected (429)",
          packet: "Request",
        },
      },
    },
    build: buildTokenBucket,
  },
  "http-https": {
    title: "HTTP / HTTPS — mô phỏng",
    nodes: httpNodes,
    edges: httpEdges,
    pseudo: [
      "HTTP: request/response = plaintext",
      "client → server: GET /login",
      "server → client: 200 OK",
      "observer: đọc được tất cả",
      "HTTPS: bắt tay TLS trước",
      "server → client: chứng chỉ (danh tính)",
      "client ⇄ server: cùng suy ra khoá phiên",
      "client → server: request đã mã hoá",
      "server → client: response đã mã hoá",
      "HTTP trong kênh TLS: nội dung không đổi",
    ],
    legend: [
      { state: "idle", label: "Chờ" },
      { state: "active", label: "Đang truyền" },
      { state: "success", label: "Đã bảo vệ" },
      { state: "warn", label: "Lộ plaintext" },
      { state: "down", label: "Không đọc được" },
      { state: "packet", label: "Dữ liệu" },
    ],
    overrides: {
      en: {
        title: "HTTP / HTTPS — simulation",
        pseudo: [
          "HTTP: request/response = plaintext",
          "client → server: GET /login",
          "server → client: 200 OK",
          "observer: reads everything",
          "HTTPS: TLS handshake first",
          "server → client: certificate (identity)",
          "client ⇄ server: derive the session key",
          "client → server: encrypted request",
          "server → client: encrypted response",
          "HTTP inside TLS: same content",
        ],
        legend: {
          idle: "Waiting",
          active: "In transit",
          success: "Protected",
          warn: "Plaintext exposed",
          down: "Unreadable",
          packet: "Data",
        },
        nodes: {
          client: { sub: "browser / app" },
          observer: { label: "Observer", sub: "on the network" },
          server: { sub: "website" },
          cert: { label: "Certificate", sub: "identity" },
          key: { label: "Session key", sub: "derived by both sides" },
        },
      },
    },
    build: buildHttpHttps,
  },
  "cache-aside": {
    title: "Cache-aside — mô phỏng",
    nodes: caNodes,
    edges: caEdges,
    pseudo: [
      "function read(key):",
      "  v = cache.get(key)",
      "  if v != null: return v      // hit",
      "  v = db.query(key)           // miss",
      "  cache.set(key, v)",
      "  return v",
      "function write(key, value):",
      "  db.update(key, value)",
      "  cache.delete(key)           // vô hiệu hoá",
    ],
    legend: [
      { state: "idle", label: "Chờ" },
      { state: "active", label: "Đang xử lý" },
      { state: "success", label: "Thành công" },
      { state: "warn", label: "Cache miss" },
      { state: "down", label: "Đã xoá (invalidate)" },
      { state: "packet", label: "Dữ liệu" },
    ],
    overrides: {
      en: {
        title: "Cache-aside — simulation",
        pseudo: [
          "function read(key):",
          "  v = cache.get(key)",
          "  if v != null: return v      // hit",
          "  v = db.query(key)           // miss",
          "  cache.set(key, v)",
          "  return v",
          "function write(key, value):",
          "  db.update(key, value)",
          "  cache.delete(key)           // invalidate",
        ],
        legend: {
          idle: "Waiting",
          active: "Processing",
          success: "Success",
          warn: "Cache miss",
          down: "Removed (invalidated)",
          packet: "Data",
        },
        nodes: {
          client: { sub: "send request" },
          cache: { sub: "read / write" },
          db: { sub: "source of truth" },
          response: { sub: "receive data" },
        },
        edges: {
          "client-cache": { label: "request" },
          "cache-response": { label: "return data" },
          "cache-db": { label: "miss: query" },
          "client-db": { label: "write: update" },
        },
      },
    },
    build: buildCacheAside,
  },
  "cache-stampede": {
    title: "Cache stampede — single-flight",
    nodes: csNodes,
    edges: csEdges,
    pseudo: [
      "function get(key):",
      "  v = cache.get(key)",
      "  if v != null: return v",
      "  // single-flight: một loader cho mỗi key",
      "  v = inflight(key, () => db.query(key))",
      "  cache.set(key, v)",
      "  return v",
    ],
    legend: [
      { state: "idle", label: "Chờ" },
      { state: "active", label: "Đang xử lý" },
      { state: "success", label: "Đã phục vụ" },
      { state: "warn", label: "Đang chờ (khoá)" },
      { state: "packet", label: "Dữ liệu" },
    ],
    overrides: {
      en: {
        title: "Cache stampede — single-flight",
        pseudo: [
          "function get(key):",
          "  v = cache.get(key)",
          "  if v != null: return v",
          "  // single-flight: one loader per key",
          "  v = inflight(key, () => db.query(key))",
          "  cache.set(key, v)",
          "  return v",
        ],
        legend: {
          idle: "Waiting",
          active: "Processing",
          success: "Served",
          warn: "Waiting (lock)",
          packet: "Data",
        },
        nodes: {
          r1: { label: "Request 1", sub: "same hot key" },
          r2: { label: "Request 2" },
          r3: { label: "Request 3" },
          cache: { sub: "hot key" },
          db: { sub: "source" },
        },
        edges: {
          "cache-db": { label: "query" },
        },
      },
    },
    build: buildCacheStampede,
  },
};
