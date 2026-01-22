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
          code: "let state = [];\nlet index = 0;\n\nfunction useState(initialValue) {\n  const currentIndex = index;\n  if (state[currentIndex] === undefined) {\n    state[currentIndex] = initialValue;\n  }\n  \n  const setState = (newValue) => {\n    state[currentIndex] = newValue;\n    index = 0;\n    render();\n  };\n  \n  index++;\n  return [state[currentIndex], setState];\n}",
        },
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
          code: "function twoSum(nums, target) {\n  const numDict = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in numDict) {\n      return [numDict[complement], i];\n    }\n    numDict[nums[i]] = i;\n  }\n  return [];\n}",
        },
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
          code: "function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') {\n    return obj;\n  }\n  \n  if (obj instanceof Date) {\n    return new Date(obj.getTime());\n  }\n  \n  if (obj instanceof Array) {\n    return obj.map(item => deepClone(item));\n  }\n  \n  const cloned = {};\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      cloned[key] = deepClone(obj[key]);\n    }\n  }\n  \n  return cloned;\n}",
        },
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
          code: "function debounce(func, delay) {\n  let timeoutId;\n  \n  return function(...args) {\n    clearTimeout(timeoutId);\n    \n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n}",
        },
      ],
    }
  ]
};
