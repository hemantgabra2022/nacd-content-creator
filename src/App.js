// src/App.js
import React from "react";
import LeftMenu from "./components/leftmenu";
import RightContent from "./components/rightcontent";

function App() {
  return (
    <div className="flex bg-red-500">
      <LeftMenu />
      <RightContent />
    </div>
  );
}

export default App;
