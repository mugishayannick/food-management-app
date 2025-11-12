import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FoodModalProvider } from "@/context/FoodModalContext";
import { Footer } from "@/components/Footer";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Management App",
  description:
    "Manage food items efficiently - Search, Add, Edit, and Remove food items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <FoodModalProvider>
          <div className="food-app bg-white min-h-screen flex flex-col w-full">
            <HeaderWrapper />
            <main className="flex-1 w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#fff",
                color: "#424242",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              },
              success: {
                iconTheme: {
                  primary: "#79b93c",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ff3b30",
                  secondary: "#fff",
                },
              },
            }}
          />
        </FoodModalProvider>
      </body>
    </html>
  );
}
