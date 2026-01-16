const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  turbopack: {}, // Silence Turbopack warning
  images: {
    remotePatterns: [],
    unoptimized: true // NOTE: Remove this line when you don't export app as static
  },
  webpack(config, { isServer }) {
    // Add MiniCssExtractPlugin for CSS modules
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[name].[contenthash].css'
        })
      );
    }

    // SVG handling for webpack (fallback when not using turbopack)
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack']
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  }
};

module.exports = withBundleAnalyzer(nextConfig);
