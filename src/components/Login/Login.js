// src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { postData } from '../../api/api';
import Layout from '../Layout/Layout';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext); // Get the login function from context

  const handleChange = (e) => {
    console.log(e);
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postData('Login', formData);

      if (response.error) {
        setErrorMessage("Invalid username or password");
        return;
      }

      if (response.data) {
        login(response.data); // Use login function from context

        alert('Login successful!');
        window.location.href = '/'; // Redirect to dashboard
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="container w-50 border p-3 bg-white">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="username" className="fw-bold my-2">
              User name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
          </div>
          <div className="form-group">
            <label htmlFor="role" className="fw-bold my-2">
              Role
            </label>
            <select
              className="form-control"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {errorMessage && (
            <div id="errorContainer" className="text-danger my-2">
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-dark w-100 my-3">
            Login
          </button>
          <h6 class="text-end my-3">
            New user?{" "}
            <a class="text-primary" href="/Register">
              Register
            </a>{" "}
          </h6>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
