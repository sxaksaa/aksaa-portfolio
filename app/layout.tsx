import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://aksa.work";
const siteTitle = "Akbar Salahudin Purnomo | Junior Laravel Full Stack Developer";
const siteDescription =
  "Portfolio Akbar Salahudin Purnomo, mahasiswa D3 Teknologi Informasi Universitas Brawijaya yang fokus pada Laravel, PHP, MySQL, REST API, payment integration, dan aplikasi web full stack.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Akbar Salahudin Purnomo",
  },
  description: siteDescription,
  applicationName: "Akbar Portfolio",
  authors: [{ name: "Akbar Salahudin Purnomo", url: siteUrl }],
  creator: "Akbar Salahudin Purnomo",
  publisher: "Akbar Salahudin Purnomo",
  keywords: [
    "Akbar Salahudin Purnomo",
    "Laravel Developer",
    "Junior Full Stack Developer",
    "PHP Developer",
    "MySQL",
    "REST API",
    "Portfolio Developer",
    "Universitas Brawijaya",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Akbar Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${cormorant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
