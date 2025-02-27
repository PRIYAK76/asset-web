// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component to wrap your app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the logged-in user data
  const [loading, setLoading] = useState(true);

  // Check token expiration on load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const tokenExpiry = JSON.parse(atob(token.split('.')[1])).exp;
      if (Date.now() >= tokenExpiry * 1000) {
        logout(); // If token is expired, logout
      } else {
        const userData = {
          token,
          name: localStorage.getItem('userName'),
          role: localStorage.getItem('userRole'),
        };
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    const { token, name, role } = data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userRole', role);

    const tokenExpiry = JSON.parse(atob(token.split('.')[1])).exp;
    if (Date.now() < tokenExpiry * 1000) {
      setUser({ token, name, role });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
