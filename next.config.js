/** @type {import('next').NextConfig} */
const nextConfig = {
  // Commented the "output" key below for NextJS to be able to do "next start"
  // But Tauri seems to want this: https://tauri.app/v1/guides/getting-started/setup/next-js/#nextjs-static-exports
  // But I'm wondering how necessary that is with a custom VM?
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
