import logoHp from "../../assets/logo HP.svg";
import "./Login.scss";
import logoPucrs from "../../assets/logopucrs.png";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordVision = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="login-container">
        <div className="login-left-side">
          <div className="login-logos-container">
            <img src={logoHp} alt="logoHp" className="login-hp-logo" />
            <img src={logoPucrs} alt="logoPucrs" className="login-pucrs-logo" />
          </div>
        </div>
        <div className="login-right-side">
          <div className="login-right-title-container">
            <div className="login-right-title-first">Welcome to</div>
            <div className="login-right-title-second">Prompto</div>
          </div>
          <div className="login-right-email-password-container">
            <div className="login-right-email-password-container-individual">
              <label
                className="login-right-email-password-title"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className="login-right-email-password-field"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-right-email-password-container-individual">
              <label
                className="login-right-email-password-title"
                htmlFor="password"
              >
                Password
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  className="login-right-email-password-field"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && navigate("/documents")}
                />
                <button
                  type="button"
                  className="icon-button-no-focus"
                  onClick={handlePasswordVision}
                >
                  {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
            </div>
          </div>
          <Link to="/chat">
            <Button type="tertiary" size="small">
              Enter
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
