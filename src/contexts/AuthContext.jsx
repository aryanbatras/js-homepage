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

  useEffect(() => {
    console.log('🔍 AuthContext useEffect - checking cookies...');
    const savedToken = Cookies.get('github_token');
    const savedUser = Cookies.get('github_user');
    
    console.log('🔍 Found saved token:', !!savedToken);
    console.log('🔍 Found saved user:', !!savedUser);
    
    if (savedToken && savedUser) {
      const userData = JSON.parse(savedUser);
      console.log('🔍 Parsed user data:', userData);
      
      // Only restore if it's not a guest user
      if (!userData.isGuest) {
        console.log('🔍 Restoring real user session');
        setToken(savedToken);
        setUser(userData);
      } else {
        console.log('🔍 Found guest user data, cleaning up...');
        // Clean up any guest data that might be in cookies
        Cookies.remove('github_token');
        Cookies.remove('github_user');
      }
    } else {
      console.log('🔍 No saved auth data found');
    }
    setIsLoading(false);
  }, []);

  const login = (githubToken, userData) => {
    console.log('🔍 AuthContext.login called with:', { token: !!githubToken, userData });
    setToken(githubToken);
    setUser(userData);
    
    // Only save to cookies for real GitHub users, not guest users
    if (!userData.isGuest) {
      console.log('🔍 Saving real user to cookies');
      Cookies.set('github_token', githubToken, { expires: 30 });
      Cookies.set('github_user', JSON.stringify(userData), { expires: 30 });
    } else {
      console.log('🔍 Guest user login, not saving to cookies');
    }
  };

  const logout = () => {
    console.log('🔍 AuthContext.logout called');
    setToken(null);
    setUser(null);
    Cookies.remove('github_token');
    Cookies.remove('github_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}