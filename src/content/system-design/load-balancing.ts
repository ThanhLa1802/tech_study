import type { CourseModule } from "@/lib/course-types";

export const sdLoadBalancingModule: CourseModule = {
  id: "sd-load-balancing",
  title: "Load Balancing",
  lessons: [
    {
      slug: "sd-what-are-load-balancers",
      title: "Load Balancer là gì?",
      module: "Load Balancing",
      summary: "Vai trò và lợi ích của load balancer trong một hệ thống.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "Load balancer phân phối request tới nhiều server để tận dụng tài nguyên, tăng thông lượng và chịu lỗi khi một node gặp sự cố.",
        },
        {
          type: "p",
          text: "Một server đơn lẻ bị giới hạn bởi CPU, bộ nhớ và số kết nối đồng thời. Load balancer đứng trước một pool server và chia traffic cho chúng, nhờ đó hệ thống mở rộng ngang bằng cách thêm server.",
        },
        {
          type: "ul",
          items: [
            "Client chỉ thấy một địa chỉ duy nhất (địa chỉ IP ảo hoặc tên miền); load balancer chọn server phía sau.",
            "Có thể thêm hoặc bớt server khỏi pool mà không cần đổi phía client.",
            "Load balancer cũng có thể kết thúc TLS hoặc định tuyến dựa trên nội dung request.",
          ],
        },
      ],
    },
    {
      slug: "sd-load-balancing-algorithms",
      title: "Thuật toán cân bằng tải",
      module: "Load Balancing",
      summary:
        "Các thuật toán cân bằng tải, health check và Layer 4 so với Layer 7.",
      duration: "8 phút",
      visualizer: "load-balancer-round-robin",
      blocks: [
        {
          type: "p",
          text: "Load balancer phân phối request tới nhiều server để tận dụng tài nguyên, tăng thông lượng và chịu lỗi khi một node gặp sự cố.",
        },
        { type: "h2", text: "Thuật toán phổ biến" },
        {
          type: "ul",
          items: [
            "Round Robin: lần lượt xoay vòng qua từng server.",
            "Least Connections: chọn server đang có ít kết nối nhất.",
            "IP Hash: thường đưa client về cùng server để giữ session, miễn là IP client và pool server ổn định; pool thay đổi hoặc server lỗi có thể làm client được chuyển sang server khác. Nhiều người dùng chung NAT/proxy cũng có thể có cùng IP.",
            "Weighted: server mạnh nhận nhiều request hơn.",
          ],
        },
        { type: "h2", text: "Health check" },
        {
          type: "p",
          text: "Health check có thể cấu hình theo TCP, HTTP(S) (đường dẫn tùy chọn) hoặc gRPC. LB loại server khỏi pool sau số lần thất bại liên tiếp đã cấu hình và thêm lại sau số lần thành công liên tiếp đã cấu hình; nên kết hợp active check (chủ động) với passive check (dựa trên lỗi thực tế). TCP probe có thể vẫn thành công dù ứng dụng HTTP bị lỗi. Bản thân LB cũng cần dự phòng (nhiều LB hoặc dịch vụ được quản lý) để tránh thành điểm lỗi đơn.",
        },
        { type: "h2", text: "Layer 4 so với Layer 7" },
        {
          type: "ul",
          items: [
            "L4: định tuyến theo IP/TCP — nhanh, nhưng không hiểu nội dung HTTP.",
            "L7: định tuyến theo URL/header/cookie — linh hoạt hơn, tốn tài nguyên hơn.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "Client → [Load Balancer] → pool [ s1 (healthy) | s2 (healthy) | s3 (down, bị loại) ]",
            },
          ],
        },
      ],
    },
    {
      slug: "sd-dns-load-balancing",
      title: "Cân bằng tải bằng DNS",
      module: "Load Balancing",
      summary: "Phân tải bằng DNS: cách hoạt động và các trade-off.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "Với DNS load balancing, một tên miền phân giải tới nhiều địa chỉ IP và client chọn một trong số đó (thường theo thứ tự trả về hoặc ngẫu nhiên).",
        },
        {
          type: "ul",
          items: [
            "DNS round robin: một tên trả về nhiều IP, mỗi lần đổi thứ tự để trải client ra nhiều server.",
            "Không biết trạng thái server: DNS không kiểm tra server còn sống hay không, nên vẫn có thể trả về IP của node đã lỗi.",
            "TTL quyết định tốc độ thay đổi bản ghi DNS được lan truyền: TTL dài làm failover chậm, TTL ngắn làm tăng số truy vấn.",
            "Weighted hoặc geoDNS: trả IP theo trọng số hoặc theo vị trí gần đúng của client để điều hướng traffic.",
          ],
        },
      ],
    },
    {
      slug: "sd-anycast-routing",
      title: "Định tuyến Anycast",
      module: "Load Balancing",
      summary: "Anycast định tuyến một IP dùng chung tới server gần nhất qua BGP.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "Với anycast, nhiều server (thường ở các vị trí khác nhau) dùng chung một địa chỉ IP, và mạng định tuyến mỗi request tới server gần nhất theo BGP.",
        },
        {
          type: "ul",
          items: [
            "Nhiều server quảng bá cùng một IP; BGP chọn đường đi theo số hop và độ ưu tiên, nên request tới server 'gần' nhất về mặt định tuyến.",
            "Anycast được dùng cho DNS root servers, CDN và chống DDoS: traffic được phân tán qua nhiều điểm.",
            "Không đảm bảo gần nhất theo địa lý và có thể đổi khi BGP hội tụ lại; vì các gói khác nhau có thể tới node khác nhau, anycast hợp với dịch vụ không trạng thái (như DNS qua UDP) hơn là phiên TCP dài.",
          ],
        },
      ],
    },
    {
      slug: "sd-load-balancing-exercises",
      title: "Bài tập cân bằng tải",
      module: "Load Balancing",
      summary:
        "Luyện chọn thuật toán, cấu hình health check và lý luận về định tuyến.",
      duration: "5 phút",
      isNew: true,
      blocks: [
        {
          type: "p",
          text: "Áp dụng những gì đã học: chọn thuật toán, mô tả luồng request và lý luận khi có sự cố.",
        },
        {
          type: "ul",
          items: [
            "Một ứng dụng web chạy ba server giống hệt nhau và cần giữ session đăng nhập ổn định. Bạn chọn thuật toán cân bằng tải nào, vì sao?",
            "Server s2 bị treo nhưng vẫn nhận kết nối TCP. Vì sao health check chỉ dựa trên TCP có thể không phát hiện ra, và bạn sẽ đổi cấu hình thế nào?",
            "Một site có người dùng toàn cầu muốn giảm latency khi đọc dữ liệu. So sánh DNS load balancing, anycast routing và CDN cho mục tiêu này.",
          ],
        },
      ],
    },
  ],
};
