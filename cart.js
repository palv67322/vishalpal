// cart.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to extract cart items from URL parameters
    function getCartItemsFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const cartItemsParam = urlParams.get('cartItems');
        return cartItemsParam ? JSON.parse(decodeURIComponent(cartItemsParam)) : [];
    }

    // Function to display cart items on the page
    function displayCartItems(cartItems) {
        const cartList = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        // Clear previous items
        cartList.innerHTML = '';

        let cartTotal = 0;

        // Populate cart items
        cartItems.forEach(item => {
            const li = document.createElement('li');

            // Customize the display of product details
            li.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.name}">
                <div class="cart-item-details">
                    <h2>${item.name}</h2>
                    <span>₹${item.price.toFixed(2)}</span>
                </div>
            `;

            cartTotal += item.price; // Update total

            cartList.appendChild(li);
        });

        // Update total
        cartTotalElement.textContent = `Total: ₹${cartTotal.toFixed(2)}`;
    }

    // Get cart items from URL parameters and display them on the page
    const cartItems = getCartItemsFromURL();
    displayCartItems(cartItems);
});
