import type { CourseModule } from "@/lib/course-types";

export const sdDataModule: CourseModule = {
  id: "sd-data",
  title: "Data at Scale",
  lessons: [
    {
      slug: "sd-sharding",
      title: "Database Sharding",
      module: "Data at Scale",
      summary:
        "Chia dữ liệu thành nhiều shard: chọn shard key, thách thức, và consistent hashing.",
      duration: "9 phút",
      blocks: [
        {
          type: "p",
          text: "Sharding chia dữ liệu thành nhiều phần (shard) đặt trên các máy khác nhau, giúp mở rộng cả dung lượng lẫn khả năng ghi.",
        },
        { type: "h2", text: "Chọn shard key" },
        {
          type: "ul",
          items: [
            "Range: chia theo khoảng — dễ truy vấn theo dải, nhưng dễ lệch tải.",
            "Hash: phân bố đều — tốt cho ghi, nhưng khó range query.",
            "Directory/lookup: bảng tra cứu — linh hoạt, thêm một điểm phụ thuộc.",
          ],
        },
        { type: "h2", text: "Thách thức" },
        {
          type: "ul",
          items: [
            "Cross-shard query và transaction trở nên phức tạp.",
            "Hot shard khi khóa phân bố lệch.",
            "Resharding khi cần cân bằng lại dữ liệu.",
          ],
        },
        { type: "h2", text: "Consistent hashing" },
        {
          type: "p",
          text: "Consistent hashing giảm số lượng key phải di chuyển khi thêm hoặc bớt node, bằng cách ánh xạ cả key lẫn node lên một vòng tròn.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "key → hash → vòng tròn → node gần nhất theo chiều kim đồng hồ",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-replication",
      title: "Replication",
      module: "Data at Scale",
      summary:
        "Sao chép dữ liệu sang nhiều node: leader-follower, đồng bộ vs bất đồng bộ, và failover.",
      duration: "7 phút",
      blocks: [
        {
          type: "p",
          text: "Replication sao chép dữ liệu sang nhiều node nhằm tăng khả năng đọc, đảm bảo chịu lỗi và giảm khoảng cách địa lý tới người dùng.",
        },
        { type: "h2", text: "Mô hình" },
        {
          type: "ul",
          items: [
            "Leader-follower: một node nhận ghi, nhiều node phục vụ đọc.",
            "Multi-leader: nhiều node nhận ghi — cần giải quyết xung đột.",
            "Leaderless: dùng quorum đọc/ghi (như Dynamo, Cassandra).",
          ],
        },
        { type: "h2", text: "Đồng bộ và bất đồng bộ" },
        {
          type: "ul",
          items: [
            "Đồng bộ: an toàn hơn nhưng chậm hơn.",
            "Bất đồng bộ: nhanh hơn nhưng có thể đọc dữ liệu cũ (replication lag).",
          ],
        },
        { type: "h2", text: "Failover" },
        {
          type: "p",
          text: "Khi leader chết cần bầu leader mới; phải tránh split-brain bằng cách dùng lease hoặc hầu hết phiếu (majority quorum).",
        },
      ],
    },
    {
      slug: "sd-cap",
      title: "CAP Theorem",
      module: "Data at Scale",
      summary:
        "Định lý CAP và PACELC: đánh đổi giữa nhất quán, sẵn sàng và độ trễ.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Định lý CAP: khi xảy ra phân vùng mạng, một hệ phân tán chỉ có thể đảm bảo 2 trong 3 tính chất — Consistency (nhất quán), Availability (sẵn sàng), Partition tolerance (chịu phân vùng).",
        },
        { type: "h2", text: "Thực tế" },
        {
          type: "ul",
          items: [
            "P (chịu phân vùng) gần như bắt buộc với hệ phân tán thực tế.",
            "Vì vậy lựa chọn thực sự là giữa C và A: hệ CP ưu tiên nhất quán, hệ AP ưu tiên sẵn sàng.",
          ],
        },
        { type: "h2", text: "PACELC" },
        {
          type: "p",
          text: "PACELC mở rộng CAP: ngay cả khi không có phân vùng (Else), hệ thống vẫn phải chọn giữa Latency (L) và Consistency (C).",
        },
        {
          type: "ul",
          items: [
            "CP: từ chối request để giữ nhất quán (ví dụ HBase).",
            "AP: luôn phản hồi nhưng dữ liệu có thể cũ (ví dụ Cassandra, DynamoDB).",
          ],
        },
      ],
    },
  ],
};
