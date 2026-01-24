export const reactMemoImplementation = {
  title: "React.memo Implementation",
  description: "Implement your own React.memo to understand component memoization",
  code_examples: [
    {
      example: "Example 1:",
      code: "const MemoizedComponent = memo(MyComponent);",
    },
  ],
  hints: [
    {
      hint: "Hint: Think about shallow comparison of props",
    },
    {
      hint: "Hint: Consider storing previous props to detect changes",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Props Comparison",
      code: "function memo(Component) {\n  let prevProps = {};\n  let prevResult = null;\n  \n  return function(props) {\n    const hasChanged = Object.keys(props).some(\n      key => props[key] !== prevProps[key]\n    );\n    \n    if (hasChanged) {\n      prevProps = { ...props };\n      prevResult = Component(props);\n    }\n    \n    return prevResult;\n  };\n}",
    },
  ],
  files: [
    {
      name: "memo.js",
      code: "function memo(Component) {\n  let prevProps = {};\n  let prevResult = null;\n  \n  return function(props) {\n    const hasChanged = Object.keys(props).some(\n      key => props[key] !== prevProps[key]\n    );\n    \n    if (hasChanged) {\n      prevProps = { ...props };\n      prevResult = Component(props);\n    }\n    \n    return prevResult;\n  };\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Memoization works",
      code: "let renderCount = 0;\nconst MyComponent = (props) => {\n  renderCount++;\n  return `Count: ${props.count}`;\n};\nconst MemoizedComponent = memo(MyComponent);\nconsole.log(MemoizedComponent({ count: 1 }));\nconsole.log(MemoizedComponent({ count: 1 }));\nconsole.log('Render count:', renderCount);"
    }
  ],
};
