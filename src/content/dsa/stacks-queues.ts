import type { CourseModule } from "@/lib/course-types";

export const stacksQueuesModule: CourseModule = {
  id: "stacks-queues",
  title: "Stacks & Queues",
  lessons: [
    {
      slug: "stack",
      title: "Stack (LIFO)",
      module: "Stacks & Queues",
      summary:
        "Ngăn xếp: vào sau ra trước; mọi thao tác ở đỉnh đều O(1).",
      duration: "7 phút",
      visualizer: "stack",
      blocks: [
        {
          type: "p",
          text: "Stack (ngăn xếp) là cấu trúc LIFO — Last In, First Out: phần tử được thêm vào sau cùng sẽ được lấy ra đầu tiên, giống chồng đĩa.",
        },
        { type: "h2", text: "Các thao tác" },
        {
          type: "ul",
          items: [
            "push(x): thêm x vào đỉnh — O(1).",
            "pop(): lấy và xóa phần tử ở đỉnh — O(1).",
            "peek()/top(): xem đỉnh mà không xóa — O(1).",
            "isEmpty(), size: kiểm tra rỗng và kích thước.",
          ],
        },
        { type: "h2", text: "Cài đặt" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "class Stack {\n  constructor() { this.items = []; }\n  push(x) { this.items.push(x); }\n  pop() { return this.items.pop(); }\n  peek() { return this.items[this.items.length - 1]; }\n  get size() { return this.items.length; }\n}",
            },
            {
              lang: "python",
              code: "class Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, x):\n        self.items.append(x)\n\n    def pop(self):\n        return self.items.pop()\n\n    def peek(self):\n        return self.items[-1]",
            },
          ],
        },
        { type: "h2", text: "Ứng dụng" },
        {
          type: "ul",
          items: [
            "Hoàn tác (undo), ngăn xếp gọi hàm của chương trình.",
            "Kiểm tra ngoặc cân bằng, tính giá trị biểu thức (RPN).",
            "Duyệt sâu (DFS) trên đồ thị hoặc cây.",
          ],
        },
      ],
    },
    {
      slug: "queue",
      title: "Queue (FIFO)",
      module: "Stacks & Queues",
      summary:
        "Hàng đợi: vào trước ra trước; cần cài đặt tránh thao tác dịch mảng O(n).",
      duration: "7 phút",
      visualizer: "queue",
      blocks: [
        {
          type: "p",
          text: "Queue (hàng đợi) là cấu trúc FIFO — First In, First Out: phần tử vào trước được lấy ra trước, giống xếp hàng mua vé.",
        },
        { type: "h2", text: "Các thao tác" },
        {
          type: "ul",
          items: [
            "enqueue(x): thêm x vào cuối hàng — O(1).",
            "dequeue(): lấy và xóa phần tử ở đầu hàng — O(1) nếu cài đặt đúng.",
            "front()/peek(): xem đầu hàng — O(1).",
          ],
        },
        { type: "h2", text: "Cài đặt" },
        {
          type: "p",
          text: "Nếu dùng mảng và shift()/pop(0) để dequeue, mọi phần tử phía sau phải dịch → O(n). Hãy dùng chỉ số head tăng dần (JS) hoặc deque (Python) để giữ O(1).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "class Queue {\n  constructor() { this.items = []; this.head = 0; }\n  enqueue(x) { this.items.push(x); }\n  dequeue() { return this.items[this.head++]; }\n  get size() { return this.items.length - this.head; }\n}",
            },
            {
              lang: "python",
              code: "from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n\n    def enqueue(self, x):\n        self.items.append(x)\n\n    def dequeue(self):\n        return self.items.popleft()",
            },
          ],
        },
        { type: "h2", text: "Ứng dụng" },
        {
          type: "ul",
          items: [
            "Duyệt theo tầng (BFS) trên cây và đồ thị.",
            "Hàng đợi tác vụ, xử lý sự kiện, in ấn theo thứ tự.",
            "Bộ đệm vòng (circular buffer), sliding window.",
          ],
        },
      ],
    },
    {
      slug: "stacks-queues-quiz",
      title: "Quiz: Stacks & Queues",
      module: "Stacks & Queues",
      icon: "quiz",
      summary: "Kiểm tra hiểu biết về LIFO, FIFO và chi phí các thao tác.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi phân biệt stack và queue cùng các cài đặt hiệu quả.",
        },
      ],
      quiz: {
        title: "Quiz: Stacks & Queues",
        description: "6 câu về LIFO, FIFO và độ phức tạp thao tác.",
        questions: [
          {
            id: "sq1",
            tag: "Stack",
            prompt: "Stack hoạt động theo nguyên tắc nào?",
            options: [
              "FIFO — vào trước ra trước",
              "LIFO — vào sau ra trước",
              "Sắp xếp tăng dần",
              "Truy cập ngẫu nhiên",
            ],
            answer: 1,
            explanation:
              "Stack là Last In, First Out: phần tử thêm sau cùng được lấy ra đầu tiên.",
          },
          {
            id: "sq2",
            tag: "Queue",
            prompt: "Queue hoạt động theo nguyên tắc nào?",
            options: [
              "LIFO — vào sau ra trước",
              "FIFO — vào trước ra trước",
              "Luôn lấy phần tử nhỏ nhất",
              "Không có thứ tự",
            ],
            answer: 1,
            explanation:
              "Queue là First In, First Out: phần tử vào trước được xử lý trước.",
          },
          {
            id: "sq3",
            tag: "Độ phức tạp",
            prompt: "push và pop trên stack (cài bằng mảng) tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation:
              "Cả hai chỉ tác động lên đỉnh nên là thao tác hằng số.",
          },
          {
            id: "sq4",
            tag: "Cài đặt",
            prompt:
              "Vì sao không nên dùng mảng và shift() để dequeue trong JS?",
            options: [
              "Vì shift() không tồn tại",
              "Vì shift() dịch toàn bộ phần tử còn lại → O(n)",
              "Vì shift() làm mất phần tử",
              "Vì shift() không trả về giá trị",
            ],
            answer: 1,
            explanation:
              "Dịch mọi phần tử phía sau khiến dequeue thành O(n); dùng chỉ số head hoặc deque để giữ O(1).",
          },
          {
            id: "sq5",
            tag: "Ứng dụng",
            prompt: "Cấu trúc nào phù hợp nhất để duyệt theo tầng (BFS)?",
            options: ["Stack", "Queue", "Hash map", "Linked list"],
            answer: 1,
            explanation:
              "BFS cần lấy các đỉnh theo thứ tự phát hiện, tức FIFO → queue.",
          },
          {
            id: "sq6",
            tag: "Ứng dụng",
            prompt:
              "Bài toán kiểm tra ngoặc cân bằng thường dùng cấu trúc nào?",
            options: ["Queue", "Stack", "Heap", "Trie"],
            answer: 1,
            explanation:
              "Gặp ngoặc mở thì push, gặp ngoặc đóng thì pop và đối chiếu — LIFO khớp tự nhiên với lồng nhau.",
          },
        ],
      },
    },
  ],
};
