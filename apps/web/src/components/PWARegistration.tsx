"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PWARegistration() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("BookHub PWA ServiceWorker registration successful:", reg.scope);
        })
        .catch((err) => {
          console.log("BookHub PWA ServiceWorker registration failed:", err);
        });
    }

    // 2. Detect iOS
    const isIosDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
    }

    // 3. Listen for Android/Desktop install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed prompt recently
      const dismissed = sessionStorage.getItem("pwa_prompt_dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("pwa_prompt_dismissed", "true");
  };

  if (!showInstallBanner) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] bg-card border rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">Install BookHub App</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Instant offline access, faster browsing, and zero app store downloads.
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground p-1"
          aria-label="Dismiss app install prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t">
        <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-xs h-8">
          Not Now
        </Button>
        <Button size="sm" onClick={handleInstallClick} className="text-xs h-8 gap-1.5 font-bold">
          <Download className="h-3.5 w-3.5" /> Install App
        </Button>
      </div>
    </div>
  );
}
