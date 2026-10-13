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
        "Từ linearizable (nhất quán mạnh) đến eventual consistency (nhất quán cuối cùng, có thể đọc dữ liệu cũ): tìm hiểu từng mô hình và cách chọn theo yêu cầu nghiệp vụ.",
      duration: "9 phút",
      blocks: [
        {
          type: "p",
          text: "Consistency model (mô hình nhất quán) là cam kết về những gì client có thể thấy khi đọc và ghi dữ liệu đã được sao chép (replicated). Mô hình này trả lời câu hỏi cụ thể hơn CAP: một thao tác đọc có thể trả về giá trị nào và theo thứ tự nào?",
        },
        { type: "h2", text: "Mối liên hệ với CAP và PACELC" },
        {
          type: "ul",
          items: [
            "CAP (xem bài sd-cap) mô tả lựa chọn của hệ thống khi xảy ra phân vùng mạng: hệ CP từ chối một số yêu cầu để giữ tính nhất quán; hệ AP vẫn phản hồi nhưng có thể trả dữ liệu cũ.",
            "PACELC bổ sung rằng ngay cả khi không có phân vùng (Else), hệ thống vẫn phải đánh đổi giữa độ trễ (Latency) và tính nhất quán (Consistency).",
            "Consistency model đi sâu hơn: mô hình này xác định chính xác những lịch sử thao tác (history) mà hệ thống được phép tạo ra — tức client nhìn thấy gì và theo thứ tự nào.",
          ],
        },
        { type: "h2", text: "Linearizable: nhất quán mạnh" },
        {
          type: "p",
          text: "Linearizability là một trong những mô hình mạnh nhất cho một đối tượng đơn (single object). Mỗi thao tác được xem như xảy ra tức thời (atomically) tại một thời điểm giữa lúc được gọi và lúc trả kết quả. Thứ tự thao tác phải tôn trọng thời gian thực: nếu A hoàn tất trước khi B bắt đầu, B phải thấy kết quả của A.",
        },
        {
          type: "ul",
          items: [
            "Hệ quả: thao tác đọc luôn thấy giá trị mới nhất đã được ghi thành công — không có stale read (lần đọc dữ liệu cũ).",
            "Đánh đổi: các node phải phối hợp với nhau (bằng consensus hoặc quorum đọc/ghi), nên độ trễ cao hơn và hệ thống kém sẵn sàng hơn khi có phân vùng mạng (CP theo CAP).",
            "Phạm vi của “object” tùy hệ thống: linearizability trên từng key không đồng nghĩa với linearizability trên nhiều key. Nếu cần bảo đảm cho nhiều đối tượng, hãy tìm hiểu strict serializability.",
          ],
        },
        { type: "h2", text: "Eventual consistency: nhất quán cuối cùng" },
        {
          type: "p",
          text: "Eventual consistency chỉ cam kết một điều: nếu không có thêm thao tác ghi, sau một khoảng thời gian không xác định, mọi replica (bản sao) sẽ hội tụ về cùng một giá trị mới nhất. Trước khi hội tụ, các bản sao có thể trả về dữ liệu cũ.",
        },
        {
          type: "ul",
          items: [
            "Không quy định thời gian hội tụ và không bảo đảm thứ tự đọc: client có thể đọc bản mới rồi lại đọc bản cũ (dữ liệu như thể “lùi thời gian”).",
            "Tính sẵn sàng cao, chịu phân vùng tốt và độ trễ thấp — phù hợp với bảng tin, danh mục sản phẩm, bộ đếm lượt xem.",
            "Không phù hợp với số dư tài khoản, tồn kho hay kiểm tra trùng lặp — những nơi dữ liệu cũ có thể dẫn đến sai sót nghiệp vụ.",
          ],
        },
        { type: "h2", text: "Một số mô hình trung gian hữu ích" },
        {
          type: "ul",
          items: [
            "Causal consistency (nhất quán nhân quả): giữ thứ tự nguyên nhân – kết quả; ai thấy nguyên nhân thì cũng thấy kết quả, còn các lần ghi đồng thời có thể được thấy theo thứ tự khác nhau.",
            "Read-your-writes: người dùng luôn nhìn thấy những thay đổi do chính mình thực hiện.",
            "Monotonic reads (đọc đơn điệu): một client không bao giờ thấy dữ liệu quay ngược về phiên bản cũ hơn.",
          ],
        },
        { type: "h2", text: "Đọc phải dữ liệu cũ (stale read)" },
        {
          type: "p",
          text: "Ví dụ: bạn đổi ảnh đại diện nhưng tải lại trang vẫn thấy ảnh cũ. Lần ghi đã đến leader, nhưng yêu cầu đọc tiếp theo được gửi đến follower đang chậm cập nhật (replication lag). Đây là stale read điển hình trong hệ AP.",
        },
        {
          type: "ul",
          items: [
            "Cách xử lý tùy nhu cầu: với read-your-writes, gửi yêu cầu đọc của người vừa ghi về leader hoặc yêu cầu một version tối thiểu; với monotonic reads, giữ mỗi người dùng trên cùng một replica; hoặc chờ replica cập nhật, hay dùng quorum đọc mạnh hơn.",
            "Bounded staleness (độ cũ có giới hạn): cam kết dữ liệu không cũ quá một ngưỡng thời gian (vài giây) hoặc số version — đây là một điểm cân bằng phổ biến.",
          ],
        },
        { type: "h2", text: "Nên chọn mô hình nào?" },
        {
          type: "p",
          text: "Câu hỏi then chốt không phải là “mô hình nào mạnh nhất?” mà là “client có thể chấp nhận mức sai lệch nào?”. Đọc dữ liệu cũ vài giây có sao không? Một lần sai có thể làm mất tiền không? Nếu có thể chấp nhận sai lệch, eventual consistency hoặc bounded staleness giúp giảm độ trễ và tăng tính sẵn sàng. Nếu không, cần linearizability hoặc giao dịch ở tầng cao hơn.",
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
            "Mô hình càng mạnh (ở phía trên) càng cần phối hợp giữa các node: độ trễ cao hơn và kém sẵn sàng hơn khi có phân vùng. Càng xuống dưới, tính sẵn sàng càng cao nhưng client có thể đọc dữ liệu cũ.",
        },
      ],
    },
    {
      slug: "sd-timeouts-retries-idempotency",
      title: "Timeouts, Retries & Idempotency",
      module: "Distributed Systems",
      summary:
        "Tìm hiểu cách đặt timeout, retry (thử lại) với exponential backoff + jitter và idempotency để retry an toàn — không thể bảo đảm exactly-once.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Một lời gọi qua mạng có thể tạm thời thất bại do timeout, mất gói tin hoặc service quá tải. Ba công cụ cơ bản để xử lý loại lỗi này là timeout, retry với backoff + jitter và idempotency (tính lặp an toàn). Điểm mấu chốt: retry không bảo đảm exactly-once (xử lý đúng một lần); chỉ an toàn khi thao tác có tính idempotent.",
        },
        { type: "h2", text: "Timeout: dừng sớm thay vì chờ vô hạn" },
        {
          type: "p",
          text: "Nếu không đặt timeout, một dependency bị treo sẽ giữ thread/connection cho đến khi cạn tài nguyên — một dạng resource exhaustion (cạn kiệt tài nguyên) có thể dẫn đến cascading failure (lỗi lan truyền). Ngược lại, timeout quá ngắn có thể ngắt cả những request bình thường.",
        },
        {
          type: "ul",
          items: [
            "Đặt timeout cho mọi lời gọi mạng: đủ dài để phần lớn request thành công, nhưng đủ ngắn để tránh giữ tài nguyên quá lâu.",
            "Deadline propagation (truyền hạn chót): đặt hạn chót ở tầng cao (frontend) rồi truyền xuống; mỗi tầng trừ đi khoảng thời gian đã dùng. Server nên kiểm tra hạn chót trước mỗi bước để không tiếp tục xử lý việc client đã bỏ.",
            "Khi client hủy yêu cầu (cancellation), hãy hủy công việc ở các tầng dưới để giải phóng tài nguyên.",
          ],
        },
        { type: "h2", text: "Retry và nguy cơ retry storm" },
        {
          type: "p",
          text: "Retry (thử lại) giúp vượt qua các lỗi ngẫu nhiên, tạm thời. Nhưng nếu lỗi bắt nguồn từ quá tải, mỗi lần thử lại càng làm tăng tải: hệ thống càng lỗi thì càng có nhiều retry, tạo thành vòng phản hồi dương (retry storm/error amplification — bão retry/khuếch đại lỗi).",
        },
        {
          type: "ul",
          items: [
            "Chỉ retry lỗi tạm thời (transient), như timeout, 429, 503. Không retry lỗi không thể tự khắc phục như 400, 401, 422 — thử lại cũng không giúp yêu cầu thành công.",
            "Giới hạn số lần retry và tổng thời gian thử lại; đặt retry budget (ngân sách retry), chẳng hạn tối đa X lần thử lại mỗi phút cho toàn process.",
            "Tránh retry lồng nhau ở nhiều tầng: số lần thử có thể tăng theo cấp số nhân (xem sơ đồ). Nếu bị giới hạn, hãy tuân theo header Retry-After.",
          ],
        },
        { type: "h2", text: "Exponential backoff + jitter: chờ lâu dần và lệch thời điểm thử lại" },
        {
          type: "p",
          text: "Thay vì retry ngay, client chờ lâu hơn sau mỗi lần thất bại — exponential backoff — nhưng giới hạn thời gian chờ ở một mức tối đa (capped). Nếu mọi client chờ theo cùng một công thức, chúng sẽ đồng loạt thử lại và lại dồn tải. Thêm yếu tố ngẫu nhiên (jitter) giúp phân tán thời điểm thử lại.",
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
            "Full jitter: sleep = random(0, min(cap, base × 2^attempt)) — phân tán thời gian chờ trên toàn khoảng và giảm tải dồn hiệu quả.",
            "Equal jitter: giữ cố định một nửa thời gian backoff rồi chọn ngẫu nhiên nửa còn lại — tránh thời gian chờ quá ngắn.",
            "Decorrelated jitter: mở rộng dần khoảng thời gian ngẫu nhiên dựa trên lần trước — giúp phân tán thời điểm thử lại hơn nữa.",
            "Các cách này không làm thay đổi số thao tác cần xử lý, nhưng giảm đáng kể tải dồn và thời gian hoàn tất.",
          ],
        },
        { type: "h2", text: "Idempotency: thử lại an toàn" },
        {
          type: "p",
          text: "Một thao tác có tính idempotent nếu gửi lặp lại nhiều lần vẫn tạo ra kết quả hoặc tác dụng tương đương với việc gửi một lần. Nhờ đó, retry không gây tác dụng phụ trùng lặp — chẳng hạn tạo hai đơn hàng hoặc trừ tiền hai lần.",
        },
        {
          type: "ul",
          items: [
            "Trong HTTP, GET/PUT/DELETE được định nghĩa là idempotent, còn POST thì không (RFC 9110). Đừng tự động retry POST nếu chưa xử lý idempotency.",
            "Idempotency key (khóa chống xử lý lặp): client tạo một khóa duy nhất (UUID) cho mỗi thao tác; server lưu key cùng kết quả và trả lại kết quả tương ứng nếu nhận yêu cầu lặp.",
            "Việc lưu key và thay đổi dữ liệu phải diễn ra nguyên tử (atomic) để tránh trường hợp đã lưu key nhưng quên tạo resource, hoặc ngược lại.",
            "Cần quy định vòng đời của key (thường gắn với vòng đời resource). Nếu cùng key nhưng tham số khác nhau, nên trả lỗi validation để tránh gộp nhầm hai ý định khác nhau.",
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
        { type: "h2", text: "Điều cần nhớ: không thể hứa exactly-once" },
        {
          type: "ul",
          items: [
            "Khi xảy ra timeout, bạn không biết thao tác đã được thực hiện hay chưa: request có thể đã đến server và xử lý xong, nhưng response bị thất lạc. Vì vậy, timeout không đồng nghĩa với thao tác thất bại.",
            "Retry tạo ra bảo đảm at-least-once (ít nhất một lần). Khi kết hợp với thao tác idempotent, tác dụng phụ ở server có thể đạt mức “effectively once” — trên thực tế chỉ xảy ra một lần — hay “at most once” ở cấp hiệu ứng, chẳng hạn chỉ tạo một đơn hàng.",
            "Bảo đảm exactly-once tuyệt đối rất khó đạt trong hệ phân tán; trên thực tế, người ta mô phỏng hành vi này bằng idempotency chứ không phải bằng retry.",
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
            "Retry lồng nhau ở nhiều tầng làm số lần thử tăng lên (3 × 3 × 3 ≈ 27). Khi lỗi do quá tải, retry có thể biến một sự cố nhỏ thành lỗi lan rộng toàn hệ thống.",
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
        { type: "h2", text: "Vì sao khó phát hiện lỗi?" },
        {
          type: "p",
          text: "Vì không có giới hạn thời gian cố định cho việc gửi message, mọi phán đoán dựa trên timeout đều có thể sai theo hai hướng: false positive (báo nhầm node còn sống là đã chết) và false negative (không phát hiện node đã chết).",
        },
        {
          type: "ul",
          items: [
            "False positive đặc biệt nguy hiểm: node khỏe bị gỡ khỏi pool, khiến tải dồn lên các node còn lại và có thể khởi phát cascading failure.",
            "Vì vậy, không nên kết luận chỉ từ một lần timeout; hãy xét nhiều lần lỗi liên tiếp, khoảng thời gian và ngưỡng phù hợp.",
          ],
        },
        { type: "h2", text: "Các cơ chế phổ biến" },
        {
          type: "ul",
          items: [
            "Heartbeat (tín hiệu sống): node gửi tín hiệu định kỳ; nếu không nhận được tín hiệu trong ngưỡng cho phép, hệ thống đánh dấu node là đáng ngờ (theo cơ chế pull hoặc push).",
            "Dùng ngưỡng số lần lỗi liên tiếp (consecutive failures) cùng một cửa sổ thời gian để tránh trạng thái lên xuống liên tục (flapping) khi mạng chập chờn.",
            "Phi-accrual failure detector: thay vì trả về true/false, đưa ra mức độ nghi ngờ (suspicion level) trên một thang liên tục và tự điều chỉnh theo điều kiện mạng — được dùng trong các hệ như Cassandra, Akka.",
            "Gossip: lan truyền thông tin về trạng thái sống/chết của node trong toàn cluster mà không cần một điểm trung tâm.",
          ],
        },
        { type: "h2", text: "Health check: liveness và readiness" },
        {
          type: "ul",
          items: [
            "Liveness (kiểm tra tiến trình còn sống): tiến trình có còn phản hồi không? Nếu không, khởi động lại tiến trình.",
            "Readiness (kiểm tra mức độ sẵn sàng): instance đã khởi tạo xong và các dependency thiết yếu còn hoạt động để phục vụ chưa? Nếu chưa, gỡ instance khỏi load balancer nhưng không khởi động lại.",
            "Điều quan trọng là tách hai tín hiệu này: một dependency dùng chung bị lỗi không nên khiến mọi instance đều khởi động lại.",
          ],
        },
        { type: "h2", text: "Kiểm tra nông và kiểm tra sâu" },
        {
          type: "ul",
          items: [
            "Kiểm tra nông (shallow check): chỉ xác nhận tiến trình có phản hồi, không gọi dependency — ít tốn tài nguyên, phù hợp cho liveness.",
            "Kiểm tra sâu (deep check): kiểm tra cả các dependency thiết yếu (DB, cache) — phù hợp cho readiness.",
            "Cảnh báo: deep check gọi dependency qua mạng mỗi lần probe có thể tạo false positive và biến chính cơ chế giám sát thành nguyên nhân gây lỗi. Hãy giới hạn (bound) timeout cho từng dependency, dùng circuit breaker cho dependency chập chờn và trả trạng thái “degraded” (suy giảm) thay vì “unhealthy” (không khỏe) khi dependency phụ gặp lỗi.",
          ],
        },
        { type: "h2", text: "Nguyên tắc khi triển khai" },
        {
          type: "ul",
          items: [
            "Probe nên nhẹ, chỉ đọc (read-only) và không thay đổi dữ liệu production; dùng endpoint riêng cho liveness và readiness.",
            "Thiết lập cảnh báo dựa trên SLO và các luồng quan trọng, không dựa trên từng probe riêng lẻ.",
            "Nếu một dependency dùng chung gặp sự cố, đừng để load balancer gỡ bỏ mọi instance — khi đó cần suy giảm chức năng có kiểm soát ở tầng ứng dụng (xem bài sau).",
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
          type: "p",
          text: "Endpoint /healthz/live trả về 200 nếu tiến trình đang chạy (không kiểm tra dependency); endpoint /healthz/ready trả về 200 nếu DB và cache đều hoạt động tốt, ngược lại trả về 503.",
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
            "Liveness chỉ kiểm tra tiến trình app; readiness còn kiểm tra dependency thiết yếu. Đừng để deep check phụ thuộc vào một dependency chập chờn khiến các instance vẫn khỏe bị gỡ bỏ.",
        },
      ],
    },
    {
      slug: "sd-cascading-failures",
      title: "Circuit Breaker, Bulkhead & Graceful Degradation",
      module: "Distributed Systems",
      summary:
        "Tìm hiểu cách ngăn lỗi lan rộng bằng circuit breaker, bulkhead, load shedding và graceful degradation/fallback.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Cascading failure (lỗi lan truyền) là tình trạng một thành phần gặp sự cố khiến thành phần khác quá tải rồi cũng hỏng theo, tạo thành vòng phản hồi dương. Nguyên nhân phổ biến là quá tải (overload), thường trầm trọng hơn do retry. Ba kỹ thuật giúp chặn vòng xoáy này là circuit breaker, bulkhead và graceful degradation.",
        },
        { type: "h2", text: "Circuit breaker" },
        {
          type: "p",
          text: "Circuit breaker (cầu dao ngắt mạch) là một proxy đặt trước dependency thường gặp lỗi. Nó đếm số lỗi gần đây; khi vượt ngưỡng, mạch “ngắt” và request được trả lỗi ngay (fail fast) thay vì chờ timeout, nhờ đó tránh giữ tài nguyên.",
        },
        {
          type: "ul",
          items: [
            "Closed (đóng): cho request đi qua và đếm lỗi. Khi vượt ngưỡng, chuyển sang Open.",
            "Open (mở): trả lỗi ngay và chờ hết cooldown (thời gian nghỉ) để dependency có cơ hội phục hồi. Hết cooldown thì chuyển sang Half-Open.",
            "Half-Open (bán mở): cho một số ít request đi qua để kiểm tra. Nếu thành công, chuyển về Closed; nếu thất bại, chuyển lại Open.",
            "Circuit breaker khác retry: retry thử lại vì kỳ vọng thao tác sẽ thành công; breaker ngăn những lời gọi gần như chắc chắn sẽ thất bại. Khi kết hợp hai cơ chế, cần dừng retry nếu breaker báo lỗi không phải tạm thời; đồng thời cần observability (khả năng quan sát hệ thống) và cách reset thủ công.",
            "Thận trọng khi dùng chung breaker cho nhiều shard/tenant độc lập: lỗi ở một shard có thể khiến mạch ngắt cả những shard đang khỏe.",
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
            "Circuit breaker là một máy trạng thái: đếm lỗi ở Closed, ngắt ở Open và chỉ cho thử lại một cách dè dặt ở Half-Open trước khi đóng mạch.",
        },
        { type: "h2", text: "Bulkhead" },
        {
          type: "p",
          text: "Bulkhead (vách ngăn) chia tài nguyên thành các khoang độc lập (thread pool, connection pool, queue, instance), để một khoang bị “ngập” không kéo sập cả hệ thống. Ý tưởng này lấy cảm hứng từ các vách ngăn trên tàu.",
        },
        {
          type: "ul",
          items: [
            "Consumer bulkhead: dành connection/thread pool riêng cho từng dependency để một service bị treo không chiếm hết pool của các service khác.",
            "Service bulkhead: chạy từng tenant/nhóm người dùng trên instance/queue riêng (cell-based architecture) để cô lập phạm vi ảnh hưởng.",
            "Đánh đổi: khả năng cô lập tốt hơn nhưng sử dụng tài nguyên kém hiệu quả hơn và làm tăng độ phức tạp khi vận hành.",
          ],
        },
        { type: "h2", text: "Graceful degradation và fallback" },
        {
          type: "p",
          text: "Thay vì trả lỗi hoàn toàn, hệ thống có thể cung cấp kết quả ít đầy đủ hơn nhưng vẫn hữu ích: trả dữ liệu cũ từ cache, tắt tính năng phụ hoặc dùng cách tính toán ít tốn kém hơn. Mục tiêu là giữ cho chức năng cốt lõi vẫn hoạt động.",
        },
        {
          type: "ul",
          items: [
            "Load shedding (loại bỏ tải): chủ động từ chối một phần request khi hệ thống gần quá tải (thường trả 503) để ưu tiên các request quan trọng.",
            "Fallback (phương án dự phòng): dùng giá trị mặc định, dữ liệu cũ trong cache hoặc một luồng xử lý thay thế. Fallback phải đúng ngữ nghĩa nghiệp vụ — trả dữ liệu sai còn tệ hơn trả lỗi.",
            "Cảnh báo: code path degraded (luồng xử lý khi chức năng suy giảm) ít khi chạy nên dễ phát sinh lỗi. Hãy kiểm thử định kỳ, giữ luồng này đơn giản và có cách tắt nhanh nếu nó gây lỗi dây chuyền.",
          ],
        },
        { type: "h2", text: "Kết hợp thành nhiều lớp bảo vệ" },
        {
          type: "ul",
          items: [
            "Timeout, retry (backoff + jitter), circuit breaker, bulkhead và fallback là các lớp bảo vệ bổ trợ cho nhau, không thay thế nhau.",
            "Theo dõi tỷ lệ lỗi, số lần ngắt mạch và tỷ lệ fallback để phát hiện sự cố sớm.",
            "Tránh gọi vòng trong cùng một tầng (intra-layer) vì làm tăng sự phụ thuộc; thông thường nên để client gọi lại đúng node.",
            "Liên hệ: availability (sd-availability) và SPOF (điểm lỗi đơn, sd-single-point-of-failure) nói về cách loại bỏ một điểm lỗi đơn lẻ; bài này tập trung vào việc giữ hệ thống hoạt động khi một phần đã hỏng.",
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
            "Khi circuit breaker ngắt Dependency A, service không chờ timeout mà chuyển sang fallback (cache); đồng thời, các bulkhead giúp Dependency B tiếp tục hoạt động độc lập.",
        },
      ],
    },
  ],
};
