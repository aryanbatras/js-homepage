import React, { useState } from 'react';
import { FiFile, FiPlus, FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';
import styles from './DiffPreview.module.sass';

export function DiffPreview({ diff, onConfirm, onCancel, isLoading }) {
  const [expandedFiles, setExpandedFiles] = useState(new Set());

  const toggleFileExpansion = (fileName) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(fileName)) {
      newExpanded.delete(fileName);
    } else {
      newExpanded.add(fileName);
    }
    setExpandedFiles(newExpanded);
  };

  const getTotalChanges = () => {
    return diff.newFiles.length + diff.modifiedFiles.length + diff.deletedFiles.length;
  };

  const hasChanges = getTotalChanges() > 0;

  const renderFileContent = (content, maxLength = 200) => {
    if (!content) return 'Empty file';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const renderAddedLines = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => (
      <div key={index} className={styles.addedLine}>
        <span className={styles.lineNumber}>+{index + 1}</span>
        <span className={styles.lineContent}>{line || ' '}</span>
      </div>
    ));
  };

  const renderModifiedLines = (localContent, remoteContent) => {
    const localLines = localContent.split('\n');
    const remoteLines = remoteContent.split('\n');
    const maxLines = Math.max(localLines.length, remoteLines.length);

    return Array.from({ length: maxLines }, (_, index) => {
      const localLine = localLines[index] || '';
      const remoteLine = remoteLines[index] || '';
      const isAdded = index >= remoteLines.length;
      const isRemoved = index >= localLines.length;
      const isModified = localLine !== remoteLine && !isAdded && !isRemoved;

      return (
        <div key={index} className={styles.diffLine}>
          <span className={styles.lineNumber}>
            {isRemoved ? '-' : isAdded ? '+' : ' '}
            {Math.max(index + 1, Math.min(localLines.length, remoteLines.length))}
          </span>
          <div className={styles.lineContent}>
            {isRemoved && (
              <div className={styles.removedContent}>{remoteLine || ' '}</div>
            )}
            {isAdded && (
              <div className={styles.addedContent}>{localLine || ' '}</div>
            )}
            {isModified && (
              <>
                <div className={styles.removedContent}>{remoteLine || ' '}</div>
                <div className={styles.addedContent}>{localLine || ' '}</div>
              </>
            )}
            {!isAdded && !isRemoved && !isModified && (
              <div>{localLine || ' '}</div>
            )}
          </div>
        </div>
      );
    });
  };

  if (!hasChanges && !isLoading) {
    return (
      <div className={styles.diffPreview}>
        <div className={styles.header}>
          <h3>No Changes to Push</h3>
        </div>
        <div className={styles.noChanges}>
          <FiCheck className={styles.icon} />
          <p>Your files are up to date with the remote repository.</p>
        </div>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.diffPreview}>
      <div className={styles.header}>
        <h3>Push Preview</h3>
        <p className={styles.summary}>
          {getTotalChanges()} change{getTotalChanges() !== 1 ? 's' : ''} to push
        </p>
      </div>

      <div className={styles.diffContent}>
        {/* New Files */}
        {diff.newFiles.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              <FiPlus className={styles.sectionIcon} />
              New Files ({diff.newFiles.length})
            </h4>
            {diff.newFiles.map((file) => (
              <div key={file.name} className={styles.fileItem}>
                <div 
                  className={styles.fileHeader}
                  onClick={() => toggleFileExpansion(file.name)}
                >
                  <FiFile className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.expandIcon}>
                    {expandedFiles.has(file.name) ? '▼' : '▶'}
                  </span>
                </div>
                {expandedFiles.has(file.name) && (
                  <div className={styles.fileContent}>
                    <div className={styles.codeBlock}>
                      {renderAddedLines(file.content)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modified Files */}
        {diff.modifiedFiles.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              <FiEdit className={styles.sectionIcon} />
              Modified Files ({diff.modifiedFiles.length})
            </h4>
            {diff.modifiedFiles.map((file) => (
              <div key={file.name} className={styles.fileItem}>
                <div 
                  className={styles.fileHeader}
                  onClick={() => toggleFileExpansion(file.name)}
                >
                  <FiFile className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.expandIcon}>
                    {expandedFiles.has(file.name) ? '▼' : '▶'}
                  </span>
                </div>
                {expandedFiles.has(file.name) && (
                  <div className={styles.fileContent}>
                    <div className={styles.codeBlock}>
                      {renderModifiedLines(file.localContent, file.remoteContent)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Deleted Files */}
        {diff.deletedFiles.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              <FiTrash2 className={styles.sectionIcon} />
              Deleted Files ({diff.deletedFiles.length})
            </h4>
            {diff.deletedFiles.map((file) => (
              <div key={file.name} className={styles.fileItem}>
                <div className={styles.fileHeader}>
                  <FiFile className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.deletedLabel}>Deleted</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unchanged Files */}
        {diff.unchangedFiles.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              <FiCheck className={styles.sectionIcon} />
              Unchanged Files ({diff.unchangedFiles.length})
            </h4>
            {diff.unchangedFiles.map((file) => (
              <div key={file.name} className={styles.fileItem}>
                <div className={styles.fileHeader}>
                  <FiFile className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.unchangedLabel}>Up to date</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button 
          onClick={onCancel} 
          className={styles.cancelButton}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          onClick={onConfirm} 
          className={styles.confirmButton}
          disabled={isLoading || !hasChanges}
        >
          {isLoading ? 'Pushing...' : `Push ${getTotalChanges()} Change${getTotalChanges() !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
