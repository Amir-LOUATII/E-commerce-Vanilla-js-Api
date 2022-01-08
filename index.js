// global input
import "./javaScript/tooltips.js";
// spefic import
import { getElement, setLocalStorage } from "./javaScript/utils.js";
import { getData } from "./javaScript/getData.js";
import { displayProducts } from "./javaScript/displayProducts.js";
import { CartUnit } from "./javaScript/cart/addToCart.js";

// select item
const features = getElement(".features-content");
const url = "https://fakestoreapi.com/products";

window.addEventListener("DOMContentLoaded", async function () {
  const data = await getData(url);
  setLocalStorage("store", data);
  const myData = data.filter((item) => {
    return item.id < 4;
  });
  displayProducts(myData, features);
  CartUnit();
});
