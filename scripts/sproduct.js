const addToCard = document.querySelector('[data-cart-btn]')

addToCard.addEventListener('click', getInfo)

function getInfo(){
    const productName = document.querySelector('[data-product-name]')
    const productPrice = document.getElementById('product-price')
    const productValue = document.querySelector('[data-input-value]')

    
    localStorage.setItem('name', productName.textContent);
    localStorage.setItem('price', Number(productPrice.dataset.price));        localStorage.setItem('number', productValue.value);
}