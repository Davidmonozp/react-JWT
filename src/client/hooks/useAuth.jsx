
import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 


  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token'); 
  };

  
  const isAuthenticated = () => {
    return isLoggedIn;
  };

  
  const authContextValue = {
    isLoggedIn,
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
