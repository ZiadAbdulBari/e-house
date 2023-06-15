import Section from '@/components/Section/Section'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Section sectionName='New Arrival' products={[]}/>
    </main>
  )
}
