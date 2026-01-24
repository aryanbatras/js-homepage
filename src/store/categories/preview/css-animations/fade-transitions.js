export const fadeTransitions = {
  title: "Fade Transitions and Effects",
  description: "Create smooth fade transitions and opacity effects using CSS animations",
  code_examples: [
    {
      example: "Example 1:",
      code: ".fade {\n  animation: fadeIn 2s ease-in-out;\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use opacity property for fade effects",
    },
    {
      hint: "Consider combining opacity with transform for smooth transitions",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Opacity-based Fade Animations",
      code: ".fade-in {\n  animation: fadeIn 1.5s ease-in-out;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Fade Transitions</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <h1>Fade Transition Examples</h1>\n    \n    <div class='transition-container'>\n      <h3>Fade In</h3>\n      <div class='box fade-in'>Fade In Box</div>\n    </div>\n    \n    <div class='transition-container'>\n      <h3>Fade Out</h3>\n      <div class='box fade-out'>Fade Out Box</div>\n    </div>\n    \n    <div class='transition-container'>\n      <h3>Cross Fade</h3>\n      <div class='crossfade-container'>\n        <div class='crossfade-item fade-item-1'>Item 1</div>\n        <div class='crossfade-item fade-item-2'>Item 2</div>\n      </div>\n    </div>\n    \n    <div class='transition-container'>\n      <h3>Sequential Fade</h3>\n      <div class='sequential-container'>\n        <div class='seq-item fade-1'>First</div>\n        <div class='seq-item fade-2'>Second</div>\n        <div class='seq-item fade-3'>Third</div>\n        <div class='seq-item fade-4'>Fourth</div>\n      </div>\n    </div>\n    \n    <div class='transition-container'>\n      <h3>Hover Fade</h3>\n      <div class='hover-fade-container'>\n        <div class='hover-fade-item'>Hover Over Me</div>\n        <div class='hover-fade-item'>And Me Too</div>\n        <div class='hover-fade-item'>Also This One</div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  padding: 2rem;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 16px;\n  padding: 2rem;\n  box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n}\n\nh1 {\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n  font-size: 2.5rem;\n}\n\n.transition-container {\n  text-align: center;\n  margin: 3rem 0;\n  padding: 2rem;\n  border: 2px solid #f0f0f0;\n  border-radius: 12px;\n  background: #fafafa;\n}\n\n.transition-container h3 {\n  color: #666;\n  margin-bottom: 2rem;\n  font-size: 1.2rem;\n}\n\n/* Basic Box Styles */\n.box {\n  width: 200px;\n  height: 100px;\n  background: linear-gradient(45deg, #ff6b6b, #ee5a24);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  margin: 0 auto;\n  font-weight: bold;\n  font-size: 1.1rem;\n}\n\n/* Fade In Animation */\n.fade-in {\n  animation: fadeIn 2s ease-in-out;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* Fade Out Animation */\n.fade-out {\n  animation: fadeOut 2s ease-in-out infinite alternate;\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0.2;\n  }\n}\n\n/* Cross Fade Container */\n.crossfade-container {\n  position: relative;\n  width: 300px;\n  height: 150px;\n  margin: 0 auto;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.crossfade-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: bold;\n  font-size: 1.5rem;\n  border-radius: 8px;\n}\n\n.fade-item-1 {\n  background: linear-gradient(45deg, #4ecdc4, #44a08d);\n  animation: crossfade1 4s ease-in-out infinite;\n}\n\n.fade-item-2 {\n  background: linear-gradient(45deg, #f093fb, #f5576c);\n  animation: crossfade2 4s ease-in-out infinite;\n}\n\n@keyframes crossfade1 {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n}\n\n@keyframes crossfade2 {\n  0%, 100% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n\n/* Sequential Fade */\n.sequential-container {\n  display: flex;\n  justify-content: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.seq-item {\n  width: 80px;\n  height: 80px;\n  background: linear-gradient(45deg, #a8edea, #fed6e3);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  color: #333;\n  opacity: 0;\n  animation-fill-mode: forwards;\n}\n\n.fade-1 {\n  animation: sequentialFade 1s ease-in-out 0.2s forwards;\n}\n\n.fade-2 {\n  animation: sequentialFade 1s ease-in-out 0.4s forwards;\n}\n\n.fade-3 {\n  animation: sequentialFade 1s ease-in-out 0.6s forwards;\n}\n\n.fade-4 {\n  animation: sequentialFade 1s ease-in-out 0.8s forwards;\n}\n\n@keyframes sequentialFade {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n/* Hover Fade */\n.hover-fade-container {\n  display: flex;\n  justify-content: center;\n  gap: 2rem;\n  flex-wrap: wrap;\n}\n\n.hover-fade-item {\n  width: 150px;\n  height: 80px;\n  background: linear-gradient(45deg, #ffecd2, #fcb69f);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  color: #333;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n\n.hover-fade-item:hover {\n  opacity: 0.6;\n  transform: scale(1.05);\n  background: linear-gradient(45deg, #a8edea, #fed6e3);\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Fade element creation",
      code: "const fadeElement = document.createElement('div');\nfadeElement.className = 'fade-in';\nconsole.log('Fade element created:', fadeElement.className);"
    }
  ],
};
