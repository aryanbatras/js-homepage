import styles from "../index.module.sass";

const formatConsoleOutput = (output) => {
  const timestamp = new Date().toLocaleTimeString();
  
  if (typeof output === 'object' && output !== null && output.type) {
    return {
      type: output.type,
      timestamp: output.timestamp || timestamp,
      message: output.content || output.message || '',
      formatted: output.content || output.message || ''
    };
  }
  
  if (typeof output === 'string') {
    const type = output.includes('Error') ? 'error' : 
                 output.includes('Warning') ? 'warning' : 
                 output.includes('Info') ? 'info' : 'log';
    
    return {
      type,
      timestamp,
      message: output,
      formatted: output
    };
  }
  
  if (typeof output === 'object' && output !== null) {
    return {
      type: 'log',
      timestamp,
      message: JSON.stringify(output, null, 2),
      formatted: output
    };
  }
  
  const type = typeof output === 'number' ? 'number' : 
               typeof output === 'boolean' ? 'boolean' : 
               typeof output === 'function' ? 'function' : 
               output === undefined ? 'undefined' : 'log';
  
  return {
    type,
    timestamp,
    message: String(output),
    formatted: output
  };
};

const formatValue = (value, type) => {
  if (type === 'string') return `<span class="${styles.console_string}">"${value}"</span>`;
  if (type === 'number') return `<span class="${styles.console_number}">${value}</span>`;
  if (type === 'boolean') return `<span class="${styles.console_boolean}">${value}</span>`;
  if (type === 'function') return `<span class="${styles.console_function}">${value}</span>`;
  if (type === 'object') return `<span class="${styles.console_object}">${JSON.stringify(value)}</span>`;
  if (type === 'undefined') return `<span class="${styles.console_undefined}">undefined</span>`;
  return `<span class="${styles.console_value}">${value}</span>`;
};

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
            {/* <button className={styles.console_button} onClick={() => {}}>
              Clear
            </button> */}
            {consoleOutput.map((output, index) => {
              const formatted = formatConsoleOutput(output);
              return (
                <div 
                  key={index} 
                  className={`${styles.console_log} ${styles[`console_log--${formatted.type}`]}`}
                >
                  <span className={styles.console_timestamp}>
                    [{formatted.timestamp}]
                  </span>
                  <span 
                    className={styles.console_message}
                    dangerouslySetInnerHTML={{ 
                      __html: formatValue(formatted.message, formatted.type) 
                    }}
                  />
                </div>
              );
            })}
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
