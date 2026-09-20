const sizeButtons = document.querySelectorAll(".size-btn");
const selectedSize = document.getElementById("selected-size");
const quantityDisplay = document.getElementById("quantity");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const cartButton = document.getElementById("add-to-cart");

let selectedProduct = null;
let quantity = 1;


/* ===================SIZE SELECTION================= */

sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
        sizeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        const size = button.dataset.size;
        const price = Number(button.dataset.price);

        selectedProduct = {
            name: "Haawii/Tafarchet",
            size: size,
            price: price
        };

        selectedSize.textContent =
            `${size} — ₦${price.toLocaleString()}`;
    });

});


/* ===============QUANTITY================= */

plusButton.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
});

minusButton.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
});


/* =================ADD TO CART================== */

cartButton.addEventListener("click", () => {
    if (!selectedProduct) {
        alert("Please select a size first.");
        return;
    }


    const cartItem = {
        ...selectedProduct,
        quantity: quantity,
        total:
            selectedProduct.price * quantity
    };


    console.log("Added to cart:", cartItem);
    alert(
        `${cartItem.name} (${cartItem.size}) added to cart!`
    );
});