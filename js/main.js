const headerEl = document.querySelector('header');
headerEl.innerHTML = `
    <section>
        <img src="img/pop-logo-white.svg" alt="logo">
        <h3>popcorn store</h3>
    </section>
    <nav>
        <img src="img/icon-login.svg" alt="login icon">
        <img src="img/icon-cart.svg" alt="cart icon">
    </nav>
`;

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

    openOverlay(products[0]);
}


function renderProduct(product) {
    let articleEl = document.createElement('article');
    articleEl.classList.add(product.name.toLowerCase());

    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', `../img/${product.img}`);
    articleEl.appendChild(imgEl);

    let productDesc = document.createElement('p');
    productDesc.innerHTML = product.desc;
    articleEl.appendChild(productDesc);
    
    let productInfo = setProductInfo(product, true);
    articleEl.appendChild(productInfo);
    
    // articleEl.addEventListener('click', () => {
    //     if (articleEl.querySelector('.hide')) {
    //         articleEl.querySelector('.hide').classList.remove('hide');
    //     } else {
    //         articleEl.querySelector('section').classList.add('hide');
    //     }
    // });

    mainEl.appendChild(articleEl);
}


function setProductInfo(product, withBuyBtn) {

    let productInfo = document.createElement('section');
    // productInfo.classList.add('hide');

    let characteristicsEl = document.createElement('ul');
    let characteristicsKeys = Object.keys(product.characteristics);
    let characteristicsValues = Object.values(product.characteristics);
    console.log(characteristicsValues);

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
            // openOverlay();
        })
        productInfo.appendChild(buyBtn)
    }


    return productInfo;
}

function openOverlay(product) {
    let overlay = document.createElement('section');
    overlay.classList.add('overlay');

    let articleEl = document.createElement('article');
    
    let input = document.createElement('input');
    input.setAttribute('id', `${product.name}`);
    articleEl.appendChild(input);

    let productInfo = setProductInfo(product, false);

    articleEl.appendChild(productInfo);
    
    product.weight = input.value;
    console.log(product.weight);
    
    overlay.appendChild(articleEl)
    document.querySelector('body').appendChild(overlay);
    
}