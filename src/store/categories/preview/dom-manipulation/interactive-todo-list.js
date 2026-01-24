export const interactiveTodoList = {
  title: "Interactive Todo List",
  description: "Build a todo list with add, delete, and toggle functionality",
  code_examples: [
    {
      example: "Example 1:",
      code: "const todo = document.createElement('li');\ntodo.textContent = 'New task';\nlist.appendChild(todo);",
    },
  ],
  hints: [
    {
      hint: "Hint: Use event delegation for dynamic content",
    },
    {
      hint: "Think about data persistence with localStorage",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Vanilla JavaScript Todo App",
      code: "class TodoApp {\n  constructor() {\n    this.todos = JSON.parse(localStorage.getItem('todos')) || [];\n    this.init();\n  }\n  \n  init() {\n    this.render();\n    document.getElementById('addForm').addEventListener('submit', (e) => {\n      e.preventDefault();\n      this.addTodo();\n    });\n  }\n  \n  addTodo() {\n    const input = document.getElementById('todoInput');\n    const text = input.value.trim();\n    if (text) {\n      this.todos.push({ id: Date.now(), text, completed: false });\n      this.save();\n      this.render();\n      input.value = '';\n    }\n  }\n  \n  toggleTodo(id) {\n    const todo = this.todos.find(t => t.id === id);\n    if (todo) {\n      todo.completed = !todo.completed;\n      this.save();\n      this.render();\n    }\n  }\n  \n  deleteTodo(id) {\n    this.todos = this.todos.filter(t => t.id !== id);\n    this.save();\n    this.render();\n  }\n  \n  save() {\n    localStorage.setItem('todos', JSON.stringify(this.todos));\n  }\n  \n  render() {\n    const list = document.getElementById('todoList');\n    list.innerHTML = '';\n    \n    this.todos.forEach(todo => {\n      const li = document.createElement('li');\n      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;\n      li.innerHTML = `\n        <input type='checkbox' ${todo.completed ? 'checked' : ''}>\n        <span>${todo.text}</span>\n        <button class='delete-btn'>×</button>\n      `;\n      \n      li.querySelector('input').addEventListener('change', () => this.toggleTodo(todo.id));\n      li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTodo(todo.id));\n      \n      list.appendChild(li);\n    });\n  }\n}",
    },
  ],
  files: [
    {
      name: "index.html",
      code: "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Todo List</title>\n  <link rel='stylesheet' href='styles.css'>\n</head>\n<body>\n  <div class='container'>\n    <h1>Todo List</h1>\n    <form id='addForm'>\n      <input type='text' id='todoInput' placeholder='Add a new task...' required>\n      <button type='submit'>Add</button>\n    </form>\n    <ul id='todoList'></ul>\n  </div>\n  <script src='script.js'></script>\n</body>\n</html>"
    },
    {
      name: "styles.css",
      code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background: #f5f5f5;\n  padding: 2rem;\n}\n\n.container {\n  max-width: 600px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 8px;\n  padding: 2rem;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}\n\nh1 {\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n}\n\n#addForm {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 2rem;\n}\n\n#todoInput {\n  flex: 1;\n  padding: 0.75rem;\n  border: 2px solid #ddd;\n  border-radius: 4px;\n  font-size: 1rem;\n}\n\n#todoInput:focus {\n  outline: none;\n  border-color: #007bff;\n}\n\nbutton {\n  padding: 0.75rem 1.5rem;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\nbutton:hover {\n  background: #0056b3;\n}\n\n#todoList {\n  list-style: none;\n}\n\n.todo-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-bottom: 1px solid #eee;\n}\n\n.todo-item:last-child {\n  border-bottom: none;\n}\n\n.todo-item.completed span {\n  text-decoration: line-through;\n  color: #999;\n}\n\n.todo-item input[type='checkbox'] {\n  width: 18px;\n  height: 18px;\n}\n\n.todo-item span {\n  flex: 1;\n  font-size: 1rem;\n}\n\n.delete-btn {\n  background: #dc3545;\n  color: white;\n  border: none;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  font-size: 18px;\n  line-height: 1;\n  padding: 0;\n}\n\n.delete-btn:hover {\n  background: #c82333;\n}"
    },
    {
      name: "script.js",
      code: "class TodoApp {\n  constructor() {\n    this.todos = JSON.parse(localStorage.getItem('todos')) || [];\n    this.init();\n  }\n  \n  init() {\n    this.render();\n    document.getElementById('addForm').addEventListener('submit', (e) => {\n      e.preventDefault();\n      this.addTodo();\n    });\n  }\n  \n  addTodo() {\n    const input = document.getElementById('todoInput');\n    const text = input.value.trim();\n    if (text) {\n      this.todos.push({ id: Date.now(), text, completed: false });\n      this.save();\n      this.render();\n      input.value = '';\n    }\n  }\n  \n  toggleTodo(id) {\n    const todo = this.todos.find(t => t.id === id);\n    if (todo) {\n      todo.completed = !todo.completed;\n      this.save();\n      this.render();\n    }\n  }\n  \n  deleteTodo(id) {\n    this.todos = this.todos.filter(t => t.id !== id);\n    this.save();\n    this.render();\n  }\n  \n  save() {\n    localStorage.setItem('todos', JSON.stringify(this.todos));\n  }\n  \n  render() {\n    const list = document.getElementById('todoList');\n    list.innerHTML = '';\n    \n    this.todos.forEach(todo => {\n      const li = document.createElement('li');\n      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;\n      li.innerHTML = `\n        <input type='checkbox' ${todo.completed ? 'checked' : ''}>\n        <span>${todo.text}</span>\n        <button class='delete-btn'>×</button>\n      `;\n      \n      li.querySelector('input').addEventListener('change', () => this.toggleTodo(todo.id));\n      li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTodo(todo.id));\n      \n      list.appendChild(li);\n    });\n  }\n}\n\nnew TodoApp();"
    }
  ],
  tests: [
    {
      test: "Test 1: Todo creation",
      code: "const app = new TodoApp();\napp.todos.push({ id: 1, text: 'Test task', completed: false });\napp.save();\nconsole.log('Todo saved:', localStorage.getItem('todos'));"
    }
  ],
};
