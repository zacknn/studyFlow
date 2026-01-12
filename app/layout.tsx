import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyFlow - AI Powered Learning",
  description: "Your personal knowledge hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-rose-100 selection:text-rose-900 dark:selection:bg-rose-900/30 dark:selection:text-rose-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navbar and Footer removed from here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}