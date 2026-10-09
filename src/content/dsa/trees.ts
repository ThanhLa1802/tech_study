import type { CourseModule } from "@/lib/course-types";

export const treesModule: CourseModule = {
  id: "trees",
  title: "Trees",
  lessons: [
    {
      slug: "tree-basics",
      title: "Cây & cây nhị phân",
      module: "Trees",
      summary:
        "Cấu trúc phân cấp với gốc, lá và cây con; cây nhị phân giới hạn mỗi nút tối đa hai con.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Cây (tree) là cấu trúc phân cấp gồm các nút nối với nhau, không có chu trình. Cây nhị phân (binary tree) giới hạn mỗi nút có tối đa hai con: trái và phải.",
        },
        { type: "h2", text: "Thuật ngữ" },
        {
          type: "ul",
          items: [
            "root: nút trên cùng, không có cha.",
            "parent / child: quan hệ giữa hai nút liền kề.",
            "leaf: nút không có con.",
            "depth của một nút: số cạnh từ root tới nút đó; height của cây: depth lớn nhất.",
            "subtree: một nút cùng toàn bộ hậu duệ của nó.",
          ],
        },
        { type: "h2", text: "Biểu diễn" },
        {
          type: "p",
          text: "Cách phổ biến là mỗi nút giữ value, left và right. Với cây nhị phân đầy đủ, có thể lưu trong mảng: nút i có con trái 2i+1 và con phải 2i+2 (đây là cách heap dùng).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "node = {\n  value: số,\n  left: node hoặc null,\n  right: node hoặc null\n}",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thao tác trên cây cân bằng: O(log n) theo chiều cao h = log n.",
            "Cây lệch hẳn về một phía thoái hóa thành danh sách: O(n).",
          ],
        },
      ],
    },
    {
      slug: "binary-search-tree",
      title: "Binary Search Tree",
      module: "Trees",
      summary:
        "Cây nhị phân có thứ tự: trái < nút < phải, cho phép tìm kiếm và chèn theo chiều cao cây.",
      duration: "9 phút",
      visualizer: "binary-search-tree",
      blocks: [
        {
          type: "p",
          text: "Binary Search Tree (BST) là cây nhị phân thỏa mãn tính chất: mọi giá trị trong cây con bên trái nhỏ hơn nút, mọi giá trị bên phải lớn hơn nút. Nhờ đó mỗi bước so sánh loại bỏ được một nửa cây.",
        },
        { type: "h2", text: "Tìm kiếm" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function search(root, target) {\n  let cur = root;\n  while (cur) {\n    if (target === cur.value) return cur;\n    cur = target < cur.value ? cur.left : cur.right;\n  }\n  return null;\n}",
            },
            {
              lang: "python",
              code: "def search(root, target):\n    cur = root\n    while cur:\n        if target == cur.value:\n            return cur\n        cur = cur.left if target < cur.value else cur.right\n    return None",
            },
          ],
        },
        { type: "h2", text: "Chèn" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function insert(node, value) {\n  if (!node) return { value, left: null, right: null };\n  if (value < node.value) node.left = insert(node.left, value);\n  else if (value > node.value) node.right = insert(node.right, value);\n  return node;\n}",
            },
            {
              lang: "python",
              code: "def insert(node, value):\n    if node is None:\n        return Node(value)\n    if value < node.value:\n        node.left = insert(node.left, value)\n    elif value > node.value:\n        node.right = insert(node.right, value)\n    return node",
            },
          ],
        },
        { type: "h2", text: "Duyệt in-order" },
        {
          type: "p",
          text: "Duyệt in-order (trái → nút → phải) trên BST cho ra dãy giá trị tăng dần. Đây là cách kiểm tra một cây có phải BST hay không.",
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Tìm kiếm/chèn/xóa: O(h), với h là chiều cao cây.",
            "Cây cân bằng: O(log n); cây lệch: O(n). Các biến thể tự cân bằng (AVL, Red-Black) giữ h ≈ log n.",
          ],
        },
      ],
    },
    {
      slug: "tree-traversal",
      title: "Duyệt cây",
      module: "Trees",
      summary:
        "Bốn cách duyệt: pre-order, in-order, post-order (DFS) và level-order (BFS).",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Duyệt cây là đi qua mọi nút theo một thứ tự xác định. Ba kiểu DFS khác nhau ở vị trí thăm nút so với hai cây con; BFS thăm theo từng tầng.",
        },
        { type: "h2", text: "DFS: pre / in / post-order" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function inOrder(node, out = []) {\n  if (!node) return out;\n  inOrder(node.left, out);   // trái\n  out.push(node.value);      // nút\n  inOrder(node.right, out);  // phải\n  return out;\n}",
            },
            {
              lang: "python",
              code: "def in_order(node, out=None):\n    if out is None:\n        out = []\n    if node is None:\n        return out\n    in_order(node.left, out)\n    out.append(node.value)\n    in_order(node.right, out)\n    return out",
            },
          ],
        },
        {
          type: "ul",
          items: [
            "pre-order: nút → trái → phải (dùng để sao chép cây).",
            "in-order: trái → nút → phải (BST cho dãy tăng dần).",
            "post-order: trái → phải → nút (dùng để giải phóng cây).",
          ],
        },
        { type: "h2", text: "BFS: duyệt theo tầng" },
        {
          type: "p",
          text: "Level-order dùng queue: đưa root vào queue, lần lượt lấy từng nút ra, ghi nhận giá trị rồi thêm các nút con vào cuối queue.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function levelOrder(root) {\n  if (!root) return [];\n  const queue = [root];\n  const out = [];\n  while (queue.length) {\n    const node = queue.shift();\n    out.push(node.value);\n    if (node.left) queue.push(node.left);\n    if (node.right) queue.push(node.right);\n  }\n  return out;\n}",
            },
            {
              lang: "python",
              code: "from collections import deque\n\ndef level_order(root):\n    if root is None:\n        return []\n    queue = deque([root])\n    out = []\n    while queue:\n        node = queue.popleft()\n        out.append(node.value)\n        if node.left:\n            queue.append(node.left)\n        if node.right:\n            queue.append(node.right)\n    return out",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Mọi kiểu duyệt: O(n) thời gian.",
            "DFS tốn O(h) bộ nhớ cho call stack; BFS tốn O(w) với w là bề rộng lớn nhất của một tầng.",
          ],
        },
      ],
    },
    {
      slug: "trees-quiz",
      title: "Quiz: Trees",
      module: "Trees",
      icon: "quiz",
      summary: "Kiểm tra BST, các kiểu duyệt và độ phức tạp của cây.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi về cây nhị phân, BST và các kiểu duyệt.",
        },
      ],
      quiz: {
        title: "Quiz: Trees",
        description: "6 câu về cấu trúc cây, BST và duyệt cây.",
        questions: [
          {
            id: "tr1",
            tag: "BST",
            prompt: "Tính chất đúng của một Binary Search Tree là gì?",
            options: [
              "Mọi nút có đúng hai con",
              "Trái < nút < phải với mọi nút",
              "Các lá đều ở cùng độ sâu",
              "Nút lớn hơn luôn nằm bên trái",
            ],
            answer: 1,
            explanation:
              "BST giữ thứ tự: toàn bộ cây con trái nhỏ hơn nút, cây con phải lớn hơn nút.",
          },
          {
            id: "tr2",
            tag: "BST",
            prompt: "Tìm kiếm trong BST tốn bao nhiêu theo chiều cao h?",
            options: ["O(1)", "O(log h)", "O(h)", "O(h²)"],
            answer: 2,
            explanation:
              "Mỗi bước đi xuống một mức nên tốn O(h); h ≈ log n nếu cây cân bằng.",
          },
          {
            id: "tr3",
            tag: "Duyệt cây",
            prompt: "Duyệt nào trên BST cho ra dãy giá trị tăng dần?",
            options: ["pre-order", "in-order", "post-order", "level-order"],
            answer: 1,
            explanation:
              "in-order đi trái → nút → phải, đúng với thứ tự sắp xếp của BST.",
          },
          {
            id: "tr4",
            tag: "Duyệt cây",
            prompt: "Duyệt theo tầng (level-order) dùng cấu trúc nào?",
            options: ["Stack", "Queue", "Hash map", "Heap"],
            answer: 1,
            explanation:
              "Level-order là BFS: dùng queue để xử lý các nút theo đúng thứ tự phát hiện.",
          },
          {
            id: "tr5",
            tag: "Độ phức tạp",
            prompt: "Khi BST bị lệch hoàn toàn, tìm kiếm thoái hóa về?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 2,
            explanation:
              "Cây lệch thành danh sách nên chiều cao h = n, tìm kiếm thành O(n).",
          },
          {
            id: "tr6",
            tag: "Bộ nhớ",
            prompt: "Duyệt DFS trên cây tốn bộ nhớ phụ cỡ nào?",
            options: [
              "O(1)",
              "O(h) cho call stack",
              "O(n²)",
              "O(2ⁿ)",
            ],
            answer: 1,
            explanation:
              "Độ sâu đệ quy bằng chiều cao cây, nên bộ nhớ stack là O(h).",
          },
        ],
      },
    },
  ],
};
