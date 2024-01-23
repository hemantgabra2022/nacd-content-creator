// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftMenu from "./components/leftmenu";
import UnitLessions from "./screens/Units/UnitLessions/UnitLessions";
import Outcomes from "./screens/Units/Outcomes/Outcomes";
import LearningRoadmap from "./screens/Units/LearningRoadmap/LearningRoadmap";
import Formative from "./screens/Assessments/Formative/Formative";
import Summative from "./screens/Assessments/Summative/Summative";

function App() {
  return (
    <div className="flex bg-red-500">
      <LeftMenu />
      <Routes>
        <Route path="/unitlessions" element={<UnitLessions />} />
        <Route path="/outcomes" element={<Outcomes />} />
        <Route path="/learningroadmap" element={<LearningRoadmap />} />
        <Route path="/Formative" element={<Formative />} />
        <Route path="/Summative" element={<Summative />} />
      </Routes>
    </div>
  );
}

export default App;
