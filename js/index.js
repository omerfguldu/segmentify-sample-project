import productData from "../data/product-list.json" assert { type: "json" };

const splide = new Splide(".splide", {
  type: "slide",
  gap: "20px",
  perPage: 3,
  start: 0,
  perMove: 1,
  arrows: true,
  pagination: false,
});
splide.mount();

const productObj = { ...productData.responses[0] };
const userCategories = productObj[0].params.userCategories;
const recommendedProducts = productObj[0].params.recommendedProducts;
const productListContainer = document.querySelector(".product-list-container");
const addToCartPopup = document.querySelector(".add-to-cart-popup");
const closeIcon = document.querySelector(".close-icon");
let selectedCategory = "Size Özel";
let editedUserCategories = userCategories.map((category) => {
  const categoryArr = category.split(">");
  return categoryArr[categoryArr.length - 1];
});
let categoriesList;
let categoriesListItems;
let addToCartButtons;

console.log(recommendedProducts);

showSelectedCategory(recommendedProducts[`Size Özel`]);

categoriesList = document.querySelector(".categories");
editedUserCategories.map((category, index) => {
  const liEl = document.createElement("li");
  liEl.classList.add("category-list");
  liEl.innerHTML = `
    <a class="category-list-item">${category}</a>
  `;
  index === 0 ? liEl.classList.add("active") : "";
  categoriesList.append(liEl);
});

categoriesListItems = document.querySelectorAll(".category-list");
categoriesListItems.forEach((item, index) => {
  item.addEventListener("click", (event) => onCategory(event, index));
});

function onCategory(e, i) {
  categoriesListItems.forEach((item) => {
    item.classList.remove("active");
  });
  e.target.classList.toggle("active");
  selectedCategory = e.target.textContent.trim();
  showSelectedCategory(recommendedProducts[userCategories[i]]);
}

function showSelectedCategory(categoryProducts) {
  productListContainer.innerHTML = ``;
  const { add } = splide.Components.Slides;
  categoryProducts.forEach((category, index) => {
    const divEl = document.createElement("div");
    divEl.classList.add("splide__slide");
    divEl.classList.add("product-container");
    divEl.setAttribute("id", `splide01-slide0${index + 1}`);
    divEl.innerHTML = `
      <img src="${category.image}" alt="aneirin" />
      <p class="product-title">${category.name}</p>
      <div class="price-container">
        <p class="price-text">${category.priceText}</p>
      </div>
      <div class="cargo-container ${
        category.params.shippingFee !== "FREE" ? "hidden" : ""
      }">
        <i class="fa-solid fa-truck"></i>
        <p>Ücretsiz Kargo</p>
      </div>
      <button class="addToCart">Sepete Ekle</button>
    `;
    add(divEl);
  });
  addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCart);
  });
}

function onAddToCart() {
  addToCartPopup.style.opacity = "1";
  setTimeout(() => {
    addToCartPopup.style.opacity = "0";
  }, 2000);
}

closeIcon.addEventListener("click", onClose);
function onClose() {
  addToCartPopup.style.opacity = "0";
}
