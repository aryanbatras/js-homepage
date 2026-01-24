export const cssGridLayout = {
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
};
