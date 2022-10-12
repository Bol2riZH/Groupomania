import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  id: '',
  token: '',
  role: '',
});

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
