export function parseSnippetsFromContent(snippetsContent) {
  try {
    
    // Multiple regex patterns to handle different formatting styles
    const patterns = [
      // Standard export with semicolon
      /export const SNIPPETS_CONFIG\s*=\s*({[\s\S]*?});/m,
      // Export without semicolon, handling comments after closing brace
      /export const SNIPPETS_CONFIG\s*=\s*({[\s\S]*?})\s*\/\/.*$/m,
      // Export without semicolon, handling any content after closing brace
      /export const SNIPPETS_CONFIG\s*=\s*({[\s\S]*?})\s*$/m,
      // More permissive pattern - capture everything between first { and matching }
      /export const SNIPPETS_CONFIG\s*=\s*(\{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*\})/m,
      // Most permissive - just capture the object after the assignment
      /SNIPPETS_CONFIG\s*=\s*({[\s\S]*?})/m,
      // Fallback pattern that looks for any object assignment
      /const\s+\w*[Cc]onfig\s*=\s*({[\s\S]*?})/m
    ];
    
    let configMatch = null;
    let configString = null;
    
    // Try each pattern until we find a match
    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      configMatch = snippetsContent.match(pattern);
      if (configMatch) {
        configString = configMatch[1];
        console.log(`Pattern ${i + 1} matched successfully`);
        break;
      }
    }
    
    if (!configString) {
      console.error('No pattern matched the snippets content');
      console.log('Content preview:', snippetsContent.substring(0, 300));
    }
    
    if (configString) {
      try {
        // Try multiple parsing methods
        let snippetsConfig = null;
        
        // Method 1: Direct Function constructor
        try {
          snippetsConfig = new Function(`return ${configString}`)();
        } catch (e1) {
          
          // Method 2: Clean up the string and try again
          try {
            const cleanedConfig = configString
              .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
              .replace(/\/\/.*$/gm, '') // Remove line comments
              .trim();
            snippetsConfig = new Function(`return ${cleanedConfig}`)();
          } catch (e2) {
            
            // Method 3: Last resort with eval (only if we're confident about the content)
            try {
              snippetsConfig = eval(`(${configString})`);
            } catch (e3) {
              // Method 4: Last resort - manual brace balancing
              try {
                const startIndex = snippetsContent.indexOf('{');
                if (startIndex !== -1) {
                  let braceCount = 0;
                  let endIndex = -1;
                  
                  for (let i = startIndex; i < snippetsContent.length; i++) {
                    if (snippetsContent[i] === '{') {
                      braceCount++;
                    } else if (snippetsContent[i] === '}') {
                      braceCount--;
                      if (braceCount === 0) {
                        endIndex = i + 1;
                        break;
                      }
                    }
                  }
                  
                  if (endIndex !== -1) {
                    const balancedObject = snippetsContent.substring(startIndex, endIndex);
                    snippetsConfig = new Function(`return ${balancedObject}`)();
                    console.log('Manual brace balancing succeeded');
                  }
                }
              } catch (e4) {
                console.error('All parsing methods failed');
                return getDefaultSnippets();
              }
            }
          }
        }
        
        
        // Validate that we got a proper config object with expected structure
        if (snippetsConfig && typeof snippetsConfig === 'object') {
          console.log('Successfully parsed snippets config:', Object.keys(snippetsConfig));
          
          // Ensure it has at least some language keys or snippet arrays
          const hasValidStructure = Object.keys(snippetsConfig).some(key => {
            const value = snippetsConfig[key];
            return Array.isArray(value) && value.length > 0;
          });
          
          if (hasValidStructure || Object.keys(snippetsConfig).length === 0) {
            console.log('Returning parsed snippets config');
            return snippetsConfig;
          } else {
            console.log('Config has no valid structure, but returning anyway');
            return snippetsConfig;
          }
        }
      } catch (parseError) {
        console.error('Failed to parse config object:', parseError);
      }
    } else {
      
      // Try to find any JSON-like structure in the content
      const jsonMatch = snippetsContent.match(/({[\s\S]*?})/);
      if (jsonMatch) {
        try {
          const potentialConfig = new Function(`return ${jsonMatch[1]}`)();
          if (potentialConfig && typeof potentialConfig === 'object') {
            return potentialConfig;
          }
        } catch (e) {
        }
      }
    }

    // Only return defaults as absolute last resort
    return getDefaultSnippets();
  } catch (error) {
    console.error('Critical error parsing snippets:', error);
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
      kind: monaco.languages.CompletionItemKind.Snippet || monaco.languages.CompletionItemKind[snippet.kind.toUpperCase()],
      insertText: snippet.insertText,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: snippet.documentation
    }));
  });
  
  return suggestions;
}
