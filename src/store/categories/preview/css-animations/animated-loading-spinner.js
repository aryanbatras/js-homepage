export const animatedLoadingSpinner = {
  title: "Animated Loading Spinner",
  description: "Create a CSS-only loading spinner with smooth animations",
  code_examples: [
    {
      example: "Example 1:",
      code: ".spinner {\n  animation: spin 1s linear infinite;\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use CSS keyframes for rotation animation",
    },
    {
      hint: "Consider border styling for the spinner effect",
    },
  ],
  solution: [
    {
      approach: "Approach 1: CSS Border Animation",
      code: ".spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #3498db;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Loading Spinner</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <h1>Loading Spinner Examples</h1>\n    \n    <div class='spinner-container'>\n      <h3>Basic Spinner</h3>\n      <div class='spinner'></div>\n    </div>\n    \n    <div class='spinner-container'>\n      <h3>Pulse Spinner</h3>\n      <div class='spinner pulse'></div>\n    </div>\n    \n    <div class='spinner-container'>\n      <h3>Dotted Spinner</h3>\n      <div class='dotted-spinner'>\n        <div class='dot'></div>\n        <div class='dot'></div>\n        <div class='dot'></div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background: #f5f5f5;\n  padding: 2rem;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 8px;\n  padding: 2rem;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}\n\nh1 {\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n}\n\n.spinner-container {\n  text-align: center;\n  margin: 2rem 0;\n  padding: 2rem;\n  border: 1px solid #eee;\n  border-radius: 8px;\n}\n\n.spinner-container h3 {\n  color: #666;\n  margin-bottom: 1rem;\n}\n\n/* Basic Spinner */\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #3498db;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto;\n}\n\n/* Pulse Spinner */\n.spinner.pulse {\n  border-color: #e74c3c;\n  border-top-color: #c0392b;\n  animation: spin 1s linear infinite, pulse 1.5s ease-in-out infinite;\n}\n\n/* Dotted Spinner */\n.dotted-spinner {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n}\n\n.dot {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  background: #2ecc71;\n  animation: bounce 1.4s ease-in-out infinite both;\n}\n\n.dot:nth-child(1) { animation-delay: -0.32s; }\n.dot:nth-child(2) { animation-delay: -0.16s; }\n.dot:nth-child(3) { animation-delay: 0; }\n\n/* Animations */\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes bounce {\n  0%, 80%, 100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Spinner creation",
      code: "const spinner = document.createElement('div');\nspinner.className = 'spinner';\nconsole.log('Spinner created:', spinner.className);"
    }
  ],
};
