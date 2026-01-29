export const CONFIG_FILES = [
  {
    name: "snippets.js",
    language: "javascript",
    content: "// Your custom code snippets configuration\n// This file defines autocomplete snippets for Monaco Editor\n// Structure: language -> array of snippet objects\n\nexport const SNIPPETS_CONFIG = {\n  javascript: [\n    {\n      label: \"useState\",\n      kind: \"function\",\n      insertText: \"const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState($2);\",\n      documentation: \"React useState hook\"\n    },\n    {\n      label: \"useEffect\", \n      kind: \"function\",\n      insertText: \"useEffect(() => {\\n  $1\\n}, [$2]);\",\n      documentation: \"React useEffect hook\"\n    },\n    {\n      label: \"useCallback\",\n      kind: \"function\", \n      insertText: \"const ${1:callback} = useCallback(($2) => {\\n  $3\\n}, [$4]);\",\n      documentation: \"React useCallback hook\"\n    },\n    {\n      label: \"useMemo\",\n      kind: \"function\",\n      insertText: \"const ${1:memoizedValue} = useMemo(() => $2, [$3]);\",\n      documentation: \"React useMemo hook\"\n    },\n    {\n      label: \"React Component\",\n      kind: \"function\",\n      insertText: \"function ${1:ComponentName}({$2}) {\\n  return (\\n    <div>\\n      $3\\n    </div>\\n  );\\n}\",\n      documentation: \"React functional component\"\n    },\n    {\n      label: \"Arrow Component\",\n      kind: \"function\",\n      insertText: \"const ${1:ComponentName} = ({$2}) => {\\n  return (\\n    <div>\\n      $3\\n    </div>\\n  );\\n};\",\n      documentation: \"React arrow function component\"\n    }\n  ],\n  typescript: [\n    {\n      label: \"TypeScript Interface\",\n      kind: \"interface\",\n      insertText: \"interface ${1:InterfaceName} {\\n  ${2:property}: ${3:type};\\n}\",\n      documentation: \"TypeScript interface definition\"\n    },\n    {\n      label: \"TypeScript Type\",\n      kind: \"type\",\n      insertText: \"type ${1:TypeName} = ${2:type};\",\n      documentation: \"TypeScript type alias\"\n    }\n  ],\n  html: [\n    {\n      label: \"HTML5 Boilerplate\",\n      kind: \"snippet\",\n      insertText: \"<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head>\\n  <meta charset=\\\"UTF-8\\\">\\n  <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n  <title>${1:Title}</title>\\n</head>\\n<body>\\n  $2\\n</body>\\n</html>\",\n      documentation: \"HTML5 boilerplate structure\"\n    }\n  ],\n  css: [\n    {\n      label: \"CSS Reset\",\n      kind: \"snippet\",\n      insertText: \"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}\",\n      documentation: \"CSS reset styles\"\n    }\n  ]\n};\n\n// Add your custom snippets below:\n// SNIPPETS_CONFIG.javascript.push({\n//   label: \"Your Custom Snippet\",\n//   kind: \"function\",\n//   insertText: \"your custom template with ${1:placeholders}\",\n//   documentation: \"Description of your snippet\"\n// });",
    active: true,
    config: true,
  },
  {
    name: "settings.json",
    language: "json",
    content: "{\n  \"editor\": {\n    \"fontSize\": 16,\n    \"theme\": \"jsDarkOrange\",\n    \"wordWrap\": \"on\",\n    \"minimap\": { \"enabled\": false },\n    \"lineNumbers\": \"off\",\n    \"autoClosingBrackets\": \"always\",\n    \"autoClosingQuotes\": \"always\",\n    \"autoIndent\": \"full\"\n  }\n}",
    active: false,
    config: true,
  },
  {
    name: "package.json",
    language: "json",
    content: "{\n  \"name\": \"my-js-homepage-config\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Configuration files for JS Homepage\",\n  \"scripts\": {\n    \"start\": \"echo 'Ready to code!'\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.0.0\",\n    \"react-dom\": \"^18.0.0\"\n  }\n}",
    active: false,
    config: true,
  },
  {
    name: "README.md",
    language: "markdown",
    content: "# Configuration Files\n\nThis directory contains your personal configuration files that sync with your GitHub repository.\n\n## Files\n\n- **snippets.js**: Define custom code snippets for Monaco Editor autocomplete\n- **settings.json**: Monaco Editor preferences\n- **package.json**: Project metadata and dependencies\n\n## How to Use\n\n1. Edit any configuration file in the Monaco Editor\n2. Changes are automatically saved and synced to GitHub\n3. Snippets from `snippets.js` are immediately available in the editor\n4. Editor settings from `settings.json` are applied when you switch files\n\n## Snippets Configuration\n\nIn `snippets.js`, you can define custom autocomplete snippets:\n\n```javascript\nSNIPPETS_CONFIG.javascript.push({\n  label: \"Your Snippet\",\n  kind: \"function\", \n  insertText: \"your custom template with ${1:placeholders}\",\n  documentation: \"Description\"\n});\n```\n\n### Snippet Properties\n\n- `label`: Name shown in autocomplete\n- `kind`: Type (function, snippet, interface, type)\n- `insertText`: Template with tab stops (${1:placeholder})\n- `documentation`: Description shown on hover\n\n### Supported Languages\n\n- javascript\n- typescript  \n- html\n- css\n\n## Editor Settings\n\nIn `settings.json`, you can customize the Monaco Editor:\n\n```json\n{\n  \"editor\": {\n    \"fontSize\": 16,                    // Font size\n    \"theme\": \"jsDarkOrange\",           // Editor theme\n    \"wordWrap\": \"on\",                 // Word wrapping\n    \"minimap\": { \"enabled\": false },  // Minimap toggle\n    \"lineNumbers\": \"off\",             // Line numbers\n    \"autoClosingBrackets\": \"always\",  // Auto bracket closing\n    \"autoClosingQuotes\": \"always\",   // Auto quote closing\n    \"autoIndent\": \"full\"              // Auto indentation\n  }\n}\n```\n\n### Available Settings\n\n- `fontSize`: Number - Font size in pixels\n- `theme`: String - Editor theme name\n- `wordWrap`: \"on\" | \"off\" - Word wrapping\n- `minimap.enabled`: Boolean - Show/hide minimap\n- `lineNumbers`: \"on\" | \"off\" - Show/hide line numbers\n- `autoClosingBrackets`: \"always\" | \"never\" | \"languageDefined\"\n- `autoClosingQuotes`: \"always\" | \"never\" | \"languageDefined\"\n- `autoIndent\": \"none\" | \"keep\" | \"brackets\" | \"advanced\" | \"full\"\n\n## GitHub Sync\n\nAll configuration files are stored in your GitHub repository and automatically:\n- Created when you first sign up\n- Updated when you make changes\n- Pulled when you login on other devices",
    active: false,
    config: true,
  }
];

export const DEFAULT_FILES = [
  {
    name: "index.js",
    language: "javascript",
    content: "const { createRoot } = ReactDOM;\nconst { useState } = React;\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <h1>Hello World</h1>\n      <p>React is working in preview!</p>\n      <button onClick={() => setCount((e) => e + 1)}>Count {count}</button>\n    </div>\n  );\n}\n\nconst root = createRoot(document.getElementById(\"root\"));\nroot.render(<App />);",
    active: true,
    default: true,
  },
  {
    name: "index.html",
    language: "html",
    content: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\" />\n  <title>React App</title>\n</head>\n<body>\n  <div id=\"root\"></div>\n</body>\n</html>",
    active: false,
    default: true,
  },
  {
    name: "index.css",
    language: "css",
    content: "body {\n  margin: 0;\n  padding: 20px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n}\n\n#root {\n  max-width: 1280px;\n  margin: 0 auto;\n}\n\nh1 {\n  color: #1976d2;\n}",
    active: false,
    default: true,
  },
];
