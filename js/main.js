// TO DO
// Om produkten redan finns i korgen ska den inte läggas till igen, bara ändra amount
// REFAKTORISERA 

import {renderProduct} from "./product_functions.js";

const startBtn = document.getElementById('start-btn');
let cartIndicator = document.querySelector('.cart-indicator');

// Hämtar data (i bakgrunden) direkt
fetchData();
// Kollar localStorage
checkLocalStorage();

function updateLocalStorage(product) {
    let localStorageCart = checkLocalStorage();
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

function checkLocalStorage() {
    let localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (localStorageCart) {
        let cartIndicator = document.querySelector('.cart-indicator');
        cartIndicator.style.opacity = '.8';
        return localStorageCart;
    } else {
        return false;
    }
}

async function fetchData() {
    try {
        let products = await fetch('js/products.json');
        products = await products.json();
        
        products.forEach(product => {
            renderProduct(product);
        });
        
    } catch (error) {
        console.log('Oppps, something went wrong! ', error);
        let message = document.createElement('p');
        message.innerHTML = `Ooops, something went wrong. Please try again later!`;
        message.style.marginTop = '10rem';
        document.querySelector('main').appendChild(message);
    }
}

startBtn.addEventListener('click', () => {
    document.querySelector('main').classList.remove('hide');
    document.querySelector('.hero').classList.add('hide');
});

export { updateLocalStorage, checkLocalStorage };