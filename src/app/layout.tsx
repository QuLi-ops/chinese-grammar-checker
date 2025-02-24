import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chinese Grammar Checker - Professional Chinese Writing Assistant",
  description: "Free online Chinese grammar checker. Advanced AI-powered tool for checking Chinese grammar, style, and tone. Perfect for students, professionals, and Chinese learners.",
  keywords: "Chinese Grammar Checker, Chinese Writing Assistant, Chinese Language Tool, Chinese Grammar Correction, Chinese Writing Helper, Learn Chinese, Chinese Grammar Rules, Chinese Language Learning",
  openGraph: {
    title: "Chinese Grammar Checker - Professional Chinese Writing Assistant",
    description: "Advanced AI-powered Chinese grammar checking tool. Perfect for students, professionals, and Chinese learners.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chinese Grammar Checker",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese Grammar Checker - Professional Chinese Writing Assistant",
    description: "Advanced AI-powered Chinese grammar checking tool. Perfect for students, professionals, and Chinese learners.",
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
        {children}
      </body>
    </html>
  );
}
