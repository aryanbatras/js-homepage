export const debouncedSearchInput = {
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
};
