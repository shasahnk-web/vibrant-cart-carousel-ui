
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, X } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onClose, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
      <div className="bg-white h-full w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <Card key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <img 
                      src={`https://images.unsplash.com/${item.image}?w=80&h=80&fit=crop`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <div 
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span>Size: {item.selectedSize}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total: ${total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
