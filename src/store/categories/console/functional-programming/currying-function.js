export const curryingFunction = {
  title: "Currying Function",
  description: "Implement currying to transform functions",
  code_examples: [
    {
      example: "Example 1:",
      code: "const add = (a, b) => a + b;\nconst curriedAdd = curry(add);\nconst add5 = curriedAdd(5);\nconsole.log(add5(3)); // 8",
    },
  ],
  hints: [
    {
      hint: "Hint: Return functions until all arguments are provided",
    },
    {
      hint: "Hint: Use function length property",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Recursive Currying",
      code: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs));\n      };\n    }\n  };\n}",
    },
  ],
  files: [
    {
      name: "curry.js",
      code: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs));\n      };\n    }\n  };\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic currying",
      code: "const add = (a, b, c) => a + b + c;\nconst curriedAdd = curry(add);\nconsole.log('Step 1:', curriedAdd(1));\nconsole.log('Step 2:', curriedAdd(1)(2));\nconsole.log('Step 3:', curriedAdd(1)(2)(3));"
    }
  ],
};
