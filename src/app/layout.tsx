import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SocialDock from '@/components/SocialDock'

export const metadata: Metadata = {
  title: 'AE - Decoration, Furniture, Luxury Fragrance, Graphic Design & Real Estate',
  description: 'Premium design and real estate services. Stylish decoration, furniture, luxury fragrance, graphic design, and real estate solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <SocialDock />
        <Footer />
      </body>
    </html>
  )
}
