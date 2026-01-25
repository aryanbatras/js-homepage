import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import { parseSnippetsFromContent, createMonacoSuggestions, getDefaultSnippets } from "../../../../utils/code-screen/snippetsUtils";
const resizeObserverErrorHandler = (e) => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    return;
  }
  console.error(e);
};

window.addEventListener('error', resizeObserverErrorHandler);

export function CodeEditor({
  activeFile,
  handleContentChange,
  verticalResizer,
  files,
}) {

  const [fontSize, setFontSize] = useState(28);
  const [snippets, setSnippets] = useState(getDefaultSnippets());
  const [monacoInstance, setMonacoInstance] = useState(null);
  const [providers, setProviders] = useState({}); // Track registered providers
  const [editorSettings, setEditorSettings] = useState({}); // Track editor settings

  // Update snippets when snippets.js file content changes (but only when not actively editing)
  useEffect(() => {
    const snippetsFile = files?.find(file => file.name === 'snippets.js');
    if (snippetsFile && (!activeFile || activeFile?.name !== 'snippets.js')) {
      const parsedSnippets = parseSnippetsFromContent(snippetsFile.content);
      setSnippets(parsedSnippets);
    }
  }, [files, activeFile]);

  // Update editor settings when settings.json file content changes
  useEffect(() => {
    const settingsFile = files?.find(file => file.name === 'settings.json');
    if (settingsFile && (!activeFile || activeFile?.name !== 'settings.json')) {
      try {
        const parsedSettings = JSON.parse(settingsFile.content);
        setEditorSettings(parsedSettings);
        
        // Apply font size immediately if available
        if (parsedSettings.editor?.fontSize) {
          setFontSize(parsedSettings.editor.fontSize);
        }
      } catch (error) {
        console.error('Error parsing settings.json:', error);
      }
    }
  }, [files, activeFile]);

  // Update snippets when switching away from snippets.js file
  useEffect(() => {
    if (activeFile?.name !== 'snippets.js') {
      const snippetsFile = files?.find(file => file.name === 'snippets.js');
      if (snippetsFile) {
        const parsedSnippets = parseSnippetsFromContent(snippetsFile.content);
        setSnippets(parsedSnippets);
      }
    }
  }, [activeFile, files]);

  // Update settings when switching away from settings.json file
  useEffect(() => {
    if (activeFile?.name !== 'settings.json') {
      const settingsFile = files?.find(file => file.name === 'settings.json');
      if (settingsFile) {
        try {
          const parsedSettings = JSON.parse(settingsFile.content);
          setEditorSettings(parsedSettings);
          
          // Apply font size immediately if available
          if (parsedSettings.editor?.fontSize) {
            setFontSize(parsedSettings.editor.fontSize);
          }
        } catch (error) {
          console.error('Error parsing settings.json:', error);
        }
      }
    }
  }, [activeFile, files]);

  // Re-register completion providers when snippets change
  useEffect(() => {
    if (monacoInstance && Object.keys(snippets).length > 0) {
      console.log('Registering completion providers with snippets:', snippets);
      
      // Dispose existing providers first
      Object.values(providers).forEach(provider => {
        if (provider && typeof provider.dispose === 'function') {
          provider.dispose();
        }
      });
      
      const newProviders = {};
      const languages = ['javascript', 'typescript', 'html', 'css'];
      
      languages.forEach(language => {
        const provider = monacoInstance.languages.registerCompletionItemProvider(language, {
          provideCompletionItems: () => {
            const languageSnippets = snippets[language] || [];
            const suggestions = createMonacoSuggestions({ [language]: languageSnippets }, monacoInstance);
            console.log(`Suggestions for ${language}:`, suggestions[language]);
            return { suggestions: suggestions[language] || [] };
          },
        });
        newProviders[language] = provider;
      });
      
      setProviders(newProviders);
    }
  }, [snippets, monacoInstance]);

  // Cleanup providers on unmount
  useEffect(() => {
    return () => {
      Object.values(providers).forEach(provider => {
        if (provider && typeof provider.dispose === 'function') {
          provider.dispose();
        }
      });
    };
  }, [providers]);

  const getEditorHeight = () => {
    const availableHeight = verticalResizer - 4;
    return `${Math.max(0, availableHeight)}vh`;
  };

  const zoomed = useRef(0);
  const handleWheel = (editor, event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -1 : 1;
      zoomed.current += delta;
      const newFontSize = Math.max(5, Math.min(150, 14 + zoomed.current));
      setFontSize(newFontSize);

      if (editor) {
        editor.updateOptions({
          fontSize: newFontSize,
        });
      }
    }
  };
  const handleBeforeMount = (monaco) => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      allowJs: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxImportSource: "react",
      esModuleInterop: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      types: ["react", "react-dom"],
    });

    monaco.editor.defineTheme('jsDarkOrange', {
      base: 'vs',
      inherit: false,
      rules: [
        { token: 'comment', foreground: '9ca3af', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ea580c', fontStyle: 'bold' },
        { token: 'string', foreground: '059669' },
        { token: 'number', foreground: '0284c7' },
        { token: 'regexp', foreground: '7c3aed' },
        { token: 'operator', foreground: 'dc2626' },
        { token: 'namespace', foreground: '7c3aed' },
        { token: 'type', foreground: '7c3aed', fontStyle: 'italic' },
        { token: 'struct', foreground: '7c3aed' },
        { token: 'class', foreground: '7c3aed', fontStyle: 'bold' },
        { token: 'interface', foreground: '7c3aed', fontStyle: 'bold' },
        { token: 'parameter', foreground: 'f97316' },
        { token: 'variable', foreground: '1f2937' },
        { token: 'identifier', foreground: '1f2937' },
        { token: 'property', foreground: '4b5563' },
        { token: 'function', foreground: 'ea580c', fontStyle: 'bold' },
        { token: 'method', foreground: '7c3aed' },
        { token: 'constructor', foreground: '7c3aed', fontStyle: 'bold' },
        { token: 'tag', foreground: '059669' },
        { token: 'attribute.name', foreground: 'f97316' },
        { token: 'attribute.value', foreground: '059669' },
        { token: 'delimiter', foreground: '6b7280' },
        { token: 'delimiter.bracket', foreground: 'ea580c' },
        { token: 'delimiter.parenthesis', foreground: 'ea580c' },
        { token: 'delimiter.square', foreground: 'ea580c' },
        { token: 'delimiter.angle', foreground: 'ea580c' },
        { token: 'delimiter.curly', foreground: 'ea580c' },
        { token: 'meta.brace', foreground: 'ea580c' },
        { token: 'meta.tag', foreground: '059669' },
        { token: 'meta.import', foreground: '1f2937' },
        { token: 'meta.export', foreground: '1f2937' },
        { token: 'punctuation', foreground: '6b7280' },
        { token: 'punctuation.terminator', foreground: '6b7280' },
        { token: 'punctuation.accessor', foreground: 'ea580c' },
        { token: 'keyword.async', foreground: 'dc2626', fontStyle: 'bold' },
        { token: 'keyword.await', foreground: 'dc2626', fontStyle: 'bold' },
        { token: 'keyword.return', foreground: 'dc2626', fontStyle: 'bold' },
        { token: 'keyword.new', foreground: '7c3aed', fontStyle: 'bold' },
        { token: 'keyword.this', foreground: 'f97316', fontStyle: 'italic' },
        { token: 'keyword.super', foreground: 'f97316', fontStyle: 'italic' },
        { token: 'variable.readonly', foreground: '059669', fontStyle: 'bold' },
        { token: 'constant', foreground: '0284c7', fontStyle: 'bold' },
        { token: 'identifier.readonly', foreground: '0284c7', fontStyle: 'bold' },
        { token: 'string.escape', foreground: 'dc2626' },
        { token: 'string.regex', foreground: '7c3aed' },
        { token: 'string.template', foreground: '059669' },
        { token: 'string.template.expression', foreground: 'ea580c' },
        { token: 'type.builtin', foreground: '7c3aed', fontStyle: 'bold' },
        { token: 'type.user-defined', foreground: '7c3aed' },
        { token: 'function.declaration', foreground: 'ea580c', fontStyle: 'bold' },
        { token: 'function.arrow', foreground: 'ea580c', fontStyle: 'bold' },
        { token: 'function.method', foreground: '7c3aed' },
        { token: 'function.inline', foreground: 'ea580c' },
        { token: 'module', foreground: '1f2937', fontStyle: 'bold' },
        { token: 'import', foreground: '1f2937', fontStyle: 'bold' },
        { token: 'export', foreground: '1f2937', fontStyle: 'bold' },
        { token: 'default', foreground: '7c3aed', fontStyle: 'bold' },
        { token: 'from', foreground: '1f2937', fontStyle: 'italic' },
        { token: 'as', foreground: '1f2937', fontStyle: 'italic' }
      ],
      colors: {
        'editor.background': '#fafafa',
        'editor.foreground': '#1f2937',
        'editor.lineHighlightBackground': '#f3f4f6',
        'editor.selectionBackground': '#ea580c40',
        'editor.inactiveSelectionBackground': '#ea580c20',
        'editorCursor.foreground': '#ea580c',
        'editorWhitespace.foreground': '#d1d5db',
        'editorIndentGuide.background': '#e5e7eb',
        'editorIndentGuide.activeBackground': '#d1d5db',
        'editorLineNumber.foreground': '#9ca3af',
        'editorLineNumber.activeForeground': '#ea580c',
        'editorBracketMatch.background': '#ea580c30',
        'editorBracketMatch.border': '#ea580c',
        'editorWidget.background': '#ffffff',
        'editorWidget.border': '#e5e7eb',
        'editorSuggestWidget.background': '#ffffff',
        'editorSuggestWidget.border': '#e5e7eb',
        'editorSuggestWidget.selectedBackground': '#ea580c20',
        'editorHoverWidget.background': '#ffffff',
        'editorHoverWidget.border': '#e5e7eb',
        'peekView.border': '#e5e7eb',
        'peekViewResult.background': '#ffffff',
        'peekViewEditor.background': '#ffffff',
        'peekViewTitle.background': '#f9fafb',
        'panel.background': '#ffffff',
        'panel.border': '#e5e7eb',
        'terminal.background': '#ffffff',
        'terminal.foreground': '#1f2937',
        'terminal.ansiBlack': '#1f2937',
        'terminal.ansiBlue': '#0284c7',
        'terminal.ansiBrightBlack': '#6b7280',
        'terminal.ansiBrightBlue': '#0284c7',
        'terminal.ansiBrightCyan': '#06b6d4',
        'terminal.ansiBrightGreen': '#059669',
        'terminal.ansiBrightMagenta': '#7c3aed',
        'terminal.ansiBrightRed': '#dc2626',
        'terminal.ansiBrightWhite': '#9ca3af',
        'terminal.ansiBrightYellow': '#f97316',
        'terminal.ansiCyan': '#06b6d4',
        'terminal.ansiGreen': '#059669',
        'terminal.ansiMagenta': '#7c3aed',
        'terminal.ansiRed': '#dc2626',
        'terminal.ansiWhite': '#9ca3af',
        'terminal.ansiYellow': '#f97316',
        'errorForeground': '#dc2626',
        'warningForeground': '#f97316',
        'infoForeground': '#0284c7',
        'statusBar.background': '#ffffff',
        'statusBar.foreground': '#1f2937',
        'statusBar.border': '#e5e7eb',
        'statusBar.noFolderBackground': '#ffffff',
        'statusBar.debuggingBackground': '#ea580c',
        'statusBar.debuggingForeground': '#ffffff',
        'tab.activeBackground': '#ffffff',
        'tab.inactiveBackground': '#f9fafb',
        'tab.activeForeground': '#1f2937',
        'tab.inactiveForeground': '#6b7280',
        'tab.border': '#e5e7eb',
        'tab.activeBorder': '#ea580c',
        'tab.activeBorderTop': '#ea580c',
        'editor.findMatchBackground': '#ea580c50',
        'editor.findMatchHighlightBackground': '#ea580c30',
        'editor.lineHighlightBorder': '#ea580c20',
        'activityBar.background': '#ffffff',
        'activityBar.foreground': '#1f2937',
        'activityBar.border': '#e5e7eb',
        'activityBarBadge.background': '#ea580c',
        'activityBarBadge.foreground': '#ffffff',
        'sideBar.background': '#f9fafb',
        'sideBar.foreground': '#1f2937',
        'sideBar.border': '#e5e7eb',
        'sideBarTitle.foreground': '#1f2937',
        'sideBarSectionHeader.background': '#ffffff',
        'sideBarSectionHeader.foreground': '#1f2937',
        'minimap.background': '#fafafa',
        'minimap.selectionHighlight': '#ea580c40',
        'minimap.errorHighlight': '#dc2626',
        'minimap.warningHighlight': '#f97316',
        'minimap.findMatchHighlight': '#ea580c30',
        'scrollbar.shadow': '#00000010',
        'scrollbarSlider.background': '#e5e7eb',
        'scrollbarSlider.hoverBackground': '#d1d5db',
        'scrollbarSlider.activeBackground': '#9ca3af',
        'editorOverviewRuler.border': '#e5e7eb',
        'editorOverviewRuler.findMatchForeground': '#ea580c',
        'editorOverviewRuler.selectionHighlightForeground': '#ea580c',
        'editorOverviewRuler.wordHighlightForeground': '#ea580c',
        'editorOverviewRuler.wordHighlightStrongForeground': '#ea580c',
        'editorOverviewRuler.modifiedForeground': '#0284c7',
        'editorOverviewRuler.addedForeground': '#059669',
        'editorOverviewRuler.deletedForeground': '#dc2626',
        'editorOverviewRuler.errorForeground': '#dc2626',
        'editorOverviewRuler.warningForeground': '#f97316',
        'editorOverviewRuler.infoForeground': '#0284c7',
        'editor.wordHighlightBackground': '#ea580c20',
        'editor.wordHighlightStrongBackground': '#ea580c30',
        'editor.wordHighlightBorder': '#ea580c',
        'editor.wordHighlightStrongBorder': '#ea580c',
        'editor.selectionHighlightBorder': '#ea580c',
        'editor.findMatchBorder': '#ea580c',
        'editor.findMatchHighlightBorder': '#ea580c',
        'editor.hoverHighlightBackground': '#ea580c20',
        'editor.lineNumbersActiveForeground': '#ea580c',
        'editorActiveLineNumber.foreground': '#ea580c'
      }
    });

    monaco.editor.setTheme('jsDarkOrange');

    const reactTypes = `
      declare global {
        namespace React {
          function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
          function useEffect(effect: () => void | (() => void), deps?: any[]): void;
          function useContext<T>(context: React.Context<T>): T;
          function useReducer<S, A>(reducer: (state: S, action: A) => S, initialState: S): [S, (action: A) => void];
          function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
          function useMemo<T>(factory: () => T, deps: any[]): T;
          function useRef<T>(initialValue: T): React.MutableRefObject<T>;
          function createContext<T>(defaultValue: T): React.Context<T>;
          function forwardRef<T, P = {}>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null): React.ForwardRefExoticComponent<P & React.RefAttributes<T>>;
          function memo<P = {}>(Component: React.FunctionComponent<P>): React.MemoExoticComponent<React.FunctionComponent<P>>;
          
          interface FunctionComponent<P = {}> {
            (props: P): React.ReactElement | null;
            displayName?: string;
          }
          
          interface Component<P = {}, S = {}> {
            constructor(props: P);
            render(): React.ReactElement | null;
            setState(state: Partial<S> | ((prevState: S, props: P) => Partial<S> | S), callback?: () => void): void;
            forceUpdate(callback?: () => void): void;
            readonly props: Readonly<P>;
            state: Readonly<S>;
            context: any;
            refs: any;
          }
          
          interface ReactElement {
            type: any;
            props: any;
            key: React.Key | null;
          }
          
          interface Context<T> {
            Provider: React.Provider<T>;
            Consumer: React.Consumer<T>;
          }
          
          interface Provider<T> {
            value: T;
            children: React.ReactNode;
          }
          
          interface Consumer<T> {
            children: (value: T) => React.ReactNode;
          }
          
          interface RefAttributes<T> {
            ref?: React.Ref<T>;
          }
          
          interface ForwardRefExoticComponent<P> extends React.NamedExoticComponent<P> {
            defaultProps?: Partial<P> | undefined;
            displayName?: string | undefined;
          }
          
          interface MemoExoticComponent<T extends React.ComponentType<any>> {
            readonly $$typeof: symbol;
            readonly type: T;
            compare?: ((prevProps: any, nextProps: any) => boolean) | null;
          }
          
          interface NamedExoticComponent<P> {
            (props: P): React.ReactElement;
            displayName?: string;
          }
          
          type Key = string | number | null;
          type Ref<T> = RefCallback<T> | RefObject<T> | null;
          type RefCallback<T> = (instance: T | null) => void;
          interface RefObject<T> {
            readonly current: T | null;
          }
          type ReactNode = ReactElement | string | number | React.ReactFragment | React.ReactPortal | boolean | null | undefined;
          type ComponentType<P = {}> = React.ComponentClass<P> | React.FunctionComponent<P>;
          type ComponentClass<P = {}> = new (props: P) => React.Component<P, any>;
        }
        
        const ReactDOM: {
          createRoot(container: Element | DocumentFragment): { 
            render(element: React.ReactElement): void; 
            unmount(): void;
          };
          hydrateRoot(container: Element | DocumentFragment, element: React.ReactElement): void;
        };
        
        namespace JSX {
          interface Element extends React.ReactElement {}
          interface ElementClass extends React.Component {}
          interface ElementAttributesProperty { props: {}; }
          interface ElementChildrenAttribute { children: {}; }
          interface IntrinsicAttributes extends React.Attributes {}
          interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
        }
      }
    `;

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      reactTypes,
      "file:///node_modules/@types/react/index.d.ts",
    );
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      reactTypes,
      "file:///node_modules/@types/react-dom/index.d.ts",
    );

    monaco.languages.setLanguageConfiguration("javascript", {
      brackets: [
        ["<", ">"],
        ["{", "}"],
        ["(", ")"],
        ["[", "]"],
      ],
      autoClosingPairs: [
        { open: "<", close: ">", notIn: ["string"] },
        { open: "{", close: "}" },
        { open: "(", close: ")" },
        { open: "[", close: "]" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: "`", close: "`" },
      ],
      surroundingPairs: [
        { open: "<", close: ">" },
        { open: "{", close: "}" },
        { open: "(", close: ")" },
        { open: "[", close: "]" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: "`", close: "`" },
      ],
      folding: {
        markers: {
          start: new RegExp("^\\s*//\\s*#?region\\b"),
          end: new RegExp("^\\s*//\\s*#?endregion\\b"),
        },
      },
    });

    // Store monaco instance for later use
    setMonacoInstance(monaco);

    // Register completion providers will be handled in useEffect when snippets are available
  };

  return (
    <>
      {activeFile ? (
        <Editor
          height={getEditorHeight()}
          language={activeFile.language || "javascript"}
          value={activeFile.content || ""}
          loading={<p>Loading...</p>}
          theme={editorSettings.editor?.theme || "jsDarkOrange"}
          onChange={handleContentChange}
          beforeMount={handleBeforeMount}
          onMount={(editorInstance, monaco) => {
            // Store monaco instance if not already set
            if (!monacoInstance && monaco) {
              setMonacoInstance(monaco);
            }
            
            editorInstance.updateOptions({
              fontSize: fontSize,
            });

            editorInstance.onDidScrollChange(() => {});

            const editorDomNode = editorInstance.getDomNode();
            if (editorDomNode) {
              editorDomNode.addEventListener("wheel", (e) => {
                handleWheel(editorInstance, e);
              });
            }
          }}
          options={{
            cursorBlinking: "solid",
            cursorStyle: "block",
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            minimap: { enabled: editorSettings.editor?.minimap?.enabled !== undefined ? editorSettings.editor.minimap.enabled : false },
            scrollBeyondLastLine: false,
            wordWrap: editorSettings.editor?.wordWrap || "on",
            automaticLayout: true,
            selectionHighlight: false,
            lineNumbers: editorSettings.editor?.lineNumbers || "off",
            fontSize: fontSize,
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showModules: true,
              showProps: true,
              showWords: true,
              showClasses: true,
              showVariables: true,
            },
            parameterHints: { enabled: true },
            codeActionsOnSave: {
              "source.fixAll": true,
              "source.organizeImports": true,
            },
            hover: { enabled: true },
            lightbulb: { enabled: true },
            formatOnPaste: true,
            formatOnType: true,
            quickSuggestions: {
              strings: true,
              comments: false,
              other: true,
            },
            acceptSuggestionOnEnter: "on",
            snippetSuggestions: "inline",
            suggestOnTriggerCharacters: true,
            tabCompletion: "on",
            wordBasedSuggestions: true,
            autoClosingBrackets: editorSettings.editor?.autoClosingBrackets || "always",
            autoClosingQuotes: editorSettings.editor?.autoClosingQuotes || "always",
            autoIndent: editorSettings.editor?.autoIndent || "full",
            trimAutoWhitespace: true,
            suggestSelection: "first",
            quickSuggestionsDelay: 100,
            showFoldingControls: "always",
            folding: true,
            foldingStrategy: "indentation",
          }}
        />
      ) : (
        <div
          style={{
            height: getEditorHeight(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            background: "rgb(0, 0, 0, 0.2)",
          }}
        >
          <p>No file selected</p>
        </div>
      )}
    </>
  );
}
