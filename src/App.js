import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LeftMenu from "./components/leftmenu";
import UnitLessions from "./screens/Units/UnitLessions/UnitLessions";
import Outcomes from "./screens/Units/Outcomes/Outcomes";
import LearningRoadmap from "./screens/Units/LearningRoadmap/LearningRoadmap";
import Formative from "./screens/Assessments/Formative/Formative";
import Summative from "./screens/Assessments/Summative/Summative";
import Login from "./screens/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("/");

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setCurrentPage(path);
    navigate(path);
  };

  const handleLogin = () => {
    localStorage.setItem("token", "dummyToken");
    setIsLoggedIn(true);
    navigate('/unitlessions');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    // <div>
    //   <div className="flex bg-red-500">
    //     {currentPage === "/" ? (
    //       <Login />
    //     ) : (
    //       <>
    //         <LeftMenu />
    //         <Routes>
    //           <Route path="/unitlessions" element={<UnitLessions />} />
    //           <Route path="/outcomes" element={<Outcomes />} />
    //           <Route path="/learningroadmap" element={<LearningRoadmap />} />
    //           <Route path="/Formative" element={<Formative />} />
    //           <Route path="/Summative" element={<Summative />} />
    //         </Routes>
    //       </>
    //     )}
    //   </div>
    // </div>
    <div>
      <div className="flex bg-red-500">
      {isLoggedIn && <LeftMenu onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        {isLoggedIn ? (
          <>
            <Route
              path="/unitlessions"
              element={<UnitLessions />}
            />
            <Route path="/outcomes" element={<Outcomes />} />
            <Route path="/learningroadmap" element={<LearningRoadmap />} />
            <Route path="/Formative" element={<Formative />} />
            <Route path="/Summative" element={<Summative />} />
          </>
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/login" />}
          />
        )}
      </Routes>
      </div>
    </div>
  );
}

export default App;
