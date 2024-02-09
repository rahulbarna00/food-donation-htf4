// const {webpack} = require("next/dist/compiled/webpack/webpack");
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack: (config) => {
//         /**
//          * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
//          * Module parse failed: Unexpected character '�' (1:0)" error
//          */
//         config.resolve.alias.canvas = false;

//         // You may not need this, it's just to support moduleResolution: 'node16'
//         config.resolve.extensionAlias = {
//           '.js': ['.js', '.ts', '.tsx'],
//         };

//         return config;
//       },

// }

// module.exports = nextConfig


const { webpack } = require("next/dist/compiled/webpack/webpack");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // output: 'export',
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          dns: false,
          tls: false,
          assert: false,
          // fixes next-i18next dependencies
          path: false,
          fs: false,
          // fixes mapbox dependencies
          events: false,
          // fixes sentry dependencies
          process: false
        }
      };
    }
    config.resolve.alias.canvas = false;

    // You may not need this, it's just to support moduleResolution: 'node16'
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
      resource.request = resource.request.replace(/^node:/, "");
    }))

    return config
  },
  // experimental: { appDir: true }
};

module.exports = nextConfig
