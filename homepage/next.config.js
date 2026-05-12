/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // By default, Next.js will create static HTML files for each page in your application
  // Images are optimized by default, but for static export we need to disable this
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
