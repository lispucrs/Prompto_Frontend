import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";
import Profile from "../../components/Profile/Profile";
import "./Documents.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiGrid41 } from "react-icons/ci";
import { GrHp } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

export default function Documents() {
  const mockDocuments = [
    { icon: GrHp, name: "Lottus", createdDate: "created Aug 15, 2024" },
    { icon: GrHp, name: "Lottus", createdDate: "created Aug 15, 2024" },
    { icon: GrHp, name: "Lottus", createdDate: "created Aug 15, 2024" },
  ];
  return (
    <>
      <SideBarHeader />
      <div className="documents-container">
        <div className="documents-title">Documents</div>
        <div className="documents-items-container">
          <div className="documents-filters-container">
            <RxHamburgerMenu
              size={26}
              className="documents-filter-list"
            ></RxHamburgerMenu>
            <CiGrid41 size={26} className="documents-filter-grid"></CiGrid41>
          </div>
          <div className="documents-list-container">
            {mockDocuments.map((doc, index) => (
              <div key={index} className="documents-document-container">
                <div className="documents-document-left-side">
                  <doc.icon size={45} className="documents-document-icon" />
                  <div className="documents-document-name">{doc.name}</div>
                </div>
                <div className="documents-document-right-side">
                  <div className="documents-document-created-date">
                    {doc.createdDate}
                  </div>
                  <BsThreeDots
                    size={20}
                    className="documents-document-dots"
                  ></BsThreeDots>
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
