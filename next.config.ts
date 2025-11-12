import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Only use basePath in production (for GitHub Pages)
  // In development, basePath should be empty
  basePath: process.env.NODE_ENV === "production" ? "/food-management-app" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
