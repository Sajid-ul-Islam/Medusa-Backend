"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithGoogle, signInWithFacebook, user, isLoading: authLoading } = useAuth();

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth_callback_failed"
      ? "Sign-in failed. Please try again."
      : null
  );

  // If already signed in, redirect to home
  if (!authLoading && user) {
    router.push("/");
    return null;
  }

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(
        err?.message?.includes("provider")
          ? "Google sign-in is not configured yet. Please ask the admin to enable it in Supabase Dashboard."
          : err?.message || "Failed to sign in with Google. Please try again."
      );
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError(null);
    setIsFacebookLoading(true);
    try {
      await signInWithFacebook();
    } catch (err: any) {
      setError(
        err?.message?.includes("provider")
          ? "Facebook sign-in is not configured yet. Please ask the admin to enable it in Supabase Dashboard."
          : err?.message || "Failed to sign in with Facebook. Please try again."
      );
      setIsFacebookLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo & Title */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">BookHub</span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-2">
          Sign in to access your orders, wishlist, and reading rewards
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-card border rounded-2xl shadow-lg p-6 space-y-5">
        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-4 text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isFacebookLoading}
          className="w-full flex items-center justify-center gap-3 h-12 px-4 rounded-xl border-2 border-border bg-background hover:bg-muted/60 transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-[0.98]"
        >
          {isGoogleLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <GoogleIcon className="h-5 w-5" />
          )}
          Continue with Google
        </button>

        {/* Facebook Sign-In Button */}
        <button
          onClick={handleFacebookSignIn}
          disabled={isGoogleLoading || isFacebookLoading}
          className="w-full flex items-center justify-center gap-3 h-12 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-[0.98]"
        >
          {isFacebookLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <FacebookIcon className="h-5 w-5" />
          )}
          Continue with Facebook
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-card text-muted-foreground uppercase tracking-wider">
              or continue with email
            </span>
          </div>
        </div>

        {/* Email / Password Form (placeholder for future) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError("Email sign-in coming soon! Please use Google or Facebook for now.");
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full h-11 px-4 rounded-xl border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-xl border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all active:scale-[0.98]"
          >
            Sign in with Email
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          Don&apos;t have an account?{" "}
          <button
            onClick={handleGoogleSignIn}
            className="text-primary font-semibold hover:underline"
          >
            Sign up with Google
          </button>
        </p>
      </div>

      {/* Trust & Privacy */}
      <p className="text-center text-[11px] text-muted-foreground mt-6 max-w-xs mx-auto leading-relaxed">
        By signing in, you agree to our Terms of Service and Privacy Policy.
        We never post without your permission.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
}
