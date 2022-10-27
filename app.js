'use strict';
/* global document */

// Import functions
import { addInventory } from './src/addInventory.js';
import { shipProduct } from './src/shipProduct.js';
import { updateInventory } from './src/updateInventory.js';
import { renderInventory, showAlert, ValidationError } from './src/functions.js';

// We can use optional chaining to check if the element exists before adding the event listener
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
document
  .getElementById('enterInventory')
  ?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Getting user input data from the form
    const name = e.target.name.value;
    const containsNuts = e.target.containsNuts.checked;
    const quantity = e.target.quantity.value;

    // Try to add the inventory item
    // If there is an error, show the error message
    try {
      addInventory(name, containsNuts, quantity);
    } catch (e) {
      if (e instanceof ValidationError) {
        showAlert('error', e.message);
        return;
      } else {
        throw e;
      }
    }
    // Clear the form
    e.target.reset();
    // Render the inventory
    renderInventory();
  });

document
  .getElementById('shipProduct')
  ?.addEventListener('submit', function (e) {
    // Prevent the default refresh from happening
    e.preventDefault();

    // Getting user input data from the form
    const name = e.target.name.value;
    const quantity = e.target.quantity.value;

    // Try to ship the product
    // If there is an error, show the error message

    try {
      shipProduct(name, quantity);
    } catch (e) {
      if (e instanceof ValidationError) {
        showAlert('error', e.message);
        return;
      } else {
        throw e;
      }
    }

    // Clear the form
    e.target.reset();

    // Render the inventory
    renderInventory();
  });

document
  .getElementById('updateInventory')
  ?.addEventListener('submit', function (e) {
    // Prevent the default refresh from happening
    e.preventDefault();

    // Getting user input data from the form
    const name = e.target.name.value;
    const quantity = e.target.quantity.value;

    // Try to update the inventory item
    try {
      updateInventory(name, quantity);
    } catch (e) {
      if (e instanceof ValidationError) {
        showAlert('error', e.message);
        return;
      } else {
        throw e;
      }
    }

    // Clear the form
    e.target.reset();

    // Render the inventory
    renderInventory();
  });

// Render the inventory
renderInventory();
