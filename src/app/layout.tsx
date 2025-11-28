import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AiAssistant from "@/components/ai-assistant";
import SmoothScroller from "@/components/smooth-scroller";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Horacio Jose Serpa",
  description: "Conoce más acerca de quien es Horacio José serpa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased", "bg-transparent text-foreground relative z-0")}>
        <SmoothScroller>
          <div className="relative">
            <main className="relative z-10 flex min-h-screen flex-col">
              {children}
            </main>
          </div>
          <AiAssistant />
          <Toaster />
        </SmoothScroller>
        <Script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></Script>
        <Script async src="//www.instagram.com/embed.js"></Script>
      </body>
    </html>
  );
}
