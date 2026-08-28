import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
  price: number;
  publisher?: {
    name: string;
    handle: string;
  };
  variantId?: string;
}

export function ProductCard({ id, title, handle, thumbnail, price, publisher, variantId }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId) {
      try {
        await addToCart(variantId, 1);
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  return (
    <Link href={`/books/${handle}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              width={300}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-4xl text-muted-foreground">📚</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          
          {publisher && (
            <Link 
              href={`/publishers/${publisher.handle}`}
              className="text-sm text-muted-foreground hover:text-primary mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              by {publisher.name}
            </Link>
          )}
          
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">${(price / 100).toFixed(2)}</span>
              {variantId && (
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
