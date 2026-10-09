import type { CourseModule } from "@/lib/course-types";

export const sdFoundationsModule: CourseModule = {
  id: "sd-foundations",
  title: "Introduction to System Design",
  lessons: [
    {
      slug: "sd-what-is-system-design",
      title: "What is System Design?",
      module: "Introduction to System Design",
      summary:
        "System design thực sự là gì, vì sao nó quan trọng, và cách tư duy từ yêu cầu tới kiến trúc qua ví dụ ứng dụng chia sẻ ảnh.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "Hãy tưởng tượng bạn xây một ứng dụng chia sẻ ảnh: người dùng đăng ký, đăng ảnh, theo dõi nhau và xem feed ảnh từ những người họ theo dõi. Bạn viết code, deploy tất cả trên một server — và nó chạy hoàn hảo cho vài nghìn người dùng đầu tiên.",
        },
        {
          type: "p",
          text: "Nhưng khi mười triệu người truy cập mỗi ngày, code upload ảnh có thể không đổi, còn những bài toán cần giải thì khác hoàn toàn.",
        },
        { type: "h2", text: "Vấn đề" },
        {
          type: "ul",
          items: [
            "Lưu trữ: hàng trăm terabyte ảnh sẽ để ở đâu?",
            "Sự cố: điều gì xảy ra khi server đang chạy ứng dụng bị sập?",
            "Khoảng cách: làm sao giữ feed nhanh cho người ở Ấn Độ khi server đặt ở Mỹ?",
            "Tăng vọt: điều gì xảy ra khi một tài khoản nổi tiếng đăng ảnh và một triệu người cùng xem?",
          ],
        },
        {
          type: "p",
          text: "Những bài toán này không còn giải được bên trong một hàm đơn lẻ. Chúng phụ thuộc vào cách toàn bộ hệ thống được thiết kế và cách các thành phần phối hợp với nhau.",
        },
        { type: "h2", text: "System design là gì" },
        {
          type: "p",
          text: "System design là quá trình quyết định một hệ thống cần những thành phần nào, mỗi thành phần chịu trách nhiệm gì, chúng giao tiếp ra sao và dữ liệu chảy giữa chúng thế nào để hệ thống đáp ứng được yêu cầu.",
        },
        {
          type: "p",
          text: "Nó ở tầng cao hơn việc viết code. Khi viết code, bạn nghĩ về hàm, lớp, cấu trúc dữ liệu và thuật toán. Khi thiết kế hệ thống, bạn nghĩ về server, database, cache, queue, lưu trữ và mạng kết nối chúng.",
        },
        {
          type: "ul",
          items: [
            "Khối xây dựng — Viết code: hàm, lớp, cấu trúc dữ liệu. Thiết kế hệ thống: server, database, cache, queue, storage.",
            "Kết nối — Viết code: gọi hàm, giá trị trả về. Thiết kế hệ thống: network request, message, replication.",
            "Câu hỏi điển hình — Viết code: thuật toán này đúng và hiệu quả chưa? Thiết kế hệ thống: các thành phần có chịu được tải không, và khi một cái hỏng thì sao?",
          ],
        },
        {
          type: "p",
          text: "Bạn còn phải tính đến điều gì xảy ra khi một thành phần chậm hoặc hỏng, và hệ thống hành xử ra sao khi lưu lượng và dữ liệu tăng lên. Một thiết kế tốt cho một server ngày thường phải vẫn chạy tốt khi database chậm, một server sập, hay lưu lượng tăng gấp đôi qua một đêm.",
        },
        { type: "h2", text: "Bắt đầu từ yêu cầu" },
        {
          type: "p",
          text: "Mọi thiết kế hệ thống đều bắt đầu từ yêu cầu, vì bạn không thể đánh giá một thiết kế khi chưa biết hệ thống cần làm gì. Yêu cầu thường chia thành hai nhóm.",
        },
        {
          type: "p",
          text: "Yêu cầu chức năng (functional) mô tả hệ thống làm gì. Với ứng dụng ảnh: đăng ảnh, theo dõi người khác, like bài viết và xem feed.",
        },
        {
          type: "p",
          text: "Yêu cầu phi chức năng (non-functional) mô tả hệ thống làm tốt đến đâu: feed tải dưới 200 ms, ứng dụng vẫn hoạt động khi một server hỏng, và ảnh đã đăng không bị mất.",
        },
        {
          type: "p",
          text: "Hai nhóm này ảnh hưởng tới thiết kế theo hai cách khác nhau. Yêu cầu chức năng quyết định bạn cần những tính năng, API và thành phần nào; mỗi tính năng thường ứng với một API, và mỗi API chạm vào những phần nhất định của hệ thống.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Tính năng      API             Thành phần liên quan\nĐăng ảnh       POST /photos    App server, database, object storage\nTheo dõi       POST /follows   App server, database\nLike bài viết  POST /likes     App server, database\nXem feed       GET  /feed      App server, cache, database",
            },
          ],
        },
        {
          type: "p",
          text: "Yêu cầu phi chức năng định hình cách các thành phần được thiết kế, cần bao nhiêu dung lượng, xử lý lỗi thế nào và đặt hệ thống ở đâu. Mục tiêu feed 200 ms có thể đẩy bạn tới một cache; yêu cầu sẵn sàng nghĩa là bạn cần nhiều hơn một server; yêu cầu bền vững ảnh hưởng tới cách và nơi lưu ảnh.",
        },
        {
          type: "p",
          text: "Một cạm bẫy phổ biến là bắt đầu từ công nghệ: 'Dùng Kafka, Redis, Kubernetes và Cassandra.' Cách tốt hơn là bắt đầu từ yêu cầu: 'Ta cần xử lý lượng ghi lớn, hấp thụ đỉnh lưu lượng và xử lý sự kiện bất đồng bộ' — điều đó dẫn tới một hàng đợi hoặc hệ thống dựa trên log.",
        },
        { type: "h2", text: "Các khối xây dựng" },
        {
          type: "p",
          text: "Hầu hết hệ thống lớn đều được ghép từ một tập nhỏ các khối chung. Đây là cách chúng khớp với nhau trong ứng dụng chia sẻ ảnh:",
        },
        {
          type: "ul",
          items: [
            "Clients: app di động và trình duyệt gửi request tới hệ thống.",
            "DNS: dịch tên miền thành địa chỉ của một server.",
            "Load balancer: phân phối request đến nhiều application server.",
            "Application servers: chạy logic nghiệp vụ.",
            "Databases: lưu dữ liệu có cấu trúc như người dùng, follow và metadata của ảnh.",
            "Object storage: chứa các file lớn như chính ảnh.",
            "Caches: giữ dữ liệu hay đọc trong bộ nhớ để không phải truy vấn database mỗi lần.",
            "CDN: lưu bản sao nội dung tĩnh (ảnh) ở server gần người dùng để giao nhanh hơn.",
            "Message queues: đẩy việc không cần xong ngay ra chạy nền, để người dùng không phải chờ.",
          ],
        },
        {
          type: "p",
          text: "Phần lớn system design là quyết định bạn cần những khối nào và chúng nên phối hợp với nhau ra sao.",
        },
        { type: "h2", text: "Một request đi qua hệ thống" },
        {
          type: "p",
          text: "Xét luồng upload ảnh. Request đi qua load balancer tới một application server. Server lưu metadata (chủ sở hữu, caption, thời gian) vào database, rồi tạo một pre-signed URL cho phép upload ảnh trực tiếp lên object storage. Byte của ảnh không đi qua application server, nhờ đó upload lớn không chiếm giữ server.",
        },
        {
          type: "p",
          text: "Khi upload xong, hệ thống đặt một job vào message queue. Các worker chạy nền nhận job và xử lý những việc chậm hơn như tạo thumbnail hoặc cập nhật feed của người theo dõi.",
        },
        {
          type: "p",
          text: "Luồng đọc feed đi theo con đường khác. Khi người dùng mở feed, application server kiểm tra cache trước để lấy danh sách bài viết. Nếu không có, nó đọc từ database rồi lưu lại vào cache cho các request sau. Bản thân ảnh được phục vụ qua CDN, nên người dùng tải từ server gần họ thay vì lấy mọi ảnh từ hệ thống lưu trữ gốc.",
        },
        {
          type: "diagram",
          caption: "Kiến trúc ứng dụng chia sẻ ảnh ở quy mô lớn.",
          nodes: [
            { id: "client", label: "Clients", x: 20, y: 150, w: 100, h: 54 },
            { id: "lb", label: "Load Balancer", x: 160, y: 150, w: 110, h: 54 },
            { id: "app", label: "App Server", x: 310, y: 150, w: 120, h: 54 },
            { id: "db", label: "Database", x: 490, y: 30, w: 130, h: 54 },
            {
              id: "obj",
              label: "Object Storage",
              x: 490,
              y: 120,
              w: 130,
              h: 54,
            },
            { id: "queue", label: "Message Queue", x: 490, y: 210, w: 130, h: 54 },
            { id: "worker", label: "Worker", x: 490, y: 300, w: 130, h: 54 },
            { id: "cdn", label: "CDN", x: 160, y: 280, w: 110, h: 54 },
          ],
          edges: [
            { id: "client-lb", from: "client", to: "lb" },
            { id: "lb-app", from: "lb", to: "app" },
            { id: "app-db", from: "app", to: "db" },
            { id: "app-obj", from: "app", to: "obj" },
            { id: "app-queue", from: "app", to: "queue" },
            { id: "queue-worker", from: "queue", to: "worker" },
            { id: "cdn-client", from: "cdn", to: "client", label: "ảnh" },
          ],
        },
        {
          type: "p",
          text: "Mỗi thành phần tồn tại vì một lý do:",
        },
        {
          type: "ul",
          items: [
            "CDN: giảm độ trễ khi tải ảnh.",
            "Message queue: giữ việc chậm ra khỏi đường đi của request.",
            "Cache: giảm tải database cho các lần đọc lặp lại.",
            "Object storage: cho ta nơi lưu file lớn có thể mở rộng.",
          ],
        },
        { type: "h2", text: "Ta thiết kế để đạt điều gì" },
        {
          type: "ul",
          items: [
            "Scalability (khả năng mở rộng): xử lý thêm người dùng, lưu lượng và dữ liệu khi nhu cầu tăng.",
            "Availability (tính sẵn sàng): hệ thống vẫn truy cập được khi người dùng cần, kể cả khi vài thành phần hỏng.",
            "Reliability (độ tin cậy): hệ thống tiếp tục hành xử đúng, không mất, không nhân đôi và không làm hỏng dữ liệu.",
            "Performance (hiệu năng): độ trễ (một request mất bao lâu) và thông lượng (xử lý được bao nhiêu request mỗi đơn vị thời gian).",
            "Consistency (tính nhất quán): mọi người dùng và dịch vụ thấy cùng một phiên bản dữ liệu mới nhất.",
            "Maintainability (khả năng bảo trì): dễ vận hành, gỡ lỗi, cập nhật và mở rộng theo thời gian.",
            "Cost (chi phí): đáp ứng yêu cầu mà không dùng nhiều server, lưu trữ, băng thông hay công sức hơn mức cần thiết.",
          ],
        },
        { type: "h2", text: "Mọi lựa chọn là một đánh đổi" },
        {
          type: "p",
          text: "Cải thiện một phẩm chất thường phải đánh đổi ở chỗ khác. Ví dụ, thêm cache giảm tải database và khiến việc đọc nhanh hơn nhiều, nhưng dữ liệu cache có thể trở nên cũ cho tới khi được làm mới hoặc hết hạn. Tương tự, thêm replica và dư thừa cải thiện hiệu năng và tính sẵn sàng, nhưng tăng chi phí và khiến hệ thống phức tạp hơn để vận hành.",
        },
        {
          type: "p",
          text: "Hiếm khi có một thiết kế tốt nhất ở mọi mặt. Phần lớn system design là hiểu các đánh đổi này, quyết định phẩm chất nào quan trọng nhất với yêu cầu của bạn, và giải thích được vì sao chọn cách này thay vì cách khác.",
        },
        { type: "h2", text: "Thiết kế tiến hóa dần" },
        {
          type: "p",
          text: "Hệ thống thực tế hiếm khi được xây ở dạng hoàn chỉnh ngay từ đầu. Ứng dụng ảnh có thể bắt đầu với một application server và một database — quá đủ cho vài nghìn người dùng đầu tiên.",
        },
        {
          type: "p",
          text: "Khi sử dụng tăng, các điểm nghẽn dần xuất hiện: database quá tải, phục vụ ảnh quá chậm, việc chạy nền bắt đầu làm chậm request của người dùng. Đó là lúc bạn thêm đúng thành phần để giải quyết vấn đề cụ thể.",
        },
        {
          type: "p",
          text: "Thêm tất cả quá sớm thường tạo ra nhiều phức tạp, nhiều thứ phải gỡ lỗi và chi phí cao hơn mà không đem lại nhiều giá trị. Một thiết kế tốt đáp ứng yêu cầu hiện tại, đồng thời để chỗ để mở rộng khi yêu cầu lớn lên.",
        },
        { type: "h2", text: "Vì sao nên học System Design" },
        {
          type: "p",
          text: "Nếu làm backend, bạn ra quyết định system design mọi lúc, kể cả khi xây tính năng nhỏ. Lấy tính năng Like trong ứng dụng ảnh: bạn có thể phải quyết định có cache số like không, cập nhật đồng bộ trong request hay đẩy vào queue, và điều gì xảy ra nếu lưu lượng tăng vọt vì một người nổi tiếng đăng bài.",
        },
        {
          type: "ul",
          items: [
            "Cache số like? Có — nó được đọc thường xuyên hơn nhiều so với khi thay đổi. Đánh đổi: số like có thể tạm thời cũ.",
            "Cập nhật trong request hay qua queue? Đẩy vào queue để người dùng nhận phản hồi nhanh. Đánh đổi: nhiều thành phần hơn để chạy và giám sát.",
            "Lưu lượng tăng vọt? Thêm server và trải đều tải. Đánh đổi: chi phí cao hơn.",
          ],
        },
        { type: "h2", text: "System Design trong phỏng vấn" },
        {
          type: "p",
          text: "Ở nhiều công ty công nghệ, vòng system design là phần tiêu chuẩn cho kỹ sư mid-level và senior. Đề bài thường mở: thiết kế URL shortener, ứng dụng chat, hoặc ứng dụng chia sẻ ảnh. Bạn thường có 45–60 phút, không có một đáp án đúng duy nhất, và bạn không cần viết code chạy qua test case.",
        },
        {
          type: "p",
          text: "Thay vào đó, bạn đi theo một quy trình:",
        },
        {
          type: "ul",
          items: [
            "Làm rõ yêu cầu: thống nhất tính năng cốt lõi và các mục tiêu phi chức năng trước khi vẽ gì.",
            "Ước lượng quy mô: con số thô về người dùng, request mỗi giây và dung lượng để thấy áp lực nằm ở đâu.",
            "Phác thảo thiết kế mức cao: bắt đầu với các khối chính và cách một request chảy qua chúng.",
            "Đi sâu vào vài chỗ quan trọng: database, caching, luồng dữ liệu hoặc xử lý lỗi.",
          ],
        },
        {
          type: "p",
          text: "Trong suốt quá trình, bạn giải thích quyết định và đánh đổi phía sau. Bạn không cần học thuộc các thiết kế mẫu. Nếu hiểu các khối cốt lõi, bài toán chúng giải và đánh đổi chúng mang lại, bạn có thể suy luận về những hệ thống chưa từng gặp.",
        },
        { type: "h2", text: "Kết luận" },
        {
          type: "p",
          text: "System design là việc lấy một tập yêu cầu, biến chúng thành một hệ thống gồm nhiều thành phần, quyết định cách chúng phối hợp, và đưa ra các đánh đổi đúng cho bài toán bạn đang giải. Ở các phần tiếp theo, ta sẽ đi qua từng khối và khái niệm, hiểu chúng giải quyết vấn đề gì và khi nào nên dùng.",
        },
      ],
    },
    {
      slug: "sd-top-30-concepts",
      title: "30 Must-Know Concepts",
      module: "Introduction to System Design",
      summary:
        "Điểm qua 30 khái niệm system design quan trọng nhất, chia thành 6 nhóm từ mạng, API, lưu trữ, scaling tới hệ phân tán và kiến trúc.",
      duration: "23 phút",
      blocks: [
        {
          type: "p",
          text: "System design thoạt nhìn có vẻ quá tải: hàng trăm khái niệm, vô số công nghệ và vô vàn cách kiến trúc. Tin tốt là bạn không cần biết hết. Hầu hết bài toán system design — dù ngoài thực tế hay trong phỏng vấn — đều dựng trên cùng một tập ý tưởng cốt lõi.",
        },
        {
          type: "p",
          text: "Bài này điểm qua 30 khái niệm quan trọng nhất, chia thành 6 nhóm xây dựng lên nhau: Networking, APIs & Communication, Data Storage, Scaling, Distributed Systems, Architecture Patterns. Hãy coi đây vừa là phần nhập môn, vừa là bản ôn nhanh trước phỏng vấn.",
        },
        { type: "h2", text: "Nhóm 1: Nền tảng mạng" },
        {
          type: "p",
          text: "Trước khi thiết kế bất kỳ hệ thống nào, bạn cần hiểu máy tính nói chuyện với nhau thế nào. Mọi request trong hệ phân tán đều đi qua mạng; sáu khái niệm sau là nền cho tất cả.",
        },
        { type: "h3", text: "1. Mô hình Client–Server" },
        {
          type: "p",
          text: "Client (trình duyệt, app, hoặc một server khác) gửi request; server lắng nghe, xử lý và trả response. Việc tách client/server cho phép thay đổi client mà không đụng server, và scale server độc lập với client.",
        },
        { type: "h3", text: "2. Địa chỉ IP" },
        {
          type: "p",
          text: "Mỗi thiết bị trên Internet có một địa chỉ IP duy nhất để định tuyến. IPv4 (~4.3 tỉ địa chỉ) đã cạn, IPv6 mở ra không gian gần như vô hạn. Trong system design, IP định danh server, load balancer và node database trên mạng.",
        },
        { type: "h3", text: "3. DNS (Domain Name System)" },
        {
          type: "p",
          text: "DNS là 'danh bạ' của Internet: dịch tên miền (google.com) thành địa chỉ IP. Quá trình phân giải đi qua cache cục bộ → resolver → root server → TLD → authoritative server, và kết quả được cache ở mọi tầng. DNS còn dùng để cân bằng tải và failover.",
        },
        {
          type: "diagram",
          caption:
            "DNS phân giải tên miền qua cache cục bộ, resolver, root, TLD và máy chủ authoritative; sau đó client dùng IP để gọi server.",
          nodes: [
            { id: "client", label: "Client", x: 30, y: 30, w: 110, h: 56 },
            { id: "local-cache", label: "Cache cục bộ", sub: "miss", x: 190, y: 30, w: 140, h: 56 },
            { id: "resolver", label: "Resolver", sub: "phân giải", x: 370, y: 30, w: 120, h: 56 },
            { id: "root", label: "Root server", sub: "chỉ TLD", x: 370, y: 150, w: 120, h: 52 },
            { id: "tld", label: "TLD server", sub: "chỉ authoritative", x: 530, y: 150, w: 110, h: 52 },
            { id: "auth", label: "Authoritative", sub: "trả IP", x: 680, y: 150, w: 150, h: 52 },
            { id: "server", label: "Server", sub: "nhận HTTP(S)", x: 30, y: 270, w: 110, h: 56 },
          ],
          edges: [
            { id: "client-local-cache", from: "client", to: "local-cache", label: "tên miền" },
            { id: "local-cache-resolver", from: "local-cache", to: "resolver", label: "miss" },
            { id: "resolver-root", from: "resolver", to: "root", label: "hỏi" },
            { id: "root-tld", from: "root", to: "tld" },
            { id: "tld-auth", from: "tld", to: "auth" },
            { id: "auth-resolver", from: "auth", to: "resolver", label: "IP", dashed: true },
            { id: "client-server", from: "client", to: "server", label: "HTTP(S)" },
          ],
        },
        { type: "h3", text: "4. Proxy vs Reverse Proxy" },
        {
          type: "p",
          text: "Forward proxy đứng trước client, che giấu danh tính client (VPN, proxy công ty) — dùng cho riêng tư, lọc nội dung và vượt giới hạn vùng. Reverse proxy đứng trước server, che giấu server (Nginx, HAProxy) — xử lý TLS termination, cache, nén và cân bằng tải.",
        },
        { type: "h3", text: "5. Độ trễ (Latency)" },
        {
          type: "p",
          text: "Latency là thời gian dữ liệu đi từ A tới B, tính bằng mili-giây. 100 ms gần như không cảm nhận, 1 giây đã chậm, 3 giây thì người dùng rời đi. Nguồn gây trễ: khoảng cách vật lý, serialize dữ liệu, xử lý phía server và xếp hàng khi quá tải. CDN, cache và đặt server theo vùng là các cách giảm latency.",
        },
        { type: "h3", text: "6. HTTP / HTTPS" },
        {
          type: "p",
          text: "HTTP là ngôn ngữ client–server trên web: định nghĩa cấu trúc request/response. HTTPS là HTTP mã hoá bằng TLS để chống nghe lén. HTTP không trạng thái (stateless) nên dễ scale, nhưng cần cookie/token/session để giữ trạng thái. Cần nhớ: method (GET/POST/PUT/DELETE), status code (200/404/500) và header.",
        },
        { type: "h2", text: "Nhóm 2: API và giao tiếp" },
        {
          type: "p",
          text: "Biết máy kết nối với nhau rồi, câu hỏi tiếp theo là ứng dụng trao đổi dữ liệu có cấu trúc thế nào. API là hợp đồng quy định bạn được hỏi gì và nhận lại gì.",
        },
        { type: "h3", text: "7. API (Application Programming Interface)" },
        {
          type: "p",
          text: "API là hợp đồng giữa hai phần mềm: bạn được yêu cầu gì, yêu cầu thế nào và nhận lại gì. Hầu hết API hiện đại trao đổi JSON qua HTTP: client gọi một endpoint, server trả status code kèm dữ liệu.",
        },
        { type: "h3", text: "8. REST API" },
        {
          type: "p",
          text: "REST coi mọi thứ là 'resource' và dùng method HTTP chuẩn, ánh xạ tự nhiên sang CRUD: POST tạo, GET đọc, PUT/PATCH sửa, DELETE xoá. Nguyên tắc chính: stateless, cacheable, interface đồng nhất. Đơn giản là điểm mạnh, nhưng cần dữ liệu từ nhiều resource thì phải gọi nhiều request.",
        },
        { type: "h3", text: "9. GraphQL" },
        {
          type: "p",
          text: "GraphQL cho client mô tả chính xác dữ liệu cần trong một query, server trả đúng hình dạng đó — tránh gọi nhiều endpoint như REST. Đánh đổi: phức tạp hơn phía server (resolver cho từng field), cache khó hơn (mỗi query một khác) và dễ bị query lồng sâu gây chậm.",
        },
        { type: "h3", text: "10. WebSockets" },
        {
          type: "p",
          text: "HTTP là một chiều (client khởi tạo), nhưng chat, tỉ số trực tiếp hay editor cộng tác cần server đẩy dữ liệu tới client. WebSocket bắt đầu bằng HTTP rồi 'nâng cấp' thành kết nối hai chiều, bền, để hai bên gửi message bất cứ lúc nào. Nhược điểm: có trạng thái nên khó scale; server sập là mất hết kết nối.",
        },
        { type: "h3", text: "11. Webhooks" },
        {
          type: "p",
          text: "Webhook đảo ngược mô hình polling: thay vì client hỏi liên tục, server tự POST thông báo tới callback URL khi có sự kiện (Stripe thanh toán, GitHub push code). Thách thức chính là độ tin cậy — cần retry, ghi log sự kiện và xử lý idempotent khi server đích đang down.",
        },
        { type: "h2", text: "Nhóm 3: Lưu trữ dữ liệu" },
        {
          type: "p",
          text: "Chọn chiến lược lưu trữ là một trong những quyết định quan trọng nhất trong system design. Nhóm này gồm loại database, indexing, phân vùng, cache và hơn thế.",
        },
        { type: "h3", text: "12. Databases" },
        {
          type: "p",
          text: "Không có database 'tốt nhất'. Relational (PostgreSQL, MySQL) lưu bảng có quan hệ, hợp dữ liệu giao dịch cần nhất quán. Document (MongoDB) lưu tài liệu JSON linh hoạt. Key-value (Redis, DynamoDB) nhanh như hash map cho tra cứu theo khoá. Graph (Neo4j) mô hình hoá quan hệ, hợp mạng xã hội và gợi ý. Chọn theo data model, kiểu truy vấn và yêu cầu scale.",
        },
        { type: "h3", text: "13. SQL vs NoSQL" },
        {
          type: "p",
          text: "SQL ràng buộc schema chặt và hỗ trợ ACID. NoSQL đánh đổi bớt ràng buộc để linh hoạt và scale ngang. Chọn SQL khi cần nhất quán mạnh, truy vấn join phức tạp và schema ổn định. Chọn NoSQL khi cần scale ngang, schema hay đổi, ghi throughput cao hoặc dữ liệu phi cấu trúc (log, post). Thực tế nhiều hệ thống dùng cả hai — điều quan trọng là giải thích được vì sao.",
        },
        { type: "h3", text: "14. Database Indexing" },
        {
          type: "p",
          text: "Không có index, tìm một dòng là quét toàn bảng — ổn với 100 dòng, thảm hoạ với 100 triệu. Index là cấu trúc dữ liệu giúp tra cứu nhanh, thường là B-tree cho O(log n). Đánh đổi: index tăng tốc đọc nhưng làm chậm ghi và tốn dung lượng. Nên index cột xuất hiện trong WHERE và JOIN, đừng index tràn lan.",
        },
        { type: "h3", text: "15. Vertical Partitioning" },
        {
          type: "p",
          text: "Khi bảng quá nhiều cột, vertical partitioning tách thành các bảng hẹp hơn, mỗi bảng giữ một tập cột và nối với nhau bằng khoá chung. Mục đích là tách theo mẫu truy cập: trang profile cần tên và avatar, không cần địa chỉ thanh toán — mỗi query chỉ chạm cột cần thiết nên đọc ít byte hơn và nhanh hơn. Cách này cũng giúp bảo mật và tối ưu từng phần độc lập.",
        },
        { type: "h3", text: "16. Caching" },
        {
          type: "p",
          text: "Cache lưu dữ liệu hay đọc ở tầng nhanh (RAM) để không phải chạm database mỗi request — kỹ thuật hiệu quả nhất để cải thiện hiệu năng đọc. Mẫu phổ biến là cache-aside: app kiểm tra cache trước; hit thì trả ngay; miss thì đọc DB, ghi lại cache rồi trả. Phần khó là invalidation: TTL, write-through, write-behind.",
        },
        {
          type: "diagram",
          caption:
            "Với cache-aside, ứng dụng đọc cache trước: cache hit thì trả kết quả ngay; cache miss thì đọc database rồi ghi lại vào cache. Khó nhất là invalidation cache.",
          nodes: [
            { id: "app", label: "Ứng dụng", sub: "đọc dữ liệu", x: 20, y: 150, w: 130, h: 56 },
            { id: "cache", label: "Cache", sub: "kiểm tra", x: 200, y: 150, w: 120, h: 56 },
            { id: "db", label: "Database", sub: "khi miss", x: 350, y: 270, w: 140, h: 56 },
            { id: "cache-fill", label: "Cache", sub: "ghi lại", x: 350, y: 40, w: 130, h: 56 },
            { id: "result", label: "Kết quả", sub: "trả về ứng dụng", x: 640, y: 150, w: 150, h: 56 },
          ],
          edges: [
            { id: "app-cache", from: "app", to: "cache", label: "1. đọc" },
            { id: "cache-result", from: "cache", to: "result", label: "2a. hit" },
            { id: "cache-db", from: "cache", to: "db", label: "2b. miss" },
            { id: "db-cachefill", from: "db", to: "cache-fill", label: "3. ghi lại" },
            { id: "cachefill-result", from: "cache-fill", to: "result", label: "4. trả" },
          ],
        },
        { type: "h3", text: "17. Denormalization" },
        {
          type: "p",
          text: "CSDL chuẩn hoá tách dữ liệu ra nhiều bảng để tránh trùng lặp, nhưng join 5 bảng để tải một trang thì chậm. Denormalization cố tình thêm dữ liệu dư để giảm join. Đánh đổi: khi người dùng đổi tên, phải cập nhật ở nhiều nơi. Dùng khi hệ thống thiên về đọc và các đọc đó join tốn kém; luôn đi kèm chiến lược giữ dữ liệu dư nhất quán.",
        },
        { type: "h3", text: "18. Blob Storage" },
        {
          type: "p",
          text: "Ảnh, video, PDF là 'binary large object' không hợp với hàng-cột. Blob storage (Amazon S3) lưu khối dữ liệu lớn, rẻ và bền vững. Mẫu chuẩn: lưu file vào blob storage, nhận URL, rồi lưu URL vào database. Database gọn nhẹ (giữ chuỗi URL thay vì ảnh 10MB), còn blob storage lo durability, replication và phân phối (thường gắn CDN).",
        },
        { type: "h2", text: "Nhóm 4: Mở rộng (Scaling)" },
        {
          type: "p",
          text: "Ứng dụng lớn dần, một server không gánh nổi. Scaling là xử lý thêm lưu lượng, dữ liệu và người dùng mà không sụp đổ — có hai hướng cơ bản và chúng không loại trừ nhau.",
        },
        { type: "h3", text: "19. Vertical Scaling (Scale Up)" },
        {
          type: "p",
          text: "Cách đơn giản nhất: mua máy mạnh hơn — nhiều CPU, RAM và đĩa nhanh hơn. Không cần đổi code. Nhược điểm: có trần cứng, càng lên cao càng đắt phi tuyến, và vẫn là điểm chết đơn — máy đó sập là sập hết.",
        },
        { type: "h3", text: "20. Horizontal Scaling (Scale Out)" },
        {
          type: "p",
          text: "Thay vì làm một server to hơn, thêm nhiều server. Mọi hệ thống lớn đều chạy theo cách này. Cái giá: ứng dụng phải được thiết kế cho nó — server phải stateless, session để ở store chia sẻ (Redis), cần load balancer, và database cần chiến lược scale riêng (replication, sharding).",
        },
        { type: "h3", text: "21. Load Balancers" },
        {
          type: "p",
          text: "Load balancer đứng giữa client và pool server, phân phối request để không server nào bị quá tải. Thuật toán phổ biến: Round Robin (lần lượt), Least Connections (ít kết nối nhất), Weighted (server mạnh nhận nhiều hơn). LB cũng chạy health check: server ngừng phản hồi thì tự động bị loại khỏi vòng. Lợi ích kép: scale và sẵn sàng.",
        },
        { type: "h3", text: "22. Replication" },
        {
          type: "p",
          text: "Replication sao chép dữ liệu sang nhiều server database. Mô hình phổ biến là primary–replica: mọi ghi vào primary, thay đổi được nhân bản sang các replica phục vụ đọc. Vì hầu hết ứng dụng thiên về đọc, đẩy đọc sang replica giảm tải primary. Đánh đổi: replication lag khiến replica có thể trả dữ liệu hơi cũ — chấp nhận được với feed, nhưng với số dư tài khoản thì nên đọc từ primary.",
        },
        { type: "h3", text: "23. Sharding" },
        {
          type: "p",
          text: "Sharding chia dữ liệu ra nhiều node, mỗi node giữ một tập con (khác replication — ở đó mọi node có đủ dữ liệu). Nó chia cả dung lượng lẫn tải ghi. Shard key quyết định dữ liệu nằm ở shard nào; hash-based hoặc range-based. Shard key tồi tạo 'hot shard'. Thách thức: truy vấn xuyên shard, rebalancing khi thêm shard và độ phức tạp vận hành.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "shard = hash(user_id) % number_of_shards",
            },
          ],
        },
        {
          type: "diagram",
          caption:
            "Replication sao chép toàn bộ dữ liệu để giảm tải đọc; sharding chia dữ liệu theo shard key để phân tải và dung lượng lưu trữ.",
          nodes: [
            { id: "primary", label: "Primary", sub: "toàn bộ dữ liệu", x: 60, y: 40, w: 180, h: 64 },
            { id: "replica", label: "Replica", sub: "bản sao đầy đủ", x: 60, y: 200, w: 180, h: 64 },
            { id: "router", label: "Router", sub: "hash(shard key)", x: 500, y: 40, w: 180, h: 64 },
            { id: "shard1", label: "Shard 1", sub: "A, B, C", x: 360, y: 210, w: 120, h: 60 },
            { id: "shard2", label: "Shard 2", sub: "D, E, F", x: 520, y: 210, w: 120, h: 60 },
            { id: "shard3", label: "Shard 3", sub: "G, H, I", x: 680, y: 210, w: 120, h: 60 },
          ],
          edges: [
            { id: "primary-replica", from: "primary", to: "replica", label: "sao chép toàn bộ" },
            { id: "router-shard1", from: "router", to: "shard1" },
            { id: "router-shard2", from: "router", to: "shard2" },
            { id: "router-shard3", from: "router", to: "shard3" },
          ],
        },
        { type: "h2", text: "Nhóm 5: Hệ phân tán" },
        {
          type: "p",
          text: "Khi đã có nhiều server, database và cache nằm rải trên mạng, bạn bước vào thế giới hệ phân tán. Những việc đơn giản trên một máy — như giữ dữ liệu nhất quán — trở nên thực sự khó khi máy có thể hỏng độc lập và mạng có thể phân vùng.",
        },
        { type: "h3", text: "24. Định lý CAP" },
        {
          type: "p",
          text: "CAP nói hệ phân tán chỉ đảm bảo 2 trong 3: Consistency (đọc luôn thấy ghi mới nhất), Availability (mọi request đều có phản hồi), Partition Tolerance (vẫn chạy khi mạng giữa các node đứt). Vì phân vùng là không tránh khỏi, lựa chọn thực sự là CP (như MongoDB, HBase — hợp ngân hàng, tồn kho) hay AP (như Cassandra, DynamoDB — hợp feed, catalog, nơi sẵn sàng quan trọng hơn đúng tuyệt đối).",
        },
        { type: "h3", text: "25. CDN (Content Delivery Network)" },
        {
          type: "p",
          text: "CDN là mạng server rải khắp toàn cầu, cache và phục vụ nội dung từ vị trí gần người dùng. Chủ yếu phục vụ nội dung tĩnh (ảnh, CSS, JS, video); một số CDN còn cache nội dung động hoặc chạy serverless ở biên. Người dùng đầu tiên trong vùng bị miss (ra origin), các người dùng sau được phục vụ bản cache nhanh hơn nhiều. Nhà cung cấp: CloudFront, Cloudflare, Akamai.",
        },
        {
          type: "diagram",
          caption:
            "Request đầu tiên trong vùng bị cache miss và đi đến origin; các request sau được phục vụ từ cache ở edge gần người dùng.",
          nodes: [
            { id: "user1", label: "Người dùng 1", sub: "request đầu", x: 20, y: 40, w: 120, h: 56 },
            { id: "edge", label: "Edge cache", sub: "gần người dùng", x: 220, y: 150, w: 140, h: 64 },
            { id: "origin", label: "Origin", sub: "nguồn nội dung", x: 450, y: 40, w: 120, h: 56 },
            { id: "edge-cache", label: "Edge cache", sub: "cache nội dung", x: 450, y: 150, w: 140, h: 56 },
            { id: "resp1", label: "Người dùng 1", sub: "nhận nội dung", x: 660, y: 150, w: 140, h: 56 },
            { id: "user2", label: "Người dùng 2", sub: "request sau", x: 20, y: 280, w: 120, h: 56 },
            { id: "resp2", label: "Người dùng 2", sub: "trả từ cache", x: 450, y: 280, w: 140, h: 56 },
          ],
          edges: [
            { id: "user1-edge", from: "user1", to: "edge", label: "1. miss" },
            { id: "edge-origin", from: "edge", to: "origin", label: "2. lấy từ origin" },
            { id: "origin-edgecache", from: "origin", to: "edge-cache", label: "3. cache nội dung" },
            { id: "edgecache-resp1", from: "edge-cache", to: "resp1", label: "4. trả về" },
            { id: "user2-edge", from: "user2", to: "edge", label: "5. hit" },
            { id: "edge-resp2", from: "edge", to: "resp2", label: "6. trả từ cache" },
          ],
        },
        { type: "h3", text: "26. Idempotency" },
        {
          type: "p",
          text: "Trong hệ phân tán, request có thể lỗi và được thử lại; timeout không có nghĩa là request thất bại — có thể server đã xử lý nhưng response bị mất, retry sẽ khiến trừ tiền hai lần. Một thao tác idempotent cho cùng kết quả dù chạy bao nhiêu lần. GET/DELETE vốn idempotent; POST thì không, nên cần idempotency key: client gửi một mã duy nhất mỗi request, server thấy mã đã xử lý thì trả kết quả cũ thay vì xử lý lại.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "POST /payments\nIdempotency-Key: abc-123\namount: $50\n→ 200 OK { payment_id: 789 }\n\n# client retry cùng key abc-123\n→ 200 OK { payment_id: 789 }   # không trừ tiền lần hai",
            },
          ],
        },
        { type: "h2", text: "Nhóm 6: Mẫu kiến trúc" },
        {
          type: "p",
          text: "Đã có đủ khối từ mạng, lưu trữ tới scaling, câu hỏi cuối là tổ chức chúng thành một hệ thống mạch lạc thế nào. Các mẫu kiến trúc cho ta blueprint đã được kiểm chứng.",
        },
        { type: "h3", text: "27. Microservices" },
        {
          type: "p",
          text: "Khi ứng dụng lớn lên, một codebase (monolith) khó bảo trì, deploy và scale. Microservices tách thành nhiều service nhỏ, độc lập, mỗi service một năng lực nghiệp vụ và database riêng. Mỗi service có thể phát triển, deploy, scale độc lập; các team khác nhau có thể dùng ngôn ngữ khác nhau. Nhược điểm: phức tạp hệ phân tán (gọi mạng thay vì gọi hàm), nhất quán dữ liệu giữa các service và chi phí vận hành (giám sát, deploy, debug hàng chục service).",
        },
        { type: "h3", text: "28. Message Queues" },
        {
          type: "p",
          text: "Giao tiếp đồng bộ (A gọi B rồi chờ) tạo ghép nối chặt: B chậm thì A cũng chậm. Message queue tách rời các service bằng một trung gian lưu message cho tới khi consumer sẵn sàng xử lý. Đặt hàng xong, Order Service không cần chờ gửi email, cập nhật tồn kho hay ghi analytics — nó đẩy message vào queue rồi đi tiếp. Lợi ích: decoupling, buffering (hấp thụ đỉnh tải), reliability (message bền vững), scalability (thêm consumer). Phổ biến: Kafka, RabbitMQ, SQS.",
        },
        { type: "h3", text: "29. Rate Limiting" },
        {
          type: "p",
          text: "Khi API mở cho công chúng (hoặc nội bộ), bạn cần bảo vệ nó khỏi bị quá tải. Rate limiting giới hạn số request một client được gửi trong một cửa sổ thời gian. Thuật toán phổ biến: Token Bucket (token nạp theo tốc độ cố định, mỗi request tốn một token), Sliding Window, Fixed Window. Rate limiter thường đặt ở API gateway và dùng store nhanh như Redis để đếm theo client — để chống DDoS, bảo vệ thao tác tốn kém và phân tầng gói sử dụng.",
        },
        { type: "h3", text: "30. API Gateway" },
        {
          type: "p",
          text: "API gateway là một điểm vào duy nhất cho mọi request của client. Thay vì client gọi trực tiếp hàng chục microservice, client gọi gateway — nơi xử lý định tuyến, xác thực, rate limiting và các mối quan tâm xuyên suốt khác. Không có gateway, mỗi service phải tự làm auth, rate limit và logging; gateway tập trung hoá chúng. Ngoài ra còn có biến đổi request/response, gộp response từ nhiều service, cache và circuit breaking. Phổ biến: Kong, AWS API Gateway, Nginx.",
        },
        {
          type: "diagram",
          caption:
            "API gateway là điểm vào hệ thống, xử lý routing, xác thực và giới hạn tần suất; service có thể đẩy công việc bất đồng bộ vào message queue để worker xử lý.",
          nodes: [
            { id: "client", label: "Client", x: 20, y: 150, w: 110, h: 56 },
            { id: "gateway", label: "API Gateway", sub: "xác thực · giới hạn", x: 180, y: 150, w: 180, h: 64 },
            { id: "service", label: "Service", sub: "xử lý nghiệp vụ", x: 440, y: 60, w: 140, h: 60 },
            { id: "db", label: "Database", x: 650, y: 60, w: 120, h: 56 },
            { id: "queue", label: "Message Queue", sub: "việc bất đồng bộ", x: 440, y: 230, w: 150, h: 56 },
            { id: "worker", label: "Worker", x: 650, y: 230, w: 120, h: 56 },
          ],
          edges: [
            { id: "client-gateway", from: "client", to: "gateway", label: "request" },
            { id: "gateway-service", from: "gateway", to: "service", label: "định tuyến" },
            { id: "service-db", from: "service", to: "db", label: "đọc/ghi" },
            { id: "service-queue", from: "service", to: "queue", label: "enqueue", dashed: true },
            { id: "queue-worker", from: "queue", to: "worker", label: "job" },
          ],
        },
        { type: "h2", text: "Kết luận" },
        {
          type: "p",
          text: "Bạn không cần thuộc lòng 30 khái niệm này. Điều quan trọng là hiểu mỗi khối giải quyết vấn đề gì và đánh đổi nó mang lại — khi đó bạn có thể ghép chúng để thiết kế gần như mọi hệ thống, và suy luận về những hệ thống chưa từng gặp.",
        },
      ],
    },
  ],
};
