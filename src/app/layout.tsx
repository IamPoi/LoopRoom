import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loop Room',
  description: 'Coding sounds terminal interface',
  other: {
    'google-adsense-account': 'ca-pub-7522569213731555',
  },
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