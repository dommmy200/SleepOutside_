import { getLocalStorage, setLocalStorage, renderWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
    constructor() {
        this.cartItems = getLocalStorage("so-cart") || [];
        this.cartElement = document.querySelector(".product-list");
        this.footerElement = document.querySelector(".cart-footer");
    }

    init() {
        this.renderCartContents();
    }

    renderCartContents() {
        if (this.cartItems.length === 0) {
            this.cartElement.innerHTML = "<p>Your cart is currently empty</p>";
            this.footerElement.classList.add("hide");
            return;
        }
        renderWithTemplate(this.cartItemTemplate, this.cartElement, this.cartItems, "afterbegin", true);
        this.calculateTotal();
        this.addRemoveButtonEventListeners();
        this.addQuantityButtonEventListeners();
    }

    cartItemTemplate(item) {
        if (!item) return "";
        const colorName = item.Result.Colors && item.Result.Colors.length > 0
            ? item.Result.Colors[0].ColorName
            : "Color not available";

        return `
            <li class="cart-card divider">
                <a href="#" class="cart-card__image">
                <img src="${item.Result.Images.PrimarySmall}" alt="${item.Result.Name}" />
                </a>
                <a href="#">
                <h2 class="card__name">${item.Result.Name}</h2>
                </a>
                <p class="cart-card__color">${colorName}</p>
                <div class="qtd-container">
                <button class="qtd-button" data-id="${item.Result.Id}" data-action="increase">+</button>
                <p class="cart-card__quantity">qty: ${item.Result.Quantity || 1}</p>
                <button class="qtd-button" data-id="${item.Result.Id}" data-action="decrease">-</button>
                </div>
                <p class="cart-card__price">$${(item.Result.FinalPrice * (item.Result.Quantity || 1)).toFixed(2)}</p>
                <button class="cart-card__remove" data-id="${item.Result.Id}">X</button>
            </li>`;
    }

    calculateTotal() {
        const totalElement = document.getElementById("total-amount");
        let total = 0;
        this.cartItems.forEach((item) => {
            total += item.Result.FinalPrice * (item.Result.Quantity || 1);
        });
        if (total > 0) {
            totalElement.innerText = total.toFixed(2);
            this.footerElement.classList.remove("hide");
        } else {
            this.footerElement.classList.add("hide");
        }
    }

    addRemoveButtonEventListeners() {
        const removeButtons = this.cartElement.querySelectorAll(".cart-card__remove");
        removeButtons.forEach((button) => {
            button.addEventListener("click", this.removeCartItem.bind(this));
        });
    }

    addQuantityButtonEventListeners() {
        const quantityButtons = this.cartElement.querySelectorAll(".qtd-button");
        quantityButtons.forEach((button) => {
            button.addEventListener("click", this.changeQuantity.bind(this));
        });
    }

    changeQuantity(event) {
        const itemId = event.target.getAttribute("data-id");
        const action = event.target.getAttribute("data-action");
        const itemIndex = this.cartItems.findIndex(item => item.Result.Id === itemId);
        if (action === "increase") {
            this.cartItems[itemIndex].Result.Quantity += 1;
        } else if (action === "decrease") {
            if (this.cartItems[itemIndex].Result.Quantity > 1) {
                this.cartItems[itemIndex].Result.Quantity -= 1;
            } else {
                this.removeCartItem(event);
                return;
            }
        }
        setLocalStorage("so-cart", this.cartItems);
        this.renderCartContents();
    }

    removeCartItem(event) {
        const itemId = event.target.getAttribute("data-id");
        this.cartItems = this.cartItems.filter((item) => item.Result.Id !== itemId);
        setLocalStorage("so-cart", this.cartItems);
        this.renderCartContents();
    }
}
