export const debounceFunction = {
  title: "Debounce Function",
  description: "Implement a debounce function that limits the rate at which a function gets called",
  code_examples: [
    {
      example: "Example 1:",
      code: "const debouncedSearch = debounce(searchAPI, 300);\nwindow.addEventListener('resize', debouncedSearch);",
    },
  ],
  hints: [
    {
      hint: "Hint: Use setTimeout to delay execution",
    },
    {
      hint: "Hint: Clear previous timeout on each call",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Timer-based Debounce",
      code: "function debounce(func, delay) {\n  let timeoutId;\n  \n  return function(...args) {\n    clearTimeout(timeoutId);\n    \n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n}",
    },
  ],
  files: [
    {
      name: "debounce.js",
      code: "function debounce(func, delay) {\n  let timeoutId;\n  \n  return function(...args) {\n    clearTimeout(timeoutId);\n    \n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic debouncing",
      code: "let callCount = 0;\nconst debouncedFn = debounce(() => {\n  callCount++;\n  console.log('Function called', callCount, 'times');\n}, 100);\n\ndebouncedFn();\ndebouncedFn();\ndebouncedFn();\nconsole.log('Immediate call count:', callCount);\n\nsetTimeout(() => {\n  console.log('After delay - call count:', callCount);\n}, 200);"
    },
    {
      test: "Test 2: Multiple rapid calls",
      code: "let callCount = 0;\nconst debouncedFn = debounce(() => {\n  callCount++;\n  console.log('Debounced call', callCount);\n}, 50);\n\nfor(let i = 0; i < 5; i++) {\n  setTimeout(() => debouncedFn(), i * 10);\n}\n\nsetTimeout(() => {\n  console.log('Final call count:', callCount);\n}, 200);"
    }
  ],
};
