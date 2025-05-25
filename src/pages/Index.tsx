
import React, { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import OrderTracking from '@/components/OrderTracking';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'Premium Laptop Backpack',
    price: 89.99,
    originalPrice: 119.99,
    image: 'photo-1649972904349-6e44c42644a7',
    rating: 4.5,
    reviews: 124,
    category: 'Accessories',
    description: 'A premium laptop backpack with multiple compartments and water-resistant material.',
    colors: ['#1f2937', '#7c3aed', '#dc2626'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '2',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    image: 'photo-1488590528505-98d2b5aba04b',
    rating: 4.8,
    reviews: 89,
    category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    colors: ['#000000', '#ffffff', '#3b82f6'],
    sizes: ['One Size']
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    image: 'photo-1581091226825-a6a2a5aee158',
    rating: 4.3,
    reviews: 156,
    category: 'Wearables',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    colors: ['#374151', '#f59e0b', '#ef4444'],
    sizes: ['38mm', '42mm']
  },
  {
    id: '4',
    name: 'Ultrabook Pro 15"',
    price: 1299.99,
    image: 'photo-1531297484001-80022131f5a1',
    rating: 4.9,
    reviews: 67,
    category: 'Computers',
    description: 'High-performance ultrabook with 16GB RAM and 512GB SSD.',
    colors: ['#6b7280', '#1f2937'],
    sizes: ['13"', '15"']
  },
  {
    id: '5',
    name: 'Professional Camera',
    price: 799.99,
    image: 'photo-1486312338219-ce68d2c6f44d',
    rating: 4.6,
    reviews: 203,
    category: 'Photography',
    description: 'Mirrorless camera with 24MP sensor and 4K video recording.',
    colors: ['#000000', '#6b7280'],
    sizes: ['Body Only', 'With Lens']
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 149.99,
    originalPrice: 199.99,
    image: 'photo-1618160702438-9b02ab6515c9',
    rating: 4.4,
    reviews: 98,
    category: 'Audio',
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
    colors: ['#dc2626', '#2563eb', '#059669'],
    sizes: ['Compact', 'Standard']
  }
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState('store'); // store, checkout, tracking
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Accessories', 'Wearables', 'Computers', 'Photography', 'Audio'];

  const filteredProducts = selectedCategory === 'All' 
    ? sampleProducts 
    : sampleProducts.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product, quantity = 1, selectedColor = '', selectedSize = '') => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, {
        ...product,
        quantity,
        selectedColor: selectedColor || product.colors?.[0] || '#4f46e5',
        selectedSize: selectedSize || product.sizes?.[0] || 'M'
      }]);
    }
    
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleUpdateCartQuantity = (id, quantity) => {
    if (quantity === 0) {
      handleRemoveFromCart(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setCurrentView('checkout');
  };

  const handleOrderComplete = (orderData) => {
    setCurrentOrder(orderData);
    setCartItems([]);
    setCurrentView('tracking');
  };

  const handleBackToStore = () => {
    setCurrentView('store');
    setCurrentOrder(null);
  };

  if (currentView === 'checkout') {
    return (
      <Checkout 
        items={cartItems}
        onBack={() => setShowCart(true)}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentView === 'tracking' && currentOrder) {
    return (
      <OrderTracking 
        order={currentOrder}
        onBack={handleBackToStore}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Premium quality, modern design, unbeatable prices
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Badge variant="secondary" className="text-sm">
              {filteredProducts.length} products
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default Index;
