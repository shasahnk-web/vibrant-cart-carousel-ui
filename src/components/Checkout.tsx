
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: (orderData: any) => void;
}

const Checkout = ({ items, onBack, onOrderComplete }: CheckoutProps) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      id: `ORDER-${Date.now()}`,
      items,
      customer: formData,
      totals: { subtotal, shipping, tax, total },
      status: 'processing',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    onOrderComplete(orderData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input 
                      id="postalCode" 
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName" 
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input 
                      id="expiryDate" 
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center space-x-3">
                    <img 
                      src={`https://images.unsplash.com/${item.image}?w=60&h=60&fit=crop`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              onClick={handleSubmit}
            >
              Complete Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
