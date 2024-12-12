import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";
import Profile from "../../components/Profile/Profile";
import "./Documents.scss";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Documents() {
  const mockDocuments = [
    { icon: "ben@mail.com", name: "1234", createdDate: "ben@mail.com" },
  ];
  return (
    <>
      <SideBarHeader />
      <div className="documents-container">
        <div className="documents-title">Documents</div>
        <div className="documents-filters-container">
          <div className="documents-filter-list">
            <RxHamburgerMenu />
          </div>
          <div className="documents-filter-grid"></div>
        </div>
        <div className=".documents-list-container">
          <div className="documents-document-container">
            <div className="documents-document-left-side">
              <div className="documents-document-icon"></div>
              <div className="documents-document-name">Lottus</div>
            </div>
            <div className="documents-document-right-side">
              <div className="documents-document-created-date">
                created Sep 24, 2024
              </div>
              <div className="documents-document-dots">...</div>
            </div>
          </div>
        </div>
      </div>
      <Profile />
    </>
  );
}
