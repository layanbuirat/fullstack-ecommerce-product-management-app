// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    // Toggle mobile menu
    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', function () {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        mobileCloseBtn.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Mobile dropdown functionality
    mobileDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        dropdownLink.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

async function loadHeroFromBackend() {
    try {
        console.log('Loading hero data from server...');
        const response = await fetch('http://localhost:5000/api/hero');
        const heroData = await response.json();
        console.log('Hero data loaded successfully:', heroData);
        displayHero(heroData);
    } catch (error) {
        console.error('Error loading hero data:', error);
        useLocalHero();
    }
}

function displayHero(heroData) {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) {
        console.log('Hero section not found');
        return;
    }

    heroSection.innerHTML = `
        <div class="hero-content">
            <h1>${heroData.title}</h1>
            <p>${heroData.subtitle}</p>
            <div class="hero-buttons">
                ${heroData.buttons.map(button => `
                    <a href="${button.url}" class="btn btn-${button.type}">${button.text}</a>
                `).join('')}
            </div>
        </div>
    `;

    if (heroData.backgroundImage) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${heroData.backgroundImage}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
}

function useLocalHero() {
    console.log('Using local hero data');
}

async function loadProductsFromBackend() {
    try {
        console.log('Loading products from server...');

        const response = await fetch('http://localhost:5000/api/products');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const products = await response.json();
        console.log('Products loaded successfully:', products);

        displayProducts(products);

    } catch (error) {
        console.error('Error loading products:', error);
        console.log('Using local data instead');
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');

    if (!productsContainer) {
        console.log('Products container not found');
        return;
    }

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
            <div class="col-lg-4 col-md-6 col-12 mb-4">
                <div class="card product-card h-100 shadow-sm border-0">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" 
                         style="height: 250px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-dark">${product.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${product.description}</p>
                        <div class="product-price mb-3">
                            <span class="h4 text-danger fw-bold">$${product.price}</span>
                        </div>
                        <button class="btn btn-primary btn-lg mt-auto" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productHTML;
    });
}

// Helper function
function addToCart(productId) {
    alert(`Product ${productId} added to cart`);
}

// Single DOMContentLoaded event listener with all functionality
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded - connecting to server...');

    loadHeroFromBackend();
    // Load products from backend
    loadProductsFromBackend();
    setupButtonHandlers();
    setupShopNowButtons();


    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');

    if (mobileNavToggle && mobileNav && mobileCloseBtn) {
        mobileNavToggle.addEventListener('click', function () {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileCloseBtn.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile Dropdown Toggle
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                // Close other dropdowns
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        }
    });

    // Property Slider Navigation
    const propertiesContainer = document.querySelector('.properties-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (propertiesContainer && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function () {
            propertiesContainer.scrollBy({
                left: -propertiesContainer.offsetWidth / 2,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', function () {
            propertiesContainer.scrollBy({
                left: propertiesContainer.offsetWidth / 2,
                behavior: 'smooth'
            });
        });
    }

    // Testimonial Slider Navigation
    const testimonialSlider = document.querySelector('.testimonial-slider');

    if (testimonialSlider) {
        const testimonialLeftArrow = document.createElement('button');
        const testimonialRightArrow = document.createElement('button');

        testimonialLeftArrow.className = 'slider-arrow left-arrow';
        testimonialLeftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        testimonialRightArrow.className = 'slider-arrow right-arrow';
        testimonialRightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';

        testimonialSlider.parentElement.insertBefore(testimonialLeftArrow, testimonialSlider);
        testimonialSlider.parentElement.insertBefore(testimonialRightArrow, testimonialSlider.nextSibling);

        testimonialLeftArrow.addEventListener('click', function () {
            testimonialSlider.scrollBy({
                left: -testimonialSlider.offsetWidth / 2,
                behavior: 'smooth'
            });
        });

        testimonialRightArrow.addEventListener('click', function () {
            testimonialSlider.scrollBy({
                left: testimonialSlider.offsetWidth / 2,
                behavior: 'smooth'
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Wishlist and Cart Counters (Demo)
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    const wishlistCount = document.querySelector('.wishlist-count');
    const cartCount = document.querySelector('.cart-count');

    let wishlistItems = 0;
    let cartItems = 0;

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-heart"></i>';
                wishlistItems--;
            } else {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
                wishlistItems++;
            }
            if (wishlistCount) wishlistCount.textContent = wishlistItems;
        });
    });

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            cartItems++;
            if (cartCount) cartCount.textContent = cartItems;

            // Add animation
            const originalText = btn.textContent;
            btn.textContent = 'Added!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 1000);
        });
    });

    // Quick View Modal (Demo)
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            alert('Quick view feature would show product details here!');
        });
    });

    // Coupon Code Copy (Demo)
    const couponCode = document.querySelector('.coupon-section span');

    if (couponCode) {
        couponCode.addEventListener('click', function () {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }

    // Mobile Nav Close When Clicking Outside
    document.addEventListener('click', function (e) {
        if (mobileNav && mobileNav.classList.contains('active') &&
            !mobileNav.contains(e.target) &&
            e.target !== mobileNavToggle) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Prevent Default for Dropdown Links
    const dropdownLinks = document.querySelectorAll('.dropdown > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });

    // Categories Section Functionality
    const categoriesTrack = document.querySelector('.categories-track');
    const prevBtn = document.querySelector('.prev-cat');
    const nextBtn = document.querySelector('.next-cat');
    const categoryCards = document.querySelectorAll('.category-card');
    const searchInput = document.querySelector('.category-search');
    const categoryWishlistBtns = document.querySelectorAll('.wishlist-btn');

    // Navigation controls
    if (prevBtn && nextBtn && categoriesTrack) {
        prevBtn.addEventListener('click', () => {
            categoriesTrack.scrollBy({ left: -250, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            categoriesTrack.scrollBy({ left: 250, behavior: 'smooth' });
        });
    }

    // Wishlist functionality for categories
    categoryWishlistBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fas');
                icon.classList.toggle('far');

                // Animate heart
                if (this.classList.contains('active')) {
                    icon.classList.add('animate__animated', 'animate__heartBeat');
                    setTimeout(() => {
                        icon.classList.remove('animate__animated', 'animate__heartBeat');
                    }, 1000);
                }
            }
        });
    });

    // Search functionality for categories
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            categoryCards.forEach(card => {
                const categoryName = card.querySelector('h3');
                if (categoryName) {
                    const name = categoryName.textContent.toLowerCase();

                    if (name.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.classList.add('animate__animated', 'animate__fadeIn');
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    }

    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.classList.add('animate__animated', 'animate__pulse');
            }
        });

        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.classList.remove('animate__animated', 'animate__pulse');
            }
        });
    });
});

function setupButtonHandlers() {
    const propertiesBtn = document.querySelector('.btn-primary');
    if (propertiesBtn) {
        propertiesBtn.addEventListener('click', function (e) {
            e.preventDefault();
            loadPropertiesPage();
        });
    }

    const furnitureBtn = document.querySelector('.btn-secondary');
    if (furnitureBtn) {
        furnitureBtn.addEventListener('click', function (e) {
            e.preventDefault();
            loadAllProductsPage();
        });
    }
}

async function loadPropertiesPage() {
    try {
        const response = await fetch('http://localhost:5000/api/properties');
        const data = await response.json();

        showPropertiesPage(data);
    } catch (error) {
        console.error('Error loading properties:', error);
        alert('Properties page is under development');
    }
}

async function loadAllProductsPage() {
    try {
        const response = await fetch('http://localhost:5000/api/all-products');
        const data = await response.json();

        showAllProductsPage(data);
    } catch (error) {
        console.error('Error loading all products:', error);
        alert('All products page is under development');
    }
}

function showPropertiesPage(data) {
    const mainContent = document.querySelector('main') || document.body;

    mainContent.innerHTML = `
        <div class="container mt-5">
            <h1>${data.pageTitle}</h1>
            <div class="row">
                ${data.properties.map(property => `
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <img src="${property.image}" class="card-img-top" alt="${property.title}">
                            <div class="card-body">
                                <h5 class="card-title">${property.title}</h5>
                                <p class="card-text">Location: ${property.location}</p>
                                <p class="card-text">$${property.price.toLocaleString()}</p>
                                <p class="card-text">${property.bedrooms} Bedrooms, ${property.bathrooms} Bathrooms</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-secondary mt-3" onclick="goBackToHome()">Back to Home</button>
        </div>
    `;
}

function showAllProductsPage(data) {
    const mainContent = document.querySelector('main') || document.body;

    mainContent.innerHTML = `
        <div class="container mt-5">
            <h1>${data.pageTitle}</h1>
            <div class="row">
                ${data.products.map(product => `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text">$${product.price}</p>
                                <button class="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-secondary mt-3" onclick="goBackToHome()">Back to Home</button>
        </div>
    `;
}

function goBackToHome() {
    location.reload();
}

function setupShopNowButtons() {
    const shopNowButtons = document.querySelectorAll('.btn-shop-now');

    shopNowButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');

            loadCategory(category);
        });
    });
}

async function loadLivingRoomProducts() {
    try {
        console.log('Loading Living Room products...');
        const response = await fetch('http://localhost:5000/api/categories/living-room');
        const categoryData = await response.json();

        showCategoryPage(categoryData);
    } catch (error) {
        console.error('Error loading living room products:', error);
        alert('Error loading products. Please try again.');
    }
}

function showCategoryPage(categoryData) {
    const mainContent = document.querySelector('main') || document.body;

    mainContent.innerHTML = `
        <div class="container mt-4">
            <!-- Header -->
            <div class="row mb-5">
                <div class="col-12">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#" onclick="goBackToHome()">Home</a></li>
                            <li class="breadcrumb-item active">${categoryData.category}</li>
                        </ol>
                    </nav>
                    <h1 class="display-4 mb-3">${categoryData.category}</h1>
                    <p class="lead text-muted">${categoryData.description}</p>
                </div>
            </div>
            
            <!-- Products Grid -->
            <div class="row">
                ${categoryData.products.map(product => `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card product-card h-100 shadow-sm">
                            <!-- Product Image -->
                            <div class="position-relative">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}" 
                                     style="height: 250px; object-fit: cover;">
                                
                                <!-- Discount Badge -->
                                ${product.discount ? `
                                    <span class="badge bg-danger position-absolute top-0 start-0 m-2">
                                        -${product.discount}%
                                    </span>
                                ` : ''}
                                
                                <!-- Wishlist Button -->
                                <button class="btn btn-light position-absolute top-0 end-0 m-2 wishlist-btn" 
                                        onclick="toggleWishlist(${product.id})">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                            
                            <div class="card-body d-flex flex-column">
                                <!-- Product Info -->
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text text-muted flex-grow-1">${product.description}</p>
                                
                                <!-- Features -->
                                <div class="mb-2">
                                    ${product.features.map(feature => `
                                        <span class="badge bg-light text-dark me-1 mb-1">${feature}</span>
                                    `).join('')}
                                </div>
                                
                                <!-- Rating -->
                                <div class="mb-2">
                                    <span class="text-warning">
                                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                    </span>
                                    <small class="text-muted">(${product.reviews})</small>
                                </div>
                                
                                <!-- Price -->
                                <div class="product-price mb-3">
                                    ${product.originalPrice ? `
                                        <span class="text-muted text-decoration-line-through me-2">
                                            $${product.originalPrice}
                                        </span>
                                    ` : ''}
                                    <span class="h4 text-danger fw-bold">$${product.price}</span>
                                </div>
                                
                                <!-- Actions -->
                                <div class="mt-auto">
                                    <button class="btn btn-primary w-100 mb-2" 
                                            onclick="addToCart(${product.id})">
                                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                    </button>
                                    <button class="btn btn-outline-secondary w-100" 
                                            onclick="showProductDetails(${product.id})">
                                        <i class="fas fa-eye me-2"></i>View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Back Button -->
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <button class="btn btn-secondary" onclick="goBackToHome()">
                        <i class="fas fa-arrow-left me-2"></i>Back to Home
                    </button>
                </div>
            </div>
        </div>
    `;
}

function showProductDetails(productId) {
    alert(`Product Details for ID: ${productId} - This will show detailed product page`);
}
function loadMirrorsProducts() {
    loadCategory('mirrors');
}

function loadSinksProducts() {
    loadCategory('sinks');
}
function toggleWishlist(productId) {
    const wishlistBtn = event.currentTarget;
    const icon = wishlistBtn.querySelector('i');

    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        wishlistBtn.classList.add('text-danger');
        alert(`Product ${productId} added to wishlist`);
    } else {
        icon.classList.replace('fas', 'far');
        wishlistBtn.classList.remove('text-danger');
        alert(`Product ${productId} removed from wishlist`);
    }
}

function addToCart(productId) {
    alert(`Product ${productId} added to cart successfully!`);
}

// دالة تحميل منتجات Bedroom
async function loadBedroomProducts() {
    try {
        console.log('Loading Bedroom products from backend...');

        const response = await fetch('http://localhost:5000/api/categories/bedroom');

        if (!response.ok) {
            throw new Error('Failed to fetch bedroom products');
        }

        const categoryData = await response.json();
        console.log('Bedroom products loaded:', categoryData);

        showBedroomPage(categoryData);

    } catch (error) {
        console.error('Error loading bedroom products:', error);
        alert('Error loading bedroom products. Please try again.');
    }
}

function showBedroomPage(categoryData) {
    const mainContent = document.querySelector('main') || document.body;

    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });

    mainContent.innerHTML = `
        <!-- Bedroom Header -->
        <section class="category-header py-5" style="background: linear-gradient(135deg, #fdb1b1ff 0%, #f3d087ff 100%); color: white;">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="goBackToHome()" style="color: white; text-decoration: none;">Home</a></li>
                        <li class="breadcrumb-item active" style="color: white;">${categoryData.category}</li>
                    </ol>
                </nav>
                <h1 class="display-4 fw-bold">${categoryData.category}</h1>
                <p class="lead">${categoryData.description}</p>
                <div class="row mt-4">
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>${categoryData.products.length}+</h3>
                            <p>Products</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>⭐ ${Math.max(...categoryData.products.map(p => p.rating))}</h3>
                            <p>Top Rating</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>🏷️ ${Math.max(...categoryData.products.map(p => p.discount || 0))}%</h3>
                            <p>Max Discount</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>🛏️</h3>
                            <p>Complete Sets</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Products Grid -->
        <section class="products-grid py-5">
            <div class="container">
                <div class="row mb-4">
                    <div class="col-12">
                        <h2 class="text-center mb-4">Create Your Dream Bedroom</h2>
                        <p class="text-center text-muted">From cozy beds to elegant storage solutions</p>
                    </div>
                </div>
                
                <div class="row">
                    ${categoryData.products.map(product => `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card product-card h-100 shadow-lg border-0">
                                <!-- Product Image with Badges -->
                                <div class="position-relative overflow-hidden">
                                    <img src="${product.image}" class="card-img-top" alt="${product.name}" 
                                         style="height: 280px; object-fit: cover; transition: transform 0.3s ease;">
                                    
                                    <!-- Discount Badge -->
                                    ${product.discount ? `
                                        <span class="badge bg-danger position-absolute top-0 start-0 m-3 fs-6">
                                            -${product.discount}% OFF
                                        </span>
                                    ` : ''}
                                    
                                    <!-- Wishlist Button -->
                                    <button class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle wishlist-btn" 
                                            onclick="toggleWishlist(${product.id})"
                                            style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;">
                                        <i class="far fa-heart"></i>
                                    </button>
                                    
                                    <!-- Stock Status -->
                                    <span class="badge position-absolute bottom-0 start-0 m-3 ${product.inStock ? 'bg-success' : 'bg-danger'}">
                                        ${product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                
                                <div class="card-body d-flex flex-column">
                                    <!-- Product Info -->
                                    <h5 class="card-title fw-bold text-dark">${product.name}</h5>
                                    <p class="card-text text-muted flex-grow-1">${product.description}</p>
                                    
                                    <!-- Features -->
                                    <div class="mb-3">
                                        ${product.features.slice(0, 3).map(feature => `
                                            <span class="badge bg-light text-dark me-1 mb-1">${feature}</span>
                                        `).join('')}
                                    </div>
                                    
                                    <!-- Rating -->
                                    <div class="mb-3">
                                        <span class="text-warning fs-5">
                                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                        </span>
                                        <small class="text-muted ms-2">(${product.reviews} reviews)</small>
                                    </div>
                                    
                                    <!-- Colors -->
                                    <div class="mb-3">
                                        <strong>Colors:</strong>
                                        <div class="d-flex mt-1">
                                            ${product.colors.map(color => `
                                                <span class="color-dot me-1" style="background-color: ${getColorCode(color)}"></span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <!-- Price -->
                                    <div class="product-price mb-3">
                                        ${product.originalPrice ? `
                                            <span class="text-muted text-decoration-line-through fs-5 me-2">
                                                $${product.originalPrice}
                                            </span>
                                        ` : ''}
                                        <span class="h3 text-danger fw-bold">$${product.price}</span>
                                    </div>
                                    
                                    <!-- Actions -->
                                    <div class="mt-auto">
                                        <button class="btn btn-warning w-100 mb-2 py-3 fw-bold" 
                                                onclick="addToCart(${product.id})"
                                                ${!product.inStock ? 'disabled' : ''}>
                                            <i class="fas fa-shopping-cart me-2"></i>
                                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                        <button class="btn btn-outline-dark w-100 py-2" 
                                                onclick="showProductDetails(${product.id})">
                                            <i class="fas fa-eye me-2"></i>View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Special Offer Banner -->
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="alert alert-info text-center">
                            <h4>🛏️ Complete Bedroom Sets Available!</h4>
                            <p class="mb-0">Mix and match products to create your perfect bedroom setup</p>
                        </div>
                    </div>
                </div>
                
                <!-- Back Button -->
                <div class="row mt-4">
                    <div class="col-12 text-center">
                        <button class="btn btn-secondary btn-lg" onclick="goBackToHome()">
                            <i class="fas fa-arrow-left me-2"></i>Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// دالة عامة لتحميل أي فئة
async function loadCategory(categorySlug) {
    try {
        console.log(`Loading ${categorySlug} products from backend...`);

        const response = await fetch(`http://localhost:5000/api/categories/${categorySlug}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${categorySlug} products`);
        }

        const categoryData = await response.json();
        console.log(`${categorySlug} products loaded:`, categoryData);

        showCategoryPage(categoryData);

    } catch (error) {
        console.error(`Error loading ${categorySlug} products:`, error);
        alert(`Error loading ${categorySlug} products. Please try again.`);
    }
}

function showCategoryPage(categoryData) {
    const mainContent = document.querySelector('main') || document.body;

    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });

    const categoryColors = {
        'Living Room': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Bedroom': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
        'Kitchen': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'Dining Room': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'Wardrobes': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'Office': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    };

    const bgColor = categoryColors[categoryData.category] || categoryColors['Living Room'];

    mainContent.innerHTML = `
        <!-- Category Header -->
        <section class="category-header py-5" style="background: ${bgColor}; color: white;">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="goBackToHome()" style="color: white; text-decoration: none;">Home</a></li>
                        <li class="breadcrumb-item active" style="color: white;">${categoryData.category}</li>
                    </ol>
                </nav>
                <h1 class="display-4 fw-bold">${categoryData.category}</h1>
                <p class="lead">${categoryData.description}</p>
                <div class="row mt-4">
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>${categoryData.products.length}+</h3>
                            <p>Products</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>⭐ ${Math.max(...categoryData.products.map(p => p.rating))}</h3>
                            <p>Top Rating</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>🏷️ ${Math.max(...categoryData.products.map(p => p.discount || 0))}%</h3>
                            <p>Max Discount</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h3>🚚</h3>
                            <p>Free Delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Products Grid -->
        <section class="products-grid py-5">
            <div class="container">
                <div class="row">
                    ${categoryData.products.map(product => `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card product-card h-100 shadow-lg border-0">
                                <div class="position-relative overflow-hidden">
                                    <img src="${product.image}" class="card-img-top" alt="${product.name}" 
                                         style="height: 280px; object-fit: cover; transition: transform 0.3s ease;">
                                    
                                    ${product.discount ? `
                                        <span class="badge bg-danger position-absolute top-0 start-0 m-3 fs-6">
                                            -${product.discount}% OFF
                                        </span>
                                    ` : ''}
                                    
                                    <button class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle wishlist-btn" 
                                            onclick="toggleWishlist(${product.id})"
                                            style="width: 45px; height: 45px;">
                                        <i class="far fa-heart"></i>
                                    </button>
                                    
                                    <span class="badge position-absolute bottom-0 start-0 m-3 ${product.inStock ? 'bg-success' : 'bg-danger'}">
                                        ${product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title fw-bold text-dark">${product.name}</h5>
                                    <p class="card-text text-muted flex-grow-1">${product.description}</p>
                                    
                                    <div class="mb-3">
                                        ${product.features.slice(0, 3).map(feature => `
                                            <span class="badge bg-light text-dark me-1 mb-1">${feature}</                                    `).join('')}
                                    </div>
                                    
                                    <div class="mb-3">
                                        <span class="text-warning fs-5">
                                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                        </span>
                                        <small class="text-muted ms-2">(${product.reviews} reviews)</small>
                                    </div>
                                    
                                    ${product.colors ? `
                                    <div class="mb-3">
                                        <strong>Colors:</strong>
                                        <div class="d-flex mt-1">
                                            ${product.colors.map(color => `
                                                <span class="color-dot me-1" style="background-color: ${getColorCode(color)}"></span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    ` : ''}
                                    
                                    <div class="product-price mb-3">
                                        ${product.originalPrice ? `
                                            <span class="text-muted text-decoration-line-through fs-5 me-2">
                                                $${product.originalPrice}
                                            </span>
                                        ` : ''}
                                        <span class="h3 text-danger fw-bold">$${product.price}</span>
                                    </div>
                                    
                                    <div class="mt-auto">
                                        <button class="btn btn-primary w-100 mb-2 py-3 fw-bold" 
                                                onclick="addToCart(${product.id})"
                                                ${!product.inStock ? 'disabled' : ''}>
                                            <i class="fas fa-shopping-cart me-2"></i>
                                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                        <button class="btn btn-outline-dark w-100 py-2" 
                                                onclick="showProductDetails(${product.id})">
                                            <i class="fas fa-eye me-2"></i>View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="row mt-5">
                    <div class="col-12 text-center">
                        <button class="btn btn-secondary btn-lg" onclick="goBackToHome()">
                            <i class="fas fa-arrow-left me-2"></i>Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function loadKitchenProducts() { loadCategory('kitchen'); }
function loadDiningRoomProducts() { loadCategory('dining-room'); }
function loadWardrobeProducts() { loadCategory('wardrobes'); }
function loadOfficeProducts() { loadCategory('office'); }

// Helper function to get color codes
function getColorCode(colorName) {
    const colorMap = {
        'white': '#ffffff',
        'black': '#000000',
        'brown': '#8B4513',
        'gray': '#808080',
        'beige': '#F5F5DC',
        'walnut': '#773F1A',
        'oak': '#D2B48C',
        'cherry': '#A52A2A',
        'mahogany': '#C04000',
        'espresso': '#4A2C2A',
        'cream': '#FFFDD0',
        'navy': '#000080',
        'charcoal': '#36454F'
    };
    return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}

// Enhanced Mobile Menu Functionality
function initMobileMenu() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');

    // Toggle mobile menu
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function () {
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile dropdown functionality
    mobileDropdowns.forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');

            // Close other dropdowns
            mobileDropdowns.forEach(otherLink => {
                if (otherLink !== dropdownLink) {
                    otherLink.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (mobileNav.classList.contains('active') &&
            !mobileNav.contains(e.target) &&
            e.target !== mobileNavToggle) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on links (except dropdowns)
    const mobileLinks = document.querySelectorAll('.mobile-nav-menu a:not(.mobile-dropdown > a)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Enhanced Search Functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.category-search');

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            if (searchInput) {
                performSearch(searchInput.value);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function performSearch(searchTerm) {
    if (!searchTerm.trim()) {
        alert('Please enter a search term');
        return;
    }

    console.log('Searching for:', searchTerm);
    // Implement search functionality here
    alert(`Search functionality for "${searchTerm}" will be implemented soon!`);
}

// Image Loading Error Handler
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            this.src = './assets/image/placeholder.jpg';
            this.alt = 'Image not available';
        });
    });
}

// Enhanced Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName = '', price = 0) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();
    saveCartToLocalStorage();

    // Show confirmation
    showCartNotification(`Added to cart: ${productName || 'Product'}`);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCartNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Wishlist Functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId, productName = '') {
    const wishlistBtn = event?.currentTarget;
    const icon = wishlistBtn?.querySelector('i');

    const isInWishlist = wishlist.includes(productId);

    if (isInWishlist) {
        // Remove from wishlist
        wishlist = wishlist.filter(id => id !== productId);
        if (icon) {
            icon.classList.replace('fas', 'far');
            wishlistBtn.classList.remove('text-danger');
        }
        showWishlistNotification(`Removed from wishlist: ${productName || 'Product'}`);
    } else {
        // Add to wishlist
        wishlist.push(productId);
        if (icon) {
            icon.classList.replace('far', 'fas');
            wishlistBtn.classList.add('text-danger');
        }
        showWishlistNotification(`Added to wishlist: ${productName || 'Product'}`);
    }

    updateWishlistCount();
    saveWishlistToLocalStorage();
}

function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

function saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function showWishlistNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-heart"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing Wafa\'a Furniture website...');

    // Load data from backend
    loadHeroFromBackend();
    loadProductsFromBackend();

    // Initialize components
    initMobileMenu();
    initSearch();
    handleImageErrors();

    // Update counters from localStorage
    updateCartCount();
    updateWishlistCount();

    // Setup event listeners
    setupButtonHandlers();
    setupShopNowButtons();

    console.log('Website initialization complete!');
});

// Error handling for fetch requests
function handleFetchError(error, context) {
    console.error(`Error in ${context}:`, error);

    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Connection Error:</strong> Unable to load ${context}. Please check your connection and try again.
        </div>
    `;

    // Insert at the beginning of main content
    const mainContent = document.querySelector('main') || document.body;
    if (mainContent.firstChild) {
        mainContent.insertBefore(errorDiv, mainContent.firstChild);
    } else {
        mainContent.appendChild(errorDiv);
    }

    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Enhanced back to top functionality
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}
// دالة لعرض تفاصيل العقار في modal
async function showPropertyDetails(propertyId) {
    try {
        const response = await fetch(`http://localhost:3001/api/featured-properties/${propertyId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch property details');
        }

        const result = await response.json();
        
        if (result.success) {
            displayPropertyModal(result.data);
        } else {
            throw new Error(result.message);
        }

    } catch (error) {
        console.error('Error loading property details:', error);
        // استخدام بيانات افتراضية إذا فشل الاتصال بالسيرفر
        displayPropertyModal(getDefaultPropertyData(propertyId));
    }
}

// بيانات افتراضية للعقارات
function getDefaultPropertyData(propertyId) {
    const properties = {
        1: {
            id: 1,
            title: "Modern Villa Furniture Ramallah",
            location: "Ramallah",
            price: 450000,
            bedrooms: 5,
            bathrooms: 4,
            area: 320,
            type: "villa",
            status: "new",
            image: "./assets/image/hero-bg2.jpg",
            features: ["Swimming Pool", "Garden", "Garage", "Modern Design", "Fully Furnished"],
            description: "Luxurious modern villa with premium furniture in the heart of Ramallah. This stunning property features contemporary design with high-end finishes and spacious living areas perfect for family living.",
            agent: {
                name: "Mohammed Ahmed",
                phone: "+976 12 345 6789",
                email: "m.ahmed@wafaatl.com"
            }
        },
        2: {
            id: 2,
            title: "Luxury Apartment - Ramallah",
            location: "Ramallah",
            price: 280000,
            bedrooms: 3,
            bathrooms: 2,
            area: 180,
            type: "apartment",
            status: "popular",
            image: "./assets/image/Luxury ApartmentRamallah.jpg",
            features: ["Balcony", "City View", "Security", "Elevator", "Modern Kitchen"],
            description: "Elegant luxury apartment with stunning views and modern amenities. Located in a prime area with easy access to shopping centers and schools.",
            agent: {
                name: "Sarah Johnson",
                phone: "+976 12 345 6790",
                email: "s.johnson@wafaatl.com"
            }
        },
        3: {
            id: 3,
            title: "Family House - Ramallah",
            location: "Ramallah",
            price: 320000,
            bedrooms: 4,
            bathrooms: 3,
            area: 260,
            type: "house",
            status: "standard",
            image: "./assets/image/familyhouse1.jpg",
            features: ["Garden", "Parking", "Spacious", "Family-friendly", "Quiet Neighborhood"],
            description: "Perfect family home in a quiet neighborhood with all necessary amenities. Features large rooms and outdoor space ideal for children.",
            agent: {
                name: "Ahmed Hassan",
                phone: "+976 12 345 6791",
                email: "a.hassan@wafaatl.com"
            }
        },
        4: {
            id: 4,
            title: "Penthouse - Riyadh",
            location: "Riyadh",
            price: 520000,
            bedrooms: 4,
            bathrooms: 3,
            area: 290,
            type: "penthouse",
            status: "luxury",
            image: "./assets/image/familyhouse.jpg",
            features: ["Roof Terrace", "Panoramic View", "Luxury Finishes", "Smart Home", "Private Elevator"],
            description: "Exclusive penthouse with breathtaking views and luxury features. Includes smart home technology and premium appliances.",
            agent: {
                name: "Khalid Al-Rashid",
                phone: "+966 55 123 4567",
                email: "k.rashid@wafaatl.com"
            }
        }
    };
    
    return properties[propertyId] || properties[1];
}

// دالة لعرض الـ modal مع تفاصيل العقار
function displayPropertyModal(property) {
    // إنشاء الـ modal
    const modalHTML = `
        <div class="property-modal-overlay">
            <div class="property-modal">
                <button class="close-modal-btn">&times;</button>
                
                <div class="property-modal-header">
                    <h2>${property.title}</h2>
                    <span class="property-badge ${property.status}">${property.status.charAt(0).toUpperCase() + property.status.slice(1)}</span>
                </div>

                <div class="property-modal-content">
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.title}" onerror="this.src='./assets/image/placeholder.jpg'">
                    </div>

                    <div class="property-details">
                        <div class="property-info-grid">
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${property.location}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-bed"></i>
                                <span>${property.bedrooms} Bedrooms</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-bath"></i>
                                <span>${property.bathrooms} Bathrooms</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-ruler-combined"></i>
                                <span>${property.area}m²</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-home"></i>
                                <span>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                            </div>
                        </div>

                        <div class="property-price-section">
                            <h3>$${property.price.toLocaleString()}</h3>
                        </div>

                        <div class="property-description">
                            <h4>Description</h4>
                            <p>${property.description}</p>
                        </div>

                        <div class="property-features">
                            <h4>Features</h4>
                            <div class="features-list">
                                ${property.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                            </div>
                        </div>

                        <div class="agent-info">
                            <h4>Contact Agent</h4>
                            <div class="agent-details">
                                <div class="agent-name">
                                    <i class="fas fa-user"></i>
                                    <span>${property.agent.name}</span>
                                </div>
                                <div class="agent-phone">
                                    <i class="fas fa-phone"></i>
                                    <span>${property.agent.phone}</span>
                                </div>
                                <div class="agent-email">
                                    <i class="fas fa-envelope"></i>
                                    <span>${property.agent.email}</span>
                                </div>
                            </div>
                        </div>

                        <div class="property-actions">
                            <button class="btn btn-primary" onclick="contactAgent(${property.id})">
                                <i class="fas fa-phone"></i> Contact Agent
                            </button>
                            <button class="btn btn-secondary" onclick="scheduleViewing(${property.id})">
                                <i class="fas fa-calendar"></i> Schedule Viewing
                            </button>
                            <button class="btn-wishlist-property" onclick="togglePropertyWishlist(${property.id})">
                                <i class="far fa-heart"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // إضافة الـ modal إلى الصفحة
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // إضافة event listeners
    const closeBtn = modalContainer.querySelector('.close-modal-btn');
    const overlay = modalContainer.querySelector('.property-modal-overlay');

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modalContainer);
        }
    });

    // منع التمرير خلف الـ modal
    document.body.style.overflow = 'hidden';
}

// دوال مساعدة
function contactAgent(propertyId) {
    alert(`Contacting agent for property ${propertyId}. This would open a contact form.`);
}

function scheduleViewing(propertyId) {
    alert(`Scheduling viewing for property ${propertyId}. This would open a scheduling form.`);
}

function togglePropertyWishlist(propertyId) {
    const wishlistBtn = event.currentTarget;
    const icon = wishlistBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        wishlistBtn.classList.add('active');
        showNotification('Property added to wishlist');
    } else {
        icon.classList.replace('fas', 'far');
        wishlistBtn.classList.remove('active');
        showNotification('Property removed from wishlist');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
// Export functions for global access (if needed)
window.loadCategory = loadCategory;
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.goBackToHome = goBackToHome;
window.showProductDetails = showProductDetails;

