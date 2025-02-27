import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">{children}</main>
      <footer className="border-top footer text-muted bg-cyan p-3 mt-4">
        <div className="container">
          &copy; 2025 - assetmanagementMVC -{" "}
          <a href="/home/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
