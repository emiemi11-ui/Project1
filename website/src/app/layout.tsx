import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VitaNova — Human Performance Intelligence",
  description:
    "The first integrated platform that transforms passive biometric data into actionable intelligence for military readiness, medical oversight, and human performance optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-dm antialiased bg-ink text-ice">
        {children}
      </body>
    </html>
  );
}
