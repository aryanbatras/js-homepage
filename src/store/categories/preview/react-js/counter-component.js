export const counterComponent = {
  title: "Interactive Counter Component",
  description: "Build an interactive counter using React useState hook",
  code_examples: [
    {
      example: "Example 1: Basic useState",
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n    </div>\n  );\n}",
    },
    {
      example: "Example 2: Increment and Decrement",
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <h2>Counter: {count}</h2>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <button onClick={() => setCount(count + 1)}>+</button>\n    </div>\n  );\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Import useState from React to manage component state",
    },
    {
      hint: "Hint: useState returns an array with [state, setState]",
    },
    {
      hint: "Hint: Never mutate state directly, always use the setter function",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Counter with Reset",
      code: "function App() {\n  return (\n    <div>\n      <h1>Interactive Counter</h1>\n      <Counter />\n      <AdvancedCounter />\n    </div>\n  );\n}\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div className=\"counter\">\n      <h2>Simple Counter</h2>\n      <p>Current count: {count}</p>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\nfunction AdvancedCounter() {\n  const [count, setCount] = useState(0);\n  const [step, setStep] = useState(1);\n  \n  return (\n    <div className=\"counter\">\n      <h2>Advanced Counter</h2>\n      <p>Current count: {count}</p>\n      <p>Step size: {step}</p>\n      <button onClick={() => setCount(count - step)}>-{step}</button>\n      <button onClick={() => setCount(count + step)}>+{step}</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n      <div>\n        <input \n          type=\"range\" \n          min=\"1\" \n          max=\"10\" \n          value={step}\n          onChange={(e) => setStep(Number(e.target.value))}\n        />\n      </div>\n    </div>\n  );\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\" />\n  <title>React Counter Component</title>\n  <script crossorigin src=\"https://unpkg.com/react@18/umd/react.development.js\"></script>\n  <script crossorigin src=\"https://unpkg.com/react-dom@18/umd/react-dom.development.js\"></script>\n  <script src=\"https://unpkg.com/@babel/standalone/babel.min.js\"></script>\n  <link rel=\"stylesheet\" href=\"index.css\">\n</head>\n<body>\n  <div id=\"root\"></div>\n  <script type=\"text/babel\" src=\"index.js\"></script>\n</body>\n</html>",
    },
    {
      name: "index.js",
      code: "const { createRoot } = ReactDOM;\nconst { useState, useEffect } = React;\n\nfunction App() {\n  return (\n    <div>\n      <h1>Interactive Counter</h1>\n      <Counter />\n      <AdvancedCounter />\n    </div>\n  );\n}\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div className=\"counter\">\n      <h2>Simple Counter</h2>\n      <p>Current count: {count}</p>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\nfunction AdvancedCounter() {\n  const [count, setCount] = useState(0);\n  const [step, setStep] = useState(1);\n  \n  return (\n    <div className=\"counter\">\n      <h2>Advanced Counter</h2>\n      <p>Current count: {count}</p>\n      <p>Step size: {step}</p>\n      <button onClick={() => setCount(count - step)}>-{step}</button>\n      <button onClick={() => setCount(count + step)}>+{step}</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n      <div>\n        <input \n          type=\"range\" \n          min=\"1\" \n          max=\"10\" \n          value={step}\n          onChange={(e) => setStep(Number(e.target.value))}\n        />\n      </div>\n    </div>\n  );\n}\n\nconst root = createRoot(document.getElementById(\"root\"));\nroot.render(<App />);",
    },
    {
      name: "index.css",
      code: "body {\n  margin: 0;\n  padding: 20px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  background: #f5f5f5;\n}\n\n.counter {\n  background: white;\n  border-radius: 8px;\n  padding: 2rem;\n  margin: 1rem 0;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  border: 1px solid #e0e0e0;\n}\n\nh1 {\n  color: #1976d2;\n  text-align: center;\n  margin-bottom: 2rem;\n}\n\nh2 {\n  color: #424242;\n  margin: 0 0 1rem 0;\n}\n\np {\n  margin: 0.5rem 0;\n  font-size: 1.1rem;\n}\n\nbutton {\n  background: #1976d2;\n  color: white;\n  border: none;\n  padding: 0.5rem 1rem;\n  margin: 0.25rem;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\nbutton:hover {\n  background: #1565c0;\n}\n\nbutton:active {\n  transform: scale(0.98);\n}\n\ninput[type=\"range\"] {\n  width: 100%;\n  margin-top: 1rem;\n}",
    }
  ],
  tests: [
    {
      test: "Test 1: State Management",
      code: "console.log('Testing useState hook...');\nconst [count, setCount] = useState(0);\nconsole.log('Initial state:', count);",
    },
  ],
};
