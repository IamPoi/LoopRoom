import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Loop Room - Coding ASMR & LoFi Study Sounds',
  description: 'Terminal-style interface for coding ASMR, LoFi beats, and ambient study sounds. Perfect for programming, focus, and relaxation.',
  keywords: ['coding', 'asmr', 'lofi', 'study', 'healing', 'ambient', 'focus', 'programming', 'terminal', 'white noise', 'productivity', 'relaxation'],
  authors: [{ name: 'Loop Room' }],
  creator: 'Loop Room',
  publisher: 'Loop Room',
  robots: 'index, follow',
  openGraph: {
    title: 'Loop Room - Coding ASMR & LoFi Study Sounds',
    description: 'Terminal-style interface for coding ASMR, LoFi beats, and ambient study sounds',
    url: 'https://loop-room-seven.vercel.app',
    siteName: 'Loop Room',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loop Room - Coding ASMR & LoFi Study Sounds',
    description: 'Terminal-style interface for coding ASMR, LoFi beats, and ambient study sounds',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7522569213731555"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}