export const categories = [
  {
    id: 'react-js',
    name: 'React.js',
    description: 'React specific problems and patterns',
    icon: '⚛️',
    color: '#61DAFB'
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    description: 'Algorithm and data structure problems',
    icon: '💻',
    color: '#FFA116'
  },
  {
    id: 'core-javascript',
    name: 'Core JavaScript',
    description: 'JavaScript fundamentals and concepts',
    icon: '📜',
    color: '#F7DF1E'
  },
  {
    id: 'javascript-interview',
    name: 'JavaScript Interview',
    description: 'Common interview questions and scenarios',
    icon: '🎯',
    color: '#E34C26'
  },
  {
    id: 'react-hooks',
    name: 'React Hooks',
    description: 'Advanced React hooks patterns and implementations',
    icon: '🪝',
    color: '#149ECA'
  },
  {
    id: 'react-performance',
    name: 'React Performance',
    description: 'React optimization and performance tuning',
    icon: '⚡',
    color: '#FF6B35'
  },
  {
    id: 'react-patterns',
    name: 'React Patterns',
    description: 'Common React design patterns and architectures',
    icon: '🏗️',
    color: '#8B5CF6'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript type system and advanced features',
    icon: '📘',
    color: '#3178C6'
  },
  {
    id: 'node-js',
    name: 'Node.js',
    description: 'Server-side JavaScript and runtime concepts',
    icon: '🟢',
    color: '#339933'
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    description: 'Fundamental algorithms and problem-solving techniques',
    icon: '🧮',
    color: '#FF5722'
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    description: 'Core data structures and their implementations',
    icon: '🏛️',
    color: '#795548'
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Large-scale system design and architecture',
    icon: '🌐',
    color: '#2196F3'
  },
  {
    id: 'css-styling',
    name: 'CSS & Styling',
    description: 'Modern CSS techniques and styling solutions',
    icon: '🎨',
    color: '#1572B6'
  },
  {
    id: 'web-apis',
    name: 'Web APIs',
    description: 'Browser APIs and modern web features',
    icon: '🌍',
    color: '#4CAF50'
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Unit testing, integration testing, and TDD',
    icon: '🧪',
    color: '#C21325'
  },
  {
    id: 'async-programming',
    name: 'Async Programming',
    description: 'Promises, async/await, and concurrent programming',
    icon: '⏳',
    color: '#FF9800'
  },
  {
    id: 'functional-programming',
    name: 'Functional Programming',
    description: 'Functional programming concepts in JavaScript',
    icon: 'λ',
    color: '#607D8B'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Web security and vulnerability prevention',
    icon: '🔒',
    color: '#F44336'
  },
  {
    id: 'database',
    name: 'Database',
    description: 'SQL, NoSQL, and database design patterns',
    icon: '🗄️',
    color: '#3F51B5'
  }
];

export const problemsByCategory = {
  'react-js': [
    {
      title: "useState Hook Implementation",
      description: "Implement your own useState hook to understand React's state management",
      code_examples: [
        {
          example: "Example 1:",
          code: "const [count, setCount] = useState(0);",
        },
      ],
      hints: [
        {
          hint: "Hint: Think about closures and how React preserves state between renders",
        },
        {
          hint: "Hint: Consider using a global array to store states and their indices",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Using Global State Array",
          code: "let state = [];\nlet index = 0;\n\nfunction useState(initialValue) {\n  const currentIndex = index;\n  if (state[currentIndex] === undefined) {\n    state[currentIndex] = initialValue;\n  }\n  \n  const setState = (newValue) => {\n    state[currentIndex] = newValue;\n    index = 0;\n    render();\n  };\n  \n  index++;\n  return [state[currentIndex], setState];\n}",
        },
      ],
      files: [
        {
          name: "useState.js",
          code: "let state = [];\nlet index = 0;\n\nfunction useState(initialValue) {\n  const currentIndex = index;\n  if (state[currentIndex] === undefined) {\n    state[currentIndex] = initialValue;\n  }\n  \n  const setState = (newValue) => {\n    state[currentIndex] = newValue;\n    index = 0;\n    render();\n  };\n  \n  index++;\n  return [state[currentIndex], setState];\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Initial state",
          code: "let render = () => {};\nlet [count, setCount] = useState(0);\nconsole.log('Initial count:', count);\nsetCount(5);\nlet [newCount] = useState(0);\nconsole.log('Updated count:', newCount);"
        },
        {
          test: "Test 2: Multiple states",
          code: "let render = () => {};\nlet [count, setCount] = useState(0);\nlet [name, setName] = useState('John');\nconsole.log('Count:', count, 'Name:', name);\nsetCount(10);\nsetName('Doe');\nlet [newCount] = useState(0);\nlet [newName] = useState('');\nconsole.log('New Count:', newCount, 'New Name:', newName);"
        }
      ],
    },
    {
      title: "Custom useEffect Hook",
      description: "Implement your own useEffect hook to understand React's side effect management",
      code_examples: [
        {
          example: "Example 1:",
          code: "useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);",
        },
      ],
      hints: [
        {
          hint: "Hint: Think about dependency arrays and when effects should run",
        },
        {
          hint: "Hint: Consider storing previous dependencies to detect changes",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Dependency Comparison",
          code: "let prevDeps = [];\nlet effectIndex = 0;\n\nfunction useEffect(callback, deps) {\n  const currentIndex = effectIndex;\n  const hasNoDeps = !deps;\n  const hasChangedDeps = prevDeps[currentIndex] \n    ? !deps.every((dep, i) => dep === prevDeps[currentIndex][i])\n    : true;\n  \n  if (hasNoDeps || hasChangedDeps) {\n    prevDeps[currentIndex] = deps;\n    callback();\n  }\n  \n  effectIndex++;\n}",
        },
      ],
      files: [
        {
          name: "useEffect.js",
          code: "let prevDeps = [];\nlet effectIndex = 0;\n\nfunction useEffect(callback, deps) {\n  const currentIndex = effectIndex;\n  const hasNoDeps = !deps;\n  const hasChangedDeps = prevDeps[currentIndex] \n    ? !deps.every((dep, i) => dep === prevDeps[currentIndex][i])\n    : true;\n  \n  if (hasNoDeps || hasChangedDeps) {\n    prevDeps[currentIndex] = deps;\n    callback();\n  }\n  \n  effectIndex++;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Effect runs on mount",
          code: "let effectRan = false;\nuseEffect(() => {\n  effectRan = true;\n}, []);\nconsole.log('Effect ran on mount:', effectRan);"
        },
        {
          test: "Test 2: Effect runs with dependency changes",
          code: "let runCount = 0;\nuseEffect(() => {\n  runCount++;\n}, [1]);\nuseEffect(() => {\n  runCount++;\n}, [1]);\nuseEffect(() => {\n  runCount++;\n}, [2]);\nconsole.log('Effect run count:', runCount);"
        }
      ],
    },
    {
      title: "Virtual DOM Implementation",
      description: "Create a simple Virtual DOM with diffing algorithm",
      code_examples: [
        {
          example: "Example 1:",
          code: "const vdom = createElement('div', { className: 'container' }, 'Hello');",
        },
      ],
      hints: [
        {
          hint: "Hint: Think about how to represent DOM elements as JavaScript objects",
        },
        {
          hint: "Hint: Consider how to compare old and new virtual DOM trees",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Simple VDOM with Diffing",
          code: "function createElement(type, props, ...children) {\n  return { type, props: props || {}, children };\n}\n\nfunction render(vdom, container) {\n  const element = document.createElement(vdom.type);\n  \n  Object.keys(vdom.props).forEach(key => {\n    element.setAttribute(key, vdom.props[key]);\n  });\n  \n  vdom.children.forEach(child => {\n    if (typeof child === 'string') {\n      element.appendChild(document.createTextNode(child));\n    } else {\n      render(child, element);\n    }\n  });\n  \n  container.appendChild(element);\n}",
        },
      ],
      files: [
        {
          name: "virtualDOM.js",
          code: "function createElement(type, props, ...children) {\n  return { type, props: props || {}, children };\n}\n\nfunction render(vdom, container) {\n  const element = document.createElement(vdom.type);\n  \n  Object.keys(vdom.props).forEach(key => {\n    element.setAttribute(key, vdom.props[key]);\n  });\n  \n  vdom.children.forEach(child => {\n    if (typeof child === 'string') {\n      element.appendChild(document.createTextNode(child));\n    } else {\n      render(child, element);\n    }\n  });\n  \n  container.appendChild(element);\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Create simple element",
          code: "const vdom = createElement('div', { className: 'test' }, 'Hello World');\nconsole.log('VDOM structure:', JSON.stringify(vdom, null, 2));"
        },
        {
          test: "Test 2: Nested elements",
          code: "const vdom = createElement('div', {}, \n  createElement('span', {}, 'Nested'),\n  'Text'\n);\nconsole.log('Nested VDOM:', JSON.stringify(vdom, null, 2));"
        }
      ],
    },
    {
      title: "Context API Implementation",
      description: "Build your own Context API for state management across components",
      code_examples: [
        {
          example: "Example 1:",
          code: "const ThemeContext = createContext('light');\nconst theme = useContext(ThemeContext);",
        },
      ],
      hints: [
        {
          hint: "Hint: Use Provider pattern to pass data down the component tree",
        },
        {
          hint: "Think about how to store and retrieve context values",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Simple Context System",
          code: "let contextValue = null;\n\nfunction createContext(defaultValue) {\n  return {\n    Provider: ({ value, children }) => {\n      contextValue = value;\n      return children;\n    },\n    defaultValue\n  };\n}\n\nfunction useContext(context) {\n  return contextValue !== null ? contextValue : context.defaultValue;\n}",
        },
      ],
      files: [
        {
          name: "context.js",
          code: "let contextValue = null;\n\nfunction createContext(defaultValue) {\n  return {\n    Provider: ({ value, children }) => {\n      contextValue = value;\n      return children;\n    },\n    defaultValue\n  };\n}\n\nfunction useContext(context) {\n  return contextValue !== null ? contextValue : context.defaultValue;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic context usage",
          code: "const ThemeContext = createContext('light');\nconst provider = ThemeContext.Provider({ value: 'dark', children: null });\nconst theme = useContext(ThemeContext);\nconsole.log('Theme:', theme);"
        }
      ],
    },
    {
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
    }
  ],
  'leetcode': [
    {
      title: "Two Sum",
      description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      code_examples: [
        {
          example: "Example 1:",
          code: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
        },
        {
          example: "Example 2:",
          code: "Input: nums = [3,2,4], target = 6\nOutput: [1,2]",
        },
      ],
      hints: [
        {
          hint: "Hint: What if the numbers were sorted?",
        },
        {
          hint: "Hint: What if loops were used?",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Brute Force",
          code: "function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}",
        },
        {
          approach: "Approach 2: Hash Table",
          code: "function twoSum(nums, target) {\n  const numDict = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in numDict) {\n      return [numDict[complement], i];\n    }\n    numDict[nums[i]] = i;\n  }\n  return [];\n}",
        },
      ],
      files: [
        {
          name: "twoSum.js",
          code: "function twoSum(nums, target) {\n  const numDict = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in numDict) {\n      return [numDict[complement], i];\n    }\n    numDict[nums[i]] = i;\n  }\n  return [];\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic example",
          code: "console.log('Test 1 - Input: [2,7,11,15], target: 9');\nconsole.log('Expected: [0,1]');\nconsole.log('Actual:', twoSum([2,7,11,15], 9));"
        },
        {
          test: "Test 2: Different order",
          code: "console.log('Test 2 - Input: [3,2,4], target: 6');\nconsole.log('Expected: [1,2]');\nconsole.log('Actual:', twoSum([3,2,4], 6));"
        },
        {
          test: "Test 3: No solution",
          code: "console.log('Test 3 - Input: [1,2,3], target: 7');\nconsole.log('Expected: []');\nconsole.log('Actual:', twoSum([1,2,3], 7));"
        }
      ],
    },
    {
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string, find the length of the longest substring without repeating characters.",
      code_examples: [
        {
          example: "Example 1:",
          code: "Input: s = 'abcabcbb'\nOutput: 3",
        },
        {
          example: "Example 2:",
          code: "Input: s = 'bbbbb'\nOutput: 1",
        },
      ],
      hints: [
        {
          hint: "Hint: Think about sliding window technique",
        },
        {
          hint: "Hint: Use a hash map to track character positions",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Sliding Window",
          code: "function lengthOfLongestSubstring(s) {\n  const charMap = new Map();\n  let left = 0;\n  let maxLength = 0;\n  \n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (charMap.has(char) && charMap.get(char) >= left) {\n      left = charMap.get(char) + 1;\n    }\n    charMap.set(char, right);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  \n  return maxLength;\n}",
        },
      ],
      files: [
        {
          name: "longestSubstring.js",
          code: "function lengthOfLongestSubstring(s) {\n  const charMap = new Map();\n  let left = 0;\n  let maxLength = 0;\n  \n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (charMap.has(char) && charMap.get(char) >= left) {\n      left = charMap.get(char) + 1;\n    }\n    charMap.set(char, right);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  \n  return maxLength;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Mixed characters",
          code: "console.log('Test 1 - Input: abcabcbb');\nconsole.log('Expected: 3');\nconsole.log('Actual:', lengthOfLongestSubstring('abcabcbb'));"
        },
        {
          test: "Test 2: All same characters",
          code: "console.log('Test 2 - Input: bbbbb');\nconsole.log('Expected: 1');\nconsole.log('Actual:', lengthOfLongestSubstring('bbbbb'));"
        },
        {
          test: "Test 3: Empty string",
          code: "console.log('Test 3 - Input: \"\"');\nconsole.log('Expected: 0');\nconsole.log('Actual:', lengthOfLongestSubstring(''));"
        }
      ],
    },
    {
      title: "Merge Two Sorted Lists",
      description: "Merge two sorted linked lists and return it as a sorted list.",
      code_examples: [
        {
          example: "Example 1:",
          code: "Input: l1 = [1,2,4], l2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
        },
      ],
      hints: [
        {
          hint: "Hint: Use a dummy node to simplify the merge process",
        },
        {
          hint: "Hint: Compare nodes from both lists iteratively",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Iterative Merge",
          code: "function mergeTwoLists(l1, l2) {\n  const dummy = new ListNode(0);\n  let current = dummy;\n  \n  while (l1 && l2) {\n    if (l1.val <= l2.val) {\n      current.next = l1;\n      l1 = l1.next;\n    } else {\n      current.next = l2;\n      l2 = l2.next;\n    }\n    current = current.next;\n  }\n  \n  current.next = l1 || l2;\n  return dummy.next;\n}",
        },
      ],
      files: [
        {
          name: "mergeLists.js",
          code: "function ListNode(val, next = null) {\n  this.val = val;\n  this.next = next;\n}\n\nfunction mergeTwoLists(l1, l2) {\n  const dummy = new ListNode(0);\n  let current = dummy;\n  \n  while (l1 && l2) {\n    if (l1.val <= l2.val) {\n      current.next = l1;\n      l1 = l1.next;\n    } else {\n      current.next = l2;\n      l2 = l2.next;\n    }\n    current = current.next;\n  }\n  \n  current.next = l1 || l2;\n  return dummy.next;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic merge",
          code: "const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));\nconst l2 = new ListNode(1, new ListNode(3, new ListNode(4)));\nconst result = mergeTwoLists(l1, l2);\nconsole.log('Merged list:', result);"
        }
      ],
    },
    {
      title: "Valid Parentheses",
      description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      code_examples: [
        {
          example: "Example 1:",
          code: "Input: s = '()'\nOutput: true",
        },
        {
          example: "Example 2:",
          code: "Input: s = '()[]{}'\nOutput: true",
        },
        {
          example: "Example 3:",
          code: "Input: s = '(]'\nOutput: false",
        },
      ],
      hints: [
        {
          hint: "Hint: Use a stack to track opening brackets",
        },
        {
          hint: "Hint: Map closing brackets to their corresponding opening brackets",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Stack-based Solution",
          code: "function isValid(s) {\n  const stack = [];\n  const bracketMap = {\n    ')': '(',\n    '}': '{',\n    ']': '['\n  };\n  \n  for (const char of s) {\n    if (char in bracketMap) {\n      const topElement = stack.length === 0 ? '#' : stack.pop();\n      if (topElement !== bracketMap[char]) {\n        return false;\n      }\n    } else {\n      stack.push(char);\n    }\n  }\n  \n  return stack.length === 0;\n}",
        },
      ],
      files: [
        {
          name: "validParentheses.js",
          code: "function isValid(s) {\n  const stack = [];\n  const bracketMap = {\n    ')': '(',\n    '}': '{',\n    ']': '['\n  };\n  \n  for (const char of s) {\n    if (char in bracketMap) {\n      const topElement = stack.length === 0 ? '#' : stack.pop();\n      if (topElement !== bracketMap[char]) {\n        return false;\n      }\n    } else {\n      stack.push(char);\n    }\n  }\n  \n  return stack.length === 0;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Simple valid case",
          code: "console.log('Test 1 - Input: ()');\nconsole.log('Expected: true');\nconsole.log('Actual:', isValid('()'));"
        },
        {
          test: "Test 2: Multiple types",
          code: "console.log('Test 2 - Input: ()[]{}');\nconsole.log('Expected: true');\nconsole.log('Actual:', isValid('()[]{}'));"
        },
        {
          test: "Test 3: Invalid case",
          code: "console.log('Test 3 - Input: (]');\nconsole.log('Expected: false');\nconsole.log('Actual:', isValid('(]'));"
        }
      ],
    },
    {
      title: "Best Time to Buy and Sell Stock",
      description: "Given an array prices where prices[i] is the price of a given stock on the ith day, find the maximum profit you can achieve.",
      code_examples: [
        {
          example: "Example 1:",
          code: "Input: prices = [7,1,5,3,6,4]\nOutput: 5",
        },
        {
          example: "Example 2:",
          code: "Input: prices = [7,6,4,3,1]\nOutput: 0",
        },
      ],
      hints: [
        {
          hint: "Hint: Track the minimum price seen so far",
        },
        {
          hint: "Hint: Calculate profit at each step and keep track of maximum",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Single Pass",
          code: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  \n  for (const price of prices) {\n    if (price < minPrice) {\n      minPrice = price;\n    } else if (price - minPrice > maxProfit) {\n      maxProfit = price - minPrice;\n    }\n  }\n  \n  return maxProfit;\n}",
        },
      ],
      files: [
        {
          name: "maxProfit.js",
          code: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  \n  for (const price of prices) {\n    if (price < minPrice) {\n      minPrice = price;\n    } else if (price - minPrice > maxProfit) {\n      maxProfit = price - minPrice;\n    }\n  }\n  \n  return maxProfit;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Profit possible",
          code: "console.log('Test 1 - Input: [7,1,5,3,6,4]');\nconsole.log('Expected: 5');\nconsole.log('Actual:', maxProfit([7,1,5,3,6,4]));"
        },
        {
          test: "Test 2: No profit",
          code: "console.log('Test 2 - Input: [7,6,4,3,1]');\nconsole.log('Expected: 0');\nconsole.log('Actual:', maxProfit([7,6,4,3,1]));"
        },
        {
          test: "Test 3: Single day",
          code: "console.log('Test 3 - Input: [5]');\nconsole.log('Expected: 0');\nconsole.log('Actual:', maxProfit([5]));"
        }
      ],
    }
  ],
  'core-javascript': [
    {
      title: "Deep Clone Object",
      description: "Create a function that performs deep cloning of objects without using JSON methods",
      code_examples: [
        {
          example: "Example 1:",
          code: "const obj = { a: 1, b: { c: 2 } };\nconst cloned = deepClone(obj);\nconsole.log(cloned.b === obj.b); // false",
        },
      ],
      hints: [
        {
          hint: "Hint: Use recursion to handle nested objects",
        },
        {
          hint: "Hint: Consider different data types (arrays, functions, dates, etc.)",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Recursive Deep Clone",
          code: "function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') {\n    return obj;\n  }\n  \n  if (obj instanceof Date) {\n    return new Date(obj.getTime());\n  }\n  \n  if (obj instanceof Array) {\n    return obj.map(item => deepClone(item));\n  }\n  \n  const cloned = {};\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      cloned[key] = deepClone(obj[key]);\n    }\n  }\n  \n  return cloned;\n}",
        },
      ],
      files: [
        {
          name: "deepClone.js",
          code: "function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') {\n    return obj;\n  }\n  \n  if (obj instanceof Date) {\n    return new Date(obj.getTime());\n  }\n  \n  if (obj instanceof Array) {\n    return obj.map(item => deepClone(item));\n  }\n  \n  const cloned = {};\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      cloned[key] = deepClone(obj[key]);\n    }\n  }\n  \n  return cloned;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Simple object",
          code: "const obj = { a: 1, b: 2 };\nconst cloned = deepClone(obj);\nconsole.log('Original:', obj);\nconsole.log('Cloned:', cloned);\nconsole.log('Are they different objects?', obj !== cloned);"
        },
        {
          test: "Test 2: Nested object",
          code: "const obj = { a: 1, b: { c: 2 } };\nconst cloned = deepClone(obj);\nconsole.log('Original nested:', obj.b);\nconsole.log('Cloned nested:', cloned.b);\nconsole.log('Are nested objects different?', obj.b !== cloned.b);"
        },
        {
          test: "Test 3: Array cloning",
          code: "const arr = [1, [2, 3], { a: 4 }];\nconst cloned = deepClone(arr);\nconsole.log('Original array:', arr);\nconsole.log('Cloned array:', cloned);\nconsole.log('Are arrays different?', arr !== cloned);\nconsole.log('Are nested arrays different?', arr[1] !== cloned[1]);"
        }
      ],
    },
    {
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
    },
    {
      title: "Promise Chain Implementation",
      description: "Implement promise chaining to understand asynchronous flow",
      code_examples: [
        {
          example: "Example 1:",
          code: "promise\n  .then(result => result * 2)\n  .then(result => result + 1)\n  .then(final => console.log(final));",
        },
      ],
      hints: [
        {
          hint: "Hint: Each then() should return a new promise",
        },
        {
          hint: "Think about how to handle both success and error cases",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Basic Promise Chain",
          code: "class SimplePromise {\n  constructor(executor) {\n    this.state = 'pending';\n    this.value = undefined;\n    this.onFulfilled = [];\n    this.onRejected = [];\n    \n    const resolve = (value) => {\n      if (this.state === 'pending') {\n        this.state = 'fulfilled';\n        this.value = value;\n        this.onFulfilled.forEach(fn => fn());\n      }\n    };\n    \n    const reject = (reason) => {\n      if (this.state === 'pending') {\n        this.state = 'rejected';\n        this.value = reason;\n        this.onRejected.forEach(fn => fn());\n      }\n    };\n    \n    executor(resolve, reject);\n  }\n  \n  then(onFulfilled, onRejected) {\n    return new SimplePromise((resolve, reject) => {\n      const handleFulfilled = () => {\n        try {\n          const result = onFulfilled ? onFulfilled(this.value) : this.value;\n          resolve(result);\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      const handleRejected = () => {\n        try {\n          if (onRejected) {\n            const result = onRejected(this.value);\n            resolve(result);\n          } else {\n            reject(this.value);\n          }\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      if (this.state === 'fulfilled') {\n        setTimeout(handleFulfilled, 0);\n      } else if (this.state === 'rejected') {\n        setTimeout(handleRejected, 0);\n      } else {\n        this.onFulfilled.push(handleFulfilled);\n        this.onRejected.push(handleRejected);\n      }\n    });\n  }\n}",
        },
      ],
      files: [
        {
          name: "promiseChain.js",
          code: "class SimplePromise {\n  constructor(executor) {\n    this.state = 'pending';\n    this.value = undefined;\n    this.onFulfilled = [];\n    this.onRejected = [];\n    \n    const resolve = (value) => {\n      if (this.state === 'pending') {\n        this.state = 'fulfilled';\n        this.value = value;\n        this.onFulfilled.forEach(fn => fn());\n      }\n    };\n    \n    const reject = (reason) => {\n      if (this.state === 'pending') {\n        this.state = 'rejected';\n        this.value = reason;\n        this.onRejected.forEach(fn => fn());\n      }\n    };\n    \n    executor(resolve, reject);\n  }\n  \n  then(onFulfilled, onRejected) {\n    return new SimplePromise((resolve, reject) => {\n      const handleFulfilled = () => {\n        try {\n          const result = onFulfilled ? onFulfilled(this.value) : this.value;\n          resolve(result);\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      const handleRejected = () => {\n        try {\n          if (onRejected) {\n            const result = onRejected(this.value);\n            resolve(result);\n          } else {\n            reject(this.value);\n          }\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      if (this.state === 'fulfilled') {\n        setTimeout(handleFulfilled, 0);\n      } else if (this.state === 'rejected') {\n        setTimeout(handleRejected, 0);\n      } else {\n        this.onFulfilled.push(handleFulfilled);\n        this.onRejected.push(handleRejected);\n      }\n    });\n  }\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic chaining",
          code: "const promise = new SimplePromise(resolve => resolve(5));\npromise\n  .then(x => x * 2)\n  .then(x => x + 3)\n  .then(result => console.log('Chain result:', result));"
        }
      ],
    },
    {
      title: "Function Composition",
      description: "Create a function composition utility that combines multiple functions",
      code_examples: [
        {
          example: "Example 1:",
          code: "const addOne = x => x + 1;\nconst double = x => x * 2;\nconst composed = compose(addOne, double);\nconsole.log(composed(5)); // 11",
        },
      ],
      hints: [
        {
          hint: "Hint: Functions should be executed from right to left",
        },
        {
          hint: "Think about how to pass the result of one function to the next",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Right-to-left Composition",
          code: "function compose(...funcs) {\n  return function(initialValue) {\n    return funcs.reduceRight((acc, func) => func(acc), initialValue);\n  };\n}\n\nfunction pipe(...funcs) {\n  return function(initialValue) {\n    return funcs.reduce((acc, func) => func(acc), initialValue);\n  };\n}",
        },
      ],
      files: [
        {
          name: "compose.js",
          code: "function compose(...funcs) {\n  return function(initialValue) {\n    return funcs.reduceRight((acc, func) => func(acc), initialValue);\n  };\n}\n\nfunction pipe(...funcs) {\n  return function(initialValue) {\n    return funcs.reduce((acc, func) => func(acc), initialValue);\n  };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic composition",
          code: "const addOne = x => x + 1;\nconst double = x => x * 2;\nconst composed = compose(addOne, double);\nconsole.log('Compose result:', composed(5)); // Should be 11"
        },
        {
          test: "Test 2: Pipe function",
          code: "const addOne = x => x + 1;\nconst double = x => x * 2;\nconst piped = pipe(addOne, double);\nconsole.log('Pipe result:', piped(5)); // Should be 12"
        }
      ],
    },
    {
      title: "Memoization Implementation",
      description: "Create a memoization function to cache expensive function calls",
      code_examples: [
        {
          example: "Example 1:",
          code: "const expensiveFunction = memoize((n) => {\n  // Some expensive calculation\n  return n * 2;\n});",
        },
      ],
      hints: [
        {
          hint: "Hint: Use a cache object to store results",
        },
        {
          hint: "Consider how to handle multiple arguments for the cache key",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Simple Cache with JSON Key",
          code: "function memoize(fn) {\n  const cache = new Map();\n  \n  return function(...args) {\n    const key = JSON.stringify(args);\n    \n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    \n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}",
        },
      ],
      files: [
        {
          name: "memoize.js",
          code: "function memoize(fn) {\n  const cache = new Map();\n  \n  return function(...args) {\n    const key = JSON.stringify(args);\n    \n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    \n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic memoization",
          code: "let callCount = 0;\nconst expensive = memoize((x) => {\n  callCount++;\n  return x * 2;\n});\n\nconsole.log('First call:', expensive(5));\nconsole.log('Second call:', expensive(5));\nconsole.log('Call count:', callCount); // Should be 1"
        },
        {
          test: "Test 2: Different arguments",
          code: "let callCount = 0;\nconst expensive = memoize((x) => {\n  callCount++;\n  return x * 2;\n});\n\nconsole.log('Call with 5:', expensive(5));\nconsole.log('Call with 10:', expensive(10));\nconsole.log('Call count:', callCount); // Should be 2"
        }
      ],
    }
  ],
  'react-hooks': [
    {
      title: "Custom useReducer Hook",
      description: "Implement your own useReducer hook to understand state management patterns",
      code_examples: [
        {
          example: "Example 1:",
          code: "const [state, dispatch] = useReducer(reducer, initialState);",
        },
      ],
      hints: [
        {
          hint: "Hint: Think about how actions modify state",
        },
        {
          hint: "Hint: Consider using a global array to store reducer states",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Global State with Reducer",
          code: "let reducerStates = [];\nlet reducerIndex = 0;\n\nfunction useReducer(reducer, initialState) {\n  const currentIndex = reducerIndex;\n  if (reducerStates[currentIndex] === undefined) {\n    reducerStates[currentIndex] = initialState;\n  }\n  \n  const dispatch = (action) => {\n    reducerStates[currentIndex] = reducer(reducerStates[currentIndex], action);\n    reducerIndex = 0;\n    render();\n  };\n  \n  reducerIndex++;\n  return [reducerStates[currentIndex], dispatch];\n}",
        },
      ],
      files: [
        {
          name: "useReducer.js",
          code: "let reducerStates = [];\nlet reducerIndex = 0;\n\nfunction useReducer(reducer, initialState) {\n  const currentIndex = reducerIndex;\n  if (reducerStates[currentIndex] === undefined) {\n    reducerStates[currentIndex] = initialState;\n  }\n  \n  const dispatch = (action) => {\n    reducerStates[currentIndex] = reducer(reducerStates[currentIndex], action);\n    reducerIndex = 0;\n    render();\n  };\n  \n  reducerIndex++;\n  return [reducerStates[currentIndex], dispatch];\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Counter reducer",
          code: "const counterReducer = (state, action) => {\n  switch (action.type) {\n    case 'INCREMENT': return { count: state.count + 1 };\n    case 'DECREMENT': return { count: state.count - 1 };\n    default: return state;\n  }\n};\nlet [state, dispatch] = useReducer(counterReducer, { count: 0 });\nconsole.log('Initial state:', state);\ndispatch({ type: 'INCREMENT' });\nconsole.log('After increment:', state);"
        }
      ],
    },
    {
      title: "Custom useMemo Hook",
      description: "Implement your own useMemo hook to optimize expensive calculations",
      code_examples: [
        {
          example: "Example 1:",
          code: "const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b]);",
        },
      ],
      hints: [
        {
          hint: "Hint: Store previous dependencies and computed value",
        },
        {
          hint: "Recalculate only when dependencies change",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Dependency-based Memoization",
          code: "let memoStates = [];\nlet memoIndex = 0;\n\nfunction useMemo(callback, deps) {\n  const currentIndex = memoIndex;\n  const prevDeps = memoStates[currentIndex]?.deps;\n  const prevValue = memoStates[currentIndex]?.value;\n  \n  const hasNoDeps = !deps;\n  const hasChangedDeps = prevDeps \n    ? !deps.every((dep, i) => dep === prevDeps[i])\n    : true;\n  \n  if (hasNoDeps || hasChangedDeps) {\n    const value = callback();\n    memoStates[currentIndex] = { deps, value };\n  }\n  \n  memoIndex++;\n  return memoStates[currentIndex].value;\n}",
        },
      ],
      files: [
        {
          name: "useMemo.js",
          code: "let memoStates = [];\nlet memoIndex = 0;\n\nfunction useMemo(callback, deps) {\n  const currentIndex = memoIndex;\n  const prevDeps = memoStates[currentIndex]?.deps;\n  const prevValue = memoStates[currentIndex]?.value;\n  \n  const hasNoDeps = !deps;\n  const hasChangedDeps = prevDeps \n    ? !deps.every((dep, i) => dep === prevDeps[i])\n    : true;\n  \n  if (hasNoDeps || hasChangedDeps) {\n    const value = callback();\n    memoStates[currentIndex] = { deps, value };\n  }\n  \n  memoIndex++;\n  return memoStates[currentIndex].value;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Memoization works",
          code: "let calculationCount = 0;\nconst expensive = () => { calculationCount++; return 42; };\nconst memoized = useMemo(expensive, [1]);\nconsole.log('First call:', memoized);\nconsole.log('Second call:', useMemo(expensive, [1]));\nconsole.log('Calculation count:', calculationCount);"
        }
      ],
    },
    {
      title: "Custom useCallback Hook",
      description: "Implement your own useCallback hook to memoize functions",
      code_examples: [
        {
          example: "Example 1:",
          code: "const memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);",
        },
      ],
      hints: [
        {
          hint: "Hint: Use useMemo internally to memoize the function",
        },
        {
          hint: "Return the same function reference when dependencies don't change",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Function Memoization",
          code: "function useCallback(callback, deps) {\n  return useMemo(() => callback, deps);\n}",
        },
      ],
      files: [
        {
          name: "useCallback.js",
          code: "function useCallback(callback, deps) {\n  return useMemo(() => callback, deps);\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Callback memoization",
          code: "const callback1 = useCallback(() => console.log('test'), [1]);\nconst callback2 = useCallback(() => console.log('test'), [1]);\nconsole.log('Same reference:', callback1 === callback2);"
        }
      ],
    },
    {
      title: "Custom useRef Hook",
      description: "Implement your own useRef hook to persist values across renders",
      code_examples: [
        {
          example: "Example 1:",
          code: "const inputRef = useRef(null);\n<input ref={inputRef} />",
        },
      ],
      hints: [
        {
          hint: "Hint: Use a simple object to store the current value",
        },
        {
          hint: "The ref should persist across re-renders",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Simple Reference Storage",
          code: "let refStates = [];\nlet refIndex = 0;\n\nfunction useRef(initialValue) {\n  const currentIndex = refIndex;\n  if (refStates[currentIndex] === undefined) {\n    refStates[currentIndex] = { current: initialValue };\n  }\n  \n  refIndex++;\n  return refStates[currentIndex];\n}",
        },
      ],
      files: [
        {
          name: "useRef.js",
          code: "let refStates = [];\nlet refIndex = 0;\n\nfunction useRef(initialValue) {\n  const currentIndex = refIndex;\n  if (refStates[currentIndex] === undefined) {\n    refStates[currentIndex] = { current: initialValue };\n  }\n  \n  refIndex++;\n  return refStates[currentIndex];\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Ref persistence",
          code: "const ref1 = useRef(0);\nref1.current = 5;\nconst ref2 = useRef(0);\nconsole.log('Ref1 current:', ref1.current);\nconsole.log('Ref2 current:', ref2.current);\nconsole.log('Same ref:', ref1 === ref2);"
        }
      ],
    },
    {
      title: "Custom useContext Hook",
      description: "Implement your own useContext hook to consume context values",
      code_examples: [
        {
          example: "Example 1:",
          code: "const theme = useContext(ThemeContext);\nreturn <div style={{ color: theme }}>{children}</div>;",
        },
      ],
      hints: [
        {
          hint: "Hint: Use a global variable to track current context value",
        },
        {
          hint: "The hook should return the current context value",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Global Context Tracking",
          code: "let currentContextValue = null;\n\nfunction useContext(context) {\n  return currentContextValue !== null ? currentContextValue : context.defaultValue;\n}\n\nfunction createContext(defaultValue) {\n  return {\n    defaultValue,\n    Provider: ({ value, children }) => {\n      currentContextValue = value;\n      return children;\n    }\n  };\n}",
        },
      ],
      files: [
        {
          name: "useContext.js",
          code: "let currentContextValue = null;\n\nfunction useContext(context) {\n  return currentContextValue !== null ? currentContextValue : context.defaultValue;\n}\n\nfunction createContext(defaultValue) {\n  return {\n    defaultValue,\n    Provider: ({ value, children }) => {\n      currentContextValue = value;\n      return children;\n    }\n  };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Context consumption",
          code: "const ThemeContext = createContext('light');\nconst provider = ThemeContext.Provider({ value: 'dark', children: null });\nconst theme = useContext(ThemeContext);\nconsole.log('Theme:', theme);"
        }
      ],
    }
  ],
  'react-performance': [
    {
      title: "React.memo Implementation",
      description: "Implement your own React.memo to understand component memoization",
      code_examples: [
        {
          example: "Example 1:",
          code: "const MemoizedComponent = memo(MyComponent);",
        },
      ],
      hints: [
        {
          hint: "Hint: Think about shallow comparison of props",
        },
        {
          hint: "Hint: Consider storing previous props to detect changes",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Props Comparison",
          code: "function memo(Component) {\n  let prevProps = {};\n  let prevResult = null;\n  \n  return function(props) {\n    const hasChanged = Object.keys(props).some(\n      key => props[key] !== prevProps[key]\n    );\n    \n    if (hasChanged) {\n      prevProps = { ...props };\n      prevResult = Component(props);\n    }\n    \n    return prevResult;\n  };\n}",
        },
      ],
      files: [
        {
          name: "memo.js",
          code: "function memo(Component) {\n  let prevProps = {};\n  let prevResult = null;\n  \n  return function(props) {\n    const hasChanged = Object.keys(props).some(\n      key => props[key] !== prevProps[key]\n    );\n    \n    if (hasChanged) {\n      prevProps = { ...props };\n      prevResult = Component(props);\n    }\n    \n    return prevResult;\n  };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Memoization works",
          code: "let renderCount = 0;\nconst MyComponent = (props) => {\n  renderCount++;\n  return `Count: ${props.count}`;\n};\nconst MemoizedComponent = memo(MyComponent);\nconsole.log(MemoizedComponent({ count: 1 }));\nconsole.log(MemoizedComponent({ count: 1 }));\nconsole.log('Render count:', renderCount);"
        }
      ],
    },
    {
      title: "useCallback Optimization",
      description: "Optimize component re-renders using useCallback",
      code_examples: [
        {
          example: "Example 1:",
          code: "const handleClick = useCallback(() => {\n    setCount(count + 1);\n  }, [count]);",
        },
      ],
      hints: [
        {
          hint: "Hint: Functions are recreated on every render",
        },
        {
          hint: "Think about when the function should be recreated",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Function Memoization",
          code: "let callbackCache = new Map();\nlet callbackIndex = 0;\n\nfunction useCallback(callback, deps) {\n  const currentIndex = callbackIndex;\n  const cached = callbackCache.get(currentIndex);\n  \n  if (cached && deps && cached.deps && \n      deps.every((dep, i) => dep === cached.deps[i])) {\n    callbackIndex++;\n    return cached.callback;\n  }\n  \n  callbackCache.set(currentIndex, { callback, deps });\n  callbackIndex++;\n  return callback;\n}",
        },
      ],
      files: [
        {
          name: "useCallbackOpt.js",
          code: "let callbackCache = new Map();\nlet callbackIndex = 0;\n\nfunction useCallback(callback, deps) {\n  const currentIndex = callbackIndex;\n  const cached = callbackCache.get(currentIndex);\n  \n  if (cached && deps && cached.deps && \n      deps.every((dep, i) => dep === cached.deps[i])) {\n    callbackIndex++;\n    return cached.callback;\n  }\n  \n  callbackCache.set(currentIndex, { callback, deps });\n  callbackIndex++;\n  return callback;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Callback memoization",
          code: "const callback1 = useCallback(() => console.log('test'), [1]);\nconst callback2 = useCallback(() => console.log('test'), [1]);\nconsole.log('Same reference:', callback1 === callback2);"
        }
      ],
    },
    {
      title: "Virtual List Implementation",
      description: "Implement virtual scrolling for large lists",
      code_examples: [
        {
          example: "Example 1:",
          code: "<VirtualList \n  items={largeArray} \n  itemHeight={50} \n  containerHeight={400} \n/>",
        },
      ],
      hints: [
        {
          hint: "Hint: Calculate visible items based on scroll position",
        },
        {
          hint: "Think about how to handle scroll events efficiently",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Windowed Rendering",
          code: "function VirtualList({ items, itemHeight, containerHeight }) {\n  const [scrollTop, setScrollTop] = useState(0);\n  \n  const visibleStart = Math.floor(scrollTop / itemHeight);\n  const visibleEnd = Math.min(\n    visibleStart + Math.ceil(containerHeight / itemHeight),\n    items.length\n  );\n  \n  const visibleItems = items.slice(visibleStart, visibleEnd);\n  \n  return (\n    <div \n      style={{ height: containerHeight, overflow: 'auto' }}\n      onScroll={(e) => setScrollTop(e.target.scrollTop)}\n    >\n      <div style={{ height: items.length * itemHeight, position: 'relative' }}>\n        {visibleItems.map((item, index) => (\n          <div\n            key={visibleStart + index}\n            style={{\n              position: 'absolute',\n              top: (visibleStart + index) * itemHeight,\n              height: itemHeight,\n              width: '100%'\n            }}\n          >\n            {item}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}",
        },
      ],
      files: [
        {
          name: "VirtualList.js",
          code: "function VirtualList({ items, itemHeight, containerHeight }) {\n  const [scrollTop, setScrollTop] = useState(0);\n  \n  const visibleStart = Math.floor(scrollTop / itemHeight);\n  const visibleEnd = Math.min(\n    visibleStart + Math.ceil(containerHeight / itemHeight),\n    items.length\n  );\n  \n  const visibleItems = items.slice(visibleStart, visibleEnd);\n  \n  return (\n    <div \n      style={{ height: containerHeight, overflow: 'auto' }}\n      onScroll={(e) => setScrollTop(e.target.scrollTop)}\n    >\n      <div style={{ height: items.length * itemHeight, position: 'relative' }}>\n        {visibleItems.map((item, index) => (\n          <div\n            key={visibleStart + index}\n            style={{\n              position: 'absolute',\n              top: (visibleStart + index) * itemHeight,\n              height: itemHeight,\n              width: '100%'\n            }}\n          >\n            {item}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Virtual list calculation",
          code: "const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);\nconst visibleStart = Math.floor(250 / 50);\nconst visibleEnd = Math.min(visibleStart + Math.ceil(400 / 50), items.length);\nconsole.log('Visible range:', visibleStart, 'to', visibleEnd);"
        }
      ],
    },
    {
      title: "Lazy Component Loading",
      description: "Implement lazy loading for React components",
      code_examples: [
        {
          example: "Example 1:",
          code: "const LazyComponent = lazy(() => import('./MyComponent'));",
        },
      ],
      hints: [
        {
          hint: "Hint: Use dynamic imports with Promise",
        },
        {
          hint: "Think about loading states and error handling",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Dynamic Import Wrapper",
          code: "function lazy(importFunc) {\n  let Component = null;\n  let promise = null;\n  \n  return function LazyWrapper(props) {\n    if (!promise) {\n      promise = importFunc().then(module => {\n        Component = module.default;\n      });\n    }\n    \n    if (!Component) {\n      return <div>Loading...</div>;\n    }\n    \n    return <Component {...props} />;\n  };\n}",
        },
      ],
      files: [
        {
          name: "lazy.js",
          code: "function lazy(importFunc) {\n  let Component = null;\n  let promise = null;\n  \n  return function LazyWrapper(props) {\n    if (!promise) {\n      promise = importFunc().then(module => {\n        Component = module.default;\n      });\n    }\n    \n    if (!Component) {\n      return <div>Loading...</div>;\n    }\n    \n    return <Component {...props} />;\n  };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Lazy loading simulation",
          code: "const mockImport = () => Promise.resolve({ default: () => 'Component' });\nconst LazyComponent = lazy(mockImport);\nconsole.log('Lazy component created:', typeof LazyComponent);"
        }
      ],
    },
    {
      title: "Debounced Search Input",
      description: "Implement debounced search to optimize API calls",
      code_examples: [
        {
          example: "Example 1:",
          code: "const debouncedSearch = useDebounce(searchTerm, 500);",
        },
      ],
      hints: [
        {
          hint: "Hint: Use setTimeout to delay the search",
        },
        {
          hint: "Think about cleanup on unmount",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Debounce Hook",
          code: "function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  \n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n    \n    return () => {\n      clearTimeout(handler);\n    };\n  }, [value, delay]);\n  \n  return debouncedValue;\n}",
        },
      ],
      files: [
        {
          name: "useDebounce.js",
          code: "function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  \n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n    \n    return () => {\n      clearTimeout(handler);\n    };\n  }, [value, delay]);\n  \n  return debouncedValue;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Debounce behavior",
          code: "let value = 'initial';\nconst debounced = useDebounce('updated', 100);\nsetTimeout(() => console.log('Debounced value:', debounced), 150);"
        }
      ],
    }
  ],
  'typescript': [
    {
      title: "Generic Utility Types",
      description: "Implement TypeScript utility types like Partial, Required, and Pick",
      code_examples: [
        {
          example: "Example 1:",
          code: "type PartialUser = Partial<User>;\ntype UserEmail = Pick<User, 'email'>;",
        },
      ],
      hints: [
        {
          hint: "Hint: Use mapped types and keyof operator",
        },
        {
          hint: "Think about how to transform property types",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Mapped Types",
          code: "type Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype Pick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};",
        },
      ],
      files: [
        {
          name: "utilityTypes.ts",
          code: "type Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype Pick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};"
        }
      ],
      tests: [
        {
          test: "Test 1: Partial type",
          code: "interface User {\n  name: string;\n  age: number;\n  email: string;\n}\ntype PartialUser = Partial<User>;\nconst user: PartialUser = { name: 'John' };\nconsole.log('Partial user:', user);"
        }
      ],
    },
    {
      title: "Conditional Types",
      description: "Create conditional types that select types based on conditions",
      code_examples: [
        {
          example: "Example 1:",
          code: "type NonNullable<T> = T extends null | undefined ? never : T;",
        },
      ],
      hints: [
        {
          hint: "Hint: Use extends keyword for type conditions",
        },
        {
          hint: "Think about union types and never type",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Basic Conditional Types",
          code: "type NonNullable<T> = T extends null | undefined ? never : T;\n\ntype IsString<T> = T extends string ? true : false;\n\ntype ArrayElement<T> = T extends (infer U)[] ? U : never;",
        },
      ],
      files: [
        {
          name: "conditionalTypes.ts",
          code: "type NonNullable<T> = T extends null | undefined ? never : T;\n\ntype IsString<T> = T extends string ? true : false;\n\ntype ArrayElement<T> = T extends (infer U)[] ? U : never;"
        }
      ],
      tests: [
        {
          test: "Test 1: Conditional types",
          code: "type Test1 = NonNullable<string | null>;\ntype Test2 = IsString<'hello'>;\ntype Test3 = ArrayElement<string[]>;\nconsole.log('NonNullable result:', 'should be string');\nconsole.log('IsString result:', 'should be true');\nconsole.log('ArrayElement result:', 'should be string');"
        }
      ],
    },
    {
      title: "Generic Functions",
      description: "Implement generic functions with proper type constraints",
      code_examples: [
        {
          example: "Example 1:",
          code: "function identity<T>(arg: T): T {\n  return arg;\n}",
        },
      ],
      hints: [
        {
          hint: "Hint: Use angle brackets for generic parameters",
        },
        {
          hint: "Think about extends keyword for constraints",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Basic Generics",
          code: "function identity<T>(arg: T): T {\n  return arg;\n}\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nfunction merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {\n  return { ...obj1, ...obj2 };\n}",
        },
      ],
      files: [
        {
          name: "generics.ts",
          code: "function identity<T>(arg: T): T {\n  return arg;\n}\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nfunction merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {\n  return { ...obj1, ...obj2 };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Generic functions",
          code: "const result1 = identity('hello');\nconst user = { name: 'John', age: 30 };\nconst result2 = getProperty(user, 'name');\nconst result3 = merge({ a: 1 }, { b: 2 });\nconsole.log('Identity:', result1);\nconsole.log('Property:', result2);\nconsole.log('Merge:', result3);"
        }
      ],
    },
    {
      title: "Template Literal Types",
      description: "Create types using template literal strings",
      code_examples: [
        {
          example: "Example 1:",
          code: "type EventName = `on${Capitalize<string>}`;\ntype ClickEvent = EventName<'click'>; // 'onclick'",
        },
      ],
      hints: [
        {
          hint: "Hint: Use backticks for template literal types",
        },
        {
          hint: "Think about Uppercase and Lowercase intrinsic types",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Template Literals",
          code: "type EventName<T extends string> = `on${Capitalize<T>}`;\n\ntype CssProperty<T extends string> = `--${T}`;\n\ntype HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\ntype ApiEndpoint<T extends string> = `/api/${T}`;",
        },
      ],
      files: [
        {
          name: "templateTypes.ts",
          code: "type EventName<T extends string> = `on${Capitalize<T>}`;\n\ntype CssProperty<T extends string> = `--${T}`;\n\ntype HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\ntype ApiEndpoint<T extends string> = `/api/${T}`;"
        }
      ],
      tests: [
        {
          test: "Test 1: Template literal types",
          code: "type ClickEvent = EventName<'click'>;\ntype PrimaryColor = CssProperty<'primary'>;\ntype UsersEndpoint = ApiEndpoint<'users'>;\nconsole.log('Click event type:', 'should be onclick');\nconsole.log('CSS property type:', 'should be --primary');\nconsole.log('API endpoint type:', 'should be /api/users');"
        }
      ],
    },
    {
      title: "Mapped Types with Modifiers",
      description: "Create mapped types with readonly and optional modifiers",
      code_examples: [
        {
          example: "Example 1:",
          code: "type ReadonlyUser = Readonly<User>;\ntype OptionalUser = Partial<User>;",
        },
      ],
      hints: [
        {
          hint: "Hint: Use + and - modifiers for readonly and optional",
        },
        {
          hint: "Think about combining multiple modifiers",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Modifier Mapping",
          code: "type Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\ntype Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype ReadonlyPartial<T> = {\n  readonly [P in keyof T]?: T[P];\n};",
        },
      ],
      files: [
        {
          name: "mappedTypes.ts",
          code: "type Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\ntype Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype ReadonlyPartial<T> = {\n  readonly [P in keyof T]?: T[P];\n};"
        }
      ],
      tests: [
        {
          test: "Test 1: Mapped types",
          code: "interface User {\n  name: string;\n  age: number;\n}\ntype ReadonlyUser = Readonly<User>;\ntype OptionalUser = Partial<User>;\nconst readonlyUser: ReadonlyUser = { name: 'John', age: 30 };\nconst optionalUser: OptionalUser = { name: 'Jane' };\nconsole.log('Readonly user:', readonlyUser);\nconsole.log('Optional user:', optionalUser);"
        }
      ],
    }
  ],
  'react-patterns': [
    {
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
    },
    {
      title: "Render Props Pattern",
      description: "Use render props for component logic sharing",
      code_examples: [
        {
          example: "Example 1:",
          code: "<DataProvider render={data => (\n  <DataConsumer data={data}>\n    {data => <DisplayComponent data={data} />}\n  </DataConsumer>\n)}/>",
        },
      ],
      hints: [
        {
          hint: "Hint: Pass functions as props to delegate rendering",
        },
        {
          hint: "Think about how to share state between components",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Render Props Implementation",
          code: "function DataProvider({ children, render }) {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    fetchData().then(setData);\n  }, []);\n  \n  return render(data);\n}\n\nfunction DataConsumer({ children, data }) {\n  return children(data);\n}",
        },
      ],
      files: [
        {
          name: "renderProps.js",
          code: "function DataProvider({ children, render }) {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    fetchData().then(setData);\n  }, []);\n  \n  return render(data);\n}\n\nfunction DataConsumer({ children, data }) {\n  return children(data);\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Render props usage",
          code: "const App = () => (\n  <DataProvider render={data => (\n    <DataConsumer data={data}>\n      {data => <div>Data: {JSON.stringify(data)}</div>}\n    </DataConsumer>\n  )}/>\n);\nconsole.log('Render props pattern implemented');"
        }
      ],
    },
    {
      title: "Compound Components",
      description: "Create components that manage shared state implicitly",
      code_examples: [
        {
          example: "Example 1:",
          code: "<Accordion>\n  <AccordionItem title=\"Section 1\">Content 1</AccordionItem>\n  <AccordionItem title=\"Section 2\">Content 2</AccordionItem>\n</Accordion>",
        },
      ],
      hints: [
        {
          hint: "Hint: Use React.createContext for state sharing",
        },
        {
          hint: "Think about how child components communicate with parent",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Context-based Compound",
          code: "const AccordionContext = createContext({\n  openItems: new Set(),\n  toggle: () => {}\n});\n\nfunction Accordion({ children }) {\n  const [openItems, setOpenItems] = useState(new Set());\n  \n  const toggle = (item) => {\n    setOpenItems(prev => {\n      const newSet = new Set(prev);\n      if (newSet.has(item)) {\n        newSet.delete(item);\n      } else {\n        newSet.add(item);\n      }\n      return newSet;\n    });\n  };\n  \n  return (\n    <AccordionContext.Provider value={{ openItems, toggle }}>\n      {children}\n    </AccordionContext.Provider>\n  );\n}\n\nfunction AccordionItem({ children, title }) {\n  const { openItems, toggle } = useContext(AccordionContext);\n  const isOpen = openItems.has(title);\n  \n  return (\n    <div>\n      <button onClick={() => toggle(title)}>\n        {title} {isOpen ? '▼' : '▶'}\n      </button>\n      {isOpen && <div>{children}</div>}\n    </div>\n  );\n}",
        },
      ],
      files: [
        {
          name: "compound.js",
          code: "const AccordionContext = createContext({\n  openItems: new Set(),\n  toggle: () => {}\n});\n\nfunction Accordion({ children }) {\n  const [openItems, setOpenItems] = useState(new Set());\n  \n  const toggle = (item) => {\n    setOpenItems(prev => {\n      const newSet = new Set(prev);\n      if (newSet.has(item)) {\n        newSet.delete(item);\n      } else {\n        newSet.add(item);\n      }\n      return newSet;\n    });\n  };\n  \n  return (\n    <AccordionContext.Provider value={{ openItems, toggle }}>\n      {children}\n    </AccordionContext.Provider>\n  );\n}\n\nfunction AccordionItem({ children, title }) {\n  const { openItems, toggle } = useContext(AccordionContext);\n  const isOpen = openItems.has(title);\n  \n  return (\n    <div>\n      <button onClick={() => toggle(title)}>\n        {title} {isOpen ? '▼' : '▶'}\n      </button>\n      {isOpen && <div>{children}</div>}\n    </div>\n  );\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Compound component",
          code: "const accordion = <Accordion>\n  <AccordionItem title=\"Item 1\">Content 1</AccordionItem>\n  <AccordionItem title=\"Item 2\">Content 2</AccordionItem>\n</Accordion>;\nconsole.log('Compound component created:', accordion.type);"
        }
      ],
    },
    {
      title: "Custom Hook Pattern",
      description: "Create reusable custom hooks for component logic",
      code_examples: [
        {
          example: "Example 1:",
          code: "function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(s => !s);\n  return [state, toggle];\n}",
        },
      ],
      hints: [
        {
          hint: "Hint: Custom hooks start with 'use' and can call other hooks",
        },
        {
          hint: "Think about returning state and updater functions",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Reusable Hook Patterns",
          code: "function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(s => !s);\n  const setTrue = () => setState(true);\n  const setFalse = () => setState(false);\n  return [state, { toggle, setTrue, setFalse }];\n}\n\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  const reset = () => setCount(initialValue);\n  return [count, { increment, decrement, reset }];\n}\n\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));\n    } catch {\n      return initialValue;\n    }\n  });\n  \n  const setValue = (value) => {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n      setStoredValue(value);\n    } catch (error) {\n      console.error('Error saving to localStorage:', error);\n    }\n  };\n  \n  return [storedValue, setValue];\n}",
        },
      ],
      files: [
        {
          name: "customHooks.js",
          code: "function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(s => !s);\n  const setTrue = () => setState(true);\n  const setFalse = () => setState(false);\n  return [state, { toggle, setTrue, setFalse }];\n}\n\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  const reset = () => setCount(initialValue);\n  return [count, { increment, decrement, reset }];\n}\n\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));\n    } catch {\n      return initialValue;\n    }\n  });\n  \n  const setValue = (value) => {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n      setStoredValue(value);\n    } catch (error) {\n      console.error('Error saving to localStorage:', error);\n    }\n  };\n  \n  return [storedValue, setValue];\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Custom hooks",
          code: "const [isToggled, { toggle }] = useToggle();\nconst [count, { increment }] = useCounter(5);\nconst [name, setName] = useLocalStorage('username', 'Guest');\nconsole.log('Hooks state:', { isToggled, count, name });"
        }
      ],
    },
    {
      title: "State Reducer Pattern",
      description: "Implement complex state management with useReducer",
      code_examples: [
        {
          example: "Example 1:",
          code: "const [state, dispatch] = useReducer(appReducer, initialState);\n\ndispatch({ type: 'ADD_TODO', payload: 'Learn React' });",
        },
      ],
      hints: [
        {
          hint: "Hint: Use action types and payload for predictable updates",
        },
        {
          hint: "Think about separating state logic from components",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Todo App Reducer",
          code: "const todoReducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return {\n        ...state,\n        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]\n      };\n    case 'TOGGLE_TODO':\n      return {\n        ...state,\n        todos: state.todos.map(todo =>\n          todo.id === action.payload\n            ? { ...todo, completed: !todo.completed }\n            : todo\n        )\n      };\n    case 'DELETE_TODO':\n      return {\n        ...state,\n        todos: state.todos.filter(todo => todo.id !== action.payload)\n      };\n    default:\n      return state;\n  }\n};\n\nfunction TodoApp() {\n  const [state, dispatch] = useReducer(todoReducer, {\n    todos: [],\n    filter: 'all'\n  });\n  \n  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });\n  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });\n  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id });\n  \n  return (\n    <div>\n      <TodoList todos={state.todos} onToggle={toggleTodo} onDelete={deleteTodo} />\n      <TodoForm onAdd={addTodo} />\n    </div>\n  );\n}",
        },
      ],
      files: [
        {
          name: "reducerPattern.js",
          code: "const todoReducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return {\n        ...state,\n        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]\n      };\n    case 'TOGGLE_TODO':\n      return {\n        ...state,\n        todos: state.todos.map(todo =>\n          todo.id === action.payload\n            ? { ...todo, completed: !todo.completed }\n            : todo\n        )\n      };\n    case 'DELETE_TODO':\n      return {\n        ...state,\n        todos: state.todos.filter(todo => todo.id !== action.payload)\n      };\n    default:\n      return state;\n  }\n};\n\nfunction TodoApp() {\n  const [state, dispatch] = useReducer(todoReducer, {\n    todos: [],\n    filter: 'all'\n  });\n  \n  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });\n  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });\n  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id });\n  \n  return (\n    <div>\n      <TodoList todos={state.todos} onToggle={toggleTodo} onDelete={deleteTodo} />\n      <TodoForm onAdd={addTodo} />\n    </div>\n  );\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Reducer pattern",
          code: "const initialState = { todos: [] };\nconst newState = todoReducer(initialState, { type: 'ADD_TODO', payload: 'Test' });\nconsole.log('New state:', newState);\nconsole.log('Todo added:', newState.todos[0]?.text);"
        }
      ],
    }
  ],
  'javascript-interview': [
    {
      title: "Debounce Function",
      description: "Implement a debounce function that limits the rate at which a function gets called",
      code_examples: [
        {
          example: "Example 1:",
          code: "const debouncedSearch = debounce(searchAPI, 300);\nwindow.addEventListener('resize', debouncedSearch);",
        },
      ],
      hints: [
        {
          hint: "Hint: Use setTimeout to delay execution",
        },
        {
          hint: "Hint: Clear previous timeout on each call",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Timer-based Debounce",
          code: "function debounce(func, delay) {\n  let timeoutId;\n  \n  return function(...args) {\n    clearTimeout(timeoutId);\n    \n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n}",
        },
      ],
      files: [
        {
          name: "debounce.js",
          code: "function debounce(func, delay) {\n  let timeoutId;\n  \n  return function(...args) {\n    clearTimeout(timeoutId);\n    \n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic debouncing",
          code: "let callCount = 0;\nconst debouncedFn = debounce(() => {\n  callCount++;\n  console.log('Function called', callCount, 'times');\n}, 100);\n\ndebouncedFn();\ndebouncedFn();\ndebouncedFn();\nconsole.log('Immediate call count:', callCount);\n\nsetTimeout(() => {\n  console.log('After delay - call count:', callCount);\n}, 200);"
        },
        {
          test: "Test 2: Multiple rapid calls",
          code: "let callCount = 0;\nconst debouncedFn = debounce(() => {\n  callCount++;\n  console.log('Debounced call', callCount);\n}, 50);\n\nfor(let i = 0; i < 5; i++) {\n  setTimeout(() => debouncedFn(), i * 10);\n}\n\nsetTimeout(() => {\n  console.log('Final call count:', callCount);\n}, 200);"
        }
      ],
    }
  ],
  'node-js': [
    {
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
    }
  ],
  'algorithms': [
    {
      title: "Binary Search Implementation",
      description: "Implement binary search algorithm for sorted arrays",
      code_examples: [
        {
          example: "Example 1:",
          code: "const index = binarySearch([1, 2, 3, 4, 5], 3); // returns 2",
        },
      ],
      hints: [
        {
          hint: "Hint: Use two pointers approach",
        },
        {
          hint: "Hint: Continuously divide the search space in half",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Iterative Binary Search",
          code: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}",
        },
      ],
      files: [
        {
          name: "binarySearch.js",
          code: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Found element",
          code: "console.log('Found at index:', binarySearch([1, 2, 3, 4, 5], 3));"
        },
        {
          test: "Test 2: Not found",
          code: "console.log('Not found:', binarySearch([1, 2, 3, 4, 5], 6));"
        }
      ],
    }
  ],
  'data-structures': [
    {
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
    }
  ],
  'system-design': [
    {
      title: "URL Shortener Design",
      description: "Design a URL shortener service like bit.ly",
      code_examples: [
        {
          example: "Example 1:",
          code: "const shortUrl = urlShortener.shorten('https://example.com/very-long-url');",
        },
      ],
      hints: [
        {
          hint: "Hint: Use base62 encoding for compact URLs",
        },
        {
          hint: "Hint: Consider database schema and caching",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Hash-based Shortening",
          code: "class URLShortener {\n  constructor() {\n    this.urlMap = new Map();\n    this.counter = 1000;\n  }\n  \n  shorten(longUrl) {\n    const id = this.counter++;\n    const shortCode = this.encodeBase62(id);\n    this.urlMap.set(shortCode, longUrl);\n    return `https://short.ly/${shortCode}`;\n  }\n  \n  expand(shortUrl) {\n    const shortCode = shortUrl.split('/').pop();\n    return this.urlMap.get(shortCode);\n  }\n  \n  encodeBase62(num) {\n    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\n    let result = '';\n    while (num > 0) {\n      result = chars[num % 62] + result;\n      num = Math.floor(num / 62);\n    }\n    return result || '0';\n  }\n}",
        },
      ],
      files: [
        {
          name: "urlShortener.js",
          code: "class URLShortener {\n  constructor() {\n    this.urlMap = new Map();\n    this.counter = 1000;\n  }\n  \n  shorten(longUrl) {\n    const id = this.counter++;\n    const shortCode = this.encodeBase62(id);\n    this.urlMap.set(shortCode, longUrl);\n    return `https://short.ly/${shortCode}`;\n  }\n  \n  expand(shortUrl) {\n    const shortCode = shortUrl.split('/').pop();\n    return this.urlMap.get(shortCode);\n  }\n  \n  encodeBase62(num) {\n    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\n    let result = '';\n    while (num > 0) {\n      result = chars[num % 62] + result;\n      num = Math.floor(num / 62);\n    }\n    return result || '0';\n  }\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic shortening",
          code: "const shortener = new URLShortener();\nconst short = shortener.shorten('https://example.com/very-long-url');\nconsole.log('Short URL:', short);\nconsole.log('Expanded:', shortener.expand(short));"
        }
      ],
    }
  ],
  'css-styling': [
    {
      title: "CSS Grid Layout",
      description: "Create responsive layouts using CSS Grid",
      code_examples: [
        {
          example: "Example 1:",
          code: ".container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n}",
        },
      ],
      hints: [
        {
          hint: "Hint: Use grid-template-areas for named layouts",
        },
        {
          hint: "Hint: Combine with media queries for responsiveness",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Responsive Grid System",
          code: ".grid-container {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.grid-container--auto {\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}\n\n.grid-container--fixed {\n  grid-template-columns: 200px 1fr 200px;\n}\n\n@media (max-width: 768px) {\n  .grid-container--fixed {\n    grid-template-columns: 1fr;\n  }\n}",
        },
      ],
      files: [
        {
          name: "styles.css",
          code: ".grid-container {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.grid-container--auto {\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}\n\n.grid-container--fixed {\n  grid-template-columns: 200px 1fr 200px;\n}\n\n@media (max-width: 768px) {\n  .grid-container--fixed {\n    grid-template-columns: 1fr;\n  }\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Grid creation",
          code: "const container = document.createElement('div');\ncontainer.className = 'grid-container grid-container--auto';\nconsole.log('Grid container created:', container.className);"
        }
      ],
    }
  ],
  'web-apis': [
    {
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
    }
  ],
  'testing': [
    {
      title: "Simple Test Framework",
      description: "Create a minimal testing framework",
      code_examples: [
        {
          example: "Example 1:",
          code: "test('adds 1 + 2 to equal 3', () => {\n  expect(add(1, 2)).toBe(3);\n});",
        },
      ],
      hints: [
        {
          hint: "Hint: Use try-catch for assertion handling",
        },
        {
          hint: "Think about test organization and reporting",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Basic Test Runner",
          code: "class TestFramework {\n  constructor() {\n    this.tests = [];\n    this.results = [];\n  }\n  \n  test(description, testFn) {\n    this.tests.push({ description, testFn });\n  }\n  \n  expect(actual) {\n    return {\n      toBe: (expected) => {\n        if (actual !== expected) {\n          throw new Error(`Expected ${expected}, got ${actual}`);\n        }\n      },\n      toEqual: (expected) => {\n        if (JSON.stringify(actual) !== JSON.stringify(expected)) {\n          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);\n        }\n      }\n    };\n  }\n  \n  run() {\n    this.tests.forEach(({ description, testFn }) => {\n      try {\n        testFn();\n        this.results.push({ description, status: 'PASS' });\n      } catch (error) {\n        this.results.push({ description, status: 'FAIL', error: error.message });\n      }\n    });\n    this.report();\n  }\n  \n  report() {\n    this.results.forEach(({ description, status, error }) => {\n      console.log(`${status}: ${description}`);\n      if (error) console.log(`  ${error}`);\n    });\n  }\n}",
        },
      ],
      files: [
        {
          name: "testFramework.js",
          code: "class TestFramework {\n  constructor() {\n    this.tests = [];\n    this.results = [];\n  }\n  \n  test(description, testFn) {\n    this.tests.push({ description, testFn });\n  }\n  \n  expect(actual) {\n    return {\n      toBe: (expected) => {\n        if (actual !== expected) {\n          throw new Error(`Expected ${expected}, got ${actual}`);\n        }\n      },\n      toEqual: (expected) => {\n        if (JSON.stringify(actual) !== JSON.stringify(expected)) {\n          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);\n        }\n      }\n    };\n  }\n  \n  run() {\n    this.tests.forEach(({ description, testFn }) => {\n      try {\n        testFn();\n        this.results.push({ description, status: 'PASS' });\n      } catch (error) {\n        this.results.push({ description, status: 'FAIL', error: error.message });\n      }\n    });\n    this.report();\n  }\n  \n  report() {\n    this.results.forEach(({ description, status, error }) => {\n      console.log(`${status}: ${description}`);\n      if (error) console.log(`  ${error}`);\n    });\n  }\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Framework usage",
          code: "const framework = new TestFramework();\nframework.test('simple math', () => {\n  framework.expect(2 + 2).toBe(4);\n});\nframework.run();"
        }
      ],
    }
  ],
  'async-programming': [
    {
      title: "Promise Implementation",
      description: "Implement your own Promise class",
      code_examples: [
        {
          example: "Example 1:",
          code: "const promise = new MyPromise((resolve, reject) => {\n  setTimeout(() => resolve('Success!'), 1000);\n});",
        },
      ],
      hints: [
        {
          hint: "Hint: Use state machine with pending, fulfilled, rejected states",
        },
        {
          hint: "Hint: Store callbacks for async execution",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Basic Promise Implementation",
          code: "class MyPromise {\n  constructor(executor) {\n    this.state = 'pending';\n    this.value = undefined;\n    this.reason = undefined;\n    this.onFulfilledCallbacks = [];\n    this.onRejectedCallbacks = [];\n    \n    const resolve = (value) => {\n      if (this.state === 'pending') {\n        this.state = 'fulfilled';\n        this.value = value;\n        this.onFulfilledCallbacks.forEach(cb => cb());\n      }\n    };\n    \n    const reject = (reason) => {\n      if (this.state === 'pending') {\n        this.state = 'rejected';\n        this.reason = reason;\n        this.onRejectedCallbacks.forEach(cb => cb());\n      }\n    };\n    \n    try {\n      executor(resolve, reject);\n    } catch (error) {\n      reject(error);\n    }\n  }\n  \n  then(onFulfilled, onRejected) {\n    return new MyPromise((resolve, reject) => {\n      const handleFulfilled = () => {\n        try {\n          const result = onFulfilled ? onFulfilled(this.value) : this.value;\n          resolve(result);\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      const handleRejected = () => {\n        try {\n          if (onRejected) {\n            const result = onRejected(this.reason);\n            resolve(result);\n          } else {\n            reject(this.reason);\n          }\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      if (this.state === 'fulfilled') {\n        setTimeout(handleFulfilled, 0);\n      } else if (this.state === 'rejected') {\n        setTimeout(handleRejected, 0);\n      } else {\n        this.onFulfilledCallbacks.push(handleFulfilled);\n        this.onRejectedCallbacks.push(handleRejected);\n      }\n    });\n  }\n}",
        },
      ],
      files: [
        {
          name: "promise.js",
          code: "class MyPromise {\n  constructor(executor) {\n    this.state = 'pending';\n    this.value = undefined;\n    this.reason = undefined;\n    this.onFulfilledCallbacks = [];\n    this.onRejectedCallbacks = [];\n    \n    const resolve = (value) => {\n      if (this.state === 'pending') {\n        this.state = 'fulfilled';\n        this.value = value;\n        this.onFulfilledCallbacks.forEach(cb => cb());\n      }\n    };\n    \n    const reject = (reason) => {\n      if (this.state === 'pending') {\n        this.state = 'rejected';\n        this.reason = reason;\n        this.onRejectedCallbacks.forEach(cb => cb());\n      }\n    };\n    \n    try {\n      executor(resolve, reject);\n    } catch (error) {\n      reject(error);\n    }\n  }\n  \n  then(onFulfilled, onRejected) {\n    return new MyPromise((resolve, reject) => {\n      const handleFulfilled = () => {\n        try {\n          const result = onFulfilled ? onFulfilled(this.value) : this.value;\n          resolve(result);\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      const handleRejected = () => {\n        try {\n          if (onRejected) {\n            const result = onRejected(this.reason);\n            resolve(result);\n          } else {\n            reject(this.reason);\n          }\n        } catch (error) {\n          reject(error);\n        }\n      };\n      \n      if (this.state === 'fulfilled') {\n        setTimeout(handleFulfilled, 0);\n      } else if (this.state === 'rejected') {\n        setTimeout(handleRejected, 0);\n      } else {\n        this.onFulfilledCallbacks.push(handleFulfilled);\n        this.onRejectedCallbacks.push(handleRejected);\n      }\n    });\n  }\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic promise",
          code: "const promise = new MyPromise((resolve) => {\n  setTimeout(() => resolve('Hello World'), 100);\n});\n\npromise.then(result => {\n  console.log('Promise resolved:', result);\n});"
        }
      ],
    }
  ],
  'functional-programming': [
    {
      title: "Currying Function",
      description: "Implement currying to transform functions",
      code_examples: [
        {
          example: "Example 1:",
          code: "const add = (a, b) => a + b;\nconst curriedAdd = curry(add);\nconst add5 = curriedAdd(5);\nconsole.log(add5(3)); // 8",
        },
      ],
      hints: [
        {
          hint: "Hint: Return functions until all arguments are provided",
        },
        {
          hint: "Hint: Use function length property",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Recursive Currying",
          code: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs));\n      };\n    }\n  };\n}",
        },
      ],
      files: [
        {
          name: "curry.js",
          code: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs));\n      };\n    }\n  };\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Basic currying",
          code: "const add = (a, b, c) => a + b + c;\nconst curriedAdd = curry(add);\nconsole.log('Step 1:', curriedAdd(1));\nconsole.log('Step 2:', curriedAdd(1)(2));\nconsole.log('Step 3:', curriedAdd(1)(2)(3));"
        }
      ],
    }
  ],
  'security': [
    {
      title: "XSS Prevention",
      description: "Create functions to prevent Cross-Site Scripting attacks",
      code_examples: [
        {
          example: "Example 1:",
          code: "const safeHTML = escapeHTML('<script>alert(\"xss\")</script>');",
        },
      ],
      hints: [
        {
          hint: "Hint: Escape HTML special characters",
        },
        {
          hint: "Hint: Use textContent instead of innerHTML when possible",
        },
      ],
      solution: [
        {
          approach: "Approach 1: HTML Escaping",
          code: "function escapeHTML(str) {\n  const div = document.createElement('div');\n  div.textContent = str;\n  return div.innerHTML;\n}\n\nfunction sanitizeInput(input) {\n  return input\n    .replace(/[<>]/g, '')\n    .replace(/javascript:/gi, '')\n    .replace(/on\\w+=/gi, '');\n}\n\nfunction createSafeElement(tag, content) {\n  const element = document.createElement(tag);\n  if (content) {\n    element.textContent = content;\n  }\n  return element;\n}",
        },
      ],
      files: [
        {
          name: "security.js",
          code: "function escapeHTML(str) {\n  const div = document.createElement('div');\n  div.textContent = str;\n  return div.innerHTML;\n}\n\nfunction sanitizeInput(input) {\n  return input\n    .replace(/[<>]/g, '')\n    .replace(/javascript:/gi, '')\n    .replace(/on\\w+=/gi, '');\n}\n\nfunction createSafeElement(tag, content) {\n  const element = document.createElement(tag);\n  if (content) {\n    element.textContent = content;\n  }\n  return element;\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: HTML escaping",
          code: "const malicious = '<script>alert(\"xss\")</script>';\nconsole.log('Escaped:', escapeHTML(malicious));\nconsole.log('Sanitized:', sanitizeInput(malicious));"
        }
      ],
    }
  ],
  'database': [
    {
      title: "Simple ORM Implementation",
      description: "Create a basic Object-Relational Mapping system",
      code_examples: [
        {
          example: "Example 1:",
          code: "const users = new Model('users');\nconst user = await users.find(1);\nconst allUsers = await users.where('age', '>', 18).get();",
        },
      ],
      hints: [
        {
          hint: "Hint: Use query builder pattern",
        },
        {
          hint: "Think about method chaining for fluent interface",
        },
      ],
      solution: [
        {
          approach: "Approach 1: Query Builder",
          code: "class Model {\n  constructor(tableName) {\n    this.tableName = tableName;\n    this.query = {\n      where: [],\n      orderBy: null,\n      limit: null\n    };\n  }\n  \n  where(field, operator, value) {\n    this.query.where.push({ field, operator, value });\n    return this;\n  }\n  \n  orderBy(field, direction = 'ASC') {\n    this.query.orderBy = { field, direction };\n    return this;\n  }\n  \n  limit(count) {\n    this.query.limit = count;\n    return this;\n  }\n  \n  async get() {\n    let sql = `SELECT * FROM ${this.tableName}`;\n    \n    if (this.query.where.length > 0) {\n      const whereClause = this.query.where\n        .map(w => `${w.field} ${w.operator} '${w.value}'`)\n        .join(' AND ');\n      sql += ` WHERE ${whereClause}`;\n    }\n    \n    if (this.query.orderBy) {\n      sql += ` ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`;\n    }\n    \n    if (this.query.limit) {\n      sql += ` LIMIT ${this.query.limit}`;\n    }\n    \n    console.log('Generated SQL:', sql);\n    return this.executeQuery(sql);\n  }\n  \n  async executeQuery(sql) {\n    return new Promise(resolve => {\n      setTimeout(() => resolve([{ id: 1, name: 'John' }]), 100);\n    });\n  }\n}",
        },
      ],
      files: [
        {
          name: "orm.js",
          code: "class Model {\n  constructor(tableName) {\n    this.tableName = tableName;\n    this.query = {\n      where: [],\n      orderBy: null,\n      limit: null\n    };\n  }\n  \n  where(field, operator, value) {\n    this.query.where.push({ field, operator, value });\n    return this;\n  }\n  \n  orderBy(field, direction = 'ASC') {\n    this.query.orderBy = { field, direction };\n    return this;\n  }\n  \n  limit(count) {\n    this.query.limit = count;\n    return this;\n  }\n  \n  async get() {\n    let sql = `SELECT * FROM ${this.tableName}`;\n    \n    if (this.query.where.length > 0) {\n      const whereClause = this.query.where\n        .map(w => `${w.field} ${w.operator} '${w.value}'`)\n        .join(' AND ');\n      sql += ` WHERE ${whereClause}`;\n    }\n    \n    if (this.query.orderBy) {\n      sql += ` ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`;\n    }\n    \n    if (this.query.limit) {\n      sql += ` LIMIT ${this.query.limit}`;\n    }\n    \n    console.log('Generated SQL:', sql);\n    return this.executeQuery(sql);\n  }\n  \n  async executeQuery(sql) {\n    return new Promise(resolve => {\n      setTimeout(() => resolve([{ id: 1, name: 'John' }]), 100);\n    });\n  }\n}"
        }
      ],
      tests: [
        {
          test: "Test 1: Query building",
          code: "const users = new Model('users');\nusers.where('age', '>', 18).orderBy('name').limit(10).get().then(console.log);"
        }
      ],
    }
  ]
};
