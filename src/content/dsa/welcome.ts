import type { CourseModule } from "@/lib/course-types";

export const welcomeModule: CourseModule = {
  id: "welcome",
  title: "Bắt đầu",
  lessons: [
    {
      slug: "course-introduction",
      title: "Chào mừng đến với Learning Hub",
      module: "Bắt đầu",
      summary:
        "Làm quen với cách học DSA qua giải thích ngắn, ví dụ và mô phỏng trực quan.",
      duration: "4 phút",
      blocks: [
        {
          type: "p",
          text: "Chào mừng bạn đến với Learning Hub! Đây là nơi bạn học cấu trúc dữ liệu và giải thuật (DSA) bằng cách hiểu cách chúng hoạt động, thay vì chỉ ghi nhớ định nghĩa.",
        },
        {
          type: "p",
          text: "Mỗi bài học trình bày ý chính thật gọn, kèm ví dụ mã nguồn. Với chủ đề có mô phỏng, bạn có thể quan sát thuật toán xử lý dữ liệu từng bước và thử những đầu vào khác nhau.",
        },
        { type: "h2", text: "Bạn sẽ khám phá những gì?" },
        {
          type: "ul",
          items: [
            "Độ phức tạp Big O: cách ước lượng thời gian chạy và bộ nhớ thuật toán cần dùng.",
            "Cấu trúc dữ liệu phổ biến: mảng, chuỗi, bảng băm, danh sách liên kết, ngăn xếp, hàng đợi, cây, heap và đồ thị.",
            "Kỹ thuật giải bài: hai con trỏ, cửa sổ trượt, tìm kiếm nhị phân, đệ quy và quy hoạch động.",
            "Thuật toán nền tảng: sắp xếp, tìm kiếm và duyệt đồ thị.",
          ],
        },
        { type: "h2", text: "Gợi ý lộ trình" },
        {
          type: "p",
          text: "Nếu mới bắt đầu, hãy học lần lượt từ những bài đầu tiên: đọc phần giải thích, quan sát ví dụ rồi thử nói lại vì sao thuật toán đi đến kết quả đó. Bạn cũng có thể chọn thẳng chủ đề mình đang cần và quay lại ôn bất cứ lúc nào.",
        },
      ],
    },
    {
      slug: "how-to-use-this-hub",
      title: "Cách học cùng Learning Hub",
      module: "Bắt đầu",
      summary:
        "Khám phá bài học, tương tác với mô phỏng và ôn tập theo nhịp của bạn.",
      duration: "3 phút",
      blocks: [
        {
          type: "p",
          text: "Nội dung được sắp xếp theo khóa học và chủ đề. Chọn một bài trong danh sách để bắt đầu; dùng nút “Trước” và “Tiếp” ở cuối trang để đi lần lượt. Thanh tiến độ mảnh trên đầu trang cho biết bạn đã đọc đến đâu trong bài hiện tại.",
        },
        { type: "h2", text: "Tương tác với mô phỏng" },
        {
          type: "p",
          text: "Khi bài học có mô phỏng, bạn có thể điều khiển cách quan sát quá trình:",
        },
        {
          type: "ul",
          items: [
            "Nhấn “Chạy” để xem toàn bộ quá trình; dùng “Tiến” hoặc “Lùi” để quan sát từng bước.",
            "Điều chỉnh “Tốc độ” để xem chậm hoặc nhanh hơn, hoặc nhấn “Chạy lại” để bắt đầu từ đầu.",
            "Nếu có ô nhập dữ liệu, hãy thử thay đổi giá trị để xem thuật toán xử lý tình huống mới.",
          ],
        },
        { type: "h2", text: "Học chủ động, nhớ lâu hơn" },
        {
          type: "ul",
          items: [
            "Trước khi nhấn “Tiến”, thử đoán điều gì sẽ xảy ra tiếp theo.",
            "Nói lại bằng lời của bạn điều gì vừa xảy ra và vì sao.",
            "Nếu bài có câu hỏi, hãy tự chọn đáp án trước rồi đọc phần giải thích.",
            "Không cần vội — bạn có thể tạm dừng, thử lại hoặc quay về bài cũ bất cứ lúc nào.",
          ],
        },
      ],
    },
  ],
};
