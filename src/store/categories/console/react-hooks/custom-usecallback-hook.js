export const customUseCallbackHook = {
  title: "Custom useCallback Hook",
  description: "Implement your own useCallback hook to memoize functions",
  code_examples: [
    {
      example: "Example 1:",
      code: "const memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);",
    },
  ],
  hints: [
    {
      hint: "Hint: Use useMemo internally to memoize the function",
    },
    {
      hint: "Return the same function reference when dependencies don't change",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Function Memoization",
      code: "function useCallback(callback, deps) {\n  return useMemo(() => callback, deps);\n}",
    },
  ],
  files: [
    {
      name: "useCallback.js",
      code: "function useCallback(callback, deps) {\n  return useMemo(() => callback, deps);\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Callback memoization",
      code: "const callback1 = useCallback(() => console.log('test'), [1]);\nconst callback2 = useCallback(() => console.log('test'), [1]);\nconsole.log('Same reference:', callback1 === callback2);"
    }
  ],
};
