import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be opened from other devices on the LAN / tailnet.
  allowedDevOrigins: ["192.168.1.42", "100.98.109.110", "omarchy"],
};

export default nextConfig;
