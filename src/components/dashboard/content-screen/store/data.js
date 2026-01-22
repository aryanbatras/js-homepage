
export const data = [
  {
    title: "Two Sum",
    description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    code_examples: [
      {
        example: "Example 1:",
        code: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
      },
      {
        example: "Example 2:",
        code: "Input: nums = [3,2,4], target = 6\nOutput: [1,2]",
      },
    ],
    hints: [
      {
        hint: "Hint: What if the numbers were sorted?",
      },
      {
        hint: "Hint: What if loops were used?",
      },
    ],
    solution: [
      {
        approach: "Approach 1: Brute Force",
        code: "function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}",
      },
      {
        approach: "Approach 2: Hash Table",
        code: "function twoSum(nums, target) {\n  const numDict = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in numDict) {\n      return [numDict[complement], i];\n    }\n    numDict[nums[i]] = i;\n  }\n  return [];\n}",
      },
    ],
    files: [
      {
        name: "twoSum.js",
        code: "function twoSum(nums, target) {\n  const numDict = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in numDict) {\n      return [numDict[complement], i];\n    }\n    numDict[nums[i]] = i;\n  }\n  return [];\n}",
      },
    ],
  },
  {
    title: "Find All Numbers Disappeared in an Array",
    description: "Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.",
    code_examples: [
      {
        example: "Example 1:",
        code: "Input: [4,3,2,7,8,2,3,1]\nOutput: [5,6]",
      },
    ],
    hints: [
      {
        hint: "Hint: What if the numbers were sorted?",
      },
    ],
    solution: [
      {
        approach: "Approach 1: Brute Force",
        code: "function findDisappearedNumbers(nums) {\n  const n = nums.length;\n  const appeared = new Set();\n  const disappeared = new Set();\n  for (let i = 0; i < n; i++) {\n    appeared.add(nums[i]);\n  }\n  for (let i = 1; i <= n; i++) {\n    if (!(appeared.has(i))) {\n      disappeared.add(i);\n    }\n  }\n  return [...Disappeared];\n}",
      },
    ],
    files: [
      {
        name: "findDisappearedNumbers.js",
        code: "function findDisappearedNumbers(nums) {\n  const n = nums.length;\n  const appeared = new Set();\n  const disappeared = new Set();\n  for (let i = 0; i < n; i++) {\n    appeared.add(nums[i]);\n  }\n  for (let i = 1; i <= n; i++) {\n    if (!(appeared.has(i))) {\n      disappeared.add(i);\n    }\n  }\n  return [...Disappeared];\n}",
      },
    ],
  },
  {
    title: "Intersection of Two Arrays",
    description: "Given two arrays, write a function to compute their intersection.",
    code_examples: [
      {
        example: "Example 1:",
        code: "Input: nums1 = [1,2,2,1], nums2 = [2,2]\nOutput: [2]",
      },
    ],
    hints: [
      {
        hint: "Hint: What if the numbers were sorted?",
      },
    ],
    solution: [
      {
        approach: "Approach 1: Hash Table",
        code: "function intersection(nums1, nums2) {\n  const numSet = new Set(nums1);\n  const intersection = [];\n  for (let i = 0; i < nums2.length; i++) {\n    if (numSet.has(nums2[i])) {\n      intersection.push(nums2[i]);\n      numSet.delete(nums2[i]);\n    }\n  }\n  return intersection;\n}",
      },
    ],
    files: [
      {
        name: "intersectionOfTwoArrays.js",
        code: "function intersection(nums1, nums2) {\n  const numSet = new Set(nums1);\n  const intersection = [];\n  for (let i = 0; i < nums2.length; i++) {\n    if (numSet.has(nums2[i])) {\n      intersection.push(nums2[i]);\n      numSet.delete(nums2[i]);\n    }\n  }\n  return intersection;\n}",
      },
    ],
  },
];
