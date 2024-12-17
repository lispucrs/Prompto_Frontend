//import { IconButton, InputAdornment, TextField } from "@mui/material";
import "./SideBarHeader.scss";
import { FaMagnifyingGlass } from "react-icons/fa6";
// import { AiOutlineFileAdd } from "react-icons/ai";
import { useEffect, useState } from "react";
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
import { Link, useLocation } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FetchUserProjects } from "../../services/fetchUserProjectsUnd";

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
  const [projectsUndone, setProjectsUndone] = useState<any[]>([]);
  const userId = Number(localStorage.getItem("userId"));
  const idteste = 2;
  console.log("idteste");

  console.log(idteste);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await FetchUserProjects.getProjects(userId);

        const formattedProjects = data.map((project: any) => ({
          ...project,
          id: project.project_id,
          steps: project.done_steps.map((step: any, index: number) => ({
            idStep: index + 1,
            nameStep: `Step ${index + 1}`,
            info: step[Object.keys(step)[0]] || "No info",
          })),
          idStopedStep: project.next_step,
          icone:
            project.icon === "FaRobot"
              ? FaRobot
              : project.icon === "IoHardwareChipOutline"
              ? IoHardwareChipOutline
              : FaRobot, 
        }));

        setProjectsUndone(formattedProjects);
        console.log(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [userId]);
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
          nameStep: "Project Overview",
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
          nameStep: "Project Overview",
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
          nameStep: "Project Overview",
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
        4: {
          idStep: 4,
          nameStep: "RoadMap",
          info: "Execução fase 1",
        },
        5: {
          idStep: 5,
          nameStep: "User Stories",
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
          nameStep: "Project Overview",
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
    {
      id: 5,
      name: "Grac",
      idStopedStep: 2,
      steps: {
        1: {
          idStep: 1,
          nameStep: "Project Overview",
          info: "Kick-off",
        },
        2: {
          idStep: 2,
          nameStep: "Assemble Team",
          info: "Definição de escopo",
        },
      },
      wayPoint: "/wayPoint/grac",
      icone: GrHp,
    },
    {
      id: 6,
      name: "Jam",
      idStopedStep: 2,
      steps: {
        1: {
          idStep: 1,
          nameStep: "Project Overview",
          info: "Kick-off",
        },
        2: {
          idStep: 2,
          nameStep: "Assemble Team",
          info: "Definição de escopo",
        },
      },
      wayPoint: "/wayPoint/jam",
      icone: GrHp,
    },
  ];
  const toggleProject = (projectName: string) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
    setSelectedProject((prev) => (prev === projectName ? null : projectName));
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
        <div className="sidebarheader-quickaccess-container">
          {/* <div className="sidebarheader-quickacess-title">Quick Access:</div> */}
          <div
            className="sidebarheader-quickacess-new-project-container"
            // onClick={() => changeInstruction(1)}
          >
            <AiOutlineFileAdd
              className="sidebarheader-quickacess-new-project-icon"
              size={25}
            />
            <div className="sidebarheader-quickacess-new-project-text">
              New Project
            </div>
            {/* <button onClick={toggleModal}>
              {modalOpen ? "Close Modal" : "Open Modal"}
            </button> */}
          </div>
          <Link to="/documents">
            <div
              className="sidebarheader-quickacess-new-project-container"
              // onClick={() => changeInstruction(1)}
            >
              <IoDocumentTextOutline
                className="sidebarheader-quickacess-new-project-icon"
                size={25}
              />
              <div className="sidebarheader-quickacess-new-project-text">
                Documents
              </div>
              {/* <button onClick={toggleModal}>
              {modalOpen ? "Close Modal" : "Open Modal"}
            </button> */}
            </div>
          </Link>
        </div>

        {/* <div className="sidebarheader-projects-title">Projects:</div> */}
        <div className="sidebarheader-projects-container">
          {projectsUndone.map((project) => (
            <div
              className={`sidebarheader-projects-new-project-containerSelected ${
                selectedProject === project.name ? "selected" : ""
              }`}
              key={project.id}
            >
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
                    {project.done_steps.map((step: any, index: number) => (
                      <div
                        key={index} // Pode usar o índice ou um identificador único
                        className={`sidebar-project-option ${
                          step.idStep >= project.idStopedStep
                            ? "incomplete"
                            : "complete"
                        }`}
                        style={{
                          cursor:
                            step.idStep >= project.idStopedStep
                              ? "pointer"
                              : "default",
                        }}
                      >
                        {step.stepName || `Step ${index + 1}`}{" "}
                        {/* Ajusta o nome do step */}
                      </div>
                    ))}
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
