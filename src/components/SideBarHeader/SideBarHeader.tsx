//import { IconButton, InputAdornment, TextField } from "@mui/material";
import "./SideBarHeader.scss";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { LuClipboardList } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";
import Logo from "../Logo/Logo";
import { FaRobot } from "react-icons/fa";
import { IoHardwareChipOutline } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import { GrHp } from "react-icons/gr";
import { SiHp } from "react-icons/si";
import { FaPython } from "react-icons/fa";

// interface SideBarHeaderProps {
//   onInstructionChange: (instruction: number) => void;
// }
interface Etapa {
  idEtapa: number;
  nomeEtapa: string;
  informacao: string;
}

interface Project {
  id: number;
  nome: string;
  idEtapaParada: number;
  etapas: { [key: number]: Etapa };
  caminho: string;
  icone: React.ElementType;
}
export default function SideBarHeader() {
  // const changeInstruction = (instructionKey: number) => {
  //   onInstructionChange(instructionKey);
  // };
  // const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  // const [modalOpen, setModalOpen] = useState(false);

  // const toggleModal = () => {
  //   setModalOpen((prev) => {
  //     const newState = !prev;
  //     if (onModalStateChange) onModalStateChange(newState);
  //     return newState;
  //   });
  // };

  // const toggleSidebar = () => {
  //   setIsSidebarVisible(!isSidebarVisible);
  // };
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const projects: Project[] = [
    {
      id: 1,
      nome: "Delfos",
      idEtapaParada: 2,
      etapas: {
        1: {
          idEtapa: 1,
          nomeEtapa: "Create Project",
          informacao: "Início do projeto",
        },
        2: {
          idEtapa: 2,
          nomeEtapa: "Assemble Team",
          informacao: "Planejamento concluído",
        },
      },
      caminho: "/caminho/delfos",
      icone: FaRobot,
    },
    {
      id: 2,
      nome: "Nautilus",
      idEtapaParada: 1,
      etapas: {
        1: {
          idEtapa: 1,
          nomeEtapa: "Create Project",
          informacao: "Análise de viabilidade",
        },
      },
      caminho: "/caminho/nautilus",
      icone: IoHardwareChipOutline,
    },
    {
      id: 3,
      nome: "Impettus",
      idEtapaParada: 3,
      etapas: {
        1: {
          idEtapa: 1,
          nomeEtapa: "Create Project",
          informacao: "Proposta inicial",
        },
        2: {
          idEtapa: 2,
          nomeEtapa: "Assemble Team",
          informacao: "Planejamento estratégico",
        },
        3: {
          idEtapa: 3,
          nomeEtapa: "Define Requirements",
          informacao: "Execução fase 1",
        },
      },
      caminho: "/caminho/impettus",
      icone: FaCloud,
    },
    {
      id: 4,
      nome: "Lottus",
      idEtapaParada: 2,
      etapas: {
        1: {
          idEtapa: 1,
          nomeEtapa: "Create Project",
          informacao: "Kick-off",
        },
        2: {
          idEtapa: 2,
          nomeEtapa: "Assemble Team",
          informacao: "Definição de escopo",
        },
      },
      caminho: "/caminho/lottus",
      icone: GrHp,
    },
  ];

  const toggleProject = (projectName: string) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
  };
  return (
    <>
      <div className="sidebarheader-container">
        <div className="sidebarheader-line-logo-hide">
          <div className="sidebarheader-logo">Prompto</div>
          {/* {isSidebarVisible ? (
            <HiOutlineChevronDoubleLeft
              size={32}
              cursor="pointer"
              className="sidebarheader-hide"
              onClick={toggleSidebar}
            />
          ) : (
            <HiOutlineChevronDoubleRight
              size={32}
              cursor="pointer"
              className="sidebarheader-hide"
              onClick={toggleSidebar}
            />
          )} */}
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

        {/* <div className="sidebarheader-quickaccess-container">
          <div className="sidebarheader-quickacess-title">Quick Access:</div>
          <div className="sidebarheader-quickacess-new-project-container">
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
        {/* </div> */}
        {/* <div className="sidebarheader-quickacess-new-project-container">
            <LuClipboardList
              className="sidebarheader-quickacess-new-project-icon"
              size={25}
            />
            <div className="sidebarheader-quickacess-new-project-text">
              Define Requirements
            </div>
          </div>
          <div className="sidebarheader-quickacess-new-project-container">
            <RiTeamLine
              className="sidebarheader-quickacess-new-project-icon"
              size={25}
            />
            <div className="sidebarheader-quickacess-new-project-text">
              Assemble Team
            </div>
          </div>
        </div> */}
        <div className="sidebarheader-projects-title">Projects:</div>

        <div className="sidebarheader-projects-container">
          {projects.map((project) => (
            <div key={project.id}>
              <div
                className="sidebarheader-projects-new-project-container"
                onClick={() => toggleProject(project.nome)}
              >
                <project.icone
                  className="sidebarheader-projects-new-project-icon"
                  size={25}
                />
                <div className="sidebarheader-projects-new-project-text">
                  {project.nome}
                </div>
              </div>

              <div
                className={`sidebar-project-options ${
                  expandedProject === project.nome ? "expanded" : ""
                }`}
              >
                {Object.values(project.etapas).map((etapa) => (
                  <div key={etapa.idEtapa} className="sidebar-project-option">
                    {etapa.nomeEtapa}
                  </div>
                ))}
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
