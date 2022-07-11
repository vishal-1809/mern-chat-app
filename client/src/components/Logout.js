import React from "react";
import '../style.scss';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="logout">
        <button>
          <BiPowerOff onClick={handleClick} />
        </button>
      </div>
    </>
  );
};

export default Logout;
