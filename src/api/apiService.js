// src/services/genericService.js

import { getData, postData, putData, deleteData } from "./api";

// Get all items for any resource
export const getAllItems = async (resource) => {
  try {
    return await getData(`/${resource}`); // Calls GET /resource
  } catch (error) {
    console.error(`Error in getAllItems for ${resource}:`, error);
    throw error;
  }
};

// Get a specific item by ID for any resource
export const getItemById = async (resource, id) => {
  try {
    return await getData(`/${resource}/${id}`);
  } catch (error) {
    console.error(`Error in getItemById for ${resource} with ID ${id}:`, error);
    throw error;
  }
};

// Create a new item for any resource
export const createItem = async (resource, itemData) => {
  try {
    return await postData(`/${resource}`, itemData);
  } catch (error) {
    console.error(`Error in createItem for ${resource}:`, error);
    throw error;
  }
};

// Update an existing item for any resource
export const updateItem = async (resource, id, itemData) => {
  try {
    return await putData(`/${resource}/${id}`, itemData);
  } catch (error) {
    console.error(`Error in updateItem for ${resource} with ID ${id}:`, error);
    throw error;
  }
};

// Delete an item for any resource
export const deleteItem = async (resource, id) => {
  try {
    return await deleteData(`/${resource}/${id}`);
  } catch (error) {
    console.error(`Error in deleteItem for ${resource} with ID ${id}:`, error);
    throw error;
  }
};
