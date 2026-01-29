export const deepCloneObject = {
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
      code: "const obj2 = { a: 1, b: { c: 2 } };\nconst cloned2 = deepClone(obj2);\nconsole.log('Original nested:', obj2.b);\nconsole.log('Cloned nested:', cloned2.b);\nconsole.log('Are nested objects different?', obj2.b !== cloned2.b);"
    },
    {
      test: "Test 3: Array cloning",
      code: "const arr = [1, [2, 3], { a: 4 }];\nconst clonedArr = deepClone(arr);\nconsole.log('Original array:', arr);\nconsole.log('Cloned array:', clonedArr);\nconsole.log('Are arrays different?', arr !== clonedArr);\nconsole.log('Are nested arrays different?', arr[1] !== clonedArr[1]);"
    }
  ],
};
