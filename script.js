document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.classList.add(`product${product.id}`);
        
        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = `product ${product.id}`;
        
        const productTitle = document.createElement("h2");
        productTitle.innerText = product.title;
        
        const productDetails = document.createElement("h3");
        productDetails.innerHTML = Object.entries(product.details)
            .map(([key, value]) => `${key}\t${value}`)
            .join("<br>");
        
        const productPrice = document.createElement("p");
        productPrice.classList.add(`price${product.id}`);
        productPrice.innerText = product.price;
        
        const buyNowButton = document.createElement("button");
        buyNowButton.innerText = "Buy Now";
        buyNowButton.setAttribute("onclick", `buyNow(${product.id})`);
        
        const addToCartButton = document.createElement("button");
        addToCartButton.innerText = "Add to Cart";
        addToCartButton.setAttribute("onclick", `addToCart(${product.id})`);
        
        const productDetailsButton = document.createElement("button");
        productDetailsButton.innerText = "Product Details";
        productDetailsButton.setAttribute("onclick", `openProductDetails(${product.id})`);
        
        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productDetails);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(buyNowButton);
        productDiv.appendChild(addToCartButton);
        productDiv.appendChild(productDetailsButton);
        
        productContainer.appendChild(productDiv);
    });
});
