import React, { useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs"; // Install react-icons: npm install react-icons

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Brand</a>
      </div>

      {/* Center To-Do List */}
      <div className="navbar-center hidden lg:flex">
        <a className="btn btn-ghost text-lg">To-Do List</a>
      </div>

      {/* Right side: Dark/Light Toggle and Login */}
      <div className="navbar-end flex items-center">
        {/* Dark/Light Mode Toggle */}
        <button className="btn btn-ghost btn-circle" onClick={toggleDarkMode}>
          {darkMode ? <BsSun className="text-xl" /> : <BsMoon className="text-xl" />}
        </button>

        {/* Login Button */}
        <a className="btn btn-primary ml-4">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
