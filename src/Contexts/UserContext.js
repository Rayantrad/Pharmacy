import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("carepharma-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    let role = null;

    if (username === "admin" && password === "123") {
      role = "admin";
    } else if (username === "user" && password === "123") {
      role = "user";
    } else {
      return false; // invalid credentials
    }

    const userData = { username, role };
    setUser(userData);
    localStorage.setItem("carepharma-user", JSON.stringify(userData));
    alert("Login successful");
    return true;
  };

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setUser(null);
      localStorage.removeItem("carepharma-user");
      alert("Logged out successfully");
    }
  };

  const isAuth = !!user;

  return (
    <UserContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};