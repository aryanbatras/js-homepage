export const binarySearchImplementation = {
  title: "Binary Search Implementation",
  description: "Implement binary search algorithm for sorted arrays",
  code_examples: [
    {
      example: "Example 1:",
      code: "const index = binarySearch([1, 2, 3, 4, 5], 3); // returns 2",
    },
  ],
  hints: [
    {
      hint: "Hint: Use two pointers approach",
    },
    {
      hint: "Hint: Continuously divide the search space in half",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Iterative Binary Search",
      code: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}",
    },
  ],
  files: [
    {
      name: "binarySearch.js",
      code: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Found element",
      code: "console.log('Found at index:', binarySearch([1, 2, 3, 4, 5], 3));"
    },
    {
      test: "Test 2: Not found",
      code: "console.log('Not found:', binarySearch([1, 2, 3, 4, 5], 6));"
    }
  ],
};
