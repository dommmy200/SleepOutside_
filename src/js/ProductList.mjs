import { renderWithTemplate } from "./utils.mjs";

// Template function to generate product card HTML using template literals for now
function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.NameWithoutBrand}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">
          ${isDiscounted ? `<span class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>` : ""}
          <span class="${isDiscounted ? "product-card__discount-price" : ""}">$${product.FinalPrice.toFixed(2)}</span>
        </p>
      </a>
    </li>`;
}

// ProductListing class to render the list of product cards
export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      // Fetch products using the category from the URL
      const products = await this.dataSource.getData(this.category);
      //console.log(products)
      this.renderList(products); // Render the product list
    } catch (error) {
      //console.error("Error initializing ProductListing:", error);
    }
    
  }

  // // Filter function for the list of products to show only the four products we need for now
  // filterProducts(products) {
  //   const idsToShow = ["880RR", "985RF", "985PR", "344YJ"]; // I manually replaced with actual IDs from your tents.json

  //   // Filter the products array to only include the items with the specified IDs
  //   return products.filter((product) => idsToShow.includes(product.Id));
  // }

  // This is the method to render the product list using the utility function
  renderList(products) {
    // Using the utility function with the productCardTemplate and the listElement
    renderWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", true);
  }
}
