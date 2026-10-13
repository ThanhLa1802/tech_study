# Learning Hub

Nền tảng học **Data Structures & Algorithms** và **System Design** bằng trực giác: lý thuyết ngắn gọn, code mẫu đa ngôn ngữ, và mô phỏng trực quan từng bước.

## Tính năng

- **2 khóa học**: DSA và System Design, chuyển đổi qua dropdown ở đầu sidebar và qua thẻ khóa học ở trang chủ.
- **Sidebar accordion**: các module xổ xuống, tự mở module đang học; icon theo module.
- **Trang bài học**: breadcrumb, mục lục (TOC) bên phải có scroll-spy và click nhảy tới phần, thanh reading progress trên cùng.
- **Code block đa ngôn ngữ**: tab chuyển giữa JavaScript và Python; block một snippet không hiện nhãn.
- **Visualizer thuật toán** (DSA): Bubble Sort, Selection Sort, Insertion Sort, Binary Search, Two Sum — play/step/tốc độ, highlight mã giả theo bước.
- **Visualizer System Design**: 7 mô phỏng dạng sơ đồ SVG có animation — Round Robin (cân bằng tải), Token Bucket và fixed/sliding window (giới hạn tốc độ), HTTP/HTTPS, luồng request REST, vòng consistent hashing và luồng request tải ảnh/bảng tin; block `diagram` cho sơ đồ khối tĩnh.
- **Nội dung tiếng Việt** chuyên sâu, dễ hiểu.

## Công nghệ

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- Tailwind CSS v4
- TypeScript
- Không dùng thư viện UI/animation/icon bên ngoài — mọi sơ đồ và icon đều vẽ bằng SVG tay.

## Chạy dự án

```bash
npm run dev     # chạy dev tại http://localhost:3000
npm run build   # build production
npm run lint    # kiểm tra lint
npx tsc --noEmit  # kiểm tra type
```

## Cấu trúc

```
src/
  app/
    page.tsx                          # trang chủ (2 thẻ khóa học)
    learn/
      page.tsx                        # redirect /learn/dsa
      layout.tsx                      # sidebar + reading progress
      [course]/page.tsx               # redirect tới bài đầu của khóa
      [course]/[slug]/page.tsx        # trang bài học
  components/
    course-sidebar.tsx                # sidebar accordion
    course-switcher.tsx               # dropdown chọn khóa
    course-icons.tsx                  # bộ icon SVG + map icon
    code-block.tsx                    # code block có tab ngôn ngữ
    diagram-svg.tsx                   # renderer SVG dùng chung (tĩnh + động)
    diagram-block.tsx                 # block sơ đồ tĩnh
    reading-progress.tsx              # thanh tiến độ đọc
    lesson-toc.tsx                    # mục lục + scroll-spy
    visualizers/
      algorithm-visualizer.tsx        # engine mô phỏng DSA (bar)
      specs.ts                        # spec 5 thuật toán DSA
      diagram-visualizer.tsx          # engine mô phỏng System Design
      diagram-specs.ts                # spec mô phỏng Round Robin, Token Bucket, HTTP/HTTPS
      sequence-specs.ts               # spec mô phỏng luồng request REST
      consistent-hashing-ring.tsx     # component mô phỏng consistent hashing
      rate-limit-window.tsx           # component mô phỏng rate limit fixed/sliding window
      request-flow.tsx                # component mô phỏng luồng request tải ảnh/bảng tin
      lesson-visualizer.tsx           # chọn engine theo loại visualizer
  lib/
    course.ts                         # dữ liệu khóa học, bài học, helpers
    diagram.ts                        # types + hình học cho sơ đồ
```

## Tiến trình

### Đã hoàn thành

- [x] Khung Next.js, layout, theme tối.
- [x] Chia 2 khóa DSA & System Design; route `/learn/[course]/[slug]`.
- [x] Sidebar accordion + dropdown chọn khóa + icon module/bài.
- [x] Reading progress và mục lục (TOC) có scroll-spy.
- [x] Code block đa ngôn ngữ (JavaScript + Python); ẩn nhãn khi chỉ có 1 snippet.
- [x] 5 visualizer DSA (Bubble, Selection, Insertion, Binary Search, Two Sum).
- [x] 7 visualizer System Design: Round Robin, Token Bucket, HTTP/HTTPS, luồng request REST, vòng consistent hashing, rate limit fixed/sliding window, luồng request tải ảnh/bảng tin; kèm block sơ đồ tĩnh.
- [x] Trang chủ dạng thẻ khóa học (bấm cả thẻ để vào).
- [x] Nội dung DSA: Welcome, Big O, Sorting, Two Pointers, Binary Search.
- [x] Nội dung System Design đầy đủ 11 module: Nền tảng (What is System Design?, 30 Must-Know Concepts), Core Concepts (Scalability, Availability, Reliability, Single Point of Failure, Latency vs Throughput vs Bandwidth, Consistent Hashing, CAP), Networking & APIs (DNS & Networking, HTTP/Proxy & Latency, REST vs GraphQL, Realtime Communication), Database Fundamentals (Data Models, Transactions & ACID, Indexes & Queries), Building Blocks (Load Balancing, Caching, CDN), Data at Scale (Sharding, Replication), Distributed Systems (Consistency Models, Timeouts & Retries & Idempotency, Failure Detection, Cascading Failures), Reliability (Message Queues, Rate Limiting), Architecture Patterns (Monolith/Modular/Microservices, Sync & Async/Event-Driven, Saga & Outbox), Design Process (Design Process, Back-of-Envelope Estimation), và Case Studies (URL Shortener, News Feed, Chat).

### Việc tiếp theo

- [ ] Lưu tiến độ đọc / đánh dấu bài đã học.
- [ ] Sidebar mobile (drawer) và tìm kiếm bài học.
