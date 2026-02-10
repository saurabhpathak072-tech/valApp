import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Allow dev client access when opening the site via LAN IP / different origin.
  // Update the IP/port if your dev URL differs.
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://10.161.71.165:3000",
  ],
};

export default nextConfig;
