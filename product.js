
const sizeButtons = document.querySelectorAll(".size-btn");
const selectedSize = document.getElementById("selected-size");
const quantityDisplay = document.getElementById("quantity");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const cartButton = document.getElementById("add-to-cart");

// Get the product details from the HTML page
const productName = document.body.dataset.productName;
const productImage = document.body.dataset.productImage;

let selectedProduct = null;
let quantity = 1;

// SIZE SELECTION
sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
        sizeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const size = button.dataset.size;
        const price = Number(button.dataset.price);

        selectedProduct = {
            name: productName,
            size: size,
            price: price
        };

        selectedSize.textContent =
            `${size} — ₦${price.toLocaleString()}`;
    });
});

// QUANTITY
if (plusButton && quantityDisplay) {
    plusButton.addEventListener("click", () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });
}

if (minusButton && quantityDisplay) {
    minusButton.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });
}

// ADD TO CART
if (cartButton) {
    cartButton.addEventListener("click", () => {
        if (!selectedProduct) {
            alert("Please select a size first.");
            return;
        }

        let cart = JSON.parse(
            localStorage.getItem("meenadsCart")
        ) || [];

        const cartItem = cart.find(item =>
            item.name === selectedProduct.name &&
            item.size === selectedProduct.size
        );

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({
                ...selectedProduct,
                quantity: quantity,
                image: productImage
            });
        }

        localStorage.setItem(
            "meenadsCart",
            JSON.stringify(cart)
        );

        alert(`${productName} added to your cart!`);
    });
}
