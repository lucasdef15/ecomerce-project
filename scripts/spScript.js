const addCart = document.querySelector("#add-cart");
singlePageProducts = [];

products.map((product) => {
  singlePageProducts.push({
    name: product.name,
    price: product.price,
    tag: product.tag,
    inCart: product.inCart,
  });
});

addCart.addEventListener("click", () => {
  let productName = document.querySelector("#product-name");
  let element = document.getElementById("inputNumber");
  let quantityAsNUmber = element.valueAsNumber;
  singlePageProducts.forEach((product) => {
    if (productName.textContent == product.name) {
      cartNumbers(product, quantityAsNUmber);
      totalCoast(product, quantityAsNUmber);
    }
  });
});

function randomProduct(array) {
  return array[Math.floor(Math.random() * array.length)];
}

let displayedProducts = new Set();

function displayProducts() {
  let pro = document.querySelector(".pro-container");
  pro.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    let random = randomProduct(singlePageProducts);
    if (!displayedProducts.has(random)) {
      displayedProducts.add(random);
      pro.innerHTML += `
          <div class="pro">
              <img src="../img/Products/${random.tag}.png" onclick="window.location.href='../singlePage/sp${random.tag}.html'">
              <div class="description">
                  <h5>${random.name}</h5>
                  <div class="star">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                  </div>
                  <h4>R$${random.price},00</h4>
              </div>
              <a href="#"><i class="fa-sharp fa-solid fa-cart-plus cart"></i><a>
          </div>
        `;
    } else {
      i--;
    }
  }
}

function cartNumbers(product, quantity) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + quantity);
    let cartCount = document.querySelectorAll(".cart-count");
    cartCount.forEach((cart) => {
      cart.textContent = productNumbers + quantity;
    });
  } else {
    localStorage.setItem("cartNumbers", quantity);
    let cartCount = document.querySelectorAll(".cart-count");
    cartCount.forEach((cart) => {
      cart.textContent = quantity;
    });
  }
  setItems(product, quantity);
}
function setItems(product, quantity) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += quantity;
  } else {
    product.inCart = quantity;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCoast(product, quantity) {
  let cartCost = localStorage.getItem("totalCoast");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCoast", cartCost + product.price * quantity);
  } else {
    localStorage.setItem("totalCoast", product.price * quantity);
  }
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (cartNumbers) {
    let cartNumbers = document.querySelectorAll(".cart-count");
    cartNumbers.forEach((cartNumber) => {
      cartNumber.textContent = productNumbers;
    });
  }
}

onLoadCartNumbers();
displayProducts();
