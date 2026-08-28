import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BookHub</h3>
            <p className="text-sm text-muted-foreground">
              Your marketplace for books from independent publishers worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/books" className="hover:text-primary">All Books</Link></li>
              <li><Link href="/publishers" className="hover:text-primary">Publishers</Link></li>
              <li><Link href="/collections" className="hover:text-primary">Collections</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Sell</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/publisher/register" className="hover:text-primary">Become a Publisher</Link></li>
              <li><Link href="/publisher/dashboard" className="hover:text-primary">Publisher Dashboard</Link></li>
              <li><Link href="/publisher/guide" className="hover:text-primary">Selling Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/help" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BookHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
