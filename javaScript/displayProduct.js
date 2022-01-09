import { formatPrice, getElement } from "./utils.js";
import { addToCart } from "./cart/addToCart.js";

function displayProduct(product) {
  const { title, price, description, image, id } = product;
  const bread = getElement(".target");
  bread.textContent = `${title}`;
  const prod = getElement(".prod");
  prod.innerHTML = `  <div class="col-12 col-lg-6 px-3">
  <div>
    <img
      src=${image}
      alt="Product images"
      class="img-fluid thumbnail"
    />
  </div>
</div>
<div class="col-12 col-lg-6 px-3">
  <h1 class="h4 fw-bold">${title}</h1>
  <p class="text-muted fs-4">${formatPrice(price)}</p>
  <p class="product-description">
   ${description}
  </p>
  <div class="btn-group d-inline-flex mt-3">
    <button class="btn btn-primary minus">
      <i class="bi bi-dash-lg"></i>
    </button>
    <button class="btn btn-light "><span class='prod-amount'> 0</span></button>
    <button type="button" class="btn btn-primary plus">
      <i class="bi bi-plus-lg"></i>
    </button>
  </div>

  <button class="btn btn-primary d-inline-block ms-3 add-cart mt-3"data-id=${id}
  data-bs-toggle="offcanvas"
  data-bs-target="#cart"
  aria-controls="offcanvasRight">
    <i class="bi bi-cart me-3"  
    ></i>Add To Cart
  </button>
</div>`;
  // select buttons
  const plusBtn = getElement(".plus");
  const minusBtn = getElement(".minus");
  const amountBtn = getElement(".prod-amount");
  const addBtn = getElement(".add-cart");

  // icrease amount
  plusBtn.addEventListener("click", function () {
    amountBtn.textContent++;
  });
  // decrease amount
  minusBtn.addEventListener("click", function () {
    amountBtn.textContent--;
    if (amountBtn.textContent < 0) {
      amountBtn.textContent = 0;
    }
  });

  // add to cart
  addBtn.addEventListener("click", function (e) {
    const amount = parseInt(amountBtn.textContent);
    if (amount) {
      const id = e.currentTarget.dataset.id;
      addToCart(id, amount);
      amountBtn.textContent = 0;
    }
  });
}

export { displayProduct };
