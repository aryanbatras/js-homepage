export const promiseImplementation = {
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
};
