import type { CourseModule } from "@/lib/course-types";

export const binarySearchModule: CourseModule = {
  id: "binary-search",
  title: "Binary Search",
  lessons: [
    {
      slug: "binary-search",
      title: "Binary Search",
      module: "Binary Search",
      summary:
        "Chia đôi không gian tìm kiếm trên mảng đã sắp xếp để đạt O(log n).",
      duration: "8 phút",
      visualizer: "binary-search",
      blocks: [
        {
          type: "p",
          text: "Binary Search liên tục thu hẹp khoảng tìm kiếm: so sánh phần tử giữa với target, rồi bỏ đi nửa không thể chứa target.",
        },
        { type: "h2", text: "Cài đặt" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function binarySearch(nums, target) {\n  let lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}",
            },
            {
              lang: "python",
              code: "def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1",
            },
          ],
        },
        { type: "h2", text: "Lưu ý" },
        {
          type: "ul",
          items: [
            "Bắt buộc mảng phải được sắp xếp trước.",
            "Cẩn thận tràn số khi tính mid ở ngôn ngữ khác: dùng lo + (hi - lo) / 2.",
            "Thời gian O(log n), bộ nhớ O(1).",
          ],
        },
      ],
    },
    {
      slug: "binary-search-quiz",
      title: "Quiz: Binary Search",
      module: "Binary Search",
      icon: "quiz",
      summary:
        "Kiểm tra điều kiện, độ phức tạp và các lỗi biên thường gặp của binary search.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "5 câu hỏi về binary search và các lỗi off-by-one.",
        },
      ],
      quiz: {
        title: "Quiz: Binary Search",
        description:
          "5 câu về điều kiện, độ phức tạp và biên của binary search.",
        questions: [
          {
            id: "bs1",
            tag: "Điều kiện",
            prompt:
              "Binary search chỉ hoạt động đúng khi mảng có tính chất gì?",
            options: [
              "Không có phần tử trùng",
              "Đã được sắp xếp",
              "Chứa toàn số nguyên",
              "Độ dài là lũy thừa của 2",
            ],
            answer: 1,
            explanation:
              "Phải sắp xếp để từ việc so sánh với mid suy ra được nửa nào có thể chứa target.",
          },
          {
            id: "bs2",
            tag: "Độ phức tạp",
            prompt: "Độ phức tạp thời gian của binary search?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation:
              "Mỗi bước chia đôi không gian tìm kiếm nên số bước là log₂(n).",
          },
          {
            id: "bs3",
            tag: "Biên",
            prompt:
              "Vì sao nên viết mid = lo + (hi - lo) / 2 thay vì (lo + hi) / 2?",
            options: [
              "Để chạy nhanh hơn",
              "Để tránh tràn số khi lo + hi vượt giới hạn kiểu dữ liệu",
              "Vì kết quả khác nhau",
              "Để tránh lặp vô hạn",
            ],
            answer: 1,
            explanation:
              "Ở ngôn ngữ với số nguyên có giới hạn, lo + hi có thể tràn; hiệu số thì không.",
          },
          {
            id: "bs4",
            tag: "Biên",
            prompt: "Vòng lặp while (lo <= hi) kết thúc khi nào?",
            options: [
              "Khi tìm thấy target",
              "Khi lo > hi (khoảng rỗng)",
              "Khi hi = 0",
              "Khi mid = 0",
            ],
            answer: 1,
            explanation:
              "Dùng dấu <= để xét cả đoạn một phần tử; khi lo vượt hi nghĩa là không còn phần tử nào.",
          },
          {
            id: "bs5",
            tag: "Ứng dụng",
            prompt:
              "Tìm vị trí chèn (search insert position) trong mảng đã sắp xếp trả về gì khi không có target?",
            options: [
              "Luôn -1",
              "Chỉ số cần chèn để giữ thứ tự",
              "Chỉ số của phần tử giữa",
              "Độ dài mảng chia đôi",
            ],
            answer: 1,
            explanation:
              "Khi vòng lặp kết thúc, lo chính là vị trí đầu tiên có giá trị lớn hơn hoặc bằng target.",
          },
        ],
      },
    },
  ],
};
