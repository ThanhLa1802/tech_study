import type { CourseModule } from "@/lib/course-types";

export const sdReliabilityModule: CourseModule = {
  id: "sd-reliability",
  title: "Reliability",
  lessons: [
    {
      slug: "sd-message-queues",
      title: "Message Queues",
      module: "Reliability",
      summary:
        "Tách rời producer/consumer, đảm bảo phân phối, và xử lý lỗi với dead-letter queue.",
      duration: "7 phút",
      blocks: [
        {
          type: "p",
          text: "Message queue tách rời (decouple) producer và consumer, đệm lưu lượng đỉnh và cho phép xử lý bất đồng bộ.",
        },
        { type: "h2", text: "Đảm bảo phân phối" },
        {
          type: "ul",
          items: [
            "At-most-once: có thể mất message, không bao giờ gửi trùng.",
            "At-least-once: không mất message, có thể gửi trùng — cần xử lý idempotent.",
            "Exactly-once: khó đạt tuyệt đối, thường mô phỏng bằng idempotency key.",
          ],
        },
        { type: "h2", text: "Thành phần" },
        {
          type: "ul",
          items: [
            "Producer, broker (Kafka/RabbitMQ/SQS), consumer group.",
            "Dead-letter queue (DLQ): nơi nhận message xử lý thất bại nhiều lần.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Producer → [ Queue ] → Consumer(s)\n                       lỗi nhiều lần → DLQ",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-rate-limiting",
      title: "Rate Limiting",
      module: "Reliability",
      summary:
        "Giới hạn số request để bảo vệ hệ thống: fixed/sliding window, token bucket.",
      duration: "6 phút",
      visualizer: "token-bucket",
      blocks: [
        {
          type: "p",
          text: "Rate limiting giới hạn số request trong một khoảng thời gian nhằm bảo vệ hệ thống khỏi lạm dụng và lưu lượng vượt tải.",
        },
        { type: "h2", text: "Thuật toán" },
        {
          type: "ul",
          items: [
            "Fixed window: đếm theo cửa sổ cố định — đơn giản nhưng có hiệu ứng biên.",
            "Sliding window: làm mượt hiệu ứng biên, chính xác hơn.",
            "Token bucket: nạp token đều đặn, cho phép burst có kiểm soát.",
            "Leaky bucket: rò rỉ với tốc độ cố định, làm phẳng lưu lượng.",
          ],
        },
        { type: "h2", text: "Đặt ở đâu" },
        {
          type: "p",
          text: "Thường đặt ở API gateway hoặc tầng edge; khi vượt giới hạn trả về 429 kèm header Retry-After.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "if tokens >= 1: tokens--; allow()\nelse: reject(429, Retry-After)",
            },
          ],
        },
        {
          type: "h3",
          text: "So sánh fixed window và sliding window",
          visualizer: "rate-limit-window",
        },
      ],
    },
  ],
};
