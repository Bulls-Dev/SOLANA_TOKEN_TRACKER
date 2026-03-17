import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "0xBlock | Solana Tracker",
  description: "Real-time Raydium Monitoring",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased selection:bg-degen-cyan/30">
        {children}
      </body>
    </html>
  );
}