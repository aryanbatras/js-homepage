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
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (githubToken, userData) => {
    setToken(githubToken);
    setUser(userData);
    Cookies.set('github_token', githubToken, { expires: 30 });
    Cookies.set('github_user', JSON.stringify(userData), { expires: 30 });
  };

  const logout = () => {
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