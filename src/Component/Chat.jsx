// // // src/pages/Chat/Chat.js
// // import React, { useRef, useState, useEffect } from "react";
// // import ChatBox from "../Component/ChatBox/ChatBox";
// // import Conversation from "../Component/Conversation/Conversation";
// // //import LogoSearch from "../../components/LogoSearch/LogoSearch";

// // import "./Chat.css";
// // import { useAuth } from "../Context/ContextApi";
// // import { useChat } from "../Context/ChatContext";
// // import { useMessage } from "../Context/MessageContext";
// // import { io } from "socket.io-client";
// // //import { Link } from 'react-router-dom';

// // const Chat = () => {


// //   const socket = useRef();
// //   const [user ] = useAuth();
// //   const { chats, getUserChats } = useChat();
// //   const { addMessage, messages, getMessages } = useMessage();

// //   const [onlineUsers, setOnlineUsers] = useState([]);
// //   const [currentChat, setCurrentChat] = useState(null);
// //   const [sendMessage, setSendMessage] = useState(null);
// //   const [receivedMessage, setReceivedMessage] = useState(null);

// //   // Get the chat in chat section
// //   useEffect(() => {
// //     if (user) {
// //       getUserChats(user._id);
// //     }
// //   }, [user, getUserChats]);

// //   // Connect to Socket.io
// //   useEffect(() => {
// //     if (user) {
// //       socket.current = io("http://localhost:5000"); 
// //       socket.current.emit("new-user-add", user._id);
// //       socket.current.on("get-users", (users) => {
// //         setOnlineUsers(users);
// //       });
// //     }
// //   }, [user]);

// //   // Send Message to socket server
// //   useEffect(() => {
// //     if (sendMessage !== null) {
// //       socket.current.emit("send-message", sendMessage);
// //       addMessage(sendMessage); // Save to message context
// //     }
// //   }, [sendMessage, addMessage]);

// //   // Get the message from socket server
// //   useEffect(() => {
// //     socket.current.on("recieve-message", (data) => {
// //       setReceivedMessage(data);
// //     });
// //   }, []);

// //   const checkOnlineStatus = (chat) => {
// //     const chatMember = chat.members.find((member) => member !== user._id);
// //     const online = onlineUsers.find((user) => user.userId === chatMember);
// //     return online ? true : false;
// //   };

// //   return (
// //     <div className="Chat">
// //       {/* <Link to="../admin/dashboard/manageUser" className='nav-link text-dark'>Manage Users</Link> */}
// //       {/* Left Side */}
// //       <div className="Left-side-chat">
// //         {/* <LogoSearch /> */}
// //         <div className="Chat-container">
// //           <h2>Chats</h2>
// //           <div className="Chat-list">
// //           {/* <Link to="../admin/dashboard/manageUser" className='nav-link text-dark'>Manage Users</Link> */}
// //             {chats.map((chat) => (
// //               <div
// //                 key={chat._id}
// //                 onClick={() => {
// //                   setCurrentChat(chat);
// //                   getMessages(chat._id); // Load messages for current chat
// //                 }}
// //               > 
// //                 <Conversation
// //                   data={chat}
// //                   currentUser={user._id}
// //                   online={checkOnlineStatus(chat)}
// //                 />
// //               </div>
              
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right Side */}
// //       <div className="Right-side-chat">
// //         <div style={{ width: "20rem", alignSelf: "flex-end" }}>
// //           {/* <NavIcons /> */}
// //         </div>
// //         <ChatBox
// //           chat={currentChat}
// //           currentUser={user._id}
// //           setSendMessage={setSendMessage}
// //           receivedMessage={receivedMessage}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chat;

// import React, { useEffect, useState } from "react";
// import "./Chat.css";
// import { useAuth } from "../Context/ContextApi";
// import { useChat } from "../Context/ChatContext";

// const Chat=()=>{

//   const [auth] = useAuth();
//   const { user } = auth;

//   const chats = useChat(user._id);

//   useEffect(() => {
//     console.log(chats);
//   }, [chats]);



//  // console.log(user);


// // const {user} = useSelector((state)=> state.authReducer.authData);
// // console.log(user);

//   // const [chats, setChats]= useState([])

//   // useEffect(()=>{
//   //   const getChats = async()=>{
//   //     try{
//   //       const{data}= await useChat(user._id)
//   //       setChat(data)
//   //       console.log(data)
//   //     }
//   //     catch(error){
//   //       console.log(error)
//   //     }
//   //   }
//   //   getChats()
//   // }, [user])
  
//   return(
    
//     <div className="Chat">
//       {/* Left Side */}
//       <div className="left-side-chat">
//         <div className="div Chat-container">
//         <h2>Chats</h2>
//         <div className="div Chat-list">
//           Conversation
//         </div>
//         </div>
      

//       </div>
//   {/* Right Side */}
//   <div className="Right-side-chat">
// Right Side 
//   </div>
//       </div>
//   )
// }
//  export default Chat
import React, { useEffect } from "react";
import "./Chat.css";
import { useAuth } from "../Context/ContextApi";
import { useChat } from "../Context/ChatContext";
import Conversation from "./Conversation/Conversation";

const Chat = () => {

  const { user } = useAuth();
  const { chats, getUserChats } = useChat();
  
   useEffect(() => {
    if (user && user.id) {
      getUserChats(user.id);
    }
  }, [user, getUserChats]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="left-side-chat">
        <div className="div Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat)=>(
              <div>
                <Conversation data={chat} currentUser = {user._id}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="Right-side-chat">Right Side</div>
    </div>
  );
};

export default Chat;
