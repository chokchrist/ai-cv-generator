import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      // Decode token payload simply to get email (in a real app, verify expiry)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ email: payload.email });
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
      } catch (e) {
        logout();
      }
    } else {
      logout();
    }
  }, [token]);

  const login = (newToken, email) => {
    setToken(newToken);
    setUser({ email });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
