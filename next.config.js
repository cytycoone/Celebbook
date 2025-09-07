/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['mongoose'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.postimg.cc'
            },
            {
                protocol: 'https',
                hostname: 'imgur.com'
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com'
            },
            {
                protocol: 'https',
                hostname: 'cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos'
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com'
            }
        ],
    },
    // Configure for Replit environment
    async rewrites() {
        return []
    },
    // Allow all hosts for Replit proxy
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig