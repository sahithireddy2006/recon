import { ContestProblem } from "./types";

export interface PoolQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium";
  points: number;
  timeLimitSec: number;
  memoryLimitMB: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleTests: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    cpp: string;
    python: string;
    typescript: string;
  };
}

export const QUESTIONS_POOL: PoolQuestion[] = [
  {
    id: "q_01",
    title: "Two Sum",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input has exactly one solution, and you may not use the same element twice.",
    inputFormat: "The first line contains N (size of array) and Target. The second line contains N space-separated integers.",
    outputFormat: "Print the two 0-based indices separated by a space.",
    sampleTests: [
      { input: "4 9\n2 7 11 15", output: "0 1", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "3 6\n3 2 4", output: "1 2", explanation: "nums[1] + nums[2] = 2 + 4 = 6" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // Solution: Find two indices that sum to target\n    return 0;\n}`,
      python: `import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, target = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Solution goes here\n\nif __name__ == '__main__':\n    solve()`,
      typescript: `// TypeScript Solution\nfunction twoSum(nums: number[], target: number): number[] {\n    const map = new Map<number, number>();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff)!, i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`
    }
  },
  {
    id: "q_02",
    title: "Palindrome Number",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer x, return true if x is a palindrome integer, or false otherwise. An integer is a palindrome when it reads the same forward and backward.",
    inputFormat: "A single integer x.",
    outputFormat: "Print 'true' or 'false'.",
    sampleTests: [
      { input: "121", output: "true", explanation: "121 reads as 121 from both directions." },
      { input: "-121", output: "false", explanation: "From left to right it reads -121. From right to left it becomes 121-." }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long x;\n    cin >> x;\n    // Check if x is palindrome\n    return 0;\n}`,
      python: `x = input().strip()\nprint('true' if x == x[::-1] else 'false')`,
      typescript: `function isPalindrome(x: number): boolean {\n    const s = x.toString();\n    return s === s.split('').reverse().join('');\n}`
    }
  },
  {
    id: "q_03",
    title: "Roman to Integer",
    difficulty: "Easy",
    points: 120,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a roman numeral string, convert it to an integer. Symbol values: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.",
    inputFormat: "A single string containing Roman numerals.",
    outputFormat: "Print the corresponding integer.",
    sampleTests: [
      { input: "III", output: "3" },
      { input: "LVIII", output: "58", explanation: "L = 50, V = 5, III = 3." }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    // Convert Roman numeral to integer\n    return 0;\n}`,
      python: `s = input().strip()\n# Convert Roman numeral to integer\nprint(0)`,
      typescript: `function romanToInt(s: string): number {\n    // Roman conversion logic\n    return 0;\n}`
    }
  },
  {
    id: "q_04",
    title: "Valid Parentheses",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a string s containing just characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by same type in correct order.",
    inputFormat: "A single string s of brackets.",
    outputFormat: "Print 'true' or 'false'.",
    sampleTests: [
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    // Stack based matching\n    return 0;\n}`,
      python: `s = input().strip()\n# Verify valid bracket matching\nprint('true')`,
      typescript: `function isValid(s: string): boolean {\n    const stack: string[] = [];\n    // Implement stack matching\n    return true;\n}`
    }
  },
  {
    id: "q_05",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given two sorted integer arrays A and B. Merge them into a single sorted list and print the elements.",
    inputFormat: "First line: size N and M. Second line: N sorted integers of array A. Third line: M sorted integers of array B.",
    outputFormat: "Print the merged sorted elements separated by a space.",
    sampleTests: [
      { input: "3 3\n1 2 4\n1 3 4", output: "1 1 2 3 4 4" },
      { input: "0 1\n\n0", output: "0" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<int> a(n), b(m);\n    for(int &x : a) cin >> x;\n    for(int &x : b) cin >> x;\n    // Merge two sorted arrays\n    return 0;\n}`,
      python: `import sys\ndata = sys.stdin.read().split()\nif data:\n    n, m = int(data[0]), int(data[1])\n    # Merge sorted elements\n`,
      typescript: `function mergeSorted(a: number[], b: number[]): number[] {\n    return [...a, ...b].sort((x, y) => x - y);\n}`
    }
  },
  {
    id: "q_06",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer array nums sorted in non-decreasing order, remove duplicates in-place such that each unique element appears only once. Return and print the count of unique elements followed by the elements.",
    inputFormat: "First line: N. Second line: N sorted integers.",
    outputFormat: "Print unique count K, then the K unique elements.",
    sampleTests: [
      { input: "3\n1 1 2", output: "2\n1 2" },
      { input: "5\n0 0 1 1 2", output: "3\n0 1 2" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i = 0; i < n; i++) cin >> nums[i];\n    // In-place deduplication\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nans = sorted(list(set(nums)))\nprint(len(ans))\nprint(*(ans))`,
      typescript: `function removeDuplicates(nums: number[]): number {\n    // Deduplicate array\n    return 0;\n}`
    }
  },
  {
    id: "q_07",
    title: "Search Insert Position",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order in O(log n) time.",
    inputFormat: "Line 1: N and target. Line 2: N sorted distinct integers.",
    outputFormat: "Print the index.",
    sampleTests: [
      { input: "4 5\n1 3 5 6", output: "2" },
      { input: "4 2\n1 3 5 6", output: "1" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, target; cin >> n >> target;\n    vector<int> a(n);\n    for(int &x : a) cin >> x;\n    // Binary search insert position\n    return 0;\n}`,
      python: `import bisect\nn, target = map(int, input().split())\nnums = list(map(int, input().split()))\nprint(bisect.bisect_left(nums, target))`,
      typescript: `function searchInsert(nums: number[], target: number): number {\n    let l = 0, r = nums.length - 1;\n    while(l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        if(nums[mid] === target) return mid;\n        if(nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return l;\n}`
    }
  },
  {
    id: "q_08",
    title: "Length of Last Word",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a string s consisting of words and spaces, return the length of the last word in the string.",
    inputFormat: "A single line containing words separated by spaces.",
    outputFormat: "Print the length of the last word.",
    sampleTests: [
      { input: "Hello World", output: "5" },
      { input: "   fly me   to   the moon  ", output: "4" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string line; getline(cin, line);\n    // Find length of last word\n    return 0;\n}`,
      python: `import sys\ns = sys.stdin.read().strip()\nwords = s.split()\nprint(len(words[-1]) if words else 0)`,
      typescript: `function lengthOfLastWord(s: string): number {\n    const words = s.trim().split(/\\s+/);\n    return words[words.length - 1].length;\n}`
    }
  },
  {
    id: "q_09",
    title: "Plus One",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given a large integer represented as an integer array of digits. Increment the large integer by one and print the resulting digits.",
    inputFormat: "First line: N. Second line: N digits of the number.",
    outputFormat: "Print resulting digits separated by a space.",
    sampleTests: [
      { input: "3\n1 2 3", output: "1 2 4" },
      { input: "1\n9", output: "1 0" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    vector<int> d(n);\n    for(int &x : d) cin >> x;\n    // Add 1 with carry\n    return 0;\n}`,
      python: `n = int(input())\ndigits = list(map(int, input().split()))\n# Add one\n`,
      typescript: `function plusOne(digits: number[]): number[] {\n    for (let i = digits.length - 1; i >= 0; i--) {\n        if (digits[i] < 9) { digits[i]++; return digits; }\n        digits[i] = 0;\n    }\n    return [1, ...digits];\n}`
    }
  },
  {
    id: "q_10",
    title: "Square Root Integer",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.",
    inputFormat: "A single integer x.",
    outputFormat: "Print the floor of sqrt(x).",
    sampleTests: [
      { input: "4", output: "2" },
      { input: "8", output: "2", explanation: "The square root of 8 is 2.82842..., so floor is 2." }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long x; cin >> x;\n    long long l = 0, r = x, ans = 0;\n    while(l <= r) {\n        long long mid = l + (r - l) / 2;\n        if(mid * mid <= x) { ans = mid; l = mid + 1; }\n        else r = mid - 1;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `import math\nx = int(input())\nprint(math.isqrt(x))`,
      typescript: `function mySqrt(x: number): number {\n    return Math.floor(Math.sqrt(x));\n}`
    }
  },
  {
    id: "q_11",
    title: "Climbing Stairs",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb either 1 or 2 steps. In how many distinct ways can you climb to the top?",
    inputFormat: "A single integer n.",
    outputFormat: "Print the total number of distinct ways.",
    sampleTests: [
      { input: "2", output: "2", explanation: "1. 1 step + 1 step, 2. 2 steps" },
      { input: "3", output: "3", explanation: "1. 1+1+1, 2. 1+2, 3. 2+1" }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    // DP Fibonacci ways\n    return 0;\n}`,
      python: `n = int(input())\na, b = 1, 1\nfor _ in range(n - 1):\n    a, b = b, a + b\nprint(b)`,
      typescript: `function climbStairs(n: number): number {\n    let a = 1, b = 1;\n    for (let i = 1; i < n; i++) {\n        [a, b] = [b, a + b];\n    }\n    return b;\n}`
    }
  },
  {
    id: "q_12",
    title: "Single Number",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one in linear time and constant extra space.",
    inputFormat: "First line: N. Second line: N space-separated integers.",
    outputFormat: "Print the single unique element.",
    sampleTests: [
      { input: "3\n2 2 1", output: "1" },
      { input: "5\n4 1 2 1 2", output: "4" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    int ans = 0;\n    for(int i = 0; i < n; i++) {\n        int x; cin >> x;\n        ans ^= x;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nans = 0\nfor x in nums: ans ^= x\nprint(ans)`,
      typescript: `function singleNumber(nums: number[]): number {\n    return nums.reduce((acc, curr) => acc ^ curr, 0);\n}`
    }
  },
  {
    id: "q_13",
    title: "Majority Element",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.",
    inputFormat: "Line 1: N. Line 2: N space-separated integers.",
    outputFormat: "Print the majority element.",
    sampleTests: [
      { input: "3\n3 2 3", output: "3" },
      { input: "7\n2 2 1 1 1 2 2", output: "2" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    // Boyer-Moore Voting Algorithm\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nnums.sort()\nprint(nums[n // 2])`,
      typescript: `function majorityElement(nums: number[]): number {\n    let candidate = 0, count = 0;\n    for (const num of nums) {\n        if (count === 0) candidate = num;\n        count += (num === candidate) ? 1 : -1;\n    }\n    return candidate;\n}`
    }
  },
  {
    id: "q_14",
    title: "Valid Anagram",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word formed by rearranging the letters of another word.",
    inputFormat: "Line 1: string s. Line 2: string t.",
    outputFormat: "Print 'true' or 'false'.",
    sampleTests: [
      { input: "anagram\nnagaram", output: "true" },
      { input: "rat\ncar", output: "false" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s, t; cin >> s >> t;\n    sort(s.begin(), s.end());\n    sort(t.begin(), t.end());\n    cout << (s == t ? "true" : "false") << endl;\n    return 0;\n}`,
      python: `s = input().strip()\nt = input().strip()\nprint('true' if sorted(s) == sorted(t) else 'false')`,
      typescript: `function isAnagram(s: string, t: string): boolean {\n    return s.split('').sort().join('') === t.split('').sort().join('');\n}`
    }
  },
  {
    id: "q_15",
    title: "Contains Duplicate",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    inputFormat: "Line 1: N. Line 2: N integers.",
    outputFormat: "Print 'true' or 'false'.",
    sampleTests: [
      { input: "4\n1 2 3 1", output: "true" },
      { input: "4\n1 2 3 4", output: "false" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    unordered_set<int> seen;\n    bool dup = false;\n    for(int i = 0; i < n; i++) {\n        int x; cin >> x;\n        if(seen.count(x)) dup = true;\n        seen.insert(x);\n    }\n    cout << (dup ? "true" : "false") << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nprint('true' if len(set(nums)) < len(nums) else 'false')`,
      typescript: `function containsDuplicate(nums: number[]): boolean {\n    return new Set(nums).size !== nums.length;\n}`
    }
  },
  {
    id: "q_16",
    title: "Missing Number",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    inputFormat: "Line 1: N. Line 2: N distinct integers in range [0, N].",
    outputFormat: "Print the missing integer.",
    sampleTests: [
      { input: "3\n3 0 1", output: "2", explanation: "Range is [0,3], 2 is missing." },
      { input: "9\n9 6 4 2 3 5 7 0 1", output: "8" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    long long expected = 1LL * n * (n + 1) / 2;\n    long long actual = 0;\n    for(int i = 0; i < n; i++) { int x; cin >> x; actual += x; }\n    cout << expected - actual << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nprint(n * (n + 1) // 2 - sum(nums))`,
      typescript: `function missingNumber(nums: number[]): number {\n    const n = nums.length;\n    return (n * (n + 1)) / 2 - nums.reduce((a, b) => a + b, 0);\n}`
    }
  },
  {
    id: "q_17",
    title: "Move Zeroes",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements in-place.",
    inputFormat: "Line 1: N. Line 2: N space-separated integers.",
    outputFormat: "Print the array with zeroes moved to the end.",
    sampleTests: [
      { input: "5\n0 1 0 3 12", output: "1 3 12 0 0" },
      { input: "1\n0", output: "0" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for(int &x : a) cin >> x;\n    // Move zeroes to end\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nnon_zero = [x for x in nums if x != 0]\nzeros = [0] * (n - len(non_zero))\nprint(*(non_zero + zeros))`,
      typescript: `function moveZeroes(nums: number[]): void {\n    let pos = 0;\n    for (let i = 0; i < nums.length; i++) {\n        if (nums[i] !== 0) nums[pos++] = nums[i];\n    }\n    while (pos < nums.length) nums[pos++] = 0;\n}`
    }
  },
  {
    id: "q_18",
    title: "Reverse String",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Write a function that reverses a string. The input string is given as a single word or sentence.",
    inputFormat: "A single line containing the string.",
    outputFormat: "Print the reversed string.",
    sampleTests: [
      { input: "hello", output: "olleh" },
      { input: "Hannah", output: "hannaH" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    reverse(s.begin(), s.end());\n    cout << s << endl;\n    return 0;\n}`,
      python: `s = input().strip()\nprint(s[::-1])`,
      typescript: `function reverseString(s: string): string {\n    return s.split('').reverse().join('');\n}`
    }
  },
  {
    id: "q_19",
    title: "Power of Two",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two if there exists an integer x such that n == 2^x.",
    inputFormat: "A single integer n.",
    outputFormat: "Print 'true' or 'false'.",
    sampleTests: [
      { input: "1", output: "true", explanation: "2^0 = 1" },
      { input: "16", output: "true", explanation: "2^4 = 16" },
      { input: "3", output: "false" }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n; cin >> n;\n    cout << ((n > 0 && (n & (n - 1)) == 0) ? "true" : "false") << endl;\n    return 0;\n}`,
      python: `n = int(input())\nprint('true' if n > 0 and (n & (n - 1)) == 0 else 'false')`,
      typescript: `function isPowerOfTwo(n: number): boolean {\n    return n > 0 && (n & (n - 1)) === 0;\n}`
    }
  },
  {
    id: "q_20",
    title: "Fizz Buzz",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer n, return a string array answer (1-indexed) where answer[i] == 'FizzBuzz' if i is divisible by 3 and 5, 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, or 'i' as string.",
    inputFormat: "A single integer n.",
    outputFormat: "Print the values space-separated from 1 to n.",
    sampleTests: [
      { input: "3", output: "1 2 Fizz" },
      { input: "5", output: "1 2 Fizz 4 Buzz" }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    for(int i = 1; i <= n; i++) {\n        if(i % 15 == 0) cout << "FizzBuzz ";\n        else if(i % 3 == 0) cout << "Fizz ";\n        else if(i % 5 == 0) cout << "Buzz ";\n        else cout << i << " ";\n    }\n    cout << endl;\n    return 0;\n}`,
      python: `n = int(input())\nres = []\nfor i in range(1, n + 1):\n    if i % 15 == 0: res.append("FizzBuzz")\n    elif i % 3 == 0: res.append("Fizz")\n    elif i % 5 == 0: res.append("Buzz")\n    else: res.append(str(i))\nprint(*(res))`,
      typescript: `function fizzBuzz(n: number): string[] {\n    return Array.from({ length: n }, (_, i) => {\n        const val = i + 1;\n        if (val % 15 === 0) return 'FizzBuzz';\n        if (val % 3 === 0) return 'Fizz';\n        if (val % 5 === 0) return 'Buzz';\n        return val.toString();\n    });\n}`
    }
  },
  {
    id: "q_21",
    title: "First Unique Character in a String",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a string s, find the first non-repeating character in it and return its 0-based index. If it does not exist, return -1.",
    inputFormat: "A single string s of lowercase English letters.",
    outputFormat: "Print the index of first unique character, or -1.",
    sampleTests: [
      { input: "leetcode", output: "0", explanation: "The character 'l' at index 0 does not occur again." },
      { input: "loveleetcode", output: "2", explanation: "'v' at index 2 is first unique." }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    vector<int> freq(26, 0);\n    for(char c : s) freq[c - 'a']++;\n    int ans = -1;\n    for(int i = 0; i < (int)s.size(); i++) {\n        if(freq[s[i] - 'a'] == 1) { ans = i; break; }\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `from collections import Counter\ns = input().strip()\nc = Counter(s)\nans = -1\nfor i, ch in enumerate(s):\n    if c[ch] == 1:\n        ans = i\n        break\nprint(ans)`,
      typescript: `function firstUniqChar(s: string): number {\n    const freq = new Map<string, number>();\n    for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);\n    for (let i = 0; i < s.length; i++) if (freq.get(s[i]) === 1) return i;\n    return -1;\n}`
    }
  },
  {
    id: "q_22",
    title: "Find the Difference",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given two strings s and t. String t is generated by random shuffling string s and then add one more letter at a random position. Return the letter that was added to t.",
    inputFormat: "Line 1: string s. Line 2: string t.",
    outputFormat: "Print the added character.",
    sampleTests: [
      { input: "abcd\nabcde", output: "e" },
      { input: "a\naa", output: "a" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s, t; cin >> s >> t;\n    char ch = 0;\n    for(char c : s) ch ^= c;\n    for(char c : t) ch ^= c;\n    cout << ch << endl;\n    return 0;\n}`,
      python: `s = input().strip()\nt = input().strip()\nch = 0\nfor c in s + t: ch ^= ord(c)\nprint(chr(ch))`,
      typescript: `function findTheDifference(s: string, t: string): string {\n    let code = 0;\n    for (const c of s + t) code ^= c.charCodeAt(0);\n    return String.fromCharCode(code);\n}`
    }
  },
  {
    id: "q_23",
    title: "Fibonacci Number",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Calculate F(n).",
    inputFormat: "A single integer n (0 <= n <= 30).",
    outputFormat: "Print F(n).",
    sampleTests: [
      { input: "2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
      { input: "4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    if (n <= 1) { cout << n << endl; return 0; }\n    int a = 0, b = 1;\n    for(int i = 2; i <= n; i++) {\n        int c = a + b; a = b; b = c;\n    }\n    cout << b << endl;\n    return 0;\n}`,
      python: `n = int(input())\na, b = 0, 1\nfor _ in range(n):\n    a, b = b, a + b\nprint(a)`,
      typescript: `function fib(n: number): number {\n    let a = 0, b = 1;\n    for (let i = 0; i < n; i++) [a, b] = [b, a + b];\n    return a;\n}`
    }
  },
  {
    id: "q_24",
    title: "Binary Search",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its 0-based index. Otherwise, return -1.",
    inputFormat: "Line 1: N and target. Line 2: N sorted distinct integers.",
    outputFormat: "Print the index or -1.",
    sampleTests: [
      { input: "6 9\n-1 0 3 5 9 12", output: "4" },
      { input: "6 2\n-1 0 3 5 9 12", output: "-1" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, target; cin >> n >> target;\n    vector<int> a(n);\n    for(int &x : a) cin >> x;\n    int l = 0, r = n - 1, ans = -1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(a[m] == target) { ans = m; break; }\n        if(a[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `import bisect\nn, target = map(int, input().split())\nnums = list(map(int, input().split()))\nidx = bisect.bisect_left(nums, target)\nprint(idx if idx < n and nums[idx] == target else -1)`,
      typescript: `function search(nums: number[], target: number): number {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const m = Math.floor((l + r) / 2);\n        if (nums[m] === target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`
    }
  },
  {
    id: "q_25",
    title: "Jewels and Stones",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.",
    inputFormat: "Line 1: string jewels. Line 2: string stones.",
    outputFormat: "Print the count of jewels.",
    sampleTests: [
      { input: "aA\naAAbbbb", output: "3" },
      { input: "z\nZZ", output: "0" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string jewels, stones; cin >> jewels >> stones;\n    unordered_set<char> j(jewels.begin(), jewels.end());\n    int ans = 0;\n    for(char s : stones) if(j.count(s)) ans++;\n    cout << ans << endl;\n    return 0;\n}`,
      python: `j = set(input().strip())\ns = input().strip()\nprint(sum(1 for c in s if c in j))`,
      typescript: `function numJewelsInStones(jewels: string, stones: string): number {\n    const jSet = new Set(jewels);\n    return [...stones].filter(c => jSet.has(c)).length;\n}`
    }
  },
  {
    id: "q_26",
    title: "Defanging an IP Address",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a valid (IPv4) IP address, return a defanged version of that IP address. A defanged IP address replaces every period '.' with '[.]'.",
    inputFormat: "A valid IPv4 string.",
    outputFormat: "Print the defanged IP string.",
    sampleTests: [
      { input: "1.1.1.1", output: "1[.]1[.]1[.]1" },
      { input: "255.100.50.0", output: "255[.]100[.]50[.]0" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    for(char c : s) {\n        if(c == '.') cout << "[.]";\n        else cout << c;\n    }\n    cout << endl;\n    return 0;\n}`,
      python: `print(input().strip().replace('.', '[.]'))`,
      typescript: `function defangIPaddr(address: string): string {\n    return address.split('.').join('[.]');\n}`
    }
  },
  {
    id: "q_27",
    title: "Running Sum of 1d Array",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]). Return the running sum of nums.",
    inputFormat: "Line 1: N. Line 2: N integers.",
    outputFormat: "Print the running sum array separated by space.",
    sampleTests: [
      { input: "4\n1 2 3 4", output: "1 3 6 10" },
      { input: "5\n1 1 1 1 1", output: "1 2 3 4 5" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    long long cur = 0;\n    for(int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        cur += x;\n        cout << cur << " ";\n    }\n    cout << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\ns = 0\nres = []\nfor x in nums:\n    s += x\n    res.append(s)\nprint(*(res))`,
      typescript: `function runningSum(nums: number[]): number[] {\n    let sum = 0;\n    return nums.map(x => sum += x);\n}`
    }
  },
  {
    id: "q_28",
    title: "Richest Customer Wealth",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given an m x n integer grid accounts where accounts[i][j] is the amount of money customer i has in bank j. Return the wealth that the richest customer has (maximum row sum).",
    inputFormat: "Line 1: M (rows) and N (cols). Next M lines contain N integers.",
    outputFormat: "Print maximum customer wealth.",
    sampleTests: [
      { input: "2 3\n1 2 3\n3 2 1", output: "6" },
      { input: "3 2\n1 5\n7 3\n3 5", output: "10" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int m, n; cin >> m >> n;\n    long long maxWealth = 0;\n    for(int i = 0; i < m; i++) {\n        long long cur = 0;\n        for(int j = 0; j < n; j++) { long long x; cin >> x; cur += x; }\n        maxWealth = max(maxWealth, cur);\n    }\n    cout << maxWealth << endl;\n    return 0;\n}`,
      python: `m, n = map(int, input().split())\nmax_w = 0\nfor _ in range(m):\n    row = list(map(int, input().split()))\n    max_w = max(max_w, sum(row))\nprint(max_w)`,
      typescript: `function maximumWealth(accounts: number[][]): number {\n    return Math.max(...accounts.map(row => row.reduce((a, b) => a + b, 0)));\n}`
    }
  },
  {
    id: "q_29",
    title: "Number of Good Pairs",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array of integers nums, return the number of good pairs. A pair (i, j) is called good if nums[i] == nums[j] and i < j.",
    inputFormat: "Line 1: N. Line 2: N integers.",
    outputFormat: "Print the count of good pairs.",
    sampleTests: [
      { input: "6\n1 2 3 1 1 3", output: "4", explanation: "4 good pairs: (0,3), (0,4), (3,4), (2,5)" },
      { input: "4\n1 1 1 1", output: "6" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    unordered_map<int, int> cnt;\n    long long ans = 0;\n    for(int i = 0; i < n; i++) {\n        int x; cin >> x;\n        ans += cnt[x]++;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `from collections import Counter\nn = int(input())\nnums = list(map(int, input().split()))\nc = Counter(nums)\nans = sum(v * (v - 1) // 2 for v in c.values())\nprint(ans)`,
      typescript: `function numIdenticalPairs(nums: number[]): number {\n    const map = new Map<number, number>();\n    let ans = 0;\n    for (const num of nums) {\n        const count = map.get(num) || 0;\n        ans += count;\n        map.set(num, count + 1);\n    }\n    return ans;\n}`
    }
  },
  {
    id: "q_30",
    title: "Shuffle the Array",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given the array nums consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn]. Return the array in the form [x1,y1,x2,y2,...,xn,yn].",
    inputFormat: "Line 1: n. Line 2: 2n space-separated integers.",
    outputFormat: "Print the interleaved elements separated by space.",
    sampleTests: [
      { input: "3\n2 5 1 3 4 7", output: "2 3 5 4 1 7" },
      { input: "4\n1 2 3 4 4 3 2 1", output: "1 4 2 3 3 2 4 1" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    vector<int> a(2 * n);\n    for(int &x : a) cin >> x;\n    for(int i = 0; i < n; i++) cout << a[i] << " " << a[i + n] << " ";\n    cout << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nres = []\nfor i in range(n):\n    res.append(nums[i])\n    res.append(nums[i + n])\nprint(*(res))`,
      typescript: `function shuffle(nums: number[], n: number): number[] {\n    const res: number[] = [];\n    for (let i = 0; i < n; i++) { res.push(nums[i], nums[i + n]); }\n    return res;\n}`
    }
  },
  {
    id: "q_31",
    title: "Subtract Product and Sum of Digits",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer number n, return the difference between the product of its digits and the sum of its digits.",
    inputFormat: "A single integer n.",
    outputFormat: "Print (Product of digits) - (Sum of digits).",
    sampleTests: [
      { input: "234", output: "15", explanation: "Product = 2*3*4 = 24. Sum = 2+3+4 = 9. Diff = 24 - 9 = 15." },
      { input: "4421", output: "21" }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    long long prod = 1, sum = 0;\n    while(n > 0) {\n        int d = n % 10;\n        prod *= d;\n        sum += d;\n        n /= 10;\n    }\n    cout << prod - sum << endl;\n    return 0;\n}`,
      python: `s = input().strip()\ndigits = [int(c) for c in s]\np = 1\nfor d in digits: p *= d\nprint(p - sum(digits))`,
      typescript: `function subtractProductAndSum(n: number): number {\n    const digits = n.toString().split('').map(Number);\n    const prod = digits.reduce((a, b) => a * b, 1);\n    const sum = digits.reduce((a, b) => a + b, 0);\n    return prod - sum;\n}`
    }
  },
  {
    id: "q_32",
    title: "Maximum Number of Words Found in Sentences",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "A sentence is a list of words that are separated by a single space with no leading or trailing spaces. You are given an array of strings sentences. Return the maximum number of words that appear in a single sentence.",
    inputFormat: "Line 1: N (number of sentences). Next N lines: sentence text.",
    outputFormat: "Print the maximum word count.",
    sampleTests: [
      { input: "3\nalice and bob love leetcode\ni think so too\nthis is great thanks very much", output: "6" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n; string s; getline(cin, s);\n    int maxW = 0;\n    while(n--) {\n        getline(cin, s);\n        stringstream ss(s);\n        string w; int cnt = 0;\n        while(ss >> w) cnt++;\n        maxW = max(maxW, cnt);\n    }\n    cout << maxW << endl;\n    return 0;\n}`,
      python: `import sys\nlines = sys.stdin.read().splitlines()\nif lines:\n    n = int(lines[0])\n    print(max(len(line.split()) for line in lines[1:1+n]) if n > 0 else 0)`,
      typescript: `function mostWordsFound(sentences: string[]): number {\n    return Math.max(...sentences.map(s => s.trim().split(/\\s+/).length));\n}`
    }
  },
  {
    id: "q_33",
    title: "How Many Numbers Are Smaller Than the Current Number",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] count the number of valid j's such that j != i and nums[j] < nums[i].",
    inputFormat: "Line 1: N. Line 2: N space-separated integers.",
    outputFormat: "Print counts separated by space.",
    sampleTests: [
      { input: "5\n8 1 2 2 3", output: "4 0 1 1 3" },
      { input: "4\n6 5 4 8", output: "2 1 0 3" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for(int &x : a) cin >> x;\n    for(int i = 0; i < n; i++) {\n        int cnt = 0;\n        for(int j = 0; j < n; j++) if(a[j] < a[i]) cnt++;\n        cout << cnt << " ";\n    }\n    cout << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\nsorted_nums = sorted(nums)\nprint(*(sorted_nums.index(x) for x in nums))`,
      typescript: `function smallerNumbersThanCurrent(nums: number[]): number[] {\n    const sorted = [...nums].sort((a, b) => a - b);\n    return nums.map(x => sorted.indexOf(x));\n}`
    }
  },
  {
    id: "q_34",
    title: "Maximum Subarray",
    difficulty: "Medium",
    points: 150,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum (Kadane's Algorithm).",
    inputFormat: "Line 1: N. Line 2: N integers.",
    outputFormat: "Print the maximum subarray sum.",
    sampleTests: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "1\n1", output: "1" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    long long maxSoFar = -1e18, curMax = 0;\n    for(int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        curMax = max(x, curMax + x);\n        maxSoFar = max(maxSoFar, curMax);\n    }\n    cout << maxSoFar << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = list(map(int, input().split()))\ncur = ans = nums[0]\nfor x in nums[1:]:\n    cur = max(x, cur + x)\n    ans = max(ans, cur)\nprint(ans)`,
      typescript: `function maxSubArray(nums: number[]): number {\n    let cur = nums[0], max = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        cur = Math.max(nums[i], cur + nums[i]);\n        max = Math.max(max, cur);\n    }\n    return max;\n}`
    }
  },
  {
    id: "q_35",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    points: 100,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit.",
    inputFormat: "Line 1: N. Line 2: N stock prices.",
    outputFormat: "Print maximum profit (0 if none).",
    sampleTests: [
      { input: "6\n7 1 5 3 6 4", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      { input: "5\n7 6 4 3 1", output: "0" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    int minP = 1e9, maxProfit = 0;\n    for(int i = 0; i < n; i++) {\n        int p; cin >> p;\n        minP = min(minP, p);\n        maxProfit = max(maxProfit, p - minP);\n    }\n    cout << maxProfit << endl;\n    return 0;\n}`,
      python: `n = int(input())\nprices = list(map(int, input().split()))\nmin_p, profit = float('inf'), 0\nfor p in prices:\n    min_p = min(min_p, p)\n    profit = max(profit, p - min_p)\nprint(profit)`,
      typescript: `function maxProfit(prices: number[]): number {\n    let min = Infinity, profit = 0;\n    for (const p of prices) {\n        min = Math.min(min, p);\n        profit = Math.max(profit, p - min);\n    }\n    return profit;\n}`
    }
  },
  {
    id: "q_36",
    title: "Convert Temperature",
    difficulty: "Easy",
    points: 60,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given a non-negative floating point number rounded to two decimal places celsius, that denotes the temperature in Celsius. Convert to Kelvin and Fahrenheit: Kelvin = Celsius + 273.15, Fahrenheit = Celsius * 1.80 + 32.00.",
    inputFormat: "A single floating point number celsius.",
    outputFormat: "Print Kelvin and Fahrenheit separated by space.",
    sampleTests: [
      { input: "36.50", output: "309.65 97.70" },
      { input: "122.11", output: "395.26 251.80" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double c; cin >> c;\n    cout << fixed << setprecision(2) << (c + 273.15) << " " << (c * 1.8 + 32.0) << endl;\n    return 0;\n}`,
      python: `c = float(input())\nprint(f"{c + 273.15:.2f} {c * 1.8 + 32:.2f}")`,
      typescript: `function convertTemperature(celsius: number): number[] {\n    return [celsius + 273.15, celsius * 1.8 + 32];\n}`
    }
  },
  {
    id: "q_37",
    title: "Smallest Even Multiple",
    difficulty: "Easy",
    points: 60,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a positive integer n, return the smallest positive integer that is a multiple of both 2 and n.",
    inputFormat: "A positive integer n.",
    outputFormat: "Print the smallest even multiple.",
    sampleTests: [
      { input: "5", output: "10" },
      { input: "6", output: "6" }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    cout << (n % 2 == 0 ? n : n * 2) << endl;\n    return 0;\n}`,
      python: `n = int(input())\nprint(n if n % 2 == 0 else n * 2)`,
      typescript: `function smallestEvenMultiple(n: number): number {\n    return n % 2 === 0 ? n : n * 2;\n}`
    }
  },
  {
    id: "q_38",
    title: "Matrix Diagonal Sum",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a square matrix mat of size n x n, return the sum of the matrix diagonals. Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.",
    inputFormat: "Line 1: N. Next N lines: N integers each.",
    outputFormat: "Print total diagonal sum.",
    sampleTests: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", output: "25", explanation: "Diagonals: 1 + 5 + 9 + 3 + 7 = 25 (center 5 is counted once)." }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    long long sum = 0;\n    for(int i = 0; i < n; i++) {\n        for(int j = 0; j < n; j++) {\n            int val; cin >> val;\n            if(i == j || i + j == n - 1) sum += val;\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}`,
      python: `n = int(input())\ntotal = 0\nfor i in range(n):\n    row = list(map(int, input().split()))\n    total += row[i]\n    if i != n - 1 - i:\n        total += row[n - 1 - i]\nprint(total)`,
      typescript: `function diagonalSum(mat: number[][]): number {\n    const n = mat.length;\n    let sum = 0;\n    for (let i = 0; i < n; i++) {\n        sum += mat[i][i];\n        if (i !== n - 1 - i) sum += mat[i][n - 1 - i];\n    }\n    return sum;\n}`
    }
  },
  {
    id: "q_39",
    title: "Maximum Product of Two Elements in an Array",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given the array of integers nums, you will choose two different indices i and j of that array. Return the maximum value of (nums[i]-1)*(nums[j]-1).",
    inputFormat: "Line 1: N. Line 2: N positive integers.",
    outputFormat: "Print maximum product.",
    sampleTests: [
      { input: "4\n3 4 5 2", output: "12", explanation: "(5-1)*(4-1) = 4*3 = 12." },
      { input: "4\n1 5 4 5", output: "16" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for(int &x : a) cin >> x;\n    sort(a.rbegin(), a.rend());\n    cout << (a[0] - 1) * (a[1] - 1) << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = sorted(list(map(int, input().split())), reverse=True)\nprint((nums[0] - 1) * (nums[1] - 1))`,
      typescript: `function maxProduct(nums: number[]): number {\n    nums.sort((a, b) => b - a);\n    return (nums[0] - 1) * (nums[1] - 1);\n}`
    }
  },
  {
    id: "q_40",
    title: "Unique Number of Occurrences",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array of integers arr, return true if the number of occurrences of each value in the array is unique, or false otherwise.",
    inputFormat: "Line 1: N. Line 2: N space-separated integers.",
    outputFormat: "Print 'true' or 'false'.",
    sampleTests: [
      { input: "6\n1 2 2 1 1 3", output: "true", explanation: "1 occurs 3 times, 2 occurs 2 times, 3 occurs 1 time." },
      { input: "2\n1 2", output: "false" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    unordered_map<int, int> cnt;\n    for(int i = 0; i < n; i++) { int x; cin >> x; cnt[x]++; }\n    unordered_set<int> freqs;\n    for(auto &p : cnt) freqs.insert(p.second);\n    cout << (freqs.size() == cnt.size() ? "true" : "false") << endl;\n    return 0;\n}`,
      python: `from collections import Counter\nn = int(input())\nnums = list(map(int, input().split()))\nc = Counter(nums)\nprint('true' if len(set(c.values())) == len(c.values()) else 'false')`,
      typescript: `function uniqueOccurrences(arr: number[]): boolean {\n    const freq = new Map<number, number>();\n    for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);\n    return new Set(freq.values()).size === freq.size;\n}`
    }
  },
  {
    id: "q_41",
    title: "To Lower Case",
    difficulty: "Easy",
    points: 60,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a string s, return the string after replacing every uppercase letter with the corresponding lowercase letter.",
    inputFormat: "A single string s.",
    outputFormat: "Print the lowercase string.",
    sampleTests: [
      { input: "Hello", output: "hello" },
      { input: "LOVELY", output: "lovely" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    for(char &c : s) c = tolower(c);\n    cout << s << endl;\n    return 0;\n}`,
      python: `print(input().strip().lower())`,
      typescript: `function toLowerCase(s: string): string {\n    return s.toLowerCase();\n}`
    }
  },
  {
    id: "q_42",
    title: "Number of Steps to Reduce a Number to Zero",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an integer num, return the number of steps to reduce it to zero. In one step, if current number is even, divide by 2, otherwise subtract 1.",
    inputFormat: "A single integer num.",
    outputFormat: "Print number of steps.",
    sampleTests: [
      { input: "14", output: "6", explanation: "14 -> 7 -> 6 -> 3 -> 2 -> 1 -> 0 (6 steps)." },
      { input: "8", output: "4" }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    int steps = 0;\n    while(n > 0) {\n        if(n % 2 == 0) n /= 2;\n        else n--;\n        steps++;\n    }\n    cout << steps << endl;\n    return 0;\n}`,
      python: `n = int(input())\nsteps = 0\nwhile n > 0:\n    n = n // 2 if n % 2 == 0 else n - 1\n    steps += 1\nprint(steps)`,
      typescript: `function numberOfSteps(num: number): number {\n    let steps = 0;\n    while (num > 0) {\n        num = num % 2 === 0 ? num / 2 : num - 1;\n        steps++;\n    }\n    return steps;\n}`
    }
  },
  {
    id: "q_43",
    title: "Find Numbers with Even Number of Digits",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given an array nums of integers, return how many of them contain an even number of digits.",
    inputFormat: "Line 1: N. Line 2: N positive integers.",
    outputFormat: "Print the count of numbers with even digit lengths.",
    sampleTests: [
      { input: "5\n12 345 2 6 7896", output: "2", explanation: "12 and 7896 have 2 and 4 digits (even)." },
      { input: "4\n555 901 482 1771", output: "1" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    int count = 0;\n    for(int i = 0; i < n; i++) {\n        string s; cin >> s;\n        if(s.length() % 2 == 0) count++;\n    }\n    cout << count << endl;\n    return 0;\n}`,
      python: `n = int(input())\nnums = input().split()\nprint(sum(1 for s in nums if len(s) % 2 == 0))`,
      typescript: `function findNumbers(nums: number[]): number {\n    return nums.filter(x => x.toString().length % 2 === 0).length;\n}`
    }
  },
  {
    id: "q_44",
    title: "Count Asterisks",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given a string s, where every two consecutive vertical bars '|' are grouped into a pair. Return the number of '*' in s, excluding each '*' between each pair of '|'.",
    inputFormat: "A single string s.",
    outputFormat: "Print the count of asterisks outside vertical bars.",
    sampleTests: [
      { input: "l|*e*et|c**o|*de|", output: "2" },
      { input: "iamprogrammer", output: "0" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    bool inside = false;\n    int ans = 0;\n    for(char c : s) {\n        if(c == '|') inside = !inside;\n        else if(c == '*' && !inside) ans++;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `s = input().strip()\ninside = False\nans = 0\nfor c in s:\n    if c == '|': inside = not inside\n    elif c == '*' and not inside: ans += 1\nprint(ans)`,
      typescript: `function countAsterisks(s: string): number {\n    let inside = false, count = 0;\n    for (const c of s) {\n        if (c === '|') inside = !inside;\n        else if (c === '*' && !inside) count++;\n    }\n    return count;\n}`
    }
  },
  {
    id: "q_45",
    title: "Truncate Sentence",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "A sentence is a list of words that are separated by a single space with no leading or trailing spaces. You are given a sentence s and an integer k. Truncate s such that it contains only the first k words.",
    inputFormat: "Line 1: k. Line 2: sentence s.",
    outputFormat: "Print the truncated sentence.",
    sampleTests: [
      { input: "4\nHello how are you Contestant", output: "Hello how are you" },
      { input: "4\nWhat is the solution to this problem", output: "What is the solution" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int k; cin >> k; string temp; getline(cin, temp);\n    string s; getline(cin, s);\n    stringstream ss(s);\n    string w; int cnt = 0;\n    while(ss >> w && cnt < k) {\n        if(cnt > 0) cout << " ";\n        cout << w;\n        cnt++;\n    }\n    cout << endl;\n    return 0;\n}`,
      python: `k = int(input())\ns = input().strip()\nwords = s.split()\nprint(" ".join(words[:k]))`,
      typescript: `function truncateSentence(s: string, k: number): string {\n    return s.split(' ').slice(0, k).join(' ');\n}`
    }
  },
  {
    id: "q_46",
    title: "Kids With the Greatest Number of Candies",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "There are n kids with candies. You are given an integer array candies, where candies[i] represents the number of candies the ith kid has, and an integer extraCandies. Return a boolean array result where result[i] is true if giving the ith kid all extraCandies makes them have greatest or equal to maximum.",
    inputFormat: "Line 1: N and extraCandies. Line 2: N space-separated integers.",
    outputFormat: "Print 'true' or 'false' for each kid separated by space.",
    sampleTests: [
      { input: "5 3\n2 3 5 1 3", output: "true true true false true" },
      { input: "3 1\n4 2 1", output: "true false false" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, extra; cin >> n >> extra;\n    vector<int> c(n);\n    int mx = 0;\n    for(int &x : c) { cin >> x; mx = max(mx, x); }\n    for(int x : c) cout << (x + extra >= mx ? "true" : "false") << " ";\n    cout << endl;\n    return 0;\n}`,
      python: `n, extra = map(int, input().split())\ncandies = list(map(int, input().split()))\nmx = max(candies)\nprint(*( "true" if x + extra >= mx else "false" for x in candies ))`,
      typescript: `function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {\n    const max = Math.max(...candies);\n    return candies.map(c => c + extraCandies >= max);\n}`
    }
  },
  {
    id: "q_47",
    title: "Count Equal and Divisible Pairs in an Array",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) where 0 <= i < j < n, such that nums[i] == nums[j] and (i * j) is divisible by k.",
    inputFormat: "Line 1: N and k. Line 2: N integers.",
    outputFormat: "Print the count of matching pairs.",
    sampleTests: [
      { input: "7 2\n3 1 2 2 2 1 3", output: "4", explanation: "(0, 6), (2, 3), (2, 4), (3, 4)." }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, k; cin >> n >> k;\n    vector<int> a(n);\n    for(int &x : a) cin >> x;\n    int ans = 0;\n    for(int i = 0; i < n; i++) {\n        for(int j = i + 1; j < n; j++) {\n            if(a[i] == a[j] && (i * j) % k == 0) ans++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `n, k = map(int, input().split())\nnums = list(map(int, input().split()))\nans = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        if nums[i] == nums[j] and (i * j) % k == 0:\n            ans += 1\nprint(ans)`,
      typescript: `function countPairs(nums: number[], k: number): number {\n    let ans = 0;\n    for (let i = 0; i < nums.length; i++) {\n        for (let j = i + 1; j < nums.length; j++) {\n            if (nums[i] === nums[j] && (i * j) % k === 0) ans++;\n        }\n    }\n    return ans;\n}`
    }
  },
  {
    id: "q_48",
    title: "Check if Two String Arrays are Equivalent",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise. A string is represented by an array if the array elements concatenated in order form the string.",
    inputFormat: "Line 1: N and M. Line 2: N space-separated strings of word1. Line 3: M space-separated strings of word2.",
    outputFormat: "Print 'true' or 'false'.",
    sampleTests: [
      { input: "2 2\nab c\na bc", output: "true", explanation: "'ab' + 'c' == 'a' + 'bc' == 'abc'" },
      { input: "2 2\na cb\nab c", output: "false" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m; cin >> n >> m;\n    string s1 = "", s2 = "";\n    for(int i = 0; i < n; i++) { string w; cin >> w; s1 += w; }\n    for(int i = 0; i < m; i++) { string w; cin >> w; s2 += w; }\n    cout << (s1 == s2 ? "true" : "false") << endl;\n    return 0;\n}`,
      python: `n, m = map(int, input().split())\nw1 = input().split()\nw2 = input().split()\nprint('true' if ''.join(w1) == ''.join(w2) else 'false')`,
      typescript: `function arrayStringsAreEqual(word1: string[], word2: string[]): boolean {\n    return word1.join('') === word2.join('');\n}`
    }
  },
  {
    id: "q_49",
    title: "Goal Parser Interpretation",
    difficulty: "Easy",
    points: 70,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You own a Goal Parser that can interpret a string command. The command consists of an alphabet of 'G', '()' and/or '(al)'. Interpret the string by replacing '()' with 'o', and '(al)' with 'al'.",
    inputFormat: "A single string command.",
    outputFormat: "Print the interpreted string.",
    sampleTests: [
      { input: "G()(al)", output: "Goal" },
      { input: "G()()()()(al)", output: "Gooooal" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    string ans = "";\n    for(int i = 0; i < (int)s.size(); i++) {\n        if(s[i] == 'G') ans += 'G';\n        else if(s[i] == '(') {\n            if(s[i+1] == ')') { ans += 'o'; i++; }\n            else { ans += "al"; i += 3; }\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `s = input().strip()\nprint(s.replace('()', 'o').replace('(al)', 'al'))`,
      typescript: `function interpret(command: string): string {\n    return command.split('()').join('o').split('(al)').join('al');\n}`
    }
  },
  {
    id: "q_50",
    title: "Count Items Matching a Rule",
    difficulty: "Easy",
    points: 80,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given an array items, where each items[i] = [type, color, name] describes the ith item. You are also given a ruleKey and ruleValue. Return the number of items that match the rule.",
    inputFormat: "Line 1: N, ruleKey, ruleValue. Next N lines: type color name.",
    outputFormat: "Print number of matching items.",
    sampleTests: [
      { input: "3 color silver\nphone blue pixel\ncomputer silver lenovo\nphone gold iphone", output: "1" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; string key, val;\n    cin >> n >> key >> val;\n    int keyIdx = (key == "type" ? 0 : key == "color" ? 1 : 2);\n    int ans = 0;\n    for(int i = 0; i < n; i++) {\n        string row[3];\n        cin >> row[0] >> row[1] >> row[2];\n        if(row[keyIdx] == val) ans++;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `line = input().split()\nn, key, val = int(line[0]), line[1], line[2]\nidx = 0 if key == 'type' else 1 if key == 'color' else 2\nans = 0\nfor _ in range(n):\n    item = input().split()\n    if item[idx] == val: ans += 1\nprint(ans)`,
      typescript: `function countMatches(items: string[][], ruleKey: string, ruleValue: string): number {\n    const idx = ruleKey === 'type' ? 0 : ruleKey === 'color' ? 1 : 2;\n    return items.filter(item => item[idx] === ruleValue).length;\n}`
    }
  },
  {
    id: "q_51",
    title: "Peak Index in a Mountain Array",
    difficulty: "Easy",
    points: 90,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "An array arr is a mountain if arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]. Return the index of the peak element in O(log n).",
    inputFormat: "Line 1: N. Line 2: N integers of mountain array.",
    outputFormat: "Print the index of the peak.",
    sampleTests: [
      { input: "3\n0 1 0", output: "1" },
      { input: "4\n0 2 1 0", output: "1" }
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for(int &x : a) cin >> x;\n    int l = 0, r = n - 1;\n    while(l < r) {\n        int m = l + (r - l) / 2;\n        if(a[m] < a[m + 1]) l = m + 1;\n        else r = m;\n    }\n    cout << l << endl;\n    return 0;\n}`,
      python: `n = int(input())\narr = list(map(int, input().split()))\nl, r = 0, n - 1\nwhile l < r:\n    m = (l + r) // 2\n    if arr[m] < arr[m + 1]: l = m + 1\n    else: r = m\nprint(l)`,
      typescript: `function peakIndexInMountainArray(arr: number[]): number {\n    let l = 0, r = arr.length - 1;\n    while (l < r) {\n        const m = Math.floor((l + r) / 2);\n        if (arr[m] < arr[m + 1]) l = m + 1;\n        else r = m;\n    }\n    return l;\n}`
    }
  },
  {
    id: "q_52",
    title: "Maximum 69 Number",
    difficulty: "Easy",
    points: 60,
    timeLimitSec: 1.0,
    memoryLimitMB: 256,
    description: "You are given a positive integer num consisting only of digits 6 and 9. Return the maximum number you can get by changing at most one digit (6 becomes 9, or 9 becomes 6).",
    inputFormat: "A single integer num.",
    outputFormat: "Print the maximum resulting number.",
    sampleTests: [
      { input: "9669", output: "9969", explanation: "Changing the first 6 to 9 yields 9969, which is maximal." },
      { input: "9996", output: "9999" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    for(char &c : s) {\n        if(c == '6') { c = '9'; break; }\n    }\n    cout << s << endl;\n    return 0;\n}`,
      python: `print(input().strip().replace('6', '9', 1))`,
      typescript: `function maximum69Number (num: number): number {\n    return Number(num.toString().replace('6', '9'));\n}`
    }
  }
];

/**
 * Generate a randomized set of 5 test problems from the pool
 */
export function getRandomContestProblems(contestId: string = "weekly-48", count: number = 5): ContestProblem[] {
  const letters: ("A" | "B" | "C" | "D" | "E")[] = ["A", "B", "C", "D", "E"];
  
  // Deterministic shuffle or random selection
  const shuffled = [...QUESTIONS_POOL].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((q, idx) => ({
    id: `${contestId}_${q.id}`,
    contestId,
    index: letters[idx] || "A",
    title: q.title,
    difficulty: q.difficulty,
    points: q.points,
    timeLimitSec: q.timeLimitSec,
    memoryLimitMB: q.memoryLimitMB,
    description: q.description,
    inputFormat: q.inputFormat,
    outputFormat: q.outputFormat,
    sampleTests: q.sampleTests,
    starterCode: q.starterCode,
    solved: false,
  }));
}
