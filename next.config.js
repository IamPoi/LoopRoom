/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // exportPathMap은 Next.js 15 App Router와 호환되지 않음
  // Vercel 배포 시에는 자동으로 서버리스 함수로 처리됨
}

module.exports = nextConfig