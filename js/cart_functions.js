import { updateLocalStorage } from "./main.js";

let cartIcon = document.querySelector('.cart-icon');
let cartIndicator = document.querySelector('.cart-indicator');
let isOpen = false; 

cartIcon.addEventListener('click', () => {
    // Om den redan är öppnad
    if (isOpen) {
        isOpen = false;
        // Ta bort elementet från UI
        document.querySelector('.products-in-cart').remove();
    } else {
        isOpen = true;
        // Annars rendera ut cart i UI
        renderCart();
    }

});

function renderCart() {
    let cartEl = document.createElement('article');
    let localStorageCart = JSON.parse(localStorage.getItem('cart'));
    let paymentBtn = document.createElement('button');
    
    cartEl.classList.add('products-in-cart');
    paymentBtn.innerHTML = 'Send me my stuff!';

    // Om localStorage finns, rendera ut i UI
    if (localStorageCart) {
        localStorageCart.forEach(product => {
            let cartProductInfo = document.createElement('section');
            cartProductInfo.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.amount * product.pricePerHekto}kr</p>
            `;
            cartEl.appendChild(cartProductInfo);
        });
        paymentBtn.addEventListener('click', () => {
            isOpen = false;
            localStorage.clear();
            document.querySelector('body').removeChild(cartEl);
            // Raderar indikator
            cartIndicator.style.opacity = '0';
        })
        cartEl.appendChild(paymentBtn);
    } else {
        let message = document.createElement('p');
        message.innerHTML = `Nothing to pop here...`;
        cartEl.appendChild(message);
    }
    
    document.querySelector('body').appendChild(cartEl);
}

function addToCart(product, amount) {
    // Adderar indikator
    cartIndicator.style.opacity = '.8';

    // Lägger till animering
    cartIndicator.classList.add('pop');

    // Tar bort animering
    setTimeout(() => {
        cartIndicator.classList.remove('pop');
    }, 2000);

    // Sätter ny prop (amount) och lägger till i localStorage
    product.amount = amount;
    updateLocalStorage(product);
}

export default addToCart;