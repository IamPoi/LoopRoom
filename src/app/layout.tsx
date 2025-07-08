import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DEV ASMR Terminal',
  description: 'Coding sounds terminal interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}