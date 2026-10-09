import type { CourseModule } from "@/lib/course-types";

export const bigOModule: CourseModule = {
  id: "big-o",
  title: "Độ phức tạp (Big O)",
  lessons: [
    {
      slug: "big-o-introduction",
      title: "Làm quen với Big O",
      module: "Độ phức tạp (Big O)",
      summary:
        "Big O giúp bạn hình dung lượng công việc tăng ra sao khi dữ liệu đầu vào lớn lên.",
      duration: "8 phút",
      visualizer: "big-o-growth",
      blocks: [
        {
          type: "p",
          text: "Big O giúp ước lượng lượng công việc thuật toán cần làm khi dữ liệu đầu vào lớn dần. Một đoạn mã chạy nhanh với 10 phần tử vẫn có thể rất chậm khi phải xử lý cả triệu phần tử.",
        },
        {
          type: "p",
          text: "Hiểu Big O giúp bạn nhận ra khi nào một cách giải không còn phù hợp với dữ liệu lớn và so sánh các cách giải trước khi chọn. Đây cũng là kiến thức thường được hỏi trong phỏng vấn lập trình.",
        },
        { type: "h2", text: "Big O cho biết điều gì?" },
        {
          type: "p",
          text: "Big O mô tả cận trên của tốc độ tăng lượng công việc theo kích thước đầu vào n. Nó không dự đoán chính xác chương trình chạy bao nhiêu giây; nó giúp bạn hình dung số phép tính tăng như thế nào khi n lớn dần. Trong các ví dụ, n thường là số phần tử hoặc độ dài dữ liệu đầu vào.",
        },
        {
          type: "p",
          text: "Ví dụ, khi số phần tử tăng gấp đôi, lượng việc có thể tăng gấp đôi, gấp bốn hoặc gần như không đổi — tùy cách thuật toán hoạt động. Big O giúp so sánh xu hướng đó mà không cần chạy chương trình trên từng máy.",
        },
        {
          type: "p",
          text: "Với cùng một thuật toán, máy tính nhanh hơn có thể giảm thời gian chạy thực tế nhưng không đổi xu hướng tăng trưởng. Khi so sánh chương trình, vẫn cần lưu ý cách cài đặt và chi phí của các hàm có sẵn trong từng ngôn ngữ.",
        },
        { type: "h2", text: "Vì sao cần biết Big O?" },
        {
          type: "ul",
          items: [
            "Ước lượng cách lời giải hoạt động khi dữ liệu tăng lên.",
            "So sánh hai cách giải mà không cần phụ thuộc vào máy tính đang dùng.",
            "Nhận ra lúc nào một lời giải có thể trở nên quá chậm hoặc tốn quá nhiều bộ nhớ.",
            "Giải thích được chi phí thời gian và bộ nhớ trong bài tập hoặc phỏng vấn.",
          ],
        },
        { type: "h2", text: "O, Ω và Θ: ba cách mô tả mức tăng" },
        {
          type: "p",
          text: "Ba ký hiệu này mô tả cận tăng trưởng của lượng công việc. Chúng có thể dùng để phân tích trường hợp tốt nhất, xấu nhất hoặc trung bình — bản thân ký hiệu không quyết định ta đang xét trường hợp nào.",
        },
        {
          type: "ul",
          items: [
            "O (Big O) — cận trên: lượng công việc tăng không nhanh hơn mức được mô tả, khi dữ liệu đủ lớn.",
            "Ω (Big Omega) — cận dưới: lượng công việc tăng ít nhất theo mức được mô tả.",
            "Θ (Big Theta) — cận chặt: lượng công việc tăng cùng bậc với mức được mô tả; đây vừa là cận trên, vừa là cận dưới.",
          ],
        },
        {
          type: "p",
          text: "Trong giao tiếp hằng ngày, nhiều người dùng “Big O” để nói về độ phức tạp trường hợp xấu nhất. Hãy nhớ rằng đây là cách dùng phổ biến; về mặt chính xác, Big O là cận trên, còn “xấu nhất” là loại đầu vào ta đang phân tích.",
        },
        { type: "h2", text: "Đếm lượng việc, không đếm số giây" },
        {
          type: "p",
          text: "Thời gian chạy thực tế phụ thuộc vào máy, ngôn ngữ và dữ liệu cụ thể. Khi phân tích Big O, ta tập trung vào số thao tác cơ bản như so sánh, gán giá trị hoặc đọc phần tử, rồi xem số thao tác đó tăng thế nào theo n.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "count = 0\nfor x in array:        // lặp n lần\n  count = count + 1    // mỗi lần làm lượng việc cố định\n\n// tổng: n lần việc cố định = O(n)",
            },
          ],
        },
        {
          type: "p",
          text: "Ở bài về cách tính Big O, bạn sẽ học cách phân tích từng đoạn mã, cộng hoặc nhân lượng việc phù hợp rồi rút gọn kết quả.",
        },
        {
          type: "p",
          text: "Dùng mô phỏng bên dưới để so sánh các mức tăng khi n thay đổi. Trục dọc dùng thang logarit: đi lên một đơn vị tương ứng với lượng việc tăng gấp 10; ở vùng giá trị lớn, các vạch có thể cách nhau nhiều đơn vị. Đường càng dốc thì lượng việc càng tăng nhanh.",
        },
      ],
    },
    {
      slug: "big-o-time-complexities",
      title: "Các mức độ phức tạp thời gian thường gặp",
      module: "Độ phức tạp (Big O)",
      summary:
        "Tìm hiểu bảy mức từ O(1) đến O(n!), qua ví dụ mã nguồn và mô phỏng trực quan.",
      duration: "18 phút",
      visualizer: "big-o-growth",
      blocks: [
        {
          type: "p",
          text: "Dưới đây là bảy mức độ phức tạp bạn sẽ thường gặp, xếp theo tốc độ tăng từ chậm đến nhanh. Hãy để ý lượng việc thay đổi thế nào khi số phần tử n lớn dần.",
        },
        { type: "h3", text: "O(1) — Hằng số" },
        {
          type: "p",
          text: "O(1) nghĩa là số thao tác không tăng theo số phần tử n. Ví dụ, lấy một phần tử trong mảng bằng chỉ số a[i] cần lượng việc gần như không đổi, dù mảng có 10 hay 10 triệu phần tử.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "const a = [10, 20, 30, 40];\n\nconst x = a[3];     // O(1)\nconst first = a[0]; // O(1)",
            },
          ],
        },
        { type: "h3", text: "O(log n) — Logarit" },
        {
          type: "p",
          text: "Mỗi bước loại bỏ một phần dữ liệu theo cùng tỉ lệ — thường là một nửa. Vì vậy, dù dữ liệu tăng lên rất nhiều, số bước chỉ tăng thêm một ít. Tìm kiếm nhị phân (binary search) là ví dụ quen thuộc.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function binarySearch(a, target) {\n  let lo = 0, hi = a.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (a[mid] === target) return mid;\n    if (a[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}",
            },
          ],
        },
        {
          type: "p",
          text: "Mỗi bước bỏ đi một nửa số phần tử còn cần xét. Chẳng hạn, 8 phần tử cần tối đa 3 bước; 1.000 phần tử cần khoảng 10 bước; 1 triệu cần khoảng 20 bước; 1 tỉ cần khoảng 30 bước.",
        },
        { type: "h3", text: "O(n) — Tuyến tính" },
        {
          type: "p",
          text: "Số thao tác tăng theo số phần tử. Nếu số phần tử tăng gấp đôi, lượng việc cũng tăng xấp xỉ gấp đôi. Tìm giá trị lớn nhất trong mảng là một ví dụ.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function findMax(a) {\n  let max = a[0];\n  for (let i = 1; i < a.length; i++) {\n    if (a[i] > max) max = a[i];\n  }\n  return max;\n}",
            },
          ],
        },
        {
          type: "p",
          text: "Thuật toán duyệt qua từng phần tử một lần, và làm lượng việc cố định cho mỗi phần tử, thường có độ phức tạp O(n).",
        },
        { type: "h3", text: "O(n log n) — Tuyến tính nhân logarit" },
        {
          type: "p",
          text: "Mức này thường xuất hiện khi thuật toán chia dữ liệu thành nhiều phần qua khoảng log n lượt, đồng thời xử lý tổng cộng khoảng n phần tử ở mỗi lượt. Sắp xếp trộn (merge sort) là ví dụ điển hình.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function mergeSort(a) {\n  if (a.length <= 1) return a;\n  const mid = Math.floor(a.length / 2);\n  const left = mergeSort(a.slice(0, mid));\n  const right = mergeSort(a.slice(mid));\n  return merge(left, right);\n}",
            },
          ],
        },
        {
          type: "p",
          text: "O(n log n) tăng nhanh hơn O(n), nhưng thường vẫn xử lý tốt dữ liệu lớn. Nhiều thuật toán sắp xếp hiệu quả có mức tăng trưởng này.",
        },
        { type: "h3", text: "O(n²) — Bậc hai" },
        {
          type: "p",
          text: "Số thao tác tăng gần bằng n × n. Mức này thường gặp khi với mỗi phần tử, ta lại duyệt qua nhiều phần tử khác — chẳng hạn hai vòng lặp lồng nhau cùng chạy theo n.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function pairSum(a) {\n  let sum = 0;\n  for (let i = 0; i < a.length; i++) {\n    for (let j = i + 1; j < a.length; j++) {\n      sum += a[i] * a[j];\n    }\n  }\n  return sum;\n}",
            },
          ],
        },
        {
          type: "p",
          text: "Sắp xếp nổi bọt (bubble sort), sắp xếp chọn (selection sort) và sắp xếp chèn (insertion sort) có thể cần O(n²) thao tác trong trường hợp xấu nhất. Với n = 1.000, con số này vào khoảng 1 triệu; với n = 10.000, khoảng 100 triệu. Vì vậy, khi dữ liệu lớn, ta thường tìm cách dùng lời giải tăng chậm hơn nếu có thể.",
        },
        { type: "h3", text: "O(2ⁿ) — Hàm mũ" },
        {
          type: "p",
          text: "Mức O(2ⁿ) thường xuất hiện khi mỗi phần tử tạo ra hai lựa chọn, chẳng hạn chọn hoặc không chọn phần tử đó. Với n phần tử có 2ⁿ tập con; thử lần lượt mọi tập con có thể vì thế cần lượng việc theo hàm mũ.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "n = 20  → ~1.000.000 tập con\nn = 30  → ~1.000.000.000 tập con\nn = 40  → ~1.000.000.000.000 tập con",
            },
          ],
        },
        {
          type: "p",
          text: "O(2ⁿ) tăng rất nhanh nên thường chỉ phù hợp với dữ liệu nhỏ. Với một số bài toán, lưu lại kết quả đã tính hoặc dùng quy hoạch động giúp tránh tính lặp; tuy nhiên, không phải bài toán nào cũng giảm được từ hàm mũ xuống đa thức.",
        },
        { type: "h3", text: "O(n!) — Giai thừa" },
        {
          type: "p",
          text: "Có n! cách sắp xếp n phần tử. Số cách này tăng cực nhanh: chỉ với 15 phần tử đã có hơn 1.000 tỉ hoán vị. Nếu cần tạo và ghi đủ từng hoán vị, còn phải xử lý n phần tử cho mỗi kết quả.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "3!  = 6\n5!  = 120\n10! = 3.628.800\n15! > 1.000.000.000.000",
            },
          ],
        },
        {
          type: "p",
          text: "Thử mọi cách sắp xếp thường chỉ khả thi với n rất nhỏ. Nếu bài toán cho phép, ta có thể tìm cách giảm số trường hợp cần xét bằng quy hoạch động, nhánh cận hoặc các phương pháp gần đúng.",
        },
        { type: "h2", text: "Bảng ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "O(1) — Truy cập mảng theo chỉ số",
            "O(log n) — Tìm kiếm nhị phân trên mảng đã sắp xếp",
            "O(n) — Duyệt mảng một lần",
            "O(n log n) — Sắp xếp trộn, sắp xếp vun đống",
            "O(n²) — So sánh nhiều cặp phần tử, một số cách sắp xếp cơ bản",
            "O(2ⁿ) — Xét mọi tập con của n phần tử",
            "O(n!) — Số cách sắp xếp n phần tử; ghi đủ từng cách có thể tốn O(n·n!)",
          ],
        },
        { type: "h2", text: "Cách đọc đồ thị tăng trưởng" },
        {
          type: "p",
          text: "Trong mô phỏng bên dưới, bật hoặc tắt từng đường để so sánh, rồi kéo thanh n để xem lượng việc ước tính. Trục dọc dùng thang logarit nên các mức tăng nhanh như O(2ⁿ) và O(n!) sẽ vọt lên rõ rệt khi n tăng.",
        },
      ],
    },
    {
      slug: "big-o-space-complexity",
      title: "Độ phức tạp bộ nhớ",
      module: "Độ phức tạp (Big O)",
      summary:
        "Tìm hiểu thuật toán cần thêm bao nhiêu bộ nhớ, kể cả phần ngăn xếp dùng cho đệ quy.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Big O không chỉ dùng để phân tích thời gian chạy mà còn dùng để phân tích bộ nhớ. Bài này tập trung vào bộ nhớ phụ — phần bộ nhớ thuật toán cần thêm ngoài dữ liệu đầu vào.",
        },
        {
          type: "p",
          text: "Ví dụ, nếu đầu vào đã là một mảng, ta không tính chính mảng đó vào bộ nhớ phụ. Nhưng nếu thuật toán tạo thêm một mảng mới để làm việc, phần mảng mới đó cần được tính.",
        },
        {
          type: "ul",
          items: [
            "Dữ liệu tạm như mảng, bảng băm, ngăn xếp hoặc hàng đợi.",
            "Các lời gọi hàm còn đang chờ trong ngăn xếp khi dùng đệ quy.",
            "Bộ đệm hoặc vùng nhớ trung gian trong lúc tính toán.",
          ],
        },
        {
          type: "p",
          text: "Một thuật toán có thể chạy nhanh nhưng vẫn dùng quá nhiều bộ nhớ. Sau đây là một số mức thường gặp.",
        },
        { type: "h2", text: "O(1) — Bộ nhớ không đổi theo n" },
        {
          type: "p",
          text: "Khi tìm giá trị lớn nhất trong mảng, ta chỉ cần thêm một biến để lưu kết quả hiện tại. Dù mảng có bao nhiêu phần tử, số biến cần thêm vẫn không đổi.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function findMax(a) {\n  let max = a[0];          // thêm một biến\n  for (let i = 1; i < a.length; i++) {\n    if (a[i] > max) max = a[i];\n  }\n  return max;\n}\n// Bộ nhớ phụ: O(1)",
            },
          ],
        },
        { type: "h2", text: "O(n) — Bộ nhớ tăng theo n" },
        {
          type: "p",
          text: "Nếu tạo một mảng mới để lưu các số chẵn, số ô nhớ cần thêm tăng theo số phần tử đầu vào. Dù mảng mới chỉ chứa khoảng một nửa số phần tử, mức tăng vẫn là O(n).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function collectEvens(a) {\n  const evens = [];        // tỉ lệ với n\n  for (const x of a) {\n    if (x % 2 === 0) evens.push(x);\n  }\n  return evens;\n}\n// Bộ nhớ phụ: O(n)",
            },
          ],
        },
        { type: "h2", text: "O(n²) — Bộ nhớ tăng theo n bình phương" },
        {
          type: "p",
          text: "Một ma trận có n hàng và n cột cần n × n ô nhớ, nên dùng O(n²) bộ nhớ. Ma trận kề của đồ thị và một số bảng quy hoạch động là những ví dụ thường gặp.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "// Ma trận kề n × n\nconst adj = Array.from(\n  { length: n },\n  () => new Array(n).fill(0)\n);\n// Bộ nhớ phụ: O(n²)",
            },
          ],
        },
        { type: "h2", text: "Bộ nhớ dùng cho đệ quy" },
        {
          type: "p",
          text: "Mỗi lần hàm tự gọi lại chính nó, chương trình cần ghi nhớ lời gọi đó trong ngăn xếp lời gọi (call stack). Các lời gọi đang chờ càng sâu thì bộ nhớ dùng cho ngăn xếp càng nhiều.",
        },
        {
          type: "p",
          text: "Ví dụ, cách tính Fibonacci đệ quy đơn giản tạo ra rất nhiều lời gọi nên tốn O(2ⁿ) thời gian. Tuy vậy, các lời gọi không nằm trên ngăn xếp cùng lúc hết: độ sâu lớn nhất chỉ khoảng n, nên bộ nhớ ngăn xếp là O(n).",
        },
        {
          type: "p",
          text: "Khi duyệt cây bằng đệ quy, độ sâu ngăn xếp phụ thuộc vào chiều cao h của cây. Cây cân bằng thường có h = O(log n); cây bị lệch có thể cao đến O(n), nên ngăn xếp cũng có thể cần O(n) bộ nhớ.",
        },
        { type: "h2", text: "Ghi nhớ nhanh" },
        {
          type: "ul",
          items: [
            "O(1): chỉ cần thêm một số lượng biến cố định.",
            "O(log n): ngăn xếp của tìm kiếm nhị phân đệ quy trên dữ liệu được chia đôi.",
            "O(n): mảng phụ tăng theo đầu vào hoặc ngăn xếp đệ quy sâu tối đa n lời gọi.",
            "O(n²): ma trận hoặc bảng quy hoạch động có n hàng và n cột.",
          ],
        },
      ],
    },
    {
      slug: "big-o-rules",
      title: "Cách tính Big O từ mã nguồn",
      module: "Độ phức tạp (Big O)",
      summary:
        "Bốn quy tắc giúp phân tích vòng lặp, các bước tuần tự và rút gọn kết quả.",
      duration: "11 phút",
      blocks: [
        {
          type: "p",
          text: "Để ước lượng Big O, hãy chia chương trình thành từng phần, đếm lượng việc mỗi phần thực hiện rồi kết hợp kết quả. Bốn quy tắc dưới đây giúp bạn phân tích phần lớn đoạn mã cơ bản.",
        },
        { type: "h2", text: "Quy tắc 1: Cộng các bước chạy nối tiếp" },
        {
          type: "p",
          text: "Nếu chương trình làm xong phần này rồi mới thực hiện phần khác, hãy cộng lượng việc của từng phần. Nếu các phần phụ thuộc vào những kích thước dữ liệu khác nhau, giữ lại từng biến, chẳng hạn O(m + n²).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "// Phần A — O(m)\nfor (let i = 0; i < m; i++) {\n  doWork();\n}\n\n// Phần B — O(n²)\nfor (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    doWork();\n  }\n}\n// Tổng: O(m + n²)",
            },
          ],
        },
        { type: "h2", text: "Quy tắc 2: Nhân số lần lặp lồng nhau" },
        {
          type: "p",
          text: "Nếu vòng ngoài chạy n lần và mỗi lần vòng trong chạy m lần, phần bên trong được thực hiện n × m lần. Vì vậy, độ phức tạp là O(n·m).",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "for (let i = 0; i < n; i++) {      // n lần\n  for (let j = 0; j < m; j++) {    // m lần\n    doWork();                      // lượng việc cố định\n  }\n}\n// Tổng: O(n·m)",
            },
          ],
        },
        { type: "h2", text: "Quy tắc 3: Bỏ hệ số không đổi" },
        {
          type: "p",
          text: "Big O tập trung vào cách lượng việc tăng khi n lớn, không giữ lại hệ số nhân cố định. Vì vậy, n thao tác hay 5n thao tác đều được rút gọn thành O(n).",
        },
        {
          type: "ul",
          items: [
            "O(2n²) → O(n²)",
            "O(5n + 100) → O(n)",
            "O(n/3) → O(n)",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "for (const x of a) doWork();  // O(n)\nfor (const x of a) doWork();  // O(n)\n// 2 × O(n) = O(n)",
            },
          ],
        },
        { type: "h2", text: "Quy tắc 4: Giữ lại số hạng tăng nhanh nhất" },
        {
          type: "p",
          text: "Khi các số hạng cùng phụ thuộc vào n, giữ lại số hạng tăng nhanh nhất. Khi n rất lớn, các số hạng tăng chậm hơn ít ảnh hưởng đến xu hướng chung. Chẳng hạn, với n = 1.000.000 thì n² = 1.000.000.000.000, lớn hơn n rất nhiều.",
        },
        {
          type: "ul",
          items: [
            "O(n² + n) → O(n²)",
            "O(n³ + 10n) → O(n³)",
            "O(n³ + n² + n) → O(n³)",
          ],
        },
        { type: "h2", text: "Ví dụ: phân tích nhiều bước" },
        {
          type: "p",
          text: "Xét chương trình sắp xếp một mảng rồi duyệt qua mảng đó. Giả sử thao tác sắp xếp cần O(n log n) lượng việc:",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function process(a) {\n  a.sort((x, y) => x - y);  // giả sử O(n log n)\n  for (const x of a) {      // O(n)\n    console.log(x);\n  }\n}\n// O(n log n) + O(n) = O(n log n)",
            },
          ],
        },
        {
          type: "p",
          text: "Khi n lớn, n log n tăng nhanh hơn n. Vì vậy, tổng được rút gọn thành O(n log n). Chi phí thực tế của hàm sort còn tùy cách thư viện hoặc ngôn ngữ lập trình cài đặt.",
        },
        { type: "h2", text: "Những điểm dễ nhầm" },
        {
          type: "ul",
          items: [
            "Hai vòng lặp chạy nối tiếp, mỗi vòng n lần: O(n) + O(n) = O(n), không phải O(n²).",
            "Hai vòng lặp lồng nhau, mỗi vòng n lần: thường có O(n·n) = O(n²) thao tác.",
            "Các hàm có sẵn cũng tốn thời gian. Ví dụ, sao chép một mảng n phần tử thường cần O(n); chi phí sắp xếp phụ thuộc cách cài đặt.",
            "Nối chuỗi nhiều lần có thể tốn O(n²) nếu mỗi lần phải sao chép toàn bộ chuỗi đã tạo; chi phí cụ thể tùy ngôn ngữ và cách cài đặt.",
            "Với đệ quy, cần xét số lời gọi và lượng việc ở mỗi lời gọi; có thể dùng cây đệ quy hoặc định lý Master.",
          ],
        },
      ],
    },
    {
      slug: "big-o-best-worst-average",
      title: "Trường hợp tốt nhất, xấu nhất và trung bình",
      module: "Độ phức tạp (Big O)",
      summary:
        "Cùng một thuật toán có thể làm ít hoặc nhiều việc tùy vào dữ liệu đầu vào.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Cùng một thuật toán có thể làm lượng việc khác nhau với những dữ liệu đầu vào khác nhau. Ta thường phân tích trường hợp tốt nhất, xấu nhất và trung bình để hiểu rõ sự khác biệt đó.",
        },
        { type: "h2", text: "Ba cách xét dữ liệu đầu vào" },
        {
          type: "ul",
          items: [
            "Tốt nhất: dữ liệu khiến thuật toán làm ít việc nhất.",
            "Xấu nhất: dữ liệu khiến thuật toán làm nhiều việc nhất. Phân tích trường hợp này giúp ước lượng chi phí tối đa khi đầu vào bất lợi.",
            "Trung bình: lượng việc kỳ vọng trên một phân bố dữ liệu cụ thể. Muốn tính trường hợp này, ta cần nói rõ giả định về dữ liệu.",
          ],
        },
        {
          type: "p",
          text: "Đừng nhầm ba trường hợp này với O, Ω và Θ. O là cận trên, Ω là cận dưới, còn Θ là cận chặt; cả ba ký hiệu đều có thể dùng khi phân tích từng trường hợp.",
        },
        { type: "h2", text: "Ví dụ: tìm kiếm tuần tự" },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function linearSearch(a, target) {\n  for (let i = 0; i < a.length; i++) {\n    if (a[i] === target) return i;\n  }\n  return -1;\n}",
            },
          ],
        },
        {
          type: "ul",
          items: [
            "Tốt nhất: phần tử cần tìm nằm ở đầu mảng, chỉ cần một lần so sánh → O(1).",
            "Xấu nhất: phần tử nằm ở cuối hoặc không có trong mảng, phải kiểm tra đến n phần tử → O(n).",
            "Trung bình: nếu phần tử có khả năng nằm đều ở mọi vị trí, ta kiểm tra khoảng n/2 phần tử; mức tăng vẫn là O(n).",
          ],
        },
        { type: "h2", text: "Ví dụ: sắp xếp chèn" },
        {
          type: "ul",
          items: [
            "Tốt nhất: mảng đã được sắp xếp, chỉ cần duyệt qua các phần tử → O(n).",
            "Xấu nhất: mảng xếp theo thứ tự ngược, mỗi phần tử phải dịch qua nhiều phần tử khác → O(n²).",
            "Trung bình: O(n²).",
          ],
        },
        { type: "h2", text: "Ví dụ: sắp xếp nhanh" },
        {
          type: "p",
          text: "Trung bình, sắp xếp nhanh cần O(n log n) thao tác. Nhưng nếu điểm chọn để chia mảng (pivot) luôn tạo ra hai phần rất lệch — chẳng hạn một phần chỉ có một phần tử — độ phức tạp thời gian trong trường hợp xấu nhất có thể thành O(n²).",
        },
        {
          type: "ul",
          items: [
            "Tốt nhất và trung bình: O(n log n).",
            "Xấu nhất: O(n²) khi các lần chia liên tục bị lệch.",
            "Chọn pivot ngẫu nhiên giúp giảm khả năng gặp cách chia lệch, nhưng không loại bỏ hoàn toàn trường hợp xấu nhất.",
          ],
        },
        { type: "h2", text: "Khi trình bày độ phức tạp" },
        {
          type: "p",
          text: "Khi giải thích một lời giải, hãy nói rõ bạn đang phân tích thời gian hay bộ nhớ, và đang xét trường hợp nào. Nếu các trường hợp có kết quả khác nhau, hãy nêu dữ liệu nào khiến thuật toán rơi vào từng trường hợp.",
        },
      ],
    },
    {
      slug: "complexity-drill",
      title: "Luyện tập nhận diện độ phức tạp",
      module: "Độ phức tạp (Big O)",
      icon: "drill",
      summary:
        "Ôn lại cách nhận biết Big O qua 10 câu hỏi có giới hạn thời gian.",
      duration: "10 phút",
      blocks: [
        {
          type: "p",
          text: "Bài luyện tập gồm 10 câu hỏi trộn nhiều mức độ. Mỗi câu có 25 giây; hết giờ, câu hỏi sẽ được tính là chưa trả lời đúng.",
        },
        {
          type: "ul",
          items: [
            "Đọc đoạn mã hoặc đề bài rồi chọn một trong bốn đáp án.",
            "Sau mỗi câu, xem lời giải để hiểu cách nhận biết độ phức tạp.",
            "Nếu chưa chắc, hãy quay lại bài học liên quan rồi thử lại.",
          ],
        },
      ],
      quiz: {
        title: "Luyện tập Big O",
        description:
          "10 câu hỏi nhiều mức độ, mỗi câu có 25 giây. Hãy chọn đáp án rồi đọc lời giải.",
        timedSeconds: 25,
        questions: [
          {
            id: "d1",
            tag: "Mảng",
            prompt: "Đọc phần tử a[i] theo chỉ số có độ phức tạp thời gian là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Mảng cho phép đọc trực tiếp theo chỉ số. Số thao tác không tăng theo số phần tử n, nên là O(1).",
          },
          {
            id: "d2",
            tag: "Vòng lặp",
            prompt: "Đoạn mã duyệt mảng một lần có độ phức tạp thời gian là bao nhiêu?",
            code: "for (let i = 0; i < n; i++) {\n  console.log(a[i]);\n}",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Vòng lặp chạy n lần và mỗi lượt làm lượng việc cố định, nên tổng là O(n).",
          },
          {
            id: "d3",
            tag: "Vòng lặp",
            prompt: "Hai vòng lặp cùng chạy n lần và lồng nhau có độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    doWork();",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
            answer: 2,
            explanation:
              "Với mỗi lượt của vòng ngoài, vòng trong chạy n lần. Tổng cộng n × n lượt, nên là O(n²).",
          },
          {
            id: "d4",
            tag: "Tìm kiếm",
            prompt:
              "Tìm kiếm nhị phân trên mảng đã sắp xếp có độ phức tạp thời gian là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation:
              "Mỗi bước bỏ đi một nửa phần tử còn cần xét, nên số bước tăng theo log₂n → O(log n).",
          },
          {
            id: "d5",
            tag: "Vòng lặp",
            prompt: "Vòng lặp tăng i lên gấp đôi sau mỗi lượt có độ phức tạp là bao nhiêu?",
            code: "for (let i = 1; i < n; i *= 2)\n  doWork();",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation:
              "i lần lượt là 1, 2, 4, 8, ... nên chỉ cần khoảng log₂n lượt để đạt n → O(log n).",
          },
          {
            id: "d6",
            tag: "Sắp xếp",
            prompt:
              "Giả sử sort có độ phức tạp O(n log n), đoạn mã sắp xếp rồi duyệt mảng có độ phức tạp là bao nhiêu?",
            code: "a.sort();\nfor (const x of a) doWork();",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            answer: 1,
            explanation:
              "Theo giả định, sort() cần O(n log n), còn vòng lặp cần O(n). Cộng hai phần rồi giữ mức tăng nhanh hơn: O(n log n).",
          },
          {
            id: "d7",
            tag: "Mảng",
            prompt: "Tìm giá trị lớn nhất bằng cách duyệt mảng một lần có độ phức tạp là bao nhiêu?",
            code: "let max = a[0];\nfor (let i = 1; i < a.length; i++)\n  if (a[i] > max) max = a[i];",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Trong trường hợp xấu nhất, thuật toán phải kiểm tra từng phần tử một lần → O(n).",
          },
          {
            id: "d8",
            tag: "Vòng lặp",
            prompt: "Vòng ngoài chạy n lần, vòng trong chạy m lần. Tổng độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < m; j++)\n    doWork();",
            options: ["O(n + m)", "O(n·m)", "O(n²)", "O(log(n·m))"],
            answer: 1,
            explanation:
              "Mỗi lượt của vòng ngoài thực hiện m lượt bên trong, tổng cộng n × m lượt → O(n·m).",
          },
          {
            id: "d9",
            tag: "Quy tắc cộng",
            prompt:
              "Hai vòng lặp chạy lần lượt, mỗi vòng n lần. Độ phức tạp tổng là bao nhiêu?",
            options: ["O(n)", "O(n²)", "O(2n²)", "O(log n)"],
            answer: 0,
            explanation:
              "Hai phần chạy nối tiếp nên cộng lại: O(n) + O(n) = O(2n). Bỏ hệ số không đổi 2, ta được O(n).",
          },
          {
            id: "d10",
            tag: "Mảng động",
            prompt:
              "Thêm phần tử vào cuối mảng động có độ phức tạp khấu hao là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Phần lớn lần thêm chỉ cần một thao tác. Thỉnh thoảng mảng phải mở rộng và sao chép dữ liệu; xét trên một chuỗi nhiều lần thêm, chi phí của các lần mở rộng được phân bổ cho những lần thêm khác nên chi phí khấu hao mỗi lần vẫn là O(1).",
          },
        ],
      },
    },
    {
      slug: "complexity-quiz-easy",
      title: "Kiểm tra Big O — Cơ bản",
      module: "Độ phức tạp (Big O)",
      icon: "level-easy",
      parentSlug: "complexity-drill",
      summary:
        "Luyện nhận biết O(1), O(log n), O(n), O(n log n) và O(n²) qua các ví dụ cơ bản.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Bài kiểm tra gồm các ví dụ cơ bản về vòng lặp, vòng lặp lồng nhau và hàm có sẵn. Không giới hạn thời gian; hãy thử tự giải thích vì sao chọn đáp án đó.",
        },
      ],
      quiz: {
        title: "Kiểm tra Big O — Cơ bản",
        description: "10 câu cơ bản, không giới hạn thời gian.",
        questions: [
          {
            id: "e1",
            tag: "Mảng",
            prompt: "Đọc phần tử a[i] theo chỉ số có độ phức tạp thời gian là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Đọc một phần tử theo chỉ số cần lượng thao tác không đổi, không phụ thuộc vào độ dài mảng → O(1).",
          },
          {
            id: "e2",
            tag: "Vòng lặp",
            prompt: "Một vòng lặp chạy n lần, mỗi lần làm lượng việc cố định. Độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++) {\n  console.log(i);\n}",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Mỗi lượt làm lượng việc cố định và có n lượt tất cả → O(n).",
          },
          {
            id: "e3",
            tag: "Vòng lặp",
            prompt: "Hai vòng lặp lồng nhau, mỗi vòng chạy n lần. Độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    doWork();",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
            answer: 2,
            explanation:
              "Vòng trong chạy n lần cho mỗi lượt của vòng ngoài: n × n = O(n²).",
          },
          {
            id: "e4",
            tag: "Tìm kiếm",
            prompt: "Tìm kiếm nhị phân trên mảng đã sắp xếp có độ phức tạp là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation:
              "Mỗi bước loại bỏ một nửa phần tử còn cần xét → O(log n).",
          },
          {
            id: "e5",
            tag: "Quy tắc cộng",
            prompt:
              "Hai vòng lặp chạy nối tiếp, mỗi vòng duyệt mảng một lần. Độ phức tạp tổng là bao nhiêu?",
            options: ["O(n)", "O(n²)", "O(n log n)", "O(1)"],
            answer: 0,
            explanation:
              "Hai vòng lặp chạy nối tiếp nên cộng lại: O(n) + O(n) = O(2n). Bỏ hệ số 2, kết quả là O(n).",
          },
          {
            id: "e6",
            tag: "Mảng",
            prompt:
              "Tìm x bằng includes() trong mảng chưa sắp xếp có độ phức tạp thời gian trường hợp xấu nhất là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Trong trường hợp xấu nhất, includes() phải kiểm tra hết n phần tử (khi x ở cuối hoặc không có trong mảng) → O(n).",
          },
          {
            id: "e7",
            tag: "Khái niệm",
            prompt:
              "Mỗi bước giảm một nửa phần dữ liệu cần xử lý. Độ phức tạp là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 1,
            explanation:
              "Sau mỗi bước, dữ liệu còn lại giảm một nửa nên cần khoảng log₂n bước → O(log n).",
          },
          {
            id: "e8",
            tag: "Khái niệm",
            prompt:
              "Số thao tác không đổi dù đầu vào lớn hay nhỏ. Độ phức tạp là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Số thao tác không tăng theo kích thước đầu vào n → O(1).",
          },
          {
            id: "e9",
            tag: "Sắp xếp",
            prompt: "Sắp xếp trộn (merge sort) có độ phức tạp thời gian là bao nhiêu?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            answer: 1,
            explanation:
              "Sắp xếp trộn chia dữ liệu qua khoảng log n lượt và xử lý tổng cộng n phần tử mỗi lượt → O(n log n).",
          },
          {
            id: "e10",
            tag: "Đơn giản hóa",
            prompt: "Rút gọn biểu thức O(4n + 20).",
            options: ["O(4n)", "O(n)", "O(n + 20)", "O(1)"],
            answer: 1,
            explanation:
              "Bỏ hệ số không đổi 4 và số hạng không đổi 20; mức tăng còn lại là O(n).",
          },
        ],
      },
    },
    {
      slug: "complexity-quiz-medium",
      title: "Kiểm tra Big O — Trung bình",
      module: "Độ phức tạp (Big O)",
      icon: "level-medium",
      parentSlug: "complexity-drill",
      summary:
        "Phân tích vòng lặp có bước nhảy, nhiều biến, đệ quy và thao tác trên dữ liệu.",
      duration: "12 phút",
      blocks: [
        {
          type: "p",
          text: "Bài kiểm tra có vòng lặp thay đổi bước nhảy, nhiều kích thước dữ liệu, lời gọi đệ quy và thao tác trên mảng hoặc chuỗi. Không giới hạn thời gian.",
        },
      ],
      quiz: {
        title: "Kiểm tra Big O — Trung bình",
        description: "10 câu mức trung bình, không giới hạn thời gian.",
        questions: [
          {
            id: "m1",
            tag: "Vòng lặp",
            prompt:
              "Vòng lặp trong bắt đầu từ i và chạy đến n. Độ phức tạp của hai vòng lặp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = i; j < n; j++)\n    doWork();",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
            answer: 2,
            explanation:
              "Tổng số lượt gần bằng n + (n−1) + ... + 1 = n(n+1)/2. Khi bỏ hệ số không đổi và số hạng bậc thấp, kết quả là O(n²).",
          },
          {
            id: "m2",
            tag: "Vòng lặp",
            prompt: "Vòng lặp nhân i lên 3 sau mỗi lượt có độ phức tạp là bao nhiêu?",
            code: "for (let i = 1; i < n; i *= 3)\n  doWork();",
            options: ["O(log₃ n)", "O(n)", "O(n log n)", "O(3ⁿ)"],
            answer: 0,
            explanation:
              "i lần lượt là 1, 3, 9, 27, ... nên cần khoảng log₃n lượt. Cơ số logarit không làm thay đổi bậc tăng trưởng → O(log n).",
          },
          {
            id: "m3",
            tag: "Vòng lặp",
            prompt: "Vòng ngoài chạy n lần, mỗi lần vòng trong chạy m lần. Độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < m; j++)\n    doWork();",
            options: ["O(n + m)", "O(n·m)", "O(max(n, m))", "O(n log m)"],
            answer: 1,
            explanation:
              "Có n lượt ở vòng ngoài và m lượt bên trong mỗi lượt đó, tổng cộng n × m thao tác → O(n·m).",
          },
          {
            id: "m4",
            tag: "Sắp xếp",
            prompt:
              "Giả sử sort có độ phức tạp O(n log n). Sắp xếp mảng rồi duyệt qua nó có độ phức tạp tổng là bao nhiêu?",
            code: "a.sort((x, y) => x - y);\nfor (const x of a) doWork();",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            answer: 1,
            explanation:
              "Cộng chi phí hai phần: O(n log n) + O(n). Khi n lớn, n log n tăng nhanh hơn n, nên kết quả là O(n log n).",
          },
          {
            id: "m5",
            tag: "Đệ quy",
            prompt:
              "Mỗi lần gọi, hàm giải bài toán cỡ n/2 rồi làm thêm lượng việc cố định: T(n) = T(n/2) + O(1). Độ phức tạp là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation:
              "Kích thước giảm một nửa sau mỗi lời gọi nên chỉ có khoảng log₂n mức đệ quy. Mỗi mức làm lượng việc cố định → O(log n).",
          },
          {
            id: "m6",
            tag: "Chuỗi",
            prompt:
              "Nếu mỗi lần nối tạo chuỗi mới và sao chép toàn bộ chuỗi cũ, đoạn mã có thể tốn bao nhiêu thời gian?",
            code: "let s = \"\";\nfor (let i = 0; i < n; i++)\n  s += \"x\";",
            options: ["O(1)", "O(n)", "O(n²)", "O(n log n)"],
            answer: 2,
            explanation:
              "Nếu mỗi lần nối phải sao chép chuỗi đã tạo, tổng lượng sao chép là 1 + 2 + ... + n, tương đương O(n²). Chi phí thực tế còn tùy cách ngôn ngữ và bộ chạy xử lý chuỗi.",
          },
          {
            id: "m7",
            tag: "Vòng lặp",
            prompt: "Vòng ngoài chạy n lần; mỗi lần, vòng trong tăng j lên gấp đôi. Độ phức tạp tổng là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = 1; j < n; j *= 2)\n    doWork();",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
            answer: 2,
            explanation:
              "Vòng ngoài chạy n lần, còn vòng trong chạy khoảng log₂n lần → O(n·log n).",
          },
          {
            id: "m8",
            tag: "Cấu trúc dữ liệu",
            prompt: "Tra cứu một khóa trong bảng băm có độ phức tạp trung bình là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 0,
            explanation:
              "Bảng băm thường tra cứu trong O(1) ở mức trung bình. Nếu nhiều khóa rơi vào cùng vị trí, trường hợp xấu nhất có thể lên đến O(n).",
          },
          {
            id: "m9",
            tag: "Quy tắc cộng",
            prompt:
              "Chương trình chạy một vòng lặp n lần, sau đó chạy hai vòng lặp lồng nhau n × n lần. Độ phức tạp tổng là bao nhiêu?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
            answer: 2,
            explanation:
              "Cộng hai phần được O(n) + O(n²). Vì n² tăng nhanh hơn n, kết quả rút gọn là O(n²).",
          },
          {
            id: "m10",
            tag: "Vòng lặp",
            prompt:
              "So sánh từng cặp phần tử bằng hai vòng lặp lồng nhau có độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = i + 1; j < n; j++)\n    if (a[i] === a[j]) return true;",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
            answer: 2,
            explanation:
              "Số cặp cần kiểm tra vào khoảng n²/2, vẫn thuộc mức O(n²). Có thể dùng tập hợp (set) để giảm thời gian trung bình xuống O(n).",
          },
        ],
      },
    },
    {
      slug: "complexity-quiz-hard",
      title: "Kiểm tra Big O — Nâng cao",
      module: "Độ phức tạp (Big O)",
      icon: "level-hard",
      parentSlug: "complexity-drill",
      summary:
        "Thử sức với đệ quy, bộ nhớ phụ, quy hoạch động và các trường hợp cần phân tích kỹ.",
      duration: "15 phút",
      blocks: [
        {
          type: "p",
          text: "Bài kiểm tra nâng cao về đệ quy, bộ nhớ phụ, quy hoạch động và các trường hợp dễ nhầm. Không giới hạn thời gian; hãy đọc kỹ từng giả định trong câu hỏi.",
        },
      ],
      quiz: {
        title: "Kiểm tra Big O — Nâng cao",
        description: "10 câu nâng cao, không giới hạn thời gian.",
        questions: [
          {
            id: "h1",
            tag: "Đệ quy",
            prompt:
              "Cách tính Fibonacci bằng đệ quy trực tiếp, không lưu kết quả cũ, có độ phức tạp thời gian thuộc mức nào?",
            code: "function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}",
            options: ["O(n)", "O(n log n)", "O(2ⁿ)", "O(n!)"],
            answer: 2,
            explanation:
              "Nhiều lời gọi bị tính lại và cây lời gọi tăng theo hàm mũ. Một cận trên thường dùng là O(2ⁿ), nên cách này chỉ phù hợp với n nhỏ.",
          },
          {
            id: "h2",
            tag: "Đệ quy",
            prompt:
              "Một hàm gọi đệ quy hai lần với dữ liệu cỡ n/2, rồi làm thêm O(n) việc: T(n) = 2T(n/2) + O(n). Độ phức tạp là bao nhiêu?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            answer: 1,
            explanation:
              "Mỗi mức đệ quy xử lý tổng cộng khoảng n phần tử và có khoảng log n mức → O(n log n). Sắp xếp trộn có cách phân tích này.",
          },
          {
            id: "h3",
            tag: "Đệ quy",
            prompt:
              "Mỗi lời gọi xử lý bài toán nhỏ hơn một đơn vị và làm thêm O(1) việc: T(n) = T(n − 1) + O(1). Độ phức tạp là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: 2,
            explanation:
              "Kích thước giảm từ n xuống 0, mỗi lần giảm một đơn vị, nên có khoảng n lời gọi → O(n).",
          },
          {
            id: "h4",
            tag: "Bộ nhớ",
            prompt: "Sắp xếp trộn cần thêm bao nhiêu bộ nhớ phụ để gộp các phần tử?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 2,
            explanation:
              "Quá trình gộp cần một mảng tạm chứa lượng dữ liệu tỉ lệ với n → O(n). Ngăn xếp đệ quy dùng thêm O(log n), nhưng tổng bộ nhớ phụ vẫn là O(n).",
          },
          {
            id: "h5",
            tag: "Quy hoạch động",
            prompt:
              "Bảng quy hoạch động cho bài toán chọn các số để đạt tổng W có n hàng và W cột. Thời gian cần thiết là bao nhiêu?",
            options: ["O(n)", "O(n + W)", "O(n·W)", "O(2ⁿ)"],
            answer: 2,
            explanation:
              "Có khoảng n × W ô và mỗi ô cần lượng việc cố định → O(n·W). Mức này phụ thuộc cả số phần tử n lẫn tổng mục tiêu W.",
          },
          {
            id: "h6",
            tag: "Bộ nhớ",
            prompt:
              "Tìm kiếm nhị phân viết bằng vòng lặp chỉ dùng một vài biến. Bộ nhớ phụ là bao nhiêu?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation:
              "Bản dùng vòng lặp chỉ giữ vài biến như lo, hi và mid → O(1). Nếu viết bằng đệ quy, ngăn xếp lời gọi có thể cần O(log n).",
          },
          {
            id: "h7",
            tag: "Vòng lặp",
            prompt: "Ba vòng lặp lồng nhau, mỗi vòng chạy n lần. Độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    for (let k = 0; k < n; k++)\n      doWork();",
            options: ["O(n²)", "O(n² log n)", "O(n³)", "O(3ⁿ)"],
            answer: 2,
            explanation:
              "Ba vòng lặp thực hiện khoảng n × n × n thao tác → O(n³).",
          },
          {
            id: "h8",
            tag: "Vòng lặp",
            prompt:
              "Vòng ngoài chạy n lần, vòng trong luôn chạy 100 lần. Độ phức tạp là bao nhiêu?",
            code: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < 100; j++)\n    doWork();",
            options: ["O(100)", "O(n)", "O(n²)", "O(n·100²)"],
            answer: 1,
            explanation:
              "100 không thay đổi theo n nên là một hằng số. Tổng số lượt là 100n, rút gọn thành O(n).",
          },
          {
            id: "h9",
            tag: "Bộ nhớ",
            prompt:
              "Tìm kiếm bằng đệ quy trên cây tìm kiếm nhị phân cân bằng cần bao nhiêu bộ nhớ cho ngăn xếp lời gọi?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation:
              "Chiều cao cây cân bằng là O(log n), nên số lời gọi đệ quy đang chờ cũng tối đa ở mức O(log n).",
          },
          {
            id: "h10",
            tag: "Hoán vị",
            prompt:
              "Số cách sắp xếp n phần tử tăng theo mức nào?",
            options: ["O(n²)", "O(2ⁿ)", "O(n!)", "O(n log n)"],
            answer: 2,
            explanation:
              "Có n! cách sắp xếp n phần tử. Nếu cần tạo và ghi đủ từng cách, còn phải xử lý n phần tử cho mỗi kết quả, nên tổng thời gian có thể là Θ(n·n!).",
          },
        ],
      },
    },
  ],
};
