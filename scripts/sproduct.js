const carts = document.querySelectorAll('.add-cart')

carts.forEach((cart, i) => {
    cart.addEventListener('click', () => {
        cartNumbers(products[i])
        totalCoast(products[i])
    })
})

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers')
    if(cartNumbers){
        let cartNumbers = document.querySelectorAll('.cart-count')
        cartNumbers.forEach(cartNumber => {
            cartNumber.textContent = productNumbers
        })
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1)
        let cartCount = document.querySelectorAll('.cart-count')
        cartCount.forEach(cart =>{
            cart.textContent = productNumbers + 1
        })
    }else{
        localStorage.setItem('cartNumbers', 1)
        let cartCount = document.querySelectorAll('.cart-count')
        cartCount.forEach(cart =>{
            cart.textContent = 1
        })
    }
    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1 
    }else{
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems) )
}

function totalCoast(product){
    let cartCost = localStorage.getItem('totalCoast')

    if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCoast', cartCost + product.price)
    }else{
        localStorage.setItem('totalCoast', product.price)
    }
}

function showNumbersInCart(){
    let cartNumbers = localStorage.getItem('cartNumbers')
    if(cartNumbers){
        document.querySelectorAll('.cart-count').textContent = cartNumbers
    }
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('#products')
    if( cartItems && productContainer){
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
                <td>
                    <a><i class="far fa-times-circle"></i></a>
                </td>
                <td>
                    <img src="./img/Products/f1.jpg" alt="">
                </td>
                <td>${item.name}</td>
                <td>$${item.price}.00</td>
                <td>
                    <input type="number" value="${item.inCart}">
                </td>
                <td>$${item.inCart * item.price}.00</td>
            </tr>`
        })
    }

}

onLoadCartNumbers()
displayCart()