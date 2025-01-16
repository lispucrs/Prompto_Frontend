import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";
import Profile from "../../components/Profile/Profile";
import "./Documents.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiGrid41 } from "react-icons/ci";
import { GrHp } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { GoDownload, GoTrash } from "react-icons/go";
import { FetchUserCompleteProjects } from "../../services/fetchUserProjectsDone"; // Importa a classe
import { useEffect, useState } from "react";
import { FaCloud, FaRobot } from "react-icons/fa";
import { IoHardwareChipOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DownloadPDF } from "../../services/downloadService";

interface Project {
  icon: React.ElementType;
  name: string;
  createdDate: Date;
  project_id: number;
}
const ICON_MAP: { [key: string]: React.ElementType } = {
  FaRobot: FaRobot,
  IoHardwareChipOutline: IoHardwareChipOutline,
  FaCloud: FaCloud,
  GrHp: GrHp,
};
export default function Documents() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const userId = Number(localStorage.getItem("userId"));
  console.log(userId);
  const handleProjectSelect = (projectId: number) => {
    navigate("/chat", {
      state: { selectedProject: { id: projectId } },
    });
  };
  useEffect(() => {
    const fetchCompleteProjects = async () => {
      try {
        const data = await FetchUserCompleteProjects.getCompleteProjects(
          userId
        );

        const formattedProjects = data.map((project: any) => ({
          icon: ICON_MAP[project.icon] || GrHp,
          name: project.name || "Unnamed Project",
          project_id: project.project_id, 
          createdDate: project.created_at ? new Date(project.created_at) : null,
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos completos:", error);
      }
    };

    fetchCompleteProjects();
  }, [userId]);
  const handleDownload = async (projectId: number) => {
    try {
      console.log("Iniciando download do PDF para o projeto:", projectId);
      const pdfBlob = await DownloadPDF.downloadPDF(projectId);

      // Cria uma URL temporária para o blob
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `project_${projectId}.pdf`; // nome do arquivo
      document.body.appendChild(link);
      link.click();

      // Limpa o link temporário
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro no download do PDF:", error);
    }
  };
  return (
    <>
      <SideBarHeader onProjectSelect={handleProjectSelect} />
      <div className="documents-container">
        <div className="documents-title">Finished Projects</div>
        <div className="documents-subtitle">
          Here’s a list of your finished projects
        </div>
        <div className="documents-items-container">
          <div className="documents-filters-container">
            <RxHamburgerMenu
              size={26}
              className="documents-filter-list"
            ></RxHamburgerMenu>
            <CiGrid41 size={26} className="documents-filter-grid"></CiGrid41>
          </div>
          <div className="documents-list-container">
            {projects.map((doc, index) => (
              <div key={index} className="documents-document-container">
                <div className="documents-document-left-side">
                  <doc.icon size={45} className="documents-document-icon" />
                  <div className="documents-document-name">{doc.name}</div>
                </div>
                <div className="documents-document-right-side">
                  <div className="documents-document-created-date">
                    {doc.createdDate
                      ? doc.createdDate.toLocaleDateString()
                      : "No Date Provided"}
                  </div>
                  <div className="documents-document-buts">
                    <GoDownload size={26} className="documents-document-dots"                       onClick={() => handleDownload(doc.project_id)} />
                    
                    <GoTrash size={26} className="documents-document-trash" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Profile />
    </>
  );
}
