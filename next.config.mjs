/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    unoptimized: true
  },
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.webcentrikx.com" }],
      destination: "https://webcentrikx.com/:path*",
      permanent: true,
    }];
  },
};

export default nextConfig;
