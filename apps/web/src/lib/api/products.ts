import { apiClient, MEDUSA_BACKEND_URL } from "./client";
import { SAMPLE_BOOKS } from "@/lib/medusa";
import { Book } from "@/types";

export interface GetProductsParams {
  limit?: number;
  offset?: number;
  collection_id?: string;
  category?: string;
  publisher_handle?: string;
  search?: string;
}

/**
 * Server-Side Cached Fetch for Books (ISR with Next.js Data Cache)
 */
export async function getProductsServer(params?: GetProductsParams): Promise<{ products: Book[]; count: number }> {
  const queryString = new URLSearchParams();
  if (params?.limit) queryString.set("limit", String(params.limit));
  if (params?.offset) queryString.set("offset", String(params.offset));
  if (params?.category) queryString.set("category", params.category);
  if (params?.publisher_handle) queryString.set("publisher_handle", params.publisher_handle);
  if (params?.search) queryString.set("search", params.search);

  try {
    const url = `${MEDUSA_BACKEND_URL}/store/products?${queryString.toString()}`;
    const res = await fetch(url, {
      next: {
        revalidate: 300, // 5 minutes ISR cache
        tags: ["products"],
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.products && data.products.length > 0) {
        return data;
      }
    }
  } catch (err) {
    // Fallback gracefully to curated sample dataset
  }

  let filtered = [...(SAMPLE_BOOKS as unknown as Book[])];
  if (params?.category && params.category !== "All") {
    filtered = filtered.filter((b) =>
      b.categories.some((c) => c.toLowerCase() === params.category?.toLowerCase())
    );
  }
  if (params?.publisher_handle) {
    filtered = filtered.filter(
      (b) => b.publisher?.handle.toLowerCase() === params.publisher_handle?.toLowerCase()
    );
  }
  if (params?.search) {
    const query = params.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.isbn && b.isbn.toLowerCase().includes(query)) ||
        b.categories.some((c) => c.toLowerCase().includes(query))
    );
  }

  const offset = params?.offset || 0;
  const limit = params?.limit || 12;

  return {
    products: filtered.slice(offset, offset + limit),
    count: filtered.length,
  };
}

/**
 * Server-Side Fetch for Single Book (for generateMetadata and SSR)
 */
export async function getProductByHandleServer(handle: string): Promise<{ product: Book | null }> {
  try {
    const res = await fetch(`${MEDUSA_BACKEND_URL}/store/products/${handle}`, {
      next: {
        revalidate: 60, // 1 minute ISR cache
        tags: [`product-${handle}`],
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.product) {
        return data;
      }
    }
  } catch (err) {
    // Fallback to sample books
  }

  const found = (SAMPLE_BOOKS as unknown as Book[]).find((b) => b.handle === handle || b.id === handle);
  return { product: found || null };
}
