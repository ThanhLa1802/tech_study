import type { CourseModule } from "@/lib/course-types";

export const sdNetworkingApisModule: CourseModule = {
  id: "sd-networking-apis",
  title: "Networking & APIs",
  lessons: [
    {
      slug: "sd-dns-networking",
      title: "Mô hình Client–Server và DNS",
      module: "Mạng & API",
      summary:
        "Mô hình client–server, vai trò của hostname và IP, và luồng phân giải DNS đúng bản chất: stub resolver, recursive resolver, root/TLD/authoritative qua referral, cùng cache và TTL.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Ở tầng thấp nhất, mọi hệ thống phân tán chỉ là các máy gửi dữ liệu qua mạng cho nhau. Bài này làm rõ hai viên gạch nền: mô hình client–server và cách một tên miền được dịch thành địa chỉ IP qua DNS.",
        },
        {
          type: "p",
          text: "Mục tiêu: sau bài này bạn đọc được luồng phân giải DNS đúng bản chất (ai hỏi ai), hiểu vì sao DNS là một hệ thống phân tán chứ không phải một máy, và biết vai trò của cache cùng TTL.",
        },
        { type: "h2", text: "Client–Server" },
        {
          type: "p",
          text: "Client khởi tạo request; server lắng nghe, xử lý và trả response. Việc tách hai vai cho phép client và server tiến hoá, deploy và mở rộng độc lập.",
        },
        {
          type: "p",
          text: "Đừng hiểu client là 'máy người dùng' theo nghĩa hẹp. Trình duyệt và app di động là client, nhưng một microservice gọi service khác cũng đóng vai client.",
        },
        {
          type: "ul",
          items: [
            "Client chủ động bắt đầu giao tiếp; server chủ yếu phản hồi (mô hình request/response).",
            "Một server có thể phục vụ nhiều client đồng thời và scale ngang phía sau một load balancer.",
            "Một tiến trình có thể vừa là server với bên dưới, vừa là client với bên trên.",
          ],
        },
        { type: "h2", text: "Hostname và địa chỉ IP" },
        {
          type: "p",
          text: "Địa chỉ IP là con số dùng để định tuyến gói tin (IPv4 32-bit, khoảng 4,3 tỉ địa chỉ; IPv6 128-bit). Hostname (ví dụ example.com) là tên dễ nhớ cho con người.",
        },
        {
          type: "p",
          text: "Điều quan trọng không nằm ở việc 'IP là số, tên là chữ', mà ở lớp gián tiếp (indirection): client gọi tên, không gọi IP cứng.",
        },
        {
          type: "ul",
          items: [
            "Đổi hạ tầng: thay IP hay nhà cung cấp mà client không cần biết.",
            "Cân bằng tải và failover: một tên có thể ứng với nhiều IP; DNS loại bỏ IP hỏng hoặc phân phối request.",
            "Vòng đời: tầng tên miền là nơi nhiều hệ thống thực hiện failover ở mức toàn cầu.",
          ],
        },
        { type: "h2", text: "DNS là gì" },
        {
          type: "p",
          text: "DNS (Domain Name System) là một cơ sở dữ liệu phân tán, phân cấp, dịch tên miền thành các bản ghi (record) — thường là bản ghi A/AAAA chứa địa chỉ IP. Đặc tả gốc là RFC 1034 và RFC 1035.",
        },
        {
          type: "p",
          text: "DNS không có một 'máy chủ DNS' trung tâm. Nó là một cây phân cấp: root ở đỉnh, dưới là các TLD (com, org, vn...), dưới nữa là các zone do từng tổ chức tự quản.",
        },
        { type: "h2", text: "Luồng phân giải DNS" },
        {
          type: "p",
          text: "Một điểm dễ hiểu sai: chính client không tự đi hỏi lần lượt root rồi TLD rồi authoritative. Trên thực tế có hai vai khác nhau đảm nhận.",
        },
        { type: "h3", text: "Stub resolver và cache cục bộ" },
        {
          type: "p",
          text: "Ứng dụng hỏi stub resolver của hệ điều hành. Stub resolver chỉ tra cache cục bộ (OS, trình duyệt); nếu miss, nó chuyển câu hỏi cho recursive resolver được cấu hình. Stub resolver không tự phân giải toàn bộ chuỗi.",
        },
        { type: "h3", text: "Recursive resolver" },
        {
          type: "p",
          text: "Recursive resolver (thường do nhà mạng hoặc dịch vụ công cộng như 1.1.1.1 hay 8.8.8.8 vận hành) làm việc thay client: nếu chưa có trong cache, nó tự đi hỏi các máy chủ khác cho tới khi có câu trả lời cuối cùng rồi cache lại.",
        },
        { type: "h3", text: "Root, TLD và máy chủ authoritative" },
        {
          type: "p",
          text: "Recursive resolver hỏi theo kiểu lặp (iterative). Nó hỏi root server; root không trả đáp án cuối mà trả một referral trỏ tới TLD server. Nó hỏi tiếp TLD, nhận referral trỏ tới máy chủ authoritative của zone. Cuối cùng, authoritative trả bản ghi A/AAAA thật.",
        },
        {
          type: "p",
          text: "Mỗi bước là một câu trả lời trỏ sang máy chủ 'gần đáp án hơn' — đó gọi là referral. Chỉ máy chủ authoritative mới là nguồn có thẩm quyền cho tên miền mà nó quản lý.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "resolve www.example.com (cache miss)\n\n  stub resolver  --hỏi-->  recursive resolver  (recursive query, RD=1)\n                              |\n                              +--hỏi--> Root server     → referral: xem TLD .com\n                              +--hỏi--> TLD server      → referral: authoritative của example.com\n                              +--hỏi--> Authoritative   → A record 93.184.216.34 (TTL 3600s)\n                              |\n  stub resolver  <--trả lời--  recursive resolver  (đã cache lại)\n  client dùng IP đó để mở kết nối HTTP(S)",
            },
          ],
        },
        {
          type: "diagram",
          caption:
            "Luồng phân giải DNS: client hỏi stub resolver; khi cache miss, stub chuyển tiếp tới recursive resolver. Recursive resolver hỏi lần lượt root → TLD → authoritative, nhận referral trỏ về ở mỗi bước, rồi trả IP cho client để gọi server.",
          nodes: [
            { id: "client", label: "Client", sub: "ứng dụng", x: 10, y: 150, w: 110, h: 60 },
            { id: "stub", label: "Stub resolver", sub: "cache cục bộ", x: 210, y: 150, w: 150, h: 60 },
            {
              id: "recursive",
              label: "Recursive resolver",
              sub: "hỏi thay client",
              x: 430,
              y: 146,
              w: 190,
              h: 68,
            },
            { id: "root", label: "Root server", sub: "chỉ sang TLD", x: 760, y: 20, w: 160, h: 60 },
            { id: "tld", label: "TLD server", sub: "chỉ sang auth", x: 760, y: 150, w: 160, h: 60 },
            { id: "auth", label: "Authoritative", sub: "trả A record", x: 760, y: 280, w: 160, h: 60 },
            { id: "server", label: "Web server", sub: "nhận HTTP(S)", x: 210, y: 300, w: 150, h: 60 },
          ],
          edges: [
            { id: "client-stub", from: "client", to: "stub", label: "hỏi tên miền" },
            { id: "stub-client", from: "stub", to: "client" },
            { id: "stub-recursive", from: "stub", to: "recursive", label: "cache miss" },
            { id: "recursive-stub", from: "recursive", to: "stub" },
            { id: "recursive-root", from: "recursive", to: "root" },
            { id: "root-recursive", from: "root", to: "recursive", label: "referral TLD", dashed: true },
            { id: "recursive-tld", from: "recursive", to: "tld" },
            { id: "tld-recursive", from: "tld", to: "recursive", label: "referral auth", dashed: true },
            { id: "recursive-auth", from: "recursive", to: "auth" },
            { id: "auth-recursive", from: "auth", to: "recursive", label: "A record", dashed: true },
            { id: "client-server", from: "client", to: "server", label: "HTTP(S)" },
            { id: "server-client", from: "server", to: "client" },
          ],
        },
        { type: "h3", text: "Caching và TTL" },
        {
          type: "p",
          text: "Mỗi bản ghi mang theo một TTL (time to live). Sau khi nhận câu trả lời, recursive resolver (và cả stub resolver, cache trình duyệt) giữ nó trong khoảng TTL đó. Trong thời gian này, các truy vấn sau được trả ngay mà không cần đi lại qua cây DNS.",
        },
        {
          type: "ul",
          items: [
            "TTL là số không âm, tối đa 2^31 − 1 giây (RFC 8499 dẫn RFC 2181).",
            "TTL dài: ít truy vấn, ít tải, nhưng khi đổi IP thì thay đổi lan truyền chậm.",
            "TTL ngắn: failover nhanh hơn, nhưng tốn nhiều truy vấn và tăng độ trễ trung bình.",
          ],
        },
        { type: "h2", text: "Vì sao điều này quan trọng trong system design" },
        {
          type: "ul",
          items: [
            "DNS là tầng đầu tiên của critical path: phân giải chậm làm mọi request phía sau chậm.",
            "DNS là một điểm điều khiển: failover, chuyển vùng và cân bằng tải theo tên miền.",
            "Cache DNS là lực lượng chính giúp nó chịu tải toàn cầu — thiết kế TTL chính là thiết kế hành vi cache.",
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Client khởi tạo; server phản hồi.",
            "Hostname dành cho người, IP dành cho router; DNS là lớp gián tiếp giữa chúng.",
            "Stub resolver hỏi recursive resolver; recursive resolver mới thực sự đi theo root → TLD → authoritative qua các referral.",
            "Cache và TTL quyết định tốc độ và tải.",
          ],
        },
      ],
    },
    {
      slug: "sd-http-proxy-latency",
      title: "HTTP, Proxy và Độ trễ",
      module: "Mạng & API",
      summary:
        "HTTP request/response và tính không trạng thái, HTTPS/TLS và chi phí handshake, phân biệt forward proxy với reverse proxy (gateway), và cách latency cộng dồn trên critical path.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Khi hai máy đã tìm thấy nhau, bước tiếp theo là thống nhất cách nói chuyện. HTTP là giao thức tầng ứng dụng cho việc đó; và trên đường đi của một request, rất nhiều intermediary (proxy, gateway, CDN) có thể xen vào.",
        },
        {
          type: "p",
          text: "Mục tiêu: hiểu HTTP/HTTPS đúng ở mức bản chất, phân biệt forward proxy với reverse proxy, và biết latency của một request được cấu thành từ những bước nào trên critical path.",
        },
        { type: "h2", text: "HTTP: request/response không trạng thái" },
        {
          type: "p",
          text: "HTTP là họ giao thức tầng ứng dụng, không trạng thái, theo mô hình request/response (RFC 9110). Client tạo request gồm method, target, header và phần content tuỳ chọn; server diễn giải theo target resource rồi trả response gồm status code, header và content.",
        },
        {
          type: "p",
          text: "'Không trạng thái' nghĩa là ngữ nghĩa của mỗi request được hiểu độc lập, không phụ thuộc vào request trước đó trên cùng kết nối. Chính tính chất này giúp HTTP ghép nối tốt với proxy, cache và load balancing.",
        },
        {
          type: "p",
          text: "Vì HTTP không nhớ phiên, trạng thái cấp phiên (đăng nhập, giỏ hàng) phải được đưa ra ngoài qua cookie, token hoặc một session store dùng chung.",
        },
        { type: "h3", text: "Method và status code" },
        {
          type: "p",
          text: "Method diễn tả ý định. GET và HEAD là an toàn (safe) — không yêu cầu thay đổi trạng thái server. GET, HEAD, PUT và DELETE là idempotent — gọi lại cùng lúc cho cùng kết quả; POST không có bảo đảm đó (RFC 9110 mục 9.2).",
        },
        {
          type: "ul",
          items: [
            "2xx thành công: 200 OK, 201 Created, 204 No Content.",
            "3xx chuyển hướng: 301 vĩnh viễn, 302 tạm thời, 304 Not Modified.",
            "4xx lỗi phía client: 400, 401, 403, 404, 429.",
            "5xx lỗi phía server: 500, 502, 503, 504.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "GET /users/42 HTTP/1.1\nHost: api.example.com\nAccept: application/json\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{ \"id\": 42, \"name\": \"An\" }",
            },
          ],
        },
        { type: "h2", text: "HTTPS và TLS" },
        {
          type: "p",
          text: "HTTPS là HTTP chạy trên TLS (RFC 9110 mục 4.2.2). TLS cung cấp ba tính chất: authentication (xác thực server, tuỳ chọn xác thực client), confidentiality (mã hoá) và integrity (chống sửa đổi) — ngay cả khi kẻ tấn công kiểm soát toàn bộ đường truyền (RFC 8446).",
        },
        {
          type: "p",
          text: "TLS gồm hai phần: handshake (thoả thuận phiên bản, thuật toán và thiết lập khoá chung) và record layer (bảo vệ dữ liệu ứng dụng sau đó).",
        },
        { type: "h3", text: "Chi phí round-trip của TLS" },
        {
          type: "p",
          text: "Một full handshake TLS 1.3 cần một round-trip, sau khi kết nối TCP đã được thiết lập. Với kết nối hoàn toàn mới, chi phí thiết lập có thể là TCP (1 RTT) cộng TLS (1 RTT) trước khi byte HTTP đầu tiên được gửi đi.",
        },
        {
          type: "p",
          text: "TLS 1.3 hỗ trợ resumption qua PSK để bỏ round-trip này ở các kết nối sau, và chế độ 0-RTT cho phép gửi dữ liệu ngay — nhưng đánh đổi bằng bảo mật yếu hơn (không có forward secrecy, có nguy cơ replay).",
        },
        {
          type: "p",
          text: "Vì vậy, giữ kết nối (keep-alive) và multiplexing của HTTP/2, HTTP/3 giúp chia đều chi phí handshake qua nhiều request thay vì trả lại cho mỗi request.",
        },
        { type: "h2", text: "Forward proxy và reverse proxy" },
        {
          type: "p",
          text: "RFC 9110 mục 3.7 định nghĩa ba dạng intermediary: proxy, gateway và tunnel. Cách phân biệt cốt lõi là ai chọn nó và nó đại diện cho phía nào.",
        },
        {
          type: "ul",
          items: [
            "Forward proxy (thường gọi tắt là 'proxy'): do client chọn qua cấu hình, đứng về phía client. Dùng cho kiểm soát egress, riêng tư, lọc nội dung và cache dùng chung.",
            "Reverse proxy: hành xử như origin server với kết nối ra ngoài, nhưng chuyển tiếp request vào các server bên trong. Client không biết nó tồn tại.",
            "Tunnel: relay mù giữa hai đầu (ví dụ CONNECT để bọc TLS), không đọc hay sửa message.",
          ],
        },
        {
          type: "p",
          text: "Lưu ý thuật ngữ: trong RFC 9110, cái ta gọi 'reverse proxy' được định nghĩa chính thức là gateway. Reverse proxy thường đảm nhận TLS termination, cache, nén, che giấu origin và cân bằng tải.",
        },
        { type: "h2", text: "Latency và critical path" },
        {
          type: "p",
          text: "Latency của một request là thời gian đi hết critical path — chuỗi bước mà mỗi bước phải hoàn tất trước khi bước sau bắt đầu. Các bước chạy song song thì không cộng vào critical path.",
        },
        { type: "h3", text: "Các bước trên critical path của một request lạnh" },
        {
          type: "ul",
          items: [
            "DNS lookup: dịch tên miền thành IP (một round-trip tới resolver nếu cache miss).",
            "TCP handshake: một round-trip để thiết lập kết nối.",
            "TLS handshake: thêm một round-trip (TLS 1.3) trên kết nối mới.",
            "Server xử lý: từ lúc nhận request tới byte đầu tiên của response (TTFB).",
            "Truyền dữ liệu: thời gian body về hết client.",
          ],
        },
        {
          type: "p",
          text: "Khoảng cách vật lý đặt ra sàn cho latency: trong sợi quang, ánh sáng đi khoảng 200.000 km/s, tương đương khoảng 1 ms cho mỗi 200 km một chiều. Không có server nào nhanh hơn giới hạn này.",
        },
        { type: "h3", text: "Proxy và CDN tác động lên latency thế nào" },
        {
          type: "ul",
          items: [
            "Kết thúc TLS gần người dùng, giảm round-trip handshake.",
            "Cache nội dung tĩnh ở biên, tránh phải đi tới origin.",
            "Giữ kết nối tới origin (keep-alive) để tiết kiệm handshake.",
            "Nén và multiplexing giảm số byte và số chuyến phải đi.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Kết nối lạnh:\n  DNS (1 RTT)  →  TCP (1 RTT)  →  TLS 1.3 (1 RTT)  →  request  →  TTFB  →  body\n\nKết nối ấm (keep-alive, DNS đã cache):\n  request  →  TTFB  →  body",
            },
          ],
        },
        {
          type: "diagram",
          caption:
            "Kết nối lạnh phải trả DNS, TCP rồi TLS handshake (mỗi bước khoảng 1 RTT) trước khi request đi; kết nối ấm tái dùng kết nối keep-alive nên critical path chỉ còn request → TTFB → body.",
          nodes: [
            { id: "c-cold", label: "Client", sub: "kết nối lạnh", x: 10, y: 30, w: 130, h: 60 },
            { id: "dns", label: "DNS", sub: "1 RTT", x: 200, y: 30, w: 100, h: 60 },
            { id: "tcp", label: "TCP", sub: "1 RTT", x: 350, y: 30, w: 100, h: 60 },
            { id: "tls", label: "TLS 1.3", sub: "1 RTT", x: 500, y: 30, w: 100, h: 60 },
            { id: "s-cold", label: "Server", sub: "request → body", x: 660, y: 30, w: 150, h: 60 },
            { id: "c-warm", label: "Client", sub: "kết nối ấm", x: 10, y: 190, w: 130, h: 60 },
            { id: "s-warm", label: "Server", sub: "request → body", x: 660, y: 190, w: 150, h: 60 },
          ],
          edges: [
            { id: "cold-client-dns", from: "c-cold", to: "dns" },
            { id: "cold-dns-tcp", from: "dns", to: "tcp" },
            { id: "cold-tcp-tls", from: "tcp", to: "tls" },
            { id: "cold-tls-server", from: "tls", to: "s-cold" },
            { id: "warm-client-server", from: "c-warm", to: "s-warm", label: "keep-alive: bỏ DNS/TCP/TLS" },
            { id: "warm-server-client", from: "s-warm", to: "c-warm" },
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "HTTP không trạng thái: mỗi request đọc độc lập; phiên nằm ở cookie/token/session store.",
            "HTTPS = HTTP trên TLS; TLS thêm round-trip handshake trên kết nối mới.",
            "Forward proxy do client chọn; reverse proxy (gateway) đại diện cho server.",
            "Latency là tổng các bước trên critical path; proxy và CDN rút ngắn nó.",
          ],
        },
      ],
    },
    {
      slug: "sd-rest-graphql",
      title: "REST và GraphQL",
      module: "Mạng & API",
      summary:
        "API như một hợp đồng; REST dựa trên tài nguyên và interface đồng nhất (không chỉ là CRUD); GraphQL với query và resolver; và khi nào nên chọn cách nào.",
      duration: "11 phút",
      blocks: [
        {
          type: "p",
          text: "Một khi hai máy đã nói chuyện được với nhau, câu hỏi tiếp theo là ứng dụng trao đổi dữ liệu có cấu trúc như thế nào. Đó là việc của API, và hai phong cách định nghĩa API phổ biến nhất là REST và GraphQL.",
        },
        {
          type: "p",
          text: "Mục tiêu: hiểu API như một hợp đồng, nắm REST ở đúng tầng khái niệm (tài nguyên + interface đồng nhất, không phải danh sách CRUD), hiểu GraphQL ở mức query và resolver, và biết các đánh đổi để chọn.",
        },
        { type: "h2", text: "API là một hợp đồng" },
        {
          type: "p",
          text: "API quy định bạn được yêu cầu gì, yêu cầu thế nào và nhận lại gì. Hợp đồng rõ ràng cho phép client và server phát triển độc lập, miễn là cả hai tuân theo hợp đồng đó.",
        },
        {
          type: "p",
          text: "Hệ quả: thay đổi phá vỡ hợp đồng là breaking change. Việc giữ tương thích ngược là một phần của thiết kế API, không chỉ là chuyện tài liệu.",
        },
        { type: "h2", text: "REST: tài nguyên, không phải danh sách CRUD" },
        {
          type: "p",
          text: "REST là một phong cách kiến trúc do Roy Fielding mô tả năm 2000, không phải một thư viện hay một chuẩn. Trung tâm của nó là tài nguyên (resource) — bất cứ thứ gì có thể được đặt tên; client thao tác trên tài nguyên thông qua biểu diễn (representation) của chúng.",
        },
        {
          type: "p",
          text: "Đặc trưng phân biệt REST là interface đồng nhất (uniform interface). Trên web, HTTP đóng vai interface đó: URI định danh tài nguyên, còn method và status code mang ngữ nghĩa. Đánh đổi: interface chung kém hiệu quả hơn interface thiết kế riêng cho từng ứng dụng, nhưng đổi lấy khả năng tiến hoá và tương tác độc lập.",
        },
        {
          type: "p",
          text: "Vì vậy đừng rút gọn REST thành 'POST tạo, GET đọc, PUT sửa, DELETE xoá'. Ánh xạ đó hữu ích để nhớ nhanh, nhưng REST còn bao gồm stateless, cacheable, layered, và việc mô hình hoá tài nguyên theo lĩnh vực nghiệp vụ.",
        },
        { type: "h3", text: "Ví dụ mô hình tài nguyên" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "GET    /users/42          → đọc một user\nGET    /users/42/orders   → đơn hàng của user đó\nPOST   /users             → tạo user mới\nPATCH  /users/42          → cập nhật một phần\nDELETE /users/42          → xoá user",
            },
          ],
        },
        {
          type: "p",
          text: "Một hành động không tự nhiên như CRUD (ví dụ 'gửi hoá đơn') có thể được mô hình như một sub-resource hoặc controller resource, thay vì nhét động từ vào URL.",
        },
        { type: "h2", text: "GraphQL: client mô tả chính xác dữ liệu cần" },
        {
          type: "p",
          text: "GraphQL là một query language cho API kèm runtime phía server. Client viết query nêu đúng các field mình cần; server trả về đúng hình dạng đó. Nhờ vậy, một request có thể đi qua nhiều đối tượng liên quan thay vì phải gọi nhiều endpoint.",
        },
        {
          type: "p",
          text: "Server định nghĩa một schema (type system) mô tả những gì có thể truy vấn. Mỗi field gắn với một resolver — hàm lấy dữ liệu cho field đó từ bất kỳ nguồn nào (database, service khác, cache).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "graphql",
              code: "query {\n  user(id: 42) {\n    name\n    orders(last: 3) {\n      id\n      total\n    }\n  }\n}",
            },
          ],
        },
        {
          type: "p",
          text: "Kết quả có đúng cấu trúc của query. Vì client chỉ định field, GraphQL tránh được over-fetching (lấy thừa) và under-fetching (phải gọi thêm request) — hai vấn đề thường gặp khi REST trả về một representation cố định.",
        },
        {
          type: "diagram",
          caption:
            "REST client thường gọi nhiều endpoint resource khi dữ liệu nằm rải rác; GraphQL client gửi một query tới endpoint và schema/resolvers lấy từng field từ nguồn phù hợp. Đây là pattern điển hình — phía server GraphQL vẫn có thể phát sinh nhiều truy vấn nguồn.",
          nodes: [
            { id: "r-client", label: "REST client", x: 10, y: 90, w: 140, h: 60 },
            { id: "r-ep1", label: "GET /users/42", x: 250, y: 20, w: 200, h: 50 },
            { id: "r-ep2", label: "GET /users/42/orders", x: 250, y: 95, w: 200, h: 50 },
            { id: "r-ep3", label: "GET /orders/12", x: 250, y: 170, w: 200, h: 50 },
            { id: "r-src", label: "Data sources", sub: "nhiều resource", x: 560, y: 95, w: 170, h: 60 },
            { id: "g-client", label: "GraphQL client", x: 10, y: 290, w: 160, h: 60 },
            { id: "g-ep", label: "GraphQL endpoint", x: 260, y: 290, w: 170, h: 60 },
            { id: "g-res", label: "Schema / resolvers", x: 520, y: 290, w: 180, h: 60 },
            { id: "g-src", label: "Data sources", x: 780, y: 290, w: 160, h: 60 },
          ],
          edges: [
            { id: "r-client-ep1", from: "r-client", to: "r-ep1" },
            { id: "r-client-ep2", from: "r-client", to: "r-ep2", label: "request riêng" },
            { id: "r-client-ep3", from: "r-client", to: "r-ep3" },
            { id: "r-ep1-src", from: "r-ep1", to: "r-src" },
            { id: "r-ep2-src", from: "r-ep2", to: "r-src" },
            { id: "r-ep3-src", from: "r-ep3", to: "r-src" },
            { id: "g-client-ep", from: "g-client", to: "g-ep", label: "1 query" },
            { id: "g-ep-res", from: "g-ep", to: "g-res", label: "resolve" },
            { id: "g-res-src", from: "g-res", to: "g-src", label: "gọi nguồn" },
          ],
        },
        { type: "h2", text: "So sánh và chọn" },
        {
          type: "ul",
          items: [
            "Caching: REST tận dụng được cache HTTP chuẩn theo URL; GraphQL thường POST tới cùng một endpoint với query khác nhau nên cache HTTP khó hơn.",
            "Round-trip: REST cần nhiều request khi cần dữ liệu từ nhiều resource; GraphQL gộp chúng vào một query.",
            "Độ phức tạp server: REST chia logic theo endpoint; GraphQL dồn vào resolver và cần kiểm soát query lồng sâu, chi phí tính toán và vấn đề N+1.",
            "Tiến hoá schema: GraphQL thêm field mới mà không phá client hiện có; REST thường phải xử lý version.",
            "Công cụ: GraphQL có introspection giúp client khám phá schema; REST đơn giản và phổ biến với mọi loại client.",
          ],
        },
        {
          type: "p",
          text: "REST hợp khi API công khai, đơn giản và thiên về cache. GraphQL hợp khi nhiều client có nhu cầu dữ liệu khác nhau và cần gộp truy vấn. Đây không phải cuộc chiến một mất một còn: có thể đặt một GraphQL gateway trước các REST service để che giấu backend.",
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "API là hợp đồng; thay đổi phá vỡ hợp đồng là breaking change.",
            "REST là tài nguyên cộng với interface đồng nhất (HTTP), không chỉ là CRUD.",
            "GraphQL cho client chỉ định field, server resolve; tránh over/under-fetching nhưng tăng độ phức tạp và khó cache hơn.",
          ],
        },
      ],
    },
    {
      slug: "sd-realtime-communication",
      title: "Giao tiếp thời gian thực",
      module: "Mạng & API",
      summary:
        "Ba cách giao tiếp thời gian thực: polling, WebSocket (kết nối hai chiều bền vững) và webhook (HTTP callback do server chủ động); kèm các vấn đề retry, chữ ký và idempotency.",
      duration: "11 phút",
      blocks: [
        {
          type: "p",
          text: "HTTP request/response do client khởi tạo. Nhưng chat, thông báo, tỉ số trực tiếp hay editor cộng tác lại cần server chủ động đẩy dữ liệu tới client. Có ba cách tiếp cận chính, khác nhau ở việc ai chủ động và kết nối được giữ trong bao lâu.",
        },
        {
          type: "p",
          text: "Mục tiêu: phân biệt polling, WebSocket và webhook; hiểu vì sao WebSocket khó scale; và nắm những yêu cầu độ tin cậy (retry, chữ ký, idempotency) khi nhận sự kiện qua webhook.",
        },
        { type: "h2", text: "Polling: client kéo định kỳ" },
        {
          type: "p",
          text: "Cách đơn giản nhất: client gọi GET lặp lại theo chu kỳ (ví dụ mỗi 5 giây) để hỏi có gì mới. Nó dùng HTTP thuần, dễ làm và dễ đi qua proxy cùng firewall.",
        },
        {
          type: "ul",
          items: [
            "Độ trễ ít nhất bằng một chu kỳ: dữ liệu có thể đến trễ tới một khoảng polling.",
            "Lãng phí khi không có gì thay đổi: mỗi vòng vẫn tốn một request.",
            "Độ tải tăng theo số client nhân với tần suất polling.",
          ],
        },
        {
          type: "p",
          text: "Long polling cải thiện bằng cách để server giữ request mở cho tới khi có dữ liệu hoặc hết timeout, rồi client mở lại ngay. Latency thấp hơn nhưng mỗi client chiếm một kết nối đang chờ.",
        },
        { type: "h2", text: "WebSocket: kết nối hai chiều, bền vững" },
        {
          type: "p",
          text: "WebSocket bắt đầu bằng một HTTP request nâng cấp giao thức: client gửi GET kèm Upgrade: websocket và Sec-WebSocket-Key; nếu đồng ý, server trả 101 Switching Protocols. Sau đó, cùng kết nối TCP đó trở thành kênh hai chiều: cả hai bên có thể gửi message bất cứ lúc nào, không cần HTTP header cho mỗi message.",
        },
        {
          type: "p",
          text: "Giao thức dùng ws:// cho kết nối thường và wss:// cho kết nối qua TLS (mặc định cổng 80 và 443). Đây là lựa chọn cho realtime hai chiều thật sự.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "GET /chat HTTP/1.1\nHost: server.example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\nSec-WebSocket-Version: 13\n\nHTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=",
            },
          ],
        },
        { type: "h3", text: "Vì sao WebSocket khó scale" },
        {
          type: "ul",
          items: [
            "Có trạng thái: server phải nhớ ai đang giữ kết nối; đó không còn là các request độc lập.",
            "Một server sập làm rơi toàn bộ kết nối của nó; client phải reconnect, thường có backoff.",
            "Cần định tuyến message tới đúng server đang giữ kết nối của người nhận — thường cần một pub/sub backplane (ví dụ Redis) hoặc sticky routing.",
            "Load balancer, proxy và timeout phải hỗ trợ upgrade cũng như kết nối dài.",
          ],
        },
        { type: "h2", text: "Webhook: server chủ động gọi ngược lại" },
        {
          type: "p",
          text: "Webhook đảo ngược polling. Thay vì client hỏi liên tục, client đăng ký một callback URL; khi sự kiện xảy ra, hệ thống nguồn tự gửi HTTP POST tới URL đó. Ví dụ: Stripe báo thanh toán thành công, GitHub báo có push code.",
        },
        {
          type: "p",
          text: "Webhook là giao tiếp event-driven một chiều, phù hợp khi bạn cần biết sự kiện từ hệ thống bên thứ ba mà không cần giữ kết nối hai chiều.",
        },
        { type: "h3", text: "Thách thức độ tin cậy" },
        {
          type: "ul",
          items: [
            "Thứ tự sự kiện tùy provider: đừng giả định sự kiện luôn đến theo thứ tự được tạo.",
            "Có thể gửi trùng: xử lý phải idempotent — ghi log event ID đã xử lý và bỏ qua bản trùng.",
            "Retry tùy provider: một số provider gửi lại khi endpoint lỗi, thường với exponential backoff.",
            "Trả lời nhanh: trả 2xx ngay rồi xử lý bất đồng bộ, để tránh bị timeout.",
            "Xác thực chữ ký theo hướng dẫn của provider; một số provider yêu cầu dùng raw body (ví dụ Stripe-Signature hoặc X-Hub-Signature-256).",
            "Chống replay tùy provider: một số chữ ký có timestamp (như Stripe); chỉ kiểm tra timestamp khi định dạng chữ ký hỗ trợ.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "python",
              code: "def handle_webhook(raw_body, signature_header):\n    if not verify_signature(raw_body, signature_header, secret):\n        return 400                     # chữ ký sai → từ chối\n    event = json.loads(raw_body)\n    if already_processed(event[\"id\"]):\n        return 200                     # gửi trùng → bỏ qua, vẫn trả 200\n    enqueue(event)                     # xử lý bất đồng bộ\n    return 200                         # trả nhanh trước khi xử lý xong",
            },
          ],
        },
        { type: "h2", text: "Chọn cách nào" },
        {
          type: "ul",
          items: [
            "Cần hai chiều, độ trễ thấp, client giữ kết nối (chat, game, cộng tác) → WebSocket.",
            "Nhận sự kiện từ hệ thống bên thứ ba theo một chiều → Webhook.",
            "Tần suất thấp, chấp nhận độ trễ, muốn đơn giản tối đa → Polling.",
            "Cần gần realtime nhưng môi trường không hỗ trợ WebSocket → Long polling.",
          ],
        },
        {
          type: "diagram",
          caption:
            "Ba pattern realtime khác nhau ở ai chủ động: Polling để client lặp lại request theo chu kỳ; WebSocket mở kênh hai chiều bền vững giữa client và server; Webhook để provider đẩy một chiều HTTP POST tới callback URL.",
          nodes: [
            { id: "polling", label: "Polling", sub: "client kéo định kỳ", x: 20, y: 30, w: 170, h: 60 },
            { id: "poll-client", label: "Client", x: 280, y: 30, w: 120, h: 60 },
            { id: "poll-server", label: "Server", x: 480, y: 30, w: 140, h: 60 },
            { id: "ws", label: "WebSocket", sub: "kênh bền vững", x: 20, y: 150, w: 170, h: 60 },
            { id: "ws-client", label: "Client", x: 280, y: 150, w: 120, h: 60 },
            { id: "ws-server", label: "Server", x: 480, y: 150, w: 140, h: 60 },
            { id: "webhook", label: "Webhook", sub: "server đẩy", x: 20, y: 270, w: 170, h: 60 },
            { id: "hook-provider", label: "Provider", sub: "bên thứ ba", x: 280, y: 270, w: 120, h: 60 },
            { id: "hook-callback", label: "Callback URL", sub: "server của bạn", x: 480, y: 270, w: 140, h: 60 },
          ],
          edges: [
            { id: "poll-client-server", from: "poll-client", to: "poll-server", label: "GET lặp lại" },
            { id: "ws-client-server", from: "ws-client", to: "ws-server" },
            { id: "ws-server-client", from: "ws-server", to: "ws-client", label: "hai chiều" },
            { id: "hook-provider-callback", from: "hook-provider", to: "hook-callback", label: "HTTP POST" },
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Polling do client kéo; webhook do server đẩy; WebSocket là kênh hai chiều bền vững.",
            "WebSocket có trạng thái nên khó scale; cần chiến lược reconnect và định tuyến message.",
            "Webhook cần xác thực chữ ký, chống replay, xử lý idempotent và trả 2xx nhanh.",
          ],
        },
      ],
    },
  ],
};
