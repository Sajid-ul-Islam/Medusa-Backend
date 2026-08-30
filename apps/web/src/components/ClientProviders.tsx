"use client";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
