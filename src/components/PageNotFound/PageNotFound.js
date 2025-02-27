import React from "react";
import "./styles.css"; // Make sure to import the CSS
import Layout from "../Layout/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="page-not-found">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <button
          className="btn-home"
          onClick={() => (window.location.href = "/")} // Redirect to the home page
        >
          Go Back to Home
        </button>
      </div>
    </Layout>
  );
};

export default PageNotFound;
