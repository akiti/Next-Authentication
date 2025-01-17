import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import { auth } from "@/auth";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], weight: ['400', '600'], });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth()

  return (
    // <SessionProvider session={session}>
      <html lang="en">
        <body className={cn(inter.className, poppins.className)}>{children}</body>
      </html>
    // </SessionProvider>
  );
}
