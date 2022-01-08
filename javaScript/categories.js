import { displayProducts } from "./displayProducts.js";
import { priceFilter } from "./priceFilter.js";
import { searchFilter } from "./searchFilter.js";
import { getElement } from "./utils.js";

// select item
const products = getElement(".product-content");
function categoriesFilter(data) {
  // getting categories
  displayCategories(data);
  //   select categories
  const categoriesBtn = displayCategories(data);
  // category filter start

  categoriesBtn.forEach((it) => {
    it.addEventListener("click", function (e) {
      // getting category from each btn
      const category = e.currentTarget.dataset.category;

      //   add active class to active btn
      categoriesBtn.forEach((cat) => {
        cat.classList.add("active");
        if (cat !== e.currentTarget) {
          cat.classList.remove("active");
        }
      });
      //   filter data with category
      const filtredData = data.filter((item) => {
        return item.category.startsWith(category);
      });
      //   display filtred data
      displayProducts(filtredData, products);
      // add serach filter
      searchFilter(filtredData);
      priceFilter(filtredData);
      // add price filter
      if (category === "All") {
        displayProducts(data, products);
        searchFilter(filtredData);
        priceFilter(data);
      }
    });
  });
  //   categories filer end
}

function displayCategories(data) {
  let category = data.map((item) => {
    return item.category;
  });
  category = Array.from(new Set(category));
  category = category.sort();
  category.unshift("All");

  const cat = getElement(".categories");
  cat.innerHTML = category
    .map((item, index) => {
      let active = "";
      if (index === 0) {
        active = "active";
      }
      return `<li class="list-group-item border-0 text-muted ${active} cate" data-category=${item}>
    ${capitalize(item)}
  </li>`;
    })
    .join("");
  return document.querySelectorAll(".cate");
}

function capitalize(myString) {
  let myArr = [...myString];
  myArr[0] = myArr[0].toUpperCase();
  return `${myArr[0]}${myString.slice(1)}`;
}
export { categoriesFilter };
