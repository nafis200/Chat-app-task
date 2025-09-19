// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      type: "asset/source", // GLSL কে string হিসেবে ইম্পোর্ট করবে
    });
    return config;
  },
};

export default nextConfig;
