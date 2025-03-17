import "./Welcome.scss";
import Profile from "../../components/Profile/Profile";
import { useNavigate } from "react-router-dom";
import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";

export default function Welcome() {

  const navigate = useNavigate();
 
  const handleProjectSelect = (projectId: number) => {
    navigate("/chat", {
      state: { selectedProject: { id: projectId } },
    });
  };

  
  return (
    <>
      <SideBarHeader onProjectSelect={handleProjectSelect} />
      <div className="welcome-container">
        <div className="welcome-text-container">
          <div className="welcome-first">Welcome back,</div>
          <div className="welcome-second">Ben Parker</div>
        </div>
      </div>
      <Profile />
    </>
  );
}
