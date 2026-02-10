import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OhMyProfessors - Find Your Perfect Professor",
  description: "Real Student Reviews, Real Decisions. Rate and discover professors at Australian universities.",
  keywords: ["professor reviews", "university", "Adelaide", "rate my professor", "student reviews"],
  authors: [{ name: "OhMyProfessors Team" }],
  openGraph: {
    title: "OhMyProfessors - Find Your Perfect Professor",
    description: "Real Student Reviews, Real Decisions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
