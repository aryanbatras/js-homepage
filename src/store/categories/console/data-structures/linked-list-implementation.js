export const linkedListImplementation = {
  title: "Linked List Implementation",
  description: "Implement a singly linked list with common operations",
  code_examples: [
    {
      example: "Example 1:",
      code: "const list = new LinkedList();\nlist.append(1);\nlist.append(2);\nlist.prepend(0);",
    },
  ],
  hints: [
    {
      hint: "Hint: Use Node class with value and next properties",
    },
    {
      hint: "Hint: Track head and tail for efficient operations",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Linked List",
      code: "class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() {\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n  \n  append(value) {\n    const newNode = new Node(value);\n    if (!this.head) {\n      this.head = newNode;\n      this.tail = newNode;\n    } else {\n      this.tail.next = newNode;\n      this.tail = newNode;\n    }\n    this.length++;\n  }\n  \n  prepend(value) {\n    const newNode = new Node(value);\n    if (!this.head) {\n      this.head = newNode;\n      this.tail = newNode;\n    } else {\n      newNode.next = this.head;\n      this.head = newNode;\n    }\n    this.length++;\n  }\n}",
    },
  ],
  files: [
    {
      name: "linkedList.js",
      code: "class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() {\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n  \n  append(value) {\n    const newNode = new Node(value);\n    if (!this.head) {\n      this.head = newNode;\n      this.tail = newNode;\n    } else {\n      this.tail.next = newNode;\n      this.tail = newNode;\n    }\n    this.length++;\n  }\n  \n  prepend(value) {\n    const newNode = new Node(value);\n    if (!this.head) {\n      this.head = newNode;\n      this.tail = newNode;\n    } else {\n      newNode.next = this.head;\n      this.head = newNode;\n    }\n    this.length++;\n  }\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic operations",
      code: "const list = new LinkedList();\nlist.append(1);\nlist.append(2);\nlist.prepend(0);\nconsole.log('Head value:', list.head.value);\nconsole.log('Tail value:', list.tail.value);\nconsole.log('Length:', list.length);"
    }
  ],
};
