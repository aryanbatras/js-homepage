export const responsiveCardLayout = {
  title: "Responsive Card Layout",
  description: "Create a responsive card layout that adapts to different screen sizes",
  code_examples: [
    {
      example: "Example 1:",
      code: "<div class='card'>\n  <h3>Card Title</h3>\n  <p>Card content goes here</p>\n</div>",
    },
  ],
  hints: [
    {
      hint: "Hint: Use CSS Grid or Flexbox for responsive layout",
    },
    {
      hint: "Think about media queries for different screen sizes",
    },
  ],
  solution: [
    {
      approach: "Approach 1: CSS Grid with Media Queries",
      code: ".card-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  padding: 2rem;\n}\n\n.card {\n  background: white;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  transition: transform 0.2s ease;\n}\n\n.card:hover {\n  transform: translateY(-4px);\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\" />\n  <title>Responsive Card Layout</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n  <div class=\"card-container\">\n    <div class=\"card\">\n      <h3>Card 1</h3>\n      <p>This is the first card in our responsive layout.</p>\n    </div>\n    <div class=\"card\">\n      <h3>Card 2</h3>\n      <p>This card demonstrates the responsive grid system.</p>\n    </div>\n    <div class=\"card\">\n      <h3>Card 3</h3>\n      <p>Cards automatically adjust to screen size.</p>\n    </div>\n    <div class=\"card\">\n      <h3>Card 4</h3>\n      <p>Grid layout ensures proper spacing and alignment.</p>\n    </div>\n  </div>\n</body>\n</html>",
    },
    {
      name: "styles.css",
      code: ".card-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  padding: 2rem;\n}\n\n.card {\n  background: white;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  transition: transform 0.2s ease;\n}\n\n.card:hover {\n  transform: translateY(-4px);\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Card creation",
      code: "const card = document.createElement('div');\ncard.className = 'card';\ncard.innerHTML = '<h3>Test Card</h3><p>Content</p>';\nconsole.log('Card created:', card.className);"
    }
  ],
};
