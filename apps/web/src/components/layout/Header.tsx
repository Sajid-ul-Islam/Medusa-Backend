"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  BookOpen,
  Store,
  Search,
  UserPlus,
  Coins,
  Flame,
  LogOut,
  User,
  ChevronDown,
  LogIn,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRewards } from "@/context/RewardsContext";
import { useAuth } from "@/context/AuthContext";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export function Header() {
  const router = useRouter();
  const { cart, isInitialized, openDrawer } = useCart();
  const { coins, streakDays, claimDailyStreakBonus, hasClaimedToday } = useRewards();
  const { user, displayName, avatarUrl, email, isLoading: authLoading, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemCount =
    isInitialized && cart?.items
      ? cart.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
      : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signOut();
    router.push("/");
  };

  // Keyboard shortcut listener: Cmd/Ctrl + K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials for fallback avatar
  const initials = displayName
    ? displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : email
    ? email[0].toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 transition-colors">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">BookHub</span>
        </Link>

        {/* Search Bar with Hotkey */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md relative items-center"
        >
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-12 rounded-full border bg-muted/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all text-foreground"
          />
          <kbd className="absolute right-3 px-1.5 py-0.5 text-[9px] font-mono font-bold text-muted-foreground bg-background rounded border shadow-2xs pointer-events-none">
            ⌘K
          </kbd>
        </form>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            href="/books"
            className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Books
          </Link>
          <Link
            href="/publishers"
            className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Publishers
          </Link>
          <Link
            href="/request-book"
            className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Request a Book
          </Link>
          <Link
            href="/publisher/register"
            className="text-xs font-bold text-primary hover:underline transition-colors flex items-center gap-1"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Become a Publisher
          </Link>
        </nav>

        {/* Action Buttons, Theme Switcher, Auth & Cart */}
        <div className="flex items-center space-x-2.5">
          {/* Rewards & Daily Streak Pill */}
          <button
            type="button"
            onClick={claimDailyStreakBonus}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/20 active:scale-95 transition cursor-pointer shadow-2xs"
            title={hasClaimedToday ? `Daily Streak: ${streakDays} Days active!` : "Click to claim +25 Daily Reading Coins!"}
          >
            <Coins className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>{coins}</span>
            <span className="text-muted-foreground">|</span>
            <span className="flex items-center text-[11px] gap-0.5 text-red-500">
              <Flame className="h-3 w-3 fill-red-500 animate-flame" /> {streakDays}d
            </span>
          </button>

          <ThemeSwitcher />

          <Button
            variant="ghost"
            size="icon"
            onClick={openDrawer}
            className="relative rounded-xl active:scale-95 transition-transform"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold animate-in zoom-in-50 shadow-sm">
                {itemCount}
              </span>
            )}
          </Button>

          {/* Auth: User Avatar Dropdown or Sign-In Button */}
          {!authLoading && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border-2 border-transparent hover:border-primary/30 transition-all p-0.5 active:scale-95"
                aria-label="Account menu"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName || "User"}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold ring-2 ring-primary/20">
                    {initials}
                  </div>
                )}
                <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-card border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b bg-muted/30">
                    <p className="text-sm font-semibold truncate text-foreground">
                      {displayName || "BookHub Reader"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/publisher/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-muted/60 transition-colors"
                    >
                      <Store className="h-4 w-4 text-muted-foreground" />
                      Publisher Portal
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : !authLoading ? (
            <Button asChild size="sm" variant="outline" className="rounded-xl text-xs font-bold active:scale-95">
              <Link href="/login" className="flex items-center gap-1.5">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            </Button>
          ) : null}

          <Button asChild size="sm" className="hidden lg:flex rounded-xl font-bold text-xs shadow-xs active:scale-95">
            <Link href="/publisher/dashboard">
              <Store className="mr-1.5 h-4 w-4" />
              Publisher Portal
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
