import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GitHubProblemService } from '../../services/githubProblemService';
import { DiffPreview } from './code-screen/components/DiffPreview';
import { FaGithub, FaUpload, FaDownload, FaSync, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

export default function GitHubSync({ selectedProblem, files, onFilesUpdated, onFilesFromGitHub, hasStoredVersion }) {
  const { user, token } = useAuth();
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, pushing, pulling, success, error
  const [syncMessage, setSyncMessage] = useState('');
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showDiffPreview, setShowDiffPreview] = useState(false);
  const [diffData, setDiffData] = useState(null);
  const [remoteFiles, setRemoteFiles] = useState([]);

  const handlePushToGitHub = async () => {
    if (!token || !user?.repository || !selectedProblem) {
      setSyncStatus('error');
      setSyncMessage('Not authenticated, repository not found, or no problem selected');
      return;
    }

    // First, fetch remote files to compare
    try {
      setSyncStatus('pushing');
      setSyncMessage('Fetching remote files...');
      
      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split('/');
      
      // Get remote problem data
      const remoteData = await githubService.pullProblem(owner, repo, selectedProblem.title);
      const remoteProblemFiles = remoteData.success ? remoteData.files : [];
      
      console.log('Local files:', files);
      console.log('Remote files:', remoteProblemFiles);
      
      // Generate diff
      const diff = githubService.generateDiffPreview(files, remoteProblemFiles);
      
      console.log('Generated diff:', diff);
      
      setRemoteFiles(remoteProblemFiles);
      setDiffData(diff);
      setShowDiffPreview(true);
      setSyncStatus('idle');
      setSyncMessage('');
      
    } catch (error) {
      console.error('Failed to prepare push:', error);
      setSyncStatus('error');
      setSyncMessage(`Failed to prepare push: ${error.message}`);
      
      setTimeout(() => {
        setSyncStatus('idle');
        setSyncMessage('');
      }, 5000);
    }
  };

  const confirmPush = async () => {
    if (!token || !user?.repository || !selectedProblem) {
      setSyncStatus('error');
      setSyncMessage('Not authenticated, repository not found, or no problem selected');
      return;
    }

    setSyncStatus('pushing');
    setSyncMessage('Pushing files to GitHub...');

    try {
      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split('/');
      
      // Push problem to GitHub
      const result = await githubService.pushProblem(
        owner, 
        repo, 
        selectedProblem.title, 
        files, 
        {
          action: 'Update',
          problemTitle: selectedProblem.title,
          description: selectedProblem.description,
          hasStoredVersion
        }
      );

      if (result.success) {
        setSyncStatus('success');
        setSyncMessage(`Successfully pushed ${files.length} files to GitHub`);
        
        setTimeout(() => {
          setSyncStatus('idle');
          setSyncMessage('');
          setShowDiffPreview(false);
        }, 3000);
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error('Push to GitHub failed:', error);
      setSyncStatus('error');
      setSyncMessage(`Failed to push: ${error.message}`);
      
      setTimeout(() => {
        setSyncStatus('idle');
        setSyncMessage('');
      }, 5000);
    }
  };

  const handlePullFromGitHub = async () => {
    if (!token || !user?.repository || !selectedProblem) {
      setSyncStatus('error');
      setSyncMessage('Not authenticated, repository not found, or no problem selected');
      return;
    }

    setSyncStatus('pulling');
    setSyncMessage('Pulling files from GitHub...');

    try {
      const githubService = new GitHubProblemService(token);
      const [owner, repo] = user.repository.split('/');
      
      // Pull problem from GitHub
      const result = await githubService.pullProblem(owner, repo, selectedProblem.title);

      console.log('Pull result:', result);

      if (result.success) {
        // Update parent component with pulled files
        if (onFilesFromGitHub) {
          const updatedFiles = result.files.map((file, index) => ({
            ...file,
            active: index === 0,
            default: false
          }));
          console.log('Calling onFilesFromGitHub with:', updatedFiles);
          onFilesFromGitHub(updatedFiles);
        }

        setSyncStatus('success');
        setSyncMessage(`Successfully pulled ${result.files.length} files from GitHub`);
        
        setTimeout(() => {
          setSyncStatus('idle');
          setSyncMessage('');
        }, 3000);
      } else {
        setSyncStatus('error');
        setSyncMessage(result.error || 'Problem not found in repository');
        
        setTimeout(() => {
          setSyncStatus('idle');
          setSyncMessage('');
        }, 5000);
      }

    } catch (error) {
      console.error('Pull from GitHub failed:', error);
      setSyncStatus('error');
      setSyncMessage(`Failed to pull: ${error.message}`);
      
      setTimeout(() => {
        setSyncStatus('idle');
        setSyncMessage('');
      }, 5000);
    }
  };

  const getSyncButtonProps = () => {
    switch (syncStatus) {
      case 'pushing':
        return {
          icon: <FaSync className="spinning" />,
          text: 'Pushing...',
          className: 'sync-btn syncing'
        };
      case 'pulling':
        return {
          icon: <FaSync className="spinning" />,
          text: 'Pulling...',
          className: 'sync-btn syncing'
        };
      case 'success':
        return {
          icon: <FaCheck />,
          text: 'Success!',
          className: 'sync-btn success'
        };
      case 'error':
        return {
          icon: <FaExclamationTriangle />,
          text: 'Error',
          className: 'sync-btn error'
        };
      default:
        return null;
    }
  };

  const syncButtonProps = getSyncButtonProps();

  return (
    <>
      <div className="github-sync">
        <div className="sync-info">
          <FaGithub className="github-icon" />
          <span className="repo-name">{user?.repository || 'Not connected'}</span>
          {selectedProblem && (
            <span className="problem-name">
              {selectedProblem.title}
              {hasStoredVersion && <span className="stored-indicator">●</span>}
            </span>
          )}
        </div>
        
        <div className="sync-actions">
          <button 
            onClick={handlePushToGitHub}
            disabled={syncStatus !== 'idle' || !selectedProblem}
            className="sync-btn push-btn"
            title="Push current problem to GitHub"
          >
            <FaUpload />
            Push
          </button>
          
          <button 
            onClick={handlePullFromGitHub}
            disabled={syncStatus !== 'idle' || !selectedProblem}
            className="sync-btn pull-btn"
            title="Pull current problem from GitHub"
          >
            <FaDownload />
            Pull
          </button>
          
          <button 
            onClick={() => setShowSyncModal(true)}
            className="sync-btn info-btn"
            title="View sync details"
          >
            <FaGithub />
            Sync
          </button>
        </div>

        {syncMessage && (
          <div className={`sync-message ${syncStatus}`}>
            {syncButtonProps && (
              <span className="message-icon">{syncButtonProps.icon}</span>
            )}
            {syncMessage}
          </div>
        )}
      </div>

      {showSyncModal && (
        <div className="sync-modal-overlay">
          <div className="sync-modal">
            <div className="modal-header">
              <h3>GitHub Synchronization</h3>
              <button onClick={() => setShowSyncModal(false)} className="close-btn">×</button>
            </div>
            
            <div className="modal-content">
              <div className="repo-info">
                <h4>Repository Information</h4>
                <div className="info-item">
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
                    <div className="info-item">
                      <strong>Current Problem:</strong>
                      <span>{selectedProblem.title}</span>
                    </div>
                    <div className="info-item">
                      <strong>Files to sync:</strong> {files.length}
                    </div>
                    <div className="info-item">
                      <strong>Local version:</strong> 
                      <span className={hasStoredVersion ? 'has-local' : 'no-local'}>
                        {hasStoredVersion ? 'Saved locally' : 'Not saved locally'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {selectedProblem && (
                <div className="sync-actions-modal">
                  <button 
                    onClick={handlePushToGitHub}
                    disabled={syncStatus !== 'idle'}
                    className="modal-sync-btn push-modal-btn"
                  >
                    <FaUpload />
                    Push Problem to GitHub
                    <small>Upload your solution for "{selectedProblem.title}"</small>
                  </button>
                  
                  <button 
                    onClick={handlePullFromGitHub}
                    disabled={syncStatus !== 'idle'}
                    className="modal-sync-btn pull-modal-btn"
                  >
                    <FaDownload />
                    Pull Problem from GitHub
                    <small>Download latest solution for "{selectedProblem.title}"</small>
                  </button>
                </div>
              )}

              <div className="sync-tips">
                <h4>Tips</h4>
                <ul>
                  <li><strong>Push</strong> uploads your current problem solution to GitHub</li>
                  <li><strong>Pull</strong> downloads the latest solution from GitHub</li>
                  <li>Your code is stored in <code>solvedProblems/Problem Name/</code> directory</li>
                  <li>Each problem has its own folder with multiple solution files</li>
                  <li>Changes are automatically saved to local storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDiffPreview && diffData && (
        <div className="diff-modal-overlay">
          <div className="diff-modal">
            <DiffPreview
              diff={diffData}
              onConfirm={confirmPush}
              onCancel={() => setShowDiffPreview(false)}
              isLoading={syncStatus === 'pushing'}
            />
          </div>
        </div>
      )}

      <style>{`
        .github-sync {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .sync-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 12px;
        }

        .github-icon {
          color: #24292e;
          background: white;
          border-radius: 4px;
          padding: 4px;
        }

        .repo-name {
          font-family: monospace;
          opacity: 0.8;
        }

        .problem-name {
          font-family: monospace;
          font-size: 11px;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stored-indicator {
          color: #22c55e;
          font-size: 8px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .sync-actions {
          display: flex;
          gap: 4px;
        }

        .sync-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          color: white;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sync-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .sync-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .push-btn:hover:not(:disabled) {
          background: rgba(34, 197, 94, 0.8);
        }

        .pull-btn:hover:not(:disabled) {
          background: rgba(59, 130, 246, 0.8);
        }

        .info-btn:hover:not(:disabled) {
          background: rgba(242, 92, 92, 0.8);
        }

        .sync-message {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          margin-top: 8px;
          animation: slideIn 0.3s ease;
        }

        .sync-message.success {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .sync-message.error {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .sync-message.pushing,
        .sync-message.pulling {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .message-icon {
          font-size: 12px;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sync-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .sync-modal {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h3 {
          margin: 0;
          color: #333;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          background: #f3f4f6;
        }

        .modal-content {
          padding: 20px;
        }

        .repo-info {
          margin-bottom: 24px;
        }

        .repo-info h4 {
          margin: 0 0 12px 0;
          color: #333;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .info-item a {
          color: #3b82f6;
          text-decoration: none;
          font-family: monospace;
          font-size: 12px;
        }

        .info-item a:hover {
          text-decoration: underline;
        }

        .has-local {
          color: #22c55e;
          font-weight: 500;
        }

        .no-local {
          color: #ef4444;
          font-style: italic;
        }

        .sync-actions-modal {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .modal-sync-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .modal-sync-btn:hover:not(:disabled) {
          border-color: #3b82f6;
          background: #f8faff;
        }

        .modal-sync-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .push-modal-btn:hover:not(:disabled) {
          border-color: #22c55e;
          background: #f0fdf4;
        }

        .pull-modal-btn:hover:not(:disabled) {
          border-color: #3b82f6;
          background: #f0f9ff;
        }

        .modal-sync-btn small {
          display: block;
          color: #666;
          font-size: 12px;
          margin-top: 4px;
        }

        .sync-tips h4 {
          margin: 0 0 12px 0;
          color: #333;
        }

        .sync-tips ul {
          margin: 0;
          padding-left: 20px;
        }

        .sync-tips li {
          margin-bottom: 8px;
          color: #666;
          font-size: 14px;
        }

        .sync-tips code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
        }

        .diff-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          padding: 20px;
        }

        .diff-modal {
          width: 100%;
          max-width: 90vw;
          max-height: 90vh;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
