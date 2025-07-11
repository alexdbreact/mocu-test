import withPWA from 'next-pwa';

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
};

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(pwaConfig)(nextConfig);