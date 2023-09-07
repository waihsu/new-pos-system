/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.freepik.com", "dpbefcwzxnyycibyweht.supabase.co"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
