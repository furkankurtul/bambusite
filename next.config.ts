import type { NextConfig } from "next";
import { deploymentConfig } from "./src/config/deployment";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: deploymentConfig.basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
