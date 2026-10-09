import type { CourseModule } from "@/lib/course-types";

export const sdCoreConceptsModule: CourseModule = {
  id: "sd-core-concepts",
  title: "Core Concepts",
  lessons: [
    {
      slug: "sd-scalability",
      title: "Scalability",
      module: "Core Concepts",
      summary:
        "Scale ngang và scale dọc, cùng điều kiện để mở rộng hệ thống theo chiều ngang.",
      duration: "7 phút",
      blocks: [
        {
          type: "p",
          text: "Scalability là khả năng xử lý thêm tải bằng cách bổ sung tài nguyên, thay vì phải viết lại hệ thống.",
        },
        { type: "h2", text: "Hai hướng mở rộng" },
        {
          type: "ul",
          items: [
            "Scale dọc (vertical): nâng cấp CPU/RAM của một máy — đơn giản nhưng có giới hạn và tạo điểm chết đơn (SPOF).",
            "Scale ngang (horizontal): thêm nhiều máy chủ — phức tạp hơn nhưng gần như vô hạn, cần cân bằng tải.",
          ],
        },
        { type: "h2", text: "Điều kiện để scale ngang" },
        {
          type: "ul",
          items: [
            "Service phải stateless: đẩy trạng thái ra ngoài (Redis, database).",
            "Cần load balancer phân phối request.",
            "Dữ liệu cần sharding và/hoặc replication.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Client → Load Balancer → [App 1 | App 2 | App 3] → Shared Cache / Database",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-availability",
      title: "Availability",
      module: "Core Concepts",
      summary:
        "Tính sẵn sàng là gì, cách đo bằng “số chín”, và những kỹ thuật giúp hệ thống vẫn phục vụ khi có sự cố.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "Availability (tính sẵn sàng) là khả năng hệ thống vẫn phục vụ được người dùng khi họ cần, kể cả khi một phần hạ tầng gặp sự cố.",
        },
        { type: "h2", text: "Đo lường bằng “số chín”" },
        {
          type: "ul",
          items: [
            "99% (hai chín): downtime khoảng 3,65 ngày mỗi năm.",
            "99,9% (ba chín): khoảng 8,7 giờ mỗi năm.",
            "99,99% (bốn chín): khoảng 52 phút mỗi năm.",
            "99,999% (năm chín): khoảng 5 phút mỗi năm — mọi thành phần đều phải dư thừa.",
          ],
        },
        { type: "h2", text: "Cách đạt được" },
        {
          type: "ul",
          items: [
            "Dư thừa (redundancy): chạy nhiều bản sao để một bản hỏng vẫn còn bản khác.",
            "Failover tự động: health check phát hiện node lỗi và chuyển lưu lượng sang node khỏe.",
            "Loại bỏ điểm chết đơn (SPOF) trên đường đi của request.",
            "Giảm nhẹ (graceful degradation): tắt bớt tính năng phụ để giữ tính năng cốt lõi.",
          ],
        },
        { type: "h2", text: "Đánh đổi" },
        {
          type: "p",
          text: "Dư thừa giúp tăng availability nhưng tốn chi phí và tăng độ phức tạp. Trong hệ phân tán, đảm bảo availability cao thường phải nhượng bộ consistency (xem CAP).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Availability = MTBF / (MTBF + MTTR)\nMTBF: mean time between failures\nMTTR: mean time to recovery",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-reliability",
      title: "Reliability",
      module: "Core Concepts",
      summary:
        "Độ tin cậy là gì, khác gì với availability, và những kỹ thuật giữ dữ liệu luôn đúng và toàn vẹn.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "Reliability (độ tin cậy) là khả năng hệ thống tiếp tục hành xử đúng theo thời gian: không mất dữ liệu, không nhân đôi và không làm hỏng dữ liệu.",
        },
        { type: "h2", text: "Reliability khác Availability thế nào" },
        {
          type: "p",
          text: "Một hệ thống có thể rất sẵn sàng nhưng không đáng tin: nó luôn trả lời, nhưng đôi khi trả lời sai hoặc làm mất dữ liệu. Availability nói về việc có phản hồi; reliability nói về việc phản hồi đúng và dữ liệu toàn vẹn.",
        },
        { type: "h2", text: "Cách đạt được" },
        {
          type: "ul",
          items: [
            "Replication và backup: giữ nhiều bản sao và bản dự phòng để chống mất dữ liệu.",
            "Idempotency: lặp lại thao tác vẫn cho cùng kết quả, nên retry an toàn.",
            "Retry với backoff và jitter để vượt qua lỗi tạm thời.",
            "Kiểm thử lỗi (chaos testing) để phát hiện giả định sai trước khi sự cố thật xảy ra.",
          ],
        },
        { type: "h2", text: "Nền tảng" },
        {
          type: "p",
          text: "Reliability được xây từ replication, consistency và xử lý lỗi đúng. Đó là lý do các khái niệm này xuất hiện xuyên suốt khóa học.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "attempt = 0\nwhile attempt < maxAttempts:\n    try: call()\n    except TransientError:\n        sleep(base * 2 ** attempt + jitter)\n        attempt += 1",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-single-point-of-failure",
      title: "Single Point of Failure (SPOF)",
      module: "Core Concepts",
      summary:
        "Điểm chết đơn là gì, cách phát hiện, và cách loại bỏ bằng dư thừa và failover.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "Điểm chết đơn (Single Point of Failure — SPOF) là một thành phần mà chỉ cần nó hỏng là toàn bộ hệ thống ngừng hoạt động.",
        },
        { type: "h2", text: "Ví dụ điển hình" },
        {
          type: "ul",
          items: [
            "Một load balancer duy nhất đứng trước tất cả server.",
            "Một database chính không có replica.",
            "Một nhà cung cấp DNS hoặc một nhà cung cấp cloud duy nhất.",
            "Một thành phần dùng chung như message broker hay cache tập trung.",
          ],
        },
        { type: "h2", text: "Phát hiện SPOF" },
        {
          type: "p",
          text: "Hãy hỏi: “Nếu thành phần này chết ngay bây giờ, hệ thống còn phục vụ được không?” Đi theo đường đi của một request và tìm những chỗ chỉ tồn tại một bản duy nhất.",
        },
        { type: "h2", text: "Cách loại bỏ" },
        {
          type: "ul",
          items: [
            "Dư thừa: chạy nhiều instance và đặt sau load balancer.",
            "Failover: tự động chuyển sang bản dự phòng khi bản chính lỗi.",
            "Trải theo vùng (multi-AZ/multi-region) để chịu được sự cố của cả một khu vực.",
            "Nếu buộc phải có thành phần dùng chung, hãy thiết kế nó theo hướng phân tán.",
          ],
        },
        {
          type: "diagram",
          caption:
            "Load balancer chỉ có một bản là điểm chết đơn: nó hỏng thì mọi request đều thất bại dù các server vẫn khỏe.",
          nodes: [
            { id: "client", label: "Client", tone: "sky", x: 20, y: 120, w: 110, h: 54 },
            {
              id: "lb",
              label: "Load Balancer",
              sub: "một bản duy nhất",
              tone: "rose",
              x: 190,
              y: 120,
              w: 150,
              h: 56,
            },
            { id: "server-1", label: "Server 1", tone: "emerald", x: 400, y: 30, w: 120, h: 54 },
            { id: "server-2", label: "Server 2", tone: "emerald", x: 400, y: 120, w: 120, h: 54 },
            { id: "server-3", label: "Server 3", tone: "emerald", x: 400, y: 210, w: 120, h: 54 },
          ],
          edges: [
            { id: "client-lb", from: "client", to: "lb", label: "request" },
            { id: "lb-server-1", from: "lb", to: "server-1" },
            { id: "lb-server-2", from: "lb", to: "server-2" },
            { id: "lb-server-3", from: "lb", to: "server-3" },
          ],
        },
      ],
    },
    {
      slug: "sd-latency-throughput",
      title: "Latency vs Throughput vs Bandwidth",
      module: "Core Concepts",
      summary:
        "Phân biệt độ trễ, thông lượng và băng thông, vai trò của phân vị p99, và cách cải thiện từng chỉ số.",
      duration: "7 phút",
      blocks: [
        {
          type: "p",
          text: "Latency là thời gian xử lý một request; throughput là số request xử lý được mỗi giây; bandwidth là lượng dữ liệu truyền được mỗi giây. Đây là ba chỉ số độc lập mô tả ba khía cạnh khác nhau của hiệu năng.",
        },
        { type: "h2", text: "Ba chỉ số" },
        {
          type: "ul",
          items: [
            "Latency (độ trễ): một request mất bao lâu, thường đo bằng p50/p95/p99.",
            "Throughput (thông lượng): bao nhiêu request mỗi giây (RPS/QPS).",
            "Bandwidth (băng thông): bao nhiêu bit mỗi giây trên đường truyền (Mbps/Gbps).",
          ],
        },
        {
          type: "p",
          text: "Chúng độc lập nhau: một đường truyền băng thông lớn vẫn có thể có latency cao, và throughput có thể tăng mà latency không đổi.",
        },
        { type: "h2", text: "Phân vị (percentile)" },
        {
          type: "ul",
          items: [
            "p50: trung vị — một nửa số request nhanh hơn mức này.",
            "p99: 1% request chậm nhất — thường là nơi lộ vấn đề.",
            "Tối ưu p99 thường mang lại trải nghiệm tốt hơn là tối ưu giá trị trung bình.",
          ],
        },
        { type: "h2", text: "Cách cải thiện" },
        {
          type: "ul",
          items: [
            "Caching và CDN để giảm latency.",
            "Batch và pipeline để tăng throughput.",
            "Nén dữ liệu và dùng giao thức nhẹ để tiết kiệm bandwidth.",
            "Xử lý bất đồng bộ qua message queue để làm phẳng đỉnh tải.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Định luật Little: L (request trong hệ thống) = λ (throughput) × W (latency)",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-consistent-hashing",
      title: "Consistent Hashing",
      module: "Core Concepts",
      summary:
        "Phân phối key lên các node bằng vòng băm, giảm số key phải di chuyển khi thêm hoặc bớt node.",
      duration: "7 phút",
      blocks: [
        {
          type: "p",
          text: "Consistent hashing là kỹ thuật phân phối key lên các node sao cho khi thêm hoặc bớt một node, chỉ một phần nhỏ key phải di chuyển.",
        },
        { type: "h2", text: "Vì sao cần" },
        {
          type: "p",
          text: "Với băm thông thường (hash mod N), chỉ cần đổi số node N là gần như toàn bộ key đổi chỗ, khiến cache đồng loạt miss. Consistent hashing tránh cú sốc đó.",
        },
        { type: "h2", text: "Cách hoạt động" },
        {
          type: "ul",
          items: [
            "Ánh xạ cả key lẫn node lên một vòng băm (hash ring).",
            "Mỗi key thuộc về node gần nhất theo chiều kim đồng hồ.",
            "Thêm hoặc bớt node chỉ ảnh hưởng các key nằm giữa node đó và node liền trước.",
            "Virtual node (vnode) giúp phân bố đều hơn khi số node ít.",
          ],
        },
        { type: "h2", text: "Ứng dụng" },
        {
          type: "p",
          text: "DynamoDB, Cassandra và nhiều hệ cache phân tán dùng consistent hashing để phân vùng dữ liệu và cân bằng tải.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "key → hash(key) → vị trí trên vòng → node kế tiếp theo chiều kim đồng hồ",
            },
          ],
        },
        {
          type: "diagram",
          caption:
            "Hash của key nằm trên vòng giữa hai node; key thuộc về node kế tiếp theo chiều kim đồng hồ.",
          nodes: [
            { id: "node-a", label: "Node A", tone: "emerald", x: 330, y: 15, w: 90, h: 50 },
            { id: "node-b", label: "Node B", tone: "emerald", x: 555, y: 120, w: 90, h: 50 },
            { id: "node-c", label: "Node C", tone: "emerald", x: 330, y: 245, w: 90, h: 50 },
            { id: "node-d", label: "Node D", tone: "emerald", x: 105, y: 120, w: 90, h: 50 },
            { id: "key", label: "Key K", tone: "amber", x: 445, y: 55, w: 96, h: 50 },
          ],
          edges: [
            {
              id: "ring-a-b",
              from: "node-a",
              to: "node-b",
              label: "chiều kim đồng hồ",
            },
            { id: "ring-b-c", from: "node-b", to: "node-c" },
            { id: "ring-c-d", from: "node-c", to: "node-d" },
            { id: "ring-d-a", from: "node-d", to: "node-a" },
            {
              id: "key-node-b",
              from: "key",
              to: "node-b",
              label: "ánh xạ tới node kế tiếp",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-cap",
      title: "CAP Theorem",
      module: "Core Concepts",
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
        {
          type: "diagram",
          nodes: [
            { id: "consistency", label: "Consistency", sub: "nhất quán", tone: "emerald", x: 250, y: 15, w: 160, h: 56 },
            { id: "availability", label: "Availability", sub: "sẵn sàng", tone: "sky", x: 35, y: 205, w: 160, h: 56 },
            { id: "partition", label: "Partition Tolerance", sub: "chịu phân vùng mạng", tone: "violet", x: 465, y: 205, w: 190, h: 56 },
          ],
          edges: [
            { id: "consistency-availability", from: "consistency", to: "availability", label: "khi P: không thể đảm bảo cả hai", dashed: true },
            { id: "consistency-partition", from: "consistency", to: "partition", label: "CP: ưu tiên C" },
            { id: "partition-availability", from: "partition", to: "availability", label: "AP: ưu tiên A" },
          ],
          caption:
            "Khi có phân vùng mạng (P), hệ thống không thể đồng thời đảm bảo cả Consistency (C) lẫn Availability (A).",
        },
      ],
    },
  ],
};
