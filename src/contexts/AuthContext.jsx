import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { initializeUserProfile } from '../services/userProfile';

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

  const login = async (githubToken, userData) => {
    setToken(githubToken);
    setUser(userData);
    
    // Initialize user profile in Firestore for real GitHub users
    if (!userData.isGuest) {
      try {
        await initializeUserProfile(userData);
      } catch (error) {
        console.error('Error initializing user profile:', error);
      }
      
      Cookies.set('github_token', githubToken, { expires: 30 });
      Cookies.set('github_user', JSON.stringify(userData), { expires: 30 });
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