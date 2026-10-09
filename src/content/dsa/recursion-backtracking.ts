import type { CourseModule } from "@/lib/course-types";

export const recursionBacktrackingModule: CourseModule = {
  id: "recursion-backtracking",
  title: "Recursion & Backtracking",
  lessons: [
    {
      slug: "recursion-basics",
      title: "Đệ quy & call stack",
      module: "Recursion & Backtracking",
      summary:
        "Hàm tự gọi chính nó: cần base case để dừng, và mỗi lời gọi chiếm một khung trong call stack.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Đệ quy (recursion) là kỹ thuật một hàm tự gọi lại để giải bài toán nhỏ hơn. Mọi hàm đệ quy cần hai phần: base case (điều kiện dừng) và recursive case (gọi lại với bài toán nhỏ hơn).",
        },
        { type: "h2", text: "Call stack" },
        {
          type: "p",
          text: "Mỗi lời gọi tạo một khung (frame) chứa tham số và biến cục bộ. Đệ quy sâu n lần tốn O(n) bộ nhớ stack — đệ quy quá sâu có thể tràn stack.",
        },
        { type: "h2", text: "Ví dụ" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function factorial(n) {\n  if (n <= 1) return 1;        // base case\n  return n * factorial(n - 1);  // recursive case\n}",
            },
            {
              lang: "python",
              code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
            },
          ],
        },
        { type: "h2", text: "Đệ quy Fibonacci: tính lặp lại" },
        {
          type: "p",
          text: "Fibonacci đệ quy ngây thơ tính lại cùng bài toán con nhiều lần nên tốn O(2ⁿ). Ghi nhớ (memoization) các kết quả đã tính giúp giảm độ phức tạp xuống O(n).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function fib(n, memo = {}) {\n  if (n <= 1) return n;\n  if (n in memo) return memo[n];\n  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));\n}",
            },
            {
              lang: "python",
              code: "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)",
            },
          ],
        },
        { type: "h2", text: "Đệ quy và vòng lặp" },
        {
          type: "ul",
          items: [
            "Đệ quy diễn đạt tự nhiên các bài toán được chia nhỏ (cây, chia để trị, quay lui).",
            "Vòng lặp tiết kiệm bộ nhớ stack; đôi khi thay đệ quy đuôi bằng vòng lặp.",
            "Đệ quy sâu O(n) stack; bản lặp thường chỉ O(1) bộ nhớ phụ.",
          ],
        },
      ],
    },
    {
      slug: "backtracking",
      title: "Backtracking",
      module: "Recursion & Backtracking",
      summary:
        "DFS có quay lui: thử một lựa chọn, đi tiếp, rồi hoàn tác để thử lựa chọn khác.",
      duration: "9 phút",
      blocks: [
        {
          type: "p",
          text: "Backtracking là cách duyệt có hệ thống mọi lời giải tiềm năng: tại mỗi bước chọn một ứng viên, đệ quy đi tiếp, và nếu không dẫn tới lời giải thì hoàn tác (undo) để thử ứng viên khác.",
        },
        { type: "h2", text: "Khung chung" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "function backtrack(state):\n  if <điều kiện dừng>:\n    ghi nhận lời giải\n    return\n  for choice in <các lựa chọn>:\n    chọn(choice)\n    backtrack(state mới)\n    bỏ chọn(choice)   // quay lui",
            },
          ],
        },
        { type: "h2", text: "Ví dụ: sinh mọi tập con" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function subsets(nums) {\n  const result = [];\n  const path = [];\n  function backtrack(start) {\n    result.push([...path]);\n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]);   // chọn\n      backtrack(i + 1);     // đi tiếp\n      path.pop();           // quay lui\n    }\n  }\n  backtrack(0);\n  return result;\n}",
            },
            {
              lang: "python",
              code: "def subsets(nums):\n    result, path = [], []\n    def backtrack(start):\n        result.append(path[:])\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1)\n            path.pop()\n    backtrack(0)\n    return result",
            },
          ],
        },
        { type: "h2", text: "Hoán vị & N-Queens" },
        {
          type: "p",
          text: "Khung này cũng áp dụng cho hoán vị (chọn từng vị trí chưa dùng) và N-Queens (đặt hậu từng hàng, loại các cột/đường chéo bị tấn công). Mấu chốt là cắt nhánh (pruning) càng sớm càng tốt.",
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Tập con: O(2ⁿ) kết quả; hoán vị: O(n!).",
            "Bộ nhớ đệ quy: O(n) cho độ sâu, chưa kể bộ nhớ lưu kết quả.",
            "Cắt nhánh giúp giảm mạnh số nhánh thực tế so với cận trên.",
          ],
        },
        {
          type: "diagram",
          nodes: [
            { id: "start", label: "Bắt đầu", sub: "nums = [1, 2]", x: 320, y: 20, w: 104, h: 58 },
            { id: "skip-1", label: "[]", sub: "sau khi xét 1", x: 150, y: 112, w: 104, h: 58 },
            { id: "choose-1", label: "[1]", sub: "sau khi xét 1", x: 460, y: 112, w: 104, h: 58 },
            { id: "leaf-empty", label: "[]", sub: "kết quả", x: 20, y: 212, w: 104, h: 58 },
            { id: "leaf-two", label: "[2]", sub: "kết quả", x: 210, y: 212, w: 104, h: 58 },
            { id: "leaf-one", label: "[1]", sub: "kết quả", x: 420, y: 212, w: 104, h: 58 },
            { id: "leaf-one-two", label: "[1,2]", sub: "kết quả", x: 610, y: 212, w: 104, h: 58 },
          ],
          edges: [
            { id: "start-skip-1", from: "start", to: "skip-1", label: "Bỏ qua 1" },
            { id: "start-choose-1", from: "start", to: "choose-1", label: "Chọn 1" },
            { id: "skip-1-leaf-empty", from: "skip-1", to: "leaf-empty", label: "Bỏ qua 2" },
            { id: "skip-1-leaf-two", from: "skip-1", to: "leaf-two", label: "Chọn 2" },
            { id: "choose-1-leaf-one", from: "choose-1", to: "leaf-one", label: "Bỏ qua 2" },
            { id: "choose-1-leaf-one-two", from: "choose-1", to: "leaf-one-two", label: "Chọn 2" },
          ],
          caption:
            "Với nums = [1, 2], mỗi tầng chọn hoặc bỏ qua một phần tử. Bốn lá là toàn bộ tập con có thể có.",
        },
      ],
    },
    {
      slug: "recursion-backtracking-quiz",
      title: "Quiz: Recursion & Backtracking",
      module: "Recursion & Backtracking",
      icon: "quiz",
      summary: "Kiểm tra base case, call stack và khung quay lui.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi về đệ quy và backtracking.",
        },
      ],
      quiz: {
        title: "Quiz: Recursion & Backtracking",
        description: "6 câu về đệ quy, memoization và quay lui.",
        questions: [
          {
            id: "rb1",
            tag: "Đệ quy",
            prompt: "Phần nào BẮT BUỘC có trong một hàm đệ quy đúng?",
            options: [
              "Vòng lặp for",
              "Base case để dừng",
              "Một hash map",
              "Một mảng phụ",
            ],
            answer: 1,
            explanation:
              "Thiếu base case, hàm gọi mãi → đệ quy vô hạn và tràn stack.",
          },
          {
            id: "rb2",
            tag: "Call stack",
            prompt: "Đệ quy sâu n lần tốn bao nhiêu bộ nhớ stack?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Mỗi lời gọi giữ một khung, n khung xếp chồng nên tốn O(n).",
          },
          {
            id: "rb3",
            tag: "Memoization",
            prompt: "Vì sao Fibonacci đệ quy ngây thơ tốn O(2ⁿ)?",
            options: [
              "Vì dùng mảng",
              "Vì tính đi tính lại cùng bài toán con nhiều lần",
              "Vì không có base case",
              "Vì dùng vòng lặp lồng nhau",
            ],
            answer: 1,
            explanation:
              "Cây gọi hàm phân nhánh và lặp lại; ghi nhớ kết quả đã tính đưa về O(n).",
          },
          {
            id: "rb4",
            tag: "Backtracking",
            prompt: "Bước 'quay lui' trong backtracking làm gì?",
            options: [
              "Khởi động lại chương trình",
              "Hoàn tác lựa chọn vừa thử để thử lựa chọn khác",
              "Sắp xếp lại mảng",
              "Xóa toàn bộ kết quả",
            ],
            answer: 1,
            explanation:
              "Undo khôi phục trạng thái trước khi chọn, nhờ đó thử được nhánh kế tiếp.",
          },
          {
            id: "rb5",
            tag: "Độ phức tạp",
            prompt: "Sinh mọi tập con của n phần tử có bao nhiêu kết quả?",
            options: ["n", "n²", "2ⁿ", "n!"],
            answer: 2,
            explanation:
              "Mỗi phần tử có hai lựa chọn (chọn / không chọn) → 2ⁿ tập con.",
          },
          {
            id: "rb6",
            tag: "Kỹ thuật",
            prompt: "Cắt nhánh (pruning) trong backtracking nhằm mục đích gì?",
            options: [
              "Giảm số nhánh phải duyệt bằng cách loại sớm nhánh vô vọng",
              "Tăng bộ nhớ sử dụng",
              "Đảo ngược thứ tự kết quả",
              "Chuyển đệ quy thành lặp",
            ],
            answer: 0,
            explanation:
              "Phát hiện nhánh không thể dẫn tới lời giải càng sớm thì càng tiết kiệm thời gian.",
          },
        ],
      },
    },
  ],
};
