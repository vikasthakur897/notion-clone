import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { ConvexClientProvider } from "@/components/provider/convex-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion Clone",
  description: "A Notion clone built with Next.js and Tailwind CSS",
  icons: {
    icon: [{
      media: "(prefers-color-scheme: light)",
      url: "/notion-app-logo.jpg",
      href: "/notion-app-logo.jpg",
  },{
      media: "(prefers-color-scheme: dark)",
      url: "/notion-app-logo.jpg",
      href: "/notion-app-logo.jpg",
  }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
        <ThemeProvider attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
         storageKey="clone-theme">
        {children}
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
