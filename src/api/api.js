// src/api/api.js

const BASE_URL = "http://localhost:5041/api/";

// Generic function to handle all HTTP requests (GET, POST, PUT, DELETE)
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  let data = null;
  let loading = true;
  let error = null;

  try {
    // Retrieve token from localStorage (assuming it's saved as 'authToken')
    const token = localStorage.getItem('authToken');

    const config = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // If there's a token, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // If it's a POST or PUT request, attach the body
    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`Failed to ${method} at ${endpoint}`);
    }

    // If it's a GET request, return the data
    if (method === 'GET') {
      data = await response.json();
    } else {
      data = await response.json();
    }
  } catch (err) {
    error = err.message || "An error occurred during the request.";
    console.error(`Error during ${method} request to ${endpoint}:`, err);
  } finally {
    loading = false; // Loading finished
  }

  return { data, loading, error };
};

// Generic GET request
export const getData = async (endpoint) => {
  return await apiRequest(endpoint, 'GET');
};

// Generic POST request
export const postData = async (endpoint, data) => {
  return await apiRequest(endpoint, 'POST', data);
};

// Generic PUT request
export const putData = async (endpoint, data) => {
  return await apiRequest(endpoint, 'PUT', data);
};

// Generic DELETE request
export const deleteData = async (endpoint) => {
  return await apiRequest(endpoint, 'DELETE');
};
