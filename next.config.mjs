/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add metadata optimization
  metadata: {
    metadataBase: new URL('https://your-domain.com'),
    openGraph: {
      images: '/og-image.jpg',
    },
  },
  // Add sitemap generation
  generateSitemap: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
export default nextConfig;  