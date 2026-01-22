import styles from "../index.module.sass";
export function Console({
  consoleState,
  consoleOutput,
  previewVisible,
  previewContent,
  toggleConsoleState,
  handleSubmit,
  handlePreview,
  verticalResizer,
}) {
  const getConsoleHeight = () => {
    const availableHeight = 92 - verticalResizer - 2; 
    return `${Math.max(0, availableHeight)}vh`;
  };

  const shouldShowControlBar = () => {
    const availableHeight = 92 - verticalResizer - 2; 
    return availableHeight > 0;
  };

  return (
    <div
      className={styles.console}
      data-console-expanded={consoleState.toString()}
      data-preview-selected={previewVisible.toString()}
      style={{ height: getConsoleHeight() }}
    >
      <div className={styles.preview_console_container}>
        {previewVisible && (
          <div className={styles.preview_panel}>
            <iframe
              srcDoc={previewContent}
              className={styles.preview_iframe}
              title="Preview"
            />
          </div>
        )}

        {consoleState && consoleOutput.length > 0 && (
          <div className={styles.console_output}>
            {consoleOutput.map((output, index) => (
              <div key={index}>{output}</div>
            ))}
          </div>
        )}
      </div>

      {shouldShowControlBar() && (
        <div className={styles.control_bar}>
          <div className={styles.vertical_button} onClick={() => handleSubmit()}>
            <span className={styles.vertical_text}>Run</span>
          </div>
          <div className={styles.vertical_button} onClick={() => handlePreview()}>
            <span className={styles.vertical_text}>Preview</span>
          </div>
          <div className={styles.vertical_button} onClick={toggleConsoleState}>
            <span className={styles.vertical_text}>Toggle</span>
          </div>
        </div>
      )}
    </div>
  );
}
