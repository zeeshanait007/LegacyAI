import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LegacyAI | AI-Powered Enterprise Heritage Videos",
  description: "Transform your company's history into high-quality legacy videos with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <div className="min-h-screen bg-obsidian text-foreground overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
