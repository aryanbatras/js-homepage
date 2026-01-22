import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import './GitHubLogin.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://github-oauth-worker.batraaryan03.workers.dev';

export default function GitHubLogin() {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const handleGitHubLogin = () => {
    setShowPermissionDialog(true);
  };

  const handlePermissionAccept = () => {
    // Redirect to Cloudflare Worker which handles GitHub OAuth
    const authUrl = `${BACKEND_URL}/auth/github`;
    window.location.href = authUrl;
  };

  return (
    <div className="github-login-container">
      <div className="login-card">
        <h1>JS Learning Platform</h1>
        <p>Master JavaScript with interactive coding challenges</p>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">💻</span>
            <span>Interactive Code Editor</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📚</span>
            <span>Structured Learning Path</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚀</span>
            <span>Real-time Preview</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📝</span>
            <span>GitHub Integration</span>
          </div>
        </div>

        <button onClick={handleGitHubLogin} className="github-login-btn">
          <FaGithub />
          Sign in with GitHub
        </button>

        <p className="login-note">
          Your code will be saved to your personal GitHub repository
        </p>
      </div>

      {showPermissionDialog && (
        <div className="permission-overlay">
          <div className="permission-dialog">
            <h2>GitHub Permissions Required</h2>
            <div className="permissions-list">
              <div className="permission-item granted">
                <span className="permission-icon">✅</span>
                <div>
                  <strong>Read your email address</strong>
                  <p>For personalization and account identification</p>
                </div>
              </div>
              <div className="permission-item granted">
                <span className="permission-icon">✅</span>
                <div>
                  <strong>Create public repositories</strong>
                  <p>To create your personal learning repository: <code>js-learning-platform-{`{your-username}`}</code></p>
                </div>
              </div>
              <div className="permission-item denied">
                <span className="permission-icon">❌</span>
                <div>
                  <strong>No access to existing repositories</strong>
                  <p>We cannot read or modify your existing repositories</p>
                </div>
              </div>
              <div className="permission-item denied">
                <span className="permission-icon">❌</span>
                <div>
                  <strong>No private repository access</strong>
                  <p>We only work with your dedicated learning repository</p>
                </div>
              </div>
            </div>
            
            <div className="permission-actions">
              <button onClick={handlePermissionAccept} className="accept-btn">
                Accept & Continue
              </button>
              <button onClick={() => setShowPermissionDialog(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
