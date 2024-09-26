// ProductDetails.mjs

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId; // Store the product ID
    this.product = {}; // Initialize an empty product object
    this.dataSource = dataSource; // Reference to the data source
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId); // Fetch product details
    this.renderProductDetails(); // Render product details
  }

  addToCart() {
    const cartItems = JSON.parse(localStorage.getItem("so-cart")) || []; // Get current cart or initialize an empty array
    cartItems.push(this.product); // Add the current product to cart
    localStorage.setItem("so-cart", JSON.stringify(cartItems)); // Save updated cart
    //console.log("Product added to cart:", this.product);
    //console.log("Current Cart (localStorage):", cartItems);
  }

  renderProductDetails() {
    const productContainer = document.getElementById("product-detail"); // Assume you have an element with this ID
    if (this.product) {
      productContainer.innerHTML = `
        <img
          src="${this.product.Image}"
          alt="${this.product.Name}"
        />
        <h1>${this.product.Name}</h1>
        <p>${this.product.DescriptionHtmlSimple}</p>
        <p>Price: $${this.product.FinalPrice}</p>
        <button id="addToCart">Add to Cart</button>
      `;

      // Add event listener for the Add to Cart button
      document
        .getElementById("addToCart")
        .addEventListener("click", () => this.addToCart());
    } else {
      productContainer.innerHTML = "<p>Product not found.</p>";
    }
  }
}
