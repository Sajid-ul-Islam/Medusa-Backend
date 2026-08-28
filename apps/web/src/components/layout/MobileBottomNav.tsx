"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ShoppingBag, Store, UserCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cart, isInitialized } = useCart();

  const itemCount =
    isInitialized && cart?.items
      ? cart.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
      : 0;

  // Don't show bottom nav on checkout flow to maximize conversion space
  if (pathname === "/checkout" || pathname.startsWith("/order-success")) {
    return null;
  }

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Books",
      href: "/books",
      icon: BookOpen,
      isActive: pathname.startsWith("/books"),
    },
    {
      label: "Bag",
      href: "/cart",
      icon: ShoppingBag,
      isActive: pathname === "/cart",
      badge: itemCount,
    },
    {
      label: "Publishers",
      href: "/publishers",
      icon: Store,
      isActive: pathname.startsWith("/publishers"),
    },
    {
      label: "Sell",
      href: "/publisher/dashboard",
      icon: UserCheck,
      isActive: pathname.startsWith("/publisher"),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border/80 shadow-2xl px-2 py-1.5 safe-area-bottom"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                active
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground font-medium"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-extrabold animate-in zoom-in-50">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-tight tracking-tight">
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 h-1 w-6 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
