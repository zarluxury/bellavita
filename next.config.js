/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-4635819442b54e6684ecdaa44810ab46.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client'],
}

module.exports = nextConfig
