/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/tasks',
                destination: 'http://localhost:3000/tasks/',
            },
            {
                source: '/tasks/:id',
                destination: 'http://localhost:3000/tasks/:id'
            }
        ];
    },
}

module.exports = nextConfig
