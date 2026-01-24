export const higherOrderComponents = {
  title: "Higher-Order Components",
  description: "Create reusable higher-order components for cross-cutting concerns",
  code_examples: [
    {
      example: "Example 1:",
      code: "const withAuth = (Component) => (props) => {\n  const [user, setUser] = useState(null);\n  \n  if (!user) return <div>Loading...</div>;\n  \n  return <Component {...props} user={user} />;\n};",
    },
  ],
  hints: [
    {
      hint: "Hint: HOCs are functions that take components and return components",
    },
    {
      hint: "Think about how to pass additional props to wrapped components",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic HOC Pattern",
      code: "function withLogger(WrappedComponent) {\n  return function WithLoggerComponent(props) {\n    console.log('Props:', props);\n    return <WrappedComponent {...props} />;\n  };\n}\n\nfunction withAuth(WrappedComponent) {\n  return function WithAuthComponent(props) {\n    const [user, setUser] = useState(null);\n    \n    if (!user) {\n      return <div>Please log in</div>;\n    }\n    \n    return <WrappedComponent {...props} user={user} />;\n  };\n}",
    },
  ],
  files: [
    {
      name: "hoc.js",
      code: "function withLogger(WrappedComponent) {\n  return function WithLoggerComponent(props) {\n    console.log('Props:', props);\n    return <WrappedComponent {...props} />;\n  };\n}\n\nfunction withAuth(WrappedComponent) {\n  return function WithAuthComponent(props) {\n    const [user, setUser] = useState(null);\n    \n    if (!user) {\n      return <div>Please log in</div>;\n    }\n    \n    return <WrappedComponent {...props} user={user} />;\n  };\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: HOC composition",
      code: "const Button = (props) => <button {...props}>Click</button>;\nconst LoggedButton = withLogger(Button);\nconst AuthButton = withAuth(Button);\nconsole.log('HOCs created:', typeof LoggedButton, typeof AuthButton);"
    }
  ],
};
