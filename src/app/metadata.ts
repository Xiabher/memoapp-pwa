// src/app/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MemoApp PWA",
    description: "A simple memo note todo application",
    manifest: "/manifest.json",
    themeColor: "#000000",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "MemoApp",
    },
};
