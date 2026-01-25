import styles from "./index.module.sass";
import { FileTabs } from "./components/FileTabs";
import { CodeEditor } from "./components/CodeEditor";
import { Console } from "./components/Console";
import { useFileManagement } from "../../../hooks/code-screen/useFileManagement";
import { useCodeScreen } from "../../../hooks/code-screen/useCodeScreen";
import { useVerticalResizer } from "../../../hooks/code-screen/useVerticalResizer";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { TestRunner } from "../../../utils/testRunner";
import { FaPlay, FaVial, FaTerminal } from "react-icons/fa";

export default function DashboardCodeScreen({ screenResizer, selectedProblem, hasStoredVersion, onHasStoredVersionChange, onFilesUpdated, onFilesFromGitHub, githubFiles }) {
  const [testResults, setTestResults] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const testRunner = new TestRunner();
  const { verticalResizer, setIsDragging } = useVerticalResizer();
  const {
    inputRef,
    fileName,
    setFileName,
    files,
    addFile,
    setAddFile,
    activeFile,
    handleAddFile,
    setFilesFromExternal,
    handleAddFileCompleted,
    handleFileClick,
    handleContentChange,
    handleDeleteFile,
    handleCreateNotesFile,
  } = useFileManagement(selectedProblem, onFilesUpdated);

  const {
    consoleState,
    setConsoleState,
    consoleOutput,
    setConsoleOutput,
    runCode,
    showPreview,
    toggleConsole,
    previewContent,
    previewVisible,
    hidePreview,
  } = useCodeScreen(files);

  // Function to handle files pulled from GitHub
  const handleFilesFromGitHub = (pulledFiles) => {
    setFilesFromExternal(pulledFiles);
    // Also notify parent if needed
    if (onFilesFromGitHub) {
      onFilesFromGitHub(pulledFiles);
    }
  };

  const handleUnifiedRun = async () => {
    setIsRunningTests(true);
    setTestResults(null);
    hidePreview();
    setConsoleOutput([]);

    try {
      // Check if tests.js exists and has EXECUTABLE code (not just comments/whitespace)
      const testsFile = files.find(file => file.name === 'tests.js');
      let hasExecutableTests = false;
      
      if (testsFile && testsFile.content.trim()) {
        // Check if tests.js has actual executable code, not just comments
        hasExecutableTests = testsFile.content.split('\n').some(line => {
          const trimmed = line.trim();
          return trimmed && 
                 !trimmed.startsWith('//') && 
                 !trimmed.startsWith('/*') && 
                 !trimmed.startsWith('*') && 
                 !trimmed.startsWith('*/') &&
                 !trimmed.startsWith('#');
        });
      }
      
      if (hasExecutableTests) {
        // Run tests with all JS files only (global context)
        const codeFiles = files.filter(file => file.name !== 'tests.js' && file.name.endsWith('.js'));
        if (codeFiles.length === 0) {
          setConsoleOutput([{ type: 'error', content: 'No JavaScript files found to test', timestamp: new Date().toLocaleTimeString() }]);
          return;
        }

        const userCode = codeFiles.map(file => file.content).join('\n\n');
        const testsContent = testsFile.content;
        
        // Execute tests
        const tests = [{ test: 'tests.js', code: testsContent.trim() }];
        const results = await testRunner.runTests(userCode, tests);
        
        const testConsoleOutput = results.map(log => ({
          type: log.type === 'log' ? 'test' : log.type,
          content: log.message,
          timestamp: log.timestamp
        }));
        
        setConsoleOutput(prev => [...prev, ...testConsoleOutput]);
      } else {
        // Run individual file (no executable tests)
        const activeFile = files.find(file => file.active && file.name.endsWith('.js'));
        if (!activeFile) {
          setConsoleOutput([{ type: 'error', content: 'No active JavaScript file found', timestamp: new Date().toLocaleTimeString() }]);
          return;
        }

        const originalLog = console.log;
        const outputs = [];
        console.log = (...args) => {
          outputs.push({
            type: 'log',
            content: args.join(' '),
            timestamp: new Date().toLocaleTimeString()
          });
          originalLog(...args);
        };

        try {
          const executeCode = new Function(activeFile.content);
          executeCode();
          
          if (outputs.length === 0) {
            const isTestsFile = activeFile.name === 'tests.js';
            if (isTestsFile) {
              outputs.push({
                type: 'log',
                content: 'tests.js is empty or only contains comments. Add executable code to run tests, or switch to another file to run individual code.',
                timestamp: new Date().toLocaleTimeString()
              });
            } else {
              outputs.push({
                type: 'log',
                content: 'Add console.log() statements to see output here. Use Run button to execute your code.',
                timestamp: new Date().toLocaleTimeString()
              });
            }
          }
          
          setConsoleOutput(outputs);
        } catch (error) {
          if (error.message.includes('Unexpected token')) {
            setConsoleOutput([
              { type: 'log', content: 'Note: This console is for pure JavaScript output. If you\'re trying to observe React JS behavior, please use the preview to see the output.', timestamp: new Date().toLocaleTimeString() },
              { type: 'log', content: 'However, any JavaScript console output generated by React Js code will still be visible in the browser\'s console.', timestamp: new Date().toLocaleTimeString() }
            ]);
          } else {
            setConsoleOutput([{ type: 'error', content: `Error: ${error.message}`, timestamp: new Date().toLocaleTimeString() }]);
          }
        } finally {
          console.log = originalLog;
        }
      }
      
      setConsoleState(true);
    } catch (error) {
      console.error('Run execution error:', error);
      setConsoleOutput(prev => [...prev, { type: 'error', content: `Run execution failed: ${error.message}`, timestamp: new Date().toLocaleTimeString() }]);
      setConsoleState(true);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handlePreviewClick = () => {
    showPreview();
    setConsoleState(false);
    setAddFile(false);
  };

  const handleToggleConsole = () => {
    toggleConsole();
  };

  useEffect(() => {
    const handleRunCode = () => {
      runCode();
    };

    const handleTogglePreview = () => {
      handlePreviewClick();
    };

    const handleCreateNotes = () => {
      handleCreateNotesFile();
    };

    window.addEventListener("runCode", handleRunCode);
    window.addEventListener("togglePreview", handleTogglePreview);
    window.addEventListener("createNotesFile", handleCreateNotes);

    return () => {
      window.removeEventListener("runCode", handleRunCode);
      window.removeEventListener("togglePreview", handleTogglePreview);
      window.removeEventListener("createNotesFile", handleCreateNotes);
    };
  }, [files]);

  // Notify parent of hasStoredVersion changes
  useEffect(() => {
    if (onHasStoredVersionChange) {
      onHasStoredVersionChange(hasStoredVersion);
    }
  }, [hasStoredVersion, onHasStoredVersionChange]);

  // Handle GitHub files when they are received
  useEffect(() => {
    if (githubFiles) {
      handleFilesFromGitHub(githubFiles);
    }
  }, [githubFiles]);

  return (
    <div className={styles.code_screen} style={{ width: `${screenResizer}%` }}>
      <FileTabs
        files={files}
        activeFile={activeFile}
        addFile={addFile}
        setAddFile={setAddFile}
        fileName={fileName}
        inputRef={inputRef}
        setFileName={setFileName}
        handleAddFileCompleted={handleAddFileCompleted}
        handleAddFile={handleAddFile}
        handleFileClick={handleFileClick}
        handleDeleteFile={handleDeleteFile}
        selectedProblem={selectedProblem}
      />

      <CodeEditor
        activeFile={activeFile}
        consoleState={consoleState}
        previewVisible={previewVisible}
        handleContentChange={handleContentChange}
        verticalResizer={verticalResizer}
      />

      <VerticalResizer />

      <Console
        consoleState={consoleState}
        setConsoleState={setConsoleState}
        consoleOutput={consoleOutput}
        previewVisible={previewVisible}
        previewContent={previewContent}
        toggleConsoleState={handleToggleConsole}
        handleSubmit={runCode}
        handlePreview={handlePreviewClick}
        setPreviewVisible={hidePreview}
        verticalResizer={verticalResizer}
        handleRunTests={handleUnifiedRun}
        // isRunningTests={isRunningTests}
      />

      {/* <div className={styles.testcases}>
        {selectedProblem && selectedProblem.tests && (
          <button 
            className={styles.testButton}
            onClick={handleRunTests}
            disabled={isRunningTests}
            title="Run Tests"
          >
            {isRunningTests ? (
              <>
                <FaPlay className={styles.spinning} />
                <span>Running...</span>
              </>
            ) : (
              <>
                <FaVial />
                <span>Run Tests</span>
              </>
            )}
          </button>
        )} */}
        {/* <button 
          className={`${styles.consoleToggle} ${consoleState ? styles.glowing : ''}`}
          onClick={handleToggleConsole}
          title="Toggle Console"
        >
          <FaTerminal />
        </button> */}
      {/* </div> */}
    </div>
  );

  function VerticalResizer() {
    return (
      <div
        className={styles.verticalResizer}
        onMouseDown={(e) => setIsDragging(true)}
        onMouseMove={(e) => e.stopPropagation()}
        onMouseUp={() => setIsDragging(false)}
      >
        <CiMenuKebab className={styles.verticalResizerIcon} />
      </div>
    );
  }
}
