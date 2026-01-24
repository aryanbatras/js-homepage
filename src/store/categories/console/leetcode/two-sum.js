export const twoSum = {
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
      code: "function twoSum(nums, target) {\n  const numDict = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in numDict) {\n      return [numDict[complement], i];\n    }\n    numDict[nums[i]] = i;\n  }\n  return [];\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic example",
      code: "console.log('Test 1 - Input: [2,7,11,15], target: 9');\nconsole.log('Expected: [0,1]');\nconsole.log('Actual:', twoSum([2,7,11,15], 9));"
    },
    {
      test: "Test 2: Different order",
      code: "console.log('Test 2 - Input: [3,2,4], target: 6');\nconsole.log('Expected: [1,2]');\nconsole.log('Actual:', twoSum([3,2,4], 6));"
    },
    {
      test: "Test 3: No solution",
      code: "console.log('Test 3 - Input: [1,2,3], target: 7');\nconsole.log('Expected: []');\nconsole.log('Actual:', twoSum([1,2,3], 7));"
    }
  ],
};
