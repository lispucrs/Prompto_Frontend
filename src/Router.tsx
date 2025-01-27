import Home from "./pages/Home/Home";
import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Documents from "./pages/Documents/Documents";
import Chat from "./pages/Chat/Chat";
import Welcome from "./pages/Welcome/Welcome";
export default function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn");

  // useEffect(() => {
  //   console.log("isLoggedIn");
  //   console.log(isLoggedIn);

  //   if (isLoggedIn) {
  //     navigate("/welcome");
  //   }
  // }, [navigate]);
  useEffect(() => {
    if (location.pathname === "/home") {
      document.body.classList.add("home-page");
      document.body.classList.remove("login-page");
      document.body.classList.remove("documents-page");
    } else if (location.pathname === "/login") {
      document.body.classList.add("login-page");
      document.body.classList.remove("home-page");
      document.body.classList.remove("documents-page");
    } else {
      document.body.classList.add("documents-page");
      document.body.classList.remove("home-page");
      document.body.classList.remove("login-page");
    }
  }, [location]);
  const isLoginPage = location.pathname === "/login";
  const isDocsPage = location.pathname === "/documents";
  const isOtherPage =
    location.pathname !== "/login" && location.pathname !== "/home";
  return (
    <div className="container">
      <div
        className={`main-container ${isLoginPage ? "no-padding" : ""}  ${
          isOtherPage ? "docs-padding" : ""
        }`}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/welcome" element={<Welcome />} />
          {isLoggedIn ? (
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          ) : (
            <Route path="/*" element={<Navigate to="/home" replace />} />
          )}
          {/* {isLoggedIn && (
            <Route path="/*" element={<Navigate to="/welcome" replace />} />
          )} */}
        </Routes>
      </div>
    </div>
  );
}
