import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import InitDatabase from "./InitDatabase";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "MemoApp PWA",
    description: "A simple memo note todoapplication",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "MemoApp",
    },
    other: {
        'mobile-web-app-capable': 'yes'
    }
};

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <InitDatabase />
                {children}
            </body>
        </html>
    );
}