import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../assets/loader.gif";
import "../style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com"; // random number after .com/
  // const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, []);


  const setProfilePicture = async () => {
    // console.log(selectedAvatar);
    if (selectedAvatar === -1) {
      toast.error("Please select an Avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      async function funct() { 
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error in setting Avatar, Please try again", toastOptions);
        }
      }
      await funct();
    }
  };

  const generateRandomIntegerInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
          // `${api}/${generateRandomIntegerInRange(100,100000000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="setAvatar">
          <img src={Loader} alt="loader" className="loader" />
        </div>
      ) : (
        <>
          <div className="setAvatar">
            <div className="container">
              <h1>Pick an avatar as your Profile Picture</h1>

              <div className="box">
                <div className="avatars">
                  {avatars.map((avatar, i) => {
                    return (
                      <div
                        key={i}
                        className={`avatar ${selectedAvatar === i ? "selected" : ""
                          }`}
                      >
                        <img
                          src={`data:image/svg+xml;base64,${avatar}`}
                          alt="avatar"
                          key={avatar}
                          onClick={() => setSelectedAvatar(i)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={setProfilePicture} className="submit-btn">
                Set as Profile Picture
              </button>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default SetAvatar;
