'use strict';

let inventory = [];

document.getElementById('addInventoryButton').addEventListener('click', function(e) {
    addInventory(inventory);
    storeInventory(inventory);
    renderInventory();
    // clear the form
    clearForm();
});

document.getElementById('shipButton').addEventListener('click', function(e) {
    removeProduct(id);  
    storeInventory(inventory); 
});

renderInventory();




