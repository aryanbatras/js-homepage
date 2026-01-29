export const genericFunctions = {
  title: "Generic Functions",
  description: "Implement generic functions with proper type constraints",
  code_examples: [
    {
      example: "Example 1:",
      code: "function identity<T>(arg: T): T {\n  return arg;\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use angle brackets for generic parameters",
    },
    {
      hint: "Think about extends keyword for constraints",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Generics",
      code: "function identity<T>(arg: T): T {\n  return arg;\n}\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nfunction merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {\n  return { ...obj1, ...obj2 };\n}",
    },
  ],
  files: [
    {
      name: "generics.ts",
      code: "function identity<T>(arg: T): T {\n  return arg;\n}\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nfunction merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {\n  return { ...obj1, ...obj2 };\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Generic functions",
      code: "const identityResult = identity('hello');\nconst user = { name: 'John', age: 30 };\nconst propertyResult = getProperty(user, 'name');\nconst mergeResult = merge({ a: 1 }, { b: 2 });\nconsole.log('Identity:', identityResult);\nconsole.log('Property:', propertyResult);\nconsole.log('Merge:', mergeResult);"
    }
  ],
};
