import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";
import Button from "../../components/Button/Button";
import chatImage from "../../assets/pcwithimage.svg";
import chatImageRotated from "../../assets/Group 72.svg";
import Logo from "../../components/Logo/Logo";
import { FaArrowUp } from "react-icons/fa";
import React, { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="home-container">
        <div className="header-line">
          <nav className="left-side-header-line">
            <Logo />
            <a href="#who-is-prompto">Who is Prompto</a>
            <a href="#initiation-steps">Initiation Steps</a>
          </nav>
          <nav className="right-side-header-line">
            <Link to="/login">
              <Button type="secondary" size="small">
                Log in
              </Button>
            </Link>
          </nav>
        </div>

        <div className="home-title-subtitle-buttons-container">
          <div className="home-title">Prompto</div>
          <div className="home-sub-title">Your personal project assistant</div>
          <div className="home-buttons">
            <Button type="primary" size="small">
              <a href="#initiation-steps" className="button-link">
                Initiation Steps
              </a>
            </Button>
            <Link to="/login">
              <Button type="secondary" size="small">
                Log in
              </Button>
            </Link>
          </div>
        </div>
        <img
          src={chatImage}
          alt="Prompto chat"
          className="prompto-image-chat-home"
        />
        <div className="home-who-is-prompto-container" id="who-is-prompto">
          <div className="home-who-is-prompto-title">Who is Prompto?</div>
          <div className="home-who-is-prompto-first-line">
            Prompto is an assistant that provides assistance for various roles,
            not by generating code, but by offering insights, evaluations, and
            suggesting technologies and actions based on the project objectives
            and the specific needs of each role.
          </div>
          <div className="home-who-is-prompto-second-line">
            For example, for a Technical Program Management: The chatbot will
            aid in decision-making for driving execution and delivery of a
            software feature, solution or product, suggesting technologies,
            tools, and methodologies to support the development, always ensuring
            on-time delivery, scalability and quality
          </div>
        </div>
        <img
          src={chatImageRotated}
          alt="Prompto chat"
          className="prompto-image-chat-rotated-home"
        />
        <div className="home-initiation-stages-container" id="initiation-steps">
          <div className="home-initiation-stages-title">Initiation Steps</div>
          <div className="home-initiation-stages-first">
            Prompto offers a comprehensive project management process divided
            into several key stages to guide users from project initiation to
            user stories. These stages include:
          </div>
          <div className="home-initiation-stages-second">
            <ol className="custom-list">
              <li>
                1. Create Project: In this stage, the user initiates interaction
                with the assistant to create a new project. The user specifies
                whether they already have an existing project for which they
                want to generate requirements or assemble a team, or if they
                wish to create a project from scratch.
              </li>
              <li>
                2. Define Requirements: In this phase, the assistant generates
                project requirements based on the project’s specific needs. This
                step can only be performed after a project has been defined.
                Additionally, users have the option to edit, add, or remove
                requirements as needed.
              </li>
              <li>
                3. Assemble Team: During this stage, the assistant forms a
                project team, outlining the roles and tasks each member will be
                responsible for, based on the requirements established in the
                previous phase.
              </li>
              <li>
                4. Roadmap The roadmap serves as a strategic guide that outlines
                the project's timeline, phases, objectives, milestones,
                deliverables, and team responsibilities. It helps ensure that
                the team and stakeholders have a clear understanding of the
                project's direction and progression.
              </li>
              <li>
                5. User Stories User stories translate the project's
                requirements into actionable, user-centered tasks. They are
                essential for guiding development and ensuring the final product
                meets user needs.
              </li>
            </ol>
          </div>
        </div>
        <div className="home-law-container">
          <div className="home-law-first">
            This [result] was achieved in an project supported by the Brazilian
            Informatics Law (Law nº 8.248 of 1991) and was developed over
            Agreement 001/2015 between Pontifícia Universidade Católica do Rio
            Grande do Sul e a HP Brasil Indústria e Comércio de Equipamentos
            Eletrônicos Ltda.{" "}
          </div>
          <div className="home-law-second">
            Research supported by HP Brasil Indústria e Comércio de Equipamentos
            Eletrônicos Ltda. using financial incentives of IPI refund
            reggarding the Law (Law nº 8.248 of 1991)
          </div>
        </div>
        {showScrollTopButton && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <FaArrowUp size={30} />
          </button>
        )}
      </div>
    </>
  );
}
