import type {
  SequenceBand,
  SequenceFrame,
  SequenceMessage,
  SequenceOverrides,
  SequenceParticipant,
  SequenceSpec,
} from "@/lib/sequence";
import type { SequenceVisualizer } from "@/lib/course";
import type { Locale } from "@/lib/locale";

const participants: SequenceParticipant[] = [
  { id: "client", label: "Client", icon: "window", tone: "sky" },
  { id: "gateway", label: "API Gateway", icon: "shield", tone: "violet" },
  { id: "service", label: "Service", icon: "server", tone: "emerald" },
  { id: "db", label: "Database", icon: "database", tone: "amber" },
];

const messages: SequenceMessage[] = [
  {
    id: "m1",
    from: "client",
    to: "gateway",
    label: "1. GET /users/42 · Authorization: Bearer …",
  },
  { id: "m2", from: "gateway", to: "service", label: "2. định tuyến (đã xác thực)" },
  { id: "m3", from: "service", to: "db", label: "3. SELECT user WHERE id = 42" },
  { id: "m4", from: "db", to: "service", label: "4. trả bản ghi user" },
  { id: "m5", from: "service", to: "gateway", label: "5. 200 OK + JSON", dashed: true },
  { id: "m6", from: "gateway", to: "client", label: "6. 200 OK + JSON", dashed: true },
];

const bands: SequenceBand[] = [
  { label: "Xác thực & định tuyến", beforeIndex: 0 },
  { label: "Truy vấn dữ liệu", beforeIndex: 2 },
  { label: "Trả kết quả", beforeIndex: 4 },
];

const enOverrides: SequenceOverrides = {
  title: "REST request flow — simulation",
  messages: {
    m2: "2. route (already authenticated)",
    m4: "4. return the user row",
  },
  bands: {
    0: "Auth & routing",
    1: "Query the data",
    2: "Return the result",
  },
};

function buildRestFlow(locale: Locale = "vi"): SequenceFrame[] {
  const en = locale === "en";
  const frames: SequenceFrame[] = [
    {
      step: 0,
      note: en
        ? "Ready. Press Play to send the request."
        : "Sẵn sàng. Nhấn Chạy để gửi request.",
    },
  ];
  messages.forEach((message, index) => {
    const label = en
      ? enOverrides.messages?.[message.id] ?? message.label
      : message.label;
    frames.push({ step: index + 1, activeId: message.id, note: label });
  });
  return frames;
}

export const sequenceVisualizers: Record<SequenceVisualizer, SequenceSpec> = {
  "rest-request-flow": {
    title: "Luồng một request REST — mô phỏng",
    participants,
    messages,
    bands,
    overrides: { en: enOverrides },
    build: buildRestFlow,
  },
};
