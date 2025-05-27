import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={null}>
    {children}
  </AuthContext.Provider>
);

export default AuthContext;
