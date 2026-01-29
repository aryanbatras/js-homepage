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
        // console.log(`Pattern ${i + 1} matched successfully`);
        break;
      }
    }
    
    if (!configString) {
      console.error('No pattern matched the snippets content');
      // console.log('Content preview:', snippetsContent.substring(0, 300));
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
                    // console.log('Manual brace balancing succeeded');
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
          // console.log('Successfully parsed snippets config:', Object.keys(snippetsConfig));
          
          // Ensure it has at least some language keys or snippet arrays
          const hasValidStructure = Object.keys(snippetsConfig).some(key => {
            const value = snippetsConfig[key];
            return Array.isArray(value) && value.length > 0;
          });
          
          if (hasValidStructure || Object.keys(snippetsConfig).length === 0) {
            // console.log('Returning parsed snippets config');
            return snippetsConfig;
          } else {
            // console.log('Config has no valid structure, but returning anyway');
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
        insertText: "useEffect(() => {\n  $1\n}, [$2]);",
        documentation: "React useEffect hook"
      },
      {
        label: "useCallback",
        kind: "function", 
        insertText: "const ${1:callback} = useCallback(($2) => {\n  $3\n}, [$4]);",
        documentation: "React useCallback hook"
      },
      {
        label: "useMemo",
        kind: "function",
        insertText: "const ${1:memoizedValue} = useMemo(() => $2, [$3]);",
        documentation: "React useMemo hook"
      },
      {
        label: "useRef",
        kind: "function",
        insertText: "const ${1:ref} = useRef($2);",
        documentation: "React useRef hook"
      },
      {
        label: "useContext",
        kind: "function",
        insertText: "const ${1:value} = useContext(${2:Context});",
        documentation: "React useContext hook"
      },
      {
        label: "useReducer",
        kind: "function",
        insertText: "const [${1:state}, dispatch] = useReducer(${2:reducer}, ${3:initialState});",
        documentation: "React useReducer hook"
      },
      {
        label: "React Component",
        kind: "function",
        insertText: "function ${1:ComponentName}({$2}) {\n  return (\n    <div>\n      $3\n    </div>\n  );\n}",
        documentation: "React functional component"
      },
      {
        label: "Arrow Component",
        kind: "function",
        insertText: "const ${1:ComponentName} = ({$2}) => {\n  return (\n    <div>\n      $3\n    </div>\n  );\n};",
        documentation: "React arrow function component"
      },
      {
        label: "Custom Hook",
        kind: "function",
        insertText: "function use${1:HookName}($2) {\n  $3\n}",
        documentation: "React custom hook"
      },
      {
        label: "for loop",
        kind: "snippet",
        insertText: "for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n  $3\n}",
        documentation: "JavaScript for loop"
      },
      {
        label: "forEach",
        kind: "snippet",
        insertText: "${1:array}.forEach((${2:item}) => {\n  $3\n});",
        documentation: "Array forEach method"
      },
      {
        label: "map",
        kind: "snippet",
        insertText: "${1:array}.map((${2:item}) => {\n  return $3\n});",
        documentation: "Array map method"
      },
      {
        label: "filter",
        kind: "snippet",
        insertText: "${1:array}.filter((${2:item}) => {\n  return $3\n});",
        documentation: "Array filter method"
      },
      {
        label: "reduce",
        kind: "snippet",
        insertText: "${1:array}.reduce((${2:acc}, ${3:item}) => {\n  return $4\n}, ${5:initialValue});",
        documentation: "Array reduce method"
      },
      {
        label: "try-catch",
        kind: "snippet",
        insertText: "try {\n  $1\n} catch (error) {\n  console.error(error);\n}",
        documentation: "Try-catch block"
      },
      {
        label: "async function",
        kind: "function",
        insertText: "async function ${1:functionName}($2) {\n  $3\n}",
        documentation: "Async function"
      },
      {
        label: "await",
        kind: "snippet",
        insertText: "const ${1:result} = await ${2:promise};",
        documentation: "Await expression"
      },
      {
        label: "Promise",
        kind: "snippet",
        insertText: "new Promise((resolve, reject) => {\n  $1\n});",
        documentation: "Promise constructor"
      },
      {
        label: "setTimeout",
        kind: "snippet",
        insertText: "setTimeout(() => {\n  $1\n}, ${2:1000});",
        documentation: "setTimeout function"
      },
      {
        label: "setInterval",
        kind: "snippet",
        insertText: "setInterval(() => {\n  $1\n}, ${2:1000});",
        documentation: "setInterval function"
      },
      {
        label: "addEventListener",
        kind: "snippet",
        insertText: "${1:element}.addEventListener('${2:event}', ($3) => {\n  $4\n});",
        documentation: "Event listener"
      },
      {
        label: "console.log",
        kind: "snippet",
        insertText: "console.log($1);",
        documentation: "Console log"
      },
      {
        label: "console.error",
        kind: "snippet",
        insertText: "console.error($1);",
        documentation: "Console error"
      },
      {
        label: "console.warn",
        kind: "snippet",
        insertText: "console.warn($1);",
        documentation: "Console warning"
      }
    ],
    typescript: [
      {
        label: "TypeScript Interface",
        kind: "interface",
        insertText: "interface ${1:InterfaceName} {\n  ${2:property}: ${3:type};\n}",
        documentation: "TypeScript interface definition"
      },
      {
        label: "TypeScript Type",
        kind: "type",
        insertText: "type ${1:TypeName} = ${2:type};",
        documentation: "TypeScript type alias"
      },
      {
        label: "Generic Interface",
        kind: "interface",
        insertText: "interface ${1:InterfaceName}<${2:T}> {\n  ${3:property}: ${2:T};\n}",
        documentation: "Generic TypeScript interface"
      },
      {
        label: "Union Type",
        kind: "type",
        insertText: "type ${1:TypeName} = ${2:type1} | ${3:type2};",
        documentation: "Union type"
      },
      {
        label: "Intersection Type",
        kind: "type",
        insertText: "type ${1:TypeName} = ${2:type1} & ${3:type2};",
        documentation: "Intersection type"
      },
      {
        label: "Enum",
        kind: "snippet",
        insertText: "enum ${1:EnumName} {\n  ${2:Key},\n  ${3:Value}\n}",
        documentation: "TypeScript enum"
      },
      {
        label: "Generic Function",
        kind: "function",
        insertText: "function ${1:functionName}<${2:T}>(${3:param}: ${2:T}): ${2:T} {\n  return $4\n}",
        documentation: "Generic TypeScript function"
      },
      {
        label: "Optional Property",
        kind: "snippet",
        insertText: "${1:property}?: ${2:type};",
        documentation: "Optional property in interface"
      },
      {
        label: "Readonly Property",
        kind: "snippet",
        insertText: "readonly ${1:property}: ${2:type};",
        documentation: "Readonly property in interface"
      }
    ],
    html: [
      {
        label: "HTML5 Boilerplate",
        kind: "snippet",
        insertText: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>${1:Title}</title>\n</head>\n<body>\n  $2\n</body>\n</html>",
        documentation: "HTML5 boilerplate structure"
      },
      {
        label: "div",
        kind: "snippet",
        insertText: "<div class=\"${1:class}\">\n  $2\n</div>",
        documentation: "HTML div element"
      },
      {
        label: "button",
        kind: "snippet",
        insertText: "<button type=\"${1:button}\" ${2:onclick=\"${3:handleClick}\"}>${4:Button Text}</button>",
        documentation: "HTML button element"
      },
      {
        label: "input",
        kind: "snippet",
        insertText: "<input type=\"${1:text}\" placeholder=\"${2:Enter text}\" ${3:name=\"${4:fieldName}\"}>",
        documentation: "HTML input element"
      },
      {
        label: "form",
        kind: "snippet",
        insertText: "<form onSubmit={${1:handleSubmit}}>\n  $2\n  <button type=\"submit\">Submit</button>\n</form>",
        documentation: "HTML form element"
      },
      {
        label: "link",
        kind: "snippet",
        insertText: "<link rel=\"stylesheet\" href=\"${1:styles.css}\">",
        documentation: "HTML link element for CSS"
      },
      {
        label: "script",
        kind: "snippet",
        insertText: "<script src=\"${1:script.js}\"></script>",
        documentation: "HTML script element"
      },
      {
        label: "meta viewport",
        kind: "snippet",
        insertText: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        documentation: "Meta viewport tag"
      }
    ],
    css: [
      {
        label: "CSS Reset",
        kind: "snippet",
        insertText: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}",
        documentation: "CSS reset styles"
      },
      {
        label: "Flexbox Container",
        kind: "snippet",
        insertText: "display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};\ngap: ${3:1rem};",
        documentation: "Flexbox container properties"
      },
      {
        label: "Grid Container",
        kind: "snippet",
        insertText: "display: grid;\ngrid-template-columns: ${1:repeat(auto-fit, minmax(250px, 1fr))};\ngap: ${2:1rem};",
        documentation: "CSS Grid container"
      },
      {
        label: "Media Query",
        kind: "snippet",
        insertText: "@media (max-width: ${1:768px}) {\n  $2\n}",
        documentation: "CSS media query"
      },
      {
        label: "Transition",
        kind: "snippet",
        insertText: "transition: ${1:all} ${2:0.3s} ${3:ease};",
        documentation: "CSS transition"
      },
      {
        label: "Transform",
        kind: "snippet",
        insertText: "transform: ${1:translate(${2:x}, ${3:y})};",
        documentation: "CSS transform"
      },
      {
        label: "Box Shadow",
        kind: "snippet",
        insertText: "box-shadow: ${1:0} ${2:4px} ${3:6px} ${4:rgba(0, 0, 0, 0.1)};",
        documentation: "CSS box shadow"
      },
      {
        label: "Border Radius",
        kind: "snippet",
        insertText: "border-radius: ${1:8px};",
        documentation: "CSS border radius"
      },
      {
        label: "Position Absolute",
        kind: "snippet",
        insertText: "position: absolute;\ntop: ${1:0};\nleft: ${2:0};\ntransform: translate(-50%, -50%);",
        documentation: "Absolute positioning with centering"
      },
      {
        label: "Keyframes",
        kind: "snippet",
        insertText: "@keyframes ${1:animationName} {\n  0% {\n    $2\n  }\n  100% {\n    $3\n  }\n}",
        documentation: "CSS keyframes animation"
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
