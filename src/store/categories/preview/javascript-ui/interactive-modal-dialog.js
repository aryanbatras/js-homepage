export const interactiveModalDialog = {
  title: "Interactive Modal Dialog",
  description: "Create a modal dialog with open, close, and overlay functionality",
  code_examples: [
    {
      example: "Example 1:",
      code: "modal.show();\nmodal.hide();",
    },
  ],
  hints: [
    {
      hint: "Hint: Use CSS transitions for smooth modal animations",
    },
    {
      hint: "Think about accessibility with focus management",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Modal Class with Events",
      code: "class Modal {\n  constructor(element) {\n    this.modal = element;\n    this.overlay = this.modal.querySelector('.modal-overlay');\n    this.content = this.modal.querySelector('.modal-content');\n    this.closeBtn = this.modal.querySelector('.close-btn');\n    \n    this.init();\n  }\n  \n  init() {\n    this.closeBtn.addEventListener('click', () => this.hide());\n    this.overlay.addEventListener('click', () => this.hide());\n    \n    document.addEventListener('keydown', (e) => {\n      if (e.key === 'Escape' && this.isVisible()) {\n        this.hide();\n      }\n    });\n  }\n  \n  show() {\n    this.modal.style.display = 'flex';\n    document.body.style.overflow = 'hidden';\n    setTimeout(() => {\n      this.modal.classList.add('visible');\n    }, 10);\n  }\n  \n  hide() {\n    this.modal.classList.remove('visible');\n    setTimeout(() => {\n      this.modal.style.display = 'none';\n      document.body.style.overflow = '';\n    }, 300);\n  }\n  \n  isVisible() {\n    return this.modal.classList.contains('visible');\n  }\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Modal Dialog</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <h1>Modal Dialog Example</h1>\n    <button id='openModal' class='btn'>Open Modal</button>\n    <p>Click the button to open the modal dialog.</p>\n  </div>\n  \n  <div id='modal' class='modal'>\n    <div class='modal-overlay'></div>\n    <div class='modal-content'>\n      <button class='close-btn'>&times;</button>\n      <h2>Modal Title</h2>\n      <p>This is a modal dialog. You can close it by clicking the close button, the overlay, or pressing the Escape key.</p>\n      <button class='btn' id='closeModal'>Close</button>\n    </div>\n  </div>\n  \n  <script src='script.js'></script>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background: #f5f5f5;\n  padding: 2rem;\n}\n\n.container {\n  max-width: 600px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 8px;\n  padding: 2rem;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  text-align: center;\n}\n\nh1 {\n  color: #333;\n  margin-bottom: 2rem;\n}\n\np {\n  color: #666;\n  line-height: 1.6;\n  margin: 1rem 0;\n}\n\n.btn {\n  background: #007bff;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: background 0.2s ease;\n}\n\n.btn:hover {\n  background: #0056b3;\n}\n\n/* Modal Styles */\n.modal {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n\n.modal-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n\n.modal-content {\n  background: white;\n  border-radius: 8px;\n  padding: 2rem;\n  max-width: 500px;\n  width: 90%;\n  position: relative;\n  transform: scale(0.7);\n  opacity: 0;\n  transition: all 0.3s ease;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n}\n\n.modal.visible .modal-overlay {\n  opacity: 1;\n}\n\n.modal.visible .modal-content {\n  transform: scale(1);\n  opacity: 1;\n}\n\n.close-btn {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  cursor: pointer;\n  color: #999;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: all 0.2s ease;\n}\n\n.close-btn:hover {\n  background: #f0f0f0;\n  color: #333;\n}\n\n.modal-content h2 {\n  color: #333;\n  margin-bottom: 1rem;\n}\n\n.modal-content p {\n  margin-bottom: 2rem;\n  text-align: left;\n}"
    },
    {
      name: "script.js",
      code: "class Modal {\n  constructor(element) {\n    this.modal = element;\n    this.overlay = this.modal.querySelector('.modal-overlay');\n    this.content = this.modal.querySelector('.modal-content');\n    this.closeBtn = this.modal.querySelector('.close-btn');\n    \n    this.init();\n  }\n  \n  init() {\n    this.closeBtn.addEventListener('click', () => this.hide());\n    this.overlay.addEventListener('click', () => this.hide());\n    \n    document.addEventListener('keydown', (e) => {\n      if (e.key === 'Escape' && this.isVisible()) {\n        this.hide();\n      }\n    });\n  }\n  \n  show() {\n    this.modal.style.display = 'flex';\n    document.body.style.overflow = 'hidden';\n    setTimeout(() => {\n      this.modal.classList.add('visible');\n    }, 10);\n  }\n  \n  hide() {\n    this.modal.classList.remove('visible');\n    setTimeout(() => {\n      this.modal.style.display = 'none';\n      document.body.style.overflow = '';\n    }, 300);\n  }\n  \n  isVisible() {\n    return this.modal.classList.contains('visible');\n  }\n}\n\n// Initialize modal\ndocument.addEventListener('DOMContentLoaded', () => {\n  const modal = new Modal(document.getElementById('modal'));\n  \n  document.getElementById('openModal').addEventListener('click', () => {\n    modal.show();\n  });\n  \n  document.getElementById('closeModal').addEventListener('click', () => {\n    modal.hide();\n  });\n});"
    }
  ],
};
