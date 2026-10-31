import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: { globalNotFound: true },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
