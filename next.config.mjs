import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // webpack: (config, options) => {
    //     config.resolve.alias = {
    //         ...config.resolve.alias,
    //         '@com': path.resolve(__dirname, 'app/components')
    //     }

    //     return config;
    // }
};

export default nextConfig;
