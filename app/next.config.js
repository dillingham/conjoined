/** @type {import('next').NextConfig} */

var path = require("path");

module.exports = {
  reactStrictMode: false,
  env: {
    custom: 'hi',
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:2022/api',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["react"] = path.resolve("./node_modules/react");
    return config;
  },
}