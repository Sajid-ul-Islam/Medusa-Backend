import Link from "next/link";
import {
  BookOpen,
  ShieldCheck,
  Truck,
  CreditCard,
  Heart,
  Send,
  Sparkles,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/60 backdrop-blur-md">
      {/* Top Value Badges Ribbon */}
      <div className="border-b bg-muted/20">
        <div className="container px-4 mx-auto py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold">Nationwide 64 Districts</div>
                <div className="text-[11px] text-muted-foreground">Doorstep courier via Pathao</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold">100% Genuine Guarantee</div>
                <div className="text-[11px] text-muted-foreground">Direct publisher authentic prints</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center flex-shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold">bKash &amp; Card Secure</div>
                <div className="text-[11px] text-muted-foreground">Instant OTP/PIN &amp; COD</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold">Anti-Piracy DRM</div>
                <div className="text-[11px] text-muted-foreground">Dynamic stamped eBook licenses</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-black text-xl text-foreground">
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-xs">
                📚
              </div>
              <span>BookHub</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Bangladesh&apos;s premier multi-publisher marketplace. Discover physical paperbacks and instant digital eBooks with direct publisher royalties and seamless bKash checkout.
            </p>
            <div className="pt-2 text-xs font-semibold text-muted-foreground">
              📍 Banglabazar &amp; Purana Paltan, Dhaka, Bangladesh
            </div>
          </div>

          {/* Shop & Categories */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5 text-foreground">
              Explore Books
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/books" className="hover:text-primary transition-colors">
                  All Titles
                </Link>
              </li>
              <li>
                <Link href="/publishers" className="hover:text-primary transition-colors">
                  Verified Publishers
                </Link>
              </li>
              <li>
                <Link href="/request-book" className="hover:text-primary transition-colors text-primary font-bold">
                  Request a Book (বই রিকোয়েস্ট)
                </Link>
              </li>
              <li>
                <Link href="/books?q=islamic" className="hover:text-primary transition-colors">
                  Islamic &amp; Hadith
                </Link>
              </li>
              <li>
                <Link href="/books?q=humayun" className="hover:text-primary transition-colors">
                  Humayun Ahmed
                </Link>
              </li>
            </ul>
          </div>

          {/* For Publishers */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5 text-foreground">
              For Publishers
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/publisher/register" className="hover:text-primary transition-colors font-bold text-primary">
                  Become a Publisher
                </Link>
              </li>
              <li>
                <Link href="/publisher/dashboard" className="hover:text-primary transition-colors">
                  Publisher Portal
                </Link>
              </li>
              <li>
                <Link href="/publisher/login" className="hover:text-primary transition-colors">
                  Publisher Sign In
                </Link>
              </li>
              <li>
                <Link href="/publisher/dashboard" className="hover:text-primary transition-colors">
                  Excel/CSV Bulk Importer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5 text-foreground">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-emerald-600 font-semibold">
                  💬 WhatsApp Support (24/7)
                </a>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition-colors">
                  Track Book Bag
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">bKash Merchant: 01712-998877</span>
              </li>
              <li>
                <span className="text-muted-foreground">Helpline: +880 9612-345678</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>&copy; {new Date().getFullYear()} BookHub Marketplace. Empowering Bangladeshi Authors &amp; Independent Publishers.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 fill-red-500 text-red-500 inline" />
            <span>for Bengali literature lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
