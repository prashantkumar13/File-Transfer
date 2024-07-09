import { createContext, useContext, useState } from 'react';
 
// Create the contexta
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: null,
    id: null,
    email: null,
  });

  const login = (userData) => {
    setUser({
      username: userData.name,
      id: userData._id,
      email: userData.email,
    });
  };

  const logout = () => {
    setUser({
      username: null,
      id: null,
      email: null,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
