import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NProgressBar from "@/components/NProgress";
import LoadingTransition from "@/components/LoadingTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "fileShare",
  description: "upload and share files securely and easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingTransition />

        {children}
      </body>
    </html>
  );
}
