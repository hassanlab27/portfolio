export interface Certification {
  id: string
  number: string
  title: string
  issuer: string
  date: string
  imageUrl?: string
  status?: string
  isComingSoon?: boolean
}

export const certifications: Certification[] = [
  {
    id: 'azure-ai-ml',
    number: '01',
    title: 'Microsoft Azure AI-900: AI & ML Fundamentals',
    issuer: 'Microsoft Azure',
    date: 'September 2026',
    status: 'Certificate Coming Soon',
    isComingSoon: true,
  },
  {
    id: 'ai-noc-dot',
    number: '02',
    title: 'Artificial Intelligence',
    issuer: 'NOC Dot Institute',
    date: 'June 2026',
    imageUrl: '/cert-noc-dot.jpg',
  },
  {
    id: 'fullstack-dev',
    number: '03',
    title: 'Full Stack Development',
    issuer: 'Nexskills · Arfa Technology Park',
    date: 'November 2024',
    imageUrl: '/cert-nexskill.jpg',
  },
]
