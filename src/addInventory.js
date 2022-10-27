'use strict';
// Import utility functions
import {
  clearAlerts,
  getStoredInventory,
  isNumber,
  productExists,
  storeInventory,
  ValidationError,
} from './functions.js';

// Create a function that grabs the values from user input and pushes them into the inventory array
// Function takes in the name, quantity, and containsNuts values from the form as arguments
export const addInventory = (name, containsNuts, quantity) => {
  // Get the current inventory from local storage
  let inventory = getStoredInventory();

  // Validate input and throw an error if there are issues
  // If the name or quantity are empty, throw an error
  if (!name || !quantity) {
    throw new ValidationError('Please fill out all fields in order to add an item to the inventory.');
  }
  // If the quantity is not a number, throw an error
  if (!isNumber(quantity)) {
    throw new ValidationError('Quantity must be a number.');
  }
  // If the product already exists, throw an error
  if (productExists(inventory, name)) {
    throw new ValidationError(
      'Inventory item already exists. Please update the inventory instead.'
    );
  }





  // No error thrown so we can clear the error form if any errors are present
  clearAlerts();

  // Make sure quantity is an int
  quantity = parseInt(quantity);

  // Push the new item into the inventory array
  inventory.push({
    id: uuidv4(),
    name: name,
    containsNuts: containsNuts,
    quantity: quantity,
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
  });
  // Store the new inventory in local storage
  storeInventory(inventory);
};

