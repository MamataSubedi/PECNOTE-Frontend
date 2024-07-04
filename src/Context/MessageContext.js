// src/context/MessageContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MessageContext = createContext();

const API = axios.create({ baseURL: "http://localhost:5000" });

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const getMessages = async (id) => {
    try {
      const { data } = await API.get(`/message/${id}`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const addMessage = async (data) => {
    try {
      const response = await API.post("/message/", data);
      setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, getMessages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
