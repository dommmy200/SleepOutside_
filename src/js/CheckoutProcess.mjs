import { getLocalStorage } from "./utils.mjs"; 
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  // Initialize the checkout process by loading the cart and calculating the item total
  init() {
    this.list = getLocalStorage(this.key) || []; // Load the cart items from localStorage
    this.calculateItemSummary(); // Calculate and display the subtotal on page load
  }

  // Calculate and display the item subtotal
  calculateItemSummary() {
    this.itemTotal = this.list.reduce((total, item) => {
      const quantity = item.Result.Quantity || 1;
      return total + (item.Result.FinalPrice * quantity); // Sum the total price of items in the cart
    }, 0);

    // Display the item subtotal in the output section (e.g., '#subtotal')
    document.querySelector(this.outputSelector.subtotal).innerText = this.itemTotal.toFixed(2);
  }

  // Calculate shipping, tax, and total, and display them after ZIP code is entered
  calculateOrderTotal() {
    this.shipping = 10 + (this.list.length - 1) * 2; // $10 for the first item, $2 for each additional item
    this.tax = this.itemTotal * 0.06; // 6% sales tax

    // Calculate the final order total
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    // Display the calculated totals
    this.displayOrderTotals();
  }

  // Display the calculated order totals (subtotal, shipping, tax, total)
  displayOrderTotals() {
    document.querySelector(this.outputSelector.shipping).innerText = this.shipping.toFixed(2);
    document.querySelector(this.outputSelector.tax).innerText = this.tax.toFixed(2);
    document.querySelector(this.outputSelector.total).innerText = this.orderTotal.toFixed(2);
  }

  // Convert the form data into an order object
  formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};

    formData.forEach(function(value, key) {
      convertedJSON[key] = value;
    });

    return convertedJSON;
  }

  // Prepare the items part of the order data
  packageItems(items) {
    return items.map(item => ({
      id: item.Result.Id, // Product ID
      name: item.Result.Name, // Product name
      price: item.Result.FinalPrice, // Product price
      quantity: item.Result.Quantity || 1, // Quantity (default to 1 if not available)
    }));
  }

  // Handle the checkout process (submit the order)
  async checkout(form) {
    const formData = this.formDataToJSON(form); // Convert form data to JSON

    // Prepare the items list
    const items = this.packageItems(this.list);

    // Build the complete order data object
    const orderData = {
      orderDate: new Date().toISOString(),
      fname: formData.fname,
      lname: formData.lname,
      street: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cardNumber: formData.cardNumber,
      expiration: formData.expiration,
      code: formData.securityCode,
      items: items,
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    //console.log("OrderData:", orderData);

    //Send the order data to the server
    const externalServices = new ExternalServices();
    try {
      const response = await externalServices.checkout(orderData); // Submit the order
      console.log("Order Submitted:", response);
    } catch (error) {
      alert("Error submitting order:", error)
    }
  }


}
