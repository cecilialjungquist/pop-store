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
    imgEl.setAttribute('src', `../img/${product.img}`);
    articleEl.appendChild(imgEl);
    mainEl.appendChild(articleEl);
    articleEl = setProductInfo(product, articleEl);
    console.log(articleEl);

    articleEl.addEventListener('click', () => {
        console.log(1);
    });
}


function setProductInfo(product, card) {
    let productInfo = document.createElement('section');
    productInfo.classList.add('hide');

    let productDesc = document.createElement('p');
    productDesc.innerHTML = product.desc;
    productInfo.appendChild(productDesc)

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
    card.appendChild(productInfo);

    return card;
}