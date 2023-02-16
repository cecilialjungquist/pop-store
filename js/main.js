// Strukturera upp koden
// Fixa så ikonen i varukorgen försvinner när man har clearat localStorage
// Fixa så ikonen är kvar om localStorage finns
// Mobilanpassa sidan
// man ska kunna klicka på carten när innehållet visas, då ska varukorgen försvinna igen
// Om varukorgen är tom ska inte knappen visas

let cart = [];

const headerEl = document.querySelector('header');
headerEl.innerHTML = `
    <section>
        <img src="img/pop-logo-white.svg" alt="logo">
        <h3>popcorn store</h3>
    </section>
    <nav>
        <aside class="cart-indicator"></aside>
        <img src="img/icon-login.svg" alt="login icon">
        <img class="cart-icon" src="img/icon-cart.svg" alt="cart icon">
    </nav>
`;

let cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', () => {

    let cartEl = document.createElement('article');
    cartEl.classList.add('products-in-cart');
    let localStorageCart = JSON.parse(localStorage.getItem('cart'));

    if (localStorageCart) {
        console.log(localStorageCart);
        localStorageCart.forEach(product => {
            let cartProductInfo = document.createElement('section');
            cartProductInfo.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.amount * product.pricePerHekto}kr</p>
            `;
            cartEl.appendChild(cartProductInfo);
        });
    }

    let paymentBtn = document.createElement('button');
    paymentBtn.innerHTML = 'Send me my stuff!';
    cartEl.appendChild(paymentBtn);
    paymentBtn.addEventListener('click', () => {
        localStorage.clear();
        document.querySelector('body').removeChild(cartEl)
    })

    document.querySelector('body').appendChild(cartEl);
});

const mainEl = document.querySelector('main');

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
    document.querySelector('.hero').classList.add('hide');
});
//Denna ska in i eventlyssnaren ovan
fetchData();


async function fetchData() {
    let products = await fetch('js/products.json');
    products = await products.json();

    products.forEach(product => {
        renderProduct(product);
    });
}


function renderProduct(product) {
    let articleEl = document.createElement('article');
    let imgEl = document.createElement('img');
    let productDesc = document.createElement('p');
    let productInfo = setProductInfo(product, true);

    imgEl.setAttribute('src', `../img/${product.img}`);
    articleEl.classList.add(product.name.toLowerCase());
    
    productDesc.innerHTML = product.desc;
    
    articleEl.appendChild(imgEl);
    articleEl.appendChild(productDesc);
    articleEl.appendChild(productInfo);
    mainEl.appendChild(articleEl);
}


function setProductInfo(product, withBuyBtn) {

    let productInfo = document.createElement('section');

    let characteristicsEl = document.createElement('ul');
    let characteristicsKeys = Object.keys(product.characteristics);
    let characteristicsValues = Object.values(product.characteristics);

    for (let i = 0; i < characteristicsKeys.length; i++) {
        let liEl = document.createElement('li');
        liEl.classList.add(`${characteristicsKeys[i]}`);
        liEl.innerHTML = `${characteristicsKeys[i]} ${characteristicsValues[i]}`;
        characteristicsEl.appendChild(liEl);
    }
    productInfo.appendChild(characteristicsEl);

    if (withBuyBtn) {
        let buyBtn = document.createElement('button');
        buyBtn.classList.add('buy-btn');
        buyBtn.innerHTML = `Buy for ${product.pricePerHekto}kr/hg!`;
    
        buyBtn.addEventListener('click', () => {
            openOverlay(product);
        })
        productInfo.appendChild(buyBtn)
    }

    return productInfo;
}


function openOverlay(product) {
    // Skapa alla element
    let overlay = document.createElement('section');
    let articleEl = document.createElement('article');
    let productName = document.createElement('h2');
    let productInfo = setProductInfo(product, false);
    let amount = 1;
    let input = document.createElement('section');
    let addToCartBtn = document.createElement('button');


    overlay.classList.add('overlay');
    addToCartBtn.classList.add('add-to-cart-btn');

    productName.innerHTML = product.name;
    input.innerHTML = `
        <button class="plus">+</button>
        <h4><span>${amount}</span>hg</h4>
        <button class="minus">-</button>
    `;
    addToCartBtn.innerHTML = `
        Buy ${amount} hg for ${amount * parseInt(product.pricePerHekto)}kr!
    `;
    
    // Lägger till alla element
    articleEl.appendChild(productName)
    articleEl.appendChild(productInfo)
    articleEl.appendChild(input)
    articleEl.appendChild(addToCartBtn)
    overlay.appendChild(articleEl)
    document.querySelector('body').appendChild(overlay);

    // Eventlyssnare
    articleEl.querySelector('.plus').addEventListener('click', () => {
        amount = updateAmount(amount, '+');
        addToCartBtn.innerHTML = `Buy ${amount} hg for ${amount * parseInt(product.pricePerHekto)}kr!`;
        input.querySelector('h4 span').innerHTML = amount;
    });

    articleEl.querySelector('.minus').addEventListener('click', () => {
        amount = updateAmount(amount, '-');
        addToCartBtn.innerHTML = `Buy ${amount} hg for ${amount * parseInt(product.pricePerHekto)}kr!`;
        input.querySelector('h4 span').innerHTML = amount;
    });

    addToCartBtn.addEventListener('click', () => {
        addToCart(product, amount);
        document.querySelector('body').removeChild(overlay);
    })
}

function updateAmount(amount, operator) {
    if (operator === '+' && amount < 10) {
        amount++;
    } else if (operator === '-' && amount > 1) {
        amount--;
    }
    return amount;
}

function addToCart(product, amount) {
    // Adderar indikator
    let cartIndicator = document.querySelector('.cart-indicator');
    cartIndicator.style.opacity = '.8';

    // Lägger till animering
    cartIndicator.classList.add('pop');

    // Tar bort animering
    setTimeout(() => {
        cartIndicator.classList.remove('pop');
    }, 2000);

    // Sätter ny prop (amount) och lägger till i cart
    product.amount = amount;

    // Om produkten redan finns så ska den inte läggas till?
    console.log(cart);
    updateLocalStorage(product);
}

function updateLocalStorage(product) {
    // Hämta localStorage
    let localStorageCart = JSON.parse(localStorage.getItem('cart'));
    
    // Om den finns, hämta och uppdatera
    if (localStorageCart) {
        localStorageCart.push(product)
        localStorage.setItem('cart', JSON.stringify(localStorageCart));
    } else {
        // Annars skapa den med ny product
        let newLocalStorageCart = [product];
        localStorage.setItem('cart', JSON.stringify(newLocalStorageCart));
    }
}