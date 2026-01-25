export function parseSnippetsFromContent(snippetsContent) {
  try {
    // Debug: log the content we're trying to parse
    console.log('Parsing snippets content:', snippetsContent.substring(0, 200) + '...');
    
    // First try to parse as-is (for when user is actively editing)
    try {
      const configMatch = snippetsContent.match(/export const SNIPPETS_CONFIG\s*=\s*({[\s\S]*});?\s*$/m);
      
      if (configMatch) {
        const configString = configMatch[1];
        console.log('Config string found:', configString.substring(0, 200) + '...');
        const snippetsConfig = new Function(`return ${configString}`)();
        console.log('Parsed snippets:', snippetsConfig);
        return snippetsConfig || {};
      }
    } catch (e) {
      console.error('Direct parsing failed:', e);
      // If direct parsing fails, continue to fallback
    }

    // Fallback: return default snippets
    return getDefaultSnippets();
  } catch (error) {
    console.error('Error parsing snippets:', error);
    return getDefaultSnippets();
  }
}

export function getDefaultSnippets() {
  return {
    javascript: [
      {
        label: "useState",
        kind: "function",
        insertText: "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState($2);",
        documentation: "React useState hook"
      },
      {
        label: "useEffect", 
        kind: "function",
        insertText: "useEffect(() => {\\n  $1\\n}, [$2]);",
        documentation: "React useEffect hook"
      },
      {
        label: "useCallback",
        kind: "function", 
        insertText: "const ${1:callback} = useCallback(($2) => {\\n  $3\\n}, [$4]);",
        documentation: "React useCallback hook"
      },
      {
        label: "useMemo",
        kind: "function",
        insertText: "const ${1:memoizedValue} = useMemo(() => $2, [$3]);",
        documentation: "React useMemo hook"
      },
      {
        label: "React Component",
        kind: "function",
        insertText: "function ${1:ComponentName}({$2}) {\\n  return (\\n    <div>\\n      $3\\n    </div>\\n  );\\n}",
        documentation: "React functional component"
      },
      {
        label: "Arrow Component",
        kind: "function",
        insertText: "const ${1:ComponentName} = ({$2}) => {\\n  return (\\n    <div>\\n      $3\\n    </div>\\n  );\\n};",
        documentation: "React arrow function component"
      }
    ],
    typescript: [
      {
        label: "TypeScript Interface",
        kind: "interface",
        insertText: "interface ${1:InterfaceName} {\\n  ${2:property}: ${3:type};\\n}",
        documentation: "TypeScript interface definition"
      },
      {
        label: "TypeScript Type",
        kind: "type",
        insertText: "type ${1:TypeName} = ${2:type};",
        documentation: "TypeScript type alias"
      }
    ],
    html: [
      {
        label: "HTML5 Boilerplate",
        kind: "snippet",
        insertText: "<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head>\\n  <meta charset=\\\"UTF-8\\\">\\n  <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n  <title>${1:Title}</title>\\n</head>\\n<body>\\n  $2\\n</body>\\n</html>",
        documentation: "HTML5 boilerplate structure"
      }
    ],
    css: [
      {
        label: "CSS Reset",
        kind: "snippet",
        insertText: "* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}",
        documentation: "CSS reset styles"
      }
    ]
  };
}

export function createMonacoSuggestions(snippetsConfig, monaco) {
  const suggestions = {};
  
  // Process each language
  Object.keys(snippetsConfig).forEach(language => {
    const languageSnippets = snippetsConfig[language] || [];
    
    suggestions[language] = languageSnippets.map(snippet => ({
      label: snippet.label,
      kind: monaco.languages.CompletionItemKind[snippet.kind.toUpperCase()] || monaco.languages.CompletionItemKind.Function,
      insertText: snippet.insertText,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: snippet.documentation
    }));
  });
  
  return suggestions;
}
