/** @type {import('next').NextConfig} */

const withLess = require('next-with-less');

const nextConfig = withLess({
  reactStrictMode: false,

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `http://localhost:8080/api/:path*`,
  //     },
  //   ];
  // },
});

module.exports = nextConfig;
