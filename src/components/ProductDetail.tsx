
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Share, Minus, Plus } from 'lucide-react';
import ProductViewer3D from './ProductViewer3D';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
  colors?: string[];
  sizes?: string[];
}

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, selectedColor: string, selectedSize: string) => void;
  onClose: () => void;
}

const ProductDetail = ({ product, onAddToCart, onClose }: ProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#4f46e5');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    product.image,
    'photo-1488590528505-98d2b5aba04b',
    'photo-1581091226825-a6a2a5aee158',
    'photo-1531297484001-80022131f5a1'
  ];

  const colorOptions = product.colors || ['#4f46e5', '#ef4444', '#10b981', '#f59e0b'];
  const sizeOptions = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={`https://images.unsplash.com/${images[activeImageIndex]}?w=600&h=600&fit=crop`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={`https://images.unsplash.com/${img}?w=150&h=150&fit=crop`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* 3D Viewer */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">3D Preview</h3>
              <ProductViewer3D productType="box" color={selectedColor} />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description || "Premium quality product crafted with attention to detail. Perfect for everyday use with modern design and functionality."}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex space-x-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                onClick={() => onAddToCart(product, quantity, selectedColor, selectedSize)}
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
