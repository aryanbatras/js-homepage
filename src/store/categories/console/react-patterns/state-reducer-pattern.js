export const stateReducerPattern = {
  title: "State Reducer Pattern",
  description: "Implement complex state management with useReducer",
  code_examples: [
    {
      example: "Example 1:",
      code: "const [state, dispatch] = useReducer(appReducer, initialState);\n\ndispatch({ type: 'ADD_TODO', payload: 'Learn React' });",
    },
  ],
  hints: [
    {
      hint: "Hint: Use action types and payload for predictable updates",
    },
    {
      hint: "Think about separating state logic from components",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Todo App Reducer",
      code: "const todoReducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return {\n        ...state,\n        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]\n      };\n    case 'TOGGLE_TODO':\n      return {\n        ...state,\n        todos: state.todos.map(todo =>\n          todo.id === action.payload\n            ? { ...todo, completed: !todo.completed }\n            : todo\n        )\n      };\n    case 'DELETE_TODO':\n      return {\n        ...state,\n        todos: state.todos.filter(todo => todo.id !== action.payload)\n      };\n    default:\n      return state;\n  }\n};\n\nfunction TodoApp() {\n  const [state, dispatch] = useReducer(todoReducer, {\n    todos: [],\n    filter: 'all'\n  });\n  \n  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });\n  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });\n  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id });\n  \n  return (\n    <div>\n      <TodoList todos={state.todos} onToggle={toggleTodo} onDelete={deleteTodo} />\n      <TodoForm onAdd={addTodo} />\n    </div>\n  );\n}",
    },
  ],
  files: [
    {
      name: "reducerPattern.js",
      code: "const todoReducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return {\n        ...state,\n        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]\n      };\n    case 'TOGGLE_TODO':\n      return {\n        ...state,\n        todos: state.todos.map(todo =>\n          todo.id === action.payload\n            ? { ...todo, completed: !todo.completed }\n            : todo\n        )\n      };\n    case 'DELETE_TODO':\n      return {\n        ...state,\n        todos: state.todos.filter(todo => todo.id !== action.payload)\n      };\n    default:\n      return state;\n  }\n};\n\nfunction TodoApp() {\n  const [state, dispatch] = useReducer(todoReducer, {\n    todos: [],\n    filter: 'all'\n  });\n  \n  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });\n  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });\n  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id });\n  \n  return (\n    <div>\n      <TodoList todos={state.todos} onToggle={toggleTodo} onDelete={deleteTodo} />\n      <TodoForm onAdd={addTodo} />\n    </div>\n  );\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Reducer pattern",
      code: "const initialState = { todos: [] };\nconst newState = todoReducer(initialState, { type: 'ADD_TODO', payload: 'Test' });\nconsole.log('New state:', newState);\nconsole.log('Todo added:', newState.todos[0]?.text);"
    }
  ],
};
