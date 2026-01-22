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

  const handleRun = () => {
    runCode(files);
  };

  const handleRunTests = async () => {
    if (!selectedProblem || !selectedProblem.tests) {
      console.log('No tests available for this problem');
      return;
    }

    setIsRunningTests(true);
    setTestResults(null);
    hidePreview();

    try {
      const userCode = files.map(file => file.content).join('\n\n');
      const results = await testRunner.runTests(userCode, selectedProblem.tests);
      
      setTestResults(results);
      
      const formattedOutput = testRunner.formatTestResults(results);
      
      setConsoleOutput(prev => [...prev, { type: 'test', content: formattedOutput, timestamp: new Date().toISOString() }]);
      setConsoleState(true);
    } catch (error) {
      console.error('Test execution error:', error);
      setConsoleOutput(prev => [...prev, { type: 'error', content: `Test execution failed: ${error.message}`, timestamp: new Date().toISOString() }]);
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
      handleRun();
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
        fileName={fileName}
        inputRef={inputRef}
        setFileName={setFileName}
        handleAddFileCompleted={handleAddFileCompleted}
        handleAddFile={handleAddFile}
        handleFileClick={handleFileClick}
        handleDeleteFile={handleDeleteFile}
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
        handleSubmit={handleRun}
        handlePreview={handlePreviewClick}
        setPreviewVisible={hidePreview}
        verticalResizer={verticalResizer}
      />

      <div className={styles.testcases}>
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
        )}
        {/* <button 
          className={`${styles.consoleToggle} ${consoleState ? styles.glowing : ''}`}
          onClick={handleToggleConsole}
          title="Toggle Console"
        >
          <FaTerminal />
        </button> */}
      </div>
    </div>
  );

  function VerticalResizer() {
    return (
      <div
        className={styles.verticalResizer}
        onMouseDown={(e) => setIsDragging(true)}
      >
        <CiMenuKebab className={styles.verticalResizerIcon} />
      </div>
    );
  }
}
