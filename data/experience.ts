export interface Experience {
  id: string
  role: string
  company: string
  period: string
  location?: string
  responsibilities: string[]
}

export const experiences: Experience[] = [
  {
    id: 'azuno',
    role: 'AI/ML Intern',
    company: 'Azuno Technologies',
    location: 'Lahore',
    period: 'Apr 2026 – Sep 2026',
    responsibilities: [
      'Contributed to Site DNA, a security auditing platform running 15+ parallel scan engines, building and supporting vulnerability-detection features alongside the AI/engineering team.',
      'Collaborated in designing and building a CRM system with a Python backend, covering schema design, REST API endpoints, and PostgreSQL data persistence.',
    ],
  },
  {
    id: 'superior',
    role: 'AI Intern',
    company: 'Superior University',
    location: 'Lahore',
    period: '2025',
    responsibilities: [
      'Built a Retrieval-Augmented Generation (RAG) chatbot from scratch in Python.',
      'Owned the full engineering pipeline end-to-end — from domain data collection and preprocessing to semantic retrieval and model integration.',
    ],
  },
]
