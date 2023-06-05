/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/tasks/:path*',
                destination: 'http://localhost:3000/tasks/:path*',
            },
        ];
    },
}

module.exports = nextConfig
