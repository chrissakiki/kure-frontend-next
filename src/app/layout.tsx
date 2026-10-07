import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import Layout from "@/components/Layout/Layout";
import AppProvider from "@/context/AppProvider";
import { BookingOptionsProvider } from "@/context/BookingOptionsProvider";
import { getBookingOptions } from "@/api/pages";
import { loadPage } from "@/lib/loadPage";
import {
  HOME_META_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
  SITE_URL,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#aabd8f",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: HOME_TITLE },
  description: HOME_META_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "192x192" }],
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const booking = await loadPage(getBookingOptions);

  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className={`${montserrat.className} min-h-full bg-white text-theme-primary`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10967168531"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-10967168531');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AppProvider>
          <BookingOptionsProvider options={booking.ok ? booking.data : null}>
            <Layout>{children}</Layout>
          </BookingOptionsProvider>
        </AppProvider>
      </body>
    </html>
  );
}
