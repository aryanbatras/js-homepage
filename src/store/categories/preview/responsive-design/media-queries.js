export const mediaQueries = {
  title: "Advanced Media Queries",
  description: "Master responsive design with advanced media queries, container queries, and adaptive layouts",
  code_examples: [
    {
      example: "Example 1:",
      code: "@media (min-width: 768px) and (max-width: 1024px) {\n  .container {\n    padding: 2rem;\n    grid-template-columns: repeat(2, 1fr);\n  }\n}",
    },
  ],
  hints: [
    {
      hint: "Hint: Use mobile-first approach with min-width queries",
    },
    {
      hint: "Consider container queries for component-level responsiveness",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Breakpoint-based design",
      code: "const breakpoints = {\n  mobile: '(max-width: 767px)',\n  tablet: '(min-width: 768px) and (max-width: 1023px)',\n  desktop: '(min-width: 1024px)'\n};",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Advanced Media Queries</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <header class='header'>\n      <h1>Advanced Media Queries</h1>\n      <div class='breakpoint-indicator'>\n        <span class='current-breakpoint'>Mobile</span>\n        <span class='screen-size'></span>\n      </div>\n    </header>\n    \n    <main class='main'>\n      <section class='demo-section'>\n        <h2>Responsive Grid</h2>\n        <div class='responsive-grid'>\n          <div class='grid-item'>Item 1</div>\n          <div class='grid-item'>Item 2</div>\n          <div class='grid-item'>Item 3</div>\n          <div class='grid-item'>Item 4</div>\n        </div>\n      </section>\n      \n      <section class='demo-section'>\n        <h2>Adaptive Typography</h2>\n        <div class='typography-demo'>\n          <h1 class='responsive-heading'>Responsive Heading</h1>\n          <p class='responsive-text'>This text adapts to different screen sizes using fluid typography.</p>\n        </div>\n      </section>\n      \n      <section class='demo-section'>\n        <h2>Responsive Navigation</h2>\n        <nav class='responsive-nav'>\n          <div class='nav-brand'>Brand</div>\n          <button class='nav-toggle'>☰</button>\n          <ul class='nav-menu'>\n            <li><a href='#'>Home</a></li>\n            <li><a href='#'>About</a></li>\n            <li><a href='#'>Services</a></li>\n          </ul>\n        </nav>\n      </section>\n    </main>\n  </div>\n  \n  <script src='script.js'></script>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* { margin: 0; padding: 0; box-sizing: border-box; }\nbody { font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }\n.container { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; }\n.header { background: rgba(255, 255, 255, 0.95); border-radius: 15px; padding: 2rem; margin-bottom: 3rem; }\n.header h1 { font-size: 2rem; color: #2c3e50; }\n.breakpoint-indicator { font-family: monospace; font-size: 0.875rem; margin-top: 1rem; }\n.current-breakpoint { font-weight: bold; color: #667eea; }\n.demo-section { background: rgba(255, 255, 255, 0.95); border-radius: 15px; padding: 2rem; margin-bottom: 2rem; }\n.demo-section h2 { color: #2c3e50; margin-bottom: 1.5rem; }\n\n/* Responsive Grid */\n.responsive-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }\n.grid-item { background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 2rem; border-radius: 10px; text-align: center; min-height: 100px; }\n\n/* Typography */\n.responsive-heading { font-size: clamp(1.5rem, 4vw, 3rem); background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n.responsive-text { font-size: clamp(0.875rem, 2vw, 1.125rem); line-height: 1.8; }\n\n/* Navigation */\n.responsive-nav { display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; padding: 1rem; border-radius: 10px; }\n.nav-toggle { display: block; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #667eea; }\n.nav-menu { display: none; list-style: none; position: absolute; top: 100%; left: 0; right: 0; background: white; flex-direction: column; padding: 1rem; }\n.nav-menu.active { display: flex; }\n.nav-menu a { color: #667eea; text-decoration: none; padding: 0.5rem 1rem; border-radius: 5px; }\n\n/* Tablet: 768px and up */\n@media (min-width: 768px) {\n  .responsive-grid { grid-template-columns: repeat(2, 1fr); }\n  .nav-toggle { display: none; }\n  .nav-menu { display: flex; position: static; background: none; flex-direction: row; }\n}\n\n/* Desktop: 1024px and up */\n@media (min-width: 1024px) {\n  .responsive-grid { grid-template-columns: repeat(4, 1fr); }\n}\n\n/* Large Desktop: 1440px and up */\n@media (min-width: 1440px) {\n  .container { max-width: 1400px; }\n}\n\n/* Mobile: max 767px */\n@media (max-width: 767px) {\n  .container { padding: 1rem; }\n  .header h1 { font-size: 1.5rem; }\n}"
    },
    {
      name: "script.js",
      code: "class MediaQueryManager {\n  constructor() {\n    this.breakpoints = {\n      mobile: '(max-width: 767px)',\n      tablet: '(min-width: 768px) and (max-width: 1023px)',\n      desktop: '(min-width: 1024px)'\n    };\n    this.init();\n  }\n  \n  init() {\n    this.setupBreakpointDetection();\n    this.setupNavigation();\n    this.updateScreenSize();\n  }\n  \n  setupBreakpointDetection() {\n    Object.keys(this.breakpoints).forEach(breakpoint => {\n      const mediaQuery = window.matchMedia(this.breakpoints[breakpoint]);\n      mediaQuery.addListener((e) => {\n        if (e.matches) {\n          this.updateBreakpointIndicator(breakpoint);\n        }\n      });\n      \n      if (mediaQuery.matches) {\n        this.updateBreakpointIndicator(breakpoint);\n      }\n    });\n  }\n  \n  setupNavigation() {\n    const toggle = document.querySelector('.nav-toggle');\n    const menu = document.querySelector('.nav-menu');\n    \n    toggle.addEventListener('click', () => {\n      menu.classList.toggle('active');\n    });\n  }\n  \n  updateScreenSize() {\n    const screenSize = document.querySelector('.screen-size');\n    const updateSize = () => {\n      screenSize.textContent = `${window.innerWidth}x${window.innerHeight}`;\n    };\n    \n    updateSize();\n    window.addEventListener('resize', updateSize);\n  }\n  \n  updateBreakpointIndicator(breakpoint) {\n    const indicator = document.querySelector('.current-breakpoint');\n    indicator.textContent = breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1);\n  }\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  new MediaQueryManager();\n});"
    }
  ],
  tests: [
    {
      test: "Test 1: Media query manager initialization",
      code: "const manager = new MediaQueryManager();\nconsole.log('Media query manager initialized');"
    }
  ],
};
