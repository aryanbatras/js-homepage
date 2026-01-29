export const basicComponent = {
  title: "Basic React Component",
  description: "Create your first React component with props and basic JSX",
  code_examples: [
    {
      example: "Example 1: Function Component",
      code: "function Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}",
    },
    {
      example: "Example 2: Component with Props",
      code: "function Card({ title, content }) {\n  return (\n    <div className=\"card\">\n      <h2>{title}</h2>\n      <p>{content}</p>\n    </div>\n  );\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: React components must start with a capital letter",
    },
    {
      hint: "Hint: Use curly braces {} to embed JavaScript expressions in JSX",
    },
    {
      hint: "Hint: Props are passed as an object to the component function",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Function Component",
      code: "function App() {\n  return (\n    <div>\n      <Welcome name=\"Alice\" />\n      <Card title=\"About React\" content=\"React is a JavaScript library for building user interfaces.\" />\n    </div>\n  );\n}\n\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nfunction Card({ title, content }) {\n  return (\n    <div className=\"card\">\n      <h2>{title}</h2>\n      <p>{content}</p>\n    </div>\n  );\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\" />\n  <title>React Basic Component</title>\n  <script crossorigin src=\"https://unpkg.com/react@18/umd/react.development.js\"></script>\n  <script crossorigin src=\"https://unpkg.com/react-dom@18/umd/react-dom.development.js\"></script>\n  <script src=\"https://unpkg.com/@babel/standalone/babel.min.js\"></script>\n  <link rel=\"stylesheet\" href=\"index.css\">\n</head>\n<body>\n  <div id=\"root\"></div>\n  <script type=\"text/babel\" src=\"index.js\"></script>\n</body>\n</html>",
    },
    {
      name: "index.js",
      code: "const { createRoot } = ReactDOM;\nconst { useState } = React;\n\nfunction App() {\n  return (\n    <div>\n      <Welcome name=\"Alice\" />\n      <Card title=\"About React\" content=\"React is a JavaScript library for building user interfaces.\" />\n    </div>\n  );\n}\n\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nfunction Card({ title, content }) {\n  return (\n    <div className=\"card\">\n      <h2>{title}</h2>\n      <p>{content}</p>\n    </div>\n  );\n}\n\nconst root = createRoot(document.getElementById(\"root\"));\nroot.render(<App />);",
    },
    {
      name: "index.css",
      code: "body {\n  margin: 0;\n  padding: 20px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n}\n\n.card {\n  background: white;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin: 1rem 0;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  border: 1px solid #e0e0e0;\n}\n\nh1 {\n  color: #1976d2;\n  margin: 0 0 1rem 0;\n}\n\nh2 {\n  color: #424242;\n  margin: 0 0 0.5rem 0;\n}",
    }
  ],
  tests: [
    {
      test: "Test 1: Component Rendering",
      code: "console.log('Testing component rendering...');\nconst element = <Welcome name=\"Test\" />;\nconsole.log('JSX element created:', element.type);",
    },
  ],
};
