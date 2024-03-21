import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import description from './description.js'
import NavigationBar from "@/components/nav-bar.component";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game of life",
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <NavigationBar/>
        {children}
      </body>
    </html>
  );
}
