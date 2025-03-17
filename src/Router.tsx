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
import Onboarding from "./pages/Onboarding/Onboarding";
export default function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn");
  function PrivateRoute({ children, isLoggedIn }) {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  }

  function PublicRoute({ children, isLoggedIn }) {
    return isLoggedIn ? <Navigate to="/welcome" replace /> : children;
  }
 
  useEffect(() => {
    if (location.pathname === "/landing-page") {
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
  const isDocsPage = location.pathname === "/finished-projects";
  const isOtherPage =
    location.pathname !== "/login" && location.pathname !== "/landing-page";
  return (
    <div className="container">
      <div
        className={`main-container ${isLoginPage ? "no-padding" : ""}  ${
          isOtherPage ? "docs-padding" : ""
        }`}
      >
        <Routes>
          <Route
            path="/landing-page"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Login />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/welcome"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Welcome />
              </PrivateRoute>
            }
          />
          {isLoggedIn && <Route path="/chat" element={<Chat />} />}
          <Route
            path="/finished-projects"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Documents />
              </PrivateRoute>
            }
          />
          {isLoggedIn && <Route path="/faq" element={<Onboarding />} />}

          <Route
            path="*"
            element={
              <Navigate to={isLoggedIn ? "/welcome" : "/landing-page"} replace />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
