import { Toaster } from "sonner";
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Geist, Geist_Mono, } from 'next/font/google'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion',
  description: 'The connected workspace where better, faster work happens.',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/notion-app-logo.jpg",
        href: "/notion-app-logo.jpg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/notion-app-logo.jpg",
        href: "/notion-app-logo.jpg",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={` ${inter.className} ${geistSans.className} ${geistMono.className} antialiased`}>
    <ConvexClientProvider>
      <EdgeStoreProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="jotion-theme-2"
        >
          <Toaster position="bottom-center" />
          <ModalProvider />
          {children}
        </ThemeProvider>
      </EdgeStoreProvider>
    </ConvexClientProvider>
  </body>
</html>

  )
}
