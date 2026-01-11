import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { TanstackQueryProvider } from "@/lib/tanstack-query-provider";
import { Toaster } from "sonner";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desafío PMiT",
  description: "Desafío PMiT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <TanstackQueryProvider>
          <div className="w-full max-w-7xl mx-auto">
            <main className="flex-1">
              {children}
              <Toaster richColors />
            </main>
          </div>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
