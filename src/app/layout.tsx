import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/providers/providers"

export const metadata: Metadata = {
  title: "Donezo - Project Management Dashboard",
  description: "Plan, prioritize, and accomplish your tasks with ease",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {/* <ThemeProvider defaultTheme="light" storageKey="tasko-theme"> */}
           <Providers>{children}</Providers> 
        {/* </ThemeProvider> */}
        <Analytics />
      </body>
    </html>
  )
}
