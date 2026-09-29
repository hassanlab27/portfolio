export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  gpa?: string
}

export const education: Education[] = [
  {
    id: 'bs-ai',
    degree: 'B.S. Artificial Intelligence',
    institution: 'Superior University',
    location: 'Lahore',
    period: '2024 – Present',
    gpa: '3.3 / 4.0',
  },
  {
    id: 'intermediate',
    degree: 'Intermediate / F.Sc.',
    institution: 'KIPS College',
    location: 'Lahore',
    period: '2024',
  },
]
