import {
  User,
  Subject,
  Contest,
  NotificationItem,
  HeatmapDay,
  RatingHistoryPoint,
} from "./types";

export const EMPTY_USER: User = {
  id: "",
  name: "",
  handle: "",
  role: "student",
  email: "",
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=recon_student",
  bio: "",
  rating: 1200,
  maxRating: 1200,
  streak: 0,
  solvedCount: 0,
  isPublic: true,
  semester: 1,
  department: "Computer Science & Engineering",
  bestRank: 0,
  accuracy: 100,
};

export const MOCK_USERS: Record<string, User> = {
  student: EMPTY_USER,
  teacher: {
    id: "usr_teacher_01",
    name: "Dr. Marcus Vance",
    handle: "prof_vance",
    role: "teacher",
    email: "marcus.vance@faculty.recon.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Associate Professor of Computer Science. Research in Distributed Systems, High-Performance Query Engines, and OS Kernels.",
    rating: 2315,
    maxRating: 2420,
    streak: 84,
    solvedCount: 520,
    isPublic: true,
    semester: 4,
    department: "Computer Science & Engineering",
    bestRank: 2,
    accuracy: 97.2,
  },
  admin: {
    id: "usr_admin_01",
    name: "System Administrator",
    handle: "admin",
    role: "admin",
    email: "admin@recon.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Platform Administrator & Chief Academic Director. Managing academic infrastructure, student quotas, and contest governance.",
    rating: 2000,
    maxRating: 2050,
    streak: 45,
    solvedCount: 310,
    isPublic: false,
    semester: 4,
    department: "Academic Operations",
    bestRank: 12,
    accuracy: 94.0,
  },
};


export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "cs201",
    code: "CS201",
    name: "Data Structures & Algorithms",
    semester: 4,
    credits: 4,
    instructorName: "Dr. Marcus Vance",
    instructorEmail: "marcus.vance@faculty.recon.edu",
    description:
      "Advanced algorithm analysis, balanced search trees, graph algorithms, dynamic programming, and amortized complexity.",
    progressPercent: 0,
    color: "coral",
    lessons: [
      {
        id: "les_cs201_01",
        subjectId: "cs201",
        title: "Asymptotic Notation & Recurrence Relations",
        module: "Module 1: Complexity Theory",
        order: 1,
        durationMinutes: 45,
        completed: false,
        summary:
          "Master Big-O, Big-Omega, Big-Theta, and solving divide-and-conquer recurrences via the Master Theorem.",
        content: `### Complexity Analysis
When analyzing algorithms, we describe execution time and space utilization relative to input size $n$.

#### Master Theorem for Divide-and-Conquer
For recurrences of the form:
$$T(n) = a T(n/b) + f(n)$$
where $a \\geq 1$ and $b > 1$:
1. If $f(n) = O(n^{\\log_b a - \\epsilon})$ for $\\epsilon > 0$, then $T(n) = \\Theta(n^{\\log_b a})$.
2. If $f(n) = \\Theta(n^{\\log_b a})$, then $T(n) = \\Theta(n^{\\log_b a} \\log n)$.
3. If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds, $T(n) = \\Theta(f(n))$.`,
        codeSnippet: `// Divide and conquer binary search: O(log n)
int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "les_cs201_02",
        subjectId: "cs201",
        title: "Self-Balancing Trees: Red-Black & AVL",
        module: "Module 2: Advanced Trees",
        order: 2,
        durationMinutes: 60,
        completed: false,
        summary:
          "Tree rotation mechanics, color invariants, and maintaining $O(\\log n)$ worst-case search and insertion bounds.",
        content: `### Red-Black Tree Invariants
1. Every node is either red or black.
2. The root is always black.
3. Every null leaf (NIL) is black.
4. If a node is red, both of its children are black (no two consecutive reds).
5. For each node, all simple paths from the node to descendant leaves contain the same number of black nodes.`,
        codeSnippet: `struct RBNode {
    int data;
    bool color; // 0 = Black, 1 = Red
    RBNode *left, *right, *parent;
};`,
        codeLanguage: "cpp",
      },
      {
        id: "les_cs201_03",
        subjectId: "cs201",
        title: "Graph Algorithms: Shortest Paths (Dijkstra & Bellman-Ford)",
        module: "Module 3: Graph Theory",
        order: 3,
        durationMinutes: 75,
        completed: false,
        summary:
          "Single-source shortest paths on weighted directed graphs with priority queues and negative cycle detection.",
        content: `### Dijkstra's Algorithm
Dijkstra solves the single-source shortest path problem on non-negative weighted graphs in $O((V + E) \\log V)$ using a min-priority queue.`,
        codeSnippet: `priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
pq.push({0, src});
dist[src] = 0;`,
        codeLanguage: "cpp",
      },
      {
        id: "les_cs201_04",
        subjectId: "cs201",
        title: "Dynamic Programming: Knapsack & Matrix Chain Multiplication",
        module: "Module 4: Dynamic Optimization",
        order: 4,
        durationMinutes: 90,
        completed: false,
        summary:
          "Optimal substructure, overlapping subproblems, memoization vs. bottom-up tabulation, and space compression.",
        content: `### 0/1 Knapsack Problem
Given weights $w_i$ and values $v_i$, maximize total value within capacity $W$.
State transition:
$$dp[i][w] = \\max(dp[i-1][w], dp[i-1][w - w_i] + v_i)$$`,
        codeSnippet: `vector<int> dp(W + 1, 0);
for (int i = 0; i < n; i++) {
    for (int w = W; w >= weight[i]; w--) {
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
    }
}`,
        codeLanguage: "cpp",
      },
    ],
    materials: [
      {
        id: "mat_cs201_01",
        subjectId: "cs201",
        title: "CS201 Lecture Notes: Graph Theory & Flow Networks",
        category: "PDF Notes",
        fileSize: "4.8 MB",
        uploadDate: "Sep 18, 2026",
        downloads: 248,
        url: "#",
      },
      {
        id: "mat_cs201_02",
        subjectId: "cs201",
        title: "Algorithm Complexity Cheat Sheet (Cheatsheet & Formulae)",
        category: "Cheat Sheet",
        fileSize: "1.2 MB",
        uploadDate: "Sep 12, 2026",
        downloads: 512,
        url: "#",
      },
      {
        id: "mat_cs201_03",
        subjectId: "cs201",
        title: "Dynamic Programming Canonical Patterns Reference",
        category: "Lecture Slides",
        fileSize: "6.4 MB",
        uploadDate: "Sep 05, 2026",
        downloads: 380,
        url: "#",
      },
    ],
    tests: [
      {
        id: "test_cs201_01",
        subjectId: "cs201",
        title: "Mid-Term Assessment: Trees, Heaps & Graph Traversal",
        durationMinutes: 30,
        passingScore: 70,
        maxAttempts: 3,
        completed: false,
        questions: [
          {
            id: "q1",
            question: "What is the worst-case time complexity of searching in a Red-Black Tree with n nodes?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: 1,
            explanation: "Red-Black trees guarantee height at most 2 * log(n + 1), ensuring O(log n) worst-case search.",
          },
          {
            id: "q2",
            question: "Which of the following shortest path algorithms handles negative weight edges?",
            options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Kruskal's Algorithm", "Prim's Algorithm"],
            correctAnswer: 1,
            explanation: "Bellman-Ford operates in O(V * E) and relaxes all edges V-1 times, correctly finding shortest paths with negative weights and detecting negative cycles.",
          },
          {
            id: "q3",
            question: "In a min-heap with n elements, what is the time complexity to extract the minimum element and restore heap invariant?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: 1,
            explanation: "Extracting the root takes O(1), and heapify down takes O(log n) time.",
          },
        ],
      },
      {
        id: "test_cs201_02",
        subjectId: "cs201",
        title: "Upcoming Speed Quiz: Amortized Analysis & Dynamic Programming",
        durationMinutes: 20,
        passingScore: 75,
        maxAttempts: 2,
        completed: false,
        questions: [
          {
            id: "q21",
            question: "What is the amortized cost per push operation on a dynamic array doubling in capacity?",
            options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
            correctAnswer: 2,
            explanation: "Using aggregate or accounting method, the total cost for n insertions is bounded by 3n, giving O(1) amortized.",
          },
          {
            id: "q22",
            question: "Which technique is strictly required for an algorithm to use dynamic programming?",
            options: ["Greedy choice property", "Overlapping subproblems & Optimal substructure", "Divide and conquer without state memory", "Strict linear time bounds"],
            correctAnswer: 1,
            explanation: "Dynamic programming requires optimal substructure and overlapping subproblems to cache subproblem results.",
          },
        ],
      },
    ],
  },
  {
    id: "cs202",
    code: "CS202",
    name: "Computer Systems & Architecture",
    semester: 4,
    credits: 4,
    instructorName: "Prof. Elena Rostova",
    instructorEmail: "elena.rostova@faculty.recon.edu",
    description:
      "Instruction set architectures (RISC-V/x86-64), pipelined execution hazards, memory hierarchies, cache coherence, and out-of-order execution.",
    progressPercent: 0,
    color: "yellow",
    lessons: [
      {
        id: "les_cs202_01",
        subjectId: "cs202",
        title: "RISC-V Instruction Pipeline & Datapath",
        module: "Module 1: Pipeline Foundations",
        order: 1,
        durationMinutes: 50,
        completed: false,
        summary: "5-stage classical pipeline (IF, ID, EX, MEM, WB) and datapath control signals.",
        content: `### 5-Stage RISC Pipeline
1. **Instruction Fetch (IF)**: Retrieve instruction from I-Cache using Program Counter (PC).
2. **Instruction Decode (ID)**: Read registers, sign-extend immediate fields.
3. **Execute (EX)**: Arithmetic Logic Unit computation, branch target calculation.
4. **Memory (MEM)**: Access D-Cache for load/store instructions.
5. **Write Back (WB)**: Write result back to destination register.`,
        codeSnippet: `// RISC-V Assembly: Count set bits in register x10
li a0, 0
loop:
    beqz a1, done
    andi t0, a1, 1
    add a0, a0, t0
    srli a1, a1, 1
    j loop
done:
    ret`,
        codeLanguage: "x86asm",
      },
      {
        id: "les_cs202_02",
        subjectId: "cs202",
        title: "Pipeline Hazards: Structural, Data & Control",
        module: "Module 2: Hazards & Forwarding",
        order: 2,
        durationMinutes: 65,
        completed: false,
        summary: "Forwarding paths, stall bubbles, and branch prediction mechanics (2-bit saturating counters).",
        content: `### Data Hazard Mitigation
Forwarding (bypassing) feeds the output of the EX or MEM stage directly into the inputs of EX stage for subsequent instructions without stalling.`,
        codeSnippet: `// Data forwarding logic in Verilog
assign forwardA = (ex_mem_regwrite && (ex_mem_rd != 0) && (ex_mem_rd == id_ex_rs1)) ? 2'b10 :
                  (mem_wb_regwrite && (mem_wb_rd != 0) && (mem_wb_rd == id_ex_rs1)) ? 2'b01 : 2'b00;`,
        codeLanguage: "verilog",
      },
    ],
    materials: [
      {
        id: "mat_cs202_01",
        subjectId: "cs202",
        title: "RISC-V Green Sheet: Architecture Reference Guide",
        category: "Cheat Sheet",
        fileSize: "850 KB",
        uploadDate: "Sep 15, 2026",
        downloads: 410,
        url: "#",
      },
      {
        id: "mat_cs202_02",
        subjectId: "cs202",
        title: "Cache Coherence & MESI Protocol Technical Primer",
        category: "PDF Notes",
        fileSize: "3.1 MB",
        uploadDate: "Sep 08, 2026",
        downloads: 195,
        url: "#",
      },
    ],
    tests: [
      {
        id: "test_cs202_01",
        subjectId: "cs202",
        title: "Pipelining & Cache Organization Quiz",
        durationMinutes: 25,
        passingScore: 70,
        maxAttempts: 2,
        completed: false,
        questions: [
          {
            id: "q_cs202_1",
            question: "In a direct-mapped cache with 64-byte blocks and 4096 cache lines, how many bits are used for the index?",
            options: ["6 bits", "10 bits", "12 bits", "14 bits"],
            correctAnswer: 2,
            explanation: "4096 lines = 2^12 lines, hence exactly 12 bits are required for the cache index.",
          },
        ],
      },
    ],
  },
  {
    id: "cs203",
    code: "CS203",
    name: "Database Systems & Storage Engines",
    semester: 4,
    credits: 3,
    instructorName: "Dr. Aris Thorne",
    instructorEmail: "aris.thorne@faculty.recon.edu",
    description:
      "Relational algebra, SQL optimization, B+ Tree indexing, Write-Ahead Logging (WAL), ARIES recovery, and concurrency control.",
    progressPercent: 0,
    color: "blue",
    lessons: [
      {
        id: "les_cs203_01",
        subjectId: "cs203",
        title: "B+ Tree Storage Architecture & Node Splitting",
        module: "Module 1: Disk Storage & Indexing",
        order: 1,
        durationMinutes: 55,
        completed: false,
        summary: "Disk page layout, slotted pages, B+ Tree search, range scans, and concurrent latching protocols.",
        content: `### Why B+ Trees in Databases?
Unlike binary search trees, B+ Trees have a high fan-out (e.g. 100-500 keys per node), reducing disk I/O operations to $O(\\log_B N)$ page reads. All record pointers reside strictly in the leaf nodes, connected via linked sibling pointers for high-performance range queries.`,
        codeSnippet: `// Rust-style B+ Tree node layout
struct LeafNode<K, V> {
    keys: Vec<K>,
    values: Vec<V>,
    next_leaf: Option<PageId>,
    prev_leaf: Option<PageId>,
}`,
        codeLanguage: "rust",
      },
      {
        id: "les_cs203_02",
        subjectId: "cs203",
        title: "ACID Guarantees & Two-Phase Locking (2PL)",
        module: "Module 2: Concurrency & Transactions",
        order: 2,
        durationMinutes: 60,
        completed: false,
        summary: "Strict 2PL, deadlock detection with wait-for graphs, and snapshot isolation.",
        content: `### Strict 2PL Protocol
1. **Growing Phase**: Transaction acquires all required shared (S) and exclusive (X) locks.
2. **Commit Phase**: All exclusive locks are held until transaction commits or aborts. This guarantees serializability and prevents cascading aborts.`,
        codeSnippet: `BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
        codeLanguage: "sql",
      },
    ],
    materials: [
      {
        id: "mat_cs203_01",
        subjectId: "cs203",
        title: "Relational Query Optimization & Cost Models",
        category: "PDF Notes",
        fileSize: "5.2 MB",
        uploadDate: "Sep 10, 2026",
        downloads: 320,
        url: "#",
      },
    ],
    tests: [
      {
        id: "test_cs203_01",
        subjectId: "cs203",
        title: "Transaction Serializability & Normalization Exam",
        durationMinutes: 35,
        passingScore: 75,
        maxAttempts: 2,
        completed: false,
        questions: [
          {
            id: "q_cs203_1",
            question: "Which normal form guarantees the absence of transitive dependencies for non-prime attributes?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            correctAnswer: 2,
            explanation: "3NF requires that every functional dependency X -> A satisfies either X is a superkey or A is a prime attribute, eliminating transitive dependencies.",
          },
        ],
      },
    ],
  },
  {
    id: "cs204",
    code: "CS204",
    name: "Discrete Mathematics & Graph Theory",
    semester: 4,
    credits: 3,
    instructorName: "Prof. Kenneth Meyer",
    instructorEmail: "kenneth.meyer@faculty.recon.edu",
    description:
      "Mathematical logic, combinatorics, generating functions, Euler tours, planar graphs, and Ramsey theory.",
    progressPercent: 0,
    color: "charcoal",
    lessons: [
      {
        id: "les_cs204_01",
        subjectId: "cs204",
        title: "Eulerian & Hamiltonian Paths",
        module: "Module 1: Graph Traversal Proofs",
        order: 1,
        durationMinutes: 40,
        completed: false,
        summary: "Necessary and sufficient conditions for Euler trails and Dirac's theorem for Hamiltonian cycles.",
        content: `### Euler's Theorem
A connected graph $G$ has an Eulerian circuit if and only if every vertex in $G$ has an even degree.`,
        codeSnippet: `// Hierholzer's Algorithm for Eulerian Circuit
void findEuler(int u) {
    while (!adj[u].empty()) {
        int v = adj[u].back();
        adj[u].pop_back();
        findEuler(v);
    }
    circuit.push_back(u);
}`,
        codeLanguage: "cpp",
      },
    ],
    materials: [
      {
        id: "mat_cs204_01",
        subjectId: "cs204",
        title: "Combinatorics and Pigeonhole Principle Handout",
        category: "Formula Guide",
        fileSize: "1.8 MB",
        uploadDate: "Sep 02, 2026",
        downloads: 275,
        url: "#",
      },
    ],
    tests: [],
  },
];

export const MOCK_CONTESTS: Contest[] = [
  {
    id: "weekly-48",
    title: "Weekly Algo Challenge #48",
    code: "W48",
    type: "Weekly Contest",
    status: "active",
    startTime: "2026-09-23T18:00:00Z",
    endTime: "2026-09-23T20:00:00Z",
    durationMinutes: 120,
    participantsCount: 1284,
    problemsCount: 4,
    registered: false,
    problems: [
      {
        id: "w48_prob_a",
        contestId: "weekly-48",
        index: "A",
        title: "Lexicographical Substring Partition",
        difficulty: "Easy",
        points: 500,
        timeLimitSec: 1.0,
        memoryLimitMB: 256,
        description:
          "Given a binary string $S$ of length $N$, find the minimum number of non-overlapping substrings such that every substring is in lexicographical ascending order (i.e. '0' characters precede '1' characters).",
        inputFormat:
          "The first line contains an integer $T$ ($1 \\le T \\le 100$) — the number of test cases. Each test case consists of an integer $N$ followed by the string $S$.",
        outputFormat:
          "For each test case, output a single integer representing the minimum number of partitions.",
        sampleTests: [
          {
            input: "3\n5\n00111\n4\n1010\n6\n111000",
            output: "1\n2\n2",
            explanation:
              "In '00111', the whole string is non-decreasing so 1 partition is sufficient. In '1010', we partition into '1' and '010' or '10' and '10'.",
          },
        ],
        starterCode: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n; cin >> n;
    string s; cin >> s;
    // Write your solution here
    int partitions = 1;
    for (int i = 1; i < n; i++) {
        if (s[i-1] == '1' && s[i] == '0') {
            partitions++;
        }
    }
    cout << partitions << "\\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t; cin >> t;
    while (t--) solve();
    return 0;
}`,
          python: `import sys

def solve():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    t = int(data[0])
    idx = 1
    for _ in range(t):
        n = int(data[idx])
        s = data[idx+1]
        idx += 2
        # Partition calculation
        ans = 1
        for i in range(1, n):
            if s[i-1] == '1' and s[i] == '0':
                ans += 1
        print(ans)

if __name__ == '__main__':
    solve()`,
        },
        solved: false,
      },
      {
        id: "w48_prob_b",
        contestId: "weekly-48",
        index: "B",
        title: "Minimum XOR Spanning Tree",
        difficulty: "Medium",
        points: 1000,
        timeLimitSec: 2.0,
        memoryLimitMB: 256,
        description:
          "You are given an array of $N$ integers $A_1, A_2, \\dots, A_N$. Consider a complete graph with $N$ vertices where the weight of the edge between vertex $i$ and $j$ is $A_i \\oplus A_j$ (bitwise XOR). Compute the total weight of the Minimum Spanning Tree of this graph.",
        inputFormat:
          "The first line contains an integer $N$ ($1 \\le N \\le 2 \\times 10^5$). The second line contains $N$ distinct integers $A_1, A_2, \\dots, A_N$ ($0 \\le A_i < 2^{30}$).",
        outputFormat: "Output a single integer — the minimum total weight.",
        sampleTests: [
          {
            input: "4\n1 2 3 4",
            output: "8",
            explanation:
              "Optimal edges: (1, 3) weight 2, (2, 3) weight 1, (1, 4) weight 5. Total = 8.",
          },
        ],
        starterCode: {
          cpp: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    // Boruvka + Trie solution
    return 0;
}`,
        },
        solved: false,
      },
      {
        id: "w48_prob_c",
        contestId: "weekly-48",
        index: "C",
        title: "Subtree Frequency Queries",
        difficulty: "Medium",
        points: 1500,
        timeLimitSec: 2.5,
        memoryLimitMB: 512,
        description:
          "You are given a rooted tree with $N$ vertices numbered $1$ to $N$, with vertex $1$ as root. Each vertex has a color $C_v$. You must answer $Q$ queries: given vertex $u$ and integer $k$, how many colors appear at least $k$ times in the subtree of $u$?",
        inputFormat:
          "The first line contains $N$ and $Q$. The second line contains $N$ integers $C_1, \\dots, C_N$. The next $N-1$ lines contain edges.",
        outputFormat: "Output the answer for each query on a new line.",
        sampleTests: [
          {
            input: "5 2\n1 2 1 1 2\n1 2\n1 3\n2 4\n2 5\n1 2\n2 1",
            output: "2\n2",
          },
        ],
        starterCode: {
          cpp: `// Sack on Tree / DSU on Tree pattern\n#include <bits/stdc++.h>\nusing namespace std;\n`,
        },
        solved: false,
      },
      {
        id: "w48_prob_d",
        contestId: "weekly-48",
        index: "D",
        title: "Quantum State Superposition Permutations",
        difficulty: "Hard",
        points: 2250,
        timeLimitSec: 3.0,
        memoryLimitMB: 512,
        description:
          "Given a permutation $P$ of length $N$, find the number of valid sequences of length $M$ satisfying the phase condition modulo $998244353$.",
        inputFormat: "The first line contains $N$ and $M$.",
        outputFormat: "Output the result modulo $998244353$.",
        sampleTests: [{ input: "3 4\n1 2 3", output: "16" }],
        starterCode: {
          cpp: `// NTT polynomial multiplication required\n#include <bits/stdc++.h>\nusing namespace std;\n`,
        },
        solved: false,
      },
    ],
    leaderboard: [
      {
        rank: 1,
        userId: "cf_01",
        handle: "tourist_fan",
        rating: 2840,
        solvedCount: 4,
        penaltyTime: 98,
        problemStatus: {
          A: { solved: true, points: 500, timeMinutes: 8, attempts: 1 },
          B: { solved: true, points: 980, timeMinutes: 24, attempts: 1 },
          C: { solved: true, points: 1420, timeMinutes: 52, attempts: 1 },
          D: { solved: true, points: 2110, timeMinutes: 88, attempts: 2 },
        },
      },
      {
        rank: 2,
        userId: "cf_02",
        handle: "algo_slayer",
        rating: 2490,
        solvedCount: 4,
        penaltyTime: 114,
        problemStatus: {
          A: { solved: true, points: 495, timeMinutes: 10, attempts: 1 },
          B: { solved: true, points: 950, timeMinutes: 32, attempts: 1 },
          C: { solved: true, points: 1390, timeMinutes: 65, attempts: 2 },
          D: { solved: true, points: 2040, timeMinutes: 102, attempts: 2 },
        },
      },
      {
        rank: 3,
        userId: "cf_03",
        handle: "marcus_v",
        rating: 2315,
        solvedCount: 3,
        penaltyTime: 72,
        problemStatus: {
          A: { solved: true, points: 500, timeMinutes: 6, attempts: 1 },
          B: { solved: true, points: 970, timeMinutes: 28, attempts: 1 },
          C: { solved: true, points: 1450, timeMinutes: 44, attempts: 1 },
          D: { solved: false, points: 0, timeMinutes: 0, attempts: 3 },
        },
      },
      {
        rank: 14,
        userId: "cf_07",
        handle: "code_warrior",
        rating: 1742,
        solvedCount: 1,
        penaltyTime: 16,
        problemStatus: {
          A: { solved: true, points: 490, timeMinutes: 16, attempts: 1 },
          B: { solved: false, points: 0, timeMinutes: 0, attempts: 1 },
          C: { solved: false, points: 0, timeMinutes: 0, attempts: 0 },
          D: { solved: false, points: 0, timeMinutes: 0, attempts: 0 },
        },
      },
      {
        rank: 15,
        userId: "cf_04",
        handle: "byte_wizard",
        rating: 1710,
        solvedCount: 1,
        penaltyTime: 19,
        problemStatus: {
          A: { solved: true, points: 485, timeMinutes: 19, attempts: 1 },
          B: { solved: false, points: 0, timeMinutes: 0, attempts: 2 },
          C: { solved: false, points: 0, timeMinutes: 0, attempts: 0 },
          D: { solved: false, points: 0, timeMinutes: 0, attempts: 0 },
        },
      },
      {
        rank: 16,
        userId: "cf_05",
        handle: "matrix_neo",
        rating: 1650,
        solvedCount: 1,
        penaltyTime: 25,
        problemStatus: {
          A: { solved: true, points: 475, timeMinutes: 25, attempts: 2 },
          B: { solved: false, points: 0, timeMinutes: 0, attempts: 1 },
          C: { solved: false, points: 0, timeMinutes: 0, attempts: 0 },
          D: { solved: false, points: 0, timeMinutes: 0, attempts: 0 },
        },
      },
    ],
  },
  {
    id: "biweekly-24",
    title: "Bi-Weekly Speedrun #24",
    code: "B24",
    type: "Bi-Weekly Speedrun",
    status: "upcoming",
    startTime: "2026-09-26T14:00:00Z",
    endTime: "2026-09-26T15:30:00Z",
    durationMinutes: 90,
    participantsCount: 890,
    problemsCount: 5,
    registered: true,
    problems: [],
    leaderboard: [],
  },
  {
    id: "weekly-47",
    title: "Weekly Algo Challenge #47",
    code: "W47",
    type: "Weekly Contest",
    status: "past",
    startTime: "2026-09-16T18:00:00Z",
    endTime: "2026-09-16T20:00:00Z",
    durationMinutes: 120,
    participantsCount: 1412,
    problemsCount: 4,
    registered: true,
    problems: [],
    leaderboard: [],
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_01",
    title: "Contest Live: Weekly Algo #48",
    description: "Round 48 has started! Problem A and B are open for submissions.",
    timeAgo: "15 min ago",
    read: false,
    type: "contest",
    link: "/contests/weekly-48",
  },
  {
    id: "notif_02",
    title: "Assessment Graded: CS203 Mid-Term",
    description: "You scored 94/100 on Transaction Serializability & Normalization.",
    timeAgo: "2 hours ago",
    read: false,
    type: "test",
    link: "/courses/cs203",
  },
  {
    id: "notif_03",
    title: "New Study Material in CS201",
    description: "Dr. Vance uploaded 'CS201 Lecture Notes: Graph Theory & Flow Networks'.",
    timeAgo: "1 day ago",
    read: true,
    type: "course",
    link: "/courses/cs201",
  },
  {
    id: "notif_04",
    title: "Platform Maintenance Announcement",
    description: "RECON core judging nodes will undergo scheduled optimization on Sunday 02:00 UTC.",
    timeAgo: "2 days ago",
    read: true,
    type: "announcement",
    link: "#",
  },
];

export const MOCK_HEATMAP_DATA: HeatmapDay[] = [
  // 60 days of activity
  { date: "2026-07-26", count: 2, level: 1 },
  { date: "2026-07-27", count: 5, level: 3 },
  { date: "2026-07-28", count: 8, level: 4 },
  { date: "2026-07-29", count: 3, level: 2 },
  { date: "2026-07-30", count: 0, level: 0 },
  { date: "2026-07-31", count: 4, level: 2 },
  { date: "2026-08-01", count: 6, level: 3 },
  { date: "2026-08-02", count: 2, level: 1 },
  { date: "2026-08-03", count: 7, level: 4 },
  { date: "2026-08-04", count: 5, level: 3 },
  { date: "2026-08-05", count: 4, level: 2 },
  { date: "2026-08-06", count: 9, level: 4 },
  { date: "2026-08-07", count: 3, level: 2 },
  { date: "2026-08-08", count: 1, level: 1 },
  { date: "2026-08-09", count: 0, level: 0 },
  { date: "2026-08-10", count: 6, level: 3 },
  { date: "2026-08-11", count: 4, level: 2 },
  { date: "2026-08-12", count: 8, level: 4 },
  { date: "2026-08-13", count: 5, level: 3 },
  { date: "2026-08-14", count: 3, level: 2 },
  { date: "2026-08-15", count: 7, level: 4 },
  { date: "2026-08-16", count: 2, level: 1 },
  { date: "2026-08-17", count: 6, level: 3 },
  { date: "2026-08-18", count: 4, level: 2 },
  { date: "2026-08-19", count: 8, level: 4 },
  { date: "2026-08-20", count: 10, level: 4 },
  { date: "2026-08-21", count: 5, level: 3 },
  { date: "2026-08-22", count: 3, level: 2 },
  { date: "2026-08-23", count: 0, level: 0 },
  { date: "2026-08-24", count: 4, level: 2 },
  { date: "2026-08-25", count: 6, level: 3 },
  { date: "2026-08-26", count: 7, level: 4 },
  { date: "2026-08-27", count: 5, level: 3 },
  { date: "2026-08-28", count: 3, level: 2 },
  { date: "2026-08-29", count: 8, level: 4 },
  { date: "2026-08-30", count: 4, level: 2 },
  { date: "2026-08-31", count: 6, level: 3 },
  { date: "2026-09-01", count: 7, level: 4 },
  { date: "2026-09-02", count: 5, level: 3 },
  { date: "2026-09-03", count: 9, level: 4 },
  { date: "2026-09-04", count: 4, level: 2 },
  { date: "2026-09-05", count: 6, level: 3 },
  { date: "2026-09-06", count: 8, level: 4 },
  { date: "2026-09-07", count: 5, level: 3 },
  { date: "2026-09-08", count: 7, level: 4 },
  { date: "2026-09-09", count: 6, level: 3 },
  { date: "2026-09-10", count: 8, level: 4 },
  { date: "2026-09-11", count: 4, level: 2 },
  { date: "2026-09-12", count: 7, level: 4 },
  { date: "2026-09-13", count: 5, level: 3 },
  { date: "2026-09-14", count: 9, level: 4 },
  { date: "2026-09-15", count: 6, level: 3 },
  { date: "2026-09-16", count: 11, level: 4 },
  { date: "2026-09-17", count: 7, level: 4 },
  { date: "2026-09-18", count: 8, level: 4 },
  { date: "2026-09-19", count: 6, level: 3 },
  { date: "2026-09-20", count: 9, level: 4 },
  { date: "2026-09-21", count: 8, level: 4 },
  { date: "2026-09-22", count: 10, level: 4 },
  { date: "2026-09-23", count: 5, level: 3 },
];

export const MOCK_RATING_HISTORY: RatingHistoryPoint[] = [
  { contestTitle: "Weekly Algo #40", date: "Jul 22", rating: 1420, delta: +42, rank: 68 },
  { contestTitle: "Bi-Weekly #20", date: "Jul 29", rating: 1485, delta: +65, rank: 45 },
  { contestTitle: "Weekly Algo #42", date: "Aug 05", rating: 1470, delta: -15, rank: 82 },
  { contestTitle: "Weekly Algo #43", date: "Aug 12", rating: 1535, delta: +65, rank: 36 },
  { contestTitle: "Bi-Weekly #22", date: "Aug 19", rating: 1610, delta: +75, rank: 22 },
  { contestTitle: "Weekly Algo #45", date: "Sep 02", rating: 1665, delta: +55, rank: 18 },
  { contestTitle: "Weekly Algo #46", date: "Sep 09", rating: 1690, delta: +25, rank: 15 },
  { contestTitle: "Weekly Algo #47", date: "Sep 16", rating: 1742, delta: +52, rank: 11 },
];
