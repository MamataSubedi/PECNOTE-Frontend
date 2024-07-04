import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ChatContext = createContext();

// const API = axios.create({ baseURL: "http://localhost:8000/api/auth" });

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  const getUserChats = async (id) => {
    try {
      const { data } = await fetch(`http://localhost:8000/chat/${id}`);
      console.log('Data received from API:', data); 
      setChats(data);
    } catch (error) {
      console.error("Error fetching user chats:", error);
    }
  };

  return (
    <ChatContext.Provider value={{ chats, getUserChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
