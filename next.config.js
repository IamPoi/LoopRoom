/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
    }
  },
}

module.exports = nextConfig