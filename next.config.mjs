import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other Next.js config options can go here
};

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
};

export default withPWA(pwaConfig)(nextConfig);
