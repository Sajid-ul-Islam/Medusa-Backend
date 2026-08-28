"use client";

import Link from "next/link";
import { ShoppingCart, BookOpen, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { cart } = useCart();
  const itemCount = cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">BookHub</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/books" className="text-sm font-medium hover:text-primary">
            Browse Books
          </Link>
          <Link href="/publishers" className="text-sm font-medium hover:text-primary">
            Publishers
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button asChild>
            <Link href="/publisher/dashboard">
              <Store className="mr-2 h-4 w-4" />
              Sell Books
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
