/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [{ module: require.resolve("next-superjson-plugin") }],
  },
};

module.exports = nextConfig;
