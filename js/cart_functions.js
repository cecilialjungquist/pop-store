import { updateLocalStorage } from "./main.js";

let cartIcon = document.querySelector('.cart-icon');
let cartIndicator = document.querySelector('.cart-indicator');

cartIcon.addEventListener('click', () => {
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
    }

    paymentBtn.addEventListener('click', () => {
        localStorage.clear();
        document.querySelector('body').removeChild(cartEl);
        // Raderar indikator
        cartIndicator.style.opacity = '0';
    })
    
    cartEl.appendChild(paymentBtn);
    document.querySelector('body').appendChild(cartEl);
});

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