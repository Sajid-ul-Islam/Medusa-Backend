"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Store,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

export default function PublisherLoginPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [email, setEmail] = useState("oreilly@media.com");
  const [password, setPassword] = useState("publisher123");
  const [isLoading, setIsLoading] = useState(false);

  const testAccounts = [
    {
      name: "O'Reilly Media & Tech",
      email: "oreilly@media.com",
      password: "publisher123",
      tag: "Technical / Software",
    },
    {
      name: "Oxford Academic Press",
      email: "oxford@press.com",
      password: "publisher123",
      tag: "University & Science",
    },
    {
      name: "Penguin Classics & Fiction",
      email: "penguin@classics.com",
      password: "publisher123",
      tag: "Literary & Classics",
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate / call publisher auth API
      await new Promise((res) => setTimeout(res, 600));

      const matchedAccount = testAccounts.find(
        (acc) => acc.email.toLowerCase() === email.toLowerCase()
      );

      const publisherSession = {
        name: matchedAccount ? matchedAccount.name : "Publisher Partner",
        email,
        token: "pub_token_" + Buffer.from(email).toString("base64"),
        is_verified: true,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("publisher_session", JSON.stringify(publisherSession));
      }

      success(`Welcome back, ${publisherSession.name}!`, "Publisher Authenticated");
      router.push("/publisher/dashboard");
    } catch (err) {
      toastError("Failed to sign in. Please verify your credentials.");
      setIsLoading(false);
    }
  };

  const fillQuickAccount = (acc: (typeof testAccounts)[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4">
      <div className="container mx-auto max-w-lg">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
            <Store className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Publisher Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage catalog titles, digital eBooks, orders &amp; payouts.
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Publisher / Storefront Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@press.org"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-muted-foreground block">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-11 text-base font-semibold gap-2 mt-2"
            >
              {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Quick-Fill Demo Credentials */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              1-Click Demo Publisher Accounts
            </div>

            <div className="space-y-2">
              {testAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillQuickAccount(acc)}
                  className="w-full text-left p-3 rounded-xl border hover:border-primary/40 bg-muted/30 hover:bg-muted/60 transition-all flex items-center justify-between text-xs cursor-pointer group"
                >
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary">
                      {acc.name}
                    </div>
                    <div className="text-muted-foreground">{acc.email}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-background border text-[11px] font-medium text-muted-foreground">
                    {acc.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
            Want to publish on BookHub?{" "}
            <Link
              href="/publisher/register"
              className="text-primary font-semibold hover:underline"
            >
              Register your bookstore →
            </Link>
          </div>
        </div>

        {/* Overall Platform Admin Box */}
        <div className="mt-6 p-5 bg-card rounded-2xl border shadow-sm flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 flex-shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="text-xs space-y-1">
            <h3 className="font-bold text-sm text-foreground">
              Overall Platform Admin Access
            </h3>
            <p className="text-muted-foreground">
              To manage all regions, global currency rates, orders, and Medusa backend settings:
            </p>
            <div className="mt-2 p-2 bg-muted/60 rounded-lg font-mono text-[11px] space-y-0.5">
              <div>
                <span className="text-muted-foreground">Admin URL:</span>{" "}
                <span className="font-semibold text-foreground">http://localhost:9000/app</span> (or backend URL)
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>{" "}
                <span className="text-primary font-semibold">admin@medusa-test.com</span>
              </div>
              <div>
                <span className="text-muted-foreground">Password:</span>{" "}
                <span className="text-primary font-semibold">supersecret</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

