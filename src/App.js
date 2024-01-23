// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftMenu from "./components/leftmenu";
import UnitLessions from "./screens/Units/UnitLessions/UnitLessions";
import Outcomes from "./screens/Units/Outcomes/Outcomes";

function App() {
  return (
    <div className="flex bg-red-500">
      <LeftMenu />
      <Routes>
        <Route path="/unitlessions" element={<UnitLessions />} />
        <Route path="/outcomes" element={<Outcomes />} />
      </Routes>
    </div>
  );
}

export default App;
