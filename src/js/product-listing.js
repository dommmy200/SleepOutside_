import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

// Display the category name
const categoryNameElement = document.getElementById("category-name");
categoryNameElement.innerText =
  "Top Products: " + category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter

// Create an instance of ProductData with the category 'tents'
const dataSource = new ProductData();

// Select the HTML element where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductListing class and send it the correct information.
const productListing = new ProductListing(category, dataSource, listElement);

// Initialize the ProductListing to fetch data and render the product list
productListing.init();
