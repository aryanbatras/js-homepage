import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import styles from './GitHubLogin.module.sass';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://github-oauth-worker.batraaryan03.workers.dev';

export default function GitHubLogin() {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const handleGitHubLogin = () => {
    setShowPermissionDialog(true);
  };

  const handlePermissionAccept = () => {
    const authUrl = `${BACKEND_URL}/auth/github`;
    window.location.href = authUrl;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>JS Learning Platform</h1>
        <p className={styles.subtitle}>Master JavaScript with interactive coding challenges</p>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.icon}>💻</span>
            <span>Interactive Code Editor</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>📚</span>
            <span>Structured Learning Path</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>🚀</span>
            <span>Real-time Preview</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>📝</span>
            <span>GitHub Integration</span>
          </div>
        </div>

        <button onClick={handleGitHubLogin} className={styles.loginButton}>
          <FaGithub className={styles.githubIcon} />
          Sign in with GitHub
        </button>

        <p className={styles.note}>
          Your code will be saved to your personal GitHub repository
        </p>
      </div>

      {showPermissionDialog && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h2 className={styles.dialogTitle}>GitHub Permissions Required</h2>
            <div className={styles.permissionsList}>
              <div className={`${styles.permissionItem} ${styles.granted}`}>
                <span className={styles.permissionIcon}>✅</span>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>Read your email address</strong>
                  <p className={styles.permissionDescription}>For personalization and account identification</p>
                </div>
              </div>
              <div className={`${styles.permissionItem} ${styles.granted}`}>
                <span className={styles.permissionIcon}>✅</span>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>Create public repositories</strong>
                  <p className={styles.permissionDescription}>
                    To create your personal learning repository: <br /> <code className={styles.permissionCode}>js-learning-platform-{`{your-username}`}</code>
                  </p>
                </div>
              </div>
              <div className={`${styles.permissionItem} ${styles.denied}`}>
                <span className={styles.permissionIcon}>✅</span>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>No access to existing repositories</strong>
                  <p className={styles.permissionDescription}>We cannot read or modify your existing repositories</p>
                </div>
              </div>
              <div className={`${styles.permissionItem} ${styles.denied}`}>
                <span className={styles.permissionIcon}>✅</span>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>No private repository access</strong>
                  <p className={styles.permissionDescription}>We only work with your dedicated learning repository</p>
                </div>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button onClick={handlePermissionAccept} className={styles.acceptButton}>
                Accept & Continue
              </button>
              <button onClick={() => setShowPermissionDialog(false)} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
