import type { CourseModule } from "@/lib/course-types";

export const sdDatabaseFundamentalsModule: CourseModule = {
  id: "sd-database-fundamentals",
  title: "Databases",
  lessons: [
    {
      slug: "sd-data-models",
      title: "Chọn mô hình dữ liệu: Relational, Document hay Key-Value",
      module: "Databases",
      summary:
        "Chọn mô hình dữ liệu theo cách ứng dụng truy cập dữ liệu (access pattern): bảng quan hệ cho dữ liệu liên kết, document cho dữ liệu tự chứa, key-value cho tra cứu bằng khóa.",
      duration: "11 phút",
      blocks: [
        {
          type: "p",
          text: "Chọn database là một trong những quyết định đầu tiên và khó thay đổi nhất khi thiết kế hệ thống. Câu hỏi không phải là “database nào tốt nhất?” mà là “mô hình dữ liệu nào phù hợp với cách ứng dụng thực sự truy vấn dữ liệu?”.",
        },
        {
          type: "p",
          text: "Mục tiêu: hiểu ba mô hình phổ biến — relational, document và key-value — cách chúng lưu dữ liệu, kiểu truy cập nào phù hợp với từng mô hình, và vì sao một hệ thống có thể dùng nhiều mô hình cùng lúc.",
        },
        { type: "h2", text: "Mô hình dữ liệu là gì?" },
        {
          type: "p",
          text: "Mô hình dữ liệu (data model) quy định cách tổ chức và truy vấn dữ liệu. Cùng một dữ liệu có thể được biểu diễn dưới dạng bảng (relational), tài liệu JSON (document), cặp key-value hoặc đồ thị (graph). Mỗi mô hình giúp một số kiểu truy vấn trở nên tự nhiên, nhưng lại khiến những kiểu khác trở nên bất tiện.",
        },
        { type: "h2", text: "Relational: dữ liệu có cấu trúc, nhiều liên kết" },
        {
          type: "p",
          text: "Relational lưu dữ liệu trong các bảng (table) gồm hàng (row) và cột (column), rồi truy vấn bằng SQL. Thế mạnh của mô hình này là xử lý các mối quan hệ: quan hệ nhiều-một và nhiều-nhiều được biểu diễn tự nhiên bằng khóa ngoại (foreign key) và JOIN.",
        },
        {
          type: "ul",
          items: [
            "Phù hợp khi dữ liệu có nhiều liên kết và cần JOIN để trả lời truy vấn.",
            "Schema chặt (schema-on-write, tức kiểm tra cấu trúc khi ghi): database từ chối dữ liệu sai cấu trúc.",
            "Hỗ trợ transaction (giao dịch) và các bảo đảm ACID — phù hợp với dữ liệu tài chính, đơn hàng, tồn kho.",
            "Ví dụ: PostgreSQL, MySQL, SQL Server.",
          ],
        },
        {
          type: "p",
          text: "Một đơn hàng liên quan đến nhiều thực thể — người dùng, đơn hàng, sản phẩm — và JOIN là cách tự nhiên để kết hợp dữ liệu của chúng.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "sql",
              code: "SELECT u.name, o.total\nFROM orders o\nJOIN users u ON u.id = o.user_id\nWHERE o.created_at > '2026-01-01';",
            },
          ],
        },
        { type: "h2", text: "Document: dữ liệu tự chứa trong một tài liệu" },
        {
          type: "p",
          text: "Document lưu mỗi bản ghi dưới dạng một tài liệu (thường là JSON/BSON) có thể tự chứa và lồng nhau. Nguyên tắc cốt lõi: dữ liệu thường được truy cập cùng nhau thì nên được lưu cùng nhau.",
        },
        {
          type: "ul",
          items: [
            "Có thể đọc cả cây dữ liệu trong một lần thay vì JOIN nhiều bảng — nhanh hơn nhờ tính cục bộ (locality).",
            "Schema linh hoạt (schema-on-read, tức diễn giải cấu trúc khi đọc): database không áp đặt cấu trúc; ứng dụng tự xử lý dữ liệu khi đọc.",
            "Phù hợp với dữ liệu ít quan hệ và gần với object trong code, như hồ sơ người dùng, bài viết, danh mục sản phẩm.",
            "Kém phù hợp khi dữ liệu có nhiều quan hệ chằng chịt (nhiều-nhiều) — thường phải nhân bản dữ liệu hoặc dùng tham chiếu.",
            "Ví dụ: MongoDB.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "json",
              code: '{\n  "_id": "u_42",\n  "name": "An",\n  "posts": [\n    { "title": "Hello", "likes": 12 },\n    { "title": "System Design", "likes": 8 }\n  ]\n}',
            },
          ],
        },
        {
          type: "p",
          text: "Nhúng (embed) dữ liệu con khi nó luôn được đọc cùng dữ liệu cha; dùng tham chiếu (reference) khi dữ liệu con được truy vấn độc lập hoặc thường xuyên thay đổi.",
        },
        { type: "h2", text: "Key-value: tra cứu bằng khóa" },
        {
          type: "p",
          text: "Key-value là mô hình đơn giản nhất: một map ánh xạ key (khóa) sang value (giá trị). Database tối ưu hai thao tác: get(key) để lấy giá trị và put(key, value) để ghi giá trị. Nó không hiểu cấu trúc bên trong value.",
        },
        {
          type: "ul",
          items: [
            "Tra cứu rất nhanh và dễ mở rộng theo chiều ngang vì chỉ cần tìm theo khóa.",
            "Không hỗ trợ truy vấn phức tạp (lọc theo thuộc tính, JOIN) nếu không bổ sung index (cấu trúc giúp tra cứu theo cách khác).",
            "Cần biết trước cách ứng dụng truy cập dữ liệu (access pattern) để thiết kế khóa phù hợp.",
            "Ví dụ: Redis (cache/session), DynamoDB.",
          ],
        },
        {
          type: "p",
          text: "Trong DynamoDB, khóa chính có thể gồm partition key (khóa phân vùng, được băm để quyết định nơi lưu) và sort key (khóa sắp xếp các mục trong cùng phân vùng). Muốn hỗ trợ thêm kiểu truy vấn khác, cần tạo secondary index (index phụ; GSI/LSI).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "GET  user:42         → hồ sơ người dùng\nPUT  session:abc123  → phiên đăng nhập\n\nDynamoDB: (PK = USER#42, SK = ORDER#2026-01)\n           → đơn hàng của user theo thời gian",
            },
          ],
        },
        { type: "h2", text: "Chọn theo cách truy cập dữ liệu" },
        {
          type: "p",
          text: "Đừng bắt đầu từ tên công nghệ; hãy bắt đầu từ những truy vấn ứng dụng thực sự cần chạy. Một vài câu hỏi giúp định hướng lựa chọn:",
        },
        {
          type: "ul",
          items: [
            "Dữ liệu con có luôn được đọc cùng dữ liệu cha không? Có → document; không → relational hoặc tách thành các bảng riêng.",
            "Có quan hệ nhiều-nhiều không? Có → relational (hoặc graph).",
            "Các kiểu truy vấn đã biết trước và chủ yếu tra cứu bằng khóa? → key-value.",
            "Cần tính nhất quán cao và transaction? → relational thường là lựa chọn an toàn.",
            "Một loại dữ liệu có nhiều cấu trúc (shape) thay đổi thường xuyên? → document linh hoạt hơn.",
          ],
        },
        {
          type: "diagram",
          caption:
            "Một ứng dụng có thể kết hợp nhiều mô hình: relational cho dữ liệu liên kết (đơn hàng, thanh toán), document cho dữ liệu tự chứa (hồ sơ, bài viết), key-value cho tra cứu bằng khóa (session, cache — vùng lưu dữ liệu để truy cập nhanh).",
          nodes: [
            { id: "app", label: "Ứng dụng", sub: "truy vấn theo cách truy cập", tone: "emerald", x: 20, y: 150, w: 170, h: 64 },
            { id: "rel", label: "Relational", sub: "bảng · JOIN · ACID", tone: "amber", x: 320, y: 30, w: 180, h: 64 },
            { id: "doc", label: "Document", sub: "JSON · tự chứa · linh hoạt", tone: "amber", x: 320, y: 150, w: 180, h: 64 },
            { id: "kv", label: "Key-Value", sub: "get/put theo khóa", tone: "amber", x: 320, y: 270, w: 180, h: 64 },
          ],
          edges: [
            { id: "app-rel", from: "app", to: "rel", label: "quan hệ" },
            { id: "app-doc", from: "app", to: "doc", label: "đọc cả cây" },
            { id: "app-kv", from: "app", to: "kv", label: "tra theo khoá" },
          ],
        },
        { type: "h2", text: "Schema chặt hay linh hoạt?" },
        {
          type: "p",
          text: "Relational thường dùng schema-on-write: định nghĩa cấu trúc trước để database kiểm tra dữ liệu khi ghi. Document thường dùng schema-on-read: database không áp đặt cấu trúc, còn ứng dụng diễn giải dữ liệu khi đọc. Đánh đổi: schema chặt giúp phát hiện lỗi sớm và tối ưu tốt hơn; schema linh hoạt giúp thay đổi nhanh nhưng chuyển việc kiểm tra sang code. Lưu ý: “schemaless” (không schema) là cách gọi chưa chính xác — schema vẫn tồn tại, chỉ là không được khai báo tường minh.",
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Không có database tốt nhất cho mọi trường hợp; hãy chọn theo cách ứng dụng truy cập dữ liệu (access pattern).",
            "Relational: dữ liệu có quan hệ, JOIN, ACID. Document: dữ liệu tự chứa, schema linh hoạt. Key-value: tra cứu bằng khóa, rất nhanh.",
            "Nhiều hệ thống thực tế dùng polyglot persistence: chọn mô hình phù hợp cho từng loại dữ liệu.",
            "Chọn mô hình là chuyện dữ liệu; mở rộng một máy thành nhiều máy là chuyện của Database Scaling Techniques — xem Sharding và Replication.",
          ],
        },
      ],
    },
    {
      slug: "sd-transactions-acid",
      title: "Schema, transaction và ACID/isolation",
      module: "Databases",
      summary:
        "So sánh schema-on-write với schema-on-read; tìm hiểu transaction theo nguyên tắc all-or-nothing, bốn tính chất ACID và các mức isolation cơ bản.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "Chuyển 100.000đ từ tài khoản A sang B gồm hai bước: trừ tiền ở A rồi cộng vào B. Nếu hệ thống gặp sự cố sau bước đầu, số tiền có thể bị thất thoát. Transaction (giao dịch) gom nhiều bước thành một đơn vị không thể chia cắt.",
        },
        {
          type: "p",
          text: "Mục tiêu: hiểu schema được kiểm tra lúc ghi hay lúc đọc, transaction giải quyết vấn đề gì, bốn tính chất ACID và lý do có nhiều mức isolation khác nhau.",
        },
        { type: "h2", text: "Schema: kiểm tra lúc ghi hay lúc đọc?" },
        {
          type: "p",
          text: "Schema mô tả cấu trúc dữ liệu: gồm những bảng/collection, cột/field, kiểu dữ liệu và ràng buộc nào (ví dụ email phải là duy nhất). Có thể kiểm tra schema ở hai thời điểm khác nhau.",
        },
        {
          type: "ul",
          items: [
            "Schema-on-write: database kiểm tra dữ liệu ngay lúc ghi và từ chối dữ liệu sai cấu trúc. Đây là cách thường dùng trong relational. Ưu điểm: phát hiện lỗi sớm, dữ liệu nhất quán. Nhược điểm: thay đổi cấu trúc cần migration (quá trình cập nhật schema và dữ liệu).",
            "Schema-on-read: database nhận dữ liệu như được gửi đến, còn ứng dụng diễn giải dữ liệu khi đọc. Đây là cách nhiều document store sử dụng. Ưu điểm: linh hoạt, dễ thay đổi cấu trúc (shape). Nhược điểm: lỗi dữ liệu có thể chỉ lộ ra muộn và nhiều cấu trúc khác nhau cùng tồn tại.",
          ],
        },
        {
          type: "p",
          text: "Mỗi cách đều có đánh đổi: schema-on-write kiểm tra lúc ghi; schema-on-read chuyển việc kiểm tra sang code ứng dụng mỗi khi đọc.",
        },
        { type: "h2", text: "Transaction là gì" },
        {
          type: "p",
          text: "Transaction (giao dịch) nhóm nhiều thao tác đọc/ghi thành một đơn vị all-or-nothing (tất cả cùng thành công hoặc không thao tác nào có hiệu lực). Các trạng thái trung gian không hiển thị với transaction khác.",
        },
        {
          type: "p",
          text: "Khi chuyển tiền, cả hai thao tác cập nhật nằm trong cùng một transaction:",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "sql",
              code: "BEGIN;\nUPDATE accounts SET balance = balance - 100000 WHERE id = 'A';\nUPDATE accounts SET balance = balance + 100000 WHERE id = 'B';\nCOMMIT;     -- cả hai cùng thành công\n-- ROLLBACK; -- hoặc cả hai cùng bị huỷ",
            },
          ],
        },
        { type: "h2", text: "Bốn tính chất ACID" },
        {
          type: "ul",
          items: [
            "Atomicity (tính nguyên tử): all-or-nothing — hoặc mọi thao tác cùng có hiệu lực, hoặc không thao tác nào. Nếu lỗi giữa chừng, database rollback toàn bộ.",
            "Consistency (tính nhất quán): transaction đưa database từ trạng thái hợp lệ này sang trạng thái hợp lệ khác, đồng thời tôn trọng các ràng buộc. Lưu ý: nghĩa này khác với chữ C trong CAP.",
            "Isolation (tính cô lập): các transaction chạy đồng thời không thấy những thay đổi chưa hoàn tất của nhau; kết quả tương đương như thể chúng chạy lần lượt.",
            "Durability (tính bền vững): sau khi transaction commit, dữ liệu được lưu bền vững (thường qua write-ahead log trên đĩa) và không mất khi hệ thống gặp sự cố.",
          ],
        },
        {
          type: "p",
          text: "Trong PostgreSQL, theo mặc định, mỗi câu lệnh SQL cũng chạy trong một transaction ngầm.",
        },
        { type: "h2", text: "Isolation và các hiện tượng bất thường" },
        {
          type: "p",
          text: "Isolation hoàn hảo tương đương với chạy tuần tự (serializable), nhưng có thể tốn kém. SQL định nghĩa bốn mức isolation; mỗi mức ngăn thêm một số hiện tượng bất thường (anomaly) do các transaction chạy đồng thời.",
        },
        {
          type: "ul",
          items: [
            "Dirty read: đọc dữ liệu chưa commit của transaction khác — transaction đó vẫn có thể rollback.",
            "Non-repeatable read: đọc cùng một dòng hai lần trong một transaction nhưng nhận giá trị khác nhau vì transaction khác đã commit ở giữa hai lần đọc.",
            "Phantom read: chạy lại truy vấn theo cùng một điều kiện nhưng nhận tập dòng khác, vì transaction khác đã thêm dòng thỏa điều kiện.",
            "Serialization anomaly: kết quả sau khi commit không tương ứng với bất kỳ thứ tự chạy tuần tự nào (ví dụ write skew).",
          ],
        },
        {
          type: "p",
          text: "Bốn mức isolation, từ yếu đến mạnh:",
        },
        {
          type: "ul",
          items: [
            "Read uncommitted: cho phép dirty read. PostgreSQL xử lý mức này như Read committed.",
            "Read committed: mức mặc định của PostgreSQL. Không cho phép dirty read, nhưng vẫn có thể xảy ra non-repeatable read và phantom read.",
            "Repeatable read: transaction nhìn thấy một snapshot ổn định. PostgreSQL còn ngăn phantom read (mạnh hơn mức tối thiểu của tiêu chuẩn), nhưng serialization anomaly vẫn có thể xảy ra.",
            "Serializable: mức mạnh nhất, mô phỏng việc chạy tuần tự. Transaction có thể bị hủy (serialization failure), nên ứng dụng cần retry (thử lại).",
          ],
        },
        {
          type: "p",
          text: "Ví dụ về write skew: có hai bác sĩ đang trực; mỗi transaction kiểm tra rằng “còn ít nhất hai người trực” rồi cho một bác sĩ rút ca. Mỗi transaction riêng lẻ đều hợp lệ, nhưng nếu chạy đồng thời, kết quả có thể là không còn ai trực. Chỉ Serializable phát hiện được trường hợp này vì kết quả không tương ứng với bất kỳ thứ tự chạy tuần tự nào.",
        },
        {
          type: "p",
          text: "Một khác biệt đáng lưu ý giữa các database: PostgreSQL mặc định dùng Read committed, còn InnoDB của MySQL mặc định dùng Repeatable read.",
        },
        {
          type: "diagram",
          caption:
            "Bốn mức isolation: càng lên cao càng loại bỏ nhiều anomaly nhưng càng tốn kém và càng dễ phải retry. Serializable là mức duy nhất loại bỏ serialization anomaly.",
          nodes: [
            { id: "ru", label: "Read uncommitted", sub: "dirty read có thể", tone: "rose", x: 20, y: 120, w: 180, h: 64 },
            { id: "rc", label: "Read committed", sub: "mặc định PostgreSQL", tone: "amber", x: 250, y: 120, w: 190, h: 64 },
            { id: "rr", label: "Repeatable read", sub: "snapshot ổn định", tone: "sky", x: 490, y: 120, w: 180, h: 64 },
            { id: "se", label: "Serializable", sub: "tuần tự · có retry", tone: "emerald", x: 720, y: 120, w: 180, h: 64 },
          ],
          edges: [
            { id: "ru-rc", from: "ru", to: "rc", label: "mạnh hơn" },
            { id: "rc-rr", from: "rc", to: "rr", label: "mạnh hơn" },
            { id: "rr-se", from: "rr", to: "se", label: "mạnh hơn" },
          ],
        },
        { type: "h2", text: "Đánh đổi" },
        {
          type: "p",
          text: "Isolation cao hơn giảm anomaly nhưng tăng tranh chấp khoá, giảm mức đồng thời và tăng tỉ lệ retry. Nhiều ứng dụng sống tốt với Read committed. Khi có ràng buộc nghiệp vụ phức tạp trải trên nhiều dòng, hãy cân nhắc Serializable và xử lý retry, thay vì tự vá bằng khoá thủ công.",
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Schema-on-write kiểm tra lúc ghi (relational); schema-on-read kiểm tra lúc đọc (document).",
            "Transaction = một đơn vị all-or-nothing; ACID gồm Atomicity, Consistency, Isolation, Durability.",
            "Các mức isolation lần lượt ngăn dirty read, non-repeatable read, phantom read và serialization anomaly.",
            "Isolation càng cao thì càng hạn chế anomaly nhưng có thể giảm khả năng xử lý đồng thời; Serializable có thể cần retry.",
          ],
        },
      ],
    },
    {
      slug: "sd-indexes-queries",
      title: "Index, truy vấn và đánh đổi giữa đọc, ghi, dung lượng",
      module: "Databases",
      summary:
        "Tìm hiểu cách index thay việc quét toàn bảng bằng tra cứu log n, B-tree, composite index và leftmost prefix; cùng đánh đổi giữa tốc độ đọc, tốc độ ghi và dung lượng lưu trữ.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "Không có index, database phải quét toàn bảng và kiểm tra từng dòng để tìm dữ liệu thỏa điều kiện. Việc này không đáng kể với 100 dòng, nhưng có thể rất tốn kém với 100 triệu dòng. Index là cấu trúc phụ giúp đọc nhanh hơn, đổi lại tốc độ ghi giảm và tốn thêm dung lượng.",
        },
        {
          type: "p",
          text: "Mục tiêu: hiểu khái niệm index, cách B-tree hỗ trợ truy vấn, quy tắc leftmost prefix của composite index, covering index và khi nào không nên thêm index.",
        },
        { type: "h2", text: "Vì sao cần index?" },
        {
          type: "p",
          text: "Không có index, database phải full table scan (quét toàn bảng): đọc từng dòng để kiểm tra điều kiện, với độ phức tạp O(n). Có index, database duyệt cây tìm kiếm để nhanh chóng tìm đến dòng phù hợp, với độ phức tạp O(log n). PostgreSQL ví index như mục lục tra cứu ở cuối một cuốn sách dày.",
        },
        { type: "h2", text: "B-tree: loại index mặc định" },
        {
          type: "ul",
          items: [
            "B-tree (trên thực tế thường là B+tree) là cây cân bằng: mọi nút lá có cùng độ sâu, nên tra cứu có độ phức tạp O(log n).",
            "Các khóa được sắp xếp và các nút lá được liên kết với nhau, nhờ đó quét một khoảng (range scan) và trả kết quả theo thứ tự rất hiệu quả.",
            "Hỗ trợ so sánh bằng (=), so sánh theo khoảng (<, >, BETWEEN) và ORDER BY.",
            "Là index mặc định trong PostgreSQL và MySQL/InnoDB.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "B-tree (rút gọn):\n            [ 50 ]\n          /        \\\n      [10 30]     [70 90]     ← node trong: điều hướng\n      /  |  \\      /  |  \\\n    lá  lá  lá   lá  lá  lá     ← lá: khoá + con trỏ tới dòng\n\nmỗi lần tra cứu chỉ đi vài tầng, không đọc cả bảng",
            },
          ],
        },
        { type: "h2", text: "Composite index và quy tắc leftmost prefix" },
        {
          type: "p",
          text: "Composite index (index nhiều cột) sắp xếp dữ liệu theo thứ tự các cột đã khai báo. Index này hoạt động hiệu quả nhất khi truy vấn có cột ngoài cùng bên trái (leftmost column).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "sql",
              code: "CREATE INDEX idx_orders_user_time ON orders (user_id, created_at);\n\n-- dùng được:\n--   WHERE user_id = 42\n--   WHERE user_id = 42 AND created_at > '2026-01-01'\n\n-- KHÔNG dùng tốt (thiếu cột trái nhất):\n--   WHERE created_at > '2026-01-01'",
            },
          ],
        },
        {
          type: "ul",
          items: [
            "Index (a, b, c) hỗ trợ truy vấn theo (a), (a, b) hoặc (a, b, c) — nhưng không hỗ trợ tốt truy vấn chỉ theo (b) hoặc (c).",
            "Nguyên tắc thường dùng: đặt cột được so sánh bằng trước, cột được truy vấn theo khoảng sau.",
            "Chọn sai thứ tự cột là lỗi phổ biến: truy vấn có thể không tận dụng được index và phải quét toàn bảng.",
          ],
        },
        { type: "h2", text: "Covering index" },
        {
          type: "p",
          text: "Nếu index chứa mọi cột truy vấn cần — cả cột dùng để lọc lẫn cột cần trả về — database có thể trả lời trực tiếp từ index mà không cần đọc bảng (index-only scan). Cách này hữu ích với truy vấn thường xuyên, nhưng khiến index lớn hơn và tốc độ ghi chậm hơn.",
        },
        { type: "h2", text: "Đánh đổi giữa tốc độ đọc, ghi và dung lượng" },
        {
          type: "ul",
          items: [
            "Đọc: nhanh hơn khi điều kiện truy vấn khớp với index; nếu không có index phù hợp, database phải quét toàn bảng.",
            "Ghi: mỗi thao tác INSERT/UPDATE/DELETE phải cập nhật các index liên quan — càng nhiều index, ghi càng chậm (write amplification, tức lượng ghi phát sinh thêm).",
            "Dung lượng: index chiếm chỗ trên đĩa; tổng dung lượng index có thể vượt dung lượng của bảng.",
            "Bảo trì: index có thể phân mảnh theo thời gian và cần vacuum/rebuild; nhiều index cũng khiến query planner phải cân nhắc thêm phương án.",
          ],
        },
        {
          type: "p",
          text: "Về cách lưu trữ: trong InnoDB/MySQL, index chính (clustered index) chính là bảng được sắp xếp theo primary key. Index phụ (secondary index) chứa primary key nên cần thêm một bước tra cứu để lấy dòng; vì vậy, primary key ngắn giúp index phụ nhỏ hơn. PostgreSQL lưu bảng riêng với index (heap), còn secondary index trỏ đến vị trí của dòng.",
        },
        {
          type: "diagram",
          caption:
            "Có index, truy vấn duyệt B-tree (~log n trang) rồi lấy đúng dòng; không index, database phải quét toàn bảng từng dòng (O(n)).",
          nodes: [
            { id: "query", label: "Truy vấn", sub: "WHERE user_id = 42", tone: "sky", x: 20, y: 150, w: 160, h: 64 },
            { id: "index", label: "Index B-tree", sub: "tra cứu ~log n", tone: "amber", x: 300, y: 40, w: 170, h: 64 },
            { id: "row", label: "Bản ghi", sub: "lấy dòng cần", tone: "emerald", x: 560, y: 40, w: 150, h: 64 },
            { id: "table", label: "Toàn bảng", sub: "quét O(n) từng dòng", tone: "zinc", x: 300, y: 270, w: 190, h: 64 },
          ],
          edges: [
            { id: "query-index", from: "query", to: "index", label: "có index" },
            { id: "index-row", from: "index", to: "row", label: "trỏ tới dòng" },
            { id: "query-table", from: "query", to: "table", label: "không index", dashed: true },
          ],
        },
        { type: "h2", text: "Khi nào không nên index" },
        {
          type: "ul",
          items: [
            "Cột ít giá trị phân biệt (low cardinality), ví dụ boolean hay status 3 giá trị: index gần như không lọc được gì.",
            "Bảng nhỏ: quét toàn bảng đã nhanh hơn duyệt index.",
            "Cột không bao giờ xuất hiện trong WHERE, JOIN hay ORDER BY.",
            "Index trùng: đã có (a, b) thì index riêng trên (a) thường thừa.",
          ],
        },
        { type: "h2", text: "Kết nối tới Database Scaling Techniques" },
        {
          type: "p",
          text: "Index giúp một database đơn lẻ trả lời truy vấn nhanh hơn, nhưng nó không giúp dữ liệu vượt qua giới hạn một máy. Khi dữ liệu và lưu lượng lớn hơn một node chịu nổi, ta cần chia dữ liệu ra nhiều node (sharding) và sao chép để tăng khả năng đọc, chịu lỗi (replication). Hai chủ đề đó được dạy trong module Database Scaling Techniques — hãy đọc tiếp Sharding và Replication.",
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Index dùng thêm dung lượng và làm chậm thao tác ghi để tăng tốc độ đọc: O(log n) thay cho O(n).",
            "B-tree là loại index mặc định, hỗ trợ so sánh bằng, truy vấn theo khoảng và sắp xếp.",
            "Composite index tuân theo quy tắc leftmost prefix: index (a, b, c) hỗ trợ truy vấn theo a, (a, b) và (a, b, c).",
            "Covering index cho phép trả lời truy vấn trực tiếp từ index; không nên tạo index tràn lan.",
          ],
        },
      ],
    },
  ],
};
