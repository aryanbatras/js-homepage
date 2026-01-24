export const simpleTestFramework = {
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
};
