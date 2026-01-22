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
  fileName,
  inputRef,
  setFileName,
  handleAddFileCompleted,
  handleAddFile,
  handleFileClick,
  handleDeleteFile,
}) {
  const [settings, setSettings] = useState(false);
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
                className={styles.option}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.name);
                  setSettings(false)
                }}
              >
                <div className={styles.option__icon}>
                  <MdOutlineDeleteOutline />
                </div>
                <span>Delete</span>
              </div>
            </div>
          ),
      )}
    </div>
  );
}
