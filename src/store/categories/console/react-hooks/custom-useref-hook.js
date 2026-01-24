export const customUseRefHook = {
  title: "Custom useRef Hook",
  description: "Implement your own useRef hook to persist values across renders",
  code_examples: [
    {
      example: "Example 1:",
      code: "const inputRef = useRef(null);\n<input ref={inputRef} />",
    },
  ],
  hints: [
    {
      hint: "Hint: Use a simple object to store the current value",
    },
    {
      hint: "The ref should persist across re-renders",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Simple Reference Storage",
      code: "let refStates = [];\nlet refIndex = 0;\n\nfunction useRef(initialValue) {\n  const currentIndex = refIndex;\n  if (refStates[currentIndex] === undefined) {\n    refStates[currentIndex] = { current: initialValue };\n  }\n  \n  refIndex++;\n  return refStates[currentIndex];\n}",
    },
  ],
  files: [
    {
      name: "useRef.js",
      code: "let refStates = [];\nlet refIndex = 0;\n\nfunction useRef(initialValue) {\n  const currentIndex = refIndex;\n  if (refStates[currentIndex] === undefined) {\n    refStates[currentIndex] = { current: initialValue };\n  }\n  \n  refIndex++;\n  return refStates[currentIndex];\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Ref persistence",
      code: "const ref1 = useRef(0);\nref1.current = 5;\nconst ref2 = useRef(0);\nconsole.log('Ref1 current:', ref1.current);\nconsole.log('Ref2 current:', ref2.current);\nconsole.log('Same ref:', ref1 === ref2);"
    }
  ],
};
