/**
 * @file next.config.ts
 * @description The configuration file for the Next.js application.
 * This file is used to customize the behavior of the Next.js server and build process.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
                pathname: '/s2/favicons/**',
            },
        ],
    },
};

export default nextConfig;