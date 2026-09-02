import { MEDUSA_BACKEND_URL } from "./client";
import { SAMPLE_PUBLISHERS } from "@/lib/medusa";
import { Publisher } from "@/types";

/**
 * Server-Side Cached Fetch for Publishers
 */
export async function getPublishersServer(): Promise<{ publishers: Publisher[] }> {
  try {
    const res = await fetch(`${MEDUSA_BACKEND_URL}/store/publishers`, {
      next: {
        revalidate: 3600, // 1 hour ISR cache
        tags: ["publishers"],
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.publishers && data.publishers.length > 0) {
        return data;
      }
    }
  } catch (err) {
    // Fallback
  }

  return { publishers: SAMPLE_PUBLISHERS as Publisher[] };
}

/**
 * Server-Side Fetch for Single Publisher
 */
export async function getPublisherByHandleServer(handle: string): Promise<{ publisher: Publisher | null }> {
  try {
    const res = await fetch(`${MEDUSA_BACKEND_URL}/store/publishers/${handle}`, {
      next: {
        revalidate: 3600,
        tags: [`publisher-${handle}`],
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.publisher) {
        return data;
      }
    }
  } catch (err) {
    // Fallback
  }

  const pub = (SAMPLE_PUBLISHERS as Publisher[]).find(
    (p) => p.handle === handle || p.id === handle
  );
  return { publisher: pub || null };
}
