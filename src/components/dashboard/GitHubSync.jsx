import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { GitHubProblemService } from "../../services/githubProblemService";
import { DiffPreview } from "./code-screen/components/DiffPreview";
import { CONFIG_FILES } from "../../constants/code-screen/fileDefaults";
import {
  FaGithub,
  FaUpload,
  FaDownload,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import styles from "./GitHubSync.module.sass";

export default function GitHubSync({
  selectedProblem,
  files,
  onFilesUpdated,
  onFilesFromGitHub,
  hasStoredVersion,
}) {
  const { user, token } = useAuth();
  const [syncStatus, setSyncStatus] = useState("idle"); // idle, pushing, pulling, success, error
  const [syncMessage, setSyncMessage] = useState("");
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showDiffPreview, setShowDiffPreview] = useState(false);
  const [diffData, setDiffData] = useState(null);
  const [remoteFiles, setRemoteFiles] = useState([]);

  const handlePushToGitHub = async () => {
    if (!token || !user?.repository) {
      setSyncStatus("error");
      setSyncMessage("Not authenticated or repository not found");
      return;
    }

    // Handle configuration files when no problem is selected
    if (!selectedProblem) {
      await pushConfigurationFiles();
      return;
    }

    // First, fetch remote files to compare
    try {
      setSyncStatus("pushing");
      setSyncMessage("Fetching remote files...");

      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split("/");

      // Get remote problem data
      const remoteData = await githubService.pullProblem(
        owner,
        repo,
        selectedProblem.title,
      );
      const remoteProblemFiles = remoteData.success ? remoteData.files : [];

      // console.log('Local files:', files);
      // console.log('Remote files:', remoteProblemFiles);

      // Generate diff
      const diff = githubService.generateDiffPreview(files, remoteProblemFiles);

      // console.log('Generated diff:', diff);

      setRemoteFiles(remoteProblemFiles);
      setDiffData(diff);
      setShowDiffPreview(true);
      setSyncStatus("idle");
      setSyncMessage("");
    } catch (error) {
      console.error("Failed to prepare push:", error);
      setSyncStatus("error");
      setSyncMessage(`Failed to prepare push: ${error.message}`);

      setTimeout(() => {
        setSyncStatus("idle");
        setSyncMessage("");
      }, 5000);
    }
  };

  const pushConfigurationFiles = async () => {
    try {
      setSyncStatus("pushing");
      setSyncMessage("Pushing configuration files...");

      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split("/");

      // Filter only configuration files
      const configFiles = files.filter(file => file.config);
      
      const result = await githubService.saveConfigurationFiles(owner, repo, configFiles);

      if (result.success) {
        setSyncStatus("success");
        setSyncMessage(`Successfully pushed ${configFiles.length} configuration files to GitHub`);
        
        setTimeout(() => {
          setSyncStatus("idle");
          setSyncMessage("");
        }, 5000);
      } else {
        throw new Error("Failed to save configuration files");
      }
    } catch (error) {
      console.error("Push configuration files failed:", error);
      setSyncStatus("error");
      setSyncMessage(`Failed to push: ${error.message}`);

      setTimeout(() => {
        setSyncStatus("idle");
        setSyncMessage("");
      }, 5000);
    }
  };

  const confirmPush = async () => {
    if (!token || !user?.repository || !selectedProblem) {
      setSyncStatus("error");
      setSyncMessage(
        "Not authenticated, repository not found, or no problem selected",
      );
      return;
    }

    setSyncStatus("pushing");
    setSyncMessage("Pushing files to GitHub...");

    try {
      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split("/");

      // Push problem to GitHub
      const result = await githubService.pushProblem(
        owner,
        repo,
        selectedProblem.title,
        files,
        {
          action: "Update",
          problemTitle: selectedProblem.title,
          description: selectedProblem.description,
          hasStoredVersion,
        },
      );

      if (result.success) {
        setSyncStatus("success");
        setSyncMessage(`Successfully pushed ${files.length} files to GitHub`);
        
        // Close diff preview first
        setShowDiffPreview(false);
        
        // Show success message for longer
        setTimeout(() => {
          setSyncStatus("idle");
          setSyncMessage("");
        }, 5000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Push to GitHub failed:", error);
      setSyncStatus("error");
      setSyncMessage(`Failed to push: ${error.message}`);

      setTimeout(() => {
        setSyncStatus("idle");
        setSyncMessage("");
      }, 5000);
    }
  };

  const handlePullFromGitHub = async () => {
    if (!token || !user?.repository) {
      setSyncStatus("error");
      setSyncMessage("Not authenticated or repository not found");
      return;
    }

    // Handle configuration files when no problem is selected
    if (!selectedProblem) {
      await pullConfigurationFiles();
      return;
    }

    setSyncStatus("pulling");
    setSyncMessage("Pulling files from GitHub...");

    try {
      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split("/");

      // Pull problem from GitHub
      const result = await githubService.pullProblem(
        owner,
        repo,
        selectedProblem.title,
      );

      // console.log('Pull result:', result);

      if (result.success) {
        // Update parent component with pulled files
        if (onFilesFromGitHub) {
          const updatedFiles = result.files.map((file, index) => ({
            ...file,
            active: index === 0,
            default: false,
          }));
          // console.log('Calling onFilesFromGitHub with:', updatedFiles);
          onFilesFromGitHub(updatedFiles);
        }

        setSyncStatus("success");
        setSyncMessage(
          `Successfully pulled ${result.files.length} files from GitHub`,
        );

        setTimeout(() => {
          setSyncStatus("idle");
          setSyncMessage("");
        }, 3000);
      } else {
        setSyncStatus("error");
        setSyncMessage(result.error || "Problem not found in repository");

        setTimeout(() => {
          setSyncStatus("idle");
          setSyncMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Pull from GitHub failed:", error);
      setSyncStatus("error");
      setSyncMessage(`Failed to pull: ${error.message}`);

      setTimeout(() => {
        setSyncStatus("idle");
        setSyncMessage("");
      }, 5000);
    }
  };

  const pullConfigurationFiles = async () => {
    try {
      setSyncStatus("pulling");
      setSyncMessage("Pulling configuration files...");

      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split("/");

      const configFiles = await githubService.getConfigurationFiles(owner, repo);

      if (configFiles) {
        if(onFilesFromGitHub){
        const updatedFiles = configFiles.map((file, index) => ({
          ...file,
          active: index === 0,
          default: true,
        }));
        onFilesFromGitHub(updatedFiles);
        }
      }

      setSyncStatus("success");
      setSyncMessage(`Successfully pulled ${configFiles.length} configuration files from GitHub`);

      setTimeout(() => {
        setSyncStatus("idle");
        setSyncMessage("");
      }, 3000);
    } catch (error) {
      console.error("Pull configuration files failed:", error);
      setSyncStatus("error");
      setSyncMessage(`Failed to pull: ${error.message}`);

      setTimeout(() => {
        setSyncStatus("idle");
        setSyncMessage("");
      }, 5000);
    }
  };

  const getSyncButtonProps = () => {
    switch (syncStatus) {
      case "pushing":
        return {
          icon: <FaSpinner className={styles.spinning} />,
          text: "Pushing...",
          className: styles.pushing,
        };
      case "pulling":
        return {
          icon: <FaSpinner className={styles.spinning} />,
          text: "Pulling...",
          className: styles.pulling,
        };
      case "success":
        return {
          icon: <FaCheck />,
          text: "Success!",
          className: styles.success,
        };
      case "error":
        return {
          icon: <FaExclamationTriangle />,
          text: "Error",
          className: styles.error,
        };
      default:
        return null;
    }
  };

  const syncButtonProps = getSyncButtonProps();

  return (
    <>
      <div className={styles.githubSync}>
        <div className={styles.syncInfo}>
          <a
            href={`https://github.com/${user?.repository}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className={styles.githubIcon} />
          </a>
          <a
            href={user?.isGuest ? "http://aryanbatras.github.io/js-homepage/login" : `https://github.com/${user?.repository}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.repoName}>
              {user?.repository || "Not connected"}
              {selectedProblem ? (
                <span className={styles.problemName}>
                  {selectedProblem.title}
                </span>
              ) : (
                <span className={styles.problemName}>
                  Configuration Files
                </span>
              )}
            </span>
          </a>
        </div>

        <div className={styles.syncActions}>
          <button
            onClick={handlePushToGitHub}
            disabled={syncStatus !== "idle"}
            className={`${styles.syncButton} ${styles.pushButton}`}
            title={selectedProblem ? "Push current problem to GitHub" : "Push configuration files to GitHub"}
          >
            <FaUpload />
            <span>{selectedProblem ? "Push" : "Push Config"}</span>
          </button>

          <button
            onClick={handlePullFromGitHub}
            disabled={syncStatus !== "idle"}
            className={`${styles.syncButton} ${styles.pullButton}`}
            title={selectedProblem ? "Pull current problem from GitHub" : "Pull configuration files from GitHub"}
          >
            <FaDownload />
            <span>{selectedProblem ? "Pull" : "Pull Config"}</span>
          </button>
        </div>

        {syncMessage && (
          <div className={`${styles.syncMessage} ${styles[syncStatus]}`}>
            {syncButtonProps && (
              <span className={styles.messageIcon}>{syncButtonProps.icon}</span>
            )}
            <span>{syncMessage}</span>
          </div>
        )}
      </div>

      {showSyncModal && (
        <div className={styles.syncModalOverlay}>
          <div className={styles.syncModal}>
            <div className={styles.modalHeader}>
              <h3>GitHub Synchronization</h3>
              <button
                onClick={() => setShowSyncModal(false)}
                className={styles.closeBtn}
              >
                ×
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.repoInfo}>
                <h4>Repository Information</h4>
                <div className={styles.infoItem}>
                  <strong>Repository:</strong>
                  <a
                    href={`https://github.com/${user?.repository}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user?.repository}
                  </a>
                </div>
                {selectedProblem && (
                  <>
                    <div className={styles.infoItem}>
                      <strong>Current Problem:</strong>
                      <span>{selectedProblem.title}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Files to sync:</strong> {files.length}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Local version:</strong>
                      <span
                        className={
                          hasStoredVersion ? styles.hasLocal : styles.noLocal
                        }
                      >
                        {hasStoredVersion
                          ? "Saved locally"
                          : "Not saved locally"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {selectedProblem && (
                <div className={styles.syncActionsModal}>
                  <button
                    onClick={handlePushToGitHub}
                    disabled={syncStatus !== "idle"}
                    className={`${styles.modalSyncBtn} ${styles.pushModalBtn}`}
                  >
                    <FaUpload />
                    <div>
                      <strong>Push Problem to GitHub</strong>
                      <small>
                        Upload your solution for "{selectedProblem.title}"
                      </small>
                    </div>
                  </button>

                  <button
                    onClick={handlePullFromGitHub}
                    disabled={syncStatus !== "idle"}
                    className={`${styles.modalSyncBtn} ${styles.pullModalBtn}`}
                  >
                    <FaDownload />
                    <div>
                      <strong>Pull Problem from GitHub</strong>
                      <small>
                        Download latest solution for "{selectedProblem.title}"
                      </small>
                    </div>
                  </button>
                </div>
              )}

              <div className={styles.syncTips}>
                <h4>Tips</h4>
                <ul>
                  <li>
                    <strong>Push</strong> uploads your current problem solution
                    to GitHub
                  </li>
                  <li>
                    <strong>Pull</strong> downloads the latest solution from
                    GitHub
                  </li>
                  <li>
                    Your code is stored in{" "}
                    <code>solvedProblems/Problem Name/</code> directory
                  </li>
                  <li>
                    Each problem has its own folder with multiple solution files
                  </li>
                  <li>Changes are automatically saved to local storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDiffPreview && diffData && (
        <div className={styles.diffModalOverlay}>
          <div className={styles.diffModal}>
            <DiffPreview
              diff={diffData}
              onConfirm={confirmPush}
              onCancel={() => setShowDiffPreview(false)}
              isLoading={syncStatus === "pushing"}
            />
          </div>
        </div>
      )}
    </>
  );
}
