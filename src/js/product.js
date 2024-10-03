import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Get the product ID from the URL
const productId = getParams("product");
//console.log("Product ID from URL:", productId); // Log the product ID

if (productId) {
  const dataSource = new ProductData();
  const product = new ProductDetails(productId, dataSource); // Create an instance of ProductDetails
  product.init(); // Initialize to fetch product details and render them
} else {
  //console.error("No product ID found in the URL.");
}
