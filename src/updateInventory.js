'use strict';

// Import utility functions
import {
  clearAlerts,
  deleteInventoryItem,
  getInventoryIdByName,
  getStoredInventory,
  isNumber,
  productExists,
  showAlert,
  storeInventory,
  updateInventoryItem,
  ValidationError,
} from './functions.js';

// Created a validation function to validate the input data
const validate = (inventory, name, quantity) => {
  // If there is no name or quantity, throw an error
  if (!name || !quantity) {
    throw new ValidationError('Please fill out all fields so that we may update your inventory.');
  }
  // If the quantity is not a number, throw an error
  if (!isNumber(quantity)) {
    throw new ValidationError('Quantity must be a number.');
  }
  // If the quantity is less than or equal to zero, throw an error
  if (quantity <= 0) {
    throw new ValidationError('You must enter a quantity greater than zero.');
  }
  // If the product does not exist, throw an error
  if (!productExists(inventory, name)) {
    throw new ValidationError(
      `Inventory item "${name}" does not exist and cannot be updated.`
    );
  }

  return;
};

// Created a function that will update or delete an item based on quantity shipped
export const updateInventory = (name, quantity) => {
  // Get the inventory from local storage
  let inventory = getStoredInventory();

  // This will throw an error if there are any issues
  validate(inventory, name, quantity);

  // No error thrown so we can clear the error form if any errors are present
  clearAlerts();

  // We keep this as an integer in our state
  quantity = parseInt(quantity);

  // Get the id of the product we are updating
  const id = getInventoryIdByName(inventory, name);

  // Delete the item if the quantity is set to zero
  if (quantity === 0) {
    inventory = deleteInventoryItem(inventory, id);
  } else {
    inventory = updateInventoryItem(inventory, id,  { quantity });
  }

  // show a success alert
  showAlert('success', `Successfully updated ${name}.`);

  // update the inventory in local storage (state)
  storeInventory(inventory);
};
