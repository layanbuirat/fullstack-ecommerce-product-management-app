document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sortSelect = document.getElementById('sort-by');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const priceInputs = document.querySelectorAll('.price-inputs input');
    const discountOnlyCheckbox = document.querySelector('.discount-only input');
    const categoryCheckboxes = document.querySelectorAll('.filter-checkboxes input');
    const productCards = document.querySelectorAll('.product-card');

    // Apply Filters and Sorting
    applyFiltersBtn.addEventListener('click', function() {
        const selectedCategories = getSelectedCategories();
        const priceRange = getPriceRange();
        const showDiscountOnly = discountOnlyCheckbox.checked;
        const sortMethod = sortSelect.value;

        filterAndSortProducts(selectedCategories, priceRange, showDiscountOnly, sortMethod);
    });

    // Get selected categories
    function getSelectedCategories() {
        const selected = [];
        categoryCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.parentElement.textContent.trim() !== 'All Kitchen Chairs') {
                selected.push(checkbox.parentElement.textContent.trim());
            }
        });
        return selected;
    }

    // Get price range
    function getPriceRange() {
        const from = parseFloat(priceInputs[0].value) || 0;
        const to = parseFloat(priceInputs[1].value) || Infinity;
        return { from, to };
    }

    // Main filtering and sorting function
    function filterAndSortProducts(categories, priceRange, discountOnly, sortMethod) {
        const filteredProducts = Array.from(productCards).filter(card => {
            // Get product data
            const priceText = card.querySelector('.current-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            const originalPrice = card.querySelector('.original-price') ? 
                parseFloat(card.querySelector('.original-price').textContent.replace(/[^0-9.]/g, '')) : null;
            const isDiscounted = originalPrice !== null;
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            
            // Check category filter
            const categoryMatch = categories.length === 0 || 
                categories.some(cat => title.includes(cat.toLowerCase()));
            
            // Check price filter
            const priceMatch = price >= priceRange.from && price <= priceRange.to;
            
            // Check discount filter
            const discountMatch = !discountOnly || isDiscounted;
            
            return categoryMatch && priceMatch && discountMatch;
        });

        // Sort products
        filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''));
            const priceB = parseFloat(b.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''));
            
            switch(sortMethod) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    // Assuming newer products come later in the DOM
                    return Array.from(productCards).indexOf(b) - Array.from(productCards).indexOf(a);
                default: // 'featured'
                    return 0; // Keep original order
            }
        });

        // Update DOM
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            productGrid.appendChild(product);
        });

        // Update results count
        document.querySelector('.results-count p').textContent = `Results: ${filteredProducts.length} items`;
    }

    // Reset filters when "All Kitchen Chairs" is checked
    document.querySelector('.filter-checkboxes label:first-child input').addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('.filter-checkboxes input:not(:first-child)').forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    });
});