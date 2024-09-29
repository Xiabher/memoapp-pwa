declare module "@ducanh2912/next-pwa" {
    import {NextConfig} from "next";
    export default function withPWA(config: any): (nextConfig: NextConfig) => NextConfig;
}
