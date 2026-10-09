import type { CourseModule } from "@/lib/course-types";

export const hashTablesModule: CourseModule = {
  id: "hash-tables",
  title: "Hash Tables",
  lessons: [
    {
      slug: "hash-table-basics",
      title: "Hash Table hoạt động thế nào",
      module: "Hash Tables",
      summary:
        "Hàm băm ánh xạ key vào bucket. Khi hash phân bố tốt và load factor được kiểm soát, thao tác tra cứu có thời gian kỳ vọng O(1); trường hợp xấu nhất là O(n).",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Hash table (bảng băm) lưu các cặp key–value. Khi hash phân bố tốt và load factor phù hợp, tra cứu/xóa có thời gian kỳ vọng O(1); thêm phần tử có thời gian O(1) amortized khi tính cả các lần resize. Đổi lại, cấu trúc này dùng thêm bộ nhớ và nói chung không đảm bảo thứ tự duyệt.",
        },
        { type: "h2", text: "Hàm băm và bucket" },
        {
          type: "p",
          text: "Hash function (hàm băm) nhận key và xác định bucket để lưu cặp key–value. Với ví dụ số nguyên, ta có thể dùng h(k) = k mod m, trong đó m là số bucket. Hàm băm tốt cần tính nhanh và phân bố key tương đối đều để giảm va chạm.",
        },
        {
          type: "diagram",
          nodes: [
            { id: "key12", label: "key = 12", x: 16, y: 52, w: 100, h: 46 },
            { id: "key22", label: "key = 22", x: 16, y: 146, w: 100, h: 46 },
            { id: "hash", label: "h(k) = k mod 5", sub: "hàm băm minh họa", x: 154, y: 96, w: 166, h: 54 },
            { id: "bucket0", label: "bucket 0", x: 376, y: 8, w: 104, h: 42 },
            { id: "bucket1", label: "bucket 1", x: 376, y: 58, w: 104, h: 42 },
            { id: "bucket2", label: "bucket 2", sub: "chỉ số 2", x: 376, y: 108, w: 104, h: 42 },
            { id: "bucket3", label: "bucket 3", x: 376, y: 158, w: 104, h: 42 },
            { id: "bucket4", label: "bucket 4", x: 376, y: 208, w: 104, h: 42 },
            { id: "entry12", label: "12 → A", sub: "key–value", x: 540, y: 84, w: 132, h: 50 },
            { id: "entry22", label: "22 → B", sub: "key–value", x: 540, y: 158, w: 132, h: 50 },
          ],
          edges: [
            { id: "key12-hash", from: "key12", to: "hash" },
            { id: "key22-hash", from: "key22", to: "hash" },
            { id: "hash-bucket2", from: "hash", to: "bucket2", label: "2" },
            { id: "bucket2-entry12", from: "bucket2", to: "entry12" },
            { id: "entry12-entry22", from: "entry12", to: "entry22", label: "next" },
          ],
          caption:
            "Với 5 bucket, h(12) = 12 mod 5 = 2 và h(22) = 22 mod 5 = 2. Hai key khác nhau cùng vào bucket 2: đó là va chạm (collision). Separate chaining giữ cả hai cặp trong cùng một danh sách.",
        },
        {
          type: "p",
          text: "Khi tra cứu key = 22, ta tính h(22) để tới bucket 2 rồi lần lượt so sánh key trong danh sách cho đến khi gặp 22. Bucket giúp thu hẹp nơi cần tìm, nhưng không thay thế bước so sánh key: hai key khác nhau có thể cùng rơi vào một bucket.",
        },
        {
          type: "p",
          text: "Trong nhiều cài đặt, key trước hết được đổi thành một hash code (mã băm) số nguyên rồi ánh xạ vào chỉ số từ 0 đến m − 1. Va chạm nói đến hai key khác nhau có cùng chỉ số bucket; chúng vẫn có thể có hash code khác nhau trước bước ánh xạ.",
        },
        { type: "h2", text: "Xử lý va chạm" },
        {
          type: "ul",
          items: [
            "Separate chaining: mỗi bucket giữ một danh sách liên kết các cặp key–value.",
            "Open addressing: nếu bucket đã bị chiếm, dò sang bucket khác theo linear/quadratic probing hoặc double hashing.",
            "Khi xóa trong open addressing, dùng dấu 'tombstone' để việc tìm kiếm không dừng nhầm giữa chừng trong chuỗi dò.",
          ],
        },
        {
          type: "p",
          text: "Với separate chaining, tra cứu chỉ cần quét danh sách ở bucket đã tính. Với open addressing, tra cứu đi tiếp theo cùng quy tắc dò như lúc chèn; ô tombstone không được xem là ô chưa từng dùng.",
        },
        { type: "h2", text: "Load factor và resize" },
        {
          type: "p",
          text: "Load factor α = n / m, với n là số cặp key–value và m là số bucket (hoặc slot). Trong separate chaining, α là số phần tử trung bình mỗi bucket và có thể lớn hơn 1; trong open addressing, α là tỷ lệ slot đang có phần tử nên phải nhỏ hơn 1. α cao thường làm tra cứu chậm hơn, nhưng ngưỡng resize tùy cách cài đặt — 0.75 không phải quy tắc chung.",
        },
        {
          type: "p",
          text: "Ví dụ, Java HashMap dùng load factor mặc định 0.75; khi số phần tử vượt ngưỡng, nó tăng số bucket lên xấp xỉ gấp đôi và rehash. Một lần resize tốn O(n), nhưng nếu dung lượng tăng theo cấp số nhân thì chi phí chèn được dàn đều thành O(1) amortized (trung bình qua nhiều lần chèn).",
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Tra cứu/xóa: thời gian kỳ vọng O(1) khi hash phân bố tốt và load factor phù hợp. Chèn: kỳ vọng O(1) nếu bỏ qua resize, và O(1) amortized khi dung lượng tăng theo cấp số nhân; một lần resize riêng lẻ tốn O(n).",
            "Với các cách cài đặt cơ bản, trường hợp xấu nhất là O(n), chẳng hạn khi mọi key dồn vào cùng bucket hoặc cùng chuỗi dò.",
            "Bộ nhớ là O(n + m), với m là số bucket/slot; thường được ghi O(n) khi dung lượng bảng được giữ cùng bậc với số phần tử.",
            "Hash table nói chung không đảm bảo thứ tự duyệt. Riêng Map trong JavaScript giữ thứ tự chèn.",
          ],
        },
      ],
    },
    {
      slug: "hash-map-patterns",
      title: "Ứng dụng Hash Map",
      module: "Hash Tables",
      summary:
        "Bốn mẫu phổ biến: đếm tần suất, Two Sum trên mảng chưa sắp xếp, khử trùng lặp và nhóm phần tử theo khóa.",
      duration: "9 phút",
      blocks: [
        {
          type: "p",
          text: "Hash map giúp đổi thêm bộ nhớ lấy thời gian: thay vì quét lại mảng, ta lưu thông tin đã gặp để tra cứu nhanh. Dưới đây là bốn mẫu thường gặp trong bài phỏng vấn.",
        },
        { type: "h2", text: "1. Đếm tần suất" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function countFreq(nums) {\n  const freq = new Map();\n  for (const x of nums) {\n    freq.set(x, (freq.get(x) ?? 0) + 1);\n  }\n  return freq;\n}",
            },
            {
              lang: "python",
              code: "from collections import Counter\n\ndef count_freq(nums):\n    return Counter(nums)",
            },
          ],
        },
        { type: "h2", text: "2. Two Sum (mảng chưa sắp xếp)" },
        {
          type: "p",
          text: "Với mỗi phần tử, ta cần biết phần bù (target - x) đã xuất hiện trước đó chưa. Lưu các giá trị đã gặp vào map để tra cứu trong thời gian kỳ vọng O(1), nếu hàm băm phân bố tốt và load factor được kiểm soát.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}",
            },
            {
              lang: "python",
              code: "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i\n    return []",
            },
          ],
        },
        { type: "h2", text: "3. Khử trùng lặp" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function dedup(nums) {\n  return [...new Set(nums)];\n}",
            },
            {
              lang: "python",
              code: "def dedup(nums):\n    return list(set(nums))",
            },
          ],
        },
        { type: "h2", text: "4. Nhóm theo khóa" },
        {
          type: "p",
          text: "Nhóm các từ đảo chữ (anagram) bằng cách sắp xếp ký tự trong mỗi từ rồi dùng chuỗi đã sắp xếp làm khóa chung.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function groupAnagrams(words) {\n  const groups = new Map();\n  for (const w of words) {\n    const key = w.split('').sort().join('');\n    if (!groups.has(key)) groups.set(key, []);\n    groups.get(key).push(w);\n  }\n  return [...groups.values()];\n}",
            },
            {
              lang: "python",
              code: "def group_anagrams(words):\n    groups = {}\n    for w in words:\n        key = ''.join(sorted(w))\n        groups.setdefault(key, []).append(w)\n    return list(groups.values())",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Đếm tần suất, Two Sum và khử trùng lặp: O(n) thời gian kỳ vọng nếu hàm băm phân bố tốt và load factor được kiểm soát; bộ nhớ O(n), với n là số phần tử đầu vào.",
            "Nhóm anagram: với m chuỗi và k là độ dài lớn nhất, sắp xếp ký tự tốn O(m·k log k) thời gian; lưu các khóa và nhóm tốn O(m·k) bộ nhớ. Các phép toán hash map có thời gian kỳ vọng O(1) khi hash phân bố tốt và load factor được kiểm soát.",
            "Đánh đổi: dùng thêm bộ nhớ để tránh phải quét lặp lại dữ liệu, chẳng hạn bằng vòng lặp lồng nhau O(n²).",
          ],
        },
      ],
    },
    {
      slug: "hash-tables-quiz",
      title: "Quiz: Hash Tables",
      module: "Hash Tables",
      icon: "quiz",
      summary:
        "Ôn tập hàm băm, va chạm, load factor và các ứng dụng của hash map.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "Sáu câu hỏi dưới đây giúp bạn ôn cách hash table hoạt động và khi nào nên dùng cấu trúc này.",
        },
      ],
      quiz: {
        title: "Quiz: Hash Tables",
        description:
          "Sáu câu hỏi về bảng băm và các mẫu ứng dụng hash map phổ biến.",
        questions: [
          {
            id: "ht1",
            tag: "Cơ bản",
            prompt: "Tra cứu trong hash table tốn bao nhiêu thời gian TRUNG BÌNH?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation:
              "Khi hash phân bố tốt và load factor được kiểm soát, số phần tử trung bình trong mỗi bucket được giữ ở mức thấp nên thời gian tra cứu kỳ vọng là O(1).",
          },
          {
            id: "ht2",
            tag: "Cơ bản",
            prompt:
              "Điều gì khiến tra cứu hash table rơi vào trường hợp xấu nhất O(n)?",
            options: [
              "Mảng quá nhỏ",
              "Mọi key va chạm và dồn vào cùng một bucket",
              "Giá trị là số thực",
              "Số bucket là số nguyên tố",
            ],
            answer: 1,
            explanation:
              "Nếu mọi key rơi vào cùng một bucket, ta có thể phải duyệt tuần tự cả danh sách; khi đó tra cứu mất O(n).",
          },
          {
            id: "ht3",
            tag: "Va chạm",
            prompt:
              "Kỹ thuật nào lưu nhiều cặp key–value trong cùng một bucket bằng một danh sách liên kết?",
            options: [
              "Separate chaining",
              "Binary search",
              "Merge sort",
              "Tombstone",
            ],
            answer: 0,
            explanation:
              "Separate chaining lưu danh sách các mục trong mỗi bucket; tombstone là dấu đánh dấu mục đã xóa trong open addressing.",
          },
          {
            id: "ht4",
            tag: "Load factor",
            prompt: "Load factor của hash table được tính thế nào?",
            options: [
              "Số bucket chia cho số phần tử",
              "Số phần tử chia cho số bucket",
              "Kích thước key chia cho kích thước value",
              "Số va chạm chia cho số phép băm",
            ],
            answer: 1,
            explanation:
              "Load factor α = n / m, với n là số phần tử đang lưu và m là số bucket.",
          },
          {
            id: "ht5",
            tag: "Load factor",
            prompt: "Khi load factor vượt ngưỡng (ví dụ 0.75), hash table thường làm gì?",
            options: [
              "Xóa bớt phần tử cũ",
              "Đổi hàm băm sang hàm khác nhưng giữ nguyên bucket",
              "Tăng số bucket (thường gấp đôi) và băm lại toàn bộ key",
              "Chuyển toàn bộ sang một mảng tuyến tính",
            ],
            answer: 2,
            explanation:
              "Ngưỡng tùy implementation; Java HashMap dùng mặc định 0.75. Khi vượt ngưỡng, bảng có thể tăng số bucket rồi rehash. Mỗi lần resize tốn O(n), nhưng khi dung lượng tăng theo cấp số nhân, chi phí chèn là O(1) amortized.",
          },
          {
            id: "ht6",
            tag: "Ứng dụng",
            prompt:
              "Two Sum trên mảng CHƯA sắp xếp dùng hash map đạt độ phức tạp nào?",
            options: [
              "O(1) thời gian, O(1) bộ nhớ",
              "O(n) thời gian, O(n) bộ nhớ",
              "O(n log n) thời gian, O(1) bộ nhớ",
              "O(n²) thời gian, O(1) bộ nhớ",
            ],
            answer: 1,
            explanation:
              "Một lượt duyệt dùng map để lưu các giá trị đã gặp: thời gian kỳ vọng O(n) nếu hash phân bố tốt và load factor được kiểm soát, đổi lại tốn O(n) bộ nhớ.",
          },
        ],
      },
    },
  ],
};
