import type { CourseModule } from "@/lib/course-types";

export const sortingModule: CourseModule = {
  id: "sorting",
  title: "Sorting Algorithms",
  lessons: [
    {
      slug: "bubble-sort",
      title: "Bubble Sort",
      module: "Sorting Algorithms",
      summary:
        "Thuật toán sắp xếp nhập môn: so sánh các cặp kề nhau và đổi chỗ cho tới khi mảng có thứ tự.",
      duration: "9 phút",
      visualizer: "bubble-sort",
      blocks: [
        {
          type: "p",
          text: "Bubble Sort duyệt mảng nhiều lượt. Ở mỗi lượt, nó so sánh từng cặp phần tử kề nhau và đổi chỗ nếu chúng sai thứ tự. Sau mỗi lượt, phần tử lớn nhất còn lại 'nổi' dần về cuối mảng.",
        },
        {
          type: "p",
          text: "Hãy dùng mô phỏng bên dưới để xem từng bước so sánh và đổi chỗ diễn ra như thế nào.",
        },
        { type: "h2", text: "Mã giả" },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "for i = 0 to n - 2:\n  for j = 0 to n - 2 - i:\n    if a[j] > a[j + 1]:\n      swap(a[j], a[j + 1])",
            },
          ],
        },
        { type: "h2", text: "Cài đặt" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function bubbleSort(a) {\n  const n = a.length;\n  for (let i = 0; i < n - 1; i++) {\n    let swapped = false;\n    for (let j = 0; j < n - 1 - i; j++) {\n      if (a[j] > a[j + 1]) {\n        [a[j], a[j + 1]] = [a[j + 1], a[j]];\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n  }\n  return a;\n}",
            },
            {
              lang: "python",
              code: "def bubble_sort(a):\n    n = len(a)\n    for i in range(n - 1):\n        swapped = False\n        for j in range(n - 1 - i):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n                swapped = True\n        if not swapped:\n            break\n    return a",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thời gian: O(n²) trung bình và xấu nhất, O(n) khi mảng đã sắp xếp (nhờ cờ swapped).",
            "Bộ nhớ: O(1) — sắp xếp tại chỗ.",
            "Ổn định (stable): có, vì chỉ đổi chỗ khi phần tử bên trái lớn hơn hẳn.",
          ],
        },
      ],
    },
    {
      slug: "selection-sort",
      title: "Selection Sort",
      module: "Sorting Algorithms",
      summary:
        "Mỗi lượt chọn phần tử nhỏ nhất trong phần chưa sắp xếp và đưa về đầu.",
      duration: "6 phút",
      visualizer: "selection-sort",
      blocks: [
        {
          type: "p",
          text: "Selection Sort chia mảng thành phần đã sắp xếp (bên trái) và phần chưa sắp xếp (bên phải). Mỗi lượt, nó tìm phần tử nhỏ nhất trong phần chưa sắp xếp rồi hoán đổi vào vị trí kế tiếp của phần đã sắp xếp.",
        },
        { type: "h2", text: "Cài đặt" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function selectionSort(a) {\n  const n = a.length;\n  for (let i = 0; i < n - 1; i++) {\n    let min = i;\n    for (let j = i + 1; j < n; j++) {\n      if (a[j] < a[min]) min = j;\n    }\n    if (min !== i) [a[i], a[min]] = [a[min], a[i]];\n  }\n  return a;\n}",
            },
            {
              lang: "python",
              code: "def selection_sort(a):\n    n = len(a)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if a[j] < a[min_idx]:\n                min_idx = j\n        if min_idx != i:\n            a[i], a[min_idx] = a[min_idx], a[i]\n    return a",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thời gian: O(n²) trong mọi trường hợp.",
            "Bộ nhớ: O(1).",
            "Số lần hoán đổi ít nhất trong các thuật toán O(n²): tối đa n-1 lần.",
          ],
        },
      ],
    },
    {
      slug: "insertion-sort",
      title: "Insertion Sort",
      module: "Sorting Algorithms",
      summary:
        "Chèn dần từng phần tử vào đúng vị trí trong phần đã sắp xếp bên trái.",
      duration: "6 phút",
      visualizer: "insertion-sort",
      blocks: [
        {
          type: "p",
          text: "Insertion Sort giống như cách bạn sắp xếp bài trên tay: lấy từng lá bài và chèn vào đúng chỗ trong các lá đã sắp xếp.",
        },
        { type: "h2", text: "Cài đặt" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function insertionSort(a) {\n  for (let i = 1; i < a.length; i++) {\n    const key = a[i];\n    let j = i - 1;\n    while (j >= 0 && a[j] > key) {\n      a[j + 1] = a[j];\n      j--;\n    }\n    a[j + 1] = key;\n  }\n  return a;\n}",
            },
            {
              lang: "python",
              code: "def insertion_sort(a):\n    for i in range(1, len(a)):\n        key = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > key:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = key\n    return a",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thời gian: O(n²) xấu nhất, nhưng O(n) khi mảng gần như đã sắp xếp.",
            "Bộ nhớ: O(1).",
            "Ổn định và rất hiệu quả với mảng nhỏ.",
          ],
        },
      ],
    },
    {
      slug: "sorting-quiz",
      title: "Quiz: Sorting Algorithms",
      module: "Sorting Algorithms",
      icon: "quiz",
      summary:
        "Kiểm tra độ phức tạp, tính ổn định và đặc điểm của các thuật toán sắp xếp cơ bản.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi dưới đây củng cố sự khác biệt giữa Bubble, Selection và Insertion Sort.",
        },
      ],
      quiz: {
        title: "Quiz: Sorting Algorithms",
        description: "6 câu về độ phức tạp, tính ổn định và số phép hoán đổi.",
        questions: [
          {
            id: "so1",
            tag: "Bubble Sort",
            prompt: "Bubble Sort chạy nhanh nhất O(n) khi nào?",
            options: [
              "Khi mảng đã được sắp xếp sẵn",
              "Khi mảng sắp xếp giảm dần",
              "Khi mảng có các phần tử bằng nhau",
              "Bubble Sort luôn là O(n²)",
            ],
            answer: 0,
            explanation:
              "Nhờ cờ swapped, một lượt không đổi chỗ nào nghĩa là mảng đã có thứ tự, nên chỉ mất O(n).",
          },
          {
            id: "so2",
            tag: "Selection Sort",
            prompt: "Selection Sort thực hiện tối đa bao nhiêu phép hoán đổi?",
            options: ["O(1)", "O(log n)", "n - 1", "O(n²)"],
            answer: 2,
            explanation:
              "Mỗi lượt chỉ hoán đổi một lần (hoặc không), và có n - 1 lượt → tối đa n - 1 phép đổi chỗ.",
          },
          {
            id: "so3",
            tag: "Insertion Sort",
            prompt:
              "Thuật toán nào đạt O(n) khi mảng gần như đã sắp xếp và là sắp xếp ổn định?",
            options: ["Selection Sort", "Insertion Sort", "Heap Sort", "Quick Sort"],
            answer: 1,
            explanation:
              "Insertion Sort chèn từng phần tử vào đúng chỗ; mảng gần sắp xếp thì mỗi lượt gần như không phải dịch.",
          },
          {
            id: "so4",
            tag: "Ổn định",
            prompt: "Sắp xếp ổn định (stable) nghĩa là gì?",
            options: [
              "Không dùng bộ nhớ phụ",
              "Các phần tử bằng nhau giữ nguyên thứ tự tương đối ban đầu",
              "Luôn chạy trong O(n log n)",
              "Không bao giờ hoán đổi phần tử",
            ],
            answer: 1,
            explanation:
              "Ổn định là giữ nguyên thứ tự xuất hiện của các phần tử có khóa bằng nhau.",
          },
          {
            id: "so5",
            tag: "Hiệu năng",
            prompt:
              "Thuật toán nào có số phép hoán đổi ít nhất trong nhóm O(n²)?",
            options: [
              "Bubble Sort",
              "Insertion Sort",
              "Selection Sort",
              "Cả ba như nhau",
            ],
            answer: 2,
            explanation:
              "Selection Sort chỉ hoán đổi tối đa n - 1 lần, ít hơn đáng kể so với Bubble/Insertion.",
          },
          {
            id: "so6",
            tag: "Độ phức tạp",
            prompt:
              "Độ phức tạp thời gian trung bình của cả ba thuật toán trên?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
            answer: 2,
            explanation:
              "Bubble, Selection và Insertion đều là O(n²) trung bình do dùng hai vòng lặp lồng nhau.",
          },
        ],
      },
    },
  ],
};
