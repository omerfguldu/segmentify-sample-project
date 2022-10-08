import productData from "../data/product-list.json" assert { type: "json" };

const productObj = { ...productData.responses[0] };
const userCategories = productObj[0].params.userCategories;
const recommendedProducts = productObj[0].params.recommendedProducts;

console.log(userCategories);
console.log(recommendedProducts["Size Özel"]);
