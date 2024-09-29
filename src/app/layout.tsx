"use client";

import {useEffect} from "react";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import {metadata} from "./metadata"; // Import metadata from the metadata.ts file

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("Service Worker registered with scope:", registration.scope);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });
            });
        }
    }, []);

    return (
        <html lang="en">
            <Head>
                <title>{(metadata.title as string) || "Default Title"}</title>
                <meta name="description" content={metadata.description || ""} />
                <link
                    rel="manifest"
                    href={
                        typeof metadata.manifest === "string" ? metadata.manifest : metadata.manifest?.toString() || ""
                    }
                />
                {/* <meta 
                    name="theme-color" 
                    content={typeof metadata.themeColor === 'string' ? metadata.themeColor : "#000000"} 
                /> */}
            </Head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
