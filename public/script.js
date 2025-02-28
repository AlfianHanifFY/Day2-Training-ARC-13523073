document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.getElementById('product-container');

    try {
        // Fetch products from dummyjson API
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log("Fetched products:", data.products); // Debugging log
        displayProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productContainer.innerHTML = '<p>Error loading products. Check console for details.</p>';
    }

    function displayProducts(products) {
        productContainer.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Product image
            const img = document.createElement('img');
            img.src = product.images?.[0] || 'https://via.placeholder.com/150';
            img.alt = product.title;

            // Product title
            const title = document.createElement('h2');
            title.textContent = product.title;

            // Price
            const price = document.createElement('p');
            price.textContent = `$${product.price}`;

            // Product details (hidden initially)
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('product-details');
            detailsDiv.style.display = 'none';
            detailsDiv.innerHTML = `
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
                <p><strong>Rating:</strong> ${product.rating} ⭐</p>
            `;

            // Toggle details on click
            productDiv.addEventListener('click', () => {
                detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
            });

            productDiv.appendChild(img);
            productDiv.appendChild(title);
            productDiv.appendChild(price);
            productDiv.appendChild(detailsDiv);
            productContainer.appendChild(productDiv);
        });
    }
});
