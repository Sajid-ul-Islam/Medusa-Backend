"use client";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
