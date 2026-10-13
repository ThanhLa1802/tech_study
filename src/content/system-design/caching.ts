import type { CourseModule } from "@/lib/course-types";

export const sdCachingModule: CourseModule = {
  id: "sd-caching",
  title: "Caching",
  lessons: [
    {
      slug: "sd-what-is-caching",
      title: "Caching là gì?",
      module: "Caching",
      group: "Kiến thức nền tảng",
      summary: "Vì sao cache hiệu quả: giữ dữ liệu nóng ở nơi nhanh, giảm latency và tải.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "Cache là một lớp lưu dữ liệu nóng — dữ liệu được truy cập nhiều hoặc cần phản hồi nhanh — ở nơi truy xuất nhanh hơn nguồn chính. Cache có thể nằm trong CPU, ứng dụng, database, trình duyệt hoặc CDN; RAM là lựa chọn phổ biến, không phải nơi duy nhất.",
        },
        {
          type: "p",
          text: "Cache hit xảy ra khi cache có dữ liệu cần đọc; cache miss là khi phải lấy dữ liệu từ nguồn chậm hơn, chẳng hạn database. Hit rate (tỉ lệ hit) chỉ hữu ích khi xét cùng mẫu truy cập (workload) và latency thực tế: một cache có hit rate cao vẫn có thể không đáng dùng nếu hit không tiết kiệm được bao nhiêu thời gian.",
        },
        { type: "h2", text: "Cache nằm ở đâu?" },
        {
          type: "p",
          text: "Mỗi tầng cache đánh đổi khác nhau. Cache trong CPU hoặc trong tiến trình ứng dụng thường rất nhanh nhưng có phạm vi nhỏ; cache dùng chung giữa nhiều máy dễ chia sẻ dữ liệu hơn nhưng thêm một bước qua mạng và một dependency cần vận hành.",
        },
        {
          type: "ul",
          items: [
            "CPU cache giữ dữ liệu gần bộ xử lý; browser cache giữ tài nguyên web trên thiết bị người dùng.",
            "Application cache có thể giữ kết quả tính toán hoặc dữ liệu thường đọc; database cũng có cache riêng.",
            "CDN cache đặt nội dung gần người dùng; distributed cache chia dữ liệu nóng giữa nhiều máy chủ ứng dụng.",
            "Chọn tầng theo dữ liệu, phạm vi chia sẻ, độ mới cần thiết và chi phí vận hành — không chỉ theo tốc độ tối đa.",
          ],
        },
        {
          type: "p",
          text: "Ví dụ, trang sản phẩm có thể lưu thông tin danh mục được nhiều người cùng xem vào cache, trong khi giỏ hàng cá nhân hóa thường không phù hợp với cache dùng chung. Cache giúp giảm thời gian đọc và tải nguồn chính, nhưng tiêu tốn bộ nhớ, có thể trả dữ liệu cũ và cần xử lý khi cache chậm hoặc ngừng hoạt động.",
        },
        { type: "h2", text: "Đo hiệu quả theo workload" },
        {
          type: "ul",
          items: [
            "Theo dõi hit rate cùng p95/p99 (độ trễ mà 95%/99% request không vượt quá), tải database, dung lượng cache và chi phí làm mới dữ liệu.",
            "Một cache miss vẫn cần đọc nguồn chính; nếu nhiều key cùng miss sau khi khởi động lại (cache lạnh, chưa được nạp dữ liệu), database có thể bị dồn tải.",
          ],
        },
        { type: "h2", text: "Tự kiểm tra" },
        {
          type: "ul",
          items: [
            "Hit rate cao có luôn đồng nghĩa với latency tốt hơn không? Vì sao?",
            "Điều gì có thể xảy ra với database khi một cache vừa khởi động và chưa có dữ liệu?",
          ],
        },
      ],
    },
    {
      slug: "sd-caching-strategies",
      title: "Chiến lược caching",
      module: "Caching",
      group: "Kiến thức nền tảng",
      summary:
        "Cache-aside, read-through, write-through, write-behind và write-around.",
      duration: "8 phút",
      visualizer: "cache-aside",
      blocks: [
        { type: "h2", text: "Chiến lược" },
        {
          type: "ul",
          items: [
            "Cache-aside (lazy, nạp khi cần): đọc cache trước; nếu miss thì đọc DB rồi ghi kết quả vào cache. Khi cập nhật theo cách này, thường ghi DB rồi xóa entry cache để lần đọc sau nạp lại.",
            "Read-through: ứng dụng đọc qua cache và cache tự lấy từ nguồn khi miss. Refresh-ahead chủ động làm mới dữ liệu sắp hết hạn để giảm miss, nhưng có thể làm mới dữ liệu không còn được yêu cầu.",
            "Write-through: trong request ghi, cập nhật DB và cache cùng nhau; cách phối hợp cụ thể quyết định độ trễ. Điều này không tự bảo đảm strong consistency (nhất quán mạnh) hay tính nguyên tử giữa hai nơi.",
            "Write-behind: xác nhận sau khi ghi cache rồi ghi DB sau; nhanh hơn nhưng cache tạm thời là nguồn sự thật, nên lỗi trước khi flush (ghi đẩy xuống DB) có thể làm mất write.",
            "Write-around: ghi thẳng DB, không nạp cache lúc ghi; tránh cache dữ liệu ít được đọc nhưng lần đọc kế tiếp có thể bị miss.",
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
        {
          type: "diagram",
          nodes: [
            { id: "client", label: "Client", sub: "gửi yêu cầu", tone: "sky", x: 20, y: 126, w: 110, h: 54 },
            { id: "cache", label: "Cache", sub: "kiểm tra", tone: "amber", x: 220, y: 126, w: 110, h: 54 },
            { id: "database", label: "Database", sub: "khi cache miss", tone: "amber", x: 420, y: 220, w: 120, h: 54 },
            { id: "cache-fill", label: "Cache", sub: "ghi kết quả", tone: "amber", x: 580, y: 32, w: 110, h: 54 },
            { id: "client-response", label: "Client", sub: "nhận dữ liệu", tone: "sky", x: 620, y: 126, w: 110, h: 54 },
          ],
          edges: [
            { id: "client-cache", from: "client", to: "cache", label: "yêu cầu" },
            { id: "cache-client-response", from: "cache", to: "client-response", label: "hit: trả dữ liệu" },
            { id: "cache-database", from: "cache", to: "database", label: "miss: truy vấn" },
            { id: "database-cache-fill", from: "database", to: "cache-fill", label: "kết quả" },
            { id: "cache-fill-client-response", from: "cache-fill", to: "client-response", label: "trả dữ liệu" },
          ],
          caption:
            "Cache hit thì trả dữ liệu ngay; khi miss, truy vấn database, ghi kết quả vào cache rồi trả dữ liệu về client.",
        },
        { type: "h2", text: "Chọn chiến lược theo kiểu truy cập" },
        {
          type: "p",
          text: "Cache-aside là lựa chọn nhập môn phổ biến vì ứng dụng chủ động quyết định key nào cần cache. Ví dụ, trang danh mục đọc cache trước; khi miss, ứng dụng truy vấn DB, lưu kết quả rồi trả về. Khi cập nhật danh mục, thường ghi DB rồi xóa entry thay vì tự set lại cache, nhưng hai thao tác không có giao dịch chung (transaction): lần đọc đồng thời vẫn có thể nạp dữ liệu cũ trở lại cache.",
        },
        {
          type: "ul",
          items: [
            "Dùng read-through khi muốn gom logic nạp dữ liệu vào cache; cần biết rõ cache xử lý lỗi nguồn như thế nào.",
            "Dùng refresh-ahead khi việc miss gây tốn kém và có thể dự đoán dữ liệu sắp cần; đổi lại có thể tạo tải làm mới không cần thiết.",
            "Write-through phù hợp khi cần cập nhật cache ngay trong luồng ghi, nhưng lỗi giữa hai lần ghi vẫn có thể tạo trạng thái lệch nếu không có cơ chế phối hợp.",
            "Write-behind hợp với một số dữ liệu chấp nhận ghi trễ; cần tính đến hàng đợi tồn đọng, flush lỗi và khôi phục dữ liệu.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Cache-aside khi đọc: cache → miss → DB → set cache\nCache-aside khi ghi: DB → delete cache entry",
            },
          ],
        },
        { type: "h2", text: "Tự kiểm tra" },
        {
          type: "ul",
          items: [
            "Với dữ liệu chỉ thỉnh thoảng mới được đọc, vì sao write-around có thể hợp lý?",
            "Vì sao ghi DB rồi xóa cache vẫn chưa loại bỏ mọi race condition?",
          ],
        },
      ],
    },
    {
      slug: "sd-cache-eviction-policies",
      title: "Chính sách loại bỏ cache",
      module: "Caching",
      group: "Kiến thức nền tảng",
      summary: "LRU, LFU, FIFO và khác biệt giữa loại bỏ với hết hạn TTL.",
      duration: "7 phút",
      blocks: [
        { type: "h2", text: "Thuật toán loại bỏ" },
        {
          type: "ul",
          items: [
            "LRU (Least Recently Used): ưu tiên loại entry lâu chưa được truy cập; phù hợp khi dữ liệu vừa dùng thường sẽ sớm được dùng lại.",
            "LFU (Least Frequently Used): ưu tiên giữ entry được truy cập thường xuyên; có thể giữ dữ liệu từng rất hot dù gần đây nhu cầu đã giảm.",
            "FIFO (First In, First Out): loại entry được đưa vào sớm nhất, đơn giản nhưng không xét mức độ truy cập; Random chọn ngẫu nhiên, dễ thực hiện nhưng có thể loại trúng dữ liệu đang hữu ích.",
          ],
        },
        {
          type: "p",
          text: "Cần phân biệt TTL/expiry (hết hạn theo thời gian) với eviction (loại bỏ do thiếu dung lượng). Entry có thể hết TTL dù cache còn chỗ; ngược lại, cache có thể loại entry chưa hết hạn để nhường chỗ.",
        },
        { type: "h2", text: "Chính sách nào phù hợp?" },
        {
          type: "ul",
          items: [
            "Nếu lượt truy cập gần đây dự báo tốt nhu cầu tiếp theo, LRU là điểm bắt đầu dễ hiểu.",
            "Nếu một nhóm nhỏ key được đọc lặp đi lặp lại, LFU có thể giữ nhóm đó lâu hơn; cân nhắc việc tần suất cũ không còn phản ánh nhu cầu hiện tại.",
            "FIFO và Random có thể đơn giản, nhưng không tận dụng đầy đủ thông tin về mức độ sử dụng.",
            "Hệ thống vận hành thực tế (production) thường dùng cách tính gần đúng để giảm chi phí theo dõi; tên chính sách không đảm bảo mọi triển khai có hành vi giống hệt nhau.",
          ],
        },
        {
          type: "p",
          text: "Ví dụ: với cache sản phẩm, sản phẩm vừa được xem có thể sớm được xem lại nên LRU là lựa chọn dễ thử. Nếu một số sản phẩm luôn phổ biến, LFU có thể có ích; tuy nhiên, chính sách nào cũng có thể giữ nhầm dữ liệu hoặc loại key đang cần. Hãy xem hit rate theo workload, latency và tải nguồn thay vì chọn thuật toán chỉ theo tên.",
        },
        { type: "h2", text: "Tự kiểm tra" },
        {
          type: "ul",
          items: [
            "Cache còn dung lượng nhưng một entry hết TTL: đây là expiry hay eviction?",
            "Vì sao LFU có thể giữ lại dữ liệu không còn phổ biến?",
          ],
        },
      ],
    },
    {
      slug: "sd-cache-invalidation",
      title: "Vô hiệu hóa cache",
      module: "Caching",
      group: "Kiến thức nền tảng",
      summary:
        "Quản lý dữ liệu cache cũ bằng TTL, xóa khi ghi và xử lý nhiều request miss cùng lúc.",
      duration: "8 phút",
      visualizer: "cache-stampede",
      blocks: [
        { type: "h2", text: "Nhất quán và invalidation" },
        {
          type: "ul",
          items: [
            "TTL (time to live, thời gian sống): giới hạn thời gian một entry được xem là còn hạn; hết TTL không nhất thiết có nghĩa entry đã bị xóa ngay khỏi bộ nhớ.",
            "Invalidation (vô hiệu hóa cache): chủ động xóa hoặc làm mới bản sao. Với cache-aside, thường ghi DB rồi xóa entry; vì không có transaction chung, race giữa lần đọc và lần ghi vẫn có thể đưa dữ liệu cũ trở lại cache.",
            "Cache stampede (thundering herd) là tình trạng nhiều request cùng miss một key nóng rồi đồng loạt truy vấn nguồn. Có thể gom các request để chỉ một request nạp dữ liệu (request coalescing/single-flight), hoặc dùng lock có giới hạn.",
          ],
        },
        { type: "h2", text: "Kết hợp các cách làm mới" },
        {
          type: "p",
          text: "Cache là bản sao của dữ liệu nguồn, nên một khoảng thời gian dữ liệu cũ (stale) có thể chấp nhận được tùy sản phẩm. TTL xác định thời gian entry được xem là còn hạn; xóa entry sau khi ghi và phát sự kiện (event)/purge khi dữ liệu đổi giúp cập nhật sớm hơn, nhưng mỗi cơ chế đều có thể trễ hoặc thất bại.",
        },
        {
          type: "ul",
          items: [
            "Thêm jitter (độ lệch ngẫu nhiên) vào TTL để nhiều entry không cùng hết hạn một lúc.",
            "Làm mới sớm hoặc dùng stale-while-revalidate: trả bản cũ trong lúc một request làm mới ở nền, nếu nghiệp vụ cho phép.",
            "Dùng negative caching để cache kết quả “không tìm thấy” trong thời gian ngắn; điều này tránh truy vấn lặp cho key không tồn tại, nhưng TTL dài có thể che mất dữ liệu vừa được tạo.",
            "Theo dõi miss, lỗi làm mới, độ cũ của dữ liệu và tải nguồn; cache phải có phương án khi nguồn hoặc cache gặp sự cố.",
          ],
        },
        {
          type: "p",
          text: "Ví dụ, nếu nhiều request hỏi cùng một hồ sơ hết hạn, single-flight cho phép một request đọc DB và các request còn lại chờ chung kết quả. Cách này giảm tải đột biến nhưng request chờ có thể tăng latency; stale-while-revalidate giảm thời gian chờ nếu chấp nhận trả dữ liệu cũ trong chốc lát.",
        },
        { type: "h2", text: "Tự kiểm tra" },
        {
          type: "ul",
          items: [
            "TTL và invalidation khác nhau ở điểm nào?",
            "Khi nào stale-while-revalidate không phù hợp với dữ liệu cần chính xác tức thời?",
          ],
        },
      ],
    },
    {
      slug: "sd-cdn",
      title: "Content Delivery Network (CDN)",
      module: "Caching",
      group: "Caching phân tán",
      summary:
        "Mạng phân phối nội dung: cache ở biên, giảm latency và bảo vệ origin.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "CDN (Content Delivery Network) là mạng lưới server đặt gần người dùng, phục vụ nội dung tĩnh và thường tăng tốc cả phản hồi động. Chỉ cache nội dung động khi có thể chia sẻ an toàn giữa các request và đã được cấu hình phù hợp.",
        },
        { type: "h2", text: "Lợi ích" },
        {
          type: "ul",
          items: [
            "Giảm latency nhờ phục vụ từ điểm gần người dùng nhất.",
            "Giảm tải cho origin server.",
            "Có thể hấp thụ một phần lưu lượng tăng đột biến và hỗ trợ giảm tác động của một số kiểu tấn công; CDN không thay thế giải pháp bảo vệ DDoS chuyên dụng.",
          ],
        },
        { type: "h2", text: "Cache ở biên" },
        {
          type: "ul",
          items: [
            "Kiểm soát thời gian lưu bằng Cache-Control/TTL và purge (xóa cache chủ động) khi nội dung đổi.",
            "Version hóa bằng query string (ví dụ ?v=2) chỉ hiệu quả nếu query string nằm trong cache key của CDN; dùng tên file hoặc đường dẫn có version thường đáng tin cậy hơn.",
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
        {
          type: "diagram",
          nodes: [
            { id: "user", label: "User", sub: "gửi request", tone: "sky", x: 20, y: 126, w: 110, h: 54 },
            { id: "edge", label: "CDN Edge", sub: "gần nhất · kiểm tra", tone: "violet", x: 220, y: 126, w: 120, h: 54 },
            { id: "origin", label: "Origin", sub: "nguồn nội dung", tone: "amber", x: 420, y: 220, w: 110, h: 54 },
            { id: "edge-cache", label: "CDN Edge", sub: "cache nội dung", tone: "amber", x: 580, y: 32, w: 120, h: 54 },
            { id: "user-response", label: "User", sub: "nhận nội dung", tone: "sky", x: 620, y: 126, w: 110, h: 54 },
          ],
          edges: [
            { id: "user-edge", from: "user", to: "edge", label: "yêu cầu" },
            { id: "edge-user-response", from: "edge", to: "user-response", label: "hit: trả nội dung" },
            { id: "edge-origin", from: "edge", to: "origin", label: "miss: lấy từ origin" },
            { id: "origin-edge-cache", from: "origin", to: "edge-cache", label: "nội dung" },
            { id: "edge-cache-user-response", from: "edge-cache", to: "user-response", label: "cache rồi trả về" },
          ],
          caption:
            "Cache hit thì CDN trả nội dung từ edge gần nhất; nếu miss, lấy nội dung từ origin, cache tại edge rồi trả về người dùng.",
        },
        { type: "h2", text: "Cache key quyết định hit" },
        {
          type: "p",
          text: "Edge chỉ dùng lại một bản cache khi request khớp cache key (khóa xác định bản cache tương ứng). Key thường dựa trên URL; tùy cấu hình, query string, header hoặc cookie cũng có thể được đưa vào. Header Vary (chỉ định header request nào tạo biến thể phản hồi) có thể yêu cầu tách nội dung, chẳng hạn theo kiểu nén hoặc ngôn ngữ. Thêm quá nhiều yếu tố làm key phân mảnh và giảm hit; bỏ yếu tố cần thiết có thể khiến trả nhầm nội dung.",
        },
        {
          type: "ul",
          items: [
            "Cache-Control: public cho phép cache chia sẻ nếu các điều kiện khác cho phép; private dành cho cache riêng của người dùng, còn no-store yêu cầu không lưu.",
            "s-maxage đặt thời gian dữ liệu còn mới cho shared cache như CDN; không biến nội dung cá nhân hóa thành an toàn để chia sẻ.",
            "Query string phiên bản chỉ tạo key khác nếu CDN đưa query vào cache key. Đổi tên file hoặc đường dẫn có version thường ít phụ thuộc cấu hình này hơn.",
            "Purge hoặc invalidation hữu ích khi cần gỡ nội dung trước khi TTL hết hạn; cần xác định rõ phạm vi key/biến thể bị xóa.",
          ],
        },
        {
          type: "p",
          text: "Ví dụ, ảnh logo dùng chung có thể cache công khai với đường dẫn có version. Ngược lại, trang tài khoản có thông tin riêng không được cache công khai; nếu cấu hình key sai, người dùng có thể nhận nội dung của người khác. Cache rộng giúp tăng hit và giảm tải origin nhưng đòi hỏi kiểm tra kỹ quyền riêng tư và độ mới của dữ liệu.",
        },
        { type: "h2", text: "Tự kiểm tra" },
        {
          type: "ul",
          items: [
            "Vì sao thêm cookie vào cache key có thể làm giảm hit rate?",
            "Nội dung tài khoản cá nhân có phù hợp với shared cache công khai không?",
          ],
        },
      ],
    },
    {
      slug: "sd-distributed-cache-architecture",
      title: "Kiến trúc cache phân tán",
      module: "Caching",
      group: "Caching phân tán",
      summary:
        "Trải dữ liệu cache qua nhiều node: consistent hashing, replication và hot key.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Khi một cache không đủ, dữ liệu được trải ra nhiều node cache — đó là cache phân tán. Dữ liệu được chia theo key để mỗi node chỉ giữ một phần.",
        },
        {
          type: "ul",
          items: [
            "Consistent hashing: đặt cả key lẫn node lên một vòng tròn và map mỗi key tới node kế tiếp, nên khi thêm hoặc bớt node chỉ một phần key phải di chuyển.",
            "Replication (nhân bản): giữ bản sao trên nhiều node để tăng khả năng phục vụ khi node gặp sự cố hoặc chia tải đọc. Replica không đảm bảo durability (độ bền dữ liệu); nếu replication bất đồng bộ, write mới có thể mất trong khoảng thời gian chưa được sao chép.",
            "Hot key là key bị truy cập dồn dập; big key là key có giá trị lớn. Hot key gây nghẽn vì tần suất, còn big key tốn bộ nhớ/băng thông — cần biện pháp khác nhau.",
          ],
        },
        { type: "h2", text: "Giảm rủi ro khi cache phân tán" },
        {
          type: "ul",
          items: [
            "Consistent hashing giúp giới hạn lượng key phải chuyển khi thêm hoặc bớt node, nhưng không loại bỏ miss trong lúc phân vùng được thay đổi.",
            "Replication tăng availability (khả năng tiếp tục phục vụ) hoặc khả năng đọc; với sao chép bất đồng bộ, có một cửa sổ mà node chính đã nhận write nhưng replica chưa có.",
            "Cache thường chứa dữ liệu có thể tạo lại từ nguồn chính; đừng xem nhiều replica là bản sao lưu bền vững nếu hệ thống không cam kết điều đó.",
            "Khi node hỏng hoặc cache khởi động lạnh, miss có thể dồn về DB. Jitter/refresh sớm, nạp cache trước có kiểm soát (cache warming), load shedding (chủ động từ chối một phần request khi quá tải) và degrade (giảm chức năng có chủ đích) giúp bảo vệ nguồn.",
          ],
        },
        {
          type: "p",
          text: "Ví dụ, một bài viết rất phổ biến có thể là hot key và làm nghẽn node dù giá trị nhỏ; phân tán lượt đọc qua nhiều bản sao hoặc thêm cache cục bộ có thể giảm tải. Một key chứa danh sách cực lớn là big key; chia nhỏ dữ liệu hoặc giới hạn kích thước có thể phù hợp hơn. Nhân bản và thêm tầng cache giúp tăng khả năng phục vụ nhưng làm phức tạp việc làm mới, đo độ mới của dữ liệu và xử lý lỗi.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "key → consistent hash → cache node\nnode failure / cold cache → misses → DB (protect with limits and gradual warming)",
            },
          ],
        },
        { type: "h2", text: "Tự kiểm tra" },
        {
          type: "ul",
          items: [
            "Replication bất đồng bộ có loại bỏ hoàn toàn khả năng mất write mới không?",
            "Hot key và big key gây áp lực lên cache theo hai cách nào?",
          ],
        },
      ],
    },
  ],
};
