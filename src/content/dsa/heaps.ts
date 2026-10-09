import type { CourseModule } from "@/lib/course-types";

export const heapsModule: CourseModule = {
  id: "heaps",
  title: "Heaps",
  lessons: [
    {
      slug: "heap-basics",
      title: "Binary Heap",
      module: "Heaps",
      summary:
        "Cây nhị phân đầy đủ lưu bằng mảng: nút cha luôn ≤ (hoặc ≥) hai con, cho phép lấy cực trị O(1).",
      duration: "9 phút",
      visualizer: "binary-heap",
      blocks: [
        {
          type: "p",
          text: "Binary Heap là cây nhị phân đầy đủ (lấp đầy từ trái sang phải) thoả tính chất heap. Min-heap: mỗi nút cha đều nhỏ hơn hoặc bằng hai con, nên phần tử nhỏ nhất luôn nằm ở gốc. Max-heap thì ngược lại.",
        },
        {
          type: "diagram",
          nodes: [
            { id: "h0", label: "1", sub: "i=0", x: 334, y: 20, w: 56, h: 46 },
            { id: "h1", label: "3", sub: "i=1", x: 180, y: 112, w: 56, h: 46 },
            { id: "h2", label: "2", sub: "i=2", x: 488, y: 112, w: 56, h: 46 },
            { id: "h3", label: "7", sub: "i=3", x: 103, y: 204, w: 56, h: 46 },
            { id: "h4", label: "9", sub: "i=4", x: 257, y: 204, w: 56, h: 46 },
            { id: "h5", label: "8", sub: "i=5", x: 411, y: 204, w: 56, h: 46 },
            { id: "h6", label: "5", sub: "i=6", x: 565, y: 204, w: 56, h: 46 },
          ],
          edges: [
            { id: "m01", from: "h0", to: "h1", label: "L" },
            { id: "m02", from: "h0", to: "h2", label: "R" },
            { id: "m13", from: "h1", to: "h3", label: "L" },
            { id: "m14", from: "h1", to: "h4", label: "R" },
            { id: "m25", from: "h2", to: "h5", label: "L" },
            { id: "m26", from: "h2", to: "h6", label: "R" },
          ],
          caption:
            "Min-heap: nút cha luôn ≤ hai con nên 1 (nhỏ nhất) nằm ở gốc. Số dưới mỗi nút là chỉ số i trong mảng.",
        },
        {
          type: "diagram",
          nodes: [
            { id: "x0", label: "9", sub: "i=0", x: 334, y: 20, w: 56, h: 46 },
            { id: "x1", label: "8", sub: "i=1", x: 180, y: 112, w: 56, h: 46 },
            { id: "x2", label: "7", sub: "i=2", x: 488, y: 112, w: 56, h: 46 },
            { id: "x3", label: "6", sub: "i=3", x: 103, y: 204, w: 56, h: 46 },
            { id: "x4", label: "5", sub: "i=4", x: 257, y: 204, w: 56, h: 46 },
            { id: "x5", label: "4", sub: "i=5", x: 411, y: 204, w: 56, h: 46 },
            { id: "x6", label: "3", sub: "i=6", x: 565, y: 204, w: 56, h: 46 },
          ],
          edges: [
            { id: "M01", from: "x0", to: "x1", label: "L" },
            { id: "M02", from: "x0", to: "x2", label: "R" },
            { id: "M13", from: "x1", to: "x3", label: "L" },
            { id: "M14", from: "x1", to: "x4", label: "R" },
            { id: "M25", from: "x2", to: "x5", label: "L" },
            { id: "M26", from: "x2", to: "x6", label: "R" },
          ],
          caption:
            "Max-heap: nút cha luôn ≥ hai con nên 9 (lớn nhất) nằm ở gốc. Cùng một cây, chỉ khác quy tắc so sánh.",
        },
        { type: "h2", text: "Biểu diễn bằng mảng" },
        {
          type: "p",
          text: "Vì cây đầy đủ nên có thể lưu phẳng trong mảng mà không cần con trỏ. Với nút ở chỉ số i: cha là (i-1)/2, con trái là 2i+1, con phải là 2i+2.",
        },
        { type: "h2", text: "Vun đống: sift-up & sift-down" },
        {
          type: "p",
          text: "Khi chèn, ta đặt phần tử vào cuối rồi đưa nó nổi lên (sift-up). Khi lấy gốc, ta đưa phần tử cuối lên gốc rồi đẩy nó chìm xuống (sift-down).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function siftUp(heap, i) {\n  while (i > 0) {\n    const parent = Math.floor((i - 1) / 2);\n    if (heap[parent] <= heap[i]) break;\n    [heap[parent], heap[i]] = [heap[i], heap[parent]];\n    i = parent;\n  }\n}",
            },
            {
              lang: "python",
              code: "def sift_up(heap, i):\n    while i > 0:\n        parent = (i - 1) // 2\n        if heap[parent] <= heap[i]:\n            break\n        heap[parent], heap[i] = heap[i], heap[parent]\n        i = parent",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "peek (xem cực trị): O(1).",
            "push / pop: O(log n) — chỉ đi theo một nhánh từ gốc tới lá.",
            "Xây heap từ mảng có sẵn: O(n) bằng cách sift-down từ giữa về đầu.",
          ],
        },
      ],
    },
    {
      slug: "priority-queue",
      title: "Priority Queue & Top-K",
      module: "Heaps",
      summary:
        "Heap là nền tảng của hàng đợi ưu tiên; mẫu top-K dùng heap kích thước k để giữ O(n log k).",
      duration: "7 phút",
      blocks: [
        {
          type: "p",
          text: "Priority Queue (hàng đợi ưu tiên) luôn lấy ra phần tử có độ ưu tiên cao nhất thay vì theo thứ tự vào. Heap chính là cài đặt chuẩn mực cho nó.",
        },
        { type: "h2", text: "Ứng dụng" },
        {
          type: "ul",
          items: [
            "Lập lịch tác vụ theo độ ưu tiên, hàng đợi sự kiện.",
            "Thuật toán Dijkstra, Prim — luôn lấy đỉnh gần nhất.",
            "Bài toán top-K: giữ k phần tử tốt nhất trong luồng dữ liệu.",
          ],
        },
        { type: "h2", text: "Mẫu top-K" },
        {
          type: "p",
          text: "Để giữ k phần tử nhỏ nhất, dùng một max-heap kích thước k: khi heap vượt k, bỏ phần tử lớn nhất. Mỗi phần tử tốn O(log k) thay vì sắp xếp toàn bộ O(n log n).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "// Giữ k số nhỏ nhất bằng max-heap kích thước k\nfunction topKSmallest(nums, k) {\n  const heap = []; // max-heap (đảo dấu để dùng chung code min-heap)\n  for (const x of nums) {\n    push(heap, -x);\n    if (heap.length > k) pop(heap);\n  }\n  return heap.map((v) => -v);\n}",
            },
            {
              lang: "python",
              code: "import heapq\n\ndef top_k_smallest(nums, k):\n    # heapq là min-heap; dùng số âm để mô phỏng max-heap\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, -x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return [-v for v in heap]",
            },
          ],
        },
        { type: "h2", text: "Heap so với mảng đã sắp xếp" },
        {
          type: "ul",
          items: [
            "Chỉ cần cực trị và chèn/xóa liên tục: heap O(log n) mỗi thao tác, mảng sắp xếp O(n) khi chèn.",
            "Cần tìm kiếm phần tử bất kỳ hoặc duyệt có thứ tự: mảng sắp xếp / cây cân bằng tốt hơn.",
          ],
        },
      ],
    },
    {
      slug: "heaps-quiz",
      title: "Quiz: Heaps",
      module: "Heaps",
      icon: "quiz",
      summary: "Kiểm tra tính chất heap, chỉ số mảng và ứng dụng top-K.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi về binary heap và cách dùng trong hàng đợi ưu tiên.",
        },
      ],
      quiz: {
        title: "Quiz: Heaps",
        description: "6 câu về binary heap, độ phức tạp và top-K.",
        questions: [
          {
            id: "hp1",
            tag: "Tính chất",
            prompt: "Trong min-heap, giá trị nhỏ nhất nằm ở đâu?",
            options: ["Nút lá trái nhất", "Gốc (root)", "Luôn ở giữa mảng", "Không xác định"],
            answer: 1,
            explanation:
              "Tính chất min-heap đảm bảo cha ≤ con nên phần tử nhỏ nhất là gốc.",
          },
          {
            id: "hp2",
            tag: "Chỉ số",
            prompt:
              "Với nút ở chỉ số i, con TRÁI nằm ở chỉ số nào (mảng bắt đầu từ 0)?",
            options: ["2i", "2i + 1", "2i + 2", "i / 2"],
            answer: 1,
            explanation:
              "Con trái là 2i+1, con phải là 2i+2, cha là (i-1)/2.",
          },
          {
            id: "hp3",
            tag: "Độ phức tạp",
            prompt: "Thêm một phần tử vào heap tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation:
              "sift-up chỉ đi từ lá lên gốc theo một nhánh, tối đa log n bước.",
          },
          {
            id: "hp4",
            tag: "Độ phức tạp",
            prompt: "Xem phần tử nhỏ nhất trong min-heap tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation:
              "Cực trị luôn ở gốc nên chỉ cần đọc heap[0].",
          },
          {
            id: "hp5",
            tag: "Top-K",
            prompt:
              "Để giữ k số nhỏ nhất trong luồng dữ liệu, nên dùng cấu trúc nào?",
            options: [
              "Min-heap kích thước n",
              "Max-heap kích thước k",
              "Mảng sắp xếp toàn bộ mỗi bước",
              "Hash map",
            ],
            answer: 1,
            explanation:
              "Max-heap kích thước k cho phép loại phần tử lớn nhất khi vượt k, mỗi bước O(log k).",
          },
          {
            id: "hp6",
            tag: "Xây heap",
            prompt: "Xây heap từ một mảng n phần tử có sẵn tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 2,
            explanation:
              "Sift-down từ giữa về đầu tốn O(n) (không phải O(n log n) như chèn từng phần tử).",
          },
        ],
      },
    },
  ],
};
