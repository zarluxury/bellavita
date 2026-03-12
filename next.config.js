/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pub-4635819442b54e6684ecdaa44810ab46.r2.dev'
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = nextConfig
