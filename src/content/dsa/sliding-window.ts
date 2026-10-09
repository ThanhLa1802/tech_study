import type { CourseModule } from "@/lib/course-types";

export const slidingWindowModule: CourseModule = {
  id: "sliding-window",
  title: "Sliding Window",
  lessons: [
    {
      slug: "fixed-sliding-window",
      title: "Cửa sổ cố định",
      module: "Sliding Window",
      summary:
        "Trượt một cửa sổ kích thước k qua mảng: mỗi bước thêm một phần tử, bớt một phần tử — O(n).",
      duration: "7 phút",
      visualizer: "fixed-sliding-window",
      blocks: [
        {
          type: "p",
          text: "Sliding Window (cửa sổ trượt) là kỹ thuật xử lý đoạn con liên tiếp mà không cần quét lại từ đầu. Thay vì tính lại toàn bộ cửa sổ sau mỗi lần dịch, ta chỉ cập nhật phần thay đổi.",
        },
        { type: "h2", text: "Khi nào dùng" },
        {
          type: "ul",
          items: [
            "Bài toán trên đoạn con / xâu con LIÊN TIẾP.",
            "Cần tối ưu (max/min), đếm, hoặc kiểm tra tính chất của đoạn.",
            "Điều kiện có tính đơn điệu để xác định khi nào có thể mở rộng hoặc thu hẹp cửa sổ.",
          ],
        },
        { type: "h2", text: "Cửa sổ cố định kích thước k" },
        {
          type: "p",
          text: "Tính tổng của k phần tử đầu, sau đó mỗi bước dịch sang phải: cộng phần tử mới vào, trừ phần tử rơi ra khỏi cửa sổ.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function maxSumWindow(nums, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n  let best = sum;\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    best = Math.max(best, sum);\n  }\n  return best;\n}",
            },
            {
              lang: "python",
              code: "def max_sum_window(nums, k):\n    window = sum(nums[:k])\n    best = window\n    for i in range(k, len(nums)):\n        window += nums[i] - nums[i - k]\n        best = max(best, window)\n    return best",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thời gian: O(n) — mỗi phần tử vào và ra cửa sổ đúng một lần.",
            "Bộ nhớ: O(1) ngoài mảng đầu vào.",
          ],
        },
        {
          type: "diagram",
          nodes: [
            { id: "w0", label: "2", sub: "a[0] · trong cửa sổ", tone: "amber", x: 32, y: 28, w: 96, h: 58 },
            { id: "w1", label: "1", sub: "a[1] · trong cửa sổ", tone: "amber", x: 140, y: 28, w: 96, h: 58 },
            { id: "w2", label: "3", sub: "a[2] · trong cửa sổ", tone: "amber", x: 248, y: 28, w: 96, h: 58 },
            { id: "w3", label: "4", sub: "a[3] · vào tiếp theo", tone: "sky", x: 356, y: 28, w: 96, h: 58 },
            { id: "w4", label: "5", sub: "a[4] · ngoài cửa sổ", tone: "zinc", x: 464, y: 28, w: 96, h: 58 },
          ],
          edges: [],
          caption:
            "k = 3: cửa sổ hiện tại gồm a[0]–a[2]. Khi trượt sang phải, a[3] đi vào cửa sổ.",
        },
      ],
    },
    {
      slug: "variable-sliding-window",
      title: "Cửa sổ động",
      module: "Sliding Window",
      summary:
        "Hai con trỏ điều chỉnh độ dài cửa sổ: mở rộng bên phải, thu hẹp bên trái khi đã đủ điều kiện.",
      duration: "8 phút",
      visualizer: "sliding-window",
      blocks: [
        {
          type: "p",
          text: "Khi độ dài cửa sổ không cố định, ta dùng hai con trỏ: r mở rộng sang phải để thêm phần tử; l thu hẹp từ bên trái khi cửa sổ đã thỏa điều kiện nhưng vẫn có thể thu hẹp thêm.",
        },
        { type: "h2", text: "Khung chung" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "l = 0\nfor r in 0..n-1:\n  them a[r] vao cua so\n  while <cua so thoa dieu kien>:\n    cap nhat ket qua\n    bo a[l] ra khoi cua so; l++",
            },
          ],
        },
        { type: "h2", text: "Ví dụ: đoạn ngắn nhất có tổng ≥ target" },
        {
          type: "p",
          text: "Mở rộng r và cộng dồn. Khi tổng đạt ≥ target, ghi nhận độ dài rồi thu hẹp l để tìm đoạn ngắn hơn. Mỗi phần tử chỉ được thêm vào và loại khỏi cửa sổ một lần, nên thuật toán vẫn chạy trong O(n).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function minWindowSum(nums, target) {\n  let l = 0, sum = 0, best = Infinity;\n  for (let r = 0; r < nums.length; r++) {\n    sum += nums[r];\n    while (sum >= target) {\n      best = Math.min(best, r - l + 1);\n      sum -= nums[l++];\n    }\n  }\n  return best === Infinity ? 0 : best;\n}",
            },
            {
              lang: "python",
              code: "def min_window_sum(nums, target):\n    l = 0\n    total = 0\n    best = float('inf')\n    for r, x in enumerate(nums):\n        total += x\n        while total >= target:\n            best = min(best, r - l + 1)\n            total -= nums[l]\n            l += 1\n    return 0 if best == float('inf') else best",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thời gian: O(n) dù có vòng lặp while bên trong — mỗi phần tử bị bỏ ra tối đa một lần.",
            "Bộ nhớ: O(1).",
          ],
        },
      ],
    },
    {
      slug: "sliding-window-quiz",
      title: "Quiz: Sliding Window",
      module: "Sliding Window",
      icon: "quiz",
      summary:
        "Kiểm tra khi nào dùng cửa sổ trượt và vì sao nó đạt O(n).",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi về cửa sổ cố định và cửa sổ động.",
        },
      ],
      quiz: {
        title: "Quiz: Sliding Window",
        description: "6 câu về kỹ thuật cửa sổ trượt.",
        questions: [
          {
            id: "sw1",
            tag: "Khái niệm",
            prompt: "Sliding Window phù hợp nhất với dạng bài toán nào?",
            options: [
              "Đoạn con / xâu con liên tiếp",
              "Đồ thị có chu trình",
              "Cây nhị phân tìm kiếm",
              "Sắp xếp so sánh",
            ],
            answer: 0,
            explanation:
              "Cửa sổ trượt xử lý các đoạn liên tiếp; cấu trúc rời rạc như đồ thị cần kỹ thuật khác.",
          },
          {
            id: "sw2",
            tag: "Cửa sổ cố định",
            prompt:
              "Khi dịch cửa sổ cố định kích thước k sang phải một ô, ta cập nhật tổng thế nào?",
            options: [
              "Tính lại tổng từ đầu",
              "Cộng phần tử mới và trừ phần tử rơi ra",
              "Nhân đôi tổng cũ",
              "Chỉ trừ phần tử rơi ra",
            ],
            answer: 1,
            explanation:
              "Cập nhật tăng/giảm giữ chi phí mỗi bước O(1) thay vì O(k).",
          },
          {
            id: "sw3",
            tag: "Cửa sổ động",
            prompt:
              "Trong cửa sổ động, khi nào ta thu hẹp bằng cách tăng con trỏ l?",
            options: [
              "Khi cửa sổ còn thiếu điều kiện",
              "Khi cửa sổ đã thoả điều kiện và ta muốn thử đoạn ngắn hơn",
              "Khi r chạm cuối mảng",
              "Không bao giờ thu hẹp",
            ],
            answer: 1,
            explanation:
              "Thu hẹp khi điều kiện đã đạt để tối ưu (ví dụ tìm đoạn ngắn nhất).",
          },
          {
            id: "sw4",
            tag: "Độ phức tạp",
            prompt:
              "Vì sao cửa sổ động vẫn là O(n) dù có vòng while bên trong?",
            options: [
              "Vì while chỉ chạy vài lần",
              "Vì mỗi phần tử được thêm và bỏ ra tối đa một lần",
              "Vì dùng hash map",
              "Vì mảng đã sắp xếp",
            ],
            answer: 1,
            explanation:
            "Tổng số lần tăng l và r đều bị chặn bởi n, nên chi phí amortized là O(n).",
          },
          {
            id: "sw5",
            tag: "Ứng dụng",
            prompt: "Bài toán nào KHÔNG phù hợp với cửa sổ trượt?",
            options: [
              "Độ dài xâu con dài nhất không lặp ký tự",
              "Tổng lớn nhất của k phần tử liên tiếp",
              "Kiểm tra đồ thị có chu trình",
              "Đoạn ngắn nhất có tổng ≥ target",
            ],
            answer: 2,
            explanation:
              "Phát hiện chu trình trên đồ thị cần BFS/DFS, không phải cửa sổ trên mảng.",
          },
          {
            id: "sw6",
            tag: "Bộ nhớ",
            prompt: "Cửa sổ trượt trên mảng tốn thêm bao nhiêu bộ nhớ?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Chỉ cần vài biến đếm và hai con trỏ, nên bộ nhớ phụ là hằng số.",
          },
        ],
      },
    },
  ],
};
