export const bounceAnimation = {
  title: "Bounce Animation Effects",
  description: "Create various bounce animations using CSS keyframes and transforms",
  code_examples: [
    {
      example: "Example 1:",
      code: ".bounce {\n  animation: bounce 2s infinite;\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use CSS transform translateY for vertical movement",
    },
    {
      hint: "Consider cubic-bezier timing functions for realistic bounce",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Keyframe Bounce Animation",
      code: ".bounce {\n  animation: bounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;\n}\n\n@keyframes bounce {\n  0%, 20%, 53%, 80%, 100% {\n    transform: translate3d(0, 0, 0);\n  }\n  40%, 43% {\n    transform: translate3d(0, -30px, 0);\n  }\n  70% {\n    transform: translate3d(0, -15px, 0);\n  }\n  90% {\n    transform: translate3d(0, -4px, 0);\n  }\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Bounce Animations</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <h1>Bounce Animation Examples</h1>\n    \n    <div class='animation-container'>\n      <h3>Basic Bounce</h3>\n      <div class='ball bounce-basic'></div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Infinite Bounce</h3>\n      <div class='ball bounce-infinite'></div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Elastic Bounce</h3>\n      <div class='ball bounce-elastic'></div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Bounce Entry</h3>\n      <div class='card bounce-entry'>\n        <h4>Bouncing Card</h4>\n        <p>This card bounces in when loaded</p>\n      </div>\n    </div>\n  </div>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  padding: 2rem;\n}\n\n.container {\n  max-width: 1000px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 16px;\n  padding: 2rem;\n  box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n}\n\nh1 {\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n  font-size: 2.5rem;\n}\n\n.animation-container {\n  text-align: center;\n  margin: 3rem 0;\n  padding: 2rem;\n  border: 2px solid #f0f0f0;\n  border-radius: 12px;\n  background: #fafafa;\n}\n\n.animation-container h3 {\n  color: #666;\n  margin-bottom: 2rem;\n  font-size: 1.2rem;\n}\n\n/* Ball Styles */\n.ball {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  margin: 0 auto;\n  position: relative;\n}\n\n.ball.bounce-basic {\n  background: linear-gradient(45deg, #ff6b6b, #ee5a24);\n  animation: bounce-basic 2s infinite;\n}\n\n.ball.bounce-infinite {\n  background: linear-gradient(45deg, #4ecdc4, #44a08d);\n  animation: bounce-infinite 1s ease-in-out infinite;\n}\n\n.ball.bounce-elastic {\n  background: linear-gradient(45deg, #f093fb, #f5576c);\n  animation: bounce-elastic 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;\n}\n\n/* Card Styles */\n.card {\n  background: white;\n  border-radius: 12px;\n  padding: 2rem;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n  max-width: 300px;\n  margin: 0 auto;\n}\n\n.card h4 {\n  color: #333;\n  margin-bottom: 1rem;\n}\n\n.card p {\n  color: #666;\n  line-height: 1.6;\n}\n\n.card.bounce-entry {\n  animation: bounce-entry 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n\n/* Animations */\n@keyframes bounce-basic {\n  0%, 20%, 53%, 80%, 100% {\n    transform: translate3d(0, 0, 0);\n  }\n  40%, 43% {\n    transform: translate3d(0, -80px, 0);\n  }\n  70% {\n    transform: translate3d(0, -40px, 0);\n  }\n  90% {\n    transform: translate3d(0, -10px, 0);\n  }\n}\n\n@keyframes bounce-infinite {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-100px);\n  }\n}\n\n@keyframes bounce-elastic {\n  0% {\n    transform: translateY(0) scale(1);\n  }\n  10% {\n    transform: translateY(0) scale(1.1, 0.9);\n  }\n  30% {\n    transform: translateY(-100px) scale(0.9, 1.1);\n  }\n  50% {\n    transform: translateY(0) scale(1.05, 0.95);\n  }\n  57% {\n    transform: translateY(-7px) scale(1, 1);\n  }\n  64% {\n    transform: translateY(0) scale(1, 1);\n  }\n  100% {\n    transform: translateY(0) scale(1, 1);\n  }\n}\n\n@keyframes bounce-entry {\n  0% {\n    opacity: 0;\n    transform: scale(0.3) translateY(-100px);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.05) translateY(0);\n  }\n  70% {\n    transform: scale(0.9) translateY(0);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Bounce element creation",
      code: "const bounceElement = document.createElement('div');\nbounceElement.className = 'bounce-basic';\nconsole.log('Bounce element created:', bounceElement.className);"
    }
  ],
};
