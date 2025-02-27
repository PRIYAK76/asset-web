import React, { useState, useEffect } from "react";
import { Layout, Spinner } from "../../components";
import { getData, postData, putData } from "../../api/api"; // Assuming you have an updateTicket API function
import { NavLink } from "react-router-dom";

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({}); // Track selected status for each ticket
  const [statusFilter, setStatusFilter] = useState("All"); // Filter by status
  const [usernameFilter, setUsernameFilter] = useState(""); // Filter by username (for admin only)
  const [priorityFilter, setPriorityFilter] = useState("All");

  const username = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  const fetchRequests = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors
    const { data, loading, error } = await getData("Ticket");

    setLoading(loading); // Set loading state
    setError(error); // Set error state
    setTickets(data); // Set fetched requests
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "danger"; // Red for High priority
      case "Medium":
        return "warning"; // Yellow for Medium priority
      case "Low":
        return "success";
      case "Fixed":
        return "secondary"; // Green for Low priority
      default:
        return "secondary"; // Default gray color
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date (MM/DD/YYYY)
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [ticketId]: newStatus, // Update the selected status for the specific ticket
    }));
  };

  const handleSubmit = async (ticketId) => {
    const newStatus = selectedStatus[ticketId];
    if (!newStatus) {
      alert("Please select a status before submitting.");
      return;
    }

    try {
      // Make an API call to update the ticket status
      await updateTicketStatus(ticketId, newStatus);

      // Refresh the ticket list
      fetchRequests();
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  const updateTicketStatus = async (id, newStatus) => {
    try {
      // Fetch the current ticket data using the apiService (GET request)
      const { data: ticket, loading, error } = await getData(`Ticket/${id}`);

      if (error) {
        throw new Error("Failed to fetch ticket data: " + error);
      }

      // Only update the issueStatus
      const updatedTicket = { ...ticket, issueStatus: newStatus };

      // Send the updated ticket data back to the server using the apiService (PUT request)
      const { data: updatedTicketData, error: updateError } = await putData(
        `Ticket/${id}`,
        updatedTicket
      );

      if (updateError) {
        throw new Error("Failed to update ticket status: " + updateError);
      }

      return updatedTicketData; // Return the updated ticket data
    } catch (error) {
      throw new Error(
        "Error occurred during ticket status update: " + error.message
      );
    }
  };

  // Function to determine if an option should be disabled
  const isOptionDisabled = (ticketStatus, optionValue) => {
    const statusOrder = ["Pending", "In Progress", "Issue", "Fixed"];
    const currentIndex = statusOrder.indexOf(ticketStatus);
    const optionIndex = statusOrder.indexOf(optionValue);

    // Disable options that are before the current status
    return optionIndex < currentIndex;
  };

  const filteredTickets = tickets.filter((ticket) => {
    // Filter by status
    const matchesStatus =
      statusFilter === "All" || ticket.issueStatus === statusFilter;

    // Filter by priority
    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;

    // If the user is an admin, allow filtering by username, otherwise filter by the logged-in user's userID
    const matchesUsername =
      role === "admin"
        ? usernameFilter === "" ||
          ticket.userID.toLowerCase().includes(usernameFilter.toLowerCase())
        : ticket.userID === username; // Only show tickets of the logged-in user if not admin

    return matchesStatus && matchesPriority && matchesUsername;
  });

  return (
    <Layout>
      {loading ? (
        <Spinner /> // Show Spinner when loading
      ) : error ? (
        <h6>{error}</h6> // Show error message if there's an error
      ) : (
        <div className="container mt-5">
          <div className="d-flex justify-content-between">
            <h3 className="mb-4">Ticket</h3>
            {username !== "admin" ? (
              <NavLink to="/create">
                <button className="btn btn-outline-success mb-3">
                  Create Ticket
                </button>
              </NavLink>
            ) : (
              ""
            )}
          </div>

          {/* Filters */}
          <div className="row mb-4">
            {role === "admin" && (
              <div className="col-md-3">
                <label htmlFor="usernameFilter" className="form-label">
                  Filter by Username:
                </label>
                <input
                  type="text"
                  id="usernameFilter"
                  className="form-control"
                  placeholder="Enter username"
                  value={usernameFilter}
                  onChange={(e) => setUsernameFilter(e.target.value)}
                />
              </div>
            )}
            <div className="col-md-3">
              <label htmlFor="statusFilter" className="form-label">
                Filter by Status:
              </label>
              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Issue">Issue</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="priorityFilter" className="form-label">
                Filter by Priority:
              </label>
              <select
                id="priorityFilter"
                className="form-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Ticket List */}
          <div className="d-flex flex-wrap justify-content-start">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className={`card mb-3 border-${getPriorityColor(
                    ticket.priority
                  )} flex-column`}
                  style={{ width: "330px", margin: "10px" }}
                >
                  <div
                    className={`card-header text-center bg-${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    <h5>Ticket ID: {ticket.ticketId}</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Asset Number:</strong> {ticket.assetNumber}
                    </p>
                    <p>
                      <strong>Reason:</strong> {ticket.reason}
                    </p>
                    <p>
                      <strong>Priority:</strong> {ticket.priority}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDate(ticket.ticketDate)}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          ticket.issueStatus === "Fixed"
                            ? "bg-success" // Green for Fixed
                            : ticket.issueStatus === "Pending"
                            ? "bg-warning" // Yellow for Pending
                            : ticket.issueStatus === "Issue"
                            ? "bg-danger" // Red for Issue
                            : "bg-secondary" // Default gray for any other status
                        }`}
                      >
                        {ticket.issueStatus}
                      </span>
                    </p>
                    {role === "admin" && (
                      <>
                        <h5>Update status</h5>
                        <div className="d-flex mt-3">
                          <select
                            className="form-select"
                            value={
                              selectedStatus[ticket.ticketId] ||
                              ticket.issueStatus
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                ticket.ticketId,
                                e.target.value
                              )
                            }
                          >
                            <option
                              value="Pending"
                              disabled={isOptionDisabled(
                                ticket.issueStatus,
                                "Pending"
                              )}
                            >
                              Pending
                            </option>
                            <option
                              value="In Progress"
                              disabled={isOptionDisabled(
                                ticket.issueStatus,
                                "In Progress"
                              )}
                            >
                              In Progress
                            </option>
                            <option
                              value="Issue"
                              disabled={isOptionDisabled(
                                ticket.issueStatus,
                                "Issue"
                              )}
                            >
                              Issue
                            </option>
                            <option
                              value="Fixed"
                              disabled={isOptionDisabled(
                                ticket.issueStatus,
                                "Fixed"
                              )}
                            >
                              Fixed
                            </option>
                          </select>
                          <button
                            className="bg-cyan ms-2 w-100 rounded-2"
                            style={{ border: "none" }}
                            onClick={() => handleSubmit(ticket.ticketId)}
                          >
                            Submit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  {role === "admin" && (
                    <div className="card-footer text-muted text-center">
                      <small>Raised by: {ticket.userID}</small>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No tickets available.</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ViewTickets;
