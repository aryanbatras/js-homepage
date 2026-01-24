export const compoundComponents = {
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
};
