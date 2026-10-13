import type { CourseModule } from "@/lib/course-types";

export const sdCaseStudiesModule: CourseModule = {
  id: "sd-case-studies",
  title: "Case Studies",
  lessons: [
    {
      slug: "sd-case-url-shortener",
      title: "Case Study: URL Shortener",
      module: "Case Studies",
      summary:
        "Áp dụng quy trình thiết kế vào dịch vụ rút gọn URL: tạo mã, chuyển hướng, cache luồng đọc và các đánh đổi.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "URL shortener là ví dụ đơn giản để làm quen với quy trình thiết kế: yêu cầu gọn, lưu lượng đọc chiếm ưu thế và có một số đánh đổi dễ thấy. Bài này kết hợp các thành phần đã học — load balancer, cache-aside, sharding, replication và message queue — thành một hệ thống hoàn chỉnh.",
        },
        {
          type: "p",
          text: "Mục tiêu: sau bài này, bạn có thể xây dựng thiết kế từ yêu cầu đến kiến trúc, giải thích khi nào chọn 302 hay 301, cách tạo mã không trùng và những điểm nghẽn cần xử lý khi hệ thống phát triển.",
        },
        { type: "h2", text: "Yêu cầu và giả định" },
        {
          type: "p",
          text: "Yêu cầu chức năng: nhận URL dài và trả về URL ngắn; khi người dùng truy cập URL ngắn, chuyển hướng họ đến URL gốc. Ngoài ra, có thể cho phép đặt alias riêng, ngày hết hạn và xem số lượt click.",
        },
        {
          type: "ul",
          items: [
            "Chuyển hướng cần nhanh và chịu được lưu lượng đọc lớn.",
            "Mã ngắn phải duy nhất; nếu dùng cho liên kết riêng tư thì cần khó đoán.",
            "Liên kết đã tạo phải được lưu bền vững (durability), không bị mất.",
            "Có thể cần đổi đích hoặc thu hồi liên kết, chẳng hạn khi phát hiện liên kết độc hại.",
          ],
        },
        {
          type: "p",
          text: "Yêu cầu phi chức năng ảnh hưởng trực tiếp đến thiết kế, vì vậy cần nêu rõ các giả định thay vì xem chúng là con số áp dụng cho mọi hệ thống. Ví dụ minh họa: khoảng 2 triệu URL mới mỗi ngày, tỷ lệ đọc/ghi khoảng 100:1 và mã dài 7 ký tự.",
        },
        { type: "h2", text: "Ước lượng tải vừa đủ" },
        {
          type: "p",
          text: "Mục đích của phép ước lượng là xác định hệ thống chịu áp lực ở đâu. Với các giả định trên:",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Ghi:  2.000.000 / ngày  ÷ 86.400 s ≈ 23 ghi/s (đỉnh ×10 ≈ 230 ghi/s)\nĐọc:  23 × 100          ≈ 2.300 đọc/s (đỉnh ×10 ≈ 23.000 đọc/s)\nDung lượng: ~100 byte/bản ghi × 2.000.000/ngày × 30 ≈ 6 GB/tháng\nMã 7 ký tự Base62: 62^7 ≈ 3,5 × 10^12 mã — dư sức cho nhiều năm",
            },
          ],
        },
        {
          type: "p",
          text: "Kết luận ban đầu: đây là hệ thống thiên về đọc, vì vậy cần cache và replica cho luồng chuyển hướng. Lưu lượng ghi thấp hơn nhiều nên có thể tối ưu sau.",
        },
        { type: "h2", text: "API và data model" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "POST /v1/links   { longUrl, expiresAt?, customAlias? }\n     → 201 { shortUrl, shortCode }\n\nGET  /{shortCode}\n     → 302  Location: longUrl\n\nGET  /v1/links/{shortCode}/stats\n     → 200 { clicks }",
            },
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "sql",
              code: "-- Mapping, tra cứu theo khoá chính short_code\nurl_mapping(\n  short_code  PK,\n  long_url    TEXT,\n  created_at  TIMESTAMP,\n  expires_at  TIMESTAMP NULL,\n  owner_id    BIGINT NULL\n)\n\n-- Sự kiện click, ghi bất đồng bộ qua queue\nclick_event(short_code, ts, referrer, country)",
            },
          ],
        },
        { type: "h2", text: "Kiến trúc mức cao" },
        {
          type: "diagram",
          caption:
            "Tách đường ghi (tạo mã) khỏi đường đọc (chuyển hướng). Đường đọc đi qua cache trước; sự kiện click đẩy vào queue để không chặn việc chuyển hướng.",
          nodes: [
            { id: "client", label: "Client", sub: "trình duyệt/app", tone: "sky", x: 20, y: 150, w: 120, h: 54 },
            { id: "lb", label: "Load Balancer", sub: "phân phối", tone: "violet", x: 190, y: 150, w: 140, h: 54 },
            { id: "shorten", label: "Shorten API", sub: "tạo mã", tone: "emerald", x: 380, y: 20, w: 150, h: 54 },
            { id: "redirect", label: "Redirect API", sub: "hot path (đọc)", tone: "emerald", x: 380, y: 250, w: 150, h: 54 },
            { id: "kgs", label: "ID / KGS", sub: "sinh mã", tone: "violet", x: 600, y: 20, w: 130, h: 54 },
            { id: "cache", label: "Cache", sub: "code → URL", tone: "amber", x: 600, y: 150, w: 130, h: 54 },
            { id: "db", label: "URL DB", sub: "mapping bền vững", tone: "amber", x: 760, y: 150, w: 150, h: 54 },
            { id: "queue", label: "Queue", sub: "click event", tone: "violet", x: 600, y: 250, w: 130, h: 54 },
            { id: "analytics", label: "Analytics", sub: "đếm click", tone: "emerald", x: 760, y: 250, w: 150, h: 54 },
          ],
          edges: [
            { id: "client-lb", from: "client", to: "lb", label: "request" },
            { id: "lb-shorten", from: "lb", to: "shorten", label: "POST /links" },
            { id: "lb-redirect", from: "lb", to: "redirect", label: "GET /{code}" },
            { id: "shorten-kgs", from: "shorten", to: "kgs", label: "lấy mã" },
            { id: "shorten-db", from: "shorten", to: "db", label: "ghi mapping" },
            { id: "redirect-cache", from: "redirect", to: "cache", label: "tra cache" },
            { id: "cache-redirect", from: "cache", to: "redirect", label: "hit: trả URL", dashed: true },
            { id: "cache-db", from: "cache", to: "db", label: "miss" },
            { id: "redirect-queue", from: "redirect", to: "queue", label: "log click", dashed: true },
            { id: "queue-analytics", from: "queue", to: "analytics", label: "xử lý nền" },
          ],
        },
        { type: "h2", text: "Luồng request" },
        {
          type: "ul",
          items: [
            "Tạo liên kết: API kiểm tra tính hợp lệ của URL, lấy mã mới từ bộ sinh ID, ghi mapping vào DB rồi trả về URL ngắn. Ghi mapping là thao tác duy nhất trên luồng này cần hoàn tất bền vững.",
            "Chuyển hướng: API tra cache trước. Nếu cache hit, trả về 302 ngay; nếu cache miss, đọc DB, ghi kết quả vào cache (cache-aside) rồi trả về 302. Đồng thời, sự kiện click được đưa vào queue để xử lý sau.",
            "Thống kê: worker lấy click_event từ queue để tổng hợp; người dùng không cần chờ bước này.",
          ],
        },
        {
          type: "p",
          text: "Vì sao chọn 302 thay vì 301? Với 301 (Moved Permanently), trình duyệt và proxy có thể cache chuyển hướng vĩnh viễn. Những lần truy cập sau đó không đi qua hệ thống nữa — giảm tải nhưng không ghi nhận được click, cũng khó đổi đích hoặc thu hồi liên kết. Với 302 (Found), mỗi lượt truy cập vẫn đi qua hệ thống, nhờ đó có thể thống kê và kiểm soát liên kết. Nếu cần thống kê hoặc đổi đích, hãy dùng 302.",
        },
        { type: "h2", text: "Điểm nghẽn và failure modes" },
        {
          type: "ul",
          items: [
            "Bộ sinh ID dùng chung có thể trở thành điểm lỗi đơn và nút thắt cổ chai. Có thể thay bằng Key Generation Service cấp các dải ID (range) cho từng node hoặc dùng ID phân tán (chẳng hạn Snowflake).",
            "Mã bị trùng: nếu tạo mã ngẫu nhiên hoặc cắt ngắn hash, cần kiểm tra trùng và thử lại. Nếu tạo mã từ ID tăng dần rồi mã hóa bằng Base62, tính duy nhất được bảo đảm theo cấu trúc nên không cần kiểm tra trùng.",
            "Cache stampede với liên kết được truy cập nhiều: nhiều request cùng lúc cache miss cho một mã. Có thể hạn chế bằng lock, early refresh hoặc một hàng đợi nhỏ.",
            "DB chính gặp sự cố: luồng đọc vẫn có thể hoạt động nhờ cache và replica, nhưng luồng ghi tạm thời bị gián đoạn. Cần failover để duy trì khả năng tạo liên kết.",
            "Lạm dụng: có thể xuất hiện URL độc hại hoặc spam. Cần rate limiting, kiểm tra danh sách chặn và cơ chế thu hồi (302 giúp tiếp tục kiểm soát liên kết).",
            "Liên kết hết hạn: trả về 404/410 và xóa mã khỏi cache để không tiếp tục phục vụ dữ liệu cũ.",
          ],
        },
        { type: "h2", text: "Đánh đổi và cách tiến hóa" },
        {
          type: "p",
          text: "Hãy bắt đầu đơn giản: một app server và một database đủ phục vụ vài nghìn liên kết đầu tiên. Khi lưu lượng đọc tăng, hãy thêm cache rồi replica. Khi dữ liệu lớn lên, chia bảng mapping thành các shard theo hash của short_code để phân tải đều; vì truy vấn luôn dùng short_code nên không cần truy vấn xuyên shard.",
        },
        {
          type: "ul",
          items: [
            "Mã tuần tự dễ đoán; nếu cần mã khó đoán, hãy dùng ID phân tán hoặc ngẫu nhiên thay cho bộ đếm.",
            "Cache giảm tải đọc nhưng có thể trả dữ liệu cũ trong thời gian ngắn; khi đổi đích, cần làm mới hoặc xóa mục cache (invalidation).",
            "301 giảm tải nhưng làm giảm khả năng kiểm soát; 302 cần thêm request nhưng cho phép thống kê và thu hồi liên kết.",
            "Đưa analytics vào queue giúp luồng chuyển hướng gọn hơn, nhưng số liệu có thể chậm vài giây.",
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Hệ thống thiên về đọc: cache luồng chuyển hướng, dùng replica cho luồng đọc và giữ thao tác ghi mapping đơn giản.",
            "Tạo mã từ ID rồi mã hóa Base62 để bảo đảm tính duy nhất; KGS hoặc ID phân tán giúp tránh nghẽn ở bộ đếm.",
            "Dùng 302 để thống kê và kiểm soát liên kết; dùng 301 khi đích cố định và ưu tiên giảm tải.",
            "Đưa sự kiện click vào queue; chia shard theo short_code khi dữ liệu lớn.",
          ],
        },
      ],
    },
    {
      slug: "sd-case-news-feed",
      title: "Case Study: News Feed",
      module: "Case Studies",
      summary:
        "Thiết kế news feed: fan-out, hot key từ tài khoản có nhiều follower, cache inbox và queue, cùng các đánh đổi giữa đọc và ghi.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "News feed là bài toán điển hình về đánh đổi giữa chi phí ghi và độ trễ đọc. Bài này kết hợp social graph, cache, queue và sharding để thiết kế feed gần thời gian thực, đồng thời xử lý trường hợp tài khoản có hàng triệu follower.",
        },
        {
          type: "p",
          text: "Mục tiêu: hiểu vì sao cần kết hợp fan-out khi ghi và fan-out khi đọc, cách lưu inbox bằng cấu trúc dữ liệu có thứ tự, và cách nhận diện điểm nghẽn khi lưu lượng tăng đột biến.",
        },
        { type: "h2", text: "Yêu cầu và giả định" },
        {
          type: "p",
          text: "Yêu cầu chức năng: người dùng có thể đăng bài, theo dõi người khác và xem feed gồm bài mới từ những tài khoản mình theo dõi, có hỗ trợ phân trang.",
        },
        {
          type: "ul",
          items: [
            "Feed tải nhanh (mục tiêu dưới vài trăm ms) và chịu được lưu lượng đọc lớn.",
            "Bài đã đăng không bị mất; thứ tự trong mỗi feed ổn định.",
            "Chấp nhận nhất quán cuối: người theo dõi có thể thấy bài mới sau vài giây.",
            "Ưu tiên tính sẵn sàng và độ trễ đọc thấp hơn tính nhất quán mạnh (theo hướng AP trong CAP).",
          ],
        },
        {
          type: "p",
          text: "Giả định minh họa (không phải con số áp dụng cho mọi hệ thống): 50 triệu người dùng hoạt động mỗi ngày, trung bình mỗi tài khoản có 200 follower (người theo dõi), mỗi người đăng 0,2 bài/ngày và một nhóm nhỏ tài khoản có hơn 1 triệu follower.",
        },
        { type: "h2", text: "Ước lượng tải vừa đủ" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Bài mới: 50.000.000 × 0,2 = 10.000.000/ngày ≈ 116 bài/s\nFan-out (đẩy cho follower): 10.000.000 × 200 = 2.000.000.000/ngày ≈ 23.000 ghi/s\nĐọc feed: giả sử 10 lần/người/ngày → 500.000.000/ngày ≈ 5.800 đọc/s (đỉnh ×5 ≈ 29.000/s)",
            },
          ],
        },
        {
          type: "p",
          text: "Có hai con số đáng chú ý: số lượt đọc gấp khoảng 50 lần số lượt ghi, còn số thao tác ghi do fan-out gấp khoảng 200 lần số bài đăng. Nếu đẩy bài đến mọi follower, một bài từ tài khoản có 1 triệu follower sẽ tạo ra 1 triệu thao tác ghi — vì vậy cần mô hình lai.",
        },
        { type: "h2", text: "API và data model" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "POST /v1/posts    { body, media? }   → 201 { post_id }\nPOST /v1/follows  { followee_id }     → 204\nGET  /v1/feed?cursor=...               → 200 { items[], nextCursor }",
            },
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "sql",
              code: "-- Social graph\nfollow(follower_id, followee_id, created_at)   -- PK(follower_id, followee_id)\n\n-- Bài viết (sharded theo author_id)\npost(post_id, author_id, body, created_at, media_url)\n\n-- Inbox trong cache: Redis sorted set, giảm dần theo thời gian\nfeed:{user_id}   member = post_id,  score = created_at",
            },
          ],
        },
        {
          type: "h3",
          text: "Inbox bằng sorted set",
        },
        {
          type: "p",
          text: "Mỗi người dùng có một sorted set chứa các post_id, được sắp theo thời gian. Dùng ZADD để thêm mục và ZRANGE đảo chiều để lấy N mục mới nhất; cả hai thao tác đều có độ phức tạp O(log N). Inbox chỉ cần giữ vài trăm đến vài nghìn mục mới nhất rồi loại bỏ phần cũ, vì khi đọc feed thường chỉ cần các mục đầu tiên.",
        },
        { type: "h2", text: "Kiến trúc mức cao" },
        {
          type: "diagram",
          caption:
            "Kiến trúc lai: bài mới được fan-out bất đồng bộ qua queue tới inbox cache của người theo dõi; bài từ tài khoản nhiều follower được giữ lại và gộp (pull) lúc đọc để tránh bùng nổ ghi.",
          nodes: [
            { id: "client", label: "Client", sub: "app", tone: "sky", x: 20, y: 150, w: 120, h: 54 },
            { id: "lb", label: "Load Balancer", tone: "violet", x: 170, y: 150, w: 130, h: 54 },
            { id: "feedapi", label: "Feed API", sub: "đọc/ghi", tone: "emerald", x: 330, y: 150, w: 140, h: 54 },
            { id: "inbox", label: "Feed Cache", sub: "inbox (sorted set)", tone: "amber", x: 520, y: 40, w: 170, h: 54 },
            { id: "postdb", label: "Post Store", sub: "sharded theo author", tone: "amber", x: 520, y: 150, w: 170, h: 54 },
            { id: "graph", label: "Social Graph", sub: "quan hệ follow", tone: "amber", x: 520, y: 260, w: 170, h: 54 },
            { id: "queue", label: "Fan-out Queue", sub: "hấp thụ đỉnh", tone: "violet", x: 750, y: 40, w: 160, h: 54 },
            { id: "worker", label: "Fan-out Worker", sub: "đẩy post_id", tone: "emerald", x: 750, y: 150, w: 160, h: 54 },
            { id: "celeb", label: "Celebrity Pull", sub: "gộp lúc đọc", tone: "amber", x: 750, y: 260, w: 160, h: 54 },
          ],
          edges: [
            { id: "client-lb", from: "client", to: "lb", label: "request" },
            { id: "lb-feedapi", from: "lb", to: "feedapi" },
            { id: "feedapi-inbox", from: "feedapi", to: "inbox", label: "1. đọc inbox" },
            { id: "feedapi-postdb", from: "feedapi", to: "postdb", label: "2. nạp nội dung" },
            { id: "feedapi-graph", from: "feedapi", to: "graph", label: "3. lấy follow" },
            { id: "feedapi-celeb", from: "feedapi", to: "celeb", label: "gộp bài celebrity", dashed: true },
            { id: "postdb-queue", from: "postdb", to: "queue", label: "bài mới" },
            { id: "queue-worker", from: "queue", to: "worker", label: "job" },
            { id: "worker-inbox", from: "worker", to: "inbox", label: "đẩy post_id" },
          ],
        },
        { type: "h2", text: "Luồng request" },
        {
          type: "ul",
          items: [
            "Đăng bài: Post Store lưu bài bền vững trước, sau đó đưa một job vào queue. Worker lấy danh sách follower rồi thêm post_id vào inbox cache của từng người (fan-out khi ghi). Với tài khoản có nhiều follower, bỏ qua bước fan-out vì chi phí quá cao.",
            "Đọc feed: Feed API lấy inbox đã được sắp thứ tự từ cache, gộp thêm bài mới từ các tài khoản nhiều follower mà người dùng theo dõi (fan-out khi đọc), nạp nội dung bài theo lô, lọc bài trùng hoặc đã xóa rồi trả về một trang.",
            "Phân trang: dùng cursor theo (score, post_id) thay vì offset để tránh lặp hoặc bỏ sót bài khi feed thay đổi.",
          ],
        },
        { type: "h2", text: "Điểm nghẽn và failure modes" },
        {
          type: "ul",
          items: [
            "Celebrity problem: một bài từ tài khoản lớn có thể tạo hàng triệu thao tác ghi và làm queue ùn tắc. Giải pháp là mô hình lai: dùng ngưỡng follower để quyết định push hay pull, thay vì áp dụng một cách cho mọi tài khoản.",
            "Hot key: một số inbox hoặc bài viết được truy cập với tần suất rất cao. Có thể nhân bản cache và tạo cache riêng cho nội dung hot để tránh dồn tải vào một node.",
            "Fan-out chậm: có độ trễ từ lúc đăng bài đến khi follower nhìn thấy bài. Đây là đánh đổi để đạt nhất quán cuối; cần giám sát độ trễ của queue và áp dụng backpressure.",
            "Ghi trùng và thứ tự: retry khi cập nhật inbox có thể tạo thao tác lặp. Vì post_id đã là khóa trong sorted set, ghi lại cùng post_id không gây tác động thêm (idempotent).",
            "Cache miss đồng loạt sau khi khởi động lại hoặc khi cache hết hạn có thể khiến nhiều lượt đọc dồn xuống Post Store. Cần giới hạn tải, nạp trước dữ liệu và dùng early refresh.",
            "Bỏ theo dõi, chặn hoặc xóa bài: các bài đã được fan-out vẫn có thể nằm trong inbox; cần lọc lại khi đọc.",
          ],
        },
        { type: "h2", text: "Đánh đổi và cách tiến hóa" },
        {
          type: "p",
          text: "Fan-out khi ghi giúp đọc nhanh nhưng tốn nhiều thao tác ghi và dung lượng; fan-out khi đọc giảm chi phí ghi nhưng mỗi lần đọc phải tổng hợp bài từ nhiều nguồn. Hệ thống thực tế thường kết hợp cả hai: push cho phần lớn tài khoản, pull cho nhóm có nhiều follower.",
        },
        {
          type: "ul",
          items: [
            "Khi lượt đọc nhiều hơn lượt ghi, hãy tối ưu luồng đọc bằng cache và precompute, đồng thời chấp nhận bài mới có thể xuất hiện trễ vài giây.",
            "Social graph được đọc thường xuyên; lưu trong một store hỗ trợ tra cứu nhanh và dùng cache sẽ giúp giảm tải đáng kể.",
            "Queue hấp thụ đỉnh tải và tách fan-out khỏi luồng đăng bài.",
            "Nếu cần xếp hạng theo mức độ liên quan thay vì chỉ theo thời gian, hãy thêm bước chấm điểm khi đọc. Vì việc này tốn thêm tài nguyên tính toán, thường nên lấy các bài ứng viên từ cache rồi mới xếp hạng.",
            "Chia Post Store thành shard theo author_id; inbox có thể chia theo user_id; dùng replica để mở rộng khả năng đọc.",
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Thiết kế feed là sự đánh đổi giữa chi phí ghi và độ trễ đọc; hãy chọn theo tỷ lệ đọc/ghi thực tế.",
            "Lưu inbox bằng sorted set để thêm, xóa và đọc nhanh, đồng thời giữ thứ tự các mục.",
            "Thực hiện fan-out bất đồng bộ qua queue; dùng ngưỡng follower để chuyển các tài khoản lớn sang pull.",
            "Chấp nhận nhất quán cuối, nhưng cần lọc các bài từ tài khoản đã bỏ theo dõi, bị chặn hoặc đã xóa khi đọc.",
          ],
        },
      ],
    },
    {
      slug: "sd-case-chat",
      title: "Case Study: Chat",
      module: "Case Studies",
      summary:
        "Thiết kế chat: kết nối realtime bằng WebSocket, lưu tin bền vững, bảo đảm thứ tự trong từng hội thoại, giao nhận at-least-once và theo dõi presence.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "Chat khác hẳn hai ví dụ trước: server cần chủ động gửi dữ liệu đến client, nên kết nối có trạng thái và khó mở rộng theo chiều ngang hơn. Bài này dùng WebSocket, pub/sub, idempotency và sharding để bảo đảm tin nhắn không bị mất, được xử lý an toàn khi gửi lặp và đúng thứ tự trong từng hội thoại.",
        },
        {
          type: "p",
          text: "Mục tiêu: hiểu vì sao WebSocket khó mở rộng (scale), cách gán số thứ tự và chống xử lý trùng, cách định tuyến tin nhắn đến đúng server đang giữ kết nối của người nhận, và cách theo dõi presence bằng heartbeat.",
        },
        { type: "h2", text: "Yêu cầu và giả định" },
        {
          type: "p",
          text: "Yêu cầu chức năng: gửi và nhận tin nhắn theo thời gian thực; hỗ trợ chat 1:1 và nhóm nhỏ; xem lịch sử; biết tin nhắn đã gửi, đã nhận hay đã đọc; và hiển thị trạng thái online.",
        },
        {
          type: "ul",
          items: [
            "Độ trễ thấp: tin nhắn được gửi gần như tức thì khi cả hai bên đang trực tuyến.",
            "Tin nhắn không được mất; có thể gửi lặp nhưng cần chống xử lý trùng ở phía nhận (at-least-once).",
            "Thứ tự chỉ cần được bảo đảm trong từng hội thoại, không cần trên toàn hệ thống.",
            "Presence có thể chỉ là ước lượng và trễ vài giây; không cần chính xác tuyệt đối.",
            "Tin nhắn gửi khi người nhận offline phải được lưu lại và chuyển đến họ khi kết nối lại.",
          ],
        },
        {
          type: "p",
          text: "Giả định minh họa: 20 triệu người dùng hoạt động mỗi ngày, mỗi người gửi 40 tin nhắn/ngày, khoảng 10% đang online cùng lúc và mỗi tin nhắn trung bình 200 byte.",
        },
        { type: "h2", text: "Ước lượng tải vừa đủ" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Tin: 20.000.000 × 40 = 800.000.000/ngày ≈ 9.300 tin/s (đỉnh ×5 ≈ 46.000/s)\nKết nối đồng thời: 10% × 20.000.000 = 2.000.000 WebSocket\nDung lượng: 800.000.000 × 200 byte ≈ 160 GB/ngày → ~58 TB/năm (cần shard + lưu trữ lạnh)",
            },
          ],
        },
        {
          type: "p",
          text: "Hệ thống chịu hai áp lực chính: 2 triệu kết nối duy trì liên tục (gây áp lực lên bộ nhớ và định tuyến, không phải throughput) và khối lượng ghi tin nhắn lớn (cần shard, có thể đưa một phần công việc vào queue).",
        },
        { type: "h2", text: "API và data model" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "POST /v1/conversations/{id}/messages\n  Idempotency-Key: <client_message_id>\n  { body }                              → 201 { message_id, seq }\n\nGET  /v1/conversations/{id}/messages?after_seq=...  → 200 { messages[] }\n\nWS   /v1/ws\n  event: message.new | message.delivered | typing | presence",
            },
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "sql",
              code: "message(\n  message_id      PK,        -- UUID do client sinh, dùng làm idempotency key\n  conversation_id,\n  sender_id,\n  seq             BIGINT,    -- tăng dần trong từng conversation\n  body, created_at,\n  status                     -- pending | sent | delivered | read\n)\n\nconversation(conversation_id PK, type, last_seq)\nconversation_member(conversation_id, user_id, last_read_seq)\npresence:{user_id} → { server_id, last_seen }   -- key có TTL, làm mới bằng heartbeat",
            },
          ],
        },
        {
          type: "p",
          text: "client tạo message_id và gửi kèm trong header Idempotency-Key. Nếu client timeout rồi thử lại, server nhận ra key đã được xử lý và trả về kết quả cũ thay vì tạo tin nhắn thứ hai.",
        },
        { type: "h2", text: "Kiến trúc mức cao" },
        {
          type: "diagram",
          caption:
            "WS gateway giữ kết nối realtime; message service lưu bền vững và gán số thứ tự theo hội thoại; pub/sub định tuyến tin tới gateway đang giữ kết nối của người nhận; presence lưu bằng key có TTL làm mới qua heartbeat.",
          nodes: [
            { id: "client-a", label: "Client A", sub: "WebSocket", tone: "sky", x: 20, y: 40, w: 130, h: 54 },
            { id: "client-b", label: "Client B", sub: "WebSocket", tone: "sky", x: 20, y: 260, w: 130, h: 54 },
            { id: "ws-a", label: "WS Gateway A", sub: "giữ kết nối", tone: "violet", x: 220, y: 40, w: 150, h: 54 },
            { id: "ws-b", label: "WS Gateway B", sub: "giữ kết nối", tone: "violet", x: 220, y: 260, w: 150, h: 54 },
            { id: "bus", label: "Pub/Sub", sub: "định tuyến", tone: "violet", x: 450, y: 150, w: 140, h: 54 },
            { id: "msg", label: "Message Service", sub: "idempotent + seq", tone: "emerald", x: 650, y: 150, w: 160, h: 54 },
            { id: "store", label: "Message Store", sub: "sharded theo conversation", tone: "amber", x: 650, y: 40, w: 160, h: 54 },
            { id: "presence", label: "Presence Store", sub: "heartbeat + TTL", tone: "amber", x: 650, y: 260, w: 160, h: 54 },
          ],
          edges: [
            { id: "a-wsa", from: "client-a", to: "ws-a", label: "kết nối" },
            { id: "b-wsb", from: "client-b", to: "ws-b", label: "kết nối" },
            { id: "wsa-msg", from: "ws-a", to: "msg", label: "1. gửi + persist" },
            { id: "msg-store", from: "msg", to: "store", label: "2. lưu theo seq" },
            { id: "msg-bus", from: "msg", to: "bus", label: "3. định tuyến" },
            { id: "bus-wsb", from: "bus", to: "ws-b", label: "4. deliver" },
            { id: "wsb-clientb", from: "ws-b", to: "client-b", label: "5. nhận" },
            { id: "wsa-presence", from: "ws-a", to: "presence", label: "heartbeat", dashed: true },
            { id: "wsb-presence", from: "ws-b", to: "presence", dashed: true },
          ],
        },
        { type: "h2", text: "Luồng request" },
        {
          type: "ul",
          items: [
            "Kết nối: client mở WebSocket (wss) đến gateway. Sau bước bắt tay, HTTP Upgrade trả về 101 Switching Protocols và thiết lập kênh hai chiều. Gateway ghi nhận người dùng trong bảng định tuyến cùng thông tin server đang giữ kết nối.",
            "Gửi tin: client gửi tin qua WebSocket kèm message_id; message service kiểm tra idempotency key, gán seq cho hội thoại, lưu tin bền vững rồi gửi ack cho người gửi (trạng thái sent).",
            "Giao tin: message service tra bảng định tuyến để xác định gateway của người nhận, rồi gửi tin qua pub/sub. Gateway chuyển tin qua kết nối WebSocket và người nhận gửi ack (trạng thái delivered). Nếu người nhận offline, tin được giữ lại để giao khi họ kết nối lại.",
            "Đọc lại: khi kết nối lại (reconnect), client gửi seq cuối cùng đã nhận. Server trả về các tin có seq lớn hơn từ Message Store, nên không cần đồng bộ lại toàn bộ lịch sử.",
            "Presence: gateway định kỳ cập nhật key presence bằng heartbeat. Nếu key hết hạn vì không nhận heartbeat, người dùng được xem là offline.",
          ],
        },
        { type: "h2", text: "Điểm nghẽn và failure modes" },
        {
          type: "ul",
          items: [
            "WebSocket duy trì trạng thái: nếu server gặp sự cố, toàn bộ kết nối của server đó sẽ bị ngắt. Client cần kết nối lại (reconnect) với backoff; gateway cũng cần được nhân bản để tránh trở thành điểm lỗi đơn.",
            "Định tuyến đến đúng server: nếu thiếu bảng định tuyến hoặc pub/sub backplane, tin nhắn gửi cho người đang kết nối qua gateway khác sẽ không đến được. Vì vậy cần có lớp định tuyến dùng chung.",
            "Thứ tự: đồng hồ các máy có thể không đồng bộ, nên không thể dựa vào thời gian để sắp xếp tin. Hãy dùng số thứ tự tăng dần theo hội thoại; chỉ cần bảo đảm thứ tự trong từng hội thoại.",
            "Tin nhắn trùng: timeout rồi retry có thể tạo hai bản ghi. Dùng idempotency key ở server và lọc theo message_id ở client.",
            "Mất tin: nếu gửi ack trước khi lưu bền vững, tin có thể mất khi server gặp sự cố. Phải lưu trước rồi mới gửi ack (at-least-once), đồng thời chấp nhận khả năng gửi lặp.",
            "Presence không chính xác: heartbeat quá thưa khiến trạng thái offline cập nhật chậm; quá dày lại tốn tài nguyên. Hãy chọn chu kỳ và timeout phù hợp, đồng thời xem presence là giá trị ước lượng.",
            "Nhóm lớn: một tin nhắn cần được fan-out đến nhiều thành viên; có thể đưa việc này vào queue để không chặn luồng gửi.",
          ],
        },
        { type: "h2", text: "Đánh đổi và cách tiến hóa" },
        {
          type: "ul",
          items: [
            "WebSocket có độ trễ thấp và hỗ trợ giao tiếp hai chiều, nhưng kết nối có trạng thái nên khó scale; polling đơn giản hơn nhưng làm tăng độ trễ và số request. Trên thực tế, chat gần như luôn dùng WebSocket.",
            "Lưu bền vững đồng bộ tăng độ tin cậy nhưng cũng làm tăng độ trễ gửi; có thể đưa thao tác ghi vào queue nếu chấp nhận tin đến muộn hơn một chút.",
            "At-least-once dễ triển khai hơn exactly-once; chọn at-least-once rồi chống trùng ở phía nhận là cách thực tế.",
            "Chia Message Store thành shard theo conversation_id để phân tải và lưu tin của cùng một hội thoại trên cùng shard, thuận tiện bảo đảm thứ tự.",
            "Tách WS gateway khỏi message service để mở rộng từng tầng độc lập; lưu ảnh/video trong object storage và chỉ lưu URL trong tin nhắn.",
            "Mã hóa đầu cuối bảo vệ nội dung nhưng hạn chế khả năng tìm kiếm và xử lý phía server, vì server không thể đọc nội dung.",
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Dùng WebSocket cho realtime; đổi lại cần quản lý kết nối có trạng thái và hỗ trợ reconnect.",
            "Lưu tin bền vững trước rồi mới ack; dùng idempotency key để tránh xử lý trùng khi retry.",
            "Dùng số thứ tự theo hội thoại để giữ đúng thứ tự; pub/sub định tuyến tin đến đúng gateway.",
            "Nếu người nhận offline, giữ tin để giao khi họ kết nối lại; presence chỉ là ước lượng, dựa trên heartbeat và TTL.",
          ],
        },
      ],
    },
  ],
};
