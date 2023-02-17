import addToCart from "./cart_functions.js";

function renderProduct(product) {
    const mainEl = document.querySelector('main');
    let articleEl = document.createElement('article');
    let imgEl = document.createElement('img');
    let productDesc = document.createElement('p');
    let productInfo = setProductInfo(product, true);

    imgEl.setAttribute('src', `../img/${product.img}`);
    articleEl.classList.add(product.name.toLowerCase());
    mainEl.style.padding = '6rem 0rem';
    
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

export {renderProduct, setProductInfo, updateAmount};