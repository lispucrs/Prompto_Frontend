import "./Logo.scss";
import logoHp from "../../assets/logo HP.svg";
import logoPucrs from "../../assets/logopucrs.png";

export default function Logo() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="logos-container" onClick={scrollToTop} style={{ cursor: "pointer" }}>
      <img src={logoHp} alt="hp-logo" className="hp-logo" />
      <img src={logoPucrs} alt="pucrs-logo" className="pucrs-logo" />
    </div>
  );
}
