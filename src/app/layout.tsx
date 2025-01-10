import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import FaviconHead from '@/components/FaviconHead'
import { siteMetadata } from '@/lib/seo/metadata';

/**
 * Root layout component that wraps the entire application
 * Provides theme configuration, fonts, and global styles
 */

// Configure Geist fonts with subsets
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO and document head
export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: siteMetadata.title,
    template: '%s | Multilingual Password Generator'
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: 'Aashish Vivekanand' }],
  creator: 'Aashish Vivekanand',
  publisher: 'Aashish Vivekanand',
  openGraph: {
    ...siteMetadata.openGraph,
    images: siteMetadata.openGraph.images,
  },
  twitter: siteMetadata.twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <FaviconHead />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <AppRouterCacheProvider>
          <CssBaseline />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}