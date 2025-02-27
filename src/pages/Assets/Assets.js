import React, { useEffect, useState } from "react";
import { Layout, Spinner, Modal } from "../../components";
import { getData, postData, putData, deleteData } from "../../api/api"; // Assuming you have a postData and putData function

const Assets = () => {
  const [assets, setAssets] = useState([]); // State to store fetched assets
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isEditModel, setIsEditModel] = useState(false); // Flag to check if it's in edit mode
  const [formData, setFormData] = useState({
    assetNumber: "",
    assetName: "",
    quantity: "",
  });
 
  const fetchAssets = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors
    const { data, loading, error } = await getData("Asset");

    setLoading(loading); // Set loading state
    setError(error); // Set error state
    setAssets(data); // Set fetched assets
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle open modal for Add
  const handleOpenAddModal = () => {
    setFormData({
      assetName: "",
      quantity: "",
      requestType: "Pending",
    });
    setIsEditModel(false);
    setShowModal(true);
  };

  // Handle open modal for Edit
  const handleOpenEditModal = (asset) => {
    setFormData({
      assetNumber: asset.assetNumber,
      assetName: asset.assetName,
      quantity: asset.quantity,
    });
    setIsEditModel(true); // Set to Edit mode
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async () => {
    if (isEditModel) {
      // Update existing asset
      const response = await putData(`Asset/${formData.assetNumber}`, formData);
      if (response) {
        const updatedAssets = assets.map((asset) =>
          asset.assetNumber === formData.assetNumber ? formData : asset
        );
        setAssets(updatedAssets);
      }
    } else {
      // Add new asset
      const response = await postData("Asset", formData);
      if (response) {
        setAssets([...assets, response]);
      }
    }
    fetchAssets();
    setShowModal(false); // Close modal after submit
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (isConfirmed) {
      try {
        // Make the API call to delete the asset
        const response = await deleteData(`Asset/${id}`);

        // If deletion is successful, remove the asset from the state
        if (response) {
          const updatedAssets = assets.filter(
            (asset) => asset.requestNumber !== id
          );
          setAssets(updatedAssets);
        }
      } catch (error) {
        console.error("Error deleting asset:", error);
        setError(
          "An error occurred while deleting the asset. Please try again later."
        );
      }
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
            <h3 className="mb-4">Assets</h3>
            <button
              className="btn btn-outline-success mb-3"
              onClick={handleOpenAddModal}
            >
              Add Asset
            </button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <tr key={asset.assetNumber}>
                    <td>{asset.assetNumber}</td>
                    <td>{asset.assetName}</td>
                    <td>{asset.quantity}</td>
                    <td>
                      <button
                        className="btn btn-outline-success me-2"
                        onClick={() => handleOpenEditModal(asset)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(asset.assetNumber)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        show={showModal}
        title={isEditModel ? "Edit Asset" : "Add Asset"}
        onClose={handleCloseModal}
        onConfirm={handleSubmit}
        content={
          <>
            <div className="mb-3">
              <label htmlFor="assetName" className="form-label">
                Asset Name
              </label>
              <input
                type="text"
                className="form-control"
                id="assetName"
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
          </>
        }
      />
    </Layout>
  );
};

export default Assets;
