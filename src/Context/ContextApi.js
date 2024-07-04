// src/Context/ContextApi.js
import React, { useState, useEffect, useContext, createContext } from "react";
//import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: {
      fullName: "",
      email: "",
      following:"",
      follower:""
    },
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
      console.log(parseData);
    }
  }, []);

  

  return (
    <AuthContext.Provider value={{ auth, setAuth,
    // getUser 
     }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // return context;
  const { auth, setAuth } = context;
  return [auth, setAuth]; 
};
