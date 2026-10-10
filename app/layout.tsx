import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Next.js + Neon hello world",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
