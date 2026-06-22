import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { Providers } from "@/components/shared/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

<body>
  {children}
  <Analytics />
  <SpeedInsights />
</body> 


export const metadata: Metadata = {
  title: "VoltTrail | Premium E-Bike Platform",
  description: "Ride Further. Live Wilder. Premium Electric Bicycles built for trail and urban adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Header />
          <div className="flex-1 w-full bg-background text-foreground">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
