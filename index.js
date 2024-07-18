
//index.js
function goToHomePage() {
window.open('index.html', '_blank')
}

// Image slider logic
let currentSlide = 1; // Start at the first image
const slides = document.querySelectorAll('#image-slider img');
const totalSlides = slides.length;

function showSlide(index) {
    currentSlide = index;
    if (currentSlide < 1) {
        currentSlide = totalSlides;
    } else if (currentSlide > totalSlides) {
        currentSlide = 1;
    }

    slides.forEach((slide, i) => {
        slide.style.display = i + 1 === currentSlide ? 'block' : 'none';
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Preload all images to ensure they are immediately available
slides.forEach((slide, i) => {
    const img = new Image();
    img.src = slide.src;
});
// Set an interval to automatically advance the slides (adjust the duration as needed)
setInterval(nextSlide, 5000); // Change slide every 5 seconds
// Show/hide arrows on hover
function showArrows() {
    document.getElementById('prev').style.display = 'block';
    document.getElementById('next').style.display = 'block';
}

function hideArrows() {
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';
}
let cartItems = [];
let cartTotal = 0;


function addToCart(productId) {
    const productDiv = document.querySelector(`.product${productId}`);
    // Log productDiv to check if it's correctly selected
    console.log("productDiv:", productDiv);
    const productImage = productDiv.querySelector('img');
    // Log productImage to check if it's correctly selected
    console.log("productImage:", productImage);

    const product = {
        id: productId,
        name: productDiv.querySelector('h2').textContent,
        price: parseFloat(productDiv.querySelector('.price' + productId).textContent.replace('₹', '').replace(',', '')),
        imageSrc: productImage ? productImage.src : ''
    };

    cartItems.push(product);
    cartTotal += product.price;

    updateCartUI();
}

function proceedToBuy() {
    const cartParams = encodeURIComponent(JSON.stringify(cartItems));
    // Redirect the user to the cart page with cart items as URL parameter
    window.open(`cart.html?cartItems=${cartParams}`, '_blank');
}

function clearCart() {
    cartItems = [];
    cartTotal = 0;
    // Update the cart UI after clearing
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const proceedToBuyButton = document.getElementById('proceed-to-buy-button');
    // Clear previous items
    // Check if the cart is empty
    if (cartItems.length === 0) {
        // If cart is empty, hide the "Proceed to Buy" button and reset the total to zero
        proceedToBuyButton.style.display = 'none';
        cartTotal = 0;
    }
     // Clear previous items
     cartList.innerHTML = '';
     // Populate cart items
     cartItems.forEach(item => {
         const li = document.createElement('li');
         // Customize the display of product details
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
    // Show the "Proceed to Buy" button if the cart is not empty
    if (cartItems.length > 0) {
        proceedToBuyButton.style.display = 'block';
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    const cart = document.getElementById('proceed-to-buy-button');
    if (cart) {
        cart.style.display = 'none'; // Hide cart initially
    }
});

function getCartItems() {
    // Return a copy of the cart items
    return cartItems.map(item => ({ ...item }));
}

function removeFromCart(productId) {
    // Find the index of the item in the cart
    const index = cartItems.findIndex(item => item.id === productId);

    if (index !== -1) {
        // Subtract the item's price from the total
        cartTotal -= cartItems[index].price;
        // Remove the item from the cart
        cartItems.splice(index, 1);
        // Check if the cart is empty and set total to zero
        if (cartItems.length === 0) {
            cartTotal = 0;
        }
        // Update the cart UI
        updateCartUI();
    }
}

function openCart() {
    const cart = document.getElementById('cart');
    const menu = document.getElementById('menu');
    cart.style.display = 'block';
    
}

function closeCart() {
    const cart = document.getElementById('cart');
    cart.style.display = 'none';
}

function toggleCart() {
    const cart = document.getElementById('cart');
    const displayValue = window.getComputedStyle(cart).getPropertyValue('display');

    if (displayValue === 'none') {
        openCart();
    } else {
        closeCart();
    }
}
// Ensure the cart is hidden initially
toggleCart();
function buyNow(productId) {
    const product = {
        id: productId,
        name: `Product ${productId}`,
    };
    // Replace the URLs with the actual external websites for each product
    const externalWebsiteUrls = {
        1: "https://www.amazon.in/Redmi-Jade-Black-6GB-128GB/dp/B0C9JFWBH7/ref=sr_1_1?crid=1U515QCOA4D8H&dib=eyJ2IjoiMSJ9.lXO55-xj709g7n4sk1aOWXnsyYDvS8qEWt1fOpZ9vAvggJK6YpKt2TgfXkYrRl_lF3MtNNczLyPrl05wJgbC6tmPF_f1NMnVG-xZhjk_XTRhNDcnkQ8zs5M2GtARSqzBXy5G270RauWDDYezqafwoEfS4g3C3WXoG6jtCsWLgCPPenvE7MoUzJkiZ31M9n4INk6HjfOBNPabNt-cODApGBEqVaTL4PaMvmG8QaKoDms.RArDEyXm06ol8-ev2QepPz4AwS_kityGlBF2oEYZuck&dib_tag=se&keywords=Redmi%2B12%2B5G%2BJade%2BBlack%2B6GB%2BRAM%2B128GB%2BROM&nsdOptOutParam=true&qid=1710069131&sprefix=redmi%2B12%2B5g%2Bjade%2Bblack%2B6gb%2Bram%2B128gb%2Brom%2Caps%2C201&sr=8-1&th=1",
        2: "https://www.amazon.in/Samsung-Galaxy-Black-256GB-Storage/dp/B0CS69QQTG/ref=sr_1_1_sspa?crid=10TLTZRTII3ZB&keywords=Samsung+Galaxy+S24+5G+%28Onyx+Black%2C+8GB%2C+256GB+Storage%29&nsdOptOutParam=true&qid=1707057904&sprefix=samsung+galaxy+s24+5g+onyx+black%2C+8gb%2C+256gb+storage+%2Caps%2C304&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        3: "https://www.amazon.in/OnePlus-Iron-Gray-256GB-Storage/dp/B0CQYNM3ZF/ref=sr_1_3?crid=202HKFDN1GQRY&dib=eyJ2IjoiMSJ9.XFJCx0eZwevDKRA7YwRrFhljjeGzjcVCR8DAQELF90uvfKXU44Rd2yGPQSKooxNkv1MU-6BBcbYd6aRQiLIVMAD8bMLUNGb9ngJJ5u1oRbqdm9ETzeILTKPa8Tm2Lz8X3TCnUW7oNGESEFKBdIrd6nM3By55dZSwaNSNVJ1kgJhyZ19unLyjNMVM_3IxUmp8_za22ozgIqPBuSwdjzL4BxIyYvIc2TQUVP7UZzlCURU.jrIeiKCw7LenLbxhKTXCVHUFRxZd3gDcTR_r5epg_gw&dib_tag=se&keywords=mobile%2Bphone&qid=1709904976&sprefix=mobile%2Bp%2Caps%2C449&sr=8-3&th=1",
        4: "https://www.amazon.in/Dell-14-Rheinland-Certified-Comfortview/dp/B0BQJ9HZPP/ref=sr_1_7?crid=24MF5FY27KX3U&dib=eyJ2IjoiMSJ9.9zhNTtyM6wB18-nU56oobkN01tiS8xNw8BZwVe-RejUpaFc5jVxdNuJTP_2u3f7noU4ce_kInf32JGiqB0xsO9voyEwecl1xk66o0ARexuP2MT3tUctZJew4RJDoRcAEJ_sp70XSozzRzv3gmyiCg_RhrEeH4UAN4RYHTrWVuEr-mAzgv8QicaNXNsv84YQzMap0PLSDkLG9pi4v6vYl0zhla0PPhAt8wXnZPFmINYI.RmP_Xmr6T2R-XnmhovOoWYo9ccRN41ClHt-qDD1ELc0&dib_tag=se&keywords=laptop&qid=1720974222&sprefix=laptop%2Caps%2C258&sr=8-7",
        5: "https://www.amazon.in/HP-i5-1235U-15-6-inch-graphics-speakers/dp/B0CTKHTNWL/ref=sr_1_4?crid=24MF5FY27KX3U&dib=eyJ2IjoiMSJ9.9zhNTtyM6wB18-nU56oobkN01tiS8xNw8BZwVe-RejUpaFc5jVxdNuJTP_2u3f7noU4ce_kInf32JGiqB0xsO9voyEwecl1xk66o0ARexuP2MT3tUctZJew4RJDoRcAEJ_sp70XSozzRzv3gmyiCg_RhrEeH4UAN4RYHTrWVuEr-mAzgv8QicaNXNsv84YQzMap0PLSDkLG9pi4v6vYl0zhla0PPhAt8wXnZPFmINYI.RmP_Xmr6T2R-XnmhovOoWYo9ccRN41ClHt-qDD1ELc0&dib_tag=se&keywords=laptop&qid=1720974222&sprefix=laptop%2Caps%2C258&sr=8-4",
        6: "https://www.amazon.in/Whirlpool-Refrigerator-205-WDE-CLS/dp/B0BSRVL2VV/ref=sr_1_5?crid=2FNGVFWE3L8Q2&dib=eyJ2IjoiMSJ9.r93Z6B2UzHdrixVdAGuidHNnwZvZ5Ad6ntKoA5GVDxSTzuHI3aR10f77fHM7CpfY_Cfy6ZN-xcZ0EWBr7pavMmvnJkKlC3b8T-g4l13TnUr7Ph6ENaj1JexxUWv-xn10XLS57P9RaaVaRy0o2qVVEEyXH3BMQ6DLEOQgIIUbd-GVeBAboPDEPGfOx23sbd-9ntXZNepEJ19wKzhNao8TibPy-WpmNOwqoFRg22YEBIQ.5HBY1NOr1NPicg27cvlYaB5ZlqAeD8wRIjFYAN1QjL8&dib_tag=se&keywords=fridge&qid=1720975223&sprefix=fri%2Caps%2C326&sr=8-5&th=1",
        7: "https://www.amazon.in/Apple-iPhone-13-128GB-Midnight/dp/B09G9HD6PD/ref=sr_1_3?crid=27TRLCB64N8M5&dib=eyJ2IjoiMSJ9.KlO-JXGQeu3PG3Ss3mqDDAtTq0HSsBCv0kg1pAR5Y-EiL7KG5btRCx614LrVotdy4mFz3Z8GFw1yryzC96akboVVB0fT1Jyf7d7l8tlT_jojt68826Gg8U4l-HsFykhFsI8H-9YrJMnx-yxZwksSGVQpOd2QS8AJzepAD2RPGQCkcbDJvzWZUX40EXRIGyFCuleAaJ_sI4OFXAiB_2JIGh2ppdv5OGCOwZOmkSVJ2rU.jflUQToPo5GCy1TmAHPnegvvUvzTBK7STBZS97lGtLI&dib_tag=se&keywords=iphone&qid=1720975955&sprefix=iphone%2Caps%2C598&sr=8-3"
        // Add more URLs as needed
    };

    const checkoutUrl = externalWebsiteUrls[productId];
    // Redirect the user to the external website for the specific product
    if (checkoutUrl) {
        window.open(checkoutUrl, "_blank");
    } else {
        console.error(`No checkout URL found for Product ${productId}`);
    }
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    // Loop through each product and hide/show based on search input
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function redirectToAuthPage() {
    window.open('auth.html', '_blank');
}

function openProductDetails(productId) {
    const productDiv = document.querySelector(`.product${productId}`);
    const productName = productDiv.querySelector('h2').textContent;
    const productImageSrc = productDiv.querySelector('img').src;
    const productPrice = productDiv.querySelector('.price' + productId).textContent.replace('₹', '').replace(',', '');

    // Construct the URL with the product details as query parameters
    const productDetailsUrl = `product-details.html?productName=${encodeURIComponent(productName)}&productImageSrc=${encodeURIComponent(productImageSrc)}&productPrice=${encodeURIComponent(productPrice)}`;

    // Open the product details page in a new tab
    window.open(productDetailsUrl, '_blank');
}


