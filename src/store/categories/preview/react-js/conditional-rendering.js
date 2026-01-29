export const conditionalRendering = {
  title: "Conditional Rendering",
  description: "Master conditional rendering techniques in React components",
  code_examples: [
    {
      example: "Example 1: Ternary Operator",
      code: "function Greeting({ isLoggedIn }) {\n  return (\n    <div>\n      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}\n    </div>\n  );\n}",
    },
    {
      example: "Example 2: Logical AND Operator",
      code: "function Notification({ message }) {\n  return (\n    <div>\n      {message && <p className=\"notification\">{message}</p>}\n    </div>\n  );\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use ternary operator for if-else conditions",
    },
    {
      hint: "Hint: Use && operator for if conditions",
    },
    {
      hint: "Hint: You can also use if statements outside JSX for complex conditions",
    },
  ],
  solution: [
    {
      approach: "Approach 1: User Authentication System",
      code: "function App() {\n  const [user, setUser] = useState(null);\n  const [isLoading, setIsLoading] = useState(true);\n  \n  useEffect(() => {\n    setTimeout(() => {\n      setIsLoading(false);\n      setUser({ name: 'John Doe', email: 'john@example.com' });\n    }, 1000);\n  }, []);\n  \n  const handleLogin = () => {\n    setUser({ name: 'John Doe', email: 'john@example.com' });\n  };\n  \n  const handleLogout = () => {\n    setUser(null);\n  };\n  \n  return (\n    <div className=\"app\">\n      <h1>Conditional Rendering Demo</h1>\n      \n      {isLoading ? (\n        <LoadingSpinner />\n      ) : user ? (\n        <UserProfile user={user} onLogout={handleLogout} />\n      ) : (\n        <LoginForm onLogin={handleLogin} />\n      )}\n      \n      <AdminPanel user={user} />\n    </div>\n  );\n}\n\nfunction LoadingSpinner() {\n  return (\n    <div className=\"loading\">\n      <p>Loading...</p>\n    </div>\n  );\n}\n\nfunction LoginForm({ onLogin }) {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (email && password) {\n      onLogin();\n    }\n  };\n  \n  return (\n    <div className=\"login-form\">\n      <h2>Login</h2>\n      <form onSubmit={handleSubmit}>\n        <input\n          type=\"email\"\n          placeholder=\"Email\"\n          value={email}\n          onChange={(e) => setEmail(e.target.value)}\n        />\n        <input\n          type=\"password\"\n          placeholder=\"Password\"\n          value={password}\n          onChange={(e) => setPassword(e.target.value)}\n        />\n        <button type=\"submit\">Login</button>\n      </form>\n    </div>\n  );\n}\n\nfunction UserProfile({ user, onLogout }) {\n  return (\n    <div className=\"user-profile\">\n      <h2>Welcome, {user.name}!</h2>\n      <p>Email: {user.email}</p>\n      <button onClick={onLogout}>Logout</button>\n    </div>\n  );\n}\n\nfunction AdminPanel({ user }) {\n  const isAdmin = user && user.email.includes('admin');\n  \n  if (!isAdmin) {\n    return null;\n  }\n  \n  return (\n    <div className=\"admin-panel\">\n      <h2>Admin Panel</h2>\n      <p>Admin functionality goes here</p>\n    </div>\n  );\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\" />\n  <title>React Conditional Rendering</title>\n  <script crossorigin src=\"https://unpkg.com/react@18/umd/react.development.js\"></script>\n  <script crossorigin src=\"https://unpkg.com/react-dom@18/umd/react-dom.development.js\"></script>\n  <script src=\"https://unpkg.com/@babel/standalone/babel.min.js\"></script>\n  <link rel=\"stylesheet\" href=\"index.css\">\n</head>\n<body>\n  <div id=\"root\"></div>\n  <script type=\"text/babel\" src=\"index.js\"></script>\n</body>\n</html>",
    },
    {
      name: "index.js",
      code: "const { createRoot } = ReactDOM;\nconst { useState, useEffect } = React;\n\nfunction App() {\n  const [user, setUser] = useState(null);\n  const [isLoading, setIsLoading] = useState(true);\n  \n  useEffect(() => {\n    setTimeout(() => {\n      setIsLoading(false);\n      setUser({ name: 'John Doe', email: 'john@example.com' });\n    }, 1000);\n  }, []);\n  \n  const handleLogin = () => {\n    setUser({ name: 'John Doe', email: 'john@example.com' });\n  };\n  \n  const handleLogout = () => {\n    setUser(null);\n  };\n  \n  return (\n    <div className=\"app\">\n      <h1>Conditional Rendering Demo</h1>\n      \n      {isLoading ? (\n        <LoadingSpinner />\n      ) : user ? (\n        <UserProfile user={user} onLogout={handleLogout} />\n      ) : (\n        <LoginForm onLogin={handleLogin} />\n      )}\n      \n      <AdminPanel user={user} />\n    </div>\n  );\n}\n\nfunction LoadingSpinner() {\n  return (\n    <div className=\"loading\">\n      <p>Loading...</p>\n    </div>\n  );\n}\n\nfunction LoginForm({ onLogin }) {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (email && password) {\n      onLogin();\n    }\n  };\n  \n  return (\n    <div className=\"login-form\">\n      <h2>Login</h2>\n      <form onSubmit={handleSubmit}>\n        <input\n          type=\"email\"\n          placeholder=\"Email\"\n          value={email}\n          onChange={(e) => setEmail(e.target.value)}\n        />\n        <input\n          type=\"password\"\n          placeholder=\"Password\"\n          value={password}\n          onChange={(e) => setPassword(e.target.value)}\n        />\n        <button type=\"submit\">Login</button>\n      </form>\n    </div>\n  );\n}\n\nfunction UserProfile({ user, onLogout }) {\n  return (\n    <div className=\"user-profile\">\n      <h2>Welcome, {user.name}!</h2>\n      <p>Email: {user.email}</p>\n      <button onClick={onLogout}>Logout</button>\n    </div>\n  );\n}\n\nfunction AdminPanel({ user }) {\n  const isAdmin = user && user.email.includes('admin');\n  \n  if (!isAdmin) {\n    return null;\n  }\n  \n  return (\n    <div className=\"admin-panel\">\n      <h2>Admin Panel</h2>\n      <p>Admin functionality goes here</p>\n    </div>\n  );\n}\n\nconst root = createRoot(document.getElementById(\"root\"));\nroot.render(<App />);",
    },
    {
      name: "index.css",
      code: "body {\n  margin: 0;\n  padding: 20px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  background: #f5f5f5;\n}\n\n.app {\n  max-width: 600px;\n  margin: 0 auto;\n}\n\n.loading, .login-form, .user-profile, .admin-panel {\n  background: white;\n  border-radius: 8px;\n  padding: 2rem;\n  margin: 1rem 0;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  border: 1px solid #e0e0e0;\n}\n\nh1 {\n  color: #1976d2;\n  text-align: center;\n  margin-bottom: 2rem;\n}\n\nh2 {\n  color: #424242;\n  margin: 0 0 1rem 0;\n}\n\np {\n  margin: 0.5rem 0;\n  font-size: 1.1rem;\n}\n\ninput {\n  display: block;\n  width: 100%;\n  padding: 0.75rem;\n  margin: 0.5rem 0;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 1rem;\n  box-sizing: border-box;\n}\n\ninput:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n\nbutton {\n  background: #1976d2;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  margin: 0.5rem 0;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n  width: 100%;\n}\n\nbutton:hover {\n  background: #1565c0;\n}\n\n.admin-panel {\n  background: #e3f2fd;\n  border-color: #1976d2;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Conditional Rendering",
      code: "console.log('Testing conditional rendering...');\nconst isLoggedIn = true;\nconst element = isLoggedIn ? <div>Welcome</div> : <div>Login</div>;\nconsole.log('Conditional element:', element);",
    },
  ],
};
