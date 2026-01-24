export const useCallbackOptimization = {
  title: "useCallback Optimization",
  description: "Optimize component re-renders using useCallback",
  code_examples: [
    {
      example: "Example 1:",
      code: "const handleClick = useCallback(() => {\n    setCount(count + 1);\n  }, [count]);",
    },
  ],
  hints: [
    {
      hint: "Hint: Functions are recreated on every render",
    },
    {
      hint: "Think about when the function should be recreated",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Function Memoization",
      code: "let callbackCache = new Map();\nlet callbackIndex = 0;\n\nfunction useCallback(callback, deps) {\n  const currentIndex = callbackIndex;\n  const cached = callbackCache.get(currentIndex);\n  \n  if (cached && deps && cached.deps && \n      deps.every((dep, i) => dep === cached.deps[i])) {\n    callbackIndex++;\n    return cached.callback;\n  }\n  \n  callbackCache.set(currentIndex, { callback, deps });\n  callbackIndex++;\n  return callback;\n}",
    },
  ],
  files: [
    {
      name: "useCallbackOpt.js",
      code: "let callbackCache = new Map();\nlet callbackIndex = 0;\n\nfunction useCallback(callback, deps) {\n  const currentIndex = callbackIndex;\n  const cached = callbackCache.get(currentIndex);\n  \n  if (cached && deps && cached.deps && \n      deps.every((dep, i) => dep === cached.deps[i])) {\n    callbackIndex++;\n    return cached.callback;\n  }\n  \n  callbackCache.set(currentIndex, { callback, deps });\n  callbackIndex++;\n  return callback;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Callback memoization",
      code: "const callback1 = useCallback(() => console.log('test'), [1]);\nconst callback2 = useCallback(() => console.log('test'), [1]);\nconsole.log('Same reference:', callback1 === callback2);"
    }
  ],
};
