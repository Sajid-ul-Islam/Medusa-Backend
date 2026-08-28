"use client";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/toast";
import { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
