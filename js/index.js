import productData from "../data/product-list.json" assert { type: "json" };

// SplideJS kutuphanesini kullanarak olusturulan slider icin gerekli ayarlamalarin yapilmasi ve mount edilmesi
const splide = new Splide(".splide", {
  type: "slide",
  gap: "20px",
  perPage: 3,
  start: 0,
  perMove: 1,
  arrows: true,
  pagination: false,
  lazyLoad: "nearby",
});
splide.mount();

const productObj = { ...productData.responses[0] };
const userCategories = productObj[0].params.userCategories; // kategorilerin tutuldugu degisken
const recommendedProducts = productObj[0].params.recommendedProducts; // json da yer alan tum urunleri kapsayan degerleri tutan degisken
const categoriesList = document.querySelector(".categories");
const productListContainer = document.querySelector(".product-list-container");
const addToCartPopup = document.querySelector(".add-to-cart-popup");
const closeIcon = document.querySelector(".close-icon");

// "Ev, Dekorasyon, Bahçe > Mobilya" seklinde gelen kategorileri duzenleyip "Mobilya" haline getirerek aktardigimiz dizi
let editedUserCategories = userCategories.map((category) => {
  const categoryArr = category.split(">");
  return categoryArr[categoryArr.length - 1];
});
let categoriesListItems;
let addToCartButtons;

// kategoriler arasindan secilen kategoriye active classini eklemek ve secili kategoriye ait urunlerin listelenmesini saglamak icin gerekli fonksiyon cagrisini yapan fonksiyon
function onCategory(e, i) {
  categoriesListItems.forEach((item) => {
    item.classList.remove("active");
  });
  e.target.classList.toggle("active");
  showSelectedCategory(recommendedProducts[userCategories[i]]);
}

// secili kategoriye ait urunleri bir dizi halinde parametre olarak aldiktan sonra urunlerin yer alacagi kapsayici icine her urunun eklenmesini gerceklestiren fonksiyon
function showSelectedCategory(categoryProducts) {
  productListContainer.innerHTML = ``;
  const { add } = splide.Components.Slides;
  categoryProducts.forEach((category) => {
    const divEl = document.createElement("div");
    divEl.classList.add("product-container");
    divEl.innerHTML = `
      <img data-splide-lazy=${category.image} alt="Product Image" />
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

  // product cardlarda yer alan Sepete Ekle butonlarina tiklanma aninda gerceklesecek fonksiyonun atamasinin yapilmasi
  addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCart);
  });
}

// Sepete Ekle butonuna tiklandiginda bilgilendirici popupin 2 saniyeligine gorunerek kaybolmasini saglayan fonksiyon
function onAddToCart() {
  addToCartPopup.style.opacity = "1";
  setTimeout(() => {
    addToCartPopup.style.opacity = "0";
  }, 2000);
}

// Popupta yer alan kapatma butona basildiginda popupin gorunurlugunu 0 yapan fonksiyon
function onClose() {
  addToCartPopup.style.opacity = "0";
}

// sayfa acilisinda 'Size Ozel' kategorisine ait urunlerin getirilmesi
showSelectedCategory(recommendedProducts[`Size Özel`]);

closeIcon.addEventListener("click", onClose);

// kategori menusunde yer alacak kategorilerin dinamik olarak DOM'a eklenmesi.
editedUserCategories.map((category, index) => {
  const liEl = document.createElement("li");
  liEl.classList.add("category-list");
  liEl.innerHTML = `
    <a class="category-list-item">${category}</a>
  `;
  index === 0 ? liEl.classList.add("active") : "";
  categoriesList.append(liEl);
});

// DOM'a eklenen kategorileri tutan li elementlerine click eventlerinin eklenmesi
categoriesListItems = document.querySelectorAll(".category-list");
categoriesListItems.forEach((item, index) => {
  item.addEventListener("click", (event) => onCategory(event, index));
});
