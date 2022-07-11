import React, { useState, useEffect } from "react";
import "../style.scss";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

const Welcome = ({ currentUser }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  // console.log(currentUser);
  return (
    <>
      <div className="welcome">
        <div className="logt">
          <Logout />
        </div>
        <img src={Robot} alt="Robot" />
        <h1>
          Welcome,
          <span> {username} !</span>
        </h1>
        <p>Please select a chat to start a conversation</p>
      </div>
    </>
  );
};

export default Welcome;
