import styles from "./index.module.sass";
import { FileTabs } from "./components/FileTabs";
import { CodeEditor } from "./components/CodeEditor";
import { Console } from "./components/Console";
import { useFileManagement } from "../../../hooks/code-screen/useFileManagement";
import { useCodeScreen } from "../../../hooks/code-screen/useCodeScreen";
import { useVerticalResizer } from "../../../hooks/code-screen/useVerticalResizer";
import { useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";

export default function DashboardCodeScreen({ screenResizer, selectedProblem, hasStoredVersion, onHasStoredVersionChange, onFilesUpdated, onFilesFromGitHub, githubFiles }) {
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

      <div className={styles.testcases}></div>
    </div>
  );

  function VerticalResizer() {
    return (
      <div
        className={styles.verticalResizer}
        onMouseDown={(e) => setIsDragging(true)}
      >
        <CiMenuKebab />
      </div>
    );
  }
}
