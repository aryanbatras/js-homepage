export const longestSubstringWithoutRepeatingCharacters = {
  title: "Longest Substring Without Repeating Characters",
  description: "Given a string, find the length of the longest substring without repeating characters.",
  code_examples: [
    {
      example: "Example 1:",
      code: "Input: s = 'abcabcbb'\nOutput: 3",
    },
    {
      example: "Example 2:",
      code: "Input: s = 'bbbbb'\nOutput: 1",
    },
  ],
  hints: [
    {
      hint: "Hint: Think about sliding window technique",
    },
    {
      hint: "Hint: Use a hash map to track character positions",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Sliding Window",
      code: "function lengthOfLongestSubstring(s) {\n  const charMap = new Map();\n  let left = 0;\n  let maxLength = 0;\n  \n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (charMap.has(char) && charMap.get(char) >= left) {\n      left = charMap.get(char) + 1;\n    }\n    charMap.set(char, right);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  \n  return maxLength;\n}",
    },
  ],
  files: [
    {
      name: "longestSubstring.js",
      code: "function lengthOfLongestSubstring(s) {\n  const charMap = new Map();\n  let left = 0;\n  let maxLength = 0;\n  \n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (charMap.has(char) && charMap.get(char) >= left) {\n      left = charMap.get(char) + 1;\n    }\n    charMap.set(char, right);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  \n  return maxLength;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Mixed characters",
      code: "console.log('Test 1 - Input: abcabcbb');\nconsole.log('Expected: 3');\nconsole.log('Actual:', lengthOfLongestSubstring('abcabcbb'));"
    },
    {
      test: "Test 2: All same characters",
      code: "console.log('Test 2 - Input: bbbbb');\nconsole.log('Expected: 1');\nconsole.log('Actual:', lengthOfLongestSubstring('bbbbb'));"
    },
    {
      test: "Test 3: Empty string",
      code: "console.log('Test 3 - Input: \"\"');\nconsole.log('Expected: 0');\nconsole.log('Actual:', lengthOfLongestSubstring(''));"
    }
  ],
};
