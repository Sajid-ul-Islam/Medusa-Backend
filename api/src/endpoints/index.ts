import apiClient from './client';
import { Book, Publisher, Order, PaginatedResponse } from '@book-platform/shared-types';

export const bookEndpoints = {
  getAll: (params?: { page?: number; limit?: number; category?: string }) =>
    apiClient.get<PaginatedResponse<Book>>('/store/products', params as any),

  getById: (id: string) =>
    apiClient.get<Book>(`/store/products/${id}`),

  getByPublisher: (publisherId: string) =>
    apiClient.get<PaginatedResponse<Book>>(`/store/products?publisher_id=${publisherId}`),

  search: (query: string) =>
    apiClient.get<PaginatedResponse<Book>>('/store/products', { q: query }),
};

export const publisherEndpoints = {
  getAll: () =>
    apiClient.get<PaginatedResponse<Publisher>>('/publishers'),

  getById: (id: string) =>
    apiClient.get<Publisher>(`/publishers/${id}`),

  getStore: (publisherId: string) =>
    apiClient.get<any>(`/publishers/${publisherId}/store`),
};

export const orderEndpoints = {
  create: (orderData: any) =>
    apiClient.post<Order>('/store/carts/complete', orderData),

  getById: (id: string) =>
    apiClient.get<Order>(`/store/orders/${id}`),

  getCustomerOrders: (customerId: string) =>
    apiClient.get<PaginatedResponse<Order>>(`/store/customers/${customerId}/orders`),
};

export const cartEndpoints = {
  create: () =>
    apiClient.post<any>('/store/carts', {}),

  getById: (id: string) =>
    apiClient.get<any>(`/store/carts/${id}`),

  addItem: (cartId: string, itemId: string, quantity: number) =>
    apiClient.post<any>(`/store/carts/${cartId}/line-items`, { variant_id: itemId, quantity }),

  updateItem: (cartId: string, itemId: string, quantity: number) =>
    apiClient.post<any>(`/store/carts/${cartId}/line-items/${itemId}`, { quantity }),

  removeItem: (cartId: string, itemId: string) =>
    apiClient.delete<any>(`/store/carts/${cartId}/line-items/${itemId}`),
};
