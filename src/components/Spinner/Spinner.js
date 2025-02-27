import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="spinner-border"
        role="status"
        style={{ width: "8rem", height: "8rem" }}
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
