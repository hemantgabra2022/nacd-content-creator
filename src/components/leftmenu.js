// src/LeftMenu.js
import React, { useState } from "react";

const LeftMenu = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSecondSubMenu, setShowSecondSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const toggleSecondSubMenu = () => {
    setShowSecondSubMenu(!showSecondSubMenu);
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Left Menu</h1>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              onClick={toggleSubMenu}
              className="flex items-center justify-between hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            >
              <span>Units</span>
              <span className="ml-2">{showSubMenu ? "▲" : "▼"}</span>
            </a>
            {showSubMenu && (
              <ul className="pl-6">
                <li>
                  <a
                    href="#"
                    className="block hover:bg-gray-700 px-2 py-1 rounded transition duration-300"
                  >
                    Unit & Lessons
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block hover:bg-gray-700 px-2 py-1 rounded transition duration-300"
                  >
                    Outcomes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block hover:bg-gray-700 px-2 py-1 rounded transition duration-300"
                  >
                    Learning Roadmap
                  </a>
                </li>
                {/* Add more submenu items as needed */}
              </ul>
            )}
          </li>
          <li>
            <a
              href="#"
              onClick={toggleSecondSubMenu}
              className="flex items-center justify-between hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            >
              <span>Assessments</span>
              <span className="ml-2">{showSecondSubMenu ? "▲" : "▼"}</span>
            </a>
            {showSecondSubMenu && (
              <ul className="pl-6">
                <li>
                  <a
                    href="#"
                    className="block hover:bg-gray-700 px-2 py-1 rounded transition duration-300"
                  >
                    Formative
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block hover:bg-gray-700 px-2 py-1 rounded transition duration-300"
                  >
                    Summative
                  </a>
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
