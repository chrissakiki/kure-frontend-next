import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  turbopack: {
    root: path.join(process.cwd()),
  },
  async redirects() {
    return [
      {
        source: "/rituals",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/wellness-houses",
        destination: "/locations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
