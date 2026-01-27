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

  useEffect(() => {
    const savedToken = Cookies.get('github_token');
    const savedUser = Cookies.get('github_user');
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        
        // Only restore if it's not a guest user
        if (!userData.isGuest) {
          setToken(savedToken);
          setUser(userData);
        } else {
          // Clean up any guest data that might be in cookies
          Cookies.remove('github_token');
          Cookies.remove('github_user');
        }
      } catch (error) {
        Cookies.remove('github_token');
        Cookies.remove('github_user');
      }
    } else {
    }
    setIsLoading(false);
  }, []);

  const login = (githubToken, userData) => {
    
    setToken(githubToken);
    setUser(userData);
    
    // Only save to cookies for real GitHub users, not guest users
    if (!userData.isGuest) {
      Cookies.set('github_token', githubToken, { expires: 30 });
      Cookies.set('github_user', JSON.stringify(userData), { expires: 30 });
    } else {
    }
    
    setTimeout(() => {
    }, 100);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove('github_token');
    Cookies.remove('github_user');
  };

  useEffect(() => {
  }, [user, token, isLoading]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}