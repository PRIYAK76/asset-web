import React, { useState, useEffect } from "react";
import { postData } from "../../api/api";
import { Layout } from "../../components";

const CreateTicket = () => {
  const [assetNumber, setAssetNumber] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("Low");  // Default priority set to "Low"
  const [username, setUsername] = useState("");
  const user = localStorage.getItem("userName");
  const tickDate = new Date().toISOString().split("T")[0];

  // Generate GUID function
  const generateGuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      id: generateGuid(),
      assetNumber: assetNumber,
      reason: reason,
      priority: priority,  // Include the priority in the request data
      userID: user, // Using username as userID
      ticketDate: tickDate,
      issueStatus:"Pending"
    };

    console.log("Form data being sent:", requestData);
    try {
      const response = await postData(`Ticket`, requestData);

      if (response) {
        alert("Ticket created successfully!");
        window.location.href = "/Tickets"; // Redirect to the Request page after submission
      } else {
        throw new Error("Failed to submit the ticket");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Failed to submit the ticket. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>Create Ticket</h3>
      </div>
      <form
        id="createTicketForm"
        className="mx-auto w-50"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="assetNumber" className="fw-bold my-3">
              Asset Number
            </label>
            <input
              type="text"
              className="form-control"
              id="assetNumber"
              value={assetNumber}
              onChange={(e) => setAssetNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason" className="fw-bold my-3">
              Reason
            </label>
            <textarea
              className="form-control"
              id="reason"
              style={{ height: "150px" }}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Priority Field */}
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              className="form-control"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}  // Update priority state
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-dark w-100 my-3">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default CreateTicket;
