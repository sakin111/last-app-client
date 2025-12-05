import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'TravelBuddy - Find Your Perfect Travel Companion',
  description: 'Connect with travelers worldwide and find your perfect travel companion for your next adventure. Explore destinations, share experiences, and make lifelong memories.',
  keywords: 'travel buddy, travel companion, meetup, travelers, backpacking, adventure travel',
  authors: [{ name: 'TravelBuddy' }],
  openGraph: {
    title: 'TravelBuddy - Find Your Perfect Travel Companion',
    description: 'Connect with travelers worldwide and find your perfect travel companion.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" richColors />
        {children}

      </body>
    </html>
  );
}
