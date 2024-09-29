import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Función para renderizar los contenidos del carrito
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is currently empty</p>";
    return;
  }

  // Mapear los items del carrito y generar el HTML
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Añadir oyentes a los botones de eliminar después de renderizar los items
  addRemoveButtonEventListeners();
}

// Función para generar la plantilla HTML de cada item del carrito
function cartItemTemplate(item) {
  if (!item) return "";
  const colorName = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "Color not available";

  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="cart-card__remove" data-id="${item.Id}">X</button> 
  </li>`;

  return newItem;
}

// Función para añadir oyentes de eventos a los botones de eliminación
function addRemoveButtonEventListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

// Función para eliminar un item del carrito individualmente
function removeCartItem(event) {
  const itemId = event.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");

  // Encontrar el primer producto con el ID especificado y eliminarlo
  const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1); // Eliminar solo una instancia del producto
    setLocalStorage("so-cart", cartItems); // Actualizar el carrito en localStorage
  }

  renderCartContents(); // Volver a renderizar el carrito con los items actualizados
}

// Inicializa la función para renderizar el carrito
renderCartContents();
