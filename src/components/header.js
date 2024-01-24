import React, { useState } from "react";
import userIcon from "../assets/img/userIcon.png";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="p-4 flex justify-end items-center">
      <div className="relative">
        <button
          className="flex items-center focus:outline-none text-blue-500"
          onClick={toggleDropdown}
        >
          <img src={userIcon} width={35} className="mr-2" alt="NACD" />
          <span className="mr-2">Hemant</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-5 w-5 transition-transform duration-300 transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-0 mt-12 bg-white p-2 rounded shadow-md border border-blue-500">
            <a
              href="#"
              className="block py-2 px-4 hover:bg-blue-500 hover:text-white"
            >
              My Profile
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-blue-500 hover:text-white"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
