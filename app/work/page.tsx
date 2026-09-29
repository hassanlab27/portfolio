import type { Metadata } from 'next'
import { ProjectArchive } from '@/components/ProjectArchive'

export const metadata: Metadata = {
  title: 'Project Archive — Hafiz Muneeb Hassan',
  description:
    'All projects by Hafiz Muneeb Hassan — AI products, data systems, computer vision, NLP, machine learning, and automation experiments.',
}

export default function WorkPage() {
  return <ProjectArchive isPage={true} />
}
