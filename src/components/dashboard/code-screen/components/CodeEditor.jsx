import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
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
}) {

  const [fontSize, setFontSize] = useState(14);

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

    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: "useState",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText:
              "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState($2);",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useState hook",
          },
          {
            label: "useEffect",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "useEffect(() => {\n  $1\n}, [$2]);",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useEffect hook",
          },
          {
            label: "useCallback",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText:
              "const ${1:callback} = useCallback(($2) => {\n  $3\n}, [$4]);",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useCallback hook",
          },
          {
            label: "useMemo",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "const ${1:memoizedValue} = useMemo(() => $2, [$3]);",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useMemo hook",
          },
          {
            label: "React Component",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText:
              "function ${1:ComponentName}({$2}) {\n  return (\n    <div>\n      $3\n    </div>\n  );\n}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React functional component",
          },
          {
            label: "Arrow Component",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText:
              "const ${1:ComponentName} = ({$2}) => {\n  return (\n    <div>\n      $3\n    </div>\n  );\n};",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React arrow function component",
          },
        ];

        return { suggestions };
      },
    });
  };

  return (
    <>
      {activeFile ? (
        <Editor
          height={getEditorHeight()}
          language={activeFile.language || "javascript"}
          value={activeFile.content || ""}
          theme="vs-dark"
          loading={<p>Loading...</p>}
          onChange={handleContentChange}
          beforeMount={handleBeforeMount}
          onMount={(editorInstance) => {
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
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            selectionHighlight: false,
            lineNumbers: "off",
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
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            autoIndent: "full",
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
