/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
        locale: false
      }
    ]
  }
}

export default nextConfig
