import React from "react";

const Toaster = ({ message, handleAlert }) => {
  return (
    <div>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>{message}</strong>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => handleAlert()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Toaster;
