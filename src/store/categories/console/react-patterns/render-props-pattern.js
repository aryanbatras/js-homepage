export const renderPropsPattern = {
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
};
