import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";

// Create an instance of ExternalServices with the category 'tents'
const dataSource = new ExternalServices("tents");

// Select the HTML element where the product list will be rendered
const listElement = document.getElementById("product-list");

// Create an instance of the ProductListing class
const productListing = new ProductListing("tents", dataSource, listElement);

// Initialize the ProductListing to fetch data and render the product list
productListing.init();
