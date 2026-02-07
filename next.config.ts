import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Enable Turbopack for faster development
    experimental: {
        turbo: {},
    },
};

export default nextConfig;
