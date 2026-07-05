import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYNKA — Video Production & Advertising Agency",
  description:
    "MYNKA is a video production and advertising agency crafting bold films, commercials, and campaigns that make brands impossible to ignore.",
  openGraph: {
    title: "MYNKA — Video Production & Advertising Agency",
    description:
      "Bold films, commercials, and campaigns that make brands impossible to ignore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
