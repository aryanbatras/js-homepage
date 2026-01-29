export const functionComposition = {
  title: "Function Composition",
  description: "Create a function composition utility that combines multiple functions",
  code_examples: [
    {
      example: "Example 1:",
      code: "const addOne = x => x + 1;\nconst double = x => x * 2;\nconst composed = compose(addOne, double);\nconsole.log(composed(5)); // 11",
    },
  ],
  hints: [
    {
      hint: "Hint: Functions should be executed from right to left",
    },
    {
      hint: "Think about how to pass the result of one function to the next",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Right-to-left Composition",
      code: "function compose(...funcs) {\n  return function(initialValue) {\n    return funcs.reduceRight((acc, func) => func(acc), initialValue);\n  };\n}\n\nfunction pipe(...funcs) {\n  return function(initialValue) {\n    return funcs.reduce((acc, func) => func(acc), initialValue);\n  };\n}",
    },
  ],
  files: [
    {
      name: "compose.js",
      code: "function compose(...funcs) {\n  return function(initialValue) {\n    return funcs.reduceRight((acc, func) => func(acc), initialValue);\n  };\n}\n\nfunction pipe(...funcs) {\n  return function(initialValue) {\n    return funcs.reduce((acc, func) => func(acc), initialValue);\n  };\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic composition",
      code: "const addOne = x => x + 1;\nconst double = x => x * 2;\nconst composed = compose(addOne, double);\nconsole.log('Compose result:', composed(5)); // Should be 11"
    }
  ],
};
