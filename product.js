// global input
import "./javaScript/tooltips.js";
// specific import
import { getData } from "./javaScript/getData.js";
import { displayProduct } from "./javaScript/displayProduct.js";
import { CartUnit } from "./javaScript/cart/addToCart.js";
import { getElement } from "./javaScript/utils.js";

window.addEventListener("DOMContentLoaded", async function () {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("id")) {
    const id = searchParams.get("id");
    const url = `https://fakestoreapi.com/products/${id}`;
    const product = await getData(url).finally(() => {
      const loader = getElement(".product-loader");
      loader.classList.add("hide");
    });
    displayProduct(product);
    CartUnit();
  }
});
