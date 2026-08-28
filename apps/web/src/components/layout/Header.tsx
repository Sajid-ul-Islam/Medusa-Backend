"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, BookOpen, Store, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export function Header() {
  const router = useRouter();
  const { cart, isInitialized } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const itemCount =
    isInitialized && cart?.items
      ? cart.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
      : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">BookHub</span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md relative items-center"
        >
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-full border bg-muted/40 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </form>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            href="/books"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Books
          </Link>
          <Link
            href="/publishers"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Publishers
          </Link>
          <Link
            href="/publisher/register"
            className="text-sm font-medium text-primary hover:underline transition-colors flex items-center gap-1"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Become a Publisher
          </Link>
        </nav>

        {/* Action Buttons, Theme Switcher & Cart */}
        <div className="flex items-center space-x-3">
          <ThemeSwitcher />

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold animate-in zoom-in-50">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button asChild size="sm">
            <Link href="/publisher/dashboard">
              <Store className="mr-1.5 h-4 w-4" />
              Publisher Portal
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
