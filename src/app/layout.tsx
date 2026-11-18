import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fredoka";
import "@fontsource-variable/nunito";
import "./globals.css";
import { studio } from "@/content/site";
import { isLive } from "@/content/env";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(studio.siteUrl),
  title: { default: `${studio.name} — Playful little worlds for curious minds`, template: `%s · ${studio.name}` },
  description: `${studio.description} Our first game is Animal Pairs, a gentle animal matching game.`,
  applicationName: studio.name,
  // Previews and drafts are never indexed; only the launched production build (SITE_LIVE=true) is.
  robots: isLive ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: studio.name,
    title: studio.name,
    description: studio.tagline,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${studio.name}: ${studio.mascotName} the snowy owl above a pastel snow canyon` }],
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: studio.name, description: studio.tagline, images: ["/og-image.png"] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#fbf4e8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
