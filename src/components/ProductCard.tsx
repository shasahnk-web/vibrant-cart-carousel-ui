
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={`https://images.unsplash.com/${product.image}?w=400&h=400&fit=crop`}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={() => onProductClick(product)}
          />
          <Button 
            variant="ghost" 
            size="sm"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          
          <h3 
            className="font-medium text-gray-900 mb-2 hover:text-blue-600 transition-colors"
            onClick={() => onProductClick(product)}
          >
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            
            <Button 
              size="sm"
              onClick={() => onAddToCart(product)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
