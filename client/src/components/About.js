import React from "react";
import Vishal from "../assets/Vishal.jfif";

const About = () => {
  return (
    <>
      <div className="about">
        <div className="ab">
          <img src={Vishal} alt="Vishal" />
          <h2>Vishal Yadav</h2>
          <p>
            This is the React Chat Application made by Vishal Yadav. Here the
            messages are not word to word encrypted this is just a Full Stack
            Mern Application which uses MongoDB as a Database and socket.io to
            connect the users for realtime chatting
          </p>
          <p>For more queries contact 2001vishaly@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default About;
