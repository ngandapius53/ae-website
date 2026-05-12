import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SocialDock from '@/components/SocialDock'
import WorkshopStrip from '@/components/WorkshopStrip'

export const metadata: Metadata = {
  title: 'ARAH Enterprises Furniture Workshop',
  description: 'ARAH Enterprises Furniture Workshop in Kampala Ntinda for sofasets, beds, wardrobes, TV stands, decoration, fragrance, graphic design, and real estate support.',
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
        <WorkshopStrip />
        <main>{children}</main>
        <SocialDock />
        <Footer />
      </body>
    </html>
  )
}
