import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from "./utils.mjs";
import Alert from "./alert";


const category = getParams("category");

// Display the category name
const categoryNameElement = document.getElementById("category-name");
categoryNameElement.innerText =
  "Top Products: " + category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter

// Create an instance of ExternalServices with the category 'tents'
const dataSource = new ExternalServices();

// Select the HTML element where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductListing class and send it the correct information.
const productListing = new ProductListing(category, dataSource, listElement);

// Initialize the ProductListing to fetch data and render the product list
productListing.init();

fetch("/json/alertmessage.json")
  .then((response) => response.json())
  .then((data) => {
    Alert.createAlertsFromJson(data);
  })
  .catch((error) => console.error("Error Loading Alerts:", error));
