export const lazyComponentLoading = {
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
};
