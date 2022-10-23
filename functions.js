'use strict';

// Create a function that grabs the values from user input and pushes them into the inventory array
const addInventory = (inventory, timestamp) => {
  let addProductName = document.getElementById('addProductName').value;
  let addProductQuantity = document.getElementById('addProductQuantity').value;
  
// Form validation
    if (addProductName === '' || addProductQuantity === '') {
        const error = document.getElementById('error');
        error.textContent = 'Please fill out all fields';
        return;
    }
// Clear error message
    const error = document.getElementById('error');
    error.textContent = '';

  inventory.push({
    id: uuidv4(),
    name: addProductName,
    quantity: addProductQuantity,
    date: moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
  });
};

// Create a function that will store the inventory array in local storage
const storeInventory = (inventory) => {
  localStorage.setItem('inventory', JSON.stringify(inventory));
};

// Create a function that will retrieve the inventory array from local storage
const getStoredInventory = () => {
  let inventoryJSON = localStorage.getItem('inventory');
  try {
    return inventoryJSON ? JSON.parse(inventoryJSON) : [];
  } catch (e) {
    return [];
  }
};

// Create a function that will delete an item from the inventory array
const removeProduct = (id) => {
    let itemIndex = inventory.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
        inventory.splice(itemIndex, 1);
    }
};

// Create a function that will clear the form after the user submits the form
const clearForm = () => {
    document.getElementById('addProductName').value = '';
    document.getElementById('addProductQuantity').value = '';
};

// Create a function that will render the inventory array to the screen
const renderInventory = () => {
    let inventory = getStoredInventory();
    
    let inventoryList = document.getElementById('output');
    
    
    
    inventory.forEach((product) => {
        let productElement = document.createElement('div');
        productElement.textContent = `Product name: ${product.name} Product Quantity: ${product.quantity} Date Entered: ${product.date}`;
        inventoryList.appendChild(productElement);
    });
    };
