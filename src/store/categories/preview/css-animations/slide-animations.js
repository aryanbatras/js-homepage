export const slideAnimations = {
  title: "Slide Animations",
  description: "Create smooth sliding animations using CSS transforms and transitions",
  code_examples: [
    {
      example: "Example 1:",
      code: ".slide {\n  animation: slideIn 1s ease-out;\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use CSS transform translateX/translateY for sliding",
    },
    {
      hint: "Consider overflow hidden for slide containers",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Transform-based Slide Animations",
      code: ".slide-in-left {\n  animation: slideInLeft 1s ease-out;\n}\n\n@keyframes slideInLeft {\n  from {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Slide Animations</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <h1>Slide Animation Examples</h1>\n    \n    <div class='animation-container'>\n      <h3>Slide In From Left</h3>\n      <div class='slide-box slide-left'>Slide From Left</div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Slide In From Right</h3>\n      <div class='slide-box slide-right'>Slide From Right</div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Slide In From Top</h3>\n      <div class='slide-box slide-top'>Slide From Top</div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Slide In From Bottom</h3>\n      <div class='slide-box slide-bottom'>Slide From Bottom</div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Sliding Carousel</h3>\n      <div class='carousel-container'>\n        <div class='carousel-track'>\n          <div class='carousel-item'>Slide 1</div>\n          <div class='carousel-item'>Slide 2</div>\n          <div class='carousel-item'>Slide 3</div>\n          <div class='carousel-item'>Slide 4</div>\n        </div>\n      </div>\n      <div class='carousel-controls'>\n        <button class='carousel-btn prev'>Previous</button>\n        <button class='carousel-btn next'>Next</button>\n      </div>\n    </div>\n    \n    <div class='animation-container'>\n      <h3>Sliding Menu</h3>\n      <button class='menu-toggle'>Toggle Menu</button>\n      <nav class='slide-menu'>\n        <ul>\n          <li><a href='#'>Home</a></li>\n          <li><a href='#'>About</a></li>\n          <li><a href='#'>Services</a></li>\n          <li><a href='#'>Contact</a></li>\n        </ul>\n      </nav>\n    </div>\n  </div>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  padding: 2rem;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 16px;\n  padding: 2rem;\n  box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n}\n\nh1 {\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n  font-size: 2.5rem;\n}\n\n.animation-container {\n  text-align: center;\n  margin: 3rem 0;\n  padding: 2rem;\n  border: 2px solid #f0f0f0;\n  border-radius: 12px;\n  background: #fafafa;\n}\n\n.animation-container h3 {\n  color: #666;\n  margin-bottom: 2rem;\n  font-size: 1.2rem;\n}\n\n/* Slide Box Styles */\n.slide-box {\n  width: 250px;\n  height: 100px;\n  background: linear-gradient(45deg, #ff6b6b, #ee5a24);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  margin: 0 auto;\n  font-weight: bold;\n  font-size: 1.1rem;\n}\n\n/* Slide Animations */\n.slide-left {\n  animation: slideInLeft 1s ease-out;\n}\n\n@keyframes slideInLeft {\n  from {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n.slide-right {\n  animation: slideInRight 1s ease-out;\n}\n\n@keyframes slideInRight {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n.slide-top {\n  animation: slideInTop 1s ease-out;\n}\n\n@keyframes slideInTop {\n  from {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.slide-bottom {\n  animation: slideInBottom 1s ease-out;\n}\n\n@keyframes slideInBottom {\n  from {\n    transform: translateY(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n/* Carousel Styles */\n.carousel-container {\n  position: relative;\n  width: 400px;\n  height: 200px;\n  margin: 0 auto 1rem;\n  overflow: hidden;\n  border-radius: 12px;\n  background: #f0f0f0;\n}\n\n.carousel-track {\n  display: flex;\n  height: 100%;\n  animation: carouselSlide 12s ease-in-out infinite;\n}\n\n.carousel-item {\n  min-width: 400px;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n  font-weight: bold;\n  color: white;\n  border-radius: 12px;\n}\n\n.carousel-item:nth-child(1) {\n  background: linear-gradient(45deg, #4ecdc4, #44a08d);\n}\n\n.carousel-item:nth-child(2) {\n  background: linear-gradient(45deg, #f093fb, #f5576c);\n}\n\n.carousel-item:nth-child(3) {\n  background: linear-gradient(45deg, #ffecd2, #fcb69f);\n}\n\n.carousel-item:nth-child(4) {\n  background: linear-gradient(45deg, #a8edea, #fed6e3);\n}\n\n@keyframes carouselSlide {\n  0%, 25% {\n    transform: translateX(0);\n  }\n  33.33%, 58.33% {\n    transform: translateX(-400px);\n  }\n  66.66%, 91.66% {\n    transform: translateX(-800px);\n  }\n  100% {\n    transform: translateX(-1200px);\n  }\n}\n\n.carousel-controls {\n  display: flex;\n  justify-content: center;\n  gap: 1rem;\n}\n\n.carousel-btn {\n  padding: 0.5rem 1rem;\n  background: linear-gradient(45deg, #667eea, #764ba2);\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: bold;\n  transition: transform 0.2s ease;\n}\n\n.carousel-btn:hover {\n  transform: scale(1.05);\n}\n\n/* Sliding Menu */\n.menu-toggle {\n  padding: 0.8rem 1.5rem;\n  background: linear-gradient(45deg, #667eea, #764ba2);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: bold;\n  margin-bottom: 1rem;\n  transition: transform 0.2s ease;\n}\n\n.menu-toggle:hover {\n  transform: scale(1.05);\n}\n\n.slide-menu {\n  position: relative;\n  width: 250px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n  overflow: hidden;\n  transform: translateX(-100%);\n  transition: transform 0.3s ease;\n}\n\n.slide-menu.active {\n  transform: translateX(0);\n}\n\n.slide-menu ul {\n  list-style: none;\n  padding: 1rem 0;\n}\n\n.slide-menu li {\n  padding: 0.8rem 1.5rem;\n  border-bottom: 1px solid #f0f0f0;\n}\n\n.slide-menu li:last-child {\n  border-bottom: none;\n}\n\n.slide-menu a {\n  text-decoration: none;\n  color: #333;\n  font-weight: 500;\n  transition: color 0.2s ease;\n}\n\n.slide-menu a:hover {\n  color: #667eea;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Slide element creation",
      code: "const slideElement = document.createElement('div');\nslideElement.className = 'slide-left';\nconsole.log('Slide element created:', slideElement.className);"
    }
  ],
};
