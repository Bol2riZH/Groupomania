import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState('');
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem('auth')));
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
};
