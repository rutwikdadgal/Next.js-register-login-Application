/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",   // ✅ makes Next.js Azure-friendly
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
