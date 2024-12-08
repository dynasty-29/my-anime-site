// Select necessary DOM elements
const productContainer = document.querySelector("#product-container");
const clearCartBtn = document.createElement("button");
clearCartBtn.innerText = "Clear Cart";
clearCartBtn.className = "clear-cart-btn";
document.body.appendChild(clearCartBtn);

// Initialize cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart in localStorage
function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to display a confirmation message
function showConfirmationMessage(messageElement, message) {
    messageElement.innerText = message;
    messageElement.style.color = "green";
    setTimeout(() => {
        messageElement.innerText = "";
    }, 2000);
}

// Add event listener to "Add to Cart" buttons
productContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const productCard = event.target.closest("#product-card");
        const productName = productCard.querySelector(".product-name").innerText;
        const productPrice = productCard.querySelector(".product-price").innerText;
        const quantityInput = productCard.querySelector(".quantity-input");
        const quantity = parseInt(quantityInput.value) || 1;

        // Add to cart
        const existingProduct = cart.find((item) => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: quantity,
            });
        }

        // Update localStorage
        updateCartStorage();

        // Show confirmation
        const confirmationMessage = productCard.querySelector(".confirmation-message");
        showConfirmationMessage(confirmationMessage, "Arigatu!, your art has been added to cart!");
    }
});

// Add event listener to clear the cart
clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCartStorage();
    alert("Cart cleared!");
});

// Bonus: Restore persisted cart items on page load (optional)
document.addEventListener("DOMContentLoaded", () => {
    if (cart.length > 0) {
        console.log("Cart restored:", cart);
    }
});
