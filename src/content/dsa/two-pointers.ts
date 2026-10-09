import type { CourseModule } from "@/lib/course-types";

export const twoPointersModule: CourseModule = {
  id: "two-pointers",
  title: "Two Pointers",
  lessons: [
    {
      slug: "two-sum",
      title: "Two Sum (Sorted Array)",
      module: "Two Pointers",
      summary:
        "Dùng hai con trỏ ở hai đầu mảng đã sắp xếp để tìm cặp có tổng bằng target.",
      duration: "7 phút",
      visualizer: "two-sum",
      blocks: [
        {
          type: "p",
          text: "Với mảng đã sắp xếp, đặt con trỏ left ở đầu và right ở cuối. Nếu tổng nhỏ hơn target, tăng left; nếu lớn hơn, giảm right; nếu bằng target, ta đã tìm thấy cặp cần tìm.",
        },
        { type: "h2", text: "Cài đặt" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function twoSumSorted(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const sum = nums[l] + nums[r];\n    if (sum === target) return [l, r];\n    if (sum < target) l++;\n    else r--;\n  }\n  return [];\n}",
            },
            {
              lang: "python",
              code: "def two_sum_sorted(nums, target):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        s = nums[l] + nums[r]\n        if s == target:\n            return [l, r]\n        if s < target:\n            l += 1\n        else:\n            r -= 1\n    return []",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thời gian: O(n) — mỗi bước loại một phần tử khỏi khoảng tìm kiếm.",
            "Bộ nhớ: O(1).",
          ],
        },
      ],
    },
    {
      slug: "two-pointers-quiz",
      title: "Quiz: Two Pointers",
      module: "Two Pointers",
      icon: "quiz",
      summary: "Kiểm tra kỹ thuật hai con trỏ và điều kiện áp dụng.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "5 câu hỏi về kỹ thuật hai con trỏ trên mảng đã sắp xếp.",
        },
      ],
      quiz: {
        title: "Quiz: Two Pointers",
        description: "5 câu về hai con trỏ, điều kiện và biến thể.",
        questions: [
          {
            id: "tp1",
            tag: "Điều kiện",
            prompt:
              "Để dùng hai con trỏ giải Two Sum, mảng cần có đặc điểm gì?",
            options: [
              "Không có phần tử trùng",
              "Đã được sắp xếp",
              "Độ dài chẵn",
              "Chứa toàn số dương",
            ],
            answer: 1,
            explanation:
              "Chỉ khi mảng đã sắp xếp ta mới biết chắc tăng L làm tổng tăng và giảm R làm tổng giảm.",
          },
          {
            id: "tp2",
            tag: "Thuật toán",
            prompt: "Khi tổng a[L] + a[R] nhỏ hơn target, ta nên làm gì?",
            options: ["Giảm R", "Tăng L", "Tăng R", "Dừng lại"],
            answer: 1,
            explanation:
              "Mảng đã sắp xếp nên tăng L (sang phần tử lớn hơn) sẽ làm tổng tăng dần tới target.",
          },
          {
            id: "tp3",
            tag: "Độ phức tạp",
            prompt:
              "Độ phức tạp của Two Sum hai con trỏ trên mảng đã sắp xếp?",
            options: [
              "O(1) thời gian, O(1) bộ nhớ",
              "O(n) thời gian, O(1) bộ nhớ",
              "O(n log n) thời gian, O(n) bộ nhớ",
              "O(n²) thời gian, O(1) bộ nhớ",
            ],
            answer: 1,
            explanation:
              "Mỗi bước loại bỏ một phần tử nên chỉ O(n) bước, và không dùng thêm bộ nhớ.",
          },
          {
            id: "tp4",
            tag: "Biến thể",
            prompt: "Bài toán nào KHÔNG phải ứng dụng tự nhiên của hai con trỏ?",
            options: [
              "Kiểm tra palindrome",
              "Đảo ngược mảng tại chỗ",
              "Tìm cặp có tổng bằng target trong mảng đã sắp xếp",
              "Đếm tần suất ký tự",
            ],
            answer: 3,
            explanation:
              "Đếm tần suất phù hợp với hash map; ba bài còn lại chỉ cần hai chỉ số tiến vào nhau.",
          },
          {
            id: "tp5",
            tag: "Biến thể",
            prompt:
              "Trên mảng đã sắp xếp, đếm số cặp có tổng bằng target dùng hai con trỏ đạt?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Vẫn một lượt quét với hai con trỏ; các cặp trùng xử lý bằng cách gom nhóm giá trị bằng nhau.",
          },
        ],
      },
    },
  ],
};
