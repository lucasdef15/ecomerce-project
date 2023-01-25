const dataTable = document.getElementById('table')

let products = []

function addProduct(){
    
    let index = products.length

    let newProduct = {
        name: localStorage.getItem('name'),
        price: localStorage.getItem('price'),
        number: localStorage.getItem('number'),
    }

    let total = newProduct.price * newProduct.number

    products.push(newProduct)

    let html = `
        <tr>
            <td>
            <a onclick="deleteProduct(${index})"><i class="far fa-times-circle"></i></a>
            </td>
            <td><img src="./img/Products/f1.jpg" alt=""></td>
            <td>${newProduct.name}</td>
            <td>$${newProduct.price}.00</td>
            <td><input type="number" value="${newProduct.number}"></td>
            <td>$${total}</td>
        </tr>`

    const tbody = document.createElement('tbody');
    tbody.id = `product_${index}`
    tbody.innerHTML = html
    dataTable.append(tbody)
}

function deleteProduct(index){
    const element = document.getElementById(`product_${index}`)
    products = products.filter((player, id) => index != id)
    element.parentNode.removeChild(element)
}