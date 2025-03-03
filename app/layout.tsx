import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { headers } from "next/headers";

// Load the Inter font with the desired subsets and weights
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional: Define a CSS variable for the font
});

export const metadata: Metadata = {
  title: "Max's Axes",
  description: "A virtual guitar store.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers(); // Correct: Await headers()
  const cspHeader = headersList.get("Content-Security-Policy");
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        {/* Apply the Inter font to the body */}
        <body className={`${inter.variable} font-sans`}>
          <Providers>
            <Navbar />
            <Container className="py-20">{children}</Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
