"use client";

import { useEffect } from "react";

/**
 * PWARegistration handles Service Worker lifecycle in the background.
 * It does NOT show any intrusive popups or forced install prompts.
 * Both mobile and desktop users enjoy a pure, uninterrupted web experience.
 */
export function PWARegistration() {
  useEffect(() => {
    // Register Service Worker silently in the background for offline caching & fast performance
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("BookHub PWA ServiceWorker active:", reg.scope);
        })
        .catch((err) => {
          console.log("BookHub ServiceWorker error:", err);
        });
    }
  }, []);

  // Return null so no intrusive banners or forced download modals ever block the user
  return null;
}
