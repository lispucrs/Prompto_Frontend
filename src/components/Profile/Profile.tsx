import "./Profile.scss";
import ProfilePic from "../../assets/BenParker.svg";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Logo() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
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
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
            className="profile-logout-container"
          >
            <FiLogOut size={22} className="profile-logout-icon" />
            <div  className="profile-logout-text">Log out</div>
          </Link>
      </div>
    </>
  );
}
