export const componentLifecycleMethods = {
  title: "Component Lifecycle Methods",
  description: "Implement React component lifecycle methods from scratch",
  code_examples: [
    {
      example: "Example 1:",
      code: "class MyComponent extends Component {\n  componentDidMount() {\n    console.log('Component mounted');\n  }\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Think about mounting, updating, and unmounting phases",
    },
    {
      hint: "Consider how to track component state and props changes",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Component Class",
      code: "class Component {\n  constructor(props) {\n    this.props = props;\n    this.state = {};\n  }\n  \n  setState(newState) {\n    this.state = { ...this.state, ...newState };\n    this.componentDidUpdate(this.props, this.state);\n    this.render();\n  }\n  \n  componentDidMount() {\n    // Override in subclass\n  }\n  \n  componentDidUpdate(prevProps, prevState) {\n    // Override in subclass\n  }\n  \n  componentWillUnmount() {\n    // Override in subclass\n  }\n  \n  render() {\n    // Override in subclass\n    return null;\n  }\n}",
    },
  ],
  files: [
    {
      name: "component.js",
      code: "class Component {\n  constructor(props) {\n    this.props = props;\n    this.state = {};\n  }\n  \n  setState(newState) {\n    this.state = { ...this.state, ...newState };\n    this.componentDidUpdate(this.props, this.state);\n    this.render();\n  }\n  \n  componentDidMount() {\n    // Override in subclass\n  }\n  \n  componentDidUpdate(prevProps, prevState) {\n    // Override in subclass\n  }\n  \n  componentWillUnmount() {\n    // Override in subclass\n  }\n  \n  render() {\n    // Override in subclass\n    return null;\n  }\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Component creation",
      code: "class MyComponent extends Component {\n  render() {\n    return 'Hello World';\n  }\n}\nconst component = new MyComponent({ name: 'Test' });\nconsole.log('Component props:', component.props);"
    }
  ],
};
