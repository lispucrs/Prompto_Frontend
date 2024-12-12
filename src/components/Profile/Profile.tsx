import "./Profile.scss";
import ProfilePic from "../../assets/BenParker.svg";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Logo() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const navigate = useNavigate();

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("email"); 
    navigate("/login");
  };
  return (
    <>
      <div
        className="profile-pic-container"
        onClick={toggleTooltip}
        style={{ cursor: "pointer" }}
      >
        <img src={ProfilePic} alt="profilepic" className="profile-pic" />
      </div>
      <div
        className={`profile-baloon-container ${
          isTooltipVisible ? "visible" : ""
        }`}
      >
        <div className="profile-name">Ben Parker</div>
        <div className="profile-email">benparker@hp.com</div>
        <div
          onClick={handleLogout}
          className="profile-logout-container"
          style={{ cursor: "pointer" }}
        >
          <FiLogOut size={22} className="profile-logout-icon" />
          <div className="profile-logout-text">Log out</div>
        </div>
      </div>
    </>
  );
}
