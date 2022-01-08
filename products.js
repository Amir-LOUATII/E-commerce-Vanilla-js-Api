import { getElement } from "./javaScript/utils.js";
import { getData } from "./javaScript/getData.js";
import { displayProducts } from "./javaScript/displayProducts.js";
import { searchFilter } from "./javaScript/searchFilter.js";
import { categoriesFilter } from "./javaScript/categories.js";
import { priceFilter } from "./javaScript/priceFilter.js";
import { CartUnit } from "./javaScript/cart/addToCart.js";

// select item
const url = "https://fakestoreapi.com/products";
const products = getElement(".product-content");

window.addEventListener("DOMContentLoaded", async function () {
  const data = await getData(url);
  displayProducts(data, products);
  searchFilter(data);
  categoriesFilter(data);
  priceFilter(data);
  CartUnit();
});
