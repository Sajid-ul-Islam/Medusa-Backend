/**
 * Centralized Domain Type Definitions for BookHub Marketplace
 */

export interface Publisher {
  id: string;
  name: string;
  handle: string;
  description?: string;
  store_name?: string;
  logo_url?: string;
  banner_url?: string;
  verified?: boolean;
  is_verified?: boolean;
  total_books?: number;
  location?: string;
  email?: string;
  facebook?: string;
  website?: string;
  phone?: string;
  status?: "active" | "pending" | "suspended";
}

export interface BookVariant {
  id: string;
  title: string;
  price: number;
  format: "Physical" | "Digital" | "Hardcover" | "Audiobook" | string;
  stock?: number;
  sku?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher?: Publisher;
  thumbnail: string;
  description: string;
  long_description?: string;
  categories: string[];
  variants: BookVariant[];
  handle: string;
  rating?: number;
  review_count?: number;
  pages?: number;
  language?: string;
  publish_year?: number;
  isbn?: string;
  is_bestseller?: boolean;
  is_digital?: boolean;
  is_physical?: boolean;
  has_audiobook?: boolean;
  audiobook_duration?: string;
  sample_chapter?: string;
}

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  variant_id: string;
  product_id: string;
  thumbnail: string;
  unit_price: number;
  total: number;
  publisher?: Publisher | { name: string };
  format?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  shipping_total: number;
  discount_total?: number;
  gift_wrap?: boolean;
}

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  total: number;
  publisher?: { name: string };
  format?: string;
}

export interface Order {
  id: string;
  display_id: number | string;
  status: "pending" | "processing" | "completed" | "cancelled";
  payment_status: "captured" | "pending" | "refunded";
  fulfillment_status: "processing" | "shipped" | "delivered";
  created_at: string;
  total: number;
  subtotal: number;
  shipping_total: number;
  items: OrderItem[];
  shipping_address?: {
    first_name?: string;
    last_name?: string;
    address_1?: string;
    city?: string;
    phone?: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
}

export interface PublisherSession {
  name: string;
  email: string;
  token: string;
  is_verified: boolean;
  logged_in_at?: string;
}
