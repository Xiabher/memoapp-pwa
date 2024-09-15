/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  // Your existing Next.js config options
};

const pwaConfig = withPWA({
  dest: 'public',
 // disable: process.env.NODE_ENV === 'development',
  // other PWA options
});

export default pwaConfig(nextConfig);