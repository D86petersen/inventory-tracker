'use strict';

// Use a custom error to catch validation errors
// https://javascript.info/custom-errors
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Created a function that takes in value as an argument and returns true if the value is a number
export const isNumber = (value) => {
  // isNaN will return false for strings that are numbers without typecasting to an int
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
  return !isNaN(value);
};

// Create a function that will retrieve the inventory array from local storage
export const getStoredInventory = () => {
  // Get the inventory from local storage (state)
  let inventoryJSON = localStorage.getItem('inventory');

  // Check to see if there is any inventory in local storage, if there is parse it and return it otherwise return an empty array
  try {
    return inventoryJSON ? JSON.parse(inventoryJSON) : [];
  } catch (e) {
    return [];
  }
};

// Create a function that will store the inventory array in local storage
export const storeInventory = (inventory) => {
  // Stringify the inventory array and store it in local storage
  localStorage.setItem('inventory', JSON.stringify(inventory));
};

// Created a function that show an alert message to the user based on the type of alert
export const showAlert = (type, message) => {
  // Clear any existing alerts
  clearAlerts();

  // If statement to determine if the alert is success
  if (type === 'success') {
    // Getting the alert container
    const success = document.getElementById('success');

    // If the alert container exists, add the alert message to the container
    if (success) {
      success.textContent = message;
      success.style.display = 'block';
    }
  }

  // If statement to determine if the alert is error
  if (type === 'error') {
    // Getting the alert container
    const error = document.getElementById('error');

    // If the alert container exists, add the alert message to the container
    if (error) {
      error.textContent = message;
      error.style.display = 'block';
    }
  }

  return;
};

// Created a function that will clear any alerts
export const clearAlerts = () => {
  // Getting the alert containers
  const error = document.getElementById('error');

  // If the alert containers exist, clear the alert message and hide the container
  if (error) {
    error.textContent = '';
    error.style.display = 'none';
  }

  // Getting the alert containers
  const success = document.getElementById('success');

  // If the alert containers exist, clear the alert message and hide the container
  if (success) {
    success.textContent = '';
    success.style.display = 'none';
  }
};

// Created a function that checks to see if the product exists in the inventory by name
export const productExists = (inventory, name) => {
  // Some() will return true if any of the items in the array match the condition
  return inventory.some((item) => item.name === name);
};

// Created a function that will return the quantity of a product in the inventory by name
export const getInventoryQuantityByName = (inventory, name) => {
  // Find() will return the first item in the array that matches the condition
  return inventory.find((item) => item.name === name).quantity || 0;
};

// Created a function that will return the id of a product in the inventory by name
export const getInventoryIdByName = (inventory, name) => {
  // Find() will return the first item in the array that matches the condition, otherwise return null
  return inventory.find((item) => item.name === name).id || null;
};

// Created a function that will update the quantity of a product in the inventory array by id
export const updateInventoryItem = (inventory, id, item) => {
  // findIndex() will return the index of the first item in the array that matches the condition, and check to see if the id matches the id of the item in the array
  const index = inventory.findIndex((item) => item.id === id);

  // If the index is greater than -1, update the item in the array
  if (index === -1) {
    throw new ValidationError('Error: Could not find item in inventory.');
  }

  // Used the spread operator to create a new array with the updated item
  // This allows for easily updating the item in the array by merging the new item with the existing item
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  inventory[index] = { ...inventory[index], ...item };
  return inventory;
};

// Created a function that will delete a product in the inventory array by id
export const deleteInventoryItem = (inventory, id) => {
  // findIndex() will return the index of the first item in the array that matches the condition, and check to see if the id matches the id of the item in the array
  const index = inventory.findIndex((item) => item.id === id);

  // Used splice() to remove the item from the array
  if (index > -1) {
    inventory.splice(index, 1);
  }

  // Return the updated inventory array
  return inventory;
};

// Create a function that will render the inventory array to the screen
export const renderInventory = () => {
  // Get the inventory from local storage (state)
  let inventory = getStoredInventory();

  // Get the inventory container
  let inventoryList = document.getElementById('output');

  // Clear the inventory container
  if (inventoryList) {
    inventoryList.textContent = '';

    // Iterate over the inventory array and create a new list item for each item in the array
    inventory.forEach((product) => {
      // Create a new container for the product
      let productElement = document.createElement('div');
      // Text content for the product
      productElement.textContent = `Product name: ${product.name} - Contains Nuts: ${product.containsNuts} - Product Quantity: ${product.quantity} - Date Entered: ${product.date}`;
      // Append the product to the inventory container in the DOM
      inventoryList?.appendChild(productElement);
    });
  }
};
