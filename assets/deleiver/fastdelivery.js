let currentProducts = [];

async function loadProducts(category = 'all') {
    try {
        console.log('🔍 Loading products for category:', category);
        
        const container = document.getElementById('productsContainer');
        if (!container) {
            console.error('❌ Products container not found!');
            return;
        }

        // Show loading
        container.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading products...</p>
            </div>
        `;

        // Test connection first
        console.log('🔄 Testing connection to backend...');
        const testResponse = await fetch('http://localhost:3001/api/status');
        if (!testResponse.ok) {
            throw new Error(`Server not responding: ${testResponse.status}`);
        }
        
        console.log('✅ Backend is running, fetching products...');
        const response = await fetch('http://localhost:3001/api/enhanced-products');
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        let products = await response.json();
        console.log('✅ Received products:', products.length);
        
        // Filter products
        if (category === 'discounts') {
            products = products.filter(product => product.discount > 0);
            console.log('🤑 Discounted products:', products.length);
        } else if (category !== 'all') {
            products = products.filter(product => 
                product.category && product.category.toLowerCase() === category.toLowerCase()
            );
            console.log(`📦 ${category} products:`, products.length);
        }
        
        currentProducts = products;
        displayProducts(currentProducts);
        
    } catch (error) {
        console.error('❌ Error loading products:', error);
        const container = document.getElementById('productsContainer');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Connection Error!</h3>
                    <p>Cannot connect to server. Please make sure:</p>
                    <ul>
                        <li>✅ Backend server is running on port 3001</li>
                        <li>✅ You ran: <code>node server.js</code></li>
                        <li>✅ No CORS errors in console</li>
                    </ul>
                    <small>Error details: ${error.message}</small>
                    <button class="retry-btn" onclick="loadProducts()">
                        <i class="fas fa-redo"></i> Try Again
                    </button>
                </div>
            `;
        }
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error('❌ Products container not found!');
        return;
    }
    
    if (!products || products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>No Products Found</h3>
                <p>No products available in this category.</p>
                <button class="retry-btn" onclick="loadProducts('all')">
                    <i class="fas fa-home"></i> Show All Products
                </button>
            </div>
        `;
        return;
    }
    
    let html = '<div class="product-grid">';
    
    products.forEach(product => {
        const discountBadge = product.discount > 0 ? 
            `<span class="discount-badge">${product.discount}% OFF</span>` : '';
        
        const originalPrice = product.originalPrice ? 
            `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
        
        const isOutOfStock = product.availableQuantity === 0;
        
        // Ensure image URL is valid
        const imageUrl = product.image || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop';
        
        html += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${imageUrl}" alt="${product.name}" class="product-img" 
                         onerror="this.src='https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop'">
                    ${discountBadge}
                    ${isOutOfStock ? '<span class="out-of-stock-badge">Out of Stock</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="delivery-info">
                        <i class="fas fa-clock"></i> ${product.delivery || 'Standard Delivery'}
                    </p>
                    <p class="available-quantity ${isOutOfStock ? 'out-of-stock' : 'in-stock'}">
                        <i class="fas ${isOutOfStock ? 'fa-times-circle' : 'fa-check-circle'}"></i>
                        ${isOutOfStock ? 'Out of Stock' : `Available: ${product.availableQuantity}`}
                    </p>
                    <div class="price-section">
                        ${originalPrice}
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button class="view-details-btn" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})" 
                                ${isOutOfStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i> 
                            ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    console.log('✅ Displayed products:', products.length);
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('🔘 Found filter buttons:', filterButtons.length);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            console.log('🎯 Filter button clicked:', category);
            loadProducts(category);
        });
    });
}

async function showProductDetails(productId) {
    try {
        console.log('🔍 Loading product details for ID:', productId);
        const response = await fetch(`http://localhost:3001/api/product/${productId}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        
        const product = await response.json();
        console.log('✅ Product details loaded:', product.name);
        
        // Create modal HTML
        const modalHtml = `
            <div class="product-modal-overlay">
                <div class="product-modal">
                    <div class="modal-header">
                        <h3>${product.name}</h3>
                        <button class="close-modal" onclick="closeProductModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-content">
                        <div class="modal-image">
                            <img src="${product.image}" alt="${product.name}" 
                                 onerror="this.src='https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop'">
                        </div>
                        <div class="modal-details">
                            <p class="description">${product.description || 'No description available.'}</p>
                            
                            <div class="detail-item">
                                <strong>Price:</strong> 
                                <span class="current-price">$${product.price.toFixed(2)}</span>
                                ${product.originalPrice ? `
                                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                                ` : ''}
                            </div>
                            
                            ${product.discount > 0 ? `
                                <div class="detail-item">
                                    <strong>Discount:</strong> 
                                    <span class="discount-text">${product.discount}% OFF</span>
                                </div>
                            ` : ''}
                            
                            <div class="detail-item">
                                <strong>Delivery:</strong> ${product.delivery || 'Standard Delivery'}
                            </div>
                            
                            <div class="detail-item">
                                <strong>Available Quantity:</strong> 
                                <span class="${product.availableQuantity === 0 ? 'out-of-stock' : 'in-stock'}">
                                    ${product.availableQuantity === 0 ? 'Out of Stock' : product.availableQuantity}
                                </span>
                            </div>
                            
                            ${product.category ? `
                                <div class="detail-item">
                                    <strong>Category:</strong> ${product.category}
                                </div>
                            ` : ''}
                            
                            ${product.material ? `
                                <div class="detail-item">
                                    <strong>Material:</strong> ${product.material}
                                </div>
                            ` : ''}
                            
                            ${product.dimensions ? `
                                <div class="detail-item">
                                    <strong>Dimensions:</strong> ${product.dimensions}
                                </div>
                            ` : ''}
                            
                            <button class="add-to-cart-large" onclick="addToCart(${product.id})" 
                                    ${product.availableQuantity === 0 ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart"></i>
                                ${product.availableQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
    } catch (error) {
        console.error('❌ Error loading product details:', error);
        alert('Error loading product details: ' + error.message);
    }
}

function closeProductModal() {
    const modal = document.querySelector('.product-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

async function addToCart(productId) {
    try {
        console.log('🛒 Adding product to cart:', productId);
        const response = await fetch('http://localhost:3001/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Show success message
            showNotification('Product added to cart successfully!', 'success');
            updateCartCounter(result.totalItems);
        } else {
            showNotification(result.message || 'Failed to add product to cart', 'error');
        }
        
    } catch (error) {
        console.error('❌ Error adding to cart:', error);
        showNotification('Error adding product to cart', 'error');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            }
            .notification.error { background: #f44336; }
            .notification button { 
                background: none; 
                border: none; 
                color: white; 
                cursor: pointer; 
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

function updateCartCounter(count) {
    const cartCounter = document.querySelector('.cart-count');
    if (cartCounter) {
        cartCounter.textContent = count;
        // Add animation
        cartCounter.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCounter.style.transform = 'scale(1)';
        }, 300);
    }
}

// Test connection function
async function testConnection() {
    try {
        console.log('🔌 Testing connection to backend...');
        const response = await fetch('http://localhost:3001/api/status');
        const data = await response.json();
        console.log('✅ Backend connection successful!', data);
        return true;
    } catch (error) {
        console.error('❌ Backend connection failed:', error);
        return false;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Fast Delivery Page Loaded');
    
    // Test connection and load products
    testConnection().then(success => {
        if (success) {
            loadProducts();
            setupFilterButtons();
        } else {
            const container = document.getElementById('productsContainer');
            if (container) {
                container.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Server Connection Failed</h3>
                        <p>Please make sure the backend server is running:</p>
                        <ol>
                            <li>Open terminal in your project folder</li>
                            <li>Run: <code>node server.js</code></li>
                            <li>Wait for "Server is running" message</li>
                            <li>Refresh this page</li>
                        </ol>
                        <button class="retry-btn" onclick="location.reload()">
                            <i class="fas fa-redo"></i> Reload Page
                        </button>
                    </div>
                `;
            }
        }
    });

    // Add global error handler for images
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('🖼️ Image failed to load:', e.target.src);
            e.target.src = 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop';
        }
    }, true);
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-modal-overlay')) {
        closeProductModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});