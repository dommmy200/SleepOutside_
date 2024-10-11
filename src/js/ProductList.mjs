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
    this.product = []; //Guardar la lista de productso para ordenarlos
  }

  async init() {
    try {
      const products = await this.dataSource.getData(this.category);
      this.products = products; // Guardar productos en una variable de la clase
      this.renderList(products); // Renderizar la lista
    } catch (error) {
      //console.error("Error initializing ProductListing:", error);
      throw new Error("Error initializing ProductListing:", error)
    }
  }

  // Método para ordenar la lista de productos por nombre o precio
  sortList(criteria) {
    let sortedList;
    if (criteria === "name") {
      sortedList = [...this.products].sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (criteria === "price") {
      sortedList = [...this.products].sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    return sortedList;
  }

  filterList(query) {
    return this.products.filter(product =>
      product.Name.toLowerCase().includes(query)
    );
  }

  // This is the method to render the product list using the utility function
  renderList(products) {
    // Using the utility function with the productCardTemplate and the listElement
    renderWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", true);
  }
}
