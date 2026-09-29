'use client'

import { useState, useEffect } from 'react'

interface NodeData {
  id: string
  label: string
  sublabel: string
  tech: string[]
  metrics: string
}

const NODES: Record<string, NodeData> = {
  ai: {
    id: 'ai',
    label: 'ARTIFICIAL INTELLIGENCE',
    sublabel: 'CORE INTELLIGENCE LAYER',
    tech: ['Foundation Models', 'Optimization', 'Deep Learning'],
    metrics: '99.4% Architecture Stability',
  },
  ml: {
    id: 'ml',
    label: 'MACHINE LEARNING',
    sublabel: 'PREDICTIVE SYSTEMS',
    tech: ['Scikit-learn', 'PyTorch', 'Computer Vision'],
    metrics: 'Supervised & Unsupervised',
  },
  llm: {
    id: 'llm',
    label: 'LLMs & RAG',
    sublabel: 'GENERATIVE INTELLIGENCE',
    tech: ['Gemini', 'Mistral 7B', 'Vector Embeddings', 'Qdrant'],
    metrics: 'Context-Aware Retrieval',
  },
  data: {
    id: 'data',
    label: 'DATA & PIPELINES',
    sublabel: 'ANALYTICS & ETL',
    tech: ['Pandas', 'NumPy', 'Feature Engineering'],
    metrics: 'Automated Cleaning & EDA',
  },
  products: {
    id: 'products',
    label: 'AI PRODUCTS',
    sublabel: 'DEPLOYED SOFTWARE',
    tech: ['Next.js', 'FastAPI', 'Production APIs', 'Client UX'],
    metrics: 'High-Throughput Usable Systems',
  },
}

export function AiSystemVisual() {
  const [activeNode, setActiveNode] = useState<string>('ai')
  const [cycleIndex, setCycleIndex] = useState(0)

  // Gentle autonomous node highlight cycle if user hasn't hovered
  useEffect(() => {
    const keys = ['ai', 'ml', 'llm', 'data', 'products']
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % keys.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentKey = activeNode || ['ai', 'ml', 'llm', 'data', 'products'][cycleIndex]
  const current = NODES[currentKey] || NODES.ai

  return (
    <div className="w-full relative border border-border/80 bg-surface/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-sm p-6 sm:p-8 rounded-xl overflow-hidden select-none">
      {/* Editorial Header Strip */}
      <div className="flex items-center justify-between pb-5 border-b border-border/60 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="number-text text-accent font-mono text-[10px] tracking-widest uppercase">
            ARCHITECTURE MATRIX // 01
          </span>
        </div>
        <span className="number-text text-text-muted text-[10px] font-mono tracking-wider">
          LIVE SYSTEM FLOW
        </span>
      </div>

      {/* SVG Canvas & Node Diagram */}
      <div className="relative py-2">
        {/* Top Node: AI */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onMouseEnter={() => setActiveNode('ai')}
            className={`px-5 py-3 border transition-all duration-300 text-center rounded-lg ${
              currentKey === 'ai'
                ? 'border-accent bg-accent/5 shadow-[0_0_20px_rgba(29,78,216,0.12)]'
                : 'border-border/80 bg-surface hover:border-text-secondary'
            }`}
          >
            <span className="number-text text-[9px] block text-accent font-mono">NODE 01</span>
            <span className="text-[13px] font-medium tracking-tight text-text-primary block font-mono">
              AI FOUNDATION
            </span>
          </button>
        </div>

        {/* Tree SVG Connectors */}
        <div className="relative h-14 w-full flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 60" fill="none" preserveAspectRatio="none">
            {/* Trunk */}
            <path d="M 200 0 L 200 24" stroke="var(--color-border)" strokeWidth="1.5" />
            {/* Split bar */}
            <path d="M 60 24 L 340 24" stroke="var(--color-border)" strokeWidth="1.5" />
            {/* Branches to ML, LLM, DATA */}
            <path d="M 60 24 L 60 60" stroke="var(--color-border)" strokeWidth="1.5" />
            <path d="M 200 24 L 200 60" stroke="var(--color-border)" strokeWidth="1.5" />
            <path d="M 340 24 L 340 60" stroke="var(--color-border)" strokeWidth="1.5" />

            {/* Active flow signal */}
            <circle cx="200" cy="12" r="2.5" fill="var(--color-accent)">
              <animate attributeName="cy" values="0;24" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="42" r="2" fill="var(--color-accent)">
              <animate attributeName="cy" values="24;60" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="42" r="2" fill="var(--color-accent)">
              <animate attributeName="cy" values="24;60" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="340" cy="42" r="2" fill="var(--color-accent)">
              <animate attributeName="cy" values="24;60" dur="2.2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Middle Tier: ML, LLMs, DATA */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          {/* ML */}
          <button
            type="button"
            onMouseEnter={() => setActiveNode('ml')}
            className={`p-3 border transition-all duration-300 text-center rounded-lg ${
              currentKey === 'ml'
                ? 'border-accent bg-accent/5 shadow-[0_0_16px_rgba(29,78,216,0.1)]'
                : 'border-border/80 bg-surface hover:border-text-secondary'
            }`}
          >
            <span className="number-text text-[9px] block text-accent font-mono">02A</span>
            <span className="text-[11px] sm:text-[12px] font-medium tracking-tight text-text-primary block font-mono">
              ML & DL
            </span>
          </button>

          {/* LLMs */}
          <button
            type="button"
            onMouseEnter={() => setActiveNode('llm')}
            className={`p-3 border transition-all duration-300 text-center rounded-lg ${
              currentKey === 'llm'
                ? 'border-accent bg-accent/5 shadow-[0_0_16px_rgba(29,78,216,0.1)]'
                : 'border-border/80 bg-surface hover:border-text-secondary'
            }`}
          >
            <span className="number-text text-[9px] block text-accent font-mono">02B</span>
            <span className="text-[11px] sm:text-[12px] font-medium tracking-tight text-text-primary block font-mono">
              LLMs / RAG
            </span>
          </button>

          {/* DATA */}
          <button
            type="button"
            onMouseEnter={() => setActiveNode('data')}
            className={`p-3 border transition-all duration-300 text-center rounded-lg ${
              currentKey === 'data'
                ? 'border-accent bg-accent/5 shadow-[0_0_16px_rgba(29,78,216,0.1)]'
                : 'border-border/80 bg-surface hover:border-text-secondary'
            }`}
          >
            <span className="number-text text-[9px] block text-accent font-mono">02C</span>
            <span className="text-[11px] sm:text-[12px] font-medium tracking-tight text-text-primary block font-mono">
              DATA & ETL
            </span>
          </button>
        </div>

        {/* Convergence SVG Connectors */}
        <div className="relative h-14 w-full flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 60" fill="none" preserveAspectRatio="none">
            {/* Branches down from ML, LLM, DATA */}
            <path d="M 60 0 L 60 36" stroke="var(--color-border)" strokeWidth="1.5" />
            <path d="M 200 0 L 200 36" stroke="var(--color-border)" strokeWidth="1.5" />
            <path d="M 340 0 L 340 36" stroke="var(--color-border)" strokeWidth="1.5" />
            {/* Merge bar */}
            <path d="M 60 36 L 340 36" stroke="var(--color-border)" strokeWidth="1.5" />
            {/* Final output trunk */}
            <path d="M 200 36 L 200 60" stroke="var(--color-border)" strokeWidth="1.5" />

            <circle cx="200" cy="48" r="2.5" fill="var(--color-accent)">
              <animate attributeName="cy" values="36;60" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Bottom Node: PRODUCTS */}
        <div className="flex justify-center">
          <button
            type="button"
            onMouseEnter={() => setActiveNode('products')}
            className={`px-6 py-3.5 border transition-all duration-300 text-center rounded-lg w-full max-w-[280px] ${
              currentKey === 'products'
                ? 'border-accent bg-accent/5 shadow-[0_0_20px_rgba(29,78,216,0.14)]'
                : 'border-border/80 bg-surface hover:border-text-secondary'
            }`}
          >
            <span className="number-text text-[9px] block text-accent font-mono">OUTPUT LAYER</span>
            <span className="text-[13px] font-medium tracking-tight text-text-primary block font-mono">
              PRODUCTION AI PRODUCTS
            </span>
          </button>
        </div>
      </div>

      {/* Dynamic Telemetry / Node Inspector Panel */}
      <div className="mt-8 pt-5 border-t border-border/70 bg-bg-primary/60 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="label-text text-[9.5px] text-accent tracking-widest font-mono">
            {current.sublabel}
          </span>
          <span className="number-text text-[10px] text-text-muted font-mono">
            {current.metrics}
          </span>
        </div>

        <p className="text-[13px] font-medium text-text-primary tracking-tight mb-3">
          {current.label}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {current.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-surface border border-border/80 text-text-secondary rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
