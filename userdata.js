async function addToCart(productId) {
    const productDiv = document.querySelector(`.product${productId}`);
    const productImage = productDiv.querySelector('img');
    const productName = productDiv.querySelector('h2').textContent;
    const productPrice = parseFloat(productDiv.querySelector('.price' + productId).textContent.replace('₹', '').replace(',', ''));
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        imageSrc: productImage ? productImage.src : ''
    };

    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        const cartRef = db.collection('carts').doc(userId);

        try {
            const doc = await cartRef.get();
            if (doc.exists) {
                const cartItems = doc.data().cartItems;
                // Check if product already exists
                const itemExists = cartItems.some(item => item.id === productId);
                if (!itemExists) {
                    cartItems.push(product);
                    await cartRef.update({ cartItems });
                }
            } else {
                await cartRef.set({ cartItems: [product] });
            }
        } catch (error) {
            console.error("Error updating cart: ", error);
        }
    }

    // Update local UI
    cartItems.push(product);
    cartTotal += product.price;
    updateCartUI();
}



async function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const proceedToBuyButton = document.getElementById('proceed-to-buy-button');

    // Clear previous items
    cartList.innerHTML = '';

    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        const cartRef = db.collection('carts').doc(userId);

        try {
            const doc = await cartRef.get();
            if (doc.exists) {
                const savedCartItems = doc.data().cartItems;
                cartItems = savedCartItems;
                cartTotal = savedCartItems.reduce((total, item) => total + item.price, 0);

                // Populate cart items
                savedCartItems.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <img src="${item.imageSrc}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h2>${item.name}</h2>
                            <span>₹${item.price.toFixed(2)}</span>
                            <button onclick="removeFromCart(${item.id})">Remove from Cart</button>
                        </div>
                    `;
                    cartList.appendChild(li);
                });

                // Update total
                cartTotalElement.textContent = `₹${cartTotal.toFixed(2)}`;
            } else {
                console.log("No cart found for this user.");
            }
        } catch (error) {
            console.error("Error fetching cart: ", error);
        }
    }

    // Show the "Proceed to Buy" button if the cart is not empty
    proceedToBuyButton.style.display = cartItems.length > 0 ? 'block' : 'none';
}


async function removeFromCart(productId) {
    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        const cartRef = db.collection('carts').doc(userId);

        try {
            const doc = await cartRef.get();
            if (doc.exists) {
                let cartItems = doc.data().cartItems;
                cartItems = cartItems.filter(item => item.id !== productId);
                await cartRef.update({ cartItems });

                // Update local UI
                cartItems = cartItems.filter(item => item.id !== productId);
                cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
                updateCartUI();
            }
        } catch (error) {
            console.error("Error removing item from cart: ", error);
        }
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    const user = firebase.auth().currentUser;
    if (user) {
        updateCartUI();
    }
});

