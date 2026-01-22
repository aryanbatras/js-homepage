import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GitHubService } from '../../services/githubService';
import './AuthCallback.css';

export default function AuthCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('processing');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStep('processing');
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userDataStr = urlParams.get('user_data');
        
        if (!token || !userDataStr) {
          throw new Error('Missing token or user data from backend');
        }

        // Parse user data from backend
        const userData = JSON.parse(decodeURIComponent(userDataStr));

        setStep('creating_repo');
        
        // Create GitHub service and repository
        const githubService = new GitHubService(token);
        const repo = await githubService.createPublicRepository(userData.login);

        // Save repository info to user data
        userData.repository = repo.full_name;
        userData.repository_url = repo.html_url;

        setStep('finalizing');
        login(token, userData);
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err.message);
        setStep('error');
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [login, navigate]);

  if (isLoading) {
    return (
      <div className="auth-callback-container">
        <div className="callback-card">
          <div className="loading-spinner"></div>
          <h2>Authenticating with GitHub</h2>
          
          <div className="steps">
            <div className={`step ${step === 'processing' ? 'active' : step === 'creating_repo' || step === 'finalizing' ? 'completed' : ''}`}>
              <div className="step-icon">
                {step === 'processing' ? '⏳' : step === 'creating_repo' || step === 'finalizing' ? '✅' : '⭕'}
              </div>
              <div className="step-text">
                <strong>Processing authentication</strong>
                <p>Verifying your GitHub credentials</p>
              </div>
            </div>
            
            <div className={`step ${step === 'creating_repo' ? 'active' : step === 'finalizing' ? 'completed' : ''}`}>
              <div className="step-icon">
                {step === 'creating_repo' ? '⏳' : step === 'finalizing' ? '✅' : '⭕'}
              </div>
              <div className="step-text">
                <strong>Creating learning repository</strong>
                <p>Setting up your personal workspace</p>
              </div>
            </div>
            
            <div className={`step ${step === 'finalizing' ? 'active' : ''}`}>
              <div className="step-icon">
                {step === 'finalizing' ? '⏳' : '⭕'}
              </div>
              <div className="step-text">
                <strong>Finalizing setup</strong>
                <p>Almost done!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-callback-container">
        <div className="callback-card error">
          <div className="error-icon">❌</div>
          <h2>Authentication Failed</h2>
          <p className="error-message">{error}</p>
          <button onClick={() => navigate('/login')} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}