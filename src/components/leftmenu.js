// src/LeftMenu.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/white_nacd_logo.png";

const LeftMenu = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSecondSubMenu, setShowSecondSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const toggleSecondSubMenu = () => {
    setShowSecondSubMenu(!showSecondSubMenu);
  };

  const isUserLoggedIn = localStorage.getItem('token') != null;
  if(!isUserLoggedIn) {
    return null
  }

  return (
    <div className="bg-[#458dff] text-white w-64 min-h-screen">
      <div className="p-4">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="NACD" width="70%" className="mb-4" />
        </div>
        <ul className="space-y-2">
          <li>
            <div
              onClick={toggleSubMenu}
              className="flex items-center justify-between hover:bg-blue-700 px-4 py-2 rounded transition duration-300 cursor-pointer"
            >
              <span>Units</span>
              <span className="ml-2">{showSubMenu ? "▲" : "▼"}</span>
            </div>
            {showSubMenu && (
              <ul className="pl-6">
                <li>
                  <Link
                    to="/unitlessions"
                    className="block hover:bg-blue-700 px-2 py-1 rounded transition duration-300"
                  >
                    Unit & Lessons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/outcomes"
                    className="block hover:bg-blue-700 px-2 py-1 rounded transition duration-300"
                  >
                    Outcomes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/learningroadmap"
                    className="block hover:bg-blue-700 px-2 py-1 rounded transition duration-300"
                  >
                    Learning Roadmap
                  </Link>
                </li>
                {/* Add more submenu items as needed */}
              </ul>
            )}
          </li>
          <li>
            <div
              onClick={toggleSecondSubMenu}
              className="flex items-center justify-between hover:bg-blue-700 px-4 py-2 rounded transition duration-300 cursor-pointer"
            >
              <span>Assessments</span>
              <span className="ml-2">{showSecondSubMenu ? "▲" : "▼"}</span>
            </div>
            {showSecondSubMenu && (
              <ul className="pl-6">
                <li>
                  <Link
                    to="/Formative"
                    className="block hover:bg-blue-700 px-2 py-1 rounded transition duration-300"
                  >
                    Formative
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Summative"
                    className="block hover:bg-blue-700 px-2 py-1 rounded transition duration-300"
                  >
                    Summative
                  </Link>
                </li>
                {/* Add more submenu items as needed */}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftMenu;
