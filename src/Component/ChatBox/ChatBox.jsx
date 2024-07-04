import React, { useEffect, useState, useRef } from "react";
import { useMessage } from "../../Context/MessageContext";
import { useAuth } from "../../Context/ContextApi";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [getUser] = useAuth();
  const { messages, getMessages, addMessage, setMessages } = useMessage();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const fetchUserData = async () => {
      const userData = await getUser(userId);
      setUserData(userData);
    };

    if (chat) fetchUserData();
  }, [chat, currentUser, getUser]);

  // fetch messages
  useEffect(() => {
    if (chat) getMessages(chat._id);
  }, [chat, getMessages]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!chat) return;
    
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat?._id) {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage, chat?._id, setMessages]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          {/* chat-header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER +
                        "defaultProfile.png"
                  }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          {/* chat-body */}
          <div className="chat-body">
            {messages.map((message) => (
              <div
                ref={scroll}
                key={message._id}
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>{" "}
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          {/* chat-sender */}
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
            <input
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
              ref={imageRef}
            />
          </div>
        </>
      )
       : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
         </span>
       )
      }
    </div>
  );
};

export default ChatBox;
