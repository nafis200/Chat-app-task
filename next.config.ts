// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // GLSL/Shaders ফাইল লোড করার জন্য
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      type: "asset/source", // GLSL কে string হিসেবে ইম্পোর্ট করবে
    });

    // Image ফাইল লোড করার জন্য
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg)$/i,
      type: "asset/resource", // ইমেজ ফাইলকে resource হিসেবে লোড করবে
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
    ],
  },
};

export default nextConfig;
