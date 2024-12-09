import "./Welcome.scss";
import Profile from "../../components/Profile/Profile";
export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-text-container">
        <div className="welcome-first">Welcome,</div>
        <div className="welcome-second">Ben Parker</div>
        <div className="welcome-third">Choose what you want to do</div>
      </div>
      <div className="welcome-create-continue-container">
        <div className="welcome-new-project-container">
          <div className="welcome-new-project-text"></div>
        </div>
        <div className="welcome-continue-container">
          <div className="welcome-continue-title"></div>
          <div className="welcome-continue-projects-container">
            <div className="welcome-continue-project-icon"></div>
            <div className="welcome-continue-project-text"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// .welcome-container{
//   .welcome-text-container{
//       .welcome-first{

//       }
//       .welcome-second{

//       }
//       .welcome-third{

//       }
//   }
//   .welcome-create-continue-container{
//       .welcome-new-project-container{
//           .welcome-new-project-text{

//           }
//       }
//       .welcome-continue-container{
//           .welcome-continue-title{

//           }
//           .welcome-continue-projects-container{
//               .welcome-continue-project-icon{

//               }
//               .welcome-continue-project-text{

//               }
//           }
//       }
//   }
// }
