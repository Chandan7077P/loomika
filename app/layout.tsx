import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baby Marine International",
  description: "USDA Certified Seafood Processing and Export Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-100 text-black`}
      >
        {/* MOBILE-LIKE CONTAINER */}
        <div className="mx-auto max-w-[480px] min-h-screen bg-white shadow-md relative overflow-hidden">
          <Navbar />
          <main className="pb-24">{children}</main> {/* Extra space for bottom nav if needed */}
          <footer className="w-full bg-gray-800 text-white text-center py-2 text-sm">
            <p>
              BMI Website designed by{" "}
              <span className="font-semibold">Chandan Padhan</span> – Digital
              Marketing Intern at{" "}
              <span className="font-semibold">Highland Group</span>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
