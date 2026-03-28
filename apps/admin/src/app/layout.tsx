import "./globals.css";
import React from "react";
import Script from "next/script";

export const metadata = {
  title: "VYNEDAM System Administration",
  description: "Administrative console dashboard rendering core structural components",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="bg-[#05080F] text-white antialiased selection:bg-[#7C3AED]/30 selection:text-[#22D3EE] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
