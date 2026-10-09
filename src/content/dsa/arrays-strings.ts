import type { CourseModule } from "@/lib/course-types";

export const arraysStringsModule: CourseModule = {
  id: "arrays-strings",
  title: "Arrays & Strings",
  lessons: [
    {
      slug: "array-basics",
      title: "Array & Dynamic Array",
      module: "Arrays & Strings",
      summary:
        "Mảng là dãy ô nhớ liền kề: truy cập O(1), chèn/xóa ở đầu hoặc giữa O(n), append vào mảng động có chi phí O(1) amortized (trung bình qua nhiều lần thêm).",
      duration: "14 phút",
      blocks: [
        {
          type: "p",
          text: "Array (mảng) là nền tảng của nhiều thuật toán bạn sẽ học sau này: vòng lặp, sắp xếp, two pointers, sliding window, prefix sum và bảng quy hoạch động đều thường được xây dựng trên mảng. Hãy hiểu cách mảng lưu dữ liệu liền kề trong bộ nhớ và chi phí của từng thao tác để nắm được bản chất các mẫu thuật toán, thay vì chỉ học thuộc công thức.",
        },
        { type: "h2", text: "Mảng là gì" },
        {
          type: "p",
          text: "Mảng lưu một dãy phần tử trong một vùng bộ nhớ liền kề. Nếu cần lưu 100 số, việc tạo các biến num1, num2, …, num100 sẽ rất khó quản lý. Mảng gom chúng dưới một tên; mỗi phần tử được truy cập bằng một chỉ số: a[0], a[1], a[2].",
        },
        {
          type: "diagram",
          nodes: [
            { id: "a0", label: "1", sub: "i = 0", tone: "sky", x: 16, y: 28, w: 96, h: 58 },
            { id: "a1", label: "3", sub: "i = 1", tone: "sky", x: 128, y: 28, w: 96, h: 58 },
            { id: "a2", label: "5", sub: "i = 2", tone: "sky", x: 240, y: 28, w: 96, h: 58 },
            { id: "a3", label: "7", sub: "i = 3", tone: "sky", x: 352, y: 28, w: 96, h: 58 },
            { id: "a4", label: "9", sub: "i = 4", tone: "sky", x: 464, y: 28, w: 96, h: 58 },
          ],
          edges: [],
          caption:
            "Năm ô nằm liền nhau. Chỉ số bắt đầu từ 0; chỉ số của ô cuối trong mảng có n phần tử là n − 1, không phải n.",
        },
        {
          type: "p",
          text: "Hầu hết ngôn ngữ lập trình đánh chỉ số từ 0. Với mảng có độ dài n, các chỉ số hợp lệ là từ 0 đến n − 1. Truy cập a[n] là vượt chỉ số: C/C++ có hành vi không xác định, Java ném ngoại lệ, JavaScript trả về undefined, còn Python ném IndexError.",
        },
        { type: "h2", text: "Vì sao truy cập là O(1)" },
        {
          type: "p",
          text: "CPU không xử lý khái niệm 'mảng'; nó chỉ làm việc với địa chỉ và phép tính. Địa chỉ của a[i] được tính bằng base + i × kích thước một phần tử — gồm một phép nhân và một phép cộng trước khi đọc dữ liệu. Số phép tính không phụ thuộc vào i hay n, tạo nên lợi thế lớn của mảng so với danh sách liên kết.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "địa chỉ a[i] = base + i × sizeof(phần tử)\n\nbase = 1000, mỗi int 4 byte\n  a[0] → 1000\n  a[3] → 1000 + 3 × 4 = 1012",
            },
          ],
        },
        {
          type: "p",
          text: "Công thức này áp dụng khi các phần tử có cùng kích thước. Vì vậy, mảng thô không thể chứa các kiểu phần tử có kích thước khác nhau. Mảng object trong Java hoặc JavaScript thực chất lưu các tham chiếu (con trỏ) có cùng kích thước; các object nằm riêng ở nơi khác trên heap.",
        },
        { type: "h2", text: "Mảng cố định và mảng động" },
        {
          type: "p",
          text: "Mảng thô trong C và mảng trong Java có kích thước cố định sau khi cấp phát. Khi hết chỗ, không thể mở rộng trực tiếp mà phải tạo mảng lớn hơn rồi sao chép toàn bộ phần tử, tốn O(n). JavaScript Array, Python list, Java ArrayList và C++ vector là các mảng động: chúng tự mở rộng khi cần thêm phần tử.",
        },
        {
          type: "p",
          text: "Mảng động theo dõi hai giá trị: size là số phần tử đang dùng, còn capacity là số ô đã cấp phát. Chẳng hạn, mảng có 5 phần tử có thể dùng buffer gồm 8 ô; nhờ vậy, một vài lần append tiếp theo không cần cấp phát lại.",
        },
        {
          type: "diagram",
          nodes: [
            { id: "s0", label: "1", sub: "dùng", tone: "sky", x: 16, y: 28, w: 80, h: 58 },
            { id: "s1", label: "3", sub: "dùng", tone: "sky", x: 108, y: 28, w: 80, h: 58 },
            { id: "s2", label: "5", sub: "dùng", tone: "sky", x: 200, y: 28, w: 80, h: 58 },
            { id: "s3", label: "7", sub: "dùng", tone: "sky", x: 292, y: 28, w: 80, h: 58 },
            { id: "s4", label: "9", sub: "dùng", tone: "sky", x: 384, y: 28, w: 80, h: 58 },
            { id: "s5", label: "·", sub: "trống", tone: "zinc", x: 476, y: 28, w: 80, h: 58 },
            { id: "s6", label: "·", sub: "trống", tone: "zinc", x: 568, y: 28, w: 80, h: 58 },
            { id: "s7", label: "·", sub: "trống", tone: "zinc", x: 660, y: 28, w: 80, h: 58 },
          ],
          edges: [],
          caption:
            "size = 5, capacity = 8. Ba ô trống là chỗ dự trữ, chưa phải phần tử của mảng.",
        },
        {
          type: "p",
          text: "Khi size đạt capacity, buffer thường được nhân đôi rồi toàn bộ phần tử được sao chép sang vùng nhớ mới. Mỗi lần sao chép tốn O(n), nhưng các lần mở rộng ngày càng cách xa nhau.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "function append(a, value):\n  if size(a) == capacity(a):\n    bigger = new array(capacity(a) * 2)\n    copy a into bigger\n    a = bigger\n  a[size(a)] = value\n  size = size + 1",
            },
          ],
        },
        {
          type: "p",
          text: "Vì sao nên nhân đôi thay vì mỗi lần chỉ tăng capacity thêm một lượng cố định? Khi nhân đôi, tổng số phần tử phải sao chép qua mọi lần mở rộng không vượt quá 2n. Phân bổ chi phí đó cho n lần append, ta được chi phí O(1) amortized (trung bình qua nhiều lần thêm). Nếu mỗi lần chỉ thêm k ô, tổng số phần tử phải sao chép tăng theo bậc n², nên chi phí trung bình mỗi lần append là O(n).",
        },
        { type: "h2", text: "Các thao tác thường gặp" },
        { type: "h3", text: "Truy cập theo chỉ số — O(1)" },
        {
          type: "p",
          text: "Đọc hoặc ghi a[i] là một phép tính địa chỉ. Mảng 10 phần tử hay 10 triệu phần tử cũng cùng một chi phí.",
        },
        { type: "h3", text: "Duyệt — O(n)" },
        {
          type: "p",
          text: "Duyệt nghĩa là lần lượt xử lý từng ô, chẳng hạn in giá trị, tính tổng hoặc tìm giá trị lớn nhất. Mỗi phần tử được thăm một lần nên độ phức tạp là O(n).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function sum(nums) {\n  let total = 0;\n  for (let i = 0; i < nums.length; i++) {\n    total += nums[i];\n  }\n  return total;\n}",
            },
            {
              lang: "python",
              code: "def total(nums):\n    s = 0\n    for x in nums:\n        s += x\n    return s",
            },
          ],
        },
        { type: "h3", text: "Chèn — phụ thuộc vị trí" },
        {
          type: "p",
          text: "Khi còn capacity, chèn vào cuối chỉ cần ghi vào ô kế tiếp và tăng size, nên tốn O(1). Vì đôi khi phải mở rộng mảng, append có chi phí O(1) amortized (trung bình qua nhiều lần thêm). Chèn ở đầu hoặc giữa buộc phải dịch các phần tử phía sau sang phải. Với mảng 1.000 phần tử, chèn ở đầu cần dịch 1.000 phần tử, nên tốn O(n). list.insert và ArrayList.add(index, x) cũng có chi phí tương tự: thư viện thực hiện vòng lặp thay bạn, nhưng độ phức tạp không đổi.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function insertAt(a, index, value) {\n  a.push(0); // ô trống ở cuối để dịch vào\n  for (let i = a.length - 1; i > index; i--) {\n    a[i] = a[i - 1];\n  }\n  a[index] = value;\n}",
            },
            {
              lang: "python",
              code: "def insert_at(a, index, value):\n    a.append(0)  # ô trống ở cuối để dịch vào\n    i = len(a) - 1\n    while i > index:\n        a[i] = a[i - 1]\n        i -= 1\n    a[index] = value",
            },
          ],
        },
        { type: "h3", text: "Xóa — cũng phụ thuộc vị trí" },
        {
          type: "p",
          text: "Xóa phần tử cuối chỉ cần giảm size, không phải dịch phần tử nào nên tốn O(1). Xóa ở đầu hoặc giữa phải dịch các phần tử phía sau sang trái để lấp chỗ trống. Xóa phần tử đầu của mảng 1.000 phần tử cần dịch 999 phần tử, nên tốn O(n).",
        },
        { type: "h3", text: "Tìm kiếm" },
        {
          type: "ul",
          items: [
            "Mảng chưa sắp xếp: tìm kiếm tuyến tính bằng cách quét lần lượt, tốn O(n). Trong trường hợp xấu, không thể làm tốt hơn nếu không có cấu trúc dữ liệu phụ.",
            "Mảng đã sắp xếp: binary search (tìm kiếm nhị phân) chia đôi phạm vi tìm kiếm ở mỗi bước, tốn O(log n). Xem chi tiết trong bài Binary Search.",
          ],
        },
        { type: "h2", text: "Bốn mẫu hay gặp khi phỏng vấn" },
        {
          type: "p",
          text: "Bài toán về mảng hiếm khi chỉ yêu cầu in từng phần tử; thường chúng dựa trên một số mẫu thuật toán quen thuộc. Mỗi mẫu sẽ có bài riêng, còn ở đây bạn chỉ cần nhận biết khi nào nên dùng chúng.",
        },
        {
          type: "ul",
          items: [
            "Two pointers (hai con trỏ): hai chỉ số cùng di chuyển trên mảng, thường là mảng đã sắp xếp. Với Two Sum, cách này giảm thời gian từ O(n²) khi thử mọi cặp xuống O(n), với O(1) bộ nhớ phụ.",
            "Sliding window (cửa sổ trượt): một cửa sổ biểu diễn đoạn con và trượt sang phải; ta cập nhật kết quả trong O(1) mỗi bước thay vì tính lại. Với các đoạn dài k, tổng thời gian giảm từ O(n·k) xuống O(n).",
            "Prefix sum (mảng cộng dồn): tiền xử lý trong O(n) để tính tổng đoạn [L, R] bằng một phép trừ O(1). Bài tiếp theo sẽ giải thích kỹ hơn mẫu này.",
            "Bảng DP (quy hoạch động): mỗi ô lưu lời giải cho một bài toán con. Các bài Climbing Stairs, House Robber và Knapsack đều điền mảng theo thứ tự phụ thuộc giữa các bài toán con.",
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Truy cập / ghi theo chỉ số: O(1).",
            "Duyệt: O(n).",
            "Tìm kiếm: O(n) nếu mảng chưa sắp xếp; O(log n) nếu mảng đã sắp xếp và dùng binary search.",
            "Chèn hoặc xóa ở cuối: O(1). Append có chi phí O(1) amortized (trung bình qua nhiều lần thêm) khi đôi lúc phải mở rộng mảng.",
            "Chèn hoặc xóa ở đầu hay giữa: O(n) vì phải dịch các phần tử.",
            "Bộ nhớ: O(n), bao gồm cả capacity chưa dùng.",
          ],
        },
      ],
    },
    {
      slug: "string-basics",
      title: "Chuỗi và ký tự",
      module: "Arrays & Strings",
      summary:
        "Chuỗi là dãy ký tự bất biến: tìm hiểu Unicode, đảo ngược, palindrome và chi phí ghép chuỗi.",
      duration: "7 phút",
      blocks: [
        {
          type: "p",
          text: "Về bản chất, chuỗi (string) là một dãy ký tự. Trong JavaScript và Python, string là bất biến (immutable): mọi thao tác có vẻ như 'sửa' chuỗi thực ra đều tạo ra chuỗi mới.",
        },
        { type: "h2", text: "Unicode và code point" },
        {
          type: "p",
          text: "Unicode gán cho mỗi code point (điểm mã) một giá trị số; ASCII là một tập ký tự nhỏ nằm trong Unicode. JavaScript có charCodeAt để đọc đơn vị mã UTF-16 và codePointAt để đọc code point; Python dùng ord() để lấy code point. Với bảng chữ cái giới hạn, chẳng hạn chữ cái tiếng Anh, ta có thể dùng mảng đếm 26 hoặc 128 phần tử thay cho hash map — thường nhanh hơn và tốn ít bộ nhớ hơn.",
        },
        { type: "h2", text: "Đảo ngược & palindrome" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function isPalindrome(s) {\n  // Hai con trỏ: l từ đầu, r từ cuối\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    // So sánh cặp ký tự đối xứng qua tâm\n    if (s[l] !== s[r]) return false;\n    l++;\n    r--;\n  }\n  // Đã gặp nhau ở giữa mà không lệch → là palindrome\n  return true;\n}",
            },
            {
              lang: "python",
              code: "def is_palindrome(s):\n    # Hai con trỏ: l từ đầu, r từ cuối\n    l, r = 0, len(s) - 1\n    while l < r:\n        # So sánh cặp ký tự đối xứng qua tâm\n        if s[l] != s[r]:\n            return False\n        l += 1\n        r -= 1\n    # Đã gặp nhau ở giữa mà không lệch -> là palindrome\n    return True",
            },
          ],
        },
        {
          type: "p",
          text: "Dùng hai con trỏ bắt đầu ở hai đầu rồi tiến vào giữa giúp kiểm tra palindrome với O(1) bộ nhớ phụ, thay vì tạo chuỗi đảo ngược cần O(n) bộ nhớ.",
        },
        { type: "h2", text: "Chi phí ghép chuỗi" },
        {
          type: "ul",
          items: [
            "Dùng phép + để ghép trong vòng lặp sẽ tạo chuỗi mới ở mỗi bước; tổng chi phí có thể là O(n²).",
            "Cách phù hợp hơn là gom các phần vào một mảng rồi nối một lần — dùng array.join('') trong JS hoặc ''.join(parts) trong Python — để đạt O(n).",
          ],
        },
      ],
    },
    {
      slug: "prefix-sum",
      title: "Prefix Sum",
      module: "Arrays & Strings",
      summary:
        "Tiền xử lý mảng để trả lời truy vấn tổng đoạn con trong O(1) — dùng thêm O(n) bộ nhớ để tăng tốc.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "Prefix sum (mảng cộng dồn) là kỹ thuật tiền xử lý: tính trước tổng của mọi tiền tố để trả lời truy vấn 'tổng từ l đến r' trong O(1), thay vì cộng lại từng phần tử trong đoạn.",
        },
        { type: "h2", text: "Xây dựng mảng cộng dồn" },
        {
          type: "p",
          text: "Quy ước prefix[i] là tổng của i phần tử đầu tiên, nên prefix[0] = 0. Khi đó, tổng trên đoạn đóng [l, r] (bao gồm cả hai đầu mút) bằng prefix[r + 1] - prefix[l].",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function buildPrefix(nums) {\n  const prefix = new Array(nums.length + 1).fill(0);\n  for (let i = 0; i < nums.length; i++) {\n    prefix[i + 1] = prefix[i] + nums[i];\n  }\n  return prefix;\n}\n\nfunction rangeSum(prefix, l, r) {\n  return prefix[r + 1] - prefix[l];\n}",
            },
            {
              lang: "python",
              code: "def build_prefix(nums):\n    prefix = [0] * (len(nums) + 1)\n    for i, x in enumerate(nums):\n        prefix[i + 1] = prefix[i] + x\n    return prefix\n\ndef range_sum(prefix, l, r):\n    return prefix[r + 1] - prefix[l]",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Tiền xử lý: O(n) thời gian, O(n) bộ nhớ.",
            "Mỗi truy vấn tổng đoạn: O(1).",
            "Mở rộng: prefix sum 2 chiều dùng cho ma trận; difference array (mảng hiệu) dùng cho các cập nhật trên đoạn liên tiếp.",
          ],
        },
      ],
    },
    {
      slug: "arrays-strings-quiz",
      title: "Quiz: Arrays & Strings",
      module: "Arrays & Strings",
      icon: "quiz",
      summary:
        "Kiểm tra kiến thức về độ phức tạp của mảng, tính bất biến của chuỗi và prefix sum.",
      duration: "6 phút",
      blocks: [
        {
          type: "p",
          text: "Trả lời 10 câu dưới đây để kiểm tra mức độ hiểu của bạn về chỉ số, size/capacity, chi phí các thao tác, chuỗi và prefix sum.",
        },
      ],
      quiz: {
        title: "Quiz: Arrays & Strings",
        description:
          "10 câu hỏi về mảng, chuỗi và prefix sum. Mỗi câu đều có lời giải thích sau khi bạn trả lời.",
        questions: [
          {
            id: "as1",
            tag: "Array",
            prompt: "Truy cập phần tử theo chỉ số a[i] tốn bao nhiêu thời gian?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Địa chỉ được tính trực tiếp từ chỉ số nên truy cập không phụ thuộc n.",
          },
          {
            id: "as2",
            tag: "Array",
            prompt: "Chèn một phần tử vào ĐẦU mảng n phần tử tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Phải dịch toàn bộ n phần tử sang phải một vị trí để nhường chỗ → O(n).",
          },
          {
            id: "as7",
            tag: "Array",
            prompt: "Mảng có 5 phần tử. Chỉ số hợp lệ là khoảng nào?",
            options: ["1 đến 5", "0 đến 4", "0 đến 5", "1 đến 4"],
            answer: 1,
            explanation:
              "Chỉ số bắt đầu từ 0, ô cuối là n − 1. Mảng 5 phần tử dùng 0, 1, 2, 3, 4.",
          },
          {
            id: "as8",
            tag: "Dynamic array",
            prompt: "Trong mảng động, size và capacity khác nhau thế nào?",
            options: [
              "size là số ô đã cấp phát, capacity là số phần tử đang dùng",
              "size là số phần tử đang dùng, capacity là số ô đã cấp phát",
              "Hai từ cùng nghĩa, chỉ khác tên ngôn ngữ",
              "capacity luôn đúng bằng size × 2",
            ],
            answer: 1,
            explanation:
            "size đếm số phần tử đang dùng. capacity là kích thước buffer đã cấp phát, bao gồm cả những ô còn trống.",
          },
          {
            id: "as9",
            tag: "Array",
            prompt:
              "Tìm một giá trị trong mảng chưa sắp xếp, trường hợp xấu tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 2,
            explanation:
              "Không có thứ tự thì phải quét lần lượt. Binary search O(log n) chỉ dùng được khi mảng đã sắp.",
          },
          {
            id: "as10",
            tag: "Dynamic array",
            prompt:
              "Nếu mỗi lần hết chỗ chỉ cấp thêm 10 ô thay vì nhân đôi, append trung bình trở thành gì?",
            options: [
              "Vẫn O(1) amortized",
              "O(log n)",
              "O(n)",
              "O(1) chặt, không còn lần copy",
            ],
            answer: 2,
            explanation:
              "Cộng thêm một lượng cố định khiến tổng lần copy lên bậc n². Chia cho n lần append còn O(n). Nhân đôi mới giữ được O(1) amortized.",
          },
          {
            id: "as3",
            tag: "Dynamic array",
            prompt: "Vì sao append vào mảng động thường được coi là O(1) amortized?",
            options: [
              "Vì mảng tự động bỏ qua phần tử trùng",
              "Vì mỗi lần cấp phát gấp đôi, chi phí copy chia đều cho nhiều lần append",
              "Vì append luôn ghi vào cuối mà không bao giờ copy",
              "Vì mảng động dùng hash table bên trong",
            ],
            answer: 1,
            explanation:
              "Lần cấp phát tốn O(n) nhưng xảy ra thưa dần; chi phí trung bình trên mỗi append là hằng số.",
          },
          {
            id: "as4",
            tag: "String",
            prompt:
              "String trong JavaScript/Python là bất biến. Hệ quả nào sau đây đúng?",
            options: [
              "Có thể sửa tại chỗ đúng vị trí với chi phí O(1)",
              "Mỗi lần 'sửa' tạo chuỗi mới; ghép trong vòng lặp có thể tốn O(n²)",
              "Đảo ngược chuỗi luôn tốn O(1) bộ nhớ",
              "Truy cập ký tự s[i] tốn O(n)",
            ],
            answer: 1,
            explanation:
              "Vì bất biến, thao tác tạo chuỗi mới; ghép lặp lại dẫn tới tổng chi phí bậc hai nếu không gom bằng mảng.",
          },
          {
            id: "as5",
            tag: "String",
            prompt:
              "Cách kiểm tra palindrome với bộ nhớ O(1) là gì?",
            options: [
              "Tạo chuỗi đảo ngược rồi so sánh",
              "Dùng hai con trỏ từ hai đầu tiến vào giữa",
              "Đưa chuỗi vào một hash set",
              "Cắt đôi chuỗi rồi so sánh hai nửa",
            ],
            answer: 1,
            explanation:
              "Hai con trỏ so sánh từng cặp đối xứng, chỉ cần vài biến đếm nên bộ nhớ hằng số.",
          },
          {
            id: "as6",
            tag: "Prefix Sum",
            prompt:
              "Sau khi tiền xử lý prefix sum O(n), truy vấn tổng đoạn [l, r] tốn bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation:
              "Tổng đoạn bằng hiệu hai giá trị prefix nên là một phép trừ O(1).",
          },
        ],
      },
    },
  ],
};
