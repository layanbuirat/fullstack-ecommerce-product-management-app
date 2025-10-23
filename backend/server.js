const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sample data - Complete with all categories
const sampleProducts = [
    // 🛏️ BEDROOM PRODUCTS
    {
        id: 1,
        name: "King Size Luxury Bed",
        price: 1299.99,
        originalPrice: 1599.99,
        discount: 19,
        category: "bedroom",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 15,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop",
        description: "Premium king size bed with storage and comfortable headboard",
        features: ["Storage drawers", "Headboard", "Durable wood", "Easy assembly"],
        dimensions: "200x180x100 cm",
        material: "Solid Wood",
        colors: ["Brown", "White", "Black"],
        rating: 4.8,
        reviews: 124,
        instock: true
    },
    {
        id: 2,
        name: "Modern Wardrobe 3-Door",
        price: 899.99,
        originalPrice: 1199.99,
        discount: 25,
        category: "bedroom",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 8,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop",
        description: "Spacious 3-door wardrobe with mirror and shelves",
        features: ["Mirror door", "Shelves", "Hanging space", "Lockable"],
        dimensions: "180x60x200 cm",
        material: "MDF Wood",
        colors: ["White", "Grey", "Walnut"],
        rating: 4.6,
        reviews: 89,
        instock: true
    },
    {
        id: 3,
        name: "Queen Size Bed Frame",
        price: 799.99,
        category: "bedroom",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 12,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop",
        description: "Elegant queen size bed with modern design",
        features: ["Metal frame", "Headboard", "Sturdy construction"],
        dimensions: "160x200x90 cm",
        material: "Metal & Wood",
        colors: ["Black", "Silver"],
        rating: 4.5,
        reviews: 67,
        instock: true
    },
    {
        id: 4,
        name: "Dressing Table with Stool",
        price: 459.99,
        originalPrice: 599.99,
        discount: 23,
        category: "bedroom",
        delivery: "15 working days for all cities",
        availableQuantity: 6,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop",
        description: "Beautiful dressing table with mirror and storage",
        features: ["Large mirror", "Drawers", "Matching stool"],
        dimensions: "120x45x75 cm",
        material: "Engineered Wood",
        colors: ["White", "Pink"],
        rating: 4.4,
        reviews: 45,
        instock: true
    },
    {
        id: 5,
        name: "Nightstand Set of 2",
        price: 299.99,
        category: "bedroom",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 20,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop",
        description: "Matching nightstands for both sides of the bed",
        features: ["Drawer", "Shelf", "Modern design"],
        dimensions: "40x35x50 cm",
        material: "Wood",
        colors: ["Brown", "Black"],
        rating: 4.3,
        reviews: 78,
        instock: true
    },

    // 🛋️ LIVING ROOM PRODUCTS - صور فريدة
    {
        id: 101,
        name: "Leather Sofa 3-Seater",
        price: 1899.99,
        originalPrice: 2299.99,
        discount: 17,
        category: "living-room",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 10,
        image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&auto=format&fit=crop",
        description: "Luxurious genuine leather sofa 3-seater",
        features: ["Genuine leather", "Comfortable", "Durable"],
        dimensions: "220x95x85 cm",
        material: "Leather",
        colors: ["Black", "Brown", "Cream"],
        rating: 4.7,
        reviews: 156,
        instock: true
    },
    {
        id: 102,
        name: "Modern TV Unit",
        price: 699.99,
        category: "living-room",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 15,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
        description: "Sleek TV unit with storage shelves",
        features: ["Cable management", "Shelves", "Modern design"],
        dimensions: "180x40x50 cm",
        material: "MDF & Glass",
        colors: ["Black", "White"],
        rating: 4.5,
        reviews: 92,
        instock: true
    },
    {
        id: 103,
        name: "Coffee Table Glass Top",
        price: 349.99,
        originalPrice: 449.99,
        discount: 22,
        category: "living-room",
        delivery: "15 working days for all cities",
        availableQuantity: 25,
        image: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=600&auto=format&fit=crop",
        description: "Elegant coffee table with tempered glass top",
        features: ["Tempered glass", "Metal legs", "Sturdy"],
        dimensions: "120x60x45 cm",
        material: "Glass & Metal",
        colors: ["Chrome", "Black"],
        rating: 4.4,
        reviews: 63,
        instock: true
    },
    {
        id: 104,
        name: "Sectional Sofa L-Shape",
        price: 2499.99,
        category: "living-room",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 5,
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop",
        description: "Large L-shaped sectional sofa for family",
        features: ["Modular", "Washable covers", "Comfortable"],
        dimensions: "280x180x85 cm",
        material: "Fabric",
        colors: ["Grey", "Beige", "Blue"],
        rating: 4.8,
        reviews: 134,
        instock: true
    },
    {
        id: 105,
        name: "Bookshelf 5-Tier",
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        category: "living-room",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 18,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop",
        description: "Spacious 5-tier bookshelf for storage",
        features: ["5 shelves", "Adjustable", "Sturdy"],
        dimensions: "80x30x180 cm",
        material: "Wood",
        colors: ["Brown", "White"],
        rating: 4.3,
        reviews: 87,
        instock: true
    },
    {
        id: 106,
        name: "Sofa Bed Convertible",
        price: 1299.99,
        originalPrice: 1599.99,
        discount: 19,
        category: "living-room",
        delivery: "15 working days for all cities",
        availableQuantity: 7,
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&auto=format&fit=crop",
        description: "Convertible sofa bed for guests",
        features: ["Converts to bed", "Comfortable", "Space-saving"],
        dimensions: "190x90x85 cm",
        material: "Fabric",
        colors: ["Grey", "Beige"],
        rating: 4.4,
        reviews: 78,
        instock: true
    },
    {
        id: 107,
        name: "Accent Chair Modern",
        price: 299.99,
        category: "living-room",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 22,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop",
        description: "Comfortable accent chair for living room",
        features: ["Padded seat", "Modern design", "Comfortable"],
        dimensions: "65x65x85 cm",
        material: "Fabric & Wood",
        colors: ["Grey", "Blue", "Beige"],
        rating: 4.5,
        reviews: 45,
        instock: true
    },
    {
        id: 108,
        name: "Entertainment Center",
        price: 899.99,
        originalPrice: 1199.99,
        discount: 25,
        category: "living-room",
        delivery: "15 working days for all cities",
        availableQuantity: 8,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
        description: "Large entertainment center for TV and accessories",
        features: ["Multiple shelves", "Cable management", "Spacious"],
        dimensions: "200x45x180 cm",
        material: "Wood & Glass",
        colors: ["Black", "Brown"],
        rating: 4.6,
        reviews: 67,
        instock: true
    },

    // 🍽️ KITCHEN PRODUCTS - صور فريدة
    {
        id: 201,
        name: "Modern Kitchen Cabinet Set",
        price: 2999.99,
        originalPrice: 3999.99,
        discount: 25,
        category: "kitchen",
        delivery: "15 working days for all cities",
        availableQuantity: 4,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop",
        description: "Complete kitchen cabinet set with countertop",
        features: ["Soft-close doors", "Spacious", "Durable"],
        dimensions: "Custom sizes",
        material: "MDF & Laminate",
        colors: ["White", "Grey", "Wood"],
        rating: 4.6,
        reviews: 78,
        instock: true
    },
    {
        id: 202,
        name: "Kitchen Island with Storage",
        price: 899.99,
        category: "kitchen",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 7,
        image: "https://images.unsplash.com/photo-1556909115-4d6a62dbb8e3?w=600&auto=format&fit=crop",
        description: "Versatile kitchen island with seating",
        features: ["Storage drawers", "Seating area", "Wheels"],
        dimensions: "120x80x90 cm",
        material: "Wood & Metal",
        colors: ["White", "Black"],
        rating: 4.5,
        reviews: 56,
        instock: true
    },
    {
        id: 203,
        name: "Dining Table 6-Seater",
        price: 799.99,
        originalPrice: 999.99,
        discount: 20,
        category: "kitchen",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 9,
        image: "https://images.unsplash.com/photo-1617802690999-421b2d1dff43?w=600&auto=format&fit=crop",
        description: "Large dining table for family meals",
        features: ["Extendable", "Scratch-resistant", "Sturdy"],
        dimensions: "160x90x75 cm",
        material: "Solid Wood",
        colors: ["Brown", "Black"],
        rating: 4.7,
        reviews: 112,
        instock: true
    },
    {
        id: 204,
        name: "Dining Chairs Set of 4",
        price: 399.99,
        category: "kitchen",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 20,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop",
        description: "Comfortable dining chairs set",
        features: ["Padded seats", "Sturdy legs", "Modern design"],
        dimensions: "45x45x85 cm",
        material: "Wood & Fabric",
        colors: ["Black", "White", "Grey"],
        rating: 4.4,
        reviews: 89,
        instock: true
    },

    // 🍽️ DINING ROOM PRODUCTS - صور فريدة
    {
        id: 301,
        name: "Formal Dining Set 8-Piece",
        price: 1899.99,
        originalPrice: 2399.99,
        discount: 21,
        category: "dining-room",
        delivery: "15 working days for all cities",
        availableQuantity: 3,
        image: "https://images.unsplash.com/photo-1617802690999-421b2d1dff43?w=600&auto=format&fit=crop",
        description: "Elegant formal dining set for special occasions",
        features: ["Table + 6 chairs", "High-quality", "Elegant design"],
        dimensions: "Table: 200x100x75 cm",
        material: "Mahogany Wood",
        colors: ["Dark Brown", "Cherry"],
        rating: 4.8,
        reviews: 67,
        instock: true
    },
    {
        id: 302,
        name: "Round Dining Table",
        price: 649.99,
        category: "dining-room",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 8,
        image: "https://images.unsplash.com/photo-1617802691000-6b4a6e5e3b3a?w=600&auto=format&fit=crop",
        description: "Space-saving round dining table",
        features: ["Round design", "Compact", "Modern"],
        dimensions: "120x120x75 cm",
        material: "Glass & Metal",
        colors: ["Chrome", "Black"],
        rating: 4.5,
        reviews: 34,
        instock: true
    },

    // 💼 OFFICE PRODUCTS - صور فريدة
    {
        id: 401,
        name: "Executive Office Desk",
        price: 899.99,
        originalPrice: 1199.99,
        discount: 25,
        category: "office",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 10,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop",
        description: "Spacious executive office desk",
        features: ["Large workspace", "Drawers", "Cable management"],
        dimensions: "160x80x75 cm",
        material: "Wood & Metal",
        colors: ["Brown", "Black"],
        rating: 4.7,
        reviews: 89,
        instock: true
    },
    {
        id: 402,
        name: "Ergonomic Office Chair",
        price: 399.99,
        category: "office",
        delivery: "24 hours in Riyadh - 15 days for other cities",
        availableQuantity: 25,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&auto=format&fit=crop",
        description: "Comfortable ergonomic office chair",
        features: ["Adjustable height", "Lumbar support", "Swivel"],
        dimensions: "65x65x120 cm",
        material: "Mesh & Metal",
        colors: ["Black", "Grey"],
        rating: 4.6,
        reviews: 156,
        instock: true
    }
];

// ======================
// FEATURED PROPERTIES ENDPOINTS
// ======================

// بيانات العقارات المميزة
const featuredProperties = [
    {
        id: 1,
        title: "Modern Villa Furniture Ramallah",
        location: "Ramallah",
        price: 450000,
        bedrooms: 5,
        bathrooms: 4,
        area: 320,
        type: "villa",
        status: "new",
        image: "/assets/image/hero-bg2.jpg",
        features: ["Swimming Pool", "Garden", "Garage", "Modern Design"],
        description: "Luxurious modern villa with premium furniture in the heart of Ramallah.",
        agent: {
            name: "Mohammed Ahmed",
            phone: "+976 12 345 6789",
            email: "m.ahmed@wafaatl.com"
        },
        createdAt: "2024-01-15"
    },
    {
        id: 2,
        title: "Luxury Apartment - Ramallah",
        location: "Ramallah",
        price: 280000,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        type: "apartment",
        status: "popular",
        image: "/assets/image/Luxury ApartmentRamallah.jpg",
        features: ["Balcony", "City View", "Security", "Elevator"],
        description: "Elegant luxury apartment with stunning views and modern amenities.",
        agent: {
            name: "Sarah Johnson",
            phone: "+976 12 345 6790",
            email: "s.johnson@wafaatl.com"
        },
        createdAt: "2024-01-10"
    },
    {
        id: 3,
        title: "Family House - Ramallah",
        location: "Ramallah",
        price: 320000,
        bedrooms: 4,
        bathrooms: 3,
        area: 260,
        type: "house",
        status: "standard",
        image: "/assets/image/familyhouse1.jpg",
        features: ["Garden", "Parking", "Spacious", "Family-friendly"],
        description: "Perfect family home in a quiet neighborhood with all necessary amenities.",
        agent: {
            name: "Ahmed Hassan",
            phone: "+976 12 345 6791",
            email: "a.hassan@wafaatl.com"
        },
        createdAt: "2024-01-08"
    },
    {
        id: 4,
        title: "Penthouse - Riyadh",
        location: "Riyadh",
        price: 520000,
        bedrooms: 4,
        bathrooms: 3,
        area: 290,
        type: "penthouse",
        status: "luxury",
        image: "/assets/image/familyhouse.jpg",
        features: ["Roof Terrace", "Panoramic View", "Luxury Finishes", "Smart Home"],
        description: "Exclusive penthouse with breathtaking views and luxury features.",
        agent: {
            name: "Khalid Al-Rashid",
            phone: "+966 55 123 4567",
            email: "k.rashid@wafaatl.com"
        },
        createdAt: "2024-01-12"
    },
    {
        id: 5,
        title: "Modern Apartment - Jeddah",
        location: "Jeddah",
        price: 350000,
        bedrooms: 3,
        bathrooms: 2,
        area: 200,
        type: "apartment",
        status: "new",
        image: "/assets/image/hero-bg2.jpg",
        features: ["Sea View", "Modern Kitchen", "Gym Access", "Pool"],
        description: "Contemporary apartment with sea view and modern amenities.",
        agent: {
            name: "Fatima Al-Mansour",
            phone: "+966 54 987 6543",
            email: "f.mansour@wafaatl.com"
        },
        createdAt: "2024-01-05"
    },
    {
        id: 6,
        title: "Villa with Garden - Al Khobar",
        location: "Al Khobar",
        price: 480000,
        bedrooms: 5,
        bathrooms: 4,
        area: 350,
        type: "villa",
        status: "popular",
        image: "/assets/image/familyhouse1.jpg",
        features: ["Large Garden", "Private Pool", "Maid Room", "Garage"],
        description: "Spacious villa with beautiful garden and private pool.",
        agent: {
            name: "Omar Al-Ghamdi",
            phone: "+966 53 456 7890",
            email: "o.ghamdi@wafaatl.com"
        },
        createdAt: "2024-01-03"
    }
];

// الحصول على جميع العقارات المميزة
app.get('/api/featured-properties', (req, res) => {
    try {
        const { limit, location, type, minPrice, maxPrice } = req.query;
        
        let filteredProperties = [...featuredProperties];

        // التصفية حسب الموقع
        if (location) {
            filteredProperties = filteredProperties.filter(property => 
                property.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        // التصفية حسب النوع
        if (type) {
            filteredProperties = filteredProperties.filter(property => 
                property.type === type
            );
        }

        // التصفية حسب السعر
        if (minPrice) {
            filteredProperties = filteredProperties.filter(property => 
                property.price >= parseInt(minPrice)
            );
        }

        if (maxPrice) {
            filteredProperties = filteredProperties.filter(property => 
                property.price <= parseInt(maxPrice)
            );
        }

        // تحديد الحد الأقصى للنتائج
        if (limit) {
            filteredProperties = filteredProperties.slice(0, parseInt(limit));
        }

        res.json({
            success: true,
            count: filteredProperties.length,
            data: filteredProperties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching featured properties',
            error: error.message
        });
    }
});

// الحصول على عقار محدد بواسطة ID
app.get('/api/featured-properties/:id', (req, res) => {
    try {
        const propertyId = parseInt(req.params.id);
        const property = featuredProperties.find(p => p.id === propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        res.json({
            success: true,
            data: property
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching property',
            error: error.message
        });
    }
});

// الحصول على العقارات حسب الموقع
app.get('/api/featured-properties/location/:location', (req, res) => {
    try {
        const location = req.params.location.toLowerCase();
        const properties = featuredProperties.filter(property => 
            property.location.toLowerCase().includes(location)
        );

        res.json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching properties by location',
            error: error.message
        });
    }
});

// الحصول على أنواع العقارات المتاحة
app.get('/api/property-types', (req, res) => {
    try {
        const types = [...new Set(featuredProperties.map(property => property.type))];
        
        res.json({
            success: true,
            data: types
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching property types',
            error: error.message
        });
    }
});

// الحصول على المواقع المتاحة
app.get('/api/property-locations', (req, res) => {
    try {
        const locations = [...new Set(featuredProperties.map(property => property.location))];
        
        res.json({
            success: true,
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching property locations',
            error: error.message
        });
    }
});

// إضافة عقار جديد (لأغراض التطوير)
app.post('/api/featured-properties', (req, res) => {
    try {
        const newProperty = {
            id: featuredProperties.length + 1,
            ...req.body,
            createdAt: new Date().toISOString()
        };

        featuredProperties.push(newProperty);

        res.status(201).json({
            success: true,
            message: 'Property added successfully',
            data: newProperty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding property',
            error: error.message
        });
    }
});

// تحديث عقار موجود
app.put('/api/featured-properties/:id', (req, res) => {
    try {
        const propertyId = parseInt(req.params.id);
        const propertyIndex = featuredProperties.findIndex(p => p.id === propertyId);

        if (propertyIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        featuredProperties[propertyIndex] = {
            ...featuredProperties[propertyIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'Property updated successfully',
            data: featuredProperties[propertyIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating property',
            error: error.message
        });
    }
});

// حذف عقار
app.delete('/api/featured-properties/:id', (req, res) => {
    try {
        const propertyId = parseInt(req.params.id);
        const propertyIndex = featuredProperties.findIndex(p => p.id === propertyId);

        if (propertyIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        const deletedProperty = featuredProperties.splice(propertyIndex, 1)[0];

        res.json({
            success: true,
            message: 'Property deleted successfully',
            data: deletedProperty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting property',
            error: error.message
        });
    }
});

// صفحة رئيسية للعقارات
app.get('/api/properties-page', (req, res) => {
    try {
        const propertiesPageData = {
            pageTitle: "Featured Properties - Wafa'a Furniture",
            description: "Discover our premium selection of properties in prime locations",
            featuredProperties: featuredProperties.slice(0, 6),
            totalProperties: featuredProperties.length,
            availableLocations: [...new Set(featuredProperties.map(p => p.location))],
            filters: {
                types: ["villa", "apartment", "house", "penthouse"],
                priceRanges: [
                    { min: 0, max: 300000, label: "Under $300,000" },
                    { min: 300000, max: 500000, label: "$300,000 - $500,000" },
                    { min: 500000, max: 1000000, label: "Over $500,000" }
                ]
            }
        };

        res.json({
            success: true,
            data: propertiesPageData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching properties page data',
            error: error.message
        });
    }
});
// Initialize products array
let allProducts = [...sampleProducts];
let cart = {
    items: [],
    totalItems: 0,
    totalPrice: 0
};

// Enhanced products endpoint
app.get('/api/enhanced-products', (req, res) => {
    console.log('Enhanced products API called');
    res.json(allProducts);
});

// Get all products
app.get('/api/products', (req, res) => {
    res.json(allProducts);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
    const category = req.params.category;
    const filteredProducts = allProducts.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );
    res.json(filteredProducts);
});

// Get discounted products
app.get('/api/products/discounts', (req, res) => {
    const discountedProducts = allProducts.filter(product => product.discount > 0);
    res.json(discountedProducts);
});

// Get single product by ID
app.get('/api/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = allProducts.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Cart endpoints
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

app.post('/api/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (product.availableQuantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }

    // Update totals
    cart.totalItems += quantity;
    cart.totalPrice += product.price * quantity;

    res.json({
        message: 'Product added to cart',
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice
    });
});

// Load sample data endpoint
app.post('/api/load-sample-data', (req, res) => {
    try {
        allProducts = [...sampleProducts];

        res.json({
            success: true,
            message: 'Sample data loaded successfully!',
            totalProducts: allProducts.length,
            categories: {
                bedroom: allProducts.filter(p => p.category === 'bedroom').length,
                'living-room': allProducts.filter(p => p.category === 'living-room').length,
                kitchen: allProducts.filter(p => p.category === 'kitchen').length,
                'dining-room': allProducts.filter(p => p.category === 'dining-room').length,
                office: allProducts.filter(p => p.category === 'office').length
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Statistics endpoint
app.get('/api/stats', (req, res) => {
    const stats = {
        totalProducts: allProducts.length,
        categories: {
            bedroom: allProducts.filter(p => p.category === 'bedroom').length,
            'living-room': allProducts.filter(p => p.category === 'living-room').length,
            kitchen: allProducts.filter(p => p.category === 'kitchen').length,
            'dining-room': allProducts.filter(p => p.category === 'dining-room').length,
            office: allProducts.filter(p => p.category === 'office').length
        },
        discountedProducts: allProducts.filter(p => p.discount > 0).length,
        inStockProducts: allProducts.filter(p => p.availableQuantity > 0).length
    };
    res.json(stats);
});

// Other existing endpoints
app.get('/api/hero', (req, res) => {
    res.json({
        title: "Wafa'a Home Furniture",
        subtitle: "Premium Homes & Furniture Solutions",
        description: "Discover the perfect furniture for your home with fast delivery across Saudi Arabia"
    });
});

app.get('/api/faq', (req, res) => {
    res.json([
        {
            question: "What is your delivery time?",
            answer: "We offer 24-hour delivery in Riyadh and 15 days for other cities."
        },
        {
            question: "Do you offer installation services?",
            answer: "Yes, we offer professional installation services starting from $75."
        }
    ]);
});

app.get('/api/categories', (req, res) => {
    res.json([
        "Bedroom",
        "Living Room",
        "Kitchen",
        "Dining Room",
        "Office"
    ]);
});

app.get('/api/properties', (req, res) => {
    res.json([
        {
            name: "Fast Delivery",
            value: "24 hours in Riyadh"
        },
        {
            name: "Quality Guarantee",
            value: "2 years warranty"
        }
    ]);
});

app.get('/api/all-products', (req, res) => {
    res.json(allProducts);
});

app.get('/api/status', (req, res) => {
    res.json({ status: "Server is running smoothly", timestamp: new Date() });
});
// Enhanced FAQ endpoints
app.get('/api/faq', (req, res) => {
    const faqData = [
        {
            question: "What is your delivery time?",
            answer: "We offer 24-hour delivery in Riyadh and 15 days for other cities."
        },
        {
            question: "Do you offer installation services?",
            answer: "Yes, we offer professional installation services starting from $75."
        },
        {
            question: "What is your return policy?",
            answer: "We offer 30-day return policy for unused items in original packaging."
        },
        {
            question: "Do you deliver outside Saudi Arabia?",
            answer: "Currently we only deliver within Saudi Arabia."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept Visa, Mastercard, Apple Pay, STC Pay, and cash on delivery."
        },
        {
            question: "Do you offer warranty on products?",
            answer: "Yes, we offer 2 years warranty on all our furniture products."
        },
        {
            question: "Can I track my order?",
            answer: "Yes, you will receive tracking information via SMS and email."
        },
        {
            question: "Do you have physical stores?",
            answer: "Yes, we have showrooms in Riyadh, Jeddah, and Dammam."
        }
    ];
    res.json(faqData);
});

// FAQ search endpoint
app.get('/api/faq/search', (req, res) => {
    const searchTerm = req.query.q?.toLowerCase() || '';
    
    const allFAQs = [
        {
            question: "What is your delivery time?",
            answer: "We offer 24-hour delivery in Riyadh and 15 days for other cities."
        },
        {
            question: "Do you offer installation services?",
            answer: "Yes, we offer professional installation services starting from $75."
        },
        // ... add all other questions here
    ];
    
    const filteredFAQs = allFAQs.filter(item => 
        item.question.toLowerCase().includes(searchTerm) || 
        item.answer.toLowerCase().includes(searchTerm)
    );
    
    res.json(filteredFAQs);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Ready to receive requests from frontend!');
    console.log('\nAvailable endpoints:');
    console.log('  - /api/hero');
    console.log('  - /api/products');
    console.log('  - /api/faq');
    console.log('  - /api/categories');
    console.log('  - /api/properties');
    console.log('  - /api/all-products');
    console.log('  - /api/status');
    console.log('  - /api/enhanced-products');
    console.log('  - /api/products/category/:category');
    console.log('  - /api/cart');
    console.log('  - /api/load-sample-data');
    console.log('  - /api/stats');
    console.log('  - /api/featured-properties');
    console.log('  - /api/featured-properties/:id');
    console.log('  - /api/featured-properties/location/:location');
    console.log('  - /api/property-types');
    console.log('  - /api/property-locations');
    console.log('  - /api/properties-page');
    console.log(`\nTotal products loaded: ${allProducts.length}`);
    console.log(`Featured properties: ${featuredProperties.length}`);
    console.log(`Bedroom: ${allProducts.filter(p => p.category === 'bedroom').length}`);
    console.log(`Living Room: ${allProducts.filter(p => p.category === 'living-room').length}`);
    console.log(`Kitchen: ${allProducts.filter(p => p.category === 'kitchen').length}`);
    console.log(`Dining Room: ${allProducts.filter(p => p.category === 'dining-room').length}`);
    console.log(`Office: ${allProducts.filter(p => p.category === 'office').length}`);
});