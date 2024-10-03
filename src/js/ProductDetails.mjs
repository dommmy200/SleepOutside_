export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId; // Store the product ID
    this.product = {}; // Initialize an empty product object
    this.dataSource = dataSource; // Reference to the data source
  }

  
  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      //console.log("Fetched product details:", this.product); // Log the fetched product details
      if (this.product) {
        this.renderProductDetails(); 
      } else {
        //console.error("Product not found.");
      }
    } catch (error) {
      //console.error("Error fetching product:", error); 
    }
  }

  addToCart() {
    const cartItems = JSON.parse(localStorage.getItem("so-cart")) || []; // Get current cart or initialize an empty array
    const existingProductIndex = cartItems.findIndex(item => item.Result.Id === this.product.Result.Id); // Check if product exists
  
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increase its quantity
      cartItems[existingProductIndex].Result.Quantity = (cartItems[existingProductIndex].Result.Quantity || 1) + 1;
    } else {
      // If product does not exist, add it to the cart
      this.product.Result.Quantity = 1;
      cartItems.push(this.product); 
    }
  
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
  
    // Dispatch a custom event to notify the cart count has been updated
    window.dispatchEvent(new Event("cartUpdated"));
  }

  

  renderProductDetails() {
    const productContainer = document.getElementById("product-detail");
  
    if (this.product.Result) {
      // Extract relevant fields from the product
      const imageUrl = this.product.Result.Images.PrimaryLarge || "default-image.jpg"; // Use PrimaryLarge image
      const productName = this.product.Result.Name || "No Product Name";
      const description = this.product.Result.DescriptionHtmlSimple || "No description available.";
      const finalPrice = this.product.Result.FinalPrice ? this.product.Result.FinalPrice.toFixed(2) : "N/A";
      const suggestedRetailPrice = this.product.Result.SuggestedRetailPrice ? this.product.Result.SuggestedRetailPrice.toFixed(2) : null;
      const isDiscounted = this.product.Result.FinalPrice < this.product.Result.SuggestedRetailPrice;
  
      // Render the product details HTML
      productContainer.innerHTML = `
        <img
          src="${imageUrl}"
          alt="${productName}"
        />
        <h1>${productName}</h1>
        <p>${description}</p>
        
        <p>
          <!-- Show original price crossed out if there's a discount -->
          ${isDiscounted && suggestedRetailPrice ? `<span class="product-card__original-price">$${suggestedRetailPrice}</span>` : ""}
          <!-- Show the final price -->
          <span class="${isDiscounted ? "product-card__discount-price" : ""}">$${finalPrice}</span>
        </p>
        
        <button id="addToCart">Add to Cart</button>
      `;
  
      // Add event listener for the "Add to Cart" button
      document.getElementById("addToCart").addEventListener("click", () => this.addToCart());
    } else {
      productContainer.innerHTML = "<p>Product not found.</p>";
    }
  }
  
}
