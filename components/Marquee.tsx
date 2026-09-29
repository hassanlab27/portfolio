'use client'

interface MarqueeTrackProps {
  items: string[]
  reverse?: boolean
  separator?: string
}

function MarqueeTrack({ items, reverse = false, separator = '·' }: MarqueeTrackProps) {
  /* Triple the items so the loop is perfectly seamless */
  const doubled = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden" aria-hidden>
      <div className={`marquee-track ${reverse ? 'marquee-track--reverse' : 'marquee-track--forward'}`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="label-text text-text-secondary px-6 hover:text-accent transition-colors duration-200 cursor-default">
              {item}
            </span>
            <span className="label-text text-border">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function MarqueeSection() {
  const skills = [
    'AI/ML ENGINEERING',
    'LLM APPLICATIONS',
    'RAG SYSTEMS',
    'AUTOMATION WORKFLOWS',
    'FULL-STACK DEVELOPMENT',
    'MACHINE LEARNING',
    'AI PRODUCT DEVELOPMENT',
    'COMPUTER VISION',
    'NATURAL LANGUAGE PROCESSING',
  ]

  const tech = [
    'PYTHON',
    'SCIKIT-LEARN',
    'LANGCHAIN',
    'FLASK',
    'FASTAPI',
    'REACT',
    'NEXT.JS',
    'POSTGRESQL',
    'QDRANT',
    'AZURE',
    'YOLOV8',
    'AUTOGLUON',
    'SHAP',
  ]

  return (
    <div className="border-y border-border py-6 bg-bg-primary overflow-hidden">
      <div className="mb-5">
        <MarqueeTrack items={skills} />
      </div>
      <MarqueeTrack items={tech} reverse />
    </div>
  )
}
