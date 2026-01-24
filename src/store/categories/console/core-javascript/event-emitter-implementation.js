export const eventEmitterImplementation = {
  title: "Event Emitter Implementation",
  description: "Create your own Event Emitter class similar to Node.js EventEmitter",
  code_examples: [
    {
      example: "Example 1:",
      code: "const emitter = new EventEmitter();\nemitter.on('test', (data) => console.log(data));\nemitter.emit('test', 'Hello World');",
    },
  ],
  hints: [
    {
      hint: "Hint: Use an object to store event listeners",
    },
    {
      hint: "Hint: Consider once listeners and error handling",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Event Emitter",
      code: "class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  \n  on(event, listener) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(listener);\n    return this;\n  }\n  \n  emit(event, ...args) {\n    if (!this.events[event]) {\n      return false;\n    }\n    this.events[event].forEach(listener => {\n      listener.apply(this, args);\n    });\n    return true;\n  }\n  \n  off(event, listenerToRemove) {\n    if (!this.events[event]) {\n      return this;\n    }\n    this.events[event] = this.events[event].filter(\n      listener => listener !== listenerToRemove\n    );\n    return this;\n  }\n}",
    },
  ],
  files: [
    {
      name: "eventEmitter.js",
      code: "class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  \n  on(event, listener) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(listener);\n    return this;\n  }\n  \n  emit(event, ...args) {\n    if (!this.events[event]) {\n      return false;\n    }\n    this.events[event].forEach(listener => {\n      listener.apply(this, args);\n    });\n    return true;\n  }\n  \n  off(event, listenerToRemove) {\n    if (!this.events[event]) {\n      return this;\n    }\n    this.events[event] = this.events[event].filter(\n      listener => listener !== listenerToRemove\n    );\n    return this;\n  }\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic emit/on",
      code: "const emitter = new EventEmitter();\nlet message = '';\nemitter.on('test', (data) => message = data);\nemitter.emit('test', 'Hello');\nconsole.log('Message received:', message);"
    },
    {
      test: "Test 2: Multiple listeners",
      code: "const emitter = new EventEmitter();\nlet count = 0;\nemitter.on('increment', () => count++);\nemitter.on('increment', () => count++);\nemitter.emit('increment');\nconsole.log('Count after emit:', count);"
    }
  ],
};
