export const simpleHttpServer = {
  title: "Simple HTTP Server",
  description: "Create a basic HTTP server using Node.js without frameworks",
  code_examples: [
    {
      example: "Example 1:",
      code: "const server = http.createServer((req, res) => {\n  res.end('Hello World');\n});",
    },
  ],
  hints: [
    {
      hint: "Hint: Use Node's built-in http module",
    },
    {
      hint: "Hint: Handle different HTTP methods and routes",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic HTTP Server",
      code: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  const method = req.method;\n  const url = req.url;\n  \n  if (method === 'GET' && url === '/') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('Hello World');\n  } else {\n    res.writeHead(404, { 'Content-Type': 'text/plain' });\n    res.end('Not Found');\n  }\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});",
    },
  ],
  files: [
    {
      name: "server.js",
      code: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  const method = req.method;\n  const url = req.url;\n  \n  if (method === 'GET' && url === '/') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('Hello World');\n  } else {\n    res.writeHead(404, { 'Content-Type': 'text/plain' });\n    res.end('Not Found');\n  }\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});"
    }
  ],
  tests: [
    {
      test: "Test 1: Server creation",
      code: "const http = require('http');\nconst server = http.createServer(() => {});\nconsole.log('Server created:', typeof server.listen === 'function');"
    }
  ],
};
