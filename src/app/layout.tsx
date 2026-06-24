import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Edara — Your Event Department, on Demand",
  description:
    "Edara is Events-as-a-Service for high-growth tech and AI companies — booth design and build, sponsorships, speaking slots, venue and vendor logistics, run end to end. 50+ events delivered across 20+ countries.",
  metadataBase: new URL("https://edara.events"),
  openGraph: {
    title: "Edara — Your Event Department, on Demand",
    description:
      "A professional events department without the overhead. Booths, sponsorships, logistics — planned, built and run by people who do this every week.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Reem+Kufi:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="ek-app" id="edara-root">
          <NavBar />
          <MobileNav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
