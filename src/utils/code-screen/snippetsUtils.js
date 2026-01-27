export function parseSnippetsFromContent(snippetsContent) {
  try {
    console.log('Parsing snippets content:', snippetsContent.substring(0, 200) + '...');
    
    // Multiple regex patterns to handle different formatting styles
    const patterns = [
      // Standard export with semicolon
      /export const SNIPPETS_CONFIG\s*=\s*({[\s\S]*?});/m,
      // Export without semicolon
      /export const SNIPPETS_CONFIG\s*=\s*({[\s\S]*?})(?=\n\n|\nexport|\n$|$)/m,
      // More permissive pattern
      /SNIPPETS_CONFIG\s*=\s*({[\s\S]*?})/m,
      // Fallback pattern that looks for any object assignment
      /const\s+\w*[Cc]onfig\s*=\s*({[\s\S]*?})/m
    ];
    
    let configMatch = null;
    let configString = null;
    
    // Try each pattern until we find a match
    for (const pattern of patterns) {
      configMatch = snippetsContent.match(pattern);
      if (configMatch) {
        configString = configMatch[1];
        console.log('Config string found with pattern:', pattern.toString());
        console.log('Config string preview:', configString.substring(0, 200) + '...');
        break;
      }
    }
    
    if (configString) {
      try {
        // Try multiple parsing methods
        let snippetsConfig = null;
        
        // Method 1: Direct Function constructor
        try {
          snippetsConfig = new Function(`return ${configString}`)();
        } catch (e1) {
          console.log('Direct parsing failed, trying alternative method');
          
          // Method 2: Clean up the string and try again
          try {
            const cleanedConfig = configString
              .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
              .replace(/\/\/.*$/gm, '') // Remove line comments
              .trim();
            snippetsConfig = new Function(`return ${cleanedConfig}`)();
          } catch (e2) {
            console.log('Cleaned parsing failed, trying eval as last resort');
            
            // Method 3: Last resort with eval (only if we're confident about the content)
            try {
              snippetsConfig = eval(`(${configString})`);
            } catch (e3) {
              throw new Error('All parsing methods failed');
            }
          }
        }
        
        console.log('Successfully parsed snippets:', snippetsConfig);
        
        // Validate that we got a proper config object with expected structure
        if (snippetsConfig && typeof snippetsConfig === 'object') {
          // Ensure it has at least some language keys or snippet arrays
          const hasValidStructure = Object.keys(snippetsConfig).some(key => {
            const value = snippetsConfig[key];
            return Array.isArray(value) && value.length > 0;
          });
          
          if (hasValidStructure || Object.keys(snippetsConfig).length === 0) {
            console.log('Valid snippet configuration detected');
            return snippetsConfig;
          } else {
            console.log('Invalid structure, but returning parsed object');
            return snippetsConfig;
          }
        }
      } catch (parseError) {
        console.error('Failed to parse config object:', parseError);
      }
    } else {
      console.log('No config object found in content, checking for alternative formats');
      
      // Try to find any JSON-like structure in the content
      const jsonMatch = snippetsContent.match(/({[\s\S]*?})/);
      if (jsonMatch) {
        try {
          const potentialConfig = new Function(`return ${jsonMatch[1]}`)();
          if (potentialConfig && typeof potentialConfig === 'object') {
            console.log('Found alternative JSON structure, using it');
            return potentialConfig;
          }
        } catch (e) {
          console.log('Alternative JSON parsing failed');
        }
      }
    }

    // Only return defaults as absolute last resort
    console.log('All parsing attempts failed, returning default snippets');
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
      kind: monaco.languages.CompletionItemKind[snippet.kind.toUpperCase()] || monaco.languages.CompletionItemKind.Function,
      insertText: snippet.insertText,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: snippet.documentation
    }));
  });
  
  return suggestions;
}
