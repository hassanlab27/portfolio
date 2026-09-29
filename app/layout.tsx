import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SmoothScroll }   from '@/components/SmoothScroll'
import { CustomCursor }   from '@/components/CustomCursor'
import { PageTransition } from '@/components/PageTransition'
import { SITE_URL }        from '@/lib/site'

/* ── Self-hosted Google Fonts via next/font ── */
const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display:  'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  variable: '--font-mono',
  display:  'swap',
})

/* ── Metadata ── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'Hafiz Muneeb Hassan — AI/ML Engineer | AI Product Engineer',
    template: '%s | Hafiz Muneeb Hassan',
  },
  description:
    'AI/ML Engineer and AI Product Engineer building AI-powered products, LLM applications, RAG systems, automation workflows, and production software.',
  keywords: [
    'AI Engineer', 'ML Engineer', 'AI Product Engineer',
    'LLM', 'RAG', 'Machine Learning', 'Python', 'Next.js',
    'Hafiz Muneeb Hassan', 'Lahore', 'AI Portfolio',
  ],
  authors:  [{ name: 'Hafiz Muneeb Hassan', url: SITE_URL }],
  creator:  'Hafiz Muneeb Hassan',
  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       SITE_URL,
    title:     'Hafiz Muneeb Hassan — AI/ML Engineer | AI Product Engineer',
    description:
      'AI/ML Engineer and AI Product Engineer building AI-powered products, LLM applications, RAG systems, automation workflows, and production software.',
    siteName: 'Hafiz Muneeb Hassan',
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'Hafiz Muneeb Hassan — AI/ML Engineer · AI Product Engineer',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Hafiz Muneeb Hassan — AI/ML Engineer | AI Product Engineer',
    description: 'AI/ML Engineer building AI-powered products, LLM apps, RAG systems, and production software.',
    images:      ['/og-image.jpg'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon:  { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: '/og-image.jpg',
  },
}

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hafiz Muneeb Hassan',
  url: SITE_URL,
  jobTitle: 'AI/ML Engineer',
  description:
    'AI/ML Engineer and AI Product Engineer building AI-powered products, LLM applications, RAG systems, automation workflows, and production software.',
  sameAs: [
    'https://github.com/hassanlab27',
    'https://linkedin.com/in/hafiz-muneeb-hassan/',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Superior University',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Computer Vision',
    'Python',
    'FastAPI',
    'Next.js',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#FAFAF8" />
        {/* Prevent flash: defaults to light mode unless user explicitly selected dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip to content — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-text-primary focus:text-white focus:rounded focus:text-xs focus:font-mono focus:tracking-widest focus:uppercase"
        >
          Skip to content
        </a>
        <PageTransition />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
