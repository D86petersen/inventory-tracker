'use strict';

// Import utility functions
import {
  clearAlerts,
  deleteInventoryItem,
  getInventoryIdByName,
  getInventoryQuantityByName,
  getStoredInventory,
  isNumber,
  productExists,
  showAlert,
  storeInventory,
  updateInventoryItem,
  ValidationError,
} from './functions.js';

// Created a function for validation
const validate = (inventory, name, quantity) => {
  // If there is no name or quantity, throw an error
  if (!name || !quantity) {
    throw new ValidationError('Cannot ship an item without a name and quantity.');
  }

  // If the quantity entered is not a number, throw an error
  if (!isNumber(quantity)) {
    throw new ValidationError('Quantity must be a number.');
  }

  // If the quantity of the product is 0 or less, throw an error
  if (quantity <= 0) {
    throw new ValidationError(
      'You must enter a quantity greater than zero to ship a product.'
    );
  }

  // If the product does not exist in the inventory, throw an error
  if (!productExists(inventory, name)) {
    throw new ValidationError(
      `Inventory item "${name}" does not exist and cannot be shipped.`
    );
  }

  // Getting the quantity of the product in inventory by name
  let productQuantity = getInventoryQuantityByName(inventory, name);

  // If the quantity of the product in the inventory is less than the quantity entered, throw an error
  if (productQuantity < quantity) {
    // Cast this to an integer so we can call toLocaleString, which will add commas to the number in case of large numbers
    quantity = parseInt(quantity);

    throw new ValidationError(
      `Inventory item "${name}" only has ${productQuantity.toLocaleString()} and cannot ship ${quantity.toLocaleString()}.`
    );
  }

  return;
};

// Create a function that will update or delete an item based on quantity shipped
export const shipProduct = (name, quantity) => {
  // Getting the inventory from local storage (state)
  let inventory = getStoredInventory();

  // This will throw an error if there are any issues
  validate(inventory, name, quantity);

  // No error thrown so we can clear the error form if any errors are present
  clearAlerts();

  // We keep this as an integer in our state
  quantity = parseInt(quantity);

  // Get the id of the product we are shipping
  const id = getInventoryIdByName(inventory, name);

  // if you are going to ship all of the quantity available, delete the inventory item
  if (quantity === getInventoryQuantityByName(inventory, name)) {
    inventory = deleteInventoryItem(inventory, id);
  } else {
    // if you are going to ship only some of the quantity available, update the inventory item
    inventory = updateInventoryItem(inventory, id, {
      quantity: getInventoryQuantityByName(inventory, name) - quantity,
    });
  }

  // show a success alert
  showAlert(
    'success',
    `Successfully shipped ${quantity.toLocaleString()} of ${name}.`
  );

  // update the local storage (state)
  storeInventory(inventory);
};
