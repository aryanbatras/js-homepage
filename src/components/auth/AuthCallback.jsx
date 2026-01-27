import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GitHubService } from '../../services/githubService';
import { GitHubProblemService } from '../../services/githubProblemService';
import { CONFIG_FILES } from '../../constants/code-screen/fileDefaults';
import styles from './AuthCallback.module.sass';

export default function AuthCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('processing');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    console.log('🔍 AuthCallback mounted, current URL:', window.location.href);
    console.log('🔍 AuthCallback - environment check - DEV:', import.meta.env.DEV, 'MODE:', import.meta.env.MODE);
    
    const handleCallback = async () => {
      try {
        console.log('🔍 Starting auth callback...');
        setStep('processing');
        
        const isTesting = import.meta.env.DEV; 
        console.log('🔍 Environment check - DEV:', isTesting, 'MODE:', import.meta.env.MODE);
        
        if (isTesting) {
          console.log('🔍 Development mode - using mock data');
          const mockToken = 'mock-github-token-for-testing';
          const mockUserData = {
            id: 12345,
            login: 'GuestUser',
            name: 'Guest User',
            email: 'guest@example.com',
            avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
            isGuest: true,
          };
          
          setStep('creating_repo');
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          setStep('finalizing');
          login(mockToken, mockUserData);
          
          setTimeout(() => {
            console.log('🔍 Development mode - navigating to dashboard');
            navigate('/dashboard');
          }, 6000);
          return;
        }
        
        console.log('🔍 Production mode - checking URL parameters');
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userDataStr = urlParams.get('user_data');
        
        console.log('🔍 URL params - token exists:', !!token, 'user_data exists:', !!userDataStr);
        console.log('🔍 Full URL params:', Object.fromEntries(urlParams.entries()));
        
        if (!token || !userDataStr) {
          console.log('🔍 Missing token or user data - throwing error');
          console.log('🔍 This might be due to GitHub OAuth flow not working in production');
          
          // Fallback to guest mode in production when OAuth fails
          console.log('🔍 Falling back to guest mode due to OAuth failure');
          const fallbackGuestData = {
            id: 'guest-fallback-' + Date.now(),
            login: 'guest-user',
            name: 'Guest User',
            email: 'guest@example.com',
            avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
            isGuest: true,
          };
          
          const fallbackToken = 'guest-token-fallback-' + Date.now();
          
          setStep('finalizing');
          login(fallbackToken, fallbackGuestData);
          
          setTimeout(() => {
            console.log('🔍 Fallback mode - navigating to dashboard');
            navigate('/dashboard');
          }, 2000);
          return;
        }

        // Parse user data from backend
        const userData = JSON.parse(decodeURIComponent(userDataStr));
        console.log('🔍 Parsed user data:', userData);

        setStep('creating_repo');
        
        // Create GitHub service and repository
        console.log('🔍 Creating GitHub service and repository...');
        const githubService = new GitHubService(token);
        const repo = await githubService.createPublicRepository(userData.login);
        console.log('🔍 Repository created:', repo);

        // Save repository info to user data
        userData.repository = repo.full_name;
        userData.repository_url = repo.html_url;

        setStep('creating_config');
        
        // Create configuration files
        console.log('🔍 Creating configuration files...');
        const problemService = new GitHubProblemService(token);
        await problemService.saveConfigurationFiles(userData.login, userData.login, CONFIG_FILES);
        console.log('🔍 Configuration files created');

        setStep('finalizing');
        login(token, userData);
        console.log('🔍 User logged in successfully');
        
        // Redirect to dashboard
        setTimeout(() => {
          console.log('🔍 Production mode - navigating to dashboard');
          navigate('/dashboard');
        }, 6000);
        
      } catch (err) {
        console.error('🔍 Auth callback error:', err);
        console.error('🔍 Error details:', err.message, err.stack);
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
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.spinner}></div>
          <h2 className={styles.title}>Authenticating with GitHub</h2>
          
          <div className={styles.steps}>
            <div className={`${styles.step} ${step === 'processing' ? styles.active : step === 'creating_repo' || step === 'finalizing' ? styles.completed : ''}`}>
              {/* <div className={styles.stepIcon}>
                {step === 'processing' ? '⏳' : step === 'creating_repo' || step === 'finalizing' ? '✅' : '⭕'}
              </div> */}
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>Processing authentication</strong>
                <p className={styles.stepDescription}>Verifying your GitHub credentials</p>
              </div>
            </div>
            
            <div className={`${styles.step} ${step === 'creating_repo' ? styles.active : step === 'creating_config' || step === 'finalizing' ? styles.completed : ''}`}>
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>Creating learning repository</strong>
                <p className={styles.stepDescription}>Setting up your personal workspace</p>
              </div>
            </div>
            
            <div className={`${styles.step} ${step === 'creating_config' ? styles.active : step === 'finalizing' ? styles.completed : ''}`}>
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>Setting up configuration files</strong>
                <p className={styles.stepDescription}>Creating your custom snippets and settings</p>
              </div>
            </div>
            
            <div className={`${styles.step} ${step === 'finalizing' ? styles.active : ''}`}>
              {/* <div className={styles.stepIcon}>
                {step === 'finalizing' ? '⏳' : '⭕'}
              </div> */}
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>Finalizing setup</strong>
                <p className={styles.stepDescription}>Almost done!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={`${styles.card} ${styles.errorCard}`}>
          {/* <div className={styles.errorIcon}>❌</div> */}
          <h2 className={`${styles.title} ${styles.errorTitle}`}>Authentication Failed</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={() => navigate('/login')} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}