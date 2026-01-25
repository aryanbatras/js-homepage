import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './GitHubLogin.module.sass';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://github-oauth-worker.batraaryan03.workers.dev';

export default function GitHubLogin() {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGitHubLogin = () => {
    setShowPermissionDialog(true);
  };

  const handleGuestLogin = () => {
    setShowGuestDialog(true);
  };

  const handleGuestAccept = () => {
    const mockGuestData = {
      id: 'guest-' + Date.now(),
      login: 'guest-user',
      name: 'Guest User',
      email: 'guest@example.com',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      isGuest: true
    };
    
    const guestToken = 'guest-token-' + Date.now();
    login(guestToken, mockGuestData);
    navigate('/dashboard');
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
        
        {/* <div className={styles.features}>
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
        </div> */}

        <button onClick={handleGitHubLogin} className={styles.loginButton}>
          <FaGithub className={styles.githubIcon} />
          Sign in with GitHub
        </button>
        <span>OR</span>

        <button onClick={handleGuestLogin} className={styles.guestButton}>
          Continue as Guest
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
              {/* <div className={`${styles.permissionItem} ${styles.granted}`}>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>Read your email address</strong>
                  <p className={styles.permissionDescription}>For personalization and account identification</p>
                </div>
              </div> */}
              <div className={`${styles.permissionItem} ${styles.granted}`}>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>Create public repository to store your code files</strong>
                  <p className={styles.permissionDescription}>
                     <code className={styles.permissionCode}>js-learning-platform-{`{your-username}`}</code>
                  </p>
                </div>
              </div>
              <div className={`${styles.permissionItem} ${styles.denied}`}>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>No access to existing repositories</strong>
                  {/* <p className={styles.permissionDescription}>We cannot read or modify your existing repositories</p> */}
                </div>
              </div>
              <div className={`${styles.permissionItem} ${styles.denied}`}>
                <div className={styles.permissionContent}>
                  <strong className={styles.permissionTitle}>No private repository access</strong>
                  {/* <p className={styles.permissionDescription}>We only work with your dedicated learning repository</p> */}
                </div>
              </div>
              <div className={`${styles.permissionItem} ${styles.granted} ${styles.disclaimerItem}`}>
                <div className={`${styles.permissionContent} ${styles.disclaimerContent}`}>
                  <input 
                    type="checkbox" 
                    id="disclaimer" 
                    className={styles.disclaimerCheckbox}
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  />
                  <label htmlFor="disclaimer" className={styles.disclaimerLabel}>
                    I authorize the application to create a public repository. This is for the purpose of storing my code files.
                  </label>
                </div>
              </div>

            </div>
            
            <div className={styles.actions}>
              <button 
                onClick={handlePermissionAccept} 
                className={`${styles.acceptButton} ${!disclaimerAccepted ? styles.disabledButton : ''}`}
                disabled={!disclaimerAccepted}
              >
                Accept & Continue
              </button>
              <button onClick={() => setShowPermissionDialog(false)} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showGuestDialog && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h2 className={styles.dialogTitle}>Guest Mode Warning</h2>
            <div className={styles.guestWarning}>
              {/* <div className={styles.warningIcon}>⚠️</div> */}
              <div className={styles.warningContent}>
                <p className={styles.warningText}>
                  <strong>Important:</strong> You are about to continue in Guest Mode.
                </p>
                <ul className={styles.warningList}>
                  <li>Your code files will <strong>NOT</strong> be saved to the cloud</li>
                  <li>All progress will be <strong>lost</strong> when you refresh the page</li>
                  <li>You won't have access to your personal GitHub repository</li>
                </ul>
                <p className={styles.suggestionText}>
                  For the best experience, <br/> we recommend signing in with GitHub to save your progress.
                </p>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button onClick={handleGuestAccept} className={styles.guestAcceptButton}>
                Continue as Guest
              </button>
              <button onClick={() => setShowGuestDialog(false)} className={styles.cancelButton}>
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
