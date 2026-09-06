import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Log into Instagram",
  icons: {
    icon: "/images/instgram_banner.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-[100dvh] bg-[#1c2a33] lg:bg-[#0c1017] text-white">
        {children}
      </body>
    </html>
  );
}
