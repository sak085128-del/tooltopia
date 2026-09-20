import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/session-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://tooltopia.vercel.app"),
  title: {
    default: "ToolTopia — Discover the Best AI Tools",
    template: "%s | ToolTopia",
  },
  description:
    "Discover the best AI tools for writing, images, video, coding, productivity, documents, marketing and more. Search, compare and explore top AI tools — 100% free.",
  keywords:
    "AI tools, AI directory, AI writer, image generator, AI video, AI coding, AI tools directory, free AI tools",
  authors: [{ name: "ToolTopia" }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/assets/icons/logo.svg",
    apple: "/assets/icons/logo.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "ToolTopia",
    title: "ToolTopia — Discover the Best AI Tools",
    description:
      "Discover the best AI tools for writing, images, video, coding, productivity, documents, marketing and more.",
    url: "https://tooltopia.vercel.app/",
    images: [{ url: "/assets/images/og-cover.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolTopia — Discover the Best AI Tools",
    description:
      "Discover the best AI tools for writing, images, video, coding, productivity, documents, marketing and more.",
    images: ["/assets/images/og-cover.svg"],
  },
  verification: {
    google: "KlzMgQ-Vxc94cwtg0uYEnHNE-9ssZxiqyddFojH81fk",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-3202800303748206"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3202800303748206"
          crossOrigin="anonymous"
        />
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tooltopia:theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}else if(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}