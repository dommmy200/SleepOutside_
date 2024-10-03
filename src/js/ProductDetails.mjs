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

    // Dispatch a custom event to notify the cart count has been updated
    window.dispatchEvent(new Event("cartUpdated"));
  }

  

  renderProductDetails() {
    const productContainer = document.getElementById("product-detail");

    if (this.product) {
      // Check if the product is discounted
      const isDiscounted = this.product.FinalPrice < this.product.SuggestedRetailPrice;

      // Generate the HTML for product details
      productContainer.innerHTML = `
        <img
          src="${this.product.Image}"
          alt="${this.product.Name}"
        />
        <h1>${this.product.Name}</h1>
        <p>${this.product.DescriptionHtmlSimple}</p>
        
        <p>
          <!-- Show original price crossed out if there's a discount -->
          ${isDiscounted ? `<span class="product-card__original-price">$${this.product.SuggestedRetailPrice.toFixed(2)}</span>` : ""}
          <!-- Show the discounted price -->
          <span class="${isDiscounted ? "product-card__discount-price" : ""}">$${this.product.FinalPrice.toFixed(2)}</span>
        </p>
        
        <button id="addToCart">Add to Cart</button>
      `;

      // Add event listener for the "Add to Cart" button
      document
        .getElementById("addToCart")
        .addEventListener("click", () => this.addToCart());
    } else {
      productContainer.innerHTML = "<p>Product not found.</p>";
    }
  }
}
