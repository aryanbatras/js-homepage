export const customHookPattern = {
  title: "Custom Hook Pattern",
  description: "Create reusable custom hooks for component logic",
  code_examples: [
    {
      example: "Example 1:",
      code: "function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(s => !s);\n  return [state, toggle];\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Custom hooks start with 'use' and can call other hooks",
    },
    {
      hint: "Think about returning state and updater functions",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Reusable Hook Patterns",
      code: "function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(s => !s);\n  const setTrue = () => setState(true);\n  const setFalse = () => setState(false);\n  return [state, { toggle, setTrue, setFalse }];\n}\n\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  const reset = () => setCount(initialValue);\n  return [count, { increment, decrement, reset }];\n}\n\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));\n    } catch {\n      return initialValue;\n    }\n  });\n  \n  const setValue = (value) => {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n      setStoredValue(value);\n    } catch (error) {\n      console.error('Error saving to localStorage:', error);\n    }\n  };\n  \n  return [storedValue, setValue];\n}",
    },
  ],
  files: [
    {
      name: "customHooks.js",
      code: "function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(s => !s);\n  const setTrue = () => setState(true);\n  const setFalse = () => setState(false);\n  return [state, { toggle, setTrue, setFalse }];\n}\n\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  const reset = () => setCount(initialValue);\n  return [count, { increment, decrement, reset }];\n}\n\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));\n    } catch {\n      return initialValue;\n    }\n  });\n  \n  const setValue = (value) => {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n      setStoredValue(value);\n    } catch (error) {\n      console.error('Error saving to localStorage:', error);\n    }\n  };\n  \n  return [storedValue, setValue];\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Custom hooks",
      code: "const [isToggled, { toggle }] = useToggle();\nconst [count, { increment }] = useCounter(5);\nconst [name, setName] = useLocalStorage('username', 'Guest');\nconsole.log('Hooks state:', { isToggled, count, name });"
    }
  ],
};
