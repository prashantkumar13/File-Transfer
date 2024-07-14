import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
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

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const user = {
      username: userData.name,
      id: userData._id,
      email: userData.email,
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
  };

  const logout = () => {
    setUser({
      username: null,
      id: null,
      email: null,
    });
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
