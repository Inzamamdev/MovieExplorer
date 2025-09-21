import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MoviesProvider } from "@/context/MovieContext";
import Nav from "@/components/Nav";
import { getMovies } from "@/app/actions/getMovies";
import { SessionProvider } from "next-auth/react";
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
  title: "MovieExplorer",
  description: "Explore Movies",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const INITIAL_PAGE = 1;
  const category = "popular";
  const initialMovies = await getMovies(category, INITIAL_PAGE);
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
          >
            <Toaster
              position="top-right"
              toastOptions={{
                success: {
                  style: { background: "green", color: "white" },
                },
                error: {
                  style: { background: "red", color: "white" },
                },
              }}
            />
            <MoviesProvider initialMovies={initialMovies}>
              <Nav />
              <main>{children}</main>
            </MoviesProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
