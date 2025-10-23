const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==================== FAQ DATA ====================
const faqData = {
  pageTitle: "Frequently Asked Questions",
  pageDescription: "Find answers to common questions about our products, services and policies",
  categories: [
    {
      id: 1,
      name: "General Questions",
      questions: [
        {
          id: 101,
          question: "What areas in Saudi Arabia do you serve?",
          answer: "We serve all major cities in Saudi Arabia including Riyadh, Jeddah, Dammam, Khobar, Mecca, Medina, and surrounding areas. We offer free delivery within city limits.",
          category: "General"
        },
        {
          id: 102,
          question: "What are your business hours?",
          answer: "Our customer service team is available Sunday through Thursday from 8:00 AM to 6:00 PM. You can reach us by phone, email, or through our website contact form.",
          category: "General"
        },
        {
          id: 103,
          question: "Do you offer both properties and furniture?",
          answer: "Yes! Wafaa Home Furniture provides comprehensive home solutions including premium properties for sale/rent and high-quality furniture to furnish them perfectly.",
          category: "General"
        }
      ]
    },
    {
      id: 2,
      name: "Products & Quality",
      questions: [
        {
          id: 201,
          question: "What is the quality of your furniture?",
          answer: "We offer premium quality furniture made from durable materials including solid wood, genuine leather, and high-grade metals. All our products come with quality guarantees.",
          category: "Quality"
        },
        {
          id: 202,
          question: "Do you offer custom furniture designs?",
          answer: "Yes, we provide custom furniture solutions tailored to your specific needs and space requirements. Contact our design team for custom orders.",
          category: "Quality"
        }
      ]
    },
    {
      id: 3,
      name: "Delivery & Shipping",
      questions: [
        {
          id: 301,
          question: "What is your delivery timeline?",
          answer: "Standard delivery takes 3-5 business days within major cities. Express delivery (1-2 days) is available for an additional fee.",
          category: "Delivery"
        },
        {
          id: 302,
          question: "Do you offer assembly and installation?",
          answer: "Yes, all our furniture deliveries include professional assembly and installation. Our trained team will set up everything in your chosen location.",
          category: "Delivery"
        }
      ]
    }
  ],
  contactInfo: {
    phone: "+966 12 345 6789",
    email: "support@wafaahome.com",
    hours: "Sun-Thu: 8:00 AM - 6:00 PM",
    address: "Riyadh, Saudi Arabia"
  }
};

// ==================== HERO DATA ====================
const heroData = {
  title: "Your Dream Home Starts Here",
  subtitle: "Find your perfect property and furnish it with our premium collection",
  buttons: [
    { text: "Browse Properties", url: "./assets/Properties/properties.html", type: "primary" },
    { text: "Shop Furniture", url: "./assets/allproduct/all-products.html", type: "secondary" }
  ],
  backgroundImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200"
};

// ==================== PRODUCTS DATA ====================
const products = [
  {
    id: 1,
    name: "Luxury Sofa",
    description: "Comfortable and durable modern design sofa",
    price: 1200,
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    inStock: true
  },
  {
    id: 2,
    name: "Dining Table", 
    description: "High quality wooden dining table",
    price: 800,
    category: "Dining Room",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400",
    inStock: true
  }
];

// ==================== ROUTES ====================

// Basic Routes
app.get('/', (req, res) => {
  res.json({ message: 'Wafa Furniture Backend is running!' });
});

// FAQ Route
app.get('/api/faq', (req, res) => {
  console.log('✅ FAQ API called successfully');
  res.json(faqData);
});

// FAQ Search Route
app.get('/api/faq/search', (req, res) => {
  const searchTerm = req.query.q?.toLowerCase();
  console.log('🔍 FAQ search:', searchTerm);
  
  if (!searchTerm) {
    return res.json(faqData);
  }

  const searchResults = {
    ...faqData,
    categories: faqData.categories.map(category => ({
      ...category,
      questions: category.questions.filter(q => 
        q.question.toLowerCase().includes(searchTerm) || 
        q.answer.toLowerCase().includes(searchTerm)
      )
    })).filter(category => category.questions.length > 0)
  };

  res.json(searchResults);
});

// Hero Route
app.get('/api/hero', (req, res) => {
  res.json(heroData);
});

// Products Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// All Products Route
app.get('/api/all-products', (req, res) => {
  const allProductsData = {
    pageTitle: "All Furniture Products",
    products: products 
  };
  res.json(allProductsData);
});

// Status Route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'running', 
    message: 'Server is ready to handle all requests',
    timestamp: new Date(),
    endpoints: [
      '/api/hero',
      '/api/products', 
      '/api/faq',
      '/api/faq/search',
      '/api/all-products',
      '/api/status'
    ]
  });
});

// ==================== SERVER START ====================
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log('✅ Ready to receive requests!');
  console.log('📋 Available endpoints:');
  console.log('   • /api/hero');
  console.log('   • /api/products');
  console.log('   • /api/faq');
  console.log('   • /api/faq/search');
  console.log('   • /api/all-products');
  console.log('   • /api/status');
  console.log('');
  console.log('🔗 Test FAQ endpoint: http://localhost:5001/api/faq');
});