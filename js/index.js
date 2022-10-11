import productData from "../data/product-list.json" assert { type: "json" };

const productObj = { ...productData.responses[0] };
const userCategories = productObj[0].params.userCategories;
const recommendedProducts = productObj[0].params.recommendedProducts;
let selectedCategory = "Size Özel";

let editedUserCategories = userCategories.map((category) => {
  const categoryArr = category.split(">");
  return categoryArr[categoryArr.length - 1];
});

console.log(userCategories);
console.log(recommendedProducts["Size Özel"]);

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

const categoriesList = document.querySelector(".categories");
editedUserCategories.map((category, index) => {
  const liEl = document.createElement("li");
  liEl.classList.add("category-list");
  liEl.innerHTML = `
    <a class="category-list-item">${category}</a>
  `;
  index === 0 ? liEl.classList.add("active") : "";
  categoriesList.append(liEl);
});

const categoriesListItems = document.querySelectorAll(".category-list");
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
  console.log(categoryProducts);
}
