import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const productId = getParams("product"); // Get the product ID from the URL
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource); // Create an instance of ProductDetails
product.init(); // Initialize to fetch product details and render them

// function addProductToCart(product) {
//   let cartItems = getLocalStorage("so-cart") || []; // get current cart or initialize an empty array
//   cartItems.push(product); // add new product to cart
//   setLocalStorage("so-cart", cartItems); // save updated cart

//   //console.log("Product added to cart:", product);
//   //console.log("Current Cart (localStorage):", getLocalStorage("so-cart"));
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);