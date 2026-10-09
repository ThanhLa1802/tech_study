import type { CourseModule } from "@/lib/course-types";

export const sdBuildingBlocksModule: CourseModule = {
  id: "sd-building-blocks",
  title: "Building Blocks",
  lessons: [
    {
      slug: "sd-load-balancing",
      title: "Load Balancing",
      module: "Building Blocks",
      summary:
        "Phân phối request tới nhiều server: thuật toán, health check, và L4 so với L7.",
      duration: "8 phút",
      visualizer: "load-balancer-round-robin",
      blocks: [
        {
          type: "p",
          text: "Load balancer phân phối request tới nhiều server để tận dụng tài nguyên, tăng thông lượng và chịu lỗi khi một node gặp sự cố.",
        },
        { type: "h2", text: "Thuật toán phổ biến" },
        {
          type: "ul",
          items: [
            "Round Robin: lần lượt xoay vòng qua từng server.",
            "Least Connections: chọn server đang có ít kết nối nhất.",
            "IP Hash: cùng client luôn về cùng server (giữ session).",
            "Weighted: server mạnh nhận nhiều request hơn.",
          ],
        },
        { type: "h2", text: "Health check" },
        {
          type: "p",
          text: "LB định kỳ gọi endpoint /health; server chết bị loại khỏi pool. Nên kết hợp cả active check (chủ động) lẫn passive check (dựa trên lỗi thực tế).",
        },
        { type: "h2", text: "Layer 4 so với Layer 7" },
        {
          type: "ul",
          items: [
            "L4: định tuyến theo IP/TCP — nhanh, nhưng không hiểu nội dung HTTP.",
            "L7: định tuyến theo URL/header/cookie — linh hoạt hơn, tốn tài nguyên hơn.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Client → [Load Balancer] → pool [ s1 (healthy) | s2 (healthy) | s3 (down, bị loại) ]",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-caching",
      title: "Caching",
      module: "Building Blocks",
      summary:
        "Chiến lược cache, nhất quán dữ liệu, cache stampede và các thuật toán loại bỏ.",
      duration: "9 phút",
      blocks: [
        {
          type: "p",
          text: "Cache lưu dữ liệu hay được truy cập ở nơi nhanh (RAM) để tránh tính lại hoặc truy vấn database, giúp giảm cả latency lẫn tải cho tầng dưới.",
        },
        { type: "h2", text: "Chiến lược" },
        {
          type: "ul",
          items: [
            "Cache-aside (lazy): đọc cache trước, nếu miss thì đọc DB rồi ghi lại vào cache.",
            "Write-through: ghi cả cache lẫn DB cùng lúc — nhất quán hơn, chậm hơn.",
            "Write-behind: ghi cache trước, DB sau — nhanh nhưng có rủi ro mất dữ liệu.",
          ],
        },
        { type: "h2", text: "Nhất quán và invalidation" },
        {
          type: "ul",
          items: [
            "TTL: hết hạn thì tự động nạp lại từ nguồn.",
            "Invalidation: xóa hoặc ghi đè cache khi dữ liệu nguồn thay đổi.",
            "Cache stampede: nhiều request cùng miss — dùng lock hoặc early refresh để tránh.",
          ],
        },
        { type: "h2", text: "Thuật toán loại bỏ" },
        {
          type: "ul",
          items: [
            "LRU (ít được dùng gần đây nhất), LFU (ít được dùng nhất), FIFO.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "App → Cache? hit → trả về\n                miss → DB → ghi cache → trả về",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-cdn",
      title: "CDN",
      module: "Building Blocks",
      summary:
        "Mạng phân phối nội dung: cache ở biên, giảm latency và bảo vệ origin.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "CDN (Content Delivery Network) là mạng lưới server đặt gần người dùng, phục vụ nội dung tĩnh và có thể đệm cả nội dung động.",
        },
        { type: "h2", text: "Lợi ích" },
        {
          type: "ul",
          items: [
            "Giảm latency nhờ phục vụ từ điểm gần người dùng nhất.",
            "Giảm tải cho origin server.",
            "Hấp thụ lưu lượng tăng đột biến và chặn DDoS cơ bản.",
          ],
        },
        { type: "h2", text: "Cache ở biên" },
        {
          type: "ul",
          items: [
            "Kiểm soát bằng TTL và purge khi nội dung đổi.",
            "Version hóa theo query string (ví dụ ?v=2) để tránh phục vụ bản cũ.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "User → Edge (gần nhất) → [hit] trả về\n                          [miss] → Origin → cache lại",
            },
          ],
        },
      ],
    },
  ],
};
