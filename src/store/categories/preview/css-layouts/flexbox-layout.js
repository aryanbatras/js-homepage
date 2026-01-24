export const flexboxLayout = {
  title: "Flexbox Layout System",
  description: "Create responsive layouts using CSS Flexbox with various alignment and distribution techniques",
  code_examples: [
    {
      example: "Example 1:",
      code: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use display: flex to create a flex container",
    },
    {
      hint: "Consider justify-content for horizontal alignment",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Flexbox Container",
      code: ".flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Flexbox Layout</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <h1>Flexbox Layout Examples</h1>\n    \n    <div class='layout-section'>\n      <h3>Basic Flex Container</h3>\n      <div class='flex-basic'>\n        <div class='flex-item'>Item 1</div>\n        <div class='flex-item'>Item 2</div>\n        <div class='flex-item'>Item 3</div>\n      </div>\n    </div>\n    \n    <div class='layout-section'>\n      <h3>Center Alignment</h3>\n      <div class='flex-center'>\n        <div class='flex-item'>Centered</div>\n      </div>\n    </div>\n    \n    <div class='layout-section'>\n      <h3>Space Between</h3>\n      <div class='flex-space-between'>\n        <div class='flex-item'>Start</div>\n        <div class='flex-item'>Middle</div>\n        <div class='flex-item'>End</div>\n      </div>\n    </div>\n    \n    <div class='layout-section'>\n      <h3>Column Direction</h3>\n      <div class='flex-column'>\n        <div class='flex-item'>Column 1</div>\n        <div class='flex-item'>Column 2</div>\n        <div class='flex-item'>Column 3</div>\n      </div>\n    </div>\n    \n    <div class='layout-section'>\n      <h3>Wrap Layout</h3>\n      <div class='flex-wrap'>\n        <div class='flex-item'>Wrap 1</div>\n        <div class='flex-item'>Wrap 2</div>\n        <div class='flex-item'>Wrap 3</div>\n        <div class='flex-item'>Wrap 4</div>\n        <div class='flex-item'>Wrap 5</div>\n        <div class='flex-item'>Wrap 6</div>\n      </div>\n    </div>\n    \n    <div class='layout-section'>\n      <h3>Flex Grow</h3>\n      <div class='flex-grow'>\n        <div class='flex-item grow-1'>Grow 1</div>\n        <div class='flex-item grow-2'>Grow 2</div>\n        <div class='flex-item grow-3'>Grow 3</div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  padding: 2rem;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 16px;\n  padding: 2rem;\n  box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n}\n\nh1 {\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n  font-size: 2.5rem;\n}\n\n.layout-section {\n  margin: 3rem 0;\n  padding: 2rem;\n  border: 2px solid #f0f0f0;\n  border-radius: 12px;\n  background: #fafafa;\n}\n\n.layout-section h3 {\n  color: #666;\n  margin-bottom: 1.5rem;\n  font-size: 1.2rem;\n  text-align: center;\n}\n\n/* Flex Container Styles */\n.flex-basic,\n.flex-center,\n.flex-space-between,\n.flex-column,\n.flex-wrap,\n.flex-grow {\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 1rem;\n  min-height: 100px;\n  border: 2px dashed #dee2e6;\n}\n\n/* Basic Flex */\n.flex-basic {\n  display: flex;\n  gap: 1rem;\n}\n\n/* Center Alignment */\n.flex-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n/* Space Between */\n.flex-space-between {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n/* Column Direction */\n.flex-column {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n}\n\n/* Wrap Layout */\n.flex-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n/* Flex Grow */\n.flex-grow {\n  display: flex;\n  gap: 1rem;\n}\n\n/* Flex Items */\n.flex-item {\n  background: linear-gradient(45deg, #4ecdc4, #44a08d);\n  color: white;\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  font-weight: bold;\n  text-align: center;\n  min-width: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* Flex Grow Variations */\n.grow-1 {\n  flex: 1;\n  background: linear-gradient(45deg, #ff6b6b, #ee5a24);\n}\n\n.grow-2 {\n  flex: 2;\n  background: linear-gradient(45deg, #f093fb, #f5576c);\n}\n\n.grow-3 {\n  flex: 3;\n  background: linear-gradient(45deg, #ffecd2, #fcb69f);\n  color: #333;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .flex-space-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  \n  .flex-grow {\n    flex-direction: column;\n  }\n  \n  .container {\n    padding: 1rem;\n  }\n  \n  .layout-section {\n    padding: 1rem;\n  }\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Flex container creation",
      code: "const flexContainer = document.createElement('div');\nflexContainer.style.display = 'flex';\nflexContainer.className = 'flex-basic';\nconsole.log('Flex container created:', flexContainer.style.display);"
    }
  ],
};
