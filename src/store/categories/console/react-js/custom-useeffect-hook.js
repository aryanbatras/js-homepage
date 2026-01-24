export const customUseEffectHook = {
  title: "Custom useEffect Hook",
  description: "Implement your own useEffect hook to understand React's side effect management",
  code_examples: [
    {
      example: "Example 1:",
      code: "useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);",
    },
  ],
  hints: [
    {
      hint: "Hint: Think about dependency arrays and when effects should run",
    },
    {
      hint: "Hint: Consider storing previous dependencies to detect changes",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Dependency Comparison",
      code: "let prevDeps = [];\nlet effectIndex = 0;\n\nfunction useEffect(callback, deps) {\n  const currentIndex = effectIndex;\n  const hasNoDeps = !deps;\n  const hasChangedDeps = prevDeps[currentIndex] \n    ? !deps.every((dep, i) => dep === prevDeps[currentIndex][i])\n    : true;\n  \n  if (hasNoDeps || hasChangedDeps) {\n    prevDeps[currentIndex] = deps;\n    callback();\n  }\n  \n  effectIndex++;\n}",
    },
  ],
  files: [
    {
      name: "useEffect.js",
      code: "let prevDeps = [];\nlet effectIndex = 0;\n\nfunction useEffect(callback, deps) {\n  const currentIndex = effectIndex;\n  const hasNoDeps = !deps;\n  const hasChangedDeps = prevDeps[currentIndex] \n    ? !deps.every((dep, i) => dep === prevDeps[currentIndex][i])\n    : true;\n  \n  if (hasNoDeps || hasChangedDeps) {\n    prevDeps[currentIndex] = deps;\n    callback();\n  }\n  \n  effectIndex++;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Effect runs on mount",
      code: "let effectRan = false;\nuseEffect(() => {\n  effectRan = true;\n}, []);\nconsole.log('Effect ran on mount:', effectRan);"
    },
    {
      test: "Test 2: Effect runs with dependency changes",
      code: "let runCount = 0;\nuseEffect(() => {\n  runCount++;\n}, [1]);\nuseEffect(() => {\n  runCount++;\n}, [1]);\nuseEffect(() => {\n  runCount++;\n}, [2]);\nconsole.log('Effect run count:', runCount);"
    }
  ],
};
