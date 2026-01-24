export const customUseReducerHook = {
  title: "Custom useReducer Hook",
  description: "Implement your own useReducer hook to understand state management patterns",
  code_examples: [
    {
      example: "Example 1:",
      code: "const [state, dispatch] = useReducer(reducer, initialState);",
    },
  ],
  hints: [
    {
      hint: "Hint: Think about how actions modify state",
    },
    {
      hint: "Hint: Consider using a global array to store reducer states",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Global State with Reducer",
      code: "let reducerStates = [];\nlet reducerIndex = 0;\n\nfunction useReducer(reducer, initialState) {\n  const currentIndex = reducerIndex;\n  if (reducerStates[currentIndex] === undefined) {\n    reducerStates[currentIndex] = initialState;\n  }\n  \n  const dispatch = (action) => {\n    reducerStates[currentIndex] = reducer(reducerStates[currentIndex], action);\n    reducerIndex = 0;\n    render();\n  };\n  \n  reducerIndex++;\n  return [reducerStates[currentIndex], dispatch];\n}",
    },
  ],
  files: [
    {
      name: "useReducer.js",
      code: "let reducerStates = [];\nlet reducerIndex = 0;\n\nfunction useReducer(reducer, initialState) {\n  const currentIndex = reducerIndex;\n  if (reducerStates[currentIndex] === undefined) {\n    reducerStates[currentIndex] = initialState;\n  }\n  \n  const dispatch = (action) => {\n    reducerStates[currentIndex] = reducer(reducerStates[currentIndex], action);\n    reducerIndex = 0;\n    render();\n  };\n  \n  reducerIndex++;\n  return [reducerStates[currentIndex], dispatch];\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Counter reducer",
      code: "const counterReducer = (state, action) => {\n  switch (action.type) {\n    case 'INCREMENT': return { count: state.count + 1 };\n    case 'DECREMENT': return { count: state.count - 1 };\n    default: return state;\n  }\n};\nlet [state, dispatch] = useReducer(counterReducer, { count: 0 });\nconsole.log('Initial state:', state);\ndispatch({ type: 'INCREMENT' });\nconsole.log('After increment:', state);"
    }
  ],
};
