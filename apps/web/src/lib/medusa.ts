import axios from "axios";

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const medusaClient = axios.create({
  baseURL: MEDUSA_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Cart token management
export const getCartId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("medusa_cart_id");
};

export const setCartId = (cartId: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("medusa_cart_id", cartId);
};

export const removeCartId = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("medusa_cart_id");
};

// API functions for Medusa
export const api = {
  // Products
  getProducts: async (params?: { limit?: number; offset?: number; collection_id?: string }) => {
    const response = await medusaClient.get("/store/products", { params });
    return response.data;
  },

  getProduct: async (handle: string) => {
    const response = await medusaClient.get(`/store/products/${handle}`);
    return response.data;
  },

  // Collections
  getCollections: async () => {
    const response = await medusaClient.get("/store/collections");
    return response.data;
  },

  // Cart
  createCart: async (data: any) => {
    const response = await medusaClient.post("/store/carts", data);
    return response.data;
  },

  getCart: async (cartId: string) => {
    const response = await medusaClient.get(`/store/carts/${cartId}`);
    return response.data;
  },

  addToCart: async (cartId: string, variantId: string, quantity: number = 1) => {
    const response = await medusaClient.post(`/store/carts/${cartId}/line-items`, {
      variant_id: variantId,
      quantity,
    });
    return response.data;
  },

  updateCartLineItem: async (cartId: string, lineItemId: string, quantity: number) => {
    const response = await medusaClient.post(`/store/carts/${cartId}/line-items/${lineItemId}`, {
      quantity,
    });
    return response.data;
  },

  deleteCartLineItem: async (cartId: string, lineItemId: string) => {
    const response = await medusaClient.delete(`/store/carts/${cartId}/line-items/${lineItemId}`);
    return response.data;
  },

  // Checkout
  addShippingMethod: async (cartId: string, shippingMethodId: string) => {
    const response = await medusaClient.post(`/store/carts/${cartId}/shipping-methods`, {
      option_id: shippingMethodId,
    });
    return response.data;
  },

  updateCartBilling: async (cartId: string, billingAddress: any) => {
    const response = await medusaClient.post(`/store/carts/${cartId}`, {
      billing_address: billingAddress,
    });
    return response.data;
  },

  updateCartShipping: async (cartId: string, shippingAddress: any) => {
    const response = await medusaClient.post(`/store/carts/${cartId}`, {
      shipping_address: shippingAddress,
    });
    return response.data;
  },

  completeCart: async (cartId: string) => {
    const response = await medusaClient.post(`/store/carts/${cartId}/complete`);
    return response.data;
  },

  // Orders
  getOrder: async (orderId: string) => {
    const response = await medusaClient.get(`/store/orders/${orderId}`);
    return response.data;
  },

  // Publishers (custom endpoint - will be implemented in backend)
  getPublishers: async () => {
    try {
      const response = await medusaClient.get("/store/publishers");
      return response.data;
    } catch (error) {
      // Fallback if endpoint doesn't exist yet
      return { publishers: [] };
    }
  },

  getPublisher: async (handle: string) => {
    try {
      const response = await medusaClient.get(`/store/publishers/${handle}`);
      return response.data;
    } catch (error) {
      return { publisher: null };
    }
  },
};
