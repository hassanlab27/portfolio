export interface SkillCategory {
  id:          string
  number:      string
  category:    string
  label:       string
  description: string
  skills:      string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id:          'ai-machine-learning',
    number:      '01',
    category:    'AI & MACHINE LEARNING',
    label:       'AI & MACHINE LEARNING',
    description: 'Foundational learning algorithms, statistical modeling, neural networks, and model fine-tuning.',
    skills: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'Neural Networks',
      'NLP',
      'Fine-Tuning',
      'Hyperparameter Tuning',
    ],
  },
  {
    id:          'llms-generative-ai',
    number:      '02',
    category:    'LLMs & GENERATIVE AI',
    label:       'LLMs & GENERATIVE AI',
    description: 'Context-aware retrieval, prompt orchestration, and foundation model APIs.',
    skills: [
      'LLMs',
      'RAG',
      'Generative AI',
      'Prompt Engineering',
      'OpenAI',
      'Gemini',
      'Claude',
      'LangChain',
    ],
  },
  {
    id:          'data-analytics',
    number:      '03',
    category:    'DATA & ANALYTICS',
    label:       'DATA & ANALYTICS',
    description: 'Data ingestion, automated feature engineering, exploratory data analysis, and visualization.',
    skills: [
      'Data Analysis',
      'Data Visualization',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
    ],
  },
  {
    id:          'backend-web',
    number:      '04',
    category:    'BACKEND & WEB',
    label:       'BACKEND & WEB',
    description: 'Production backend services, RESTful API design, automated extraction, and reactive interfaces.',
    skills: [
      'FastAPI',
      'Flask',
      'REST APIs',
      'JavaScript',
      'React',
      'Node.js',
      'Web Scraping',
    ],
  },
  {
    id:          'ai-engineering',
    number:      '05',
    category:    'AI ENGINEERING & TOOLS',
    label:       'AI ENGINEERING & TOOLS',
    description: 'Modern AI development ecosystems, vector search engines, version control, and deployment pipelines.',
    skills: [
      'Hugging Face',
      'Qdrant (Vector DB)',
      'Git & GitHub',
      'Docker',
      'Prompt Engineering',
    ],
  },
  {
    id:          'cloud-database',
    number:      '06',
    category:    'CLOUD / DATABASE',
    label:       'CLOUD / DATABASE',
    description: 'Cloud deployment environments, relational storage engines, and container virtualization.',
    skills: [
      'Azure',
      'Docker',
      'PostgreSQL',
      'MySQL',
      'SQLite',
    ],
  },
]
