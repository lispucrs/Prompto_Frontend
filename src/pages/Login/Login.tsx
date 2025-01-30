import logoHp from "../../assets/logo HP.svg";
import "./Login.scss";
import logoPucrs from "../../assets/logopucrs.png";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

 

  const handlePasswordVision = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      const userId = await login(email, password);

      if (userId != "") {
        // Armazena o estado de login e o ID do usuário no localStorage
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);

        // Redireciona para a página de boas-vindas
        navigate("/welcome");
      } else {
        // Se o ID for vazio, as credenciais estão incorretas
      }
    } catch (error) {
      setError(
        "Invalid email or password."

        // error.message || "Erro ao verificar credenciais. Tente novamente."
      );

      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

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
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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
          {error && (
            <p className={`error-message ${shake ? "shake" : ""}`}>{error}</p>
          )}
          <Button type="tertiary" size="small" onClick={handleLogin}>
            Enter
          </Button>
        </div>
      </div>
    </>
  );
}
