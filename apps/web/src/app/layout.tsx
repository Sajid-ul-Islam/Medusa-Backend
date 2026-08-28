import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PWARegistration } from "@/components/PWARegistration";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#d97706",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "BookHub - Multi-Publisher Book Marketplace",
  description:
    "Discover and buy books from independent publishers worldwide. Your one-stop shop for physical and digital books in Bangladesh.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BookHub",
  },
  icons: {
    icon: "/icons/icon-192x192.svg",
    apple: "/icons/icon-192x192.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ClientProviders>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <PWARegistration />
        </ClientProviders>
      </body>
    </html>
  );
}
