import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AiAssistant from "@/components/ai-assistant";
import SmoothScroller from "@/components/smooth-scroller";
import SceneLoader from "@/components/scene-loader";

export const metadata: Metadata = {
  title: "Serpa Inmersivo",
  description: "Campaña inmersiva de Horacio Serpa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased", "bg-background text-foreground")}>
        <SmoothScroller>
          <div className="fixed inset-0 -z-10 h-full w-full">
            <SceneLoader />
          </div>
          <div className="relative z-10 flex min-h-screen flex-col">
            {children}
          </div>
          <AiAssistant />
          <Toaster />
        </SmoothScroller>
      </body>
    </html>
  );
}
