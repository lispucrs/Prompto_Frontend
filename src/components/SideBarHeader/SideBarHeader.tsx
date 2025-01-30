import "./SideBarHeader.scss";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import { FaRobot } from "react-icons/fa";
import { IoHardwareChipOutline } from "react-icons/io5";

import { Link, useLocation } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FetchUserProjects } from "../../services/fetchUserProjectsUnd";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { RiProgress5Line } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import { EventSourceService } from "../../services/eventSourceService";

interface SideBarHeaderProps {
  onProjectSelect: (projectData: {
    projectId: number;
    idStopedStep: number;
  }) => void;
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
  const handleNewProject = async () => {
    try {
      setExpandedProject(null);
      setSelectedProject(null);
      navigate("/chat", {
        state: { selectedProject: { name: "New Project", id: -1 } },
      });
    } catch (error) {
      console.error("Erro ao criar o novo projeto:", error);
      alert("Erro ao criar o novo projeto. Tente novamente.");
    }
  };

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
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [userId]);
  

  useEffect(() => {


    const fetchProjectsAgain = async () => {
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
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };




    // Conecta ao SSE para receber mensagens
    const eventSource = EventSourceService.listenForUpdates(
      (message) => {
        console.log("Mensagem recebida via SSE:", message); 
        fetchProjectsAgain();
      },
      () => {
        console.error("Erro na conexão SSE."); // Imprime erro no console se a conexão falhar
      }
    );

    // Limpa o EventSource ao desmontar o componente
    return () => {
      eventSource.close();
    };
  }, [userId]);
  
  const location = useLocation();
  const { selectedProject: initialSelectedProject } = location.state || {};

  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(
    initialSelectedProject || null
  );

  const toggleProject = (
    projectName: string,
    projectId: number,
    idStopedStep: number
  ) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
    setSelectedProject((prev) => (prev === projectName ? null : projectName));
    onProjectSelect({ projectId, idStopedStep });

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
                Finished Projects
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
                onClick={() =>
                  toggleProject(project.name, project.id, project.idStopedStep)
                }
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
                          <FaCheckCircle size={15} />
                          {stepName || `Step ${index}`}
                        </div>
                      );
                    })}
                    {project.idStopedStep && (
                      <div className="sidebar-project-option incomplete">
                        <RiProgress5Line size={18} />

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
