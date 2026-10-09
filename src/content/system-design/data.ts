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
        {
          type: "diagram",
          nodes: [
            { id: "node-a", label: "Nút A", sub: "vị trí trên vòng", tone: "emerald", x: 330, y: 15, w: 90, h: 50 },
            { id: "node-b", label: "Nút B", sub: "vị trí trên vòng", tone: "emerald", x: 555, y: 120, w: 90, h: 50 },
            { id: "node-c", label: "Nút C", sub: "vị trí trên vòng", tone: "emerald", x: 330, y: 245, w: 90, h: 50 },
            { id: "node-d", label: "Nút D", sub: "vị trí trên vòng", tone: "emerald", x: 105, y: 120, w: 90, h: 50 },
            { id: "key", label: "Key K", sub: "vị trí hash trên vòng", tone: "amber", x: 445, y: 55, w: 96, h: 50 },
          ],
          edges: [
            { id: "ring-a-b", from: "node-a", to: "node-b", label: "chiều kim đồng hồ" },
            { id: "ring-b-c", from: "node-b", to: "node-c" },
            { id: "ring-c-d", from: "node-c", to: "node-d" },
            { id: "ring-d-a", from: "node-d", to: "node-a" },
            { id: "key-node-b", from: "key", to: "node-b", label: "ánh xạ tới node kế tiếp" },
          ],
          caption:
            "Hash của key nằm trên vòng giữa hai node; key được ánh xạ tới node kế tiếp theo chiều kim đồng hồ.",
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
        {
          type: "diagram",
          nodes: [
            { id: "leader", label: "Leader", sub: "nhận thao tác ghi", tone: "emerald", x: 30, y: 130, w: 120, h: 56 },
            { id: "follower-1", label: "Follower 1", sub: "bản sao", tone: "sky", x: 390, y: 40, w: 140, h: 56 },
            { id: "follower-2", label: "Follower 2", sub: "bản sao", tone: "sky", x: 390, y: 220, w: 140, h: 56 },
          ],
          edges: [
            { id: "leader-follower-1", from: "leader", to: "follower-1", label: "sao chép dữ liệu" },
            { id: "leader-follower-2", from: "leader", to: "follower-2", label: "sao chép dữ liệu" },
          ],
          caption:
            "Leader nhận thao tác ghi rồi sao chép dữ liệu sang các follower.",
        },
      ],
    },
  ],
};
