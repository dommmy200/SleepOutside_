import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Function to render the cart contents
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  // Display a message if the cart is empty
  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is currently empty</p>";
    document.querySelector(".cart-footer").classList.add("hide"); // Hide the total if the cart is empty
    return;
  }

  // Map the cart items and generate the HTML
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Calculate and display the cart total
  calculateTotal(cartItems);

  // Add event listeners to the remove buttons after rendering the items
  addRemoveButtonEventListeners();
}

// Function to generate the HTML template for each cart item
function cartItemTemplate(item) {
  if (!item) return "";
  const colorName =
    item.Result.Colors && item.Result.Colors.length > 0
      ? item.Result.Colors[0].ColorName
      : "Color not available";

  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Result.Images.PrimarySmall}" alt="${item.Result.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Result.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${item.Result.Quantity || 1}</p> <!-- Change the quantity if available -->
    <p class="cart-card__price">$${item.Result.FinalPrice}</p>
    <button class="cart-card__remove" data-id="${item.Result.Id}">X</button> 
  </li>`;

  return newItem;
}

// Function to calculate and display the cart total
function calculateTotal(cartItems) {
  const totalElement = document.getElementById("total-amount");
  const cartFooter = document.querySelector(".cart-footer");

  // Initialize total
  let total = 0;

  // Calculate the total price of the items
  cartItems.forEach((item) => {
    total += item.Result.FinalPrice * (item.Result.Quantity || 1); // Assuming each item has 'FinalPrice' and 'Quantity'
  });

  // Display the total
  if (total > 0) {
    totalElement.innerText = total.toFixed(2); // Display the total with 2 decimals
    cartFooter.classList.remove("hide"); // Show the cart footer
  } else {
    cartFooter.classList.add("hide"); // Hide the footer if no items
  }
}

// Function to add event listeners to the remove buttons
function addRemoveButtonEventListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

// Function to remove an individual item from the cart
function removeCartItem(event) {
  const itemId = event.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");

  // Find the first product with the specified ID and remove it
  const itemIndex = cartItems.findIndex((item) => item.Result.Id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1); // Remove only one instance of the product
    setLocalStorage("so-cart", cartItems); // Update the cart in localStorage
  }

  renderCartContents(); // Re-render the cart with the updated items
}

// Initialize the function to render the cart
renderCartContents();
