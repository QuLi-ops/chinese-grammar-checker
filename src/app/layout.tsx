import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import ClarityScript from "../components/analytics/ClarityScript";

// 确定是否应该加载 Google Analytics
const shouldLoadGA = () => {
  // 只在生产环境加载 GA
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }
  
  // 可以添加其他条件，例如检查特定环境变量
  // if (process.env.DISABLE_ANALYTICS === 'true') {
  //   return false;
  // }
  
  return true;
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chinesegrammarchecker.com'),
  applicationName: 'Language Grammar Checker',
  title: "Chinese Grammar Checker with AI - Professional Chinese Writing Assistant",
  description: "Free online Chinese grammar checker. Advanced AI-powered tool for checking Chinese grammar, style, and tone. Perfect for students, professionals, and Chinese learners.",
  openGraph: {
    siteName: 'Chinese Grammar Checker',
    title: "Chinese Grammar Checker with AI - Professional Chinese Writing Assistant",
    description: "Advanced AI-powered Chinese grammar checking tool. Perfect for students, professionals, and Chinese learners.",
    type: "website",
    locale: "en_US",
    url: 'https://chinesegrammarchecker.com',
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
    title: "Chinese Grammar Checker with AI - Professional Chinese Writing Assistant",
    description: "Advanced AI-powered Chinese grammar checking tool. Perfect for students, professionals, and Chinese learners.",
  },
  alternates: {
    canonical: 'https://chinesegrammarchecker.com/en',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 确定是否加载 GA
  const loadGA = shouldLoadGA();
  
  return (
    <>
      {children}
      {/* 条件性加载 Google Analytics */}
      {loadGA && <GoogleAnalytics gaId="G-FWFPJ6YBJZ" />}
      {/* 条件性加载 Microsoft Clarity */}
      {loadGA && <ClarityScript projectId="r6i29taa1m" />}
    </>
  );
}
