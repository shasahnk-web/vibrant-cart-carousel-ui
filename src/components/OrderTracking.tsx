
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, MapPin, ArrowLeft } from 'lucide-react';

interface Order {
  id: string;
  items: any[];
  customer: any;
  totals: any;
  status: string;
  estimatedDelivery: string;
}

interface OrderTrackingProps {
  order: Order;
  onBack: () => void;
}

const OrderTracking = ({ order, onBack }: OrderTrackingProps) => {
  const trackingSteps = [
    { 
      id: 'confirmed', 
      label: 'Order Confirmed', 
      icon: CheckCircle, 
      completed: true,
      date: 'Today, 2:30 PM'
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      icon: Package, 
      completed: true,
      date: 'Today, 3:15 PM'
    },
    { 
      id: 'shipped', 
      label: 'Shipped', 
      icon: Truck, 
      completed: false,
      date: 'Tomorrow, 10:00 AM'
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      icon: MapPin, 
      completed: false,
      date: order.estimatedDelivery
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Store
        </Button>

        <div className="space-y-6">
          {/* Order Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                  <p className="text-gray-600 mt-1">Thank you for your order!</p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Order Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Amount</p>
                  <p className="font-medium">${order.totals.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">{order.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Order Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex items-center space-x-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                      `}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.label}
                        </h3>
                        <p className="text-sm text-gray-500">{step.date}</p>
                      </div>
                      {step.completed && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={`https://images.unsplash.com/${item.image}?w=80&h=80&fit=crop`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <div 
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
                <p>{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.postalCode}</p>
                <p>{order.customer.country}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
