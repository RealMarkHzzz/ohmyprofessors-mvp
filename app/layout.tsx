import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${dmSans.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
