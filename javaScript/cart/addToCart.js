import {
  formatPrice,
  getElement,
  getLocalStorage,
  setLocalStorage,
} from "../utils.js";
// select item

function addToCart(id, amt) {
  // get the cart from loacal storage
  let cart = getLocalStorage("cart");
  // look for the product in the cart with his id
  const item = cart.find((cartItem) => cartItem.id == id);
  // case:product is't in the cart
  if (!item) {
    // getting product from the store
    const prod = findProduct(id);
    const product = { amount: amt, ...prod };
    // adding prodcut to cart
    cart.push(product);
    // adding product to the DOM
    addToCartDOM(product);
    increaseCart();
    decreaseCart();

    // update cart inj the localstorage
    setLocalStorage("cart", cart);
    // update the count and total
    cartCount();
    cartTotal();
  }
  // case that the item is in the cart
  else if (item) {
    // update ythe amount in the cart
    item.amount += amt;
    const cartAmount = document.querySelectorAll(".cart-amount");
    // update amount in theDOM
    if (cartAmount.length > 0) {
      cartAmount.forEach((amount) => {
        if (amount.dataset.id == item.id) {
          amount.textContent = parseFloat(amount.textContent) + amt;
        }
      });
    }
    // update cart localstorage
    setLocalStorage("cart", cart);
    cartCount();
    cartTotal();
  }
}

// find product in the store
function findProduct(id) {
  let store = getLocalStorage("store");

  const product = store.find((item) => item.id == id);
  return product;
}

// cart count
function cartCount() {
  const cart = getLocalStorage("cart");
  const countIcon = getElement(".count-icon");
  if (cart.length > 0) {
    const amount = cart.reduce((accu, curr) => {
      accu += curr.amount;

      return accu;
    }, 0);

    countIcon.textContent = amount;
  } else {
    countIcon.textContent = "0";
  }
}

// cart total
function cartTotal() {
  const cart = getLocalStorage("cart");
  const total = getElement(".cart-footer");
  const checkout = getElement(".checkout");
  if (cart.length > 0) {
    total.classList.remove("hide");
    checkout.classList.remove("hide");
    const theTotal = cart.reduce((accu, curr) => {
      accu += parseFloat(curr.price) * parseFloat(curr.amount);
      return accu;
    }, 0);

    total.innerHTML = `Total: ${formatPrice(theTotal)}`;
  } else {
    total.classList.add("hide");
    checkout.classList.add("hide");
  }
}

// add prodcut to cartDOM
function addToCartDOM(product) {
  // remove empty msg
  const emptyMsg = getElement(".cart-emty-msg");
  emptyMsg.classList.add("hide");
  const { title, id, amount, image, price } = product;
  const article = document.createElement("article");
  article.setAttribute("data-id", id);
  article.classList.add(
    "row",
    "justify-content-start",
    "align-items-center",
    "border",
    "border-3",
    "border-top-0",
    "border-start-0",
    "border-end-0"
  );
  article.innerHTML = `     <div class="col-4">
  <img src=${image} alt="Product ${title}" class="img-fluid" />
</div>
<div
  class="col-8 ps-2 align-items-end d-flex justify-content-between align-items-center"
>
  <div class="text d-inline-block">
    <h1 class="fs-5 product-name-cart mb-0">${title}</h1>
    <p class="text-muted mb-1 cart-price">${formatPrice(price)}</p>
    <span class="fs-6 fw-bold text-decoration-underline remove" data-id=${id}
      >Remove</span
    >
  </div>
  <div
    class="flex-column d-inline-flex justify-content-center align-items-end"
  >
    <button
      type="button"
      class="d-flex justify-content-center align-items-center text-primary btn cart-increase"
     data-id=${id}>
      <i class="bi bi-chevron-compact-up"></i>
    </button>
    <button
      type="button"
      class="d-flex justify-content-center align-items-center btn cart-amount"
     data-id=${id}>
      ${amount}
    </button>
    <button
      type="button"
      class="d-flex justify-content-center align-items-center btn text-primary cart-decrease"
    data-id=${id}>
      <i class="bi bi-chevron-compact-down"></i>
    </button>
  </div>
</div>`;
  const cartContent = getElement(".cart-content");
  cartContent.appendChild(article);
  // select btns
  removeItem();
}

// remove item from the cart
function removeItem() {
  const removeBtns = document.querySelectorAll(".remove");
  if (removeBtns.length > 0) {
    removeBtns.forEach((remove) => {
      remove.addEventListener("click", function (e) {
        const id = e.currentTarget.dataset.id;
        // remove item from the DOM
        e.currentTarget.parentElement.parentElement.parentElement.remove();
        // remove item from the local storage
        let cart = getLocalStorage("cart");
        const cartRemove = cart.filter((item) => {
          return item.id != id;
        });
        setLocalStorage("cart", cartRemove);
        if (cartRemove.length < 1) {
          const emtyMsg = getElement(".cart-emty-msg");
          emtyMsg.classList.remove("hide");
          cartCount();
        }
        // update count and total values
        cartCount();
        cartTotal();
      });
    });
  }
}

// icrease cart
function increaseCart() {
  const increaseBtns = document.querySelectorAll(".cart-increase");
  if (increaseBtns) {
    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        let cart = getLocalStorage("cart");
        const id = e.currentTarget.dataset.id;
        const item = cart.find((item) => item.id == id);
        item.amount++;
        const cartAmount = document.querySelectorAll(".cart-amount");

        if (cartAmount.length > 0) {
          cartAmount.forEach((amount) => {
            if (amount.dataset.id == id) {
              amount.textContent++;
            }
          });
        }
        setLocalStorage("cart", cart);
        cartCount();
        cartTotal();
      });
    });
  }
}
function decreaseCart() {
  const increaseBtns = document.querySelectorAll(".cart-decrease");
  if (increaseBtns) {
    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        let cart = getLocalStorage("cart");
        const id = e.currentTarget.dataset.id;
        const item = cart.find((item) => item.id == id);
        item.amount--;
        if (item.amount < 1) {
          item.amount = 1;
        }
        const cartAmount = document.querySelectorAll(".cart-amount");

        if (cartAmount.length > 0) {
          cartAmount.forEach((amount) => {
            if (amount.dataset.id == id) {
              amount.textContent--;
              if (amount.textContent < 1) {
                amount.textContent = 1;
              }
            }
          });
        }
        setLocalStorage("cart", cart);
        removeItem();
        cartCount();
        cartTotal();
      });
    });
  }
}

//cart
function CartUnit() {
  const cart = getLocalStorage("cart");
  cartCount();
  cartTotal();
  cart.forEach((item) => addToCartDOM(item));
  removeItem();
  increaseCart();
  decreaseCart();
}
export { addToCart, CartUnit };
