"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, getCartId, setCartId, removeCartId } from "@/lib/medusa";

interface CartContextType {
  cart: any | null;
  isLoading: boolean;
  isInitialized: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  // Initialize or load cart on mount (client-side only)
  useEffect(() => {
    const initCart = async () => {
      try {
        const cartId = getCartId();
        if (cartId) {
          try {
            const response = await api.getCart(cartId);
            setCart(response.cart);
          } catch (error) {
            console.error("Failed to load cart:", error);
            removeCartId();
            await createNewCart();
          }
        } else {
          await createNewCart();
        }
      } catch (error) {
        console.error("Cart initialization error:", error);
      } finally {
        setIsInitialized(true);
      }
    };
    initCart();
  }, []);

  const createNewCart = async () => {
    try {
      const response = await api.createCart({});
      if (response.cart?.id) {
        setCartId(response.cart.id);
        setCart(response.cart);
      }
    } catch (error) {
      console.error("Failed to create cart:", error);
    }
  };

  const refreshCart = useCallback(async () => {
    const cartId = getCartId();
    if (cartId) {
      try {
        const response = await api.getCart(cartId);
        setCart(response.cart);
      } catch (error) {
        console.error("Failed to refresh cart:", error);
      }
    }
  }, []);

  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const cartId = getCartId();
      if (!cartId) {
        await createNewCart();
        const newCartId = getCartId();
        if (newCartId) {
          await api.addToCart(newCartId, variantId, quantity);
          await refreshCart();
        }
      } else {
        await api.addToCart(cartId, variantId, quantity);
        await refreshCart();
      }
      // Open the slide-over drawer automatically for a seamless UX
      setIsDrawerOpen(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    setIsLoading(true);
    try {
      const cartId = getCartId();
      if (cartId) {
        await api.deleteCartLineItem(cartId, lineItemId);
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const cartId = getCartId();
      if (cartId) {
        if (quantity <= 0) {
          await api.deleteCartLineItem(cartId, lineItemId);
        } else {
          await api.updateCartLineItem(cartId, lineItemId, quantity);
        }
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    removeCartId();
    setCart(null);
    createNewCart();
  };

  if (!isInitialized) {
    return <>{children}</>;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isInitialized,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    return {
      cart: null,
      isLoading: false,
      isInitialized: true,
      isDrawerOpen: false,
      openDrawer: () => {},
      closeDrawer: () => {},
      toggleDrawer: () => {},
      addToCart: async () => {},
      removeFromCart: async () => {},
      updateQuantity: async () => {},
      clearCart: () => {},
      refreshCart: async () => {},
    };
  }
  return context;
}
