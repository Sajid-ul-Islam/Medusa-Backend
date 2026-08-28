// Shared Types for Book Publishing Platform

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  currency: string;
  isbn?: string;
  publisher_id: string;
  cover_image_url?: string;
  digital_file_url?: string;
  is_digital: boolean;
  is_physical: boolean;
  stock_quantity?: number;
  published_date?: Date;
  categories: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Publisher {
  id: string;
  name: string;
  email: string;
  store_name: string;
  store_description?: string;
  logo_url?: string;
  stripe_connect_id?: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Store {
  id: string;
  publisher_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  theme_config?: Record<string, any>;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: string;
  customer_id: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  shipping_address?: Address;
  billing_address?: Address;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  unit_price: number;
  total: number;
  publisher_id: string;
  digital_download_url?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'refunded' | 'failed';
export type FulfillmentStatus = 'not_fulfilled' | 'fulfilled' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  province?: string;
  postal_code: string;
  country_code: string;
  phone?: string;
}

export interface Customer {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Cart {
  id: string;
  customer_id?: string;
  items: CartItem[];
  subtotal: number;
  tax_total: number;
  total: number;
  created_at: Date;
  updated_at: Date;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}
