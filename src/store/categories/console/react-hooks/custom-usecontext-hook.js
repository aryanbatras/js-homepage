export const customUseContextHook = {
  title: "Custom useContext Hook",
  description: "Implement your own useContext hook to consume context values",
  code_examples: [
    {
      example: "Example 1:",
      code: "const theme = useContext(ThemeContext);\nreturn <div style={{ color: theme }}>{children}</div>;",
    },
  ],
  hints: [
    {
      hint: "Hint: Use a global variable to track current context value",
    },
    {
      hint: "The hook should return the current context value",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Global Context Tracking",
      code: "let currentContextValue = null;\n\nfunction useContext(context) {\n  return currentContextValue !== null ? currentContextValue : context.defaultValue;\n}\n\nfunction createContext(defaultValue) {\n  return {\n    defaultValue,\n    Provider: ({ value, children }) => {\n      currentContextValue = value;\n      return children;\n    }\n  };\n}",
    },
  ],
  files: [
    {
      name: "useContext.js",
      code: "let currentContextValue = null;\n\nfunction useContext(context) {\n  return currentContextValue !== null ? currentContextValue : context.defaultValue;\n}\n\nfunction createContext(defaultValue) {\n  return {\n    defaultValue,\n    Provider: ({ value, children }) => {\n      currentContextValue = value;\n      return children;\n    }\n  };\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Context consumption",
      code: "const ThemeContext = createContext('light');\nconst provider = ThemeContext.Provider({ value: 'dark', children: null });\nconst theme = useContext(ThemeContext);\nconsole.log('Theme:', theme);"
    }
  ],
};
