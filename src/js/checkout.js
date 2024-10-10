import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"; 


async function init() {
  // Load the header and footer
  await loadHeaderFooter();
  // Aquí puedes agregar cualquier otro código específico para la página de checkout
}

// Call the init function
init();


// checkout.js

// Initialize the CheckoutProcess with key 'so-cart' and output selectors
const checkout = new CheckoutProcess("so-cart", {
  subtotal: "#subtotal",
  shipping: "#shipping",
  tax: "#tax",
  total: "#total"
});

checkout.init(); // Initialize the process to calculate the item subtotal

// Add an event listener for ZIP code input to trigger the order total calculation
document.getElementById("zip").addEventListener("input", (event) => {
  const zipCode = event.target.value;

  // If ZIP code has 5 digits, calculate shipping, tax, and total
  if (zipCode.length === 5) { 
    checkout.calculateOrderTotal();
  } else if (zipCode === "") { 
    document.querySelector(checkout.outputSelector.shipping).innerText = "0.00";
    document.querySelector(checkout.outputSelector.tax).innerText = "0.00";
    document.querySelector(checkout.outputSelector.total).innerText = "0.00";
  }
});

// Handle form submission for checkout
document.getElementById("checkout-form").addEventListener("submit", (event) => {
  event.preventDefault(); 

  checkout.checkout(event.target); // Call checkout with the form element
});
