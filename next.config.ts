import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["https://picsum.photos/**"],
    // remotePatterns: [new URL("https://picsum.photos/**")],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    includePaths: ["./src"],
  },
};

export default nextConfig;
