import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { postData } from "../../api/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "User", // Default role is "User"
    aceId: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Live validation
    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = "";

    switch (id) {
      case "username":
        error =
          value.length < 8 || value.length > 10
            ? "Username must be between 8 to 10 characters"
            : "";
        break;
      case "aceId":
        error = value.trim() === "" ? "ACE ID is required" : "";
        break;
      case "password":
        error =
          value.length < 8 ||
          value.length > 16 ||
          !/[A-Z]/.test(value) ||
          !/\d/.test(value)
            ? "Password must be between 8 and 16 characters, with at least one uppercase letter and one number"
            : "";
        break;
      case "confirmPassword":
        error = value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate username
    if (formData.username.length < 8 || formData.username.length > 10) {
      newErrors.username = "Username must be between 8 to 10 characters";
      isValid = false;
    }

    // Validate ACE ID
    if (formData.aceId.trim() === "") {
      newErrors.aceId = "ACE ID is required";
      isValid = false;
    }

    // Validate password
    if (
      formData.password.length < 8 ||
      formData.password.length > 16 ||
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be between 8 and 16 characters, with at least one uppercase letter and one number";
      isValid = false;
    }

    // Validate confirm password
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await postData("Register", formData);

      // Check for errors in the response
      if (response.error) {
        // Check if the backend returned a specific error message (e.g., username exists)
        if (response.error == "User name already exsists") {
          setErrors({ username: "Username already exists. Please choose another." });
        } else {
          // Generic error
          setErrors({ form: "Registration failed. User name already exsists" });
        }
        return; // Return early to prevent further processing
      }

      if (response.data) {
        alert("Registration successful!");
        window.location.href = "/Login"; // Redirect to login page
      } else {
        setErrors({ form: "Registration failed. User name already exsists." });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setErrors({ form: "An unexpected error occurred. Please try again later." });
    }
  };

  return (
    <Layout>
      <div className="container w-50 border p-3 bg-white">
        <h3 className="text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" className="fw-bold my-2">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </div>

          {/* ACE ID */}
          <div className="form-group">
            <label htmlFor="aceId" className="fw-bold my-2">
              ACE ID
            </label>
            <input
              type="text"
              className="form-control"
              id="aceId"
              value={formData.aceId}
              onChange={handleChange}
              required
            />
            {errors.aceId && (
              <small className="text-danger">{errors.aceId}</small>
            )}
          </div>

          {/* Role (hidden, default is "User") */}
          <input
            type="hidden"
            id="role"
            value={formData.role}
            onChange={handleChange}
          />

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="fw-bold my-2">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="fw-bold my-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>

          {/* Form-level error */}
          {errors.form && (
            <div className="text-danger my-2">{errors.form}</div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-dark w-100 my-3">
            Register
          </button>

          {/* Login Link */}
          <h6 className="text-end my-3">
            Already a user?
            <a className="text-primary" href="/Login">
              Login
            </a>
          </h6>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
