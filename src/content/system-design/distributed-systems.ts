import type { CourseModule } from "@/lib/course-types";

export const sdDistributedSystemsModule: CourseModule = {
  id: "sd-distributed-systems",
  title: "Distributed Systems",
  lessons: [
    {
      slug: "sd-consistency-models",
      title: "Consistency Models",
      module: "Distributed Systems",
      summary:
        "Từ linearizable (mạnh) tới eventual (đọc dữ liệu cũ): mỗi model hứa điều gì, và chọn theo yêu cầu nghiệp vụ.",
      duration: "9 phút",
      blocks: [
        {
          type: "p",
          text: "Consistency model là một hợp đồng về những gì client được phép thấy khi đọc và ghi trên dữ liệu đã được sao chép (replicated). Nó trả lời câu hỏi cụ thể hơn CAP: một thao tác đọc có thể trả về giá trị nào, và theo thứ tự nào?",
        },
        { type: "h2", text: "Nối tiếp CAP và PACELC" },
        {
          type: "ul",
          items: [
            "CAP (xem bài sd-cap) chỉ ràng buộc hành vi khi có phân vùng mạng: hệ CP từ chối để giữ nhất quán, hệ AP vẫn trả lời nhưng dữ liệu có thể cũ.",
            "PACELC bổ sung: ngay cả khi không phân vùng (Else), hệ thống vẫn phải chọn giữa Latency và Consistency.",
            "Consistency model đi sâu hơn: nó định nghĩa chính xác tập lịch sử (history) mà hệ thống được phép tạo ra — client thấy gì và theo thứ tự nào.",
          ],
        },
        { type: "h2", text: "Linearizable — nhất quán mạnh" },
        {
          type: "p",
          text: "Linearizability là một trong những model mạnh nhất cho một đối tượng đơn (single object). Mỗi thao tác trông như được thực thi tức thời (atomically) tại một điểm nằm giữa lúc gọi và lúc trả về, và thứ tự đó tôn trọng thời gian thực: nếu thao tác A hoàn tất trước khi B bắt đầu, thì B phải thấy kết quả sau A.",
        },
        {
          type: "ul",
          items: [
            "Hệ quả: đọc luôn thấy giá trị ghi mới nhất đã hoàn tất — không có stale read.",
            "Cái giá: hệ thống phải phối hợp giữa các node (consensus hoặc quorum đọc/ghi), nên latency cao hơn và kém sẵn sàng hơn khi phân vùng (CP theo CAP).",
            "Phạm vi “object” tùy hệ thống: linearizable cho từng key không có nghĩa linearizable trên nhiều key. Cần nhiều đối tượng thì nghĩ tới strict serializability.",
          ],
        },
        { type: "h2", text: "Eventual consistency — nhất quán cuối cùng" },
        {
          type: "p",
          text: "Eventual consistency chỉ hứa một điều: nếu ngừng ghi, thì sau một khoảng thời gian (không xác định), mọi replica sẽ hội tụ về cùng giá trị mới nhất. Trong lúc chưa hội tụ, các bản sao có thể trả về giá trị cũ.",
        },
        {
          type: "ul",
          items: [
            "Không quy định “bao lâu” và không đảm bảo thứ tự: client có thể đọc bản mới rồi đọc lại bản cũ (dữ liệu “lùi thời gian”).",
            "Rất sẵn sàng và chịu phân vùng tốt, latency thấp — phù hợp feed, catalog, đếm lượt xem.",
            "Không phù hợp số dư tài khoản, tồn kho hay kiểm tra trùng — nơi đọc cũ gây sai nghiệp vụ.",
          ],
        },
        { type: "h2", text: "Các model trung gian hữu dụng" },
        {
          type: "ul",
          items: [
            "Causal consistency: giữ thứ tự nhân quả — ai thấy nguyên nhân thì thấy cả kết quả; các ghi đồng thời có thể khác thứ tự.",
            "Read-your-writes: người dùng luôn đọc lại được thay đổi của chính mình.",
            "Monotonic reads: một client không bao giờ thấy dữ liệu lùi thời gian.",
          ],
        },
        { type: "h2", text: "Đọc dữ liệu cũ (stale reads)" },
        {
          type: "p",
          text: "Ví dụ: bạn đổi ảnh đại diện, F5 lại vẫn thấy ảnh cũ. Ghi đã tới leader, nhưng request đọc tiếp theo rơi vào follower đang tụt lại (replication lag). Đây là stale read điển hình của hệ AP.",
        },
        {
          type: "ul",
          items: [
            "Chữa theo nhu cầu: read-your-writes (đưa user vừa ghi về leader, hoặc yêu cầu version tối thiểu); monotonic reads (ghim mỗi user vào một replica); chờ replica bắt kịp; hoặc dùng quorum đọc mạnh hơn.",
            "Bounded staleness: hứa dữ liệu cũ không quá một ngưỡng theo thời gian (vài giây) hoặc theo version — một điểm cân bằng phổ biến.",
          ],
        },
        { type: "h2", text: "Chọn model nào?" },
        {
          type: "p",
          text: "Câu hỏi then chốt không phải “model nào mạnh nhất” mà là “client chịu được sai lệch nào”. Đọc cũ vài giây có sao không? Sai một lần có mất tiền không? Nếu không, eventual hoặc bounded staleness đổi lại latency thấp và availability cao. Nếu có, cần linearizable hoặc giao dịch ở tầng trên.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Linearizable:  write(x = 1) → read() == 1        (luôn thấy ghi mới nhất)\nEventual:      write(x = 1) → read() có thể == 0  (giá trị cũ), sau đó mới == 1",
            },
          ],
        },
        {
          type: "diagram",
          nodes: [
            {
              id: "strong",
              label: "Strict serializable / Linearizable",
              sub: "mạnh nhất · cần phối hợp",
              tone: "emerald",
              x: 190,
              y: 15,
              w: 320,
              h: 56,
            },
            {
              id: "middle",
              label: "Causal / Read-your-writes",
              sub: "giữ nhân quả · vẫn có thể cũ",
              tone: "sky",
              x: 190,
              y: 130,
              w: 320,
              h: 56,
            },
            {
              id: "eventual",
              label: "Eventual",
              sub: "hội tụ · có thể đọc dữ liệu cũ",
              tone: "amber",
              x: 190,
              y: 245,
              w: 320,
              h: 56,
            },
          ],
          edges: [
            {
              id: "strong-middle",
              from: "strong",
              to: "middle",
              label: "yếu hơn → sẵn sàng hơn",
            },
            {
              id: "middle-eventual",
              from: "middle",
              to: "eventual",
              label: "yếu hơn → sẵn sàng hơn",
            },
          ],
          caption:
            "Model càng mạnh (trên) càng cần phối hợp: latency cao và kém sẵn sàng khi phân vùng. Càng xuống dưới càng sẵn sàng nhưng client có thể đọc dữ liệu cũ.",
        },
      ],
    },
    {
      slug: "sd-timeouts-retries-idempotency",
      title: "Timeouts, Retries & Idempotency",
      module: "Distributed Systems",
      summary:
        "Đặt timeout, retry với exponential backoff + jitter, và idempotency để retry an toàn — không hứa exactly-once.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Một lời gọi qua mạng có thể thất bại tạm thời (timeout, mất gói, service quá tải). Ba công cụ nền tảng để chịu được loại lỗi này là timeout, retry với backoff + jitter, và idempotency. Điểm mấu chốt: retry không tạo ra bảo đảm exactly-once — nó chỉ an toàn khi thao tác là idempotent.",
        },
        { type: "h2", text: "Timeout: fail fast thay vì chờ vô hạn" },
        {
          type: "p",
          text: "Không đặt timeout, một dependency treo sẽ giữ thread/connection cho tới khi cạn tài nguyên — đó là một kiểu resource exhaustion dẫn tới cascading failure. Ngược lại, timeout quá ngắn lại cắt cả những request bình thường.",
        },
        {
          type: "ul",
          items: [
            "Đặt timeout cho mọi lời gọi mạng; chọn đủ dài cho phần lớn request thành công nhưng đủ ngắn để không giữ tài nguyên.",
            "Deadline propagation: đặt hạn chót ở tầng cao (frontend) rồi truyền xuống, mỗi tầng trừ đi thời gian đã dùng. Server nên kiểm tra hạn chót trước mỗi bước để không làm việc client đã bỏ.",
            "Khi client hủy (cancellation), hủy công việc ở các tầng dưới để giải phóng tài nguyên.",
          ],
        },
        { type: "h2", text: "Retry và cái bẫy retry storm" },
        {
          type: "p",
          text: "Retry giúp vượt lỗi ngẫu nhiên, tạm thời. Nhưng nếu lỗi là do quá tải, mỗi lần retry lại tăng tải — hệ thống càng lỗi càng bị retry nhiều, tạo vòng phản hồi dương (retry storm / error amplification).",
        },
        {
          type: "ul",
          items: [
            "Chỉ retry lỗi tạm thời (transient): timeout, 429, 503. Không retry lỗi vĩnh viễn như 400, 401, 422 — chúng sẽ không bao giờ thành công.",
            "Giới hạn số lần retry và tổng thời gian; đặt retry budget (ví dụ tối đa X retry mỗi phút cho toàn process).",
            "Tránh retry lồng ở nhiều tầng: số nỗ lực nhân lên theo cấp số (xem sơ đồ). Tôn trọng header Retry-After khi bị chặn.",
          ],
        },
        { type: "h2", text: "Exponential backoff + jitter" },
        {
          type: "p",
          text: "Thay vì retry ngay, client chờ lâu dần sau mỗi lần thất bại — exponential backoff — và giới hạn ở một mức tối đa (capped). Vấn đề: nếu mọi client backoff theo cùng công thức, chúng sẽ thử lại đúng cùng lúc và lại dồn tải. Thêm yếu tố ngẫu nhiên (jitter) phá sự đồng bộ đó.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "python",
              code: "import random\n\ndef delay(attempt: int, base: float = 0.1, cap: float = 10.0) -> float:\n    # Full jitter: ngẫu nhiên trong [0, backoff]\n    backoff = min(cap, base * (2 ** attempt))\n    return random.uniform(0, backoff)",
            },
          ],
        },
        {
          type: "ul",
          items: [
            "Full jitter: sleep = random(0, min(cap, base × 2^attempt)) — giảm tải nền nhiều nhất.",
            "Equal jitter: giữ một nửa backoff cố định rồi cộng ngẫu nhiên — tránh sleep quá ngắn.",
            "Decorrelated jitter: mở rộng dần khoảng ngẫu nhiên theo lần trước — phân tán tốt hơn nữa.",
            "Các cách này không đổi bản chất số việc phải làm, nhưng giảm mạnh tải dồn và thời gian hoàn tất.",
          ],
        },
        { type: "h2", text: "Idempotency: retry an toàn" },
        {
          type: "p",
          text: "Một thao tác là idempotent nếu gửi lại nhiều lần vẫn cho kết quả/tác dụng giống như gửi một lần. Đây là điều kiện để retry không gây tác dụng phụ trùng lặp — ví dụ tạo hai đơn hàng, trừ tiền hai lần.",
        },
        {
          type: "ul",
          items: [
            "Với HTTP, GET/PUT/DELETE được định nghĩa là idempotent, còn POST thì không (RFC 9110). Đừng tự động retry POST nếu chưa xử lý idempotency.",
            "Idempotency key: client sinh một khóa duy nhất (UUID) cho mỗi thao tác; server lưu key → kết quả và trả lại kết quả tương đương cho các lần gửi lặp.",
            "Việc lưu key và thay đổi dữ liệu phải nguyên tử (atomic) để không xảy ra cảnh lưu key mà quên tạo resource hoặc ngược lại.",
            "Cần vòng đời cho key (thường gắn với vòng đời resource). Cùng key nhưng khác tham số nên trả lỗi validation để tránh gộp nhầm hai ý định khác nhau.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "POST /orders              # tạo đơn — KHÔNG idempotent\nIdempotency-Key: 7f3c...  # client sinh\n\nserver:\n  if seen(key): return stored_response   # lần gửi lặp\n  result = create_order(...)             # trong 1 transaction\n  store(key, result)\n  return result",
            },
          ],
        },
        { type: "h2", text: "Ranh giới cần nhớ: đừng hứa exactly-once" },
        {
          type: "ul",
          items: [
            "Khi timeout, bạn không biết thao tác đã xảy ra hay chưa: request có thể đã tới server và xử lý xong, chỉ response bị thất lạc. Vì vậy timeout không đồng nghĩa với thất bại.",
            "Retry cho ra at-least-once: ít nhất một lần. Kết hợp với thao tác idempotent, tác dụng phụ phía server đạt mức “effectively once” / “at most once” — chỉ một đơn hàng được tạo.",
            "Exactly-once thật sự rất khó đạt tuyệt đối trong hệ phân tán; thực tế người ta mô phỏng nó bằng idempotency, không phải bằng retry.",
          ],
        },
        {
          type: "diagram",
          nodes: [
            {
              id: "client",
              label: "Client",
              sub: "1 yêu cầu",
              tone: "sky",
              x: 20,
              y: 115,
              w: 120,
              h: 56,
            },
            {
              id: "frontend",
              label: "Frontend",
              sub: "retry ×3",
              tone: "emerald",
              x: 210,
              y: 115,
              w: 130,
              h: 56,
            },
            {
              id: "backend",
              label: "Backend",
              sub: "retry ×3",
              tone: "emerald",
              x: 410,
              y: 115,
              w: 130,
              h: 56,
            },
            {
              id: "database",
              label: "Database",
              sub: "tới ~27 nỗ lực",
              tone: "amber",
              x: 610,
              y: 115,
              w: 130,
              h: 56,
            },
          ],
          edges: [
            { id: "client-frontend", from: "client", to: "frontend", label: "1 yêu cầu" },
            { id: "frontend-backend", from: "frontend", to: "backend", label: "×3 nỗ lực" },
            { id: "backend-database", from: "backend", to: "database", label: "×3 mỗi lỗi" },
          ],
          caption:
            "Retry lồng ở nhiều tầng nhân số nỗ lực lên (3 × 3 × 3 ≈ 27). Khi lỗi do quá tải, chính retry biến một cố nhỏ thành sập toàn hệ.",
        },
      ],
    },
    {
      slug: "sd-failure-detection",
      title: "Failure Detection & Health Checks",
      module: "Distributed Systems",
      summary:
        "Phát hiện node lỗi trong hệ phân tán: heartbeat, ngưỡng timeout, liveness/readiness và các cạm bẫy false positive.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Trước khi có thể chuyển lưu lượng khỏi một node lỗi, hệ thống phải phát hiện node đó lỗi. Nhưng trong mạng bất đồng bộ (asynchronous), ta không phân biệt được chắc chắn giữa “node đã chết” và “node/mạng chỉ đang chậm”.",
        },
        { type: "h2", text: "Vì sao phát hiện lỗi khó" },
        {
          type: "p",
          text: "Không có giới hạn thời gian cho việc gửi message, nên mọi phán đoán dựa trên timeout đều có thể sai theo hai hướng: false positive (báo chết nhầm node còn sống) và false negative (bỏ sót node đã chết).",
        },
        {
          type: "ul",
          items: [
            "False positive nguy hiểm: node khỏe bị gỡ khỏi pool, tải dồn sang node còn lại, có thể khởi động cascading failure.",
            "Vì vậy đừng tin một lần timeout đơn lẻ: cần nhiều lần lỗi liên tiếp, một khoảng thời gian, và ngưỡng.",
          ],
        },
        { type: "h2", text: "Cơ chế phổ biến" },
        {
          type: "ul",
          items: [
            "Heartbeat: node gửi tín hiệu định kỳ; thiếu tín hiệu quá ngưỡng thì coi là nghi ngờ lỗi (pull hoặc push).",
            "Ngưỡng nhiều lần lỗi (consecutive failures) kèm cửa sổ thời gian để tránh rung (flapping) khi mạng chập chờn.",
            "Phi-accrual failure detector: thay vì trả true/false, trả về mức độ nghi ngờ (suspicion level) trên thang liên tục, tự điều chỉnh theo điều kiện mạng — dùng trong các hệ như Cassandra, Akka.",
            "Gossip: lan truyền thông tin node sống/chết cho toàn cluster mà không cần một điểm trung tâm.",
          ],
        },
        { type: "h2", text: "Health check: liveness vs readiness" },
        {
          type: "ul",
          items: [
            "Liveness: tiến trình còn phản hồi không? Fail → restart tiến trình.",
            "Readiness: instance đã sẵn sàng phục vụ chưa (khởi tạo xong, dependency thiết yếu ổn)? Fail → gỡ khỏi load balancer nhưng không restart.",
            "Tách hai tín hiệu là quan trọng: một dependency dùng chung hỏng không nên khiến mọi instance bị restart.",
          ],
        },
        { type: "h2", text: "Shallow vs deep check" },
        {
          type: "ul",
          items: [
            "Shallow check: chỉ xác nhận tiến trình trả lời, không chạm dependency — rẻ, hợp cho liveness.",
            "Deep check: kiểm tra cả dependency thiết yếu (DB, cache) — hợp cho readiness.",
            "Cảnh báo: deep check gọi dependency qua mạng mỗi lần probe có thể tạo false positive và biến chính cơ chế giám sát thành nguyên nhân sập. Hãy bound timeout cho từng dependency, dùng circuit breaker cho dependency chập chờn, và trả “degraded” thay vì “unhealthy” cho dependency phụ.",
          ],
        },
        { type: "h2", text: "Nguyên tắc thực hành" },
        {
          type: "ul",
          items: [
            "Probe nên rẻ, read-only, không thay đổi dữ liệu production; tách endpoint cho liveness và readiness.",
            "Cảnh báo theo SLO và đường đi quan trọng, không theo từng probe đơn lẻ.",
            "Khi một dependency dùng chung chết, đừng để load balancer gỡ hết instance — lúc đó cần degradation ở tầng ứng dụng (xem bài sau).",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "GET /healthz/live  → 200 nếu process chạy (không chạm dependency)\nGET /healthz/ready → 200 nếu DB + cache OK, ngược lại 503",
            },
          ],
        },
        {
          type: "diagram",
          nodes: [
            {
              id: "live",
              label: "Liveness probe",
              sub: "phát hiện treo",
              tone: "violet",
              x: 20,
              y: 40,
              w: 160,
              h: 54,
            },
            {
              id: "ready",
              label: "Readiness probe",
              sub: "sẵn sàng nhận tải",
              tone: "violet",
              x: 20,
              y: 190,
              w: 160,
              h: 54,
            },
            {
              id: "app",
              label: "App instance",
              tone: "emerald",
              x: 280,
              y: 115,
              w: 150,
              h: 56,
            },
            {
              id: "db",
              label: "Database",
              sub: "dependency thiết yếu",
              tone: "amber",
              x: 520,
              y: 115,
              w: 150,
              h: 56,
            },
          ],
          edges: [
            { id: "live-app", from: "live", to: "app", label: "chỉ tiến trình" },
            { id: "ready-app", from: "ready", to: "app", label: "kiểm tra dependency" },
            { id: "app-db", from: "app", to: "db", label: "readiness gọi DB" },
          ],
          caption:
            "Liveness chỉ kiểm tra tiến trình app; readiness còn kiểm tra dependency thiết yếu. Đừng để một deep check phụ thuộc dependency chập chờn gỡ bỏ những instance đang khỏe.",
        },
      ],
    },
    {
      slug: "sd-cascading-failures",
      title: "Circuit Breaker, Bulkhead & Graceful Degradation",
      module: "Distributed Systems",
      summary:
        "Ngăn lỗi lan rộng: circuit breaker, bulkhead, load shedding và graceful degradation/fallback.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Cascading failure là lỗi lan rộng do phản hồi dương: một thành phần hỏng làm thành phần khác quá tải rồi hỏng theo. Nguyên nhân phổ biến nhất là quá tải (overload), thường bị đẩy nhanh bởi retry. Ba kỹ thuật để chặn vòng xoáy này là circuit breaker, bulkhead và graceful degradation.",
        },
        { type: "h2", text: "Circuit breaker" },
        {
          type: "p",
          text: "Circuit breaker là một proxy đứng trước một dependency hay lỗi. Nó đếm số lỗi gần đây; khi vượt ngưỡng, mạch “ngắt” và các request bị trả lỗi ngay (fail fast) thay vì chờ timeout và giữ tài nguyên.",
        },
        {
          type: "ul",
          items: [
            "Closed: cho request đi qua, đếm lỗi. Vượt ngưỡng → Open.",
            "Open: fail ngay, có cooldown để dependency kịp hồi. Hết cooldown → Half-Open.",
            "Half-Open: cho một số ít request thử. Thành công → Closed; thất bại → Open lại.",
            "Circuit breaker khác retry: retry kỳ vọng sẽ thành công, breaker ngăn gọi thứ gần như chắc thất bại. Khi ghép cả hai, retry phải dừng nếu breaker báo lỗi không phải tạm thời; cần observability và khả năng reset thủ công.",
            "Cẩn thận khi dùng chung breaker cho nhiều shard/tenant độc lập: một shard lỗi có thể làm ngắt cả những shard đang khỏe.",
          ],
        },
        {
          type: "diagram",
          nodes: [
            {
              id: "closed",
              label: "Closed",
              sub: "cho qua · đếm lỗi",
              tone: "emerald",
              x: 40,
              y: 30,
              w: 150,
              h: 56,
            },
            {
              id: "open",
              label: "Open",
              sub: "fail fast · cooldown",
              tone: "rose",
              x: 330,
              y: 30,
              w: 150,
              h: 56,
            },
            {
              id: "half-open",
              label: "Half-Open",
              sub: "thử một ít request",
              tone: "amber",
              x: 185,
              y: 175,
              w: 150,
              h: 56,
            },
          ],
          edges: [
            { id: "closed-open", from: "closed", to: "open", label: "vượt ngưỡng lỗi" },
            { id: "open-half", from: "open", to: "half-open", label: "hết cooldown" },
            { id: "half-closed", from: "half-open", to: "closed", label: "thử thành công" },
            { id: "half-open-again", from: "half-open", to: "open", label: "thử thất bại" },
          ],
          caption:
            "Circuit breaker là một máy trạng thái: đếm lỗi ở Closed, ngắt ở Open, và chỉ thử lại dè dặt ở Half-Open trước khi đóng lại.",
        },
        { type: "h2", text: "Bulkhead" },
        {
          type: "p",
          text: "Bulkhead chia tài nguyên thành các khoang độc lập (thread pool, connection pool, queue, instance) để một khoang bị “ngập” không làm chìm cả hệ thống — lấy cảm hứng từ vách ngăn của tàu.",
        },
        {
          type: "ul",
          items: [
            "Consumer bulkhead: mỗi dependency một connection/thread pool riêng, để một service treo không đốt hết pool dùng cho service khác.",
            "Service bulkhead: mỗi tenant/nhóm người dùng chạy trên instance/queue riêng (cell-based architecture) để cô lập phạm vi ảnh hưởng.",
            "Đánh đổi: cô lập tốt nhưng dùng tài nguyên kém hiệu quả hơn và tăng độ phức tạp vận hành.",
          ],
        },
        { type: "h2", text: "Graceful degradation & fallback" },
        {
          type: "p",
          text: "Thay vì trả lỗi cứng, phục vụ kết quả ít đầy đủ hơn nhưng vẫn hữu ích: trả dữ liệu cache cũ, bỏ tính năng phụ, hoặc tính toán rẻ hơn. Mục tiêu là giữ chức năng cốt lõi hoạt động.",
        },
        {
          type: "ul",
          items: [
            "Load shedding: chủ động bỏ một phần request khi gần quá tải (thường trả 503), ưu tiên request quan trọng.",
            "Fallback: giá trị mặc định, cache cũ, hoặc đường xử lý thay thế. Fallback phải đúng ngữ nghĩa nghiệp vụ — trả dữ liệu sai còn tệ hơn trả lỗi.",
            "Cảnh báo: code path degraded ít khi chạy nên dễ hỏng. Hãy test định kỳ, giữ nó đơn giản, và có cách tắt nhanh khi nó gây lỗi dây chuyền.",
          ],
        },
        { type: "h2", text: "Ghép lại thành phòng thủ nhiều lớp" },
        {
          type: "ul",
          items: [
            "Timeout + retry (backoff + jitter) + circuit breaker + bulkhead + fallback là các lớp bổ trợ, không thay thế nhau.",
            "Giám sát tỉ lệ lỗi, số lần ngắt mạch và tỉ lệ fallback để phát hiện sớm.",
            "Tránh gọi chéo trong cùng một tầng (intra-layer) làm tăng phụ thuộc; thường nên để client gọi lại đúng node.",
            "Liên hệ: availability (sd-availability) và SPOF (sd-single-point-of-failure) nói về loại bỏ điểm chết đơn; bài này nói về giữ hệ thống sống khi một phần đã hỏng.",
          ],
        },
        {
          type: "diagram",
          nodes: [
            {
              id: "gateway",
              label: "API Gateway",
              tone: "sky",
              x: 20,
              y: 130,
              w: 130,
              h: 54,
            },
            {
              id: "service",
              label: "Service",
              tone: "emerald",
              x: 220,
              y: 130,
              w: 120,
              h: 54,
            },
            {
              id: "dep-a",
              label: "Dependency A",
              sub: "lỗi · breaker Open",
              tone: "rose",
              x: 430,
              y: 25,
              w: 170,
              h: 56,
            },
            {
              id: "fallback",
              label: "Cache / Fallback",
              sub: "kết quả cũ",
              tone: "amber",
              x: 430,
              y: 130,
              w: 170,
              h: 56,
            },
            {
              id: "dep-b",
              label: "Dependency B",
              sub: "khỏe",
              tone: "emerald",
              x: 430,
              y: 235,
              w: 170,
              h: 56,
            },
          ],
          edges: [
            { id: "gw-service", from: "gateway", to: "service", label: "request" },
            { id: "service-dep-a", from: "service", to: "dep-a", label: "gọi" },
            { id: "service-fallback", from: "service", to: "fallback", label: "A lỗi: degraded" },
            { id: "service-dep-b", from: "service", to: "dep-b", label: "gọi" },
          ],
          caption:
            "Khi Dependency A ngắt mạch, service không chờ timeout mà chuyển sang fallback (cache), đồng thời các bulkhead giữ Dependency B hoạt động độc lập.",
        },
      ],
    },
  ],
};
