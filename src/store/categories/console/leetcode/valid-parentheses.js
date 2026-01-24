export const validParentheses = {
  title: "Valid Parentheses",
  description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
  code_examples: [
    {
      example: "Example 1:",
      code: "Input: s = '()'\nOutput: true",
    },
    {
      example: "Example 2:",
      code: "Input: s = '()[]{}'\nOutput: true",
    },
    {
      example: "Example 3:",
      code: "Input: s = '(]'\nOutput: false",
    },
  ],
  hints: [
    {
      hint: "Hint: Use a stack to track opening brackets",
    },
    {
      hint: "Hint: Map closing brackets to their corresponding opening brackets",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Stack-based Solution",
      code: "function isValid(s) {\n  const stack = [];\n  const bracketMap = {\n    ')': '(',\n    '}': '{',\n    ']': '['\n  };\n  \n  for (const char of s) {\n    if (char in bracketMap) {\n      const topElement = stack.length === 0 ? '#' : stack.pop();\n      if (topElement !== bracketMap[char]) {\n        return false;\n      }\n    } else {\n      stack.push(char);\n    }\n  }\n  \n  return stack.length === 0;\n}",
    },
  ],
  files: [
    {
      name: "validParentheses.js",
      code: "function isValid(s) {\n  const stack = [];\n  const bracketMap = {\n    ')': '(',\n    '}': '{',\n    ']': '['\n  };\n  \n  for (const char of s) {\n    if (char in bracketMap) {\n      const topElement = stack.length === 0 ? '#' : stack.pop();\n      if (topElement !== bracketMap[char]) {\n        return false;\n      }\n    } else {\n      stack.push(char);\n    }\n  }\n  \n  return stack.length === 0;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Simple valid case",
      code: "console.log('Test 1 - Input: ()');\nconsole.log('Expected: true');\nconsole.log('Actual:', isValid('()'));"
    },
    {
      test: "Test 2: Multiple types",
      code: "console.log('Test 2 - Input: ()[]{}');\nconsole.log('Expected: true');\nconsole.log('Actual:', isValid('()[]{}'));"
    },
    {
      test: "Test 3: Invalid case",
      code: "console.log('Test 3 - Input: (]');\nconsole.log('Expected: false');\nconsole.log('Actual:', isValid('(]'));"
    }
  ],
};
