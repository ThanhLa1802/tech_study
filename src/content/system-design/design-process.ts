import type { CourseModule } from "@/lib/course-types";

export const sdDesignProcessModule: CourseModule = {
  id: "sd-design-process",
  title: "Design Process",
  lessons: [
    {
      slug: "sd-design-process",
      title: "Quy trình phân tích một đề System Design",
      module: "Design Process",
      summary:
        "Bảy bước từ làm rõ yêu cầu, ước lượng, thiết kế API và dữ liệu, thiết kế mức cao đến đi sâu, tìm điểm nghẽn và kết luận — kèm cách trình bày kết quả.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "System design không chỉ là vẽ sơ đồ. Một quy trình rõ ràng giúp bạn không bỏ sót yêu cầu, tránh chọn công nghệ quá sớm và biết lúc nào cần đi sâu vào một vấn đề. Khung dưới đây dùng được cả trong phỏng vấn lẫn khi thiết kế hệ thống thực tế.",
        },
        { type: "h2", text: "Bước 1 — Làm rõ yêu cầu (clarify)" },
        {
          type: "p",
          text: "Đừng bắt đầu thiết kế khi chưa hiểu bài toán. Trước hết, chia yêu cầu thành hai nhóm:",
        },
        {
          type: "ul",
          items: [
            "Yêu cầu chức năng: hệ thống cần làm được gì? Liệt kê các chức năng rồi chốt phạm vi — thời gian có hạn nên hãy chọn 2–3 tính năng cốt lõi.",
            "Yêu cầu phi chức năng: quy mô (số người dùng, số request), độ trễ, tính sẵn sàng, tính nhất quán, chi phí và bảo mật.",
            "Câu hỏi cần chốt: Ai sẽ dùng hệ thống? Tải đọc hay tải ghi lớn hơn? Có thể chấp nhận dữ liệu trễ tối đa bao lâu? Có cần realtime không?",
          ],
        },
        {
          type: "p",
          text: "Hãy ghi lại các giả định ngay khi đưa ra. Giả định rõ ràng là một phần của lời giải, không phải điều cần giấu đi.",
        },
        { type: "h2", text: "Bước 2 — Ước lượng nhanh (capacity estimation)" },
        {
          type: "p",
          text: "Mục tiêu không phải tìm ra con số chính xác, mà là ước lượng bậc độ lớn để định hướng kiến trúc: 12 RPS có thể chỉ cần một server; 12 triệu RPS có thể cần sharding, cache và CDN. Các công thức cơ bản:",
        },
        {
          type: "ul",
          items: [
            "RPS trung bình = (số người dùng hoạt động mỗi ngày × số request mỗi người mỗi ngày) / 86.400 giây.",
            "RPS đỉnh = RPS trung bình × hệ số đỉnh (thường là 2–3, đôi khi cao hơn).",
            "Dung lượng lưu trữ = tốc độ ghi × kích thước mỗi bản ghi × thời gian lưu giữ; nếu lưu nhiều bản, nhân thêm hệ số bản sao.",
            "Băng thông = RPS × kích thước response; tính riêng chiều vào (ingress) và chiều ra (egress).",
          ],
        },
        {
          type: "p",
          text: "Tỷ lệ đọc/ghi giúp xác định vị trí cần cache và replica; nhiều hệ thống có tải đọc lớn hơn nhiều so với tải ghi. Mọi con số đều dựa trên giả định — hãy nêu rõ chúng và kiểm tra độ nhạy: nếu một giả định sai gấp đôi, kết luận có thay đổi không?",
        },
        {
          type: "p",
          text: "Bài tiếp theo trình bày kỹ hơn cách ước lượng qua một ví dụ ngắn.",
        },
        { type: "h2", text: "Bước 3 — API và mô hình dữ liệu" },
        {
          type: "p",
          text: "Xác định một số endpoint chính (chẳng hạn POST /urls và GET /{mã}) cùng mô hình dữ liệu cốt lõi. Cần trả lời các câu hỏi: khóa chính là gì, dữ liệu nào cần index, và nên chọn SQL hay NoSQL dựa trên cách hệ thống truy cập dữ liệu — không phải theo sở thích.",
        },
        {
          type: "p",
          text: "API là hợp đồng giữa client và hệ thống; mô hình dữ liệu bộc lộ những quyết định ảnh hưởng đến khả năng mở rộng (scale).",
        },
        { type: "h2", text: "Bước 4 — Thiết kế mức cao (high-level design)" },
        {
          type: "p",
          text: "Vẽ các thành phần chính và đường đi của request: client → LB/gateway → service → cache/database → queue/worker. Tách luồng đọc khỏi luồng ghi để xác định chỗ cần cache và chỗ nên xử lý bất đồng bộ.",
        },
        {
          type: "p",
          text: "Ở bước này, có thể áp dụng các thành phần đã học: load balancing, caching, CDN, sharding, replication và queue. Hãy xuất phát từ yêu cầu, không phải từ danh sách công nghệ.",
        },
        { type: "h2", text: "Bước 5 — Đi sâu (deep dive)" },
        {
          type: "p",
          text: "Chọn một hoặc hai vấn đề khó nhất và phân tích kỹ: làm sao tránh hot shard? Xử lý cache stampede thế nào? Làm sao bảo đảm message không bị mất? Phần này thể hiện chiều sâu, vì vậy hãy tập trung vào vấn đề trọng tâm thay vì trình bày dàn trải.",
        },
        {
          type: "p",
          text: "Một phần deep dive tốt cần nêu rõ vấn đề, các phương án có thể chọn, tiêu chí lựa chọn và phương án cuối cùng cùng những đánh đổi đi kèm.",
        },
        { type: "h2", text: "Bước 6 — Điểm nghẽn, lỗi và đánh đổi" },
        {
          type: "ul",
          items: [
            "Điểm nghẽn: thành phần nào sẽ chạm giới hạn trước? Thành phần đó có phải là điểm lỗi đơn (single point of failure) không?",
            "Chế độ lỗi: nếu database chính, cache hoặc broker gặp sự cố, hệ thống còn phục vụ được không? Hệ thống suy giảm có kiểm soát (graceful degradation) ra sao?",
            "Đánh đổi: tính nhất quán hay tính sẵn sàng, độ trễ hay thông lượng, SQL hay NoSQL, đồng bộ hay bất đồng bộ. Nêu cả điều phải đánh đổi, không chỉ lợi ích.",
          ],
        },
        { type: "h2", text: "Bước 7 — Kết luận và giao tiếp" },
        {
          type: "p",
          text: "Tóm tắt thiết kế trong vài câu: yêu cầu chính, các quyết định quan trọng, lý do lựa chọn và những đánh đổi. Nêu rõ phần nào được xử lý trong phạm vi thiết kế và vấn đề nào còn bỏ ngỏ. Kết luận tốt giúp người nghe hiểu toàn cảnh mà không cần xem lại sơ đồ.",
        },
        {
          type: "ul",
          items: [
            "Mô tả đường đi của một request từ đầu đến cuối.",
            "Nêu những gì sẽ thay đổi nếu quy mô tăng gấp 10 hoặc gấp 100.",
            "Nêu các câu hỏi còn bỏ ngỏ, nếu có, thay vì giả định rằng mọi vấn đề đã được giải quyết.",
          ],
        },
        {
          type: "diagram",
          caption:
            "Bảy bước không nhất thiết tuyến tính tuyệt đối — bạn có thể quay lại bước trước khi phát hiện giả định sai — nhưng thứ tự này giúp không bỏ sót.",
          nodes: [
            {
              id: "step-1",
              label: "1. Làm rõ yêu cầu",
              tone: "sky",
              x: 20,
              y: 30,
              w: 170,
              h: 56,
            },
            {
              id: "step-2",
              label: "2. Ước lượng",
              tone: "violet",
              x: 250,
              y: 30,
              w: 160,
              h: 56,
            },
            {
              id: "step-3",
              label: "3. API & dữ liệu",
              tone: "emerald",
              x: 470,
              y: 30,
              w: 180,
              h: 56,
            },
            {
              id: "step-4",
              label: "4. High-level design",
              tone: "emerald",
              x: 20,
              y: 170,
              w: 190,
              h: 56,
            },
            {
              id: "step-5",
              label: "5. Deep dive",
              tone: "amber",
              x: 270,
              y: 170,
              w: 160,
              h: 56,
            },
            {
              id: "step-6",
              label: "6. Bottleneck & trade-offs",
              tone: "rose",
              x: 490,
              y: 170,
              w: 230,
              h: 56,
            },
            {
              id: "step-7",
              label: "7. Kết luận & giao tiếp",
              tone: "sky",
              x: 270,
              y: 310,
              w: 200,
              h: 56,
            },
          ],
          edges: [
            { id: "s1-s2", from: "step-1", to: "step-2" },
            { id: "s2-s3", from: "step-2", to: "step-3" },
            { id: "s3-s4", from: "step-3", to: "step-4", label: "vẽ khối" },
            { id: "s4-s5", from: "step-4", to: "step-5" },
            { id: "s5-s6", from: "step-5", to: "step-6" },
            { id: "s6-s7", from: "step-6", to: "step-7" },
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Làm rõ yêu cầu trước và chọn phạm vi cốt lõi.",
            "Ước lượng để định hướng kiến trúc, không phải để tìm con số chính xác.",
            "Suy ra thiết kế từ yêu cầu, không bắt đầu từ công nghệ.",
            "Đi sâu vào một hoặc hai vấn đề khó; luôn nêu chế độ lỗi và các đánh đổi.",
            "Kết thúc bằng phần tóm tắt và các giả định đã dùng.",
          ],
        },
      ],
    },
    {
      slug: "sd-back-of-envelope-estimation",
      title: "Ước lượng nhanh (Back-of-Envelope)",
      module: "Design Process",
      summary:
        "Công thức tính RPS, dung lượng lưu trữ và băng thông, kèm một ví dụ ngắn; tập trung vào bậc độ lớn và giả định thay vì con số chính xác.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Ước lượng nhanh giúp chuyển yêu cầu mơ hồ (“khoảng vài triệu người dùng”) thành các con số đủ để định hướng thiết kế. Sai số gấp đôi thường không làm thay đổi kết luận; sai lệch gấp trăm lần mới có thể khiến ta phải chọn kiến trúc khác.",
        },
        { type: "h2", text: "Các hằng số nên nhớ" },
        {
          type: "ul",
          items: [
            "Số giây trong một ngày ≈ 86.400 (thường làm tròn thành 10^5).",
            "Bậc độ lớn của dung lượng: nghìn ≈ 10^3 (KB), triệu ≈ 10^6 (MB), tỉ ≈ 10^9 (GB), nghìn tỉ ≈ 10^12 (TB).",
            "Một số kích thước tham khảo: bản ghi metadata khoảng 1 KB; ảnh nén khoảng vài trăm KB; một phút video HD khoảng 50 MB.",
          ],
        },
        {
          type: "p",
          text: "Kích thước thực tế thay đổi tùy định dạng và mức nén; các con số trên chỉ nhằm ước lượng bậc độ lớn.",
        },
        { type: "h2", text: "Công thức" },
        {
          type: "ul",
          items: [
            "RPS trung bình = (DAU × số request mỗi người mỗi ngày) / 86.400.",
            "RPS đỉnh = RPS trung bình × hệ số đỉnh (2–3, hoặc cao hơn nếu lưu lượng tập trung).",
            "Dung lượng lưu trữ mỗi ngày = số bản ghi mới mỗi ngày × kích thước mỗi bản ghi; sau đó nhân với số ngày lưu giữ và hệ số bản sao.",
            "Băng thông = RPS × kích thước mỗi response; tính riêng ingress và egress.",
            "Số server ≈ RPS đỉnh / khả năng xử lý của mỗi server (đây là giá trị ước tính, không phải hằng số).",
          ],
        },
        {
          type: "p",
          text: "Nếu tỷ lệ đọc/ghi chênh lệch đáng kể, hãy tính riêng RPS đọc và RPS ghi rồi áp dụng công thức tương ứng.",
        },
        { type: "h2", text: "Ví dụ nhỏ: dịch vụ rút gọn URL" },
        {
          type: "p",
          text: "Giả sử có 10 triệu người dùng hoạt động mỗi ngày (DAU), mỗi người tạo 0,1 URL và truy cập 5 URL. Bỏ qua lưu lượng từ bot và các đỉnh bất thường.",
        },
        {
          type: "ul",
          items: [
            "Ghi: 10^7 × 0,1 = 10^6 URL mới/ngày → RPS ghi trung bình = 10^6 / 86.400 ≈ 12; đỉnh gấp 3 → khoảng 36.",
            "Đọc: 10^7 × 5 = 5 × 10^7 lượt truy cập/ngày → RPS đọc trung bình ≈ 580; đỉnh gấp 3 → khoảng 1.740.",
            "Tỷ lệ đọc/ghi ≈ 50:1 → hệ thống thiên về đọc, vì vậy cache là ưu tiên.",
            "Dung lượng lưu trữ: giả sử mỗi bản ghi URL chiếm 500 byte; 10^6 × 500 B = 500 MB/ngày → khoảng 180 GB/năm; nhân hệ số nhân bản 3 → khoảng 540 GB/năm. Đây là mức dung lượng chưa cần sharding.",
            "Băng thông: phần lớn lưu lượng là redirect với response rất nhỏ (vài trăm byte), nên đây không phải điểm nóng.",
          ],
        },
        {
          type: "p",
          text: "Kết luận từ phép ước lượng: ở quy mô này, một service stateless phía sau load balancer, một database có replication và cache cho luồng đọc là đủ. Chỉ khi quy mô tăng nhiều bậc mới cần sharding.",
        },
        { type: "h2", text: "Sai lầm thường gặp" },
        {
          type: "ul",
          items: [
            "Nêu con số quá chính xác mà không nói rõ giả định — người nghe không thể kiểm chứng kết quả.",
            "Bỏ qua hệ số đỉnh, dù lưu lượng thực tế không phân bố đều theo thời gian.",
            "Quên tính hệ số nhân bản và thời gian lưu giữ khi ước lượng dung lượng lưu trữ.",
            "Nhầm throughput (lượng dữ liệu thực sự đi qua mỗi giây) với bandwidth (dung lượng tối đa của đường truyền).",
          ],
        },
        { type: "h2", text: "Tham chiếu độ trễ (bậc độ lớn)" },
        {
          type: "p",
          text: "Các con số tham khảo này (theo Jeff Dean, xấp xỉ từ thập niên 2010) giúp hình dung chi phí tương đối. Phần cứng đã thay đổi, nhưng bậc độ lớn vẫn hữu ích:",
        },
        {
          type: "ul",
          items: [
            "Truy cập bộ nhớ chính: ~100 ns.",
            "Đọc ngẫu nhiên 4 KB từ SSD: ~150 µs.",
            "Một lượt đi-về trong cùng datacenter: ~0,5 ms (~500 µs).",
            "Tìm kiếm trên đĩa quay (disk seek): ~10 ms.",
            "Gửi gói tin từ California đến Hà Lan rồi quay về: ~150 ms.",
          ],
        },
        {
          type: "p",
          text: "Điểm cần nhớ: một lần gọi qua mạng có thể tốn thời gian gấp hàng nghìn lần truy cập bộ nhớ; khoảng cách địa lý cũng đặt ra mức độ trễ tối thiểu.",
        },
        {
          type: "diagram",
          caption:
            "Từ cùng một bộ giả định, suy ra RPS, storage và bandwidth; mỗi kết quả phục vụ một quyết định thiết kế khác nhau.",
          nodes: [
            {
              id: "assumptions",
              label: "Giả định",
              sub: "DAU · request · size",
              tone: "sky",
              x: 20,
              y: 90,
              w: 190,
              h: 64,
            },
            {
              id: "rps",
              label: "RPS",
              sub: "÷ 86.400 × đỉnh",
              tone: "emerald",
              x: 330,
              y: 10,
              w: 180,
              h: 60,
            },
            {
              id: "storage",
              label: "Storage",
              sub: "ghi × size × lưu giữ",
              tone: "amber",
              x: 330,
              y: 100,
              w: 200,
              h: 60,
            },
            {
              id: "bandwidth",
              label: "Bandwidth",
              sub: "RPS × response",
              tone: "violet",
              x: 330,
              y: 190,
              w: 180,
              h: 60,
            },
          ],
          edges: [
            { id: "assumptions-rps", from: "assumptions", to: "rps" },
            { id: "assumptions-storage", from: "assumptions", to: "storage" },
            { id: "assumptions-bandwidth", from: "assumptions", to: "bandwidth" },
          ],
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "Chia cho 86.400 để đổi từ số liệu theo ngày sang mỗi giây; nhân hệ số đỉnh để dự phòng.",
            "Dung lượng lưu trữ = tốc độ ghi × kích thước × thời gian lưu giữ × hệ số bản sao.",
            "Băng thông = RPS × kích thước response; tính riêng ingress và egress.",
            "Luôn nêu rõ giả định và tập trung vào bậc độ lớn.",
          ],
        },
      ],
    },
  ],
};
