/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  compiler: { styledComponents: true },
  reactStrictMode: true,
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Disable minification
  //   if (!dev) {
  //     config.optimization.minimize = false;
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;
