import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

export const metadata = {
  title: "BookHub - Multi-Publisher Book Marketplace",
  description: "Discover and buy books from independent publishers worldwide. Your one-stop shop for physical and digital books.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <ClientProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
