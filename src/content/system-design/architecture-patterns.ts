import type { CourseModule } from "@/lib/course-types";

export const sdArchitecturePatternsModule: CourseModule = {
  id: "sd-architecture-patterns",
  title: "Architecture Patterns",
  lessons: [
    {
      slug: "sd-monolith-modular-microservices",
      title: "Monolith, Modular Monolith và Microservices",
      module: "Architecture Patterns",
      summary:
        "Ba cách tổ chức code thành các đơn vị triển khai — monolith, modular monolith và microservices — cùng những đánh đổi và trường hợp chưa nên tách.",
      duration: "11 phút",
      blocks: [
        {
          type: "p",
          text: "Ba mẫu kiến trúc này cùng trả lời một câu hỏi: ứng dụng được đóng gói và triển khai thành bao nhiêu đơn vị, và các phần bên trong được phân tách rõ đến đâu?",
        },
        {
          type: "p",
          text: "Đừng đánh đồng “monolith” với “code lộn xộn”: một monolith vẫn có thể được chia module rõ ràng. Ngược lại, nhiều service vẫn có thể ghép nối chặt đến mức trở thành “distributed monolith”. Cần phân biệt đơn vị triển khai (deployment unit) với mức độ phân chia module (modularity) bên trong.",
        },
        { type: "h2", text: "Ba mẫu trên hai trục" },
        {
          type: "ul",
          items: [
            "Monolith: một đơn vị triển khai, thường dùng chung một database. Dễ bắt đầu, nhưng nếu các phần ghép nối chặt theo thời gian, code có thể biến thành “big ball of mud” (mớ code rối).",
            "Modular monolith: vẫn là một đơn vị triển khai, nhưng code được chia thành các module theo nghiệp vụ (domain), với ranh giới rõ ràng — chẳng hạn module customers, orders, notifications.",
            "Microservices: nhiều đơn vị triển khai độc lập; mỗi service phụ trách một năng lực nghiệp vụ và thường có database riêng (database per service).",
          ],
        },
        {
          type: "p",
          text: "Khác biệt cốt lõi giữa modular monolith và microservices không phải là có chia module hay không, mà là cách thực thi ranh giới: trong cùng một tiến trình (in-process), hay qua mạng (network boundary) giữa các tiến trình.",
        },
        {
          type: "diagram",
          caption:
            "Cùng một trục tiến hoá: monolith → modular monolith (tách module theo nghiệp vụ trong một tiến trình) → microservices (tách hẳn thành nhiều tiến trình độc lập).",
          nodes: [
            {
              id: "mono",
              label: "Monolith",
              sub: "1 đơn vị triển khai",
              tone: "zinc",
              x: 20,
              y: 60,
              w: 190,
              h: 64,
            },
            {
              id: "modular",
              label: "Modular monolith",
              sub: "1 đơn vị · module rõ",
              tone: "sky",
              x: 300,
              y: 60,
              w: 220,
              h: 64,
            },
            {
              id: "micro",
              label: "Microservices",
              sub: "n đơn vị độc lập",
              tone: "emerald",
              x: 610,
              y: 60,
              w: 200,
              h: 64,
            },
          ],
          edges: [
            {
              id: "mono-modular",
              from: "mono",
              to: "modular",
              label: "tách module nghiệp vụ",
            },
            {
              id: "modular-micro",
              from: "modular",
              to: "micro",
              label: "tách tiến trình",
            },
          ],
        },
        { type: "h2", text: "Đánh đổi" },
        {
          type: "ul",
          items: [
            "Triển khai: monolith và modular monolith được triển khai như một khối; với microservices, có thể triển khai từng service độc lập nhưng cần thêm hạ tầng (service discovery, gateway, observability).",
            "Mở rộng (scale): chỉ microservices cho phép mở rộng từng service theo nhu cầu; monolith phải mở rộng cả khối.",
            "Tự chủ của team: microservices cho phép các team triển khai độc lập; modular monolith giúp các team tự chủ hơn trong cùng codebase nhưng vẫn dùng chung một pipeline.",
            "Nhất quán dữ liệu: dùng chung một database giúp giao dịch ACID đơn giản hơn; nhiều database riêng dẫn đến giao dịch phân tán và nhất quán cuối (eventual consistency; xem bài Saga/Outbox).",
            "Chi phí vận hành: càng nhiều service, càng có nhiều thành phần cần giám sát, triển khai và gỡ lỗi; đồng thời, lỗi gọi mạng thay cho lỗi gọi hàm.",
          ],
        },
        { type: "h2", text: "Distributed monolith — cái bẫy" },
        {
          type: "p",
          text: "Nếu tách hệ thống thành nhiều service nhưng chúng vẫn gọi nhau đồng bộ theo chuỗi, dùng chung database và phải triển khai cùng lúc, bạn không nhận được lợi ích của microservices mà vẫn gánh chi phí của hệ thống phân tán. Đó là distributed monolith — còn gọi là “distributed big ball of mud”.",
        },
        { type: "h2", text: "Chọn gì, và khi nào không nên dùng microservices" },
        {
          type: "p",
          text: "Chọn microservices vì những lợi ích cụ thể (triển khai độc lập, mở rộng từng phần, tăng quyền tự chủ cho team), chứ không phải vì codebase hiện tại lộn xộn. Hãy tự hỏi: nếu chưa xây dựng được một monolith có cấu trúc tốt, vì sao ta nghĩ microservices sẽ tốt hơn?",
        },
        {
          type: "ul",
          items: [
            "Sản phẩm mới, domain chưa rõ, team nhỏ: monolith hoặc modular monolith thường là điểm khởi đầu phù hợp hơn.",
            "Không cần triển khai hay mở rộng độc lập: hệ thống phân tán sẽ làm tăng chi phí mà không đem lại lợi ích tương xứng.",
            "Chưa có năng lực vận hành (CI/CD, giám sát, logging tập trung): microservices sẽ làm chi phí tăng lên.",
            "Cần nhất quán mạnh giữa nhiều thực thể: dùng chung một database với giao dịch cục bộ đơn giản hơn nhiều.",
          ],
        },
        {
          type: "p",
          text: "Gateway và các mối quan tâm xuyên suốt (xác thực, rate limiting) được trình bày ở bài khác trong khóa. Ở đây, chỉ cần nhớ rằng chúng là hạ tầng đi kèm khi tách service, chứ không phải lý do để tách.",
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Monolith = một đơn vị triển khai; modular monolith = một đơn vị + module theo nghiệp vụ; microservices = nhiều đơn vị độc lập.",
            "Đừng đánh đồng monolith với code lộn xộn, hoặc cho rằng microservices mặc nhiên tốt hơn.",
            "Tách service kéo theo bài toán dữ liệu phân tán và chi phí vận hành.",
            "Distributed monolith là kết cục tệ nhất: đủ phức tạp mà không đủ lợi ích.",
          ],
        },
      ],
    },
    {
      slug: "sd-sync-async-event-driven",
      title: "Giao tiếp đồng bộ và bất đồng bộ (Event-Driven)",
      module: "Architecture Patterns",
      summary:
        "Giao tiếp đồng bộ (gọi rồi chờ) và bất đồng bộ (qua broker), command và event, các kiểu event thường gặp, cùng những trường hợp không nên dùng event-driven.",
      duration: "11 phút",
      blocks: [
        {
          type: "p",
          text: "Khi các thành phần cần phối hợp, có hai kiểu giao tiếp cơ bản: đồng bộ (synchronous) và bất đồng bộ (asynchronous). Chọn không phù hợp có thể khiến chúng ghép nối chặt hoặc làm hệ thống phức tạp không cần thiết.",
        },
        { type: "h2", text: "Giao tiếp đồng bộ" },
        {
          type: "p",
          text: "Trong giao tiếp đồng bộ, bên gọi gửi request rồi chờ response. Ví dụ, A gọi B qua HTTP và chỉ tiếp tục sau khi nhận được phản hồi.",
        },
        {
          type: "ul",
          items: [
            "Ghép nối chặt trong lúc chạy (runtime): cả A và B phải sẵn sàng trong suốt thời gian xử lý request.",
            "Lỗi lan truyền: nếu B chậm hoặc gặp sự cố, A cũng có thể chậm hoặc gặp sự cố theo (cascading failure).",
            "Cần timeout, retry và circuit breaker để cô lập lỗi.",
            "Phù hợp với truy vấn cần kết quả ngay hoặc luồng xử lý mà bước sau cần kết quả từ bước trước.",
          ],
        },
        {
          type: "p",
          text: "Có thể giảm thời gian chờ bằng cách chạy song song các lệnh gọi đồng bộ độc lập, thay vì thực hiện lần lượt thành một chuỗi.",
        },
        { type: "h2", text: "Giao tiếp bất đồng bộ" },
        {
          type: "p",
          text: "Trong giao tiếp bất đồng bộ, bên gửi đưa message hoặc event vào một thành phần trung gian (message broker) rồi tiếp tục công việc; bên nhận xử lý khi sẵn sàng. Broker lưu tạm message nếu consumer chậm hoặc tạm thời gặp sự cố, nên hai bên không cần hoạt động cùng lúc.",
        },
        {
          type: "ul",
          items: [
            "Ghép nối lỏng trong lúc chạy: producer không phụ thuộc vào việc consumer có đang hoạt động hay không.",
            "Buffer giúp hấp thụ đỉnh tải; broker giữ message nên cải thiện availability (tính sẵn sàng).",
            "Đổi lại, cần broker đủ tin cậy và phải xử lý các vấn đề về đảm bảo phân phối (at-least-once), thứ tự và message trùng lặp.",
          ],
        },
        {
          type: "p",
          text: "Các đảm bảo phân phối và dead-letter queue đã được trình bày trong bài message queue; bài này tập trung vào hai kiểu giao tiếp sử dụng chúng.",
        },
        { type: "h2", text: "Command, event và các kiểu event" },
        {
          type: "p",
          text: "Cần phân biệt hai loại message. Command có nghĩa là “hãy làm việc này”: nó thể hiện một ý định, có thể bị từ chối và thường gửi đến một bên nhận. Event có nghĩa là “việc này đã xảy ra”: nó ghi nhận một sự kiện trong quá khứ, không thể bị từ chối và có thể có nhiều bên quan tâm.",
        },
        {
          type: "p",
          text: "Martin Fowler phân biệt một số kiểu event thường gặp. Nắm rõ các thuật ngữ này giúp tránh nhập nhằng khi thiết kế:",
        },
        {
          type: "ul",
          items: [
            "Event notification: thông báo “có thay đổi” kèm rất ít dữ liệu; bên nhận cần gì thì truy vấn lại nguồn. Cách này giảm ghép nối nhưng khiến luồng xử lý khó theo dõi hơn.",
            "Event-carried state transfer: event mang đủ dữ liệu để bên nhận tự cập nhật bản sao, nhờ đó giảm phụ thuộc và độ trễ đọc.",
            "Event sourcing: ghi lại mọi thay đổi trạng thái thành một chuỗi event; event log là nguồn dữ liệu gốc, còn trạng thái được dựng lại từ log này.",
            "CQRS: tách model đọc khỏi model ghi. CQRS không bắt buộc phải dùng event, nhưng thường được kết hợp với event sourcing.",
          ],
        },
        {
          type: "p",
          text: "Một cái bẫy thường gặp là dùng event như “command trá hình”: thực chất bên gửi đang yêu cầu bên nhận làm một việc cụ thể. Trong trường hợp đó, hãy gửi command để ý định và luồng xử lý rõ ràng hơn.",
        },
        { type: "h2", text: "Đánh đổi" },
        {
          type: "ul",
          items: [
            "Nhất quán: giao tiếp bất đồng bộ thường dẫn đến nhất quán cuối (eventual consistency); dữ liệu ở các bên có thể chưa khớp nhau trong một khoảng thời gian.",
            "Gỡ lỗi: luồng xử lý không hiện rõ trong call stack; cần correlation ID, tracing và log tập trung để theo dõi.",
            "Thứ tự và trùng lặp: message có thể đến sai thứ tự hoặc bị gửi lặp; consumer cần xử lý idempotent (an toàn khi lặp lại).",
            "Vận hành: broker là một thành phần bổ sung cần được giám sát và duy trì tính sẵn sàng.",
          ],
        },
        { type: "h2", text: "Khi nào không nên dùng event-driven" },
        {
          type: "ul",
          items: [
            "Luồng request/response đơn giản, yêu cầu độ trễ thấp và giao tiếp đồng bộ đã đáp ứng được nhu cầu.",
            "Cần kết quả ngay và nhất quán mạnh, không chấp nhận trạng thái chưa hoàn tất.",
            "Team chưa có hạ tầng giám sát/tracing: chi phí vận hành sẽ lớn hơn lợi ích.",
            "Chỉ có một producer và một consumer, không cần buffer hoặc tách thời điểm xử lý.",
          ],
        },
        {
          type: "diagram",
          caption:
            "Đồng bộ: Service A chờ Service B trong suốt request nên ràng buộc runtime. Bất đồng bộ: A đẩy message vào broker rồi đi tiếp; B xử lý khi sẵn sàng.",
          nodes: [
            { id: "sc", label: "Client", tone: "sky", x: 20, y: 36, w: 110, h: 56 },
            { id: "sa", label: "Service A", tone: "emerald", x: 250, y: 36, w: 130, h: 56 },
            { id: "sb", label: "Service B", tone: "emerald", x: 500, y: 36, w: 130, h: 56 },
            { id: "ac", label: "Client", tone: "sky", x: 20, y: 190, w: 110, h: 56 },
            { id: "aa", label: "Service A", tone: "emerald", x: 250, y: 190, w: 130, h: 56 },
            {
              id: "q",
              label: "Broker",
              sub: "queue / topic",
              tone: "violet",
              x: 460,
              y: 186,
              w: 150,
              h: 64,
            },
            { id: "ab", label: "Service B", tone: "emerald", x: 690, y: 190, w: 130, h: 56 },
          ],
          edges: [
            { id: "sc-sa", from: "sc", to: "sa", label: "request" },
            { id: "sa-sb", from: "sa", to: "sb", label: "gọi & chờ" },
            { id: "ac-aa", from: "ac", to: "aa", label: "request" },
            { id: "aa-q", from: "aa", to: "q", label: "publish" },
            { id: "q-ab", from: "q", to: "ab", label: "consume khi rảnh" },
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Đồng bộ = gọi & chờ, ghép nối runtime chặt; bất đồng bộ = qua broker, ghép nối lỏng nhưng đổi lấy eventual consistency và độ phức tạp.",
            "Command là ý định, event là sự thật đã xảy ra.",
            "Bất đồng bộ không miễn phí: cần idempotent, xử lý thứ tự và tracing.",
            "Đừng dùng event-driven khi luồng đơn giản và cần nhất quán tức thời.",
          ],
        },
      ],
    },
    {
      slug: "sd-saga-outbox",
      title: "Saga và Transactional Outbox",
      module: "Architecture Patterns",
      summary:
        "Hai pattern xử lý dữ liệu giữa các service: Outbox giúp gửi message tin cậy; Saga duy trì tính nhất quán bằng chuỗi giao dịch cục bộ và compensating transaction.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "Khi mỗi service có database riêng, một thao tác nghiệp vụ trải qua nhiều service không thể gói gọn trong một transaction ACID. Bài này giới thiệu hai pattern giúp xử lý bài toán đó, đồng thời nêu những trường hợp không nên dùng chúng.",
        },
        { type: "h2", text: "Vì sao giao dịch phân tán khó" },
        {
          type: "p",
          text: "Với mô hình database per service, không thể mở một transaction bao trùm nhiều database. Two-phase commit (2PC) có thể làm việc đó về lý thuyết, nhưng thường được tránh trong microservices: 2PC là giao thức đồng bộ, đòi hỏi các bên cùng sẵn sàng và ghép nối chặt — chính là điều ta muốn hạn chế.",
        },
        { type: "h2", text: "Transactional Outbox: đảm bảo message không thất lạc" },
        {
          type: "p",
          text: "Vấn đề là service cần vừa cập nhật database, vừa gửi message/event. Nếu ghi database trước rồi mới gửi message, service có thể gặp sự cố giữa hai bước khiến message bị mất. Nếu gửi message trước khi transaction commit, transaction có thể rollback trong khi message đã được gửi.",
        },
        {
          type: "p",
          text: "Transactional Outbox giải quyết vấn đề này bằng cách ghi message vào bảng outbox trong cùng transaction cập nhật dữ liệu nghiệp vụ. Vì hai thao tác thuộc cùng một transaction, chúng hoặc cùng commit hoặc cùng rollback. Sau đó, một tiến trình riêng (message relay) đọc outbox và publish message lên broker.",
        },
        {
          type: "ul",
          items: [
            "Đảm bảo: message chỉ được gửi nếu transaction commit; thứ tự gửi tuân theo thứ tự ứng dụng ghi.",
            "Relay có thể publish message trùng (chẳng hạn gặp sự cố sau khi publish nhưng trước khi đánh dấu đã gửi), nên consumer phải xử lý idempotent.",
            "Có hai cách triển khai relay: polling publisher (quét bảng outbox định kỳ) hoặc transaction log tailing/CDC (theo dõi log database, chẳng hạn qua Debezium).",
          ],
        },
        {
          type: "p",
          text: "Ở phía consumer, pattern tương ứng là Inbox: ghi nhận message đã xử lý cùng với hiệu ứng nghiệp vụ trong một transaction, để có thể xử lý message trùng lặp an toàn.",
        },
        {
          type: "diagram",
          caption:
            "Service ghi dữ liệu nghiệp vụ và event vào outbox trong cùng một transaction; relay đọc outbox rồi publish lên broker. Không cần 2PC.",
          nodes: [
            {
              id: "service",
              label: "Service",
              sub: "xử lý command",
              tone: "emerald",
              x: 20,
              y: 70,
              w: 140,
              h: 64,
            },
            {
              id: "db",
              label: "DB nghiệp vụ",
              sub: "orders, ...",
              tone: "amber",
              x: 260,
              y: 20,
              w: 160,
              h: 56,
            },
            {
              id: "outbox",
              label: "Bảng Outbox",
              sub: "cùng transaction",
              tone: "amber",
              x: 260,
              y: 120,
              w: 160,
              h: 56,
            },
            {
              id: "relay",
              label: "Message relay",
              sub: "poll / CDC",
              tone: "violet",
              x: 500,
              y: 70,
              w: 160,
              h: 64,
            },
            {
              id: "broker",
              label: "Message broker",
              tone: "violet",
              x: 730,
              y: 70,
              w: 160,
              h: 56,
            },
          ],
          edges: [
            { id: "service-db", from: "service", to: "db", label: "1. ghi dữ liệu" },
            {
              id: "service-outbox",
              from: "service",
              to: "outbox",
              label: "1. ghi event",
            },
            { id: "outbox-relay", from: "outbox", to: "relay", label: "2. đọc" },
            { id: "relay-broker", from: "relay", to: "broker", label: "3. publish" },
          ],
        },
        { type: "h2", text: "Saga: giao dịch dài bằng chuỗi giao dịch cục bộ" },
        {
          type: "p",
          text: "Saga thay giao dịch phân tán bằng một chuỗi giao dịch cục bộ (local transaction). Mỗi bước cập nhật database của một service rồi phát message/event để kích hoạt bước tiếp theo. Nếu một bước thất bại do vi phạm quy tắc nghiệp vụ, saga chạy các compensating transaction để bù trừ những bước đã hoàn tất trước đó.",
        },
        {
          type: "ul",
          items: [
            "Choreography: các service trao đổi event mà không có bộ điều phối trung tâm. Cách này đơn giản khi có ít bước, nhưng luồng xử lý khó theo dõi khi số bước tăng.",
            "Orchestration: một orchestrator quản lý trình tự, gửi command đến từng participant, nhận phản hồi rồi quyết định bước tiếp theo. Luồng rõ ràng hơn, nhưng orchestrator phải hoạt động bền vững và không được trở thành điểm lỗi đơn (single point of failure).",
          ],
        },
        {
          type: "p",
          text: "Saga thường đi kèm Outbox: mỗi bước cần cập nhật database và phát event một cách nguyên tử — chính là bài toán Outbox đã nêu ở trên.",
        },
        { type: "h2", text: "Đánh đổi của Saga" },
        {
          type: "ul",
          items: [
            "Không có rollback tự động: khác với ACID, các thay đổi đã commit; vì vậy cần tự viết compensating transaction.",
            "Không có isolation: các saga chạy song song có thể nhìn thấy dữ liệu trung gian; cần biện pháp bổ sung (semantic lock, versioning).",
            "Nhất quán cuối (eventual consistency): trạng thái trung gian có thể tồn tại; Saga phù hợp với mô hình này hơn là yêu cầu nhất quán mạnh.",
            "Khó gỡ lỗi: logic nằm rải rác; càng nhiều bước càng khó lần theo luồng xử lý.",
            "Cần xử lý idempotent: retry và compensating transaction có thể được chạy nhiều lần.",
          ],
        },
        { type: "h2", text: "Khi nào không nên dùng Saga/Outbox" },
        {
          type: "ul",
          items: [
            "Thao tác chỉ liên quan đến một service và một database: dùng transaction ACID cục bộ, không cần thêm Saga.",
            "Lỗi chủ yếu mang tính tạm thời: retry với backoff có thể đã đủ; compensating transaction chỉ làm tăng độ phức tạp.",
            "Hệ thống không chấp nhận trạng thái trung gian hoặc không thể khôi phục về trạng thái hợp lệ: cần cơ chế đảm bảo nhất quán mạnh thay vì Saga.",
            "Không cần phát event ra ngoài: chỉ cần Outbox khi phải gửi message đến service hoặc broker khác.",
          ],
        },
        {
          type: "p",
          text: "Nguyên tắc chung: chỉ dùng pattern phân tán khi ranh giới giữa các service thực sự đòi hỏi.",
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Outbox: ghi dữ liệu và event trong cùng transaction, rồi relay publish → message chỉ được gửi khi transaction commit.",
            "Saga: chuỗi giao dịch cục bộ và compensating transaction giúp đạt nhất quán cuối mà không cần 2PC.",
            "Cả hai đều cần consumer xử lý idempotent; Saga không có rollback tự động hay isolation.",
            "Trong một service, transaction ACID cục bộ vẫn là lựa chọn phù hợp.",
          ],
        },
      ],
    },
  ],
};
