'use client'

import { Navbar }             from '@/components/Navbar'
import { Hero }               from '@/components/Hero'
import { MarqueeSection }     from '@/components/Marquee'
import { About }              from '@/components/About'
import { ExperienceTimeline } from '@/components/Experience'
import { FeaturedWork }       from '@/components/FeaturedWork'
import { EditorialStrip }     from '@/components/EditorialStrip'
import { TechStack }          from '@/components/TechStack'
import { Certifications }     from '@/components/Certifications'
import { EducationSection }   from '@/components/Education'
import { ProjectArchive }     from '@/components/ProjectArchive'
import { Contact }            from '@/components/Contact'
import { Footer }             from '@/components/Footer'

import { experiences }     from '@/data/experience'
import { skillCategories } from '@/data/skills'
import { certifications }  from '@/data/certifications'
import { education }       from '@/data/education'

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Navbar />
      <Hero />
      <MarqueeSection />
      {/* 01 / ABOUT */}
      <About />
      {/* 02 / EXPERIENCE */}
      <ExperienceTimeline experiences={experiences} />
      {/* 03 / SELECTED WORK */}
      <FeaturedWork />
      {/* EDITORIAL STRIP */}
      <EditorialStrip />
      {/* 04 / ENGINEERING EXPERTISE */}
      <TechStack categories={skillCategories} />
      {/* 05 / CERTIFICATIONS */}
      <Certifications certifications={certifications} />
      {/* 06 / EDUCATION */}
      <EducationSection education={education} />
      {/* 07 / PROJECT ARCHIVE */}
      <ProjectArchive isPage={false} />
      {/* 08 / CONTACT */}
      <Contact />
      <Footer />
    </main>
  )
}
