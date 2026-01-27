import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('🔍 AuthProvider mounted, checking for saved auth data...');
  console.log('🔍 AuthProvider initial state:', { user, token: !!token, isLoading });

  useEffect(() => {
    console.log('🔍 AuthContext useEffect - checking cookies...');
    const savedToken = Cookies.get('github_token');
    const savedUser = Cookies.get('github_user');
    
    console.log('🔍 Found saved token:', !!savedToken);
    console.log('🔍 Found saved user:', !!savedUser);
    console.log('🔍 Raw saved user cookie:', savedUser);
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('🔍 Parsed user data:', userData);
        console.log('🔍 User data type:', typeof userData);
        console.log('🔍 User data keys:', Object.keys(userData || {}));
        
        // Only restore if it's not a guest user
        if (!userData.isGuest) {
          console.log('🔍 Restoring real user session');
          setToken(savedToken);
          setUser(userData);
          console.log('🔍 User state set to:', userData);
        } else {
          console.log('🔍 Found guest user data, cleaning up...');
          // Clean up any guest data that might be in cookies
          Cookies.remove('github_token');
          Cookies.remove('github_user');
        }
      } catch (error) {
        console.error('🔍 Error parsing saved user data:', error);
        console.error('🔍 Invalid user data, cleaning up cookies');
        Cookies.remove('github_token');
        Cookies.remove('github_user');
      }
    } else {
      console.log('🔍 No saved auth data found');
    }
    setIsLoading(false);
  }, []);

  const login = (githubToken, userData) => {
    console.log('🔍 AuthContext.login called with:', { 
      token: !!githubToken, 
      userData,
      userDataType: typeof userData,
      userDataKeys: Object.keys(userData || {})
    });
    
    console.log('🔍 Setting user state to:', userData);
    console.log('🔍 Setting token state to:', !!githubToken);
    
    setToken(githubToken);
    setUser(userData);
    
    // Only save to cookies for real GitHub users, not guest users
    if (!userData.isGuest) {
      console.log('🔍 Saving real user to cookies');
      Cookies.set('github_token', githubToken, { expires: 30 });
      Cookies.set('github_user', JSON.stringify(userData), { expires: 30 });
      console.log('🔍 User saved to cookies');
    } else {
      console.log('🔍 Guest user login, not saving to cookies');
    }
    
    // Verify the state was set
    setTimeout(() => {
      console.log('🔍 Login verification - user state after set:', user);
      console.log('🔍 Login verification - token state after set:', !!token);
    }, 100);
  };

  const logout = () => {
    console.log('🔍 AuthContext.logout called');
    console.log('🔍 Current user before logout:', user);
    setToken(null);
    setUser(null);
    Cookies.remove('github_token');
    Cookies.remove('github_user');
    console.log('🔍 User logged out, state cleared');
  };

  // Add useEffect to monitor state changes
  useEffect(() => {
    console.log('🔍 AuthProvider state changed:', {
      user: user,
      token: !!token,
      isLoading,
      userEmail: user?.email,
      userName: user?.name,
      userId: user?.id,
      isGuest: user?.isGuest
    });
  }, [user, token, isLoading]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}