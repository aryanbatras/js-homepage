export const promiseChainImplementation = {
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
};
