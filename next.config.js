/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-4635819442b54e6684ecdaa44810ab46.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['picsum.photos', 'fastly.picsum.photos','images.unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  turbopack: {}, // Add empty turbopack config to silence the error
}

module.exports = nextConfig
