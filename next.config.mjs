// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/inventory',
          permanent: true, // Use true for a permanent redirect (308), or false for a temporary redirect (307)
        },
      ];
    },
  };
  
  export default nextConfig;
  