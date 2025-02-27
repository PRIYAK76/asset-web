import React, { useEffect, useState } from "react";
import { Layout, Spinner, Modal, Toaster } from "../../components";
import { deleteData, getData, postData, putData } from "../../api/api";
import { FaTrash, FaCheckCircle, FaTimes, FaSearch } from "react-icons/fa";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"; // Importing React Icons

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]); // For filtered requests
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isEditModel, setIsEditModel] = useState(false); // Flag to check if it's in edit mode
  const [userName, setUserName] = useState(localStorage.getItem("userName")); // Store username
  const requestDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    requestType: "",
    requestDate: requestDate,
    userID: userName, // Default userId to empty string
    status: "Pending",
  });
  const [searchQuery, setSearchQuery] = useState(""); // For storing search query
  const isAdmin = userName == "admin"; // Check if the user is admin
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Default page size
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  // Fetch requests data with pagination
  const fetchRequests = async (
    pageNumber = 1,
    pageSize = 8,
    username = userName
  ) => {
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors

    try {
      const { data, loading, error } = await getData(
        `Request/${username}/${pageNumber}/${pageSize}`
      );

      if (data) {
        setRequests(data.data); // Set fetched requests
        setFilteredRequests(data.data); // Initially, all requests are displayed
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
      }
    } catch (error) {
      setError("An error occurred while fetching requests.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    fetchRequests(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query
    filterRequests(e.target.value); // Filter the requests based on search query
  };

  const filterRequests = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = requests.filter((request) => {
      return (
        request.requestNumber.toString().includes(lowercasedQuery) ||
        request.requestType.toLowerCase().includes(lowercasedQuery) ||
        request.userID.toLowerCase().includes(lowercasedQuery) ||
        request.status.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredRequests(filtered); // Set filtered requests to state
  };

  // Handle open modal for Add
  const handleOpenAddModal = () => {
    setFormData({
      requestType: "Laptop", // Default requestType to Laptop
      status: "Pending",
      userId: userName,
      requestDate: requestDate,
    });
    setIsEditModel(false);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async () => {
    if (isEditModel) {
      // Update existing request
      const response = await putData(
        `Request/${formData.assetNumber}`,
        formData
      );
      if (response) {
        const updatedAssets = requests.map((request) =>
          request.assetNumber === formData.assetNumber ? formData : request
        );
        setRequests(updatedAssets);
      }
    } else {
      // Add new request
      const response = await postData("Request", formData);
      if (response) {
        setRequests([...requests, response]);
      }
      setShowAlert(true);
    }
    fetchRequests(currentPage, pageSize);
    setShowModal(false); // Close modal after submit
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (isConfirmed) {
      try {
        // Make the API call to delete the request
        const response = await deleteData(`Request/${id}`);

        // If deletion is successful, remove the request from the state
        if (response) {
          const updatedRequests = requests.filter(
            (request) => request.requestNumber !== id
          );
          setRequests(updatedRequests);
          setFilteredRequests(updatedRequests); // Update the filtered requests as well
        }
      } catch (error) {
        console.error("Error deleting request:", error);
        setError(
          "An error occurred while deleting the request. Please try again later."
        );
      }
    }
  };

  // Update status function for Admin to approve or reject the request
  const updateStatus = async (request, status) => {
    try {
      const updatedRequest = { ...request, status };
      const response = await putData(
        `Request/${request.requestNumber}`,
        updatedRequest
      );
      if (response) {
        // If status updated successfully, re-fetch the requests
        alert(`Status ${status} Successfully`);
        fetchRequests(currentPage, pageSize);
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      setError("An error occurred while updating the request status.");
    }
  };

  // Filter requests based on the user role
  // const filteredRequestsForUser =
  //   userName !== "admin"
  //     ? filteredRequests.filter((request) => request.userID === userName)
  //     : filteredRequests;

  // Pagination controls
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Layout>
      {loading ? (
        <Spinner /> // Show Spinner when loading
      ) : error ? (
        <h6>{error}</h6> // Show error message if there's an error
      ) : (
        <div className="container mt-4">
          <div className="d-flex justify-content-between">
            <h3 className="mb-4">Requests</h3>
            <div className="input-group mb-3 w-50">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search Requests"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {!isAdmin ? (
              <button
                className="btn btn-outline-success mb-3"
                onClick={handleOpenAddModal}
              >
                Create Request
              </button>
            ) : (
              ""
            )}
          </div>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Request No.</th>
                <th>Type</th>
                <th>Date</th>
                {isAdmin ? <th>Requested By</th> : ""}
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests?.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.requestNumber}>
                    <td>{request.requestNumber}</td>
                    <td>{request.requestType}</td>
                    <td>{request.requestDate}</td>
                    {isAdmin ? <td>{request.userID}</td> : ``}
                    <td>{request.status}</td>
                    <td>
                      {isAdmin ? (
                        <>
                          <button
                            disabled={
                              request.status == "Approved" ||
                              request.status == "Rejected"
                            }
                            className="bg-transparent"
                            style={{ border: "none" }}
                          >
                            <FaCheckCircle
                              className="text-success me-3"
                              onClick={() => updateStatus(request, "Approved")}
                              style={{ cursor: "pointer" }}
                              size={35}
                            />
                          </button>
                          <button
                            disabled={
                              request.status == "Rejected" ||
                              request.status == "Approved"
                            }
                            className="bg-transparent"
                            style={{ border: "none" }}
                          >
                            <FaTimes
                              className="text-danger"
                              onClick={() => updateStatus(request, "Rejected")}
                              style={{ cursor: "pointer" }}
                              size={35}
                            />
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(request.requestNumber)}
                          disabled={request.status != "Pending"}
                        >
                          <FaTrash className="me-2" />
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <span>
                Page {currentPage} of {totalPages} | Total Records:{" "}
                {totalRecords}
              </span>
            </div>
            <div>
              <button
                className="btn btn-outline-dark me-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <MdOutlineArrowBackIos /> Prev
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <MdOutlineArrowForwardIos />
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <Toaster
          message="Submitted successfully"
          handleAlert={setShowAlert(false)}
        />
      )}

      <Modal
        show={showModal}
        title={isEditModel ? "Edit Request" : "Add Request"}
        onClose={handleCloseModal}
        onConfirm={handleSubmit}
        content={
          <>
            <div className="mb-3">
              <label htmlFor="requestType" className="form-label">
                Request Type
              </label>
              <select
                id="requestType"
                className="form-control"
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
              >
                <option value="Laptop">Laptop</option>
                <option value="Charger">Charger</option>
                <option value="Replacement">Replacement</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <input
                type="text" // Changed to text as it's for displaying the status
                className="form-control"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userId" className="form-label">
                User Id
              </label>
              <input
                type="text" // Changed to text as it's for displaying the user ID
                className="form-control"
                id="userID"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                disabled
              />
            </div>
          </>
        }
      />
    </Layout>
  );
};

export default Requests;
