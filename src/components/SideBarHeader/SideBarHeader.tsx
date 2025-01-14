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
import { sendMessageToNewProjectChat } from "../../services/newChat";
import { useNavigate } from "react-router-dom";
interface SideBarHeaderProps {
  onProjectSelect: (projectId: number) => void;
}
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

export default function SideBarHeader({ onProjectSelect }: SideBarHeaderProps) {
  const steps = [
    { id: 0, name: "Creation Project" },
    { id: 1, name: "Gather Requirements" },
    { id: 2, name: "Assemble Team" },
    { id: 3, name: "RoadMap" },
    { id: 4, name: "User Stories" },
  ];
  const navigate = useNavigate();
  const [projectsUndone, setProjectsUndone] = useState<any[]>([]);
  const userId = Number(localStorage.getItem("userId"));
  const idteste = 2;
  console.log("idteste");
  const handleNewProject = async () => {
    try {
      // // Dados básicos enviados ao backend
      // const userInput = "New Project";

      // // Chamada ao backend usando a função reutilizável
      // const backendResponse = await send(userInput);

      // // Dados do novo projeto retornados pelo backend
      // const newProject = JSON.parse(backendResponse); // Supondo que o backend retorna uma string JSON

      // // Atualizar o estado com o novo projeto
      // setProjectsUndone((prev) => [...prev, newProject]);

      // Navegar para a rota do chat com o novo projeto
      navigate("/chat", {
        state: { selectedProject: { name: "New Project", id: -1 } },
      });
    } catch (error) {
      console.error("Erro ao criar o novo projeto:", error);
      alert("Erro ao criar o novo projeto. Tente novamente.");
    }
  };

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
  console.log("Selected project:", selectedProject);

  const toggleProject = (projectName: string, projectId: number) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
    setSelectedProject((prev) => (prev === projectName ? null : projectName));
    onProjectSelect(projectId);

    navigate("/chat", {
      state: { selectedProject: { name: projectName, id: projectId } },
    });
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
          <div
            className="sidebarheader-quickacess-new-project-container"
            onClick={handleNewProject}
          >
            <AiOutlineFileAdd
              className="sidebarheader-quickacess-new-project-icon"
              size={25}
            />
            <div className="sidebarheader-quickacess-new-project-text">
              New Project
            </div>
          </div>
          <Link to="/documents">
            <div className="sidebarheader-quickacess-new-project-container">
              <IoDocumentTextOutline
                className="sidebarheader-quickacess-new-project-icon"
                size={25}
              />
              <div className="sidebarheader-quickacess-new-project-text">
                Documents
              </div>
            </div>
          </Link>
        </div>

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
                onClick={() => toggleProject(project.name, project.id)}
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
                    {project.done_steps.map((step: any, index: number) => {
                      const stepName = Object.keys(step)[0];

                      return (
                        <div
                          key={index}
                          className={`sidebar-project-option ${
                            index >= project.idStopedStep
                              ? "incomplete"
                              : "complete"
                          }`}
                          // style={{
                          //   cursor:
                          //     index + 1 >= project.idStopedStep
                          //       ? "pointer"
                          //       : "default",
                          // }}
                        >
                          {stepName || `Step ${index}`}{" "}
                        </div>
                      );
                    })}
                    {project.idStopedStep && (
                      <div className="sidebar-project-option incomplete">
                        {steps.find((s) => s.id === project.idStopedStep)
                          ?.name || "Step Name Not Found"}
                      </div>
                    )}
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
