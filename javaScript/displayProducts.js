import { addToCart } from "./cart/addToCart.js";
import { getElement } from "./utils.js";
import { formatPrice } from "./utils.js";

function displayProducts(data, section) {
  const html = data
    .map((item) => {
      const { title, id, price, image } = item;
      return `    <div class="col-12 col-md-6 col-lg-4 ">
      <div class="card shadow features-card" data-id=${id}>
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="card-img-top ">
            <img
              class="card-img-top img-fluid "
              src=${image}
              alt=${title}
            />
          </div>
          <div
            class="card-title text-center h5 fw-normal text-muted mt-"
          >
            ${title}
          </div>
          <div class="card-text text-center">
            <span class="h4 text-center">${formatPrice(price)}</span>
          </div>
        </div>
        <div class="features-icons">
          <div
            class="f-icons d-flex justify-content-between align-items-center"
          >
            <span
              class="tt addBtn"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Add to cart"
              data-id=${id}
              ><i class="bi bi-cart-plus rounded-circle me-4 "   
              data-bs-toggle="offcanvas"
              data-bs-target="#cart"
              aria-controls="offcanvasRight"></i>
            </span>
            <span
              class="tt"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Search product"
              ><a href="product.html?id=${id}"
                ><i class="bi bi-search rounded-circle ms-4"></i
              ></a>
            </span>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
  section.innerHTML = html;
  const addBtns = document.querySelectorAll(".addBtn");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const id = e.currentTarget.dataset.id;
      e.preventDefault();
      console.log(e.currentTarget);
      if (id) {
        addToCart(id, 1);
      }
    });
  });
}

export { displayProducts };
