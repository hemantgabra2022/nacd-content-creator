import React from "react";
import Header from "../components/header";

const RightContent = ({ children }) => {
  return (
    <div className="flex-1 bg-gray-100">
      <div className="bg-white mx-4 my-3">
        <Header></Header>
      </div>
      {children}
    </div>
  );
};

export default RightContent;
