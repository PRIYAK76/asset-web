import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { FaLaptop, FaTicket, FaUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const username = localStorage.getItem("userName"); // Check if the user is logged in

  const handleLogout = () => {
    // Clear user info from localStorage and perform any additional logout actions
    localStorage.removeItem("userName");
    window.location.href = "/Login";
    alert("Logged out succesfully!"); // Redirect to login page
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-cyan border-bottom box-shadow mb-3">
        <div className="container-fluid">
          <a className="navbar-brand text-blue" href="/">
            Asset Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1" id="navItems">
              <li className="nav-item">
                <NavLink to="/">
                  <a className="nav-link">
                    <IoHomeOutline className="mb-1" />
                    Home
                  </a>
                </NavLink>
              </li>

              {/* Show Requests and Asset links only when the user is logged in */}
              {username &&
                (username == "admin" ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/Requests">
                        <a className="nav-link">
                          <LuFiles className="mb-1" />
                          Requests
                        </a>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Assets">
                        <a className="nav-link">
                          <FaLaptop className="mb-1" />
                          Asset
                        </a>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Tickets">
                        <a className="nav-link">
                          <FaTicket className="mb-1" />
                          Tickets
                        </a>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to="/Requests">
                        <a className="nav-link">
                          <LuFiles className="mb-1" />
                          Requests
                        </a>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Tickets">
                        <a className="nav-link">
                          <FaTicket className="mb-1" />
                          Tickets
                        </a>
                      </NavLink>
                    </li>
                  </>
                ))}
            </ul>

            {/* Conditionally show logout button when user is logged in */}
            <li className="nav-item d-flex" id="navBtns">
              {username ? (
                <>
                  <button
                    className="btn btn-outline-none me-2"
                    id="logoutButton">
                     Hello, <FaUser className="mb-1"/>{username}
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    id="logoutButton"
                    onClick={handleLogout}
                  >
                    <i className="fa fa-user me-2"></i>Logout
                  </button>
                </>
              ) : (
                <NavLink to="/Login">
                  <button className="btn btn-outline-dark" id="loginButton">
                    <i className="fa fa-user me-2"></i>Login
                  </button>
                </NavLink>
              )}
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
