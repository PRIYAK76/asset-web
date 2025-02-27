import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { FaLaptop, FaUser, FaTicket } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const username = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.href = "/Login";
    alert("Logged out successfully!");
  };

  return (
    <div>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="sidebar bg-cyan text-white d-flex flex-column"
          style={{
            width: "250px",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            padding: "10px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <div className="text-center mb-4">
            <h4 className="text-blue">Asset Management</h4>
          </div>

          {/* Navigation Links */}
          <ul className="nav flex-column flex-grow-1">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-dark">
                <IoHomeOutline className="mb-1" />
                Home
              </NavLink>
            </li>

            {/* Show Requests and Asset links only when the user is logged in */}
            {username &&
              (username === "admin" ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/Requests" className="nav-link text-dark">
                      <LuFiles className="mb-1" />
                      Requests
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Assets" className="nav-link text-dark">
                      <FaLaptop className="mb-1" />
                      Asset
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Tickets" className="nav-link text-dark">
                      <FaTicket className="mb-1" />
                      Tickets
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink to="/Requests" className="nav-link text-dark">
                    <LuFiles className="mb-1" />
                    Requests
                  </NavLink>
                </li>
              ))}
          </ul>

          {/* Conditionally show logout button when user is logged in */}
          <div className="mt-auto">
            {username ? (
              <div className="d-flex flex-column align-items-start">
                <button
                  className="btn btn-outline-none mb-3 text-dark"
                  id="logoutButton"
                >
                  Hello, <FaUser className="mb-1" /> {username}
                </button>
                <button
                  className="btn btn-outline-dark w-100"
                  id="logoutButton"
                  onClick={handleLogout}
                >
                  <i className="fa fa-user me-2"></i>Logout
                </button>
              </div>
            ) : (
              <NavLink to="/Login">
                <button className="btn btn-outline-dark w-100" id="loginButton">
                  <i className="fa fa-user me-2"></i>Login
                </button>
              </NavLink>
            )}
          </div>
        </div>

        {/* Main content area */}
        <div
          className="main-content"
          style={{
            marginLeft: "230px", // To leave space for the sidebar
            padding: "20px",
            width: "100%",
          }}
        >
          {/* Your main content will go here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;