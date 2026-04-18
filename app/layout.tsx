import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Helplytics AI | The Intelligent Help Ecosystem",
    template: "%s | Helplytics AI"
  },
  description: "Accelerate your problem-solving with the world's first AI-orchestrated community of experts.",
  icons: {
    icon: "/favicon.ico",
  }
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#4f46e5",
          borderRadius: "12px",
        },
        elements: {
          card: "shadow-2xl border-zinc-100 rounded-[32px]",
          navbar: "hidden",
          footer: "hidden",
        }
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-[#fafafa] selection:bg-indigo-100 selection:text-indigo-900">
          <div className="flex-1 flex flex-col relative overflow-x-hidden">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
