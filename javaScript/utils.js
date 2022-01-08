// getelement
const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(`There is no such element: ${selection}, please check`);
};

// set item  to localstorage
function setLocalStorage(key, value) {
  const theValue = JSON.stringify(value);
  window.localStorage.setItem(key, theValue);
}

// get item form local storage

function getLocalStorage(key) {
  const element = JSON.parse(window.localStorage.getItem(key));
  if (element) {
    return element;
  } else return [];
}

function formatPrice(price) {
  const thePrice = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(price.toFixed(2));
  return thePrice;
}
export { getElement, setLocalStorage, getLocalStorage, formatPrice };
