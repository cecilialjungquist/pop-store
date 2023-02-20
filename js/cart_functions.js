import { updateLocalStorage, checkLocalStorage } from "./main.js";

let cartIcon = document.querySelector('.cart-icon');
let cartIndicator = document.querySelector('.cart-indicator');
let isOpen = false; 

const deleteIcon = `
<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#B4FF7A"/>
</svg>
`;

// Eventlyssnare som hanterar synlighet/rendering av varukorgsinnehåll
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

// Renderar ut innehållet i varukorgen genom att först hämta localStorage.
// Om det inte finns något i localStorage betyder det att varukorgen är tom 
// och istället skrivs ett meddelande ut.
function renderCart() {
    let cartEl = document.createElement('article');
    let localStorageCart = checkLocalStorage();
    let paymentBtn = document.createElement('button');
    
    cartEl.classList.add('products-in-cart');
    paymentBtn.innerHTML = 'Send me my stuff!';

    // Om localStorage finns, rendera ut i UI
    if (localStorageCart) {
        localStorageCart.forEach(product => {
            let cartProductInfo = document.createElement('section');
            cartProductInfo.innerHTML = `
                <h3><span class="remove-product">${deleteIcon}</span>${product.name}</h3>
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

// Funktion som adderar produkter till varukorgen. Tar emot två
// parametrar, produkt och antal hg. Funktionen hanterar animering
// för varukorgen och kallar på funktion som uppdaterar localStorage.
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