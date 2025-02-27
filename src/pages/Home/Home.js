import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { FiSettings } from "react-icons/fi";
import { FaCircleCheck, FaListCheck } from "react-icons/fa6";
import { getData } from "../../api/api"; // Assuming this is the method to fetch data
import { FaTimesCircle } from "react-icons/fa";

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName")); // Get logged-in user

  const isAdmin = userName === "admin"; // Check if user is admin

  // Fetch requests data and calculate counts
  const fetchRequests = async () => {
    setLoading(true); // Start loading
    const { data, loading, error } = await getData("Request");

    setLoading(loading);
    if (data) {
      setRequests(data); // Set fetched requests
      calculateRequestCounts(data); // Calculate the counts of statuses
    }
  };

  // Calculate the number of approved, rejected, and pending requests
  const calculateRequestCounts = (data) => {
    let approved = 0;
    let rejected = 0;
    let pending = 0;

    data.forEach((request) => {
      if (request.status === "Approved") approved++;
      if (request.status === "Rejected") rejected++;
      if (request.status === "Pending") pending++;
    });

    setApprovedCount(approved);
    setRejectedCount(rejected);
    setPendingCount(pending);
  };

  useEffect(() => {
    fetchRequests();
  }, []); // Run once on component mount

  return (
    <Layout>
      <div className="container text-center">
        <div className="text-center">
          <h6 className="display-6 w-75 mx-auto fw-bold">
            Welcome to Asset Management Application
          </h6>
          <p className="w-75 mx-auto my-5">
            This is used to request for assets and view the status of the request,
            whether it is approved or rejected. Admin can approve or reject the
            requests based on availability.
          </p>
        </div>

        {/* Show Dashboard for Admin */}
        {isAdmin && !loading && (
          <div className="mb-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div
                  className="dashboard-box shadow-sm p-4 mb-4 rounded-3"
                  style={{ backgroundColor: "#28a745", color: "white" }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <FaCircleCheck size={50} />
                    <div className="ms-3">
                      <h5 className="fw-bold">Approved Requests</h5>
                      <p className="fs-4">{approvedCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div
                  className="dashboard-box shadow-sm p-4 mb-4 rounded-3"
                  style={{ backgroundColor: "#ffc107", color: "white" }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <FaListCheck size={50} />
                    <div className="ms-3">
                      <h5 className="fw-bold">Pending Requests</h5>
                      <p className="fs-4">{pendingCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div
                  className="dashboard-box shadow-sm p-4 mb-4 rounded-3"
                  style={{ backgroundColor: "#dc3545", color: "white" }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <FaTimesCircle size={50} />
                    <div className="ms-3">
                      <h5 className="fw-bold">Rejected Requests</h5>
                      <p className="fs-4">{rejectedCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other cards for regular users */}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <FiSettings className="text-primary mb-3" size={50} />
                  <h5 className="card-title">Asset Request</h5>
                  <p className="card-text">
                    Easily request assets with just a few clicks. Track the status
                    of your request in real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <FaCircleCheck className="text-success mb-3" size={50} />
                  <h5 className="card-title">Approve Requests</h5>
                  <p className="card-text">
                    Admins can approve or reject asset requests based on
                    availability and priority.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <FaListCheck className="text-info mb-3" size={50} />
                  <h5 className="card-title">Track Request Status</h5>
                  <p className="card-text">
                    Track the real-time status of your asset requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default Home;
