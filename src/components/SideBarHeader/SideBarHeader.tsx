//import { IconButton, InputAdornment, TextField } from "@mui/material";
import "./SideBarHeader.scss";
import { FaMagnifyingGlass } from "react-icons/fa6";
// import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";
// import Modal from "../Modal/Modal";
// import { LuClipboardList } from "react-icons/lu";
// import { RiTeamLine } from "react-icons/ri";
import Logo from "../Logo/Logo";
import { FaRobot } from "react-icons/fa";
import { IoHardwareChipOutline } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import { GrHp } from "react-icons/gr";
// import { SiHp } from "react-icons/si";
// import { FaPython } from "react-icons/fa";

// interface SideBarHeaderProps {
//   onInstructionChange: (instruction: number) => void;
// }
import { useLocation } from "react-router-dom";

interface Step {
  idStep: number;
  nameStep: string;
  info: string;
}

interface Project {
  id: number;
  name: string;
  idStopedStep: number;
  steps: { [key: number]: Step };
  wayPoint: string;
  icone: React.ElementType;
}

interface User {
  id: number;
  name: string;
  projects: { [key: number]: Project };
}

export default function SideBarHeader() {
  const location = useLocation();
  const { selectedProject: initialSelectedProject } = location.state || {};

  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(
    initialSelectedProject || null
  );

  const projects: Project[] = [
    {
      id: 1,
      name: "Delfos",
      idStopedStep: 2,
      steps: {
        1: {
          idStep: 1,
          nameStep: "Create Project",
          info: "Início do projeto",
        },
        2: {
          idStep: 2,
          nameStep: "Assemble Team",
          info: "Planejamento concluído",
        },
      },
      wayPoint: "/wayPoint/delfos",
      icone: FaRobot,
    },
    {
      id: 2,
      name: "Nautilus",
      idStopedStep: 2,
      steps: {
        1: {
          idStep: 1,
          nameStep: "Create Project",
          info: "Início do projeto",
        },
        2: {
          idStep: 2,
          nameStep: "Assemble Team",
          info: "Planejamento concluído",
        },
      },
      wayPoint: "/wayPoint/nautilus",
      icone: IoHardwareChipOutline,
    },
    {
      id: 3,
      name: "Impettus",
      idStopedStep: 3,
      steps: {
        1: {
          idStep: 1,
          nameStep: "Create Project",
          info: "Proposta inicial",
        },
        2: {
          idStep: 2,
          nameStep: "Assemble Team",
          info: "Planejamento estratégico",
        },
        3: {
          idStep: 3,
          nameStep: "Define Requirements",
          info: "Execução fase 1",
        },
      },
      wayPoint: "/wayPoint/impettus",
      icone: FaCloud,
    },
    {
      id: 4,
      name: "Lottus",
      idStopedStep: 2,
      steps: {
        1: {
          idStep: 1,
          nameStep: "Create Project",
          info: "Kick-off",
        },
        2: {
          idStep: 2,
          nameStep: "Assemble Team",
          info: "Definição de escopo",
        },
      },
      wayPoint: "/wayPoint/lottus",
      icone: GrHp,
    },
  ];
  const toggleProject = (projectName: string) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
    setSelectedProject(projectName);
  };

  return (
    <>
      <div className="sidebarheader-container">
        <div className="sidebarheader-line-logo-hide">
          <div className="sidebarheader-logo">Prompto</div>
        </div>

        <div className="sidebarheader-input-container">
          <input
            type="text"
            id="inputField"
            placeholder="Search Project"
            className="sidebarheader-search"
            onKeyDown={(e) => e.key === "Enter"}
          />
          <FaMagnifyingGlass className="sidebarheader-glass" size={19} />
        </div>

        <div className="sidebarheader-projects-title">Projects:</div>
        <div className="sidebarheader-projects-container">
          {projects.map((project) => (
            <div key={project.id}>
              <div
                className={`sidebarheader-projects-new-project-container ${
                  selectedProject === project.name ? "selected" : ""
                }`}
                onClick={() => toggleProject(project.name)}
              >
                <project.icone
                  className="sidebarheader-projects-new-project-icon"
                  size={25}
                />
                <div className="sidebarheader-projects-new-project-text">
                  {project.name}
                </div>
              </div>

              <div
                className={`sidebar-project-options ${
                  expandedProject === project.name ? "expanded" : ""
                }`}
              >
                {expandedProject === project.name && (
                  <>
                    <div className="sidebar-project-options-title">
                      Done Steps:
                    </div>
                    {Object.values(project.steps)
                      .filter((step) => step.idStep !== project.idStopedStep)
                      .map((step) => (
                        <div
                          key={step.idStep}
                          className={`sidebar-project-option ${
                            step.idStep < project.idStopedStep ? "disabled" : ""
                          }`}
                          style={{
                            pointerEvents:
                              step.idStep < project.idStopedStep
                                ? "none"
                                : "auto",
                            cursor:
                              step.idStep < project.idStopedStep
                                ? "not-allowed"
                                : "default",
                          }}
                        >
                          {step.nameStep}
                        </div>
                      ))}
                    <div className="sidebar-project-options-continue-project">
                      Continue project
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="logosidebar">
          <Logo />
        </div>
      </div>
    </>
  );
}
