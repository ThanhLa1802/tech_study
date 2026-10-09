import type { CourseModule } from "@/lib/course-types";

export const linkedListModule: CourseModule = {
  id: "linked-list",
  title: "Linked List",
  lessons: [
    {
      slug: "linked-list-basics",
      title: "Linked List & con trỏ",
      module: "Linked List",
      summary:
        "Các node rời rạc nối nhau bằng con trỏ: chèn/xóa có thể O(1) nếu đã có con trỏ cần thiết, nhưng truy cập phải đi tuần tự.",
      duration: "8 phút",
      visualizer: "linked-list",
      blocks: [
        {
          type: "p",
          text: "Linked List (danh sách liên kết) lưu dữ liệu thành những node rời rạc. Mỗi node chứa một giá trị và một con trỏ tới node kế tiếp — khác mảng, các node không nằm liền kề trong bộ nhớ.",
        },
        { type: "h2", text: "Node và con trỏ" },
        {
          type: "p",
          text: "Biến head giữ node đầu tiên; node cuối trỏ tới null (None). Muốn tới node thứ k, ta phải đi tuần tự từ head qua từng con trỏ next — không thể nhảy trực tiếp như mảng.",
        },
        { type: "h2", text: "So sánh với mảng" },
        {
          type: "ul",
          items: [
            "Truy cập theo chỉ số: mảng O(1), linked list O(n).",
            "Chèn/xóa khi đã có con trỏ cần thiết (với xóa, cần con trỏ tới node đứng trước): linked list O(1), mảng O(n) do phải dịch.",
            "Bộ nhớ: linked list tốn thêm chỗ cho con trỏ và cache kém hơn do node nằm rải rác.",
          ],
        },
        { type: "h2", text: "Mã giả" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "node = {\n  value: số,\n  next: node kế tiếp hoặc null\n}\n\nhead -> node -> node -> null",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Truy cập / tìm kiếm: O(n).",
            "Chèn / xóa khi đã có con trỏ cần thiết (với xóa, cần con trỏ tới node đứng trước): O(1).",
            "Bộ nhớ: O(n), cộng thêm con trỏ mỗi node.",
          ],
        },
      ],
    },
    {
      slug: "linked-list-operations",
      title: "Chèn, xóa & đảo ngược",
      module: "Linked List",
      summary:
        "Thao tác chính trên linked list và kỹ thuật ba con trỏ để đảo ngược tại chỗ.",
      duration: "9 phút",
      blocks: [
        {
          type: "p",
          text: "Vì chỉ cần đổi vài con trỏ, chèn và xóa trong linked list rất nhanh khi đã có con trỏ cần thiết; với danh sách liên kết đơn, xóa một node cần biết node đứng trước nó.",
        },
        { type: "h2", text: "Chèn vào đầu" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function insertHead(head, value) {\n  return { value, next: head };\n}",
            },
            {
              lang: "python",
              code: "class Node:\n    def __init__(self, value, nxt=None):\n        self.value = value\n        self.next = nxt\n\ndef insert_head(head, value):\n    return Node(value, head)",
            },
          ],
        },
        { type: "h2", text: "Xóa một node theo giá trị" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function remove(head, value) {\n  if (!head) return null;\n  if (head.value === value) return head.next;\n  let cur = head;\n  while (cur.next && cur.next.value !== value) cur = cur.next;\n  if (cur.next) cur.next = cur.next.next;\n  return head;\n}",
            },
            {
              lang: "python",
              code: "def remove(head, value):\n    if not head:\n        return None\n    if head.value == value:\n        return head.next\n    cur = head\n    while cur.next and cur.next.value != value:\n        cur = cur.next\n    if cur.next:\n        cur.next = cur.next.next\n    return head",
            },
          ],
        },
        { type: "h2", text: "Đảo ngược danh sách" },
        {
          type: "p",
          text: "Dùng ba con trỏ prev, cur, next: mỗi bước quay con trỏ next của cur về prev rồi tiến cả hai lên. Bộ nhớ O(1), thời gian O(n).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function reverse(head) {\n  let prev = null;\n  let cur = head;\n  while (cur) {\n    const next = cur.next;\n    cur.next = prev;\n    prev = cur;\n    cur = next;\n  }\n  return prev;\n}",
            },
            {
              lang: "python",
              code: "def reverse(head):\n    prev = None\n    cur = head\n    while cur:\n        nxt = cur.next\n        cur.next = prev\n        prev = cur\n        cur = nxt\n    return prev",
            },
          ],
        },
        { type: "h2", text: "Con trỏ nhanh — chậm (Floyd)" },
        {
          type: "p",
          text: "Cho một con trỏ đi 1 bước và một con trỏ đi 2 bước. Nếu chúng gặp nhau thì danh sách có chu trình; nếu danh sách không có chu trình, khi con trỏ nhanh chạm cuối thì con trỏ chậm đang ở giữa danh sách.",
        },
      ],
    },
    {
      slug: "linked-list-quiz",
      title: "Quiz: Linked List",
      module: "Linked List",
      icon: "quiz",
      summary: "Kiểm tra độ phức tạp và thao tác trên danh sách liên kết.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi củng cố đặc điểm, chi phí và kỹ thuật xử lý linked list.",
        },
      ],
      quiz: {
        title: "Quiz: Linked List",
        description: "6 câu về độ phức tạp và thao tác trên linked list.",
        questions: [
          {
            id: "ll1",
            tag: "Truy cập",
            prompt:
              "Truy cập node thứ k trong singly linked list tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Không có chỉ số trực tiếp, phải đi tuần tự từ head qua k con trỏ next.",
          },
          {
            id: "ll2",
            tag: "Chèn",
            prompt:
              "Chèn một node vào ĐẦU linked list khi đã có head tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation:
              "Chỉ tạo node mới trỏ tới head cũ rồi cập nhật head — vài phép gán.",
          },
          {
            id: "ll3",
            tag: "Cấu trúc",
            prompt: "Con trỏ next của node CUỐI trong linked list trỏ tới đâu?",
            options: ["head", "Chính nó", "null (None)", "Node giữa"],
            answer: 2,
            explanation:
              "Node cuối trỏ tới null để đánh dấu hết danh sách (trừ khi có chu trình).",
          },
          {
            id: "ll4",
            tag: "Đảo ngược",
            prompt:
              "Đảo ngược linked list tại chỗ thường dùng bao nhiêu con trỏ?",
            options: ["1", "2", "3", "4"],
            answer: 2,
            explanation:
              "Cần prev, cur và next để không mất phần còn lại khi quay con trỏ.",
          },
          {
            id: "ll5",
            tag: "Kỹ thuật",
            prompt: "Hai con trỏ nhanh — chậm dùng để làm gì?",
            options: [
              "Sắp xếp danh sách",
              "Phát hiện chu trình và tìm node giữa",
              "Tính tổng các node",
              "Đếm số node chẵn",
            ],
            answer: 1,
            explanation:
              "Con trỏ nhanh đuổi kịp con trỏ chậm nếu có chu trình; nếu không có chu trình, khi nhanh tới cuối thì chậm ở giữa.",
          },
          {
            id: "ll6",
            tag: "So sánh",
            prompt: "Nhược điểm chính của linked list so với mảng là gì?",
            options: [
              "Không chèn/xóa được",
              "Không truy cập ngẫu nhiên O(1) và tốn bộ nhớ cho con trỏ",
              "Không thể lưu số",
              "Luôn chậm hơn ở mọi thao tác",
            ],
            answer: 1,
            explanation:
              "Linked list phải duyệt tuần tự và tốn thêm con trỏ; cache cũng kém hơn do node nằm rải rác.",
          },
        ],
      },
    },
  ],
};
