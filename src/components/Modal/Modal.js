import React from "react";

const Modal = ({ show, title, content, onClose, onConfirm }) => {
  return (
    <>
      {/* Backdrop (only visible when the modal is shown) */}
      <div
        className={`modal-backdrop ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        onClick={onClose} // Close modal when backdrop is clicked
      ></div>

      {/* Modal */}
      <div
        className={`modal fade ${show ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: show ? "block" : "none" }}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-coral">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body bg-lightGrey">{content}</div>
            <div className="modal-footer bg-coral">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={onConfirm}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
