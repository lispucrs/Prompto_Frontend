import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";
import Profile from "../../components/Profile/Profile";
import "./Documents.scss";
export default function Documents() {
  return (
    <>
      <SideBarHeader />
      <div className="documents-container"></div>
      <Profile />
    </>
  );
}
