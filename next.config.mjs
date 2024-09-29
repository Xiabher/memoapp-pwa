import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // This is correct here
};

const pwaConfig = {
    dest: "public",
    disable: process.env.NODE_ENV === "development", // This will disable PWA in development mode
    // You can add any other options here if needed
};

export default withPWA({
    ...nextConfig,
    ...pwaConfig,
});
