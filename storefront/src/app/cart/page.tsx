"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven&apos;t added any books yet.
        </p>
        <Button asChild size="lg">
          <Link href="/books">Browse Books</Link>
        </Button>
      </div>
    );
  }

  const subtotal = cart.subtotal || 0;
  const shipping = cart.shipping_total || 0;
  const total = cart.total || subtotal + shipping;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // In a real implementation, this would redirect to Stripe checkout
    alert("Checkout integration coming soon! This would redirect to Stripe.");
    setIsCheckingOut(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border">
            {cart.items.map((item: any) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border-b last:border-b-0"
              >
                <div className="w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-medium mt-2">
                    ${(item.unit_price / 100).toFixed(2)} each
                  </p>
                  <p className="font-bold">
                    Total: ${(item.total / 100).toFixed(2)}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={isLoading}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      disabled={isLoading}
                      className="ml-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping > 0 ? `$${(shipping / 100).toFixed(2)}` : "Calculated at checkout"}
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={isLoading || isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
