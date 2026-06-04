import type { Metadata } from 'next'
import { LumiereHeader } from '@/components/lumiere/LumiereHeader'
import { LumiereHero } from '@/components/lumiere/LumiereHero'
import { LumiereRitual } from '@/components/lumiere/LumiereRitual'
import { LumiereTech } from '@/components/lumiere/LumiereTech'
import { LumiereReviews } from '@/components/lumiere/LumiereReviews'
import { LumiereVideoMarquee } from '@/components/lumiere/LumiereVideoMarquee'
import { LumiereConversion } from '@/components/lumiere/LumiereConversion'
import { LumiereFooter } from '@/components/lumiere/LumiereFooter'

export const metadata: Metadata = {
  title: 'Lumière Innovations — Radiate Confidence. Define Beauty.',
  description:
    'Premium microcurrent facial technology. Two editions. One ritual. Infinite confidence.',
}

export default function LumierePage() {
  return (
    <div className="bg-white text-[#0A0A0A] antialiased overflow-x-hidden">
      <LumiereHeader />
      <main>
        <LumiereHero />
        <LumiereRitual />
        <LumiereTech />
        <LumiereReviews />
        <LumiereVideoMarquee />
        <LumiereConversion />
      </main>
      <LumiereFooter />
    </div>
  )
}
