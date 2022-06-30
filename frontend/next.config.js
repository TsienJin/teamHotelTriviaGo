/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
