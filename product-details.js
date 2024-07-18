document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the product details from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('productName');
    const productImageSrc = params.get('productImageSrc');
    const productPrice = params.get('productPrice');

    // Update the product details on the page
    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-image').src = productImageSrc;
    document.getElementById('product-price').textContent = `Price: ₹${productPrice}`;

    // Add event listener to the "Complete Purchase" button
    document.getElementById('complete-purchase-button').addEventListener('click', function () {
        // Add your logic for completing the purchase here
        console.log("Purchase completed!");
    });
});
