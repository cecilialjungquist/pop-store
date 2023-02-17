// Mobilanpassa sidan
// Man ska kunna klicka på carten när innehållet visas, då ska varukorgen försvinna igen
// Om varukorgen är tom ska inte knappen visas
// REFAKTORISERA 

import {renderProduct} from "./product_functions.js";

let localStorageCart = JSON.parse(localStorage.getItem('cart'));
const startBtn = document.getElementById('start-btn');
let cartIndicator = document.querySelector('.cart-indicator');

// Om localStorage finns, ska indikatorn synas
if (localStorageCart) {
    cartIndicator.style.opacity = '.8';
}

function updateLocalStorage(product) {
    // Om localStorage finns, hämta och uppdatera
    if (localStorageCart) {
        localStorageCart.push(product)
        localStorage.setItem('cart', JSON.stringify(localStorageCart));
    } else {
        // Annars skapa den med ny product
        let newLocalStorageCart = [product];
        localStorage.setItem('cart', JSON.stringify(newLocalStorageCart));
    }
}

async function fetchData() {
    let products = await fetch('js/products.json');
    products = await products.json();
    
    products.forEach(product => {
        renderProduct(product);
    });
}

startBtn.addEventListener('click', () => {
    document.querySelector('.hero').classList.add('hide');
    fetchData();
});

export { updateLocalStorage };