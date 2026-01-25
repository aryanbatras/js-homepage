import styles from "../index.module.sass";
import { FaPlus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";

export function FileTabs({
  files,
  activeFile,
  addFile,
  setAddFile,
  fileName,
  inputRef,
  setFileName,
  handleAddFileCompleted,
  handleAddFile,
  handleFileClick,
  handleDeleteFile,
  selectedProblem,
}) {
  const [settings, setSettings] = useState(false);

  // Function to check if a file is a core file
  const isCoreFile = (fileName) => {
    // Check if it's tests.js
    if (fileName === 'tests.js') return true;
    
    // Check if it's a configuration file
    const configFiles = ['snippets.js', 'settings.json', 'package.json', 'README.md'];
    if (configFiles.includes(fileName)) return true;
    
    // Check if it's a core executable file from the problem data
    if (selectedProblem && selectedProblem.files) {
      return selectedProblem.files.some(coreFile => coreFile.name === fileName);
    }
    
    return false;
  };
  return (
    <div className={styles.files_wrapper}>
      <div className={styles.files}>
        {files.map((file) => (
          <div
            key={file.name}
            className={styles.file}
            onClick={() => handleFileClick(file.name)}
            data-selected={activeFile?.name === file.name}
          >
            <span>{file.name}</span>
          </div>
        ))}

        {addFile && (
          <div className={styles.files__input_container}>
            <input
              ref={inputRef}
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className={styles.files__input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddFileCompleted();
                } else if (e.key === "Escape") {
                  setAddFile(false);
                }
              }}
            />
            <FaCheckCircle
              onClick={handleAddFileCompleted}
              className={styles.files__input_icon}
            />
          </div>
        )}

        <div className={styles.files__add_icon} onClick={handleAddFile}>
          <FaPlus />
        </div>
        <div className={styles.files__add_icon} style={{opacity: "0"}}>
          <IoMdSettings />
        </div>
        <div
          className={styles.files__setting_icon}
          onClick={() => setSettings(!settings)}
        >
          <IoMdSettings />
        </div>
      </div>

      {files.map(
        (file) =>
          settings && activeFile?.name === file.name && (
            <div key={`menu-${file.name}`} className={styles.menu}>
              <div
                className={`${styles.option} ${isCoreFile(file.name) ? styles.option__disabled : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCoreFile(file.name)) {
                    handleDeleteFile(file.name);
                    setSettings(false);
                  }
                }}
                title={isCoreFile(file.name) ? "Core files cannot be deleted" : "Delete file"}
              >
                <div className={`${styles.option__icon} ${isCoreFile(file.name) ? styles.option__icon__disabled : ''}`}>
                  <MdOutlineDeleteOutline />
                </div>
                <span>{isCoreFile(file.name) ? "Core File" : "Delete"}</span>
              </div>
            </div>
          ),
      )}
    </div>
  );
}
