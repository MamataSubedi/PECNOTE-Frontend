// src/components/Conversation/Conversation.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/ContextApi";
import { Link } from 'react-router-dom';

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  const [getUser] = useAuth();

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const fetchUserData = async () => {
      const userData = await getUser(userId);
      setUserData(userData);
    };

    fetchUserData();
  }, [data, currentUser, getUser]);

  return (
    <> 
   
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  ); 
};

export default Conversation;
