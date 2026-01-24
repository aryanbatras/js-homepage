export const webWorkersImplementation = {
  title: "Web Workers Implementation",
  description: "Use Web Workers for background processing",
  code_examples: [
    {
      example: "Example 1:",
      code: "const worker = new Worker('worker.js');\nworker.postMessage({ data: heavyTask });",
    },
  ],
  hints: [
    {
      hint: "Hint: Workers run in separate global scope",
    },
    {
      hint: "Hint: Use postMessage for communication",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Worker Setup",
      code: "// Main thread\nconst worker = new Worker('worker.js');\n\nworker.onmessage = function(e) {\n  console.log('Result from worker:', e.data);\n};\n\nworker.postMessage({ \n  type: 'CALCULATE',\n  data: [1, 2, 3, 4, 5]\n});\n\n// worker.js\nself.onmessage = function(e) {\n  if (e.data.type === 'CALCULATE') {\n    const result = e.data.data.reduce((a, b) => a + b, 0);\n    self.postMessage(result);\n  }\n};",
    },
  ],
  files: [
    {
      name: "main.js",
      code: "const worker = new Worker('worker.js');\n\nworker.onmessage = function(e) {\n  console.log('Result from worker:', e.data);\n};\n\nworker.postMessage({ \n  type: 'CALCULATE',\n  data: [1, 2, 3, 4, 5]\n});"
    },
    {
      name: "worker.js",
      code: "self.onmessage = function(e) {\n  if (e.data.type === 'CALCULATE') {\n    const result = e.data.data.reduce((a, b) => a + b, 0);\n    self.postMessage(result);\n  }\n};"
    }
  ],
  tests: [
    {
      test: "Test 1: Worker creation",
      code: "if (typeof Worker !== 'undefined') {\n  console.log('Web Workers supported');\n} else {\n  console.log('Web Workers not supported');\n}"
    }
  ],
};
