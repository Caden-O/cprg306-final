/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', 
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'media.gettyimages.com',
        port: '',
        pathname: '**'
      }
    ],
  },
//   "hosting": {
//   "redirects": [
//     {
//       "source": "",
//       "destination": "/home",
//       "type": 301
//     }
//   ]
// }
};

export default nextConfig;
