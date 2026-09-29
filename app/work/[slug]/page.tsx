import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug, getProjectById } from '@/data/projects'
import { CaseStudyPage } from '@/components/CaseStudyPage'

// Static params for all projects
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug) || getProjectById(params.slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} — Hafiz Muneeb Hassan`,
    description: project.shortDescription,
  }
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug) || getProjectById(params.slug)
  if (!project) notFound()

  return <CaseStudyPage project={project} />
}
