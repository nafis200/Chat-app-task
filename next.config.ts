import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: true,
  webpack: (config) => {
    config.module!.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      loader: 'webpack-glsl-loader',
      options: {},
    });
    return config;
  },
};

export default nextConfig;
