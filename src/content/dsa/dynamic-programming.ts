import type { CourseModule } from "@/lib/course-types";

export const dynamicProgrammingModule: CourseModule = {
  id: "dynamic-programming",
  title: "Dynamic Programming",
  lessons: [
    {
      slug: "dp-basics",
      title: "Dynamic Programming là gì",
      module: "Dynamic Programming",
      summary:
        "Chia bài toán thành các bài toán con chồng lấp và lưu kết quả để không tính lại.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Dynamic Programming (DP) giải bài toán lớn bằng cách kết hợp lời giải của các bài toán con, và lưu lại kết quả đã tính. DP phù hợp khi bài toán có hai tính chất dưới đây.",
        },
        { type: "h2", text: "Hai điều kiện" },
        {
          type: "ul",
          items: [
            "Bài toán con chồng lấp (overlapping subproblems): cùng một bài toán con được gọi lại nhiều lần.",
            "Cấu trúc con tối ưu (optimal substructure): lời giải tối ưu dựng từ lời giải tối ưu của bài toán con.",
          ],
        },
        { type: "h2", text: "Memoization vs Tabulation" },
        {
          type: "ul",
          items: [
            "Memoization (top-down): đệ quy + cache kết quả, viết gần với công thức truy hồi.",
            "Tabulation (bottom-up): lấp bảng từ bài toán nhỏ nhất tới lớn, thường lặp và tiết kiệm stack.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "// Bottom-up: fib(n) với O(1) bộ nhớ\nfunction fib(n) {\n  let prev = 0, cur = 1;\n  for (let i = 0; i < n; i++) {\n    [prev, cur] = [cur, prev + cur];\n  }\n  return prev;\n}",
            },
            {
              lang: "python",
              code: "# Bottom-up: fib(n) voi O(1) bo nho\ndef fib(n):\n    prev, cur = 0, 1\n    for _ in range(n):\n        prev, cur = cur, prev + cur\n    return prev",
            },
          ],
        },
        { type: "h2", text: "Nhận diện DP" },
        {
          type: "p",
          text: "Dấu hiệu: câu hỏi kiểu 'số cách', 'giá trị lớn nhất/nhỏ nhất', 'có thể đạt được không', và lời giải có thể viết thành công thức truy hồi theo chỉ số hoặc trạng thái.",
        },
      ],
    },
    {
      slug: "dp-patterns",
      title: "Mẫu DP 1D",
      module: "Dynamic Programming",
      summary:
        "House Robber: công thức truy hồi dp[i] = max(dp[i-1], dp[i-2] + nums[i]) và tối ưu bộ nhớ.",
      duration: "9 phút",
      visualizer: "dp-1d",
      blocks: [
        {
          type: "p",
          text: "Mẫu DP 1D dùng một mảng dp theo chỉ số i. Ví dụ House Robber: không được cướp hai nhà kề nhau, hỏi số tiền lớn nhất cướp được.",
        },
        { type: "h2", text: "Công thức truy hồi" },
        {
          type: "p",
          text: "Tại nhà i có hai lựa chọn: bỏ (giữ nguyên dp[i-1]) hoặc lấy (dp[i-2] + nums[i]). Ta chọn giá trị lớn hơn. Chỉ cần giữ hai giá trị gần nhất nên bộ nhớ là O(1).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function rob(nums) {\n  let prev2 = 0; // dp[i-2]\n  let prev1 = 0; // dp[i-1]\n  for (const x of nums) {\n    const take = prev2 + x;\n    const skip = prev1;\n    prev2 = prev1;\n    prev1 = Math.max(take, skip);\n  }\n  return prev1;\n}",
            },
            {
              lang: "python",
              code: "def rob(nums):\n    prev2 = prev1 = 0\n    for x in nums:\n        take = prev2 + x\n        skip = prev1\n        prev2, prev1 = prev1, max(take, skip)\n    return prev1",
            },
          ],
        },
        { type: "h2", text: "Mẫu 2D: Knapsack" },
        {
          type: "p",
          text: "Khi trạng thái cần hai chiều (chỉ số vật + sức chứa), dùng bảng dp 2D. Ba lô 0/1: dp[i][c] = giá trị lớn nhất khi xét i vật đầu với sức chứa c. Có thể tối ưu về 1D bằng cách duyệt sức chứa giảm dần.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function knapsack(weights, values, cap) {\n  const dp = new Array(cap + 1).fill(0);\n  for (let i = 0; i < weights.length; i++) {\n    for (let c = cap; c >= weights[i]; c--) {\n      dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);\n    }\n  }\n  return dp[cap];\n}",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "DP 1D: O(n) thời gian; có thể O(1) bộ nhớ.",
            "DP 2D / ba lô: O(n × C) thời gian và bộ nhớ (tối ưu còn O(C)).",
          ],
        },
      ],
    },
    {
      slug: "dp-quiz",
      title: "Quiz: Dynamic Programming",
      module: "Dynamic Programming",
      icon: "quiz",
      summary:
        "Kiểm tra hai điều kiện của DP, memo vs tabulation và công thức truy hồi.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi về Dynamic Programming.",
        },
      ],
      quiz: {
        title: "Quiz: Dynamic Programming",
        description: "6 câu về DP, memoization/tabulation và độ phức tạp.",
        questions: [
          {
            id: "dp1",
            tag: "Khái niệm",
            prompt: "Hai điều kiện để dùng DP là gì?",
            options: [
              "Mảng đã sắp xếp và không trùng",
              "Bài toán con chồng lấp và cấu trúc con tối ưu",
              "Đồ thị liên thông và có trọng số",
              "Đệ quy và vòng lặp",
            ],
            answer: 1,
            explanation:
              "DP cần các bài toán con lặp lại và lời giải tối ưu dựng từ bài toán con tối ưu.",
          },
          {
            id: "dp2",
            tag: "Kỹ thuật",
            prompt: "Memoization (top-down) khác Tabulation (bottom-up) ở điểm nào?",
            options: [
              "Memo dùng đệ quy + cache; Tab lấp bảng từ nhỏ tới lớn bằng lặp",
              "Memo luôn nhanh hơn",
              "Tab không cần lưu kết quả",
              "Memo chỉ dùng cho đồ thị",
            ],
            answer: 0,
            explanation:
              "Memo tận dụng đệ quy và chỉ tính bài toán con khi cần; Tab chủ động lấp bảng theo thứ tự.",
          },
          {
            id: "dp3",
            tag: "House Robber",
            prompt: "Công thức truy hồi của House Robber là gì?",
            options: [
              "dp[i] = dp[i-1] + nums[i]",
              "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
              "dp[i] = min(dp[i-1], nums[i])",
              "dp[i] = nums[i] * 2",
            ],
            answer: 1,
            explanation:
              "Chọn giữa bỏ nhà i (dp[i-1]) và cướp nó cộng với dp[i-2].",
          },
          {
            id: "dp4",
            tag: "Tối ưu bộ nhớ",
            prompt: "House Robber có thể giảm bộ nhớ xuống bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Chỉ cần hai giá trị dp[i-1] và dp[i-2] nên bộ nhớ phụ là hằng số.",
          },
          {
            id: "dp5",
            tag: "Độ phức tạp",
            prompt: "Ba lô 0/1 với n vật và sức chứa C tốn bao nhiêu?",
            options: ["O(n)", "O(C)", "O(n × C)", "O(2ⁿ)"],
            answer: 2,
            explanation:
              "Bảng trạng thái có n × C ô, mỗi ô xử lý O(1).",
          },
          {
            id: "dp6",
            tag: "Nhận diện",
            prompt: "Dấu hiệu nào thường gợi ý dùng DP?",
            options: [
              "Cần sắp xếp mảng",
              "Câu hỏi 'số cách', 'lớn nhất/nhỏ nhất', 'có đạt được không'",
              "Chỉ cần truy cập phần tử giữa",
              "Đồ thị có đúng một chu trình",
            ],
            answer: 1,
            explanation:
              "Các câu hỏi tối ưu/đếm có công thức truy hồi là dấu hiệu điển hình của DP.",
          },
        ],
      },
    },
  ],
};
