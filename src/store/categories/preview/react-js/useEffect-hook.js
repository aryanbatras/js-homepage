export const useEffectHook = {
  title: "React useEffect Hook",
  description: "Learn how to use useEffect for side effects and lifecycle events",
  code_examples: [
    {
      example: "Example 1: Basic useEffect",
      code: "function Timer() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    console.log('Component mounted');\n  }, []);\n  \n  return <p>Count: {count}</p>;\n}",
    },
    {
      example: "Example 2: useEffect with Dependencies",
      code: "function Timer() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    console.log('Count changed:', count);\n  }, [count]);\n  \n  return <p>Count: {count}</p>;\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: useEffect runs after the component renders",
    },
    {
      hint: "Hint: Empty dependency array [] means run only once (mount)",
    },
    {
      hint: "Hint: Include variables in dependency array to re-run when they change",
    },
    {
      hint: "Hint: Return a function from useEffect to run cleanup on unmount",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Timer with Cleanup",
      code: "function App() {\n  return (\n    <div>\n      <h1>useEffect Examples</h1>\n      <Timer />\n      <DocumentTitle />\n      <WindowWidth />\n    </div>\n  );\n}\n\nfunction Timer() {\n  const [count, setCount] = useState(0);\n  const [isRunning, setIsRunning] = useState(false);\n  \n  useEffect(() => {\n    let intervalId;\n    \n    if (isRunning) {\n      intervalId = setInterval(() => {\n        setCount(prevCount => prevCount + 1);\n      }, 1000);\n    }\n    \n    return () => {\n      if (intervalId) {\n        clearInterval(intervalId);\n      }\n    };\n  }, [isRunning]);\n  \n  return (\n    <div className=\"timer\">\n      <h2>Timer</h2>\n      <p>Count: {count}</p>\n      <button onClick={() => setIsRunning(!isRunning)}>\n        {isRunning ? 'Pause' : 'Start'}\n      </button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\nfunction DocumentTitle() {\n  const [title, setTitle] = useState('React App');\n  \n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n  \n  return (\n    <div className=\"document-title\">\n      <h2>Document Title</h2>\n      <input\n        type=\"text\"\n        value={title}\n        onChange={(e) => setTitle(e.target.value)}\n        placeholder=\"Enter document title\"\n      />\n    </div>\n  );\n}\n\nfunction WindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  \n  useEffect(() => {\n    const handleResize = () => setWidth(window.innerWidth);\n    \n    window.addEventListener('resize', handleResize);\n    \n    return () => {\n      window.removeEventListener('resize', handleResize);\n    };\n  }, []);\n  \n  return (\n    <div className=\"window-width\">\n      <h2>Window Width</h2>\n      <p>Current width: {width}px</p>\n    </div>\n  );\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\" />\n  <title>React useEffect Hook</title>\n  <script crossorigin src=\"https://unpkg.com/react@18/umd/react.development.js\"></script>\n  <script crossorigin src=\"https://unpkg.com/react-dom@18/umd/react-dom.development.js\"></script>\n  <script src=\"https://unpkg.com/@babel/standalone/babel.min.js\"></script>\n  <link rel=\"stylesheet\" href=\"index.css\">\n</head>\n<body>\n  <div id=\"root\"></div>\n  <script type=\"text/babel\" src=\"index.js\"></script>\n</body>\n</html>",
    },
    {
      name: "index.js",
      code: "const { createRoot } = ReactDOM;\nconst { useState, useEffect } = React;\n\nfunction App() {\n  return (\n    <div>\n      <h1>useEffect Examples</h1>\n      <Timer />\n      <DocumentTitle />\n      <WindowWidth />\n    </div>\n  );\n}\n\nfunction Timer() {\n  const [count, setCount] = useState(0);\n  const [isRunning, setIsRunning] = useState(false);\n  \n  useEffect(() => {\n    let intervalId;\n    \n    if (isRunning) {\n      intervalId = setInterval(() => {\n        setCount(prevCount => prevCount + 1);\n      }, 1000);\n    }\n    \n    return () => {\n      if (intervalId) {\n        clearInterval(intervalId);\n      }\n    };\n  }, [isRunning]);\n  \n  return (\n    <div className=\"timer\">\n      <h2>Timer</h2>\n      <p>Count: {count}</p>\n      <button onClick={() => setIsRunning(!isRunning)}>\n        {isRunning ? 'Pause' : 'Start'}\n      </button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\nfunction DocumentTitle() {\n  const [title, setTitle] = useState('React App');\n  \n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n  \n  return (\n    <div className=\"document-title\">\n      <h2>Document Title</h2>\n      <input\n        type=\"text\"\n        value={title}\n        onChange={(e) => setTitle(e.target.value)}\n        placeholder=\"Enter document title\"\n      />\n    </div>\n  );\n}\n\nfunction WindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  \n  useEffect(() => {\n    const handleResize = () => setWidth(window.innerWidth);\n    \n    window.addEventListener('resize', handleResize);\n    \n    return () => {\n      window.removeEventListener('resize', handleResize);\n    };\n  }, []);\n  \n  return (\n    <div className=\"window-width\">\n      <h2>Window Width</h2>\n      <p>Current width: {width}px</p>\n    </div>\n  );\n}\n\nconst root = createRoot(document.getElementById(\"root\"));\nroot.render(<App />);",
    },
    {
      name: "index.css",
      code: "body {\n  margin: 0;\n  padding: 20px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  background: #f5f5f5;\n}\n\n.timer, .document-title, .window-width {\n  background: white;\n  border-radius: 8px;\n  padding: 2rem;\n  margin: 1rem 0;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  border: 1px solid #e0e0e0;\n}\n\nh1 {\n  color: #1976d2;\n  text-align: center;\n  margin-bottom: 2rem;\n}\n\nh2 {\n  color: #424242;\n  margin: 0 0 1rem 0;\n}\n\np {\n  margin: 0.5rem 0;\n  font-size: 1.1rem;\n}\n\nbutton {\n  background: #1976d2;\n  color: white;\n  border: none;\n  padding: 0.5rem 1rem;\n  margin: 0.25rem;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\nbutton:hover {\n  background: #1565c0;\n}\n\ninput[type=\"text\"] {\n  padding: 0.5rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 1rem;\n  width: 100%;\n  max-width: 300px;\n}\n\ninput[type=\"text\"]:focus {\n  outline: none;\n  border-color: #1976d2;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: useEffect Hook",
      code: "console.log('Testing useEffect hook...');\nuseEffect(() => {\n  console.log('Effect ran');\n}, []);",
    },
  ],
};
