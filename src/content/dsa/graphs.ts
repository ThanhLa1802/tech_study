import type { CourseModule } from "@/lib/course-types";

export const graphsModule: CourseModule = {
  id: "graphs",
  title: "Graphs",
  lessons: [
    {
      slug: "graph-basics",
      title: "Đồ thị & biểu diễn",
      module: "Graphs",
      summary:
        "Tập đỉnh nối với nhau bằng cạnh; chọn cách biểu diễn phù hợp quyết định chi phí bộ nhớ và thao tác.",
      duration: "8 phút",
      blocks: [
        {
          type: "p",
          text: "Đồ thị (graph) gồm tập đỉnh (vertex) và tập cạnh (edge) nối các đỉnh. Cạnh có thể có hướng hoặc vô hướng, có trọng số hoặc không.",
        },
        { type: "h2", text: "Thuật ngữ" },
        {
          type: "ul",
          items: [
            "degree: số cạnh nối vào một đỉnh.",
            "path (đường đi): dãy đỉnh kề nhau; cycle (chu trình): đường đi khép kín.",
            "connected (liên thông): mọi cặp đỉnh đều có đường đi giữa chúng.",
            "DAG: đồ thị có hướng không chu trình.",
          ],
        },
        { type: "h2", text: "Biểu diễn" },
        {
          type: "ul",
          items: [
            "Adjacency list (danh sách kề): mỗi đỉnh lưu danh sách hàng xóm — O(V + E) bộ nhớ, duyệt hàng xóm nhanh. Dùng phổ biến nhất.",
            "Adjacency matrix (ma trận kề): mảng V×V — O(V²) bộ nhớ, kiểm tra hai đỉnh kề nhau trong O(1).",
            "Edge list: chỉ lưu danh sách cạnh — gọn khi cần xử lý cạnh.",
          ],
        },
        {
          type: "code",
          snippets: [
            {
              lang: "text",
              code: "adj = {\n  A: [B, C],\n  B: [A, D],\n  C: [A, E],\n  D: [B, F],\n  E: [C, F],\n  F: [D, E]\n}",
            },
          ],
        },
        { type: "h2", text: "Khi nào dùng" },
        {
          type: "p",
          text: "Dùng adjacency list cho hầu hết bài toán duyệt và đường đi; dùng ma trận kề khi đồ thị dày và cần kiểm tra kề cạnh liên tục.",
        },
      ],
    },
    {
      slug: "graph-traversal",
      title: "BFS & DFS",
      module: "Graphs",
      summary:
        "Hai cách duyệt đồ thị: BFS theo tầng bằng queue, DFS đi sâu bằng stack/đệ quy.",
      duration: "9 phút",
      visualizer: "graph-bfs",
      blocks: [
        {
          type: "p",
          text: "Có hai chiến lược duyệt đồ thị cơ bản. BFS lan rộng theo từng tầng, còn DFS đi sâu hết một nhánh rồi mới quay lui. Cả hai đều O(V + E) với adjacency list.",
        },
        { type: "h2", text: "BFS — duyệt theo tầng" },
        {
          type: "p",
          text: "BFS dùng queue: đưa đỉnh nguồn vào hàng đợi, lần lượt lấy ra và đưa các hàng xóm chưa thăm vào cuối. Vì duyệt theo tầng, BFS tìm đường đi ngắn nhất trên đồ thị không trọng số.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function bfs(start, adj) {\n  const queue = [start];\n  const visited = new Set([start]);\n  const order = [];\n  while (queue.length) {\n    const node = queue.shift();\n    order.push(node);\n    for (const nb of adj[node]) {\n      if (!visited.has(nb)) {\n        visited.add(nb);\n        queue.push(nb);\n      }\n    }\n  }\n  return order;\n}",
            },
          ],
        },
        { type: "h2", text: "DFS — đi sâu" },
        {
          type: "p",
          text: "DFS dùng stack (hoặc đệ quy). Mỗi lần gặp hàng xóm chưa thăm thì đi tiếp vào nó ngay. DFS dùng để phát hiện chu trình, tô màu thành phần liên thông, và sắp xếp topo.",
        },
        {
          type: "code",
          snippets: [
            {
              lang: "javascript",
              code: "function dfs(node, adj, visited = new Set(), order = []) {\n  visited.add(node);\n  order.push(node);\n  for (const nb of adj[node]) {\n    if (!visited.has(nb)) dfs(nb, adj, visited, order);\n  }\n  return order;\n}",
            },
            {
              lang: "python",
              code: "def dfs(node, adj, visited=None, order=None):\n    if visited is None:\n        visited, order = set(), []\n    visited.add(node)\n    order.append(node)\n    for nb in adj[node]:\n        if nb not in visited:\n            dfs(nb, adj, visited, order)\n    return order",
            },
          ],
        },
        { type: "h2", text: "Độ phức tạp" },
        {
          type: "ul",
          items: [
            "Thời gian: O(V + E) với adjacency list.",
            "Bộ nhớ: O(V) cho visited + hàng đợi/stack.",
          ],
        },
      ],
    },
    {
      slug: "graphs-quiz",
      title: "Quiz: Graphs",
      module: "Graphs",
      icon: "quiz",
      summary: "Kiểm tra biểu diễn đồ thị, BFS/DFS và độ phức tạp.",
      duration: "5 phút",
      blocks: [
        {
          type: "p",
          text: "6 câu hỏi về biểu diễn và duyệt đồ thị.",
        },
      ],
      quiz: {
        title: "Quiz: Graphs",
        description: "6 câu về đồ thị, BFS, DFS và độ phức tạp.",
        questions: [
          {
            id: "gr1",
            tag: "Biểu diễn",
            prompt:
              "Cách biểu diễn đồ thị tiết kiệm bộ nhớ nhất cho đồ thị thưa là gì?",
            options: [
              "Adjacency list",
              "Adjacency matrix",
              "Ma trận V×V",
              "Mảng hai chiều",
            ],
            answer: 0,
            explanation:
              "Adjacency list tốn O(V+E), còn ma trận kề luôn tốn O(V²) dù đồ thị thưa.",
          },
          {
            id: "gr2",
            tag: "BFS",
            prompt: "BFS dùng cấu trúc dữ liệu nào?",
            options: ["Stack", "Queue", "Heap", "Hash set"],
            answer: 1,
            explanation:
              "BFS cần xử lý theo thứ tự phát hiện (FIFO) nên dùng queue.",
          },
          {
            id: "gr3",
            tag: "DFS",
            prompt: "DFS thường được cài bằng gì?",
            options: [
              "Queue",
              "Stack hoặc đệ quy",
              "Heap",
              "Priority queue",
            ],
            answer: 1,
            explanation:
              "DFS đi sâu nên dùng stack (LIFO) hoặc gọi đệ quy.",
          },
          {
            id: "gr4",
            tag: "Ứng dụng",
            prompt:
              "BFS cho đường đi ngắn nhất trong loại đồ thị nào?",
            options: [
              "Mọi đồ thị có trọng số",
              "Đồ thị không trọng số (mọi cạnh cùng chi phí)",
              "Chỉ đồ thị có hướng",
              "Chỉ cây nhị phân",
            ],
            answer: 1,
            explanation:
              "BFS tối ưu theo số cạnh; với trọng số khác nhau cần Dijkstra.",
          },
          {
            id: "gr5",
            tag: "Độ phức tạp",
            prompt:
              "Duyệt toàn bộ đồ thị bằng BFS/DFS với adjacency list tốn bao nhiêu?",
            options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
            answer: 2,
            explanation:
              "Mỗi đỉnh và mỗi cạnh được xử lý một lần nên O(V+E).",
          },
          {
            id: "gr6",
            tag: "Cấu trúc",
            prompt: "DAG là gì?",
            options: [
              "Đồ thị vô hướng đầy đủ",
              "Đồ thị có hướng không có chu trình",
              "Đồ thị có trọng số âm",
              "Đồ thị liên thông",
            ],
            answer: 1,
            explanation:
              "DAG = Directed Acyclic Graph: có hướng và không chứa chu trình; thứ tự topo luôn tồn tại.",
          },
        ],
      },
    },
  ],
};
