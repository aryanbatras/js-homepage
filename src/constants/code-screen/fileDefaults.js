// export const DEFAULT_FILES = [
//   {
//     name: "index.js",
//     language: "javascript",
//     content: `import React from "react";
// import ReactDOM from "react-dom";

// function App() {
//   return <h1>Hello World</h1>;
// }
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);`,
//     active: true,
//   },
//   {
//     name: "index.html",
//     language: "html",
//     content: `<!DOCTYPE html>
// <html>
// <head>
// <meta charset="utf-8" />
// <title>React App</title>
// </head>
// <body>
// <div id="root"></div>
// <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
// <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
// <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
// <script type="text/babel" src="index.js"></script>
// </body>
// </html>`,
//     active: false,
//   },
// ];


export const DEFAULT_FILES = [
  {
    name: "index.jsx",
    language: "javascript",
    content: `const { createRoot } = ReactDOM;
const { useState } = React;
function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello World</h1>
      <p>React is working in preview!</p>
      <button onClick={() => setCount((e) => e + 1)}>Count {count}</button>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);`,
    active: true,
    default: true,
  },
  {
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
    active: false,
    default: true,
  },
  {
    name: "index.css",
    language: "css",
    content: `body {
  margin: 0;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

#root {
  max-width: 1280px;
  margin: 0 auto;
}

h1 {
  color: #1976d2;
}`,
    active: false,
    default: true,
  },
];