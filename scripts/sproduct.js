const carts = document.querySelectorAll('.add-cart')
const numbers = document.querySelectorAll('.numbers')


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



function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('#products')
    if( cartItems && productContainer){
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr id = 'product_${item.tag}'>
                <td>
                    <a onclick="removeItems('${item.tag}')">
                        <i class="far fa-times-circle remove-cart"></i>
                    </a>
                </td>
                <td>
                    <img src="./img/Products/${item.tag}.png" alt="">
                </td>
                <td>${item.name}</td>
                <td>R$${item.price},00</td>
                <td>
                    <input onchange="changeCartNumber('${item.tag}')" class="numbers" type="number" value="${item.inCart}">
                </td>
                <td>R$${item.inCart * item.price},00</td>
            </tr>`
        })
    }
}

function removeItems(productTag){
    let element = document.getElementById(`product_${productTag}`)
    let cartItems = localStorage.getItem('productsInCart')
    let numbersInCart = localStorage.getItem('cartNumbers')
    let totalCoasts = localStorage.getItem('totalCoast')
    let total = 0
    let totalInCart = 0
    
    cartItems = JSON.parse(cartItems)

    Object.values(cartItems).forEach(item =>{
        if(item.tag == productTag){
                total = item.inCart * item.price
                totalInCart = item.inCart
                item.inCart -= 1
                delete cartItems[item.tag]
            }
    })
    
    localStorage.setItem('totalCoast', parseInt(totalCoasts) - total)
    localStorage.setItem('cartNumbers', parseInt(numbersInCart) - parseInt(totalInCart))
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
    element.remove(element)
    
    calculateTotals()
    onLoadCartNumbers()
}

function changeCartNumber(productTag){
    let element = document.getElementById(`product_${productTag}`)
    let cartItems = localStorage.getItem('productsInCart')
    let numbersInCart = localStorage.getItem('cartNumbers')
    let totalCoasts = localStorage.getItem('totalCoast')
    let rawString = element.children[5].textContent
    let rawNumber = rawString.replace(/([R$,])/g, '').slice(0,rawString.length - 5)
    let productPrice = 0

    cartItems = JSON.parse(cartItems)

    Object.values(cartItems).forEach(product => {
        if(product.tag == productTag){
            if(product.inCart < element.children[4].lastElementChild.valueAsNumber){
                productPrice = product.price
                product.inCart += 1

                localStorage.setItem('cartNumbers', parseInt(numbersInCart) + 1)
                localStorage.setItem('totalCoast', parseInt(totalCoasts) + productPrice)
                localStorage.setItem('productsInCart', JSON.stringify(cartItems))
                rawNumber = Number(rawNumber) + Number(productPrice)
                element.children[5].textContent = `R$${Number(rawNumber).toFixed(2)}`
                onLoadCartNumbers()
                calculateTotals()
            }else if(product.inCart > element.children[4].lastElementChild.valueAsNumber && element.children[4].lastElementChild.valueAsNumber !== 0){
                productPrice = product.price
                product.inCart -= 1

                localStorage.setItem('cartNumbers', parseInt(numbersInCart) - 1)
                localStorage.setItem('totalCoast', parseInt(totalCoasts) - productPrice)
                localStorage.setItem('productsInCart', JSON.stringify(cartItems))
                rawNumber = Number(rawNumber) - Number(productPrice)
                element.children[5].textContent = `R$${Number(rawNumber).toFixed(2)}`
                onLoadCartNumbers()
                calculateTotals()
            }else{
                removeItems(productTag)
            }
        }
    })
}

function calculateTotals(){
    let totalCoasts = localStorage.getItem('totalCoast')
    let subTotalContainer = document.querySelector('#total-data')
    let cartItems = localStorage.getItem('productsInCart')

    cartItems = JSON.parse(cartItems)

    if(subTotalContainer){
        subTotalContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            subTotalContainer.innerHTML = `
            <tr>
                <td>Cart Subtotal</td>
                <td>R$ ${totalCoasts},00</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>Free</td>
            </tr>
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>R$ ${totalCoasts},00</strong></td>
            </tr>
            `
        })
    }
}

calculateTotals()
onLoadCartNumbers()
displayCart()