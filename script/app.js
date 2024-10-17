const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});


// URL of the API (replace this with your actual API endpoint)
const apiUrl = 'https://fakestoreapi.com/products';

// Products array to store the fetched products
let products = [];

// Function to display products with images
function displayProducts(productList) {
    const productListContainer = document.getElementById('product-list');
    const productCountElement = document.getElementById('product-count');
 
     // Update product count
     productCountElement.innerText = `${productList.length} Results`;
    
    // Clear existing products
    productListContainer.innerHTML = '';

    // Loop through products and display them
    productList.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-card';

        // Create product details with image
        productItem.innerHTML = `            
            <img src="${product.image}" alt="${product.title}" class="product-image" /><br>
            <h5>${product.title}</h5><br>
            <h6>Price: $${product.price}</h6>           
        `;

        // Append the product item to the product list container
        productListContainer.appendChild(productItem);
    });
}

// Function to fetch product data from the API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const productsData = await response.json(); // Assuming the API returns a JSON response
        products = productsData;
        displayProducts(products); // Display products initially
    } catch (error) {
        console.error('Failed to fetch products:', error);
        const productListContainer = document.getElementById('product-list');
        productListContainer.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    }
}

// Function to sort products by price
function sortProducts(order) {
    const sortedProducts = [...products]; // Create a copy of the products array

    if (order === 'asc') {
        // Sort products by price in ascending order
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
        // Sort products by price in descending order
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Display the sorted products
    displayProducts(sortedProducts);
}

// Function to filter products by selected categories
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('#category-filters input:checked')).map(cb => cb.value);
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    console.log('selectedCategories', selectedCategories)
    console.log('searchTerm', searchTerm)
    
    let filteredProducts = selectedCategories.length > 0 
        ? products.filter(product => selectedCategories.includes(product.category))
        : products; // Show all products if no category is selected

        // Further filter products by search term (product name)
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm));
    }
    
    displayProducts(filteredProducts);
}
// Call the function to fetch and display the products when the page loads
fetchProducts();
