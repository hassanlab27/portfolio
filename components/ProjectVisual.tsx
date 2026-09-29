'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ─── shared HiDPI canvas hook ─────────────────────────────────────────── */
function useHiDpiCanvas(
  draw: (ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => void
) {
  const drawRef = useRef(draw)
  useEffect(() => { drawRef.current = draw })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    let frame = 0
    let raf: number
    const loop = () => {
      if (!reduced) frame++
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      drawRef.current(ctx, canvas.offsetWidth, canvas.offsetHeight, frame)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return canvasRef
}

const ACCENT  = '#2563EB'
const ACCENT_RGB = '37,99,235'
const ACCENT2 = 'rgba(37,99,235,'
const MUTED   = '#CBD5E1'
const BORDER  = 'rgba(231,231,227,'
const MONO    = '"JetBrains Mono", monospace'

/* ─────────────────────────────────────────────────────────────────────────
   01 · ORVIX VISUAL
   USER → ROADMAP → LEARNING → TESTING → SCORING
   ───────────────────────────────────────────────────────────────────────── */
export function OrvixVisual() {
  const STAGES = [
    { label: 'USER',     sub: 'STUDENT PROFILE' },
    { label: 'ROADMAP',  sub: 'AI CURATION' },
    { label: 'LEARNING', sub: 'PHASE MODULES' },
    { label: 'TESTING',  sub: 'PHASE ASSESSMENT' },
    { label: 'SCORING',  sub: 'DYNAMIC MASTERY' },
  ]

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    const count = STAGES.length
    const cy = H * 0.5
    const isNarrow = W < 460
    const margin = isNarrow ? 36 : 60
    const spacing = (W - margin * 2) / (count - 1)
    const prog = (frame * 0.012) % count
    const activeIndex = Math.floor(prog)
    const subProg = prog % 1

    // Background architectural grid line
    ctx.strokeStyle = `${BORDER}0.5)`
    ctx.lineWidth = 1
    ctx.setLineDash([4, 6])
    ctx.beginPath()
    ctx.moveTo(margin, cy)
    ctx.lineTo(W - margin, cy)
    ctx.stroke()
    ctx.setLineDash([])

    // Connecting active glowing lines
    for (let i = 0; i < count - 1; i++) {
      const x1 = margin + i * spacing
      const x2 = margin + (i + 1) * spacing
      const isPast = i < activeIndex
      const isCurrent = i === activeIndex

      ctx.beginPath()
      ctx.moveTo(x1, cy)
      ctx.lineTo(x2, cy)

      if (isPast) {
        ctx.strokeStyle = `${ACCENT2}0.45)`
        ctx.lineWidth = 1.5
        ctx.stroke()
      } else if (isCurrent) {
        // Partial stroke
        const currentEndX = x1 + (x2 - x1) * subProg
        ctx.strokeStyle = `${ACCENT2}0.2)`
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x1, cy)
        ctx.lineTo(currentEndX, cy)
        ctx.strokeStyle = `${ACCENT2}0.85)`
        ctx.lineWidth = 2
        ctx.stroke()
      } else {
        ctx.strokeStyle = `${BORDER}0.7)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Small directional arrow in middle of segment
      const midX = (x1 + x2) / 2
      ctx.fillStyle = isPast || (isCurrent && subProg > 0.5) ? `${ACCENT2}0.6)` : 'rgba(203,213,225,0.4)'
      ctx.beginPath()
      ctx.moveTo(midX - 3, cy - 3)
      ctx.lineTo(midX + 2, cy)
      ctx.lineTo(midX - 3, cy + 3)
      ctx.closePath()
      ctx.fill()
    }

    // Nodes and labels
    STAGES.forEach((stage, i) => {
      const x = margin + i * spacing
      const isPast = i <= activeIndex
      const isCurrent = i === activeIndex
      const pulse = (Math.sin(frame * 0.05 + i * 1.2) + 1) / 2
      const radius = isCurrent ? 7 + pulse * 2.5 : 5.5

      // Outer ripple on active node
      if (isCurrent) {
        ctx.beginPath()
        ctx.arc(x, cy, radius + 8 + pulse * 6, 0, Math.PI * 2)
        ctx.strokeStyle = `${ACCENT2}${0.25 - pulse * 0.15})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Halo ring
      ctx.beginPath()
      ctx.arc(x, cy, radius + 4, 0, Math.PI * 2)
      ctx.strokeStyle = isPast ? `${ACCENT2}${isCurrent ? 0.4 + pulse * 0.3 : 0.2})` : 'rgba(203,213,225,0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Core node circle
      ctx.beginPath()
      ctx.arc(x, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = isPast ? ACCENT : MUTED
      ctx.globalAlpha = isCurrent ? 0.95 : isPast ? 0.75 : 0.4
      ctx.fill()
      ctx.globalAlpha = 1

      // Inner white dot
      if (isPast) {
        ctx.beginPath()
        ctx.arc(x, cy, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      }

      // Step number above node
      ctx.font = `500 ${isNarrow ? '7.5px' : '8.5px'} ${MONO}`
      ctx.textAlign = 'center'
      ctx.fillStyle = isCurrent ? `${ACCENT2}0.9)` : isPast ? 'rgba(102,102,102,0.7)' : 'rgba(170,170,170,0.45)'
      ctx.fillText(`0${i + 1}`, x, cy - radius - 18)

      // Main label below node
      ctx.font = `600 ${isNarrow ? '8px' : '9.5px'} ${MONO}`
      ctx.fillStyle = isCurrent ? `${ACCENT2}0.95)` : isPast ? 'rgba(17,17,17,0.85)' : 'rgba(153,153,153,0.45)'
      ctx.fillText(stage.label, x, cy + radius + 18)

      // Subtitle (hidden on very small viewports)
      if (!isNarrow && H > 130) {
        ctx.font = `400 7px ${MONO}`
        ctx.fillStyle = isCurrent ? `${ACCENT2}0.7)` : 'rgba(153,153,153,0.45)'
        ctx.fillText(stage.sub, x, cy + radius + 30)
      }
    })

    // Traveling packet pulse along the pipeline
    const travelingX = margin + (prog % (count - 1)) * spacing
    const grad = ctx.createRadialGradient(travelingX, cy, 0, travelingX, cy, 10)
    grad.addColorStop(0, `${ACCENT2}0.9)`)
    grad.addColorStop(1, `${ACCENT2}0)`)
    ctx.beginPath()
    ctx.arc(travelingX, cy, 4, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   02 · AUTODATABOT VISUAL
   DATASET → CLEAN → ANALYZE → TRAIN → EVALUATE → OUTPUT
   ───────────────────────────────────────────────────────────────────────── */
export function AutoDataBotVisual() {
  const STEPS = [
    { label: 'DATASET',   sub: 'CSV INGESTION' },
    { label: 'CLEAN',     sub: 'IMPUTATION & NORM' },
    { label: 'ANALYZE',   sub: 'EDA & QUALITY' },
    { label: 'TRAIN',     sub: 'AUTOGLUON & FLAML' },
    { label: 'EVALUATE',  sub: 'SHAP & METRICS' },
    { label: 'OUTPUT',    sub: 'REPORT & MODEL' },
  ]

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    const n = STEPS.length
    const pad = 16
    const bh = Math.max(22, Math.min(32, (H - pad * 2 - (n - 1) * 6) / n))
    const bw = Math.min(W - pad * 2, 340)
    const sx = (W - bw) / 2
    const totalH = n * bh + (n - 1) * 6
    const sy = (H - totalH) / 2
    const prog = (frame % 240) / 240
    const activeStep = prog * n
    const activeIndex = Math.floor(activeStep)

    // Flow line along the left edge
    const guideX = sx - 12
    if (guideX > 6) {
      ctx.strokeStyle = `${BORDER}0.6)`
      ctx.lineWidth = 1
      ctx.setLineDash([2, 4])
      ctx.beginPath()
      ctx.moveTo(guideX, sy)
      ctx.lineTo(guideX, sy + totalH)
      ctx.stroke()
      ctx.setLineDash([])

      // Traveling pulse dot
      const pulseY = sy + prog * totalH
      const pulseGrad = ctx.createRadialGradient(guideX, pulseY, 0, guideX, pulseY, 8)
      pulseGrad.addColorStop(0, `${ACCENT2}0.95)`)
      pulseGrad.addColorStop(1, `${ACCENT2}0)`)
      ctx.beginPath()
      ctx.arc(guideX, pulseY, 4, 0, Math.PI * 2)
      ctx.fillStyle = pulseGrad
      ctx.fill()
    }

    STEPS.forEach((step, i) => {
      const y = sy + i * (bh + 6)
      const isPast = i < activeIndex
      const isCurrent = i === activeIndex
      const stepProg = isCurrent ? activeStep % 1 : isPast ? 1 : 0
      const alpha = isPast || isCurrent ? 1 : 0.28

      // Background card fill
      if (isCurrent) {
        ctx.fillStyle = `${ACCENT2}${0.04 + stepProg * 0.05})`
        ctx.fillRect(sx, y, bw, bh)
      } else if (isPast) {
        ctx.fillStyle = 'rgba(243,244,241,0.5)'
        ctx.fillRect(sx, y, bw, bh)
      }

      // Border
      ctx.strokeStyle = isCurrent
        ? `${ACCENT2}${0.6 + stepProg * 0.35})`
        : isPast
        ? `${ACCENT2}0.25)`
        : `${BORDER}0.9)`
      ctx.lineWidth = isCurrent ? 1.5 : 1
      ctx.strokeRect(sx, y, bw, bh)

      // Active progress bar at bottom of active card
      if (isCurrent) {
        ctx.fillStyle = `${ACCENT2}0.85)`
        ctx.fillRect(sx, y + bh - 2, bw * stepProg, 2)
      }

      const midY = y + bh / 2 + 3.5

      // Step index
      ctx.font = `500 8px ${MONO}`
      ctx.fillStyle = isCurrent ? `${ACCENT2}0.9)` : `rgba(153,153,153,${alpha})`
      ctx.textAlign = 'left'
      ctx.fillText(`0${i + 1}`, sx + 8, midY)

      // Step label
      ctx.font = `600 9px ${MONO}`
      ctx.fillStyle = isCurrent ? `${ACCENT2}0.95)` : `rgba(17,17,17,${alpha})`
      ctx.fillText(step.label, sx + 32, midY)

      // Step subtext
      if (bw > 160) {
        ctx.font = `400 7.5px ${MONO}`
        ctx.fillStyle = isCurrent ? `${ACCENT2}0.7)` : `rgba(153,153,153,${alpha * 0.8})`
        ctx.textAlign = 'right'
        ctx.fillText(step.sub, sx + bw - 8, midY)
      }

      // Downward connection arrow between cards
      if (i < n - 1) {
        const ay = y + bh + 3
        const mx = sx + bw / 2
        ctx.strokeStyle = isPast ? `${ACCENT2}0.3)` : `${BORDER}0.7)`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(mx, ay)
        ctx.lineTo(mx, ay + 2)
        ctx.stroke()
      }
    })
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   03 · OPEN CV DASHBOARD
   IMAGE → DETECTION → OBJECTS → COUNT
   ───────────────────────────────────────────────────────────────────────── */
export function OpenCVVisual() {
  const STAGES = ['IMAGE', 'DETECTION', 'OBJECTS', 'COUNT']

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    // Header pipeline strip
    const headerH = 22
    ctx.font = `500 7.5px ${MONO}`
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(153,153,153,0.65)'
    ctx.fillText('PIPELINE: IMAGE → DETECTION → OBJECTS → COUNT', 14, 15)

    // Divider
    ctx.strokeStyle = `${BORDER}0.7)`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(10, headerH)
    ctx.lineTo(W - 10, headerH)
    ctx.stroke()

    // 2-zone layout: Frame view (Left) and Object Counting Matrix (Right)
    const colSplit = Math.max(W * 0.58, W - 140)
    const p1 = (Math.sin(frame * 0.04) + 1) / 2
    const p2 = (Math.sin(frame * 0.04 + 1.6) + 1) / 2

    // ── Zone 1: Detection Frame ──
    const fx = 18, fy = headerH + 12, fw = colSplit - 28, fh = H - headerH - 24
    ctx.fillStyle = 'rgba(243,244,241,0.5)'
    ctx.fillRect(fx, fy, fw, fh)
    ctx.strokeStyle = `${BORDER}0.9)`
    ctx.lineWidth = 1
    ctx.strokeRect(fx, fy, fw, fh)

    // Corner crosshairs on main viewport
    const cs = 6
    ctx.strokeStyle = `${ACCENT2}0.5)`
    ctx.lineWidth = 1.5
    // Top-left
    ctx.beginPath(); ctx.moveTo(fx, fy + cs); ctx.lineTo(fx, fy); ctx.lineTo(fx + cs, fy); ctx.stroke()
    // Top-right
    ctx.beginPath(); ctx.moveTo(fx + fw - cs, fy); ctx.lineTo(fx + fw, fy); ctx.lineTo(fx + fw, fy + cs); ctx.stroke()
    // Bottom-left
    ctx.beginPath(); ctx.moveTo(fx, fy + fh - cs); ctx.lineTo(fx, fy + fh); ctx.lineTo(fx + cs, fy + fh); ctx.stroke()
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(fx + fw - cs, fy + fh); ctx.lineTo(fx + fw, fy + fh); ctx.lineTo(fx + fw, fy + fh - cs); ctx.stroke()

    // Bounding Box 1: Face / Primary object
    const bx1 = fx + fw * 0.18, by1 = fy + fh * 0.16, bw1 = fw * 0.38, bh1 = fh * 0.52
    ctx.strokeStyle = `${ACCENT2}${0.7 + p1 * 0.3})`
    ctx.lineWidth = 1.5
    ctx.strokeRect(bx1, by1, bw1, bh1)
    // Label tag
    ctx.fillStyle = `${ACCENT2}0.9)`
    ctx.fillRect(bx1, by1 - 12, 64, 12)
    ctx.font = `600 7px ${MONO}`
    ctx.fillStyle = '#ffffff'
    ctx.fillText('TARGET_01 [0.98]', bx1 + 3, by1 - 3)

    // Bounding Box 2: Secondary detection
    const bx2 = fx + fw * 0.62, by2 = fy + fh * 0.36, bw2 = fw * 0.3, bh2 = fh * 0.44
    ctx.strokeStyle = `rgba(100,116,139,${0.5 + p2 * 0.3})`
    ctx.lineWidth = 1
    ctx.strokeRect(bx2, by2, bw2, bh2)
    ctx.fillStyle = 'rgba(100,116,139,0.85)'
    ctx.fillRect(bx2, by2 - 12, 58, 12)
    ctx.fillStyle = '#ffffff'
    ctx.fillText('TARGET_02 [0.94]', bx2 + 3, by2 - 3)

    // Scanning laser line
    const scanY = fy + ((frame * 1.5) % fh)
    const scanGrad = ctx.createLinearGradient(fx, scanY - 8, fx, scanY + 8)
    scanGrad.addColorStop(0, `${ACCENT2}0)`)
    scanGrad.addColorStop(0.5, `${ACCENT2}0.12)`)
    scanGrad.addColorStop(1, `${ACCENT2}0)`)
    ctx.fillStyle = scanGrad
    ctx.fillRect(fx, scanY - 8, fw, 16)

    // ── Zone 2: Object Count Metrics ──
    const cx = colSplit, cy = fy, cw = W - colSplit - 14, ch = fh
    ctx.fillStyle = 'rgba(250,250,248,0.9)'
    ctx.fillRect(cx, cy, cw, ch)
    ctx.strokeStyle = `${BORDER}0.9)`
    ctx.lineWidth = 1
    ctx.strokeRect(cx, cy, cw, ch)

    ctx.font = `500 7px ${MONO}`
    ctx.fillStyle = 'rgba(153,153,153,0.8)'
    ctx.fillText('OBJECT COUNT', cx + 10, cy + 16)

    // Big counter
    ctx.font = `700 ${Math.min(32, ch * 0.38)}px ${MONO}`
    ctx.fillStyle = `${ACCENT2}0.9)`
    ctx.fillText('03', cx + 10, cy + ch * 0.52)

    // Status chips
    ctx.font = `500 7px ${MONO}`
    ctx.fillStyle = 'rgba(102,102,102,0.85)'
    ctx.fillText('STATUS: TRACKING', cx + 10, cy + ch * 0.72)
    ctx.fillText('MODE: CV UNIVERSAL', cx + 10, cy + ch * 0.86)
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   04 · AI UTILITY DASHBOARD
   WEATHER · NEWS · NASA · CAR · JOKES
   ───────────────────────────────────────────────────────────────────────── */
export function AiUtilityVisual() {
  const MODULES = [
    { label: 'WEATHER', icon: 'METRIC', sub: 'TEMPERATURE & CONDITIONS' },
    { label: 'NEWS',    icon: 'FEED',   sub: 'DAILY HEADLINES' },
    { label: 'NASA',    icon: 'SPACE',  sub: 'APOD IMAGERY' },
    { label: 'CAR',     icon: 'SPECS',  sub: 'VEHICLE LOOKUP' },
    { label: 'JOKES',   icon: 'TEXT',   sub: 'STREAMED HUMOR' },
  ]

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    const cols = W > 480 ? 3 : 2
    const rows = Math.ceil(MODULES.length / cols)
    const pad = 12
    const cw = (W - pad * (cols + 1)) / cols
    const rh = (H - pad * (rows + 1)) / rows

    MODULES.forEach((m, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = pad + (cw + pad) * col
      const y = pad + (rh + pad) * row
      const p = (Math.sin(frame * 0.04 + i * 1.3) + 1) / 2

      ctx.fillStyle = 'rgba(243,244,241,0.55)'
      ctx.fillRect(x, y, cw, rh)

      ctx.strokeStyle = `${ACCENT2}${0.18 + p * 0.22})`
      ctx.lineWidth = 1
      ctx.strokeRect(x, y, cw, rh)

      // Header tag
      ctx.font = `600 8.5px ${MONO}`
      ctx.fillStyle = `${ACCENT2}0.9)`
      ctx.textAlign = 'left'
      ctx.fillText(m.label, x + 8, y + 14)

      // Status indicator dot
      ctx.beginPath()
      ctx.arc(x + cw - 10, y + 11, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `${ACCENT2}${0.5 + p * 0.4})`
      ctx.fill()

      // Waveform bars inside card
      const barCount = 4
      const barW = (cw - 20) / barCount - 3
      for (let b = 0; b < barCount; b++) {
        const barH = Math.max(4, (Math.sin(frame * 0.03 + i + b * 0.8) + 1) * 0.5 * (rh * 0.35))
        const bx = x + 8 + b * ((cw - 20) / barCount)
        const by = y + rh - 10 - barH
        ctx.fillStyle = `${ACCENT2}${0.2 + p * 0.15})`
        ctx.fillRect(bx, by, barW, barH)
      }
    })
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   05 · EMAIL SCRAPER
   WEBSITE → EXTRACTION → ORGANIZATION → EXCEL
   ───────────────────────────────────────────────────────────────────────── */
export function EmailScraperVisual() {
  const STAGES = [
    { label: 'WEBSITE',      sub: 'URL INGEST' },
    { label: 'EXTRACTION',   sub: 'REGEX PARSER' },
    { label: 'ORGANIZATION', sub: 'DEDUPLICATION' },
    { label: 'EXCEL',        sub: 'XLSX EXPORT' },
  ]

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    const count = STAGES.length
    const margin = 50
    const spacing = (W - margin * 2) / (count - 1)
    const cy = H * 0.48
    const prog = (frame * 0.015) % count
    const activeIndex = Math.floor(prog)

    // Pipeline track
    for (let i = 0; i < count - 1; i++) {
      const x1 = margin + i * spacing
      const x2 = margin + (i + 1) * spacing
      const isPast = i < activeIndex

      ctx.strokeStyle = isPast ? `${ACCENT2}0.45)` : `${BORDER}0.8)`
      ctx.lineWidth = isPast ? 1.5 : 1
      ctx.beginPath()
      ctx.moveTo(x1, cy)
      ctx.lineTo(x2, cy)
      ctx.stroke()

      // Arrow indicator
      const mid = (x1 + x2) / 2
      ctx.fillStyle = isPast ? `${ACCENT2}0.6)` : 'rgba(203,213,225,0.45)'
      ctx.beginPath()
      ctx.moveTo(mid - 3, cy - 3)
      ctx.lineTo(mid + 2, cy)
      ctx.lineTo(mid - 3, cy + 3)
      ctx.closePath()
      ctx.fill()
    }

    STAGES.forEach((stage, i) => {
      const x = margin + i * spacing
      const isPast = i <= activeIndex
      const isCurrent = i === activeIndex
      const p = (Math.sin(frame * 0.05 + i) + 1) / 2
      const r = isCurrent ? 8 + p * 2 : 6

      ctx.beginPath()
      ctx.arc(x, cy, r + 4, 0, Math.PI * 2)
      ctx.strokeStyle = isPast ? `${ACCENT2}${isCurrent ? 0.35 : 0.15})` : 'rgba(203,213,225,0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = isPast ? ACCENT : MUTED
      ctx.globalAlpha = isPast ? 0.85 : 0.35
      ctx.fill()
      ctx.globalAlpha = 1

      // Label
      ctx.font = `600 8.5px ${MONO}`
      ctx.fillStyle = isCurrent ? `${ACCENT2}0.95)` : isPast ? 'rgba(17,17,17,0.85)' : 'rgba(153,153,153,0.45)'
      ctx.textAlign = 'center'
      ctx.fillText(stage.label, x, cy + r + 16)

      ctx.font = `400 7px ${MONO}`
      ctx.fillStyle = isCurrent ? `${ACCENT2}0.7)` : 'rgba(153,153,153,0.45)'
      ctx.fillText(stage.sub, x, cy + r + 26)
    })
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   06 · RAG BOT
   DOCUMENTS → EMBEDDINGS → VECTOR SEARCH → RETRIEVAL → ANSWER
   ───────────────────────────────────────────────────────────────────────── */
export function RagBotVisual() {
  const STAGES = ['DOCUMENTS', 'EMBEDDINGS', 'VECTOR SEARCH', 'RETRIEVAL', 'ANSWER']

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    // 3 Visual Zones: [Documents] -> [Vector Space] -> [Retrieved Answer]
    const z1 = W * 0.28
    const z2 = W * 0.68

    // Dividers
    ctx.strokeStyle = `${BORDER}0.6)`
    ctx.lineWidth = 1
    ctx.setLineDash([3, 5])
    ctx.beginPath(); ctx.moveTo(z1, 12); ctx.lineTo(z1, H - 12); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(z2, 12); ctx.lineTo(z2, H - 12); ctx.stroke()
    ctx.setLineDash([])

    // Zone labels
    ctx.font = `500 7px ${MONO}`
    ctx.fillStyle = 'rgba(153,153,153,0.6)'
    ctx.textAlign = 'center'
    ctx.fillText('DOCUMENTS', z1 / 2, 16)
    ctx.fillText('EMBEDDINGS / VECTOR SEARCH', (z1 + z2) / 2, 16)
    ctx.fillText('RETRIEVAL → ANSWER', (z2 + W) / 2, 16)

    // Zone 1: Document chunks
    const docs = [{ y: 0.3 }, { y: 0.52 }, { y: 0.74 }]
    docs.forEach((d, i) => {
      const p = (Math.sin(frame * 0.03 + i) + 1) / 2
      const dx = z1 * 0.15, dy = d.y * H, dw = z1 * 0.7, dh = H * 0.13
      ctx.fillStyle = `rgba(243,244,241,${0.6 + p * 0.2})`
      ctx.fillRect(dx, dy - dh / 2, dw, dh)
      ctx.strokeStyle = `${BORDER}0.9)`
      ctx.strokeRect(dx, dy - dh / 2, dw, dh)

      // text lines inside doc
      for (let l = 0; l < 3; l++) {
        ctx.fillStyle = `rgba(180,185,195,${0.4 + p * 0.2})`
        ctx.fillRect(dx + 5, dy - dh / 2 + 5 + l * 5, dw - 10, 2)
      }
    })

    // Zone 2: Vector Search Cluster
    const points: [number, number, boolean][] = [
      [0.36, 0.32, false], [0.42, 0.65, true], [0.48, 0.42, true],
      [0.54, 0.28, true], [0.60, 0.68, false], [0.52, 0.78, true],
    ]
    points.forEach(([rx, ry, isHot], i) => {
      const px = rx * W, py = ry * H
      const p = (Math.sin(frame * 0.04 + i) + 1) / 2
      if (isHot) {
        ctx.beginPath()
        ctx.arc(px, py, 6 + p * 3, 0, Math.PI * 2)
        ctx.strokeStyle = `${ACCENT2}0.2)`
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(px, py, isHot ? 4.5 : 3, 0, Math.PI * 2)
      ctx.fillStyle = isHot ? ACCENT : MUTED
      ctx.fill()
    })

    // Zone 3: Answer stream
    const ax = z2 + 14, ay = H * 0.24, aw = W - z2 - 28, ah = H * 0.56
    ctx.fillStyle = 'rgba(250,250,248,0.92)'
    ctx.fillRect(ax, ay, aw, ah)
    ctx.strokeStyle = `${ACCENT2}0.25)`
    ctx.strokeRect(ax, ay, aw, ah)

    ctx.font = `600 7.5px ${MONO}`
    ctx.fillStyle = `${ACCENT2}0.9)`
    ctx.textAlign = 'left'
    ctx.fillText('OUTPUT STREAM', ax + 6, ay + 14)

    for (let l = 0; l < 4; l++) {
      const p2 = (Math.sin(frame * 0.03 + l * 0.4) + 1) / 2
      ctx.fillStyle = `rgba(102,102,102,${0.25 + p2 * 0.2})`
      ctx.fillRect(ax + 6, ay + 24 + l * 9, aw * 0.75, 2)
    }
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   07 · NLP CHATBOT
   JSON → NLP → RESPONSE
   ───────────────────────────────────────────────────────────────────────── */
export function NlpChatbotVisual() {
  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    // 3 Stages: [JSON SOURCE] -> [NLP PARSER] -> [RESPONSE BUBBLE]
    const cy = H * 0.5
    const isNarrow = W < 420
    const margin = isNarrow ? 24 : 40
    const seg = (W - margin * 2) / 3

    // Stage 1: JSON Box
    const jx = margin, jy = cy - 26, jw = seg * 0.85, jh = 52
    ctx.fillStyle = 'rgba(243,244,241,0.7)'
    ctx.fillRect(jx, jy, jw, jh)
    ctx.strokeStyle = `${BORDER}0.9)`
    ctx.strokeRect(jx, jy, jw, jh)

    ctx.font = `600 7.5px ${MONO}`
    ctx.fillStyle = 'rgba(102,102,102,0.9)'
    ctx.textAlign = 'left'
    ctx.fillText('JSON STORE', jx + 6, jy + 13)
    ctx.font = `400 6.5px ${MONO}`
    ctx.fillStyle = 'rgba(153,153,153,0.7)'
    ctx.fillText('{"intent": ...}', jx + 6, jy + 26)
    ctx.fillText('{"reply": ...}', jx + 6, jy + 38)

    // Stage 2: NLP Core Node
    const nx = margin + seg * 1.5, ny = cy
    const p = (Math.sin(frame * 0.04) + 1) / 2
    ctx.beginPath(); ctx.arc(nx, ny, 18 + p * 3, 0, Math.PI * 2)
    ctx.strokeStyle = `${ACCENT2}${0.1 + p * 0.15})`
    ctx.stroke()
    ctx.beginPath(); ctx.arc(nx, ny, 14, 0, Math.PI * 2)
    ctx.fillStyle = `${ACCENT2}0.08)`
    ctx.fill()
    ctx.strokeStyle = `${ACCENT2}0.4)`
    ctx.stroke()

    ctx.font = `600 8px ${MONO}`
    ctx.fillStyle = `${ACCENT2}0.95)`
    ctx.textAlign = 'center'
    ctx.fillText('NLP', nx, ny + 3)

    // Stage 3: Response Message
    const rx = margin + seg * 2.2, ry = cy - 22, rw = seg * 0.9, rh = 44
    ctx.fillStyle = 'rgba(37,99,235,0.08)'
    ctx.fillRect(rx, ry, rw, rh)
    ctx.strokeStyle = `${ACCENT2}0.3)`
    ctx.strokeRect(rx, ry, rw, rh)

    ctx.font = `600 7.5px ${MONO}`
    ctx.fillStyle = `${ACCENT2}0.9)`
    ctx.textAlign = 'left'
    ctx.fillText('RESPONSE', rx + 6, ry + 14)
    ctx.font = `400 7px ${MONO}`
    ctx.fillStyle = 'rgba(102,102,102,0.85)'
    ctx.fillText('Matched context.', rx + 6, ry + 28)

    // Connecting arrows
    ctx.strokeStyle = `${ACCENT2}0.25)`
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(jx + jw, cy); ctx.lineTo(nx - 18, cy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(nx + 18, cy); ctx.lineTo(rx, cy); ctx.stroke()
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   08 · SKIN CANCER PREDICTION
   IMAGE → PREPROCESSING → CNN → CLASSIFICATION
   ───────────────────────────────────────────────────────────────────────── */
export function SkinCancerVisual() {
  const LAYERS = [
    { label: 'IMAGE', n: 1, x: 0.10 },
    { label: 'NORM',  n: 3, x: 0.28 },
    { label: 'CONV',  n: 5, x: 0.46 },
    { label: 'DENSE', n: 3, x: 0.68 },
    { label: 'CLASS', n: 2, x: 0.88 },
  ]

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    LAYERS.forEach((layer, li) => {
      const x = layer.x * W
      const nodeH = H / (layer.n + 1)
      const isPast = li <= Math.floor((frame * 0.02) % LAYERS.length)

      for (let ni = 0; ni < layer.n; ni++) {
        const y = nodeH * (ni + 1)

        // Connect to next layer
        if (li < LAYERS.length - 1) {
          const next = LAYERS[li + 1]
          const nextX = next.x * W
          const nextH = H / (next.n + 1)
          for (let nni = 0; nni < next.n; nni++) {
            const ny = nextH * (nni + 1)
            ctx.strokeStyle = isPast ? `${ACCENT2}0.08)` : 'rgba(203,213,225,0.1)'
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(nextX, ny)
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.arc(x, y, isPast ? 4.5 : 3.5, 0, Math.PI * 2)
        ctx.fillStyle = isPast ? ACCENT : MUTED
        ctx.fill()
      }

      ctx.font = `500 7px ${MONO}`
      ctx.textAlign = 'center'
      ctx.fillStyle = isPast ? `${ACCENT2}0.85)` : 'rgba(153,153,153,0.45)'
      ctx.fillText(layer.label, x, H - 8)
    })
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─────────────────────────────────────────────────────────────────────────
   09 · HOUSE / TITANIC PREDICTION
   DATA → FEATURES → MODEL → PREDICTION → EVALUATION
   ───────────────────────────────────────────────────────────────────────── */
export function HouseTitanicVisual() {
  const STAGES = [
    { label: 'DATA',       sub: 'RAW DATASET' },
    { label: 'FEATURES',   sub: 'ENGINEERING' },
    { label: 'MODEL',      sub: 'TRAINING' },
    { label: 'PREDICTION', sub: 'INFERENCE' },
    { label: 'EVALUATION', sub: 'CROSS-VAL' },
  ]

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => {
    const tracks = [
      { cy: H * 0.34, label: 'HOUSE PRICES · REGRESSION', color: ACCENT },
      { cy: H * 0.70, label: 'TITANIC · CLASSIFICATION',  color: 'rgba(100,116,139,1)' },
    ]

    tracks.forEach((track, ti) => {
      const prog = (frame % 200) / 200
      const activeIdx = Math.floor(prog * STAGES.length)

      ctx.font = `500 7px ${MONO}`
      ctx.fillStyle = 'rgba(153,153,153,0.55)'
      ctx.textAlign = 'left'
      ctx.fillText(track.label, 12, track.cy - 18)

      STAGES.forEach((stage, i) => {
        const x = (W / (STAGES.length + 1)) * (i + 1)
        const isPast = i <= activeIdx
        const p = (Math.sin(frame * 0.04 + ti + i) + 1) / 2

        if (i < STAGES.length - 1) {
          const nextX = (W / (STAGES.length + 1)) * (i + 2)
          ctx.strokeStyle = isPast ? `${ACCENT2}0.25)` : `${BORDER}0.7)`
          ctx.lineWidth = isPast ? 1.4 : 0.8
          ctx.beginPath()
          ctx.moveTo(x, track.cy)
          ctx.lineTo(nextX - 8, track.cy)
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(x, track.cy, 5, 0, Math.PI * 2)
        ctx.fillStyle = isPast ? track.color : MUTED
        ctx.fill()

        ctx.font = `500 7.5px ${MONO}`
        ctx.textAlign = 'center'
        ctx.fillStyle = isPast ? 'rgba(17,17,17,0.85)' : 'rgba(153,153,153,0.45)'
        ctx.fillText(stage.label, x, track.cy + 15)
      })
    })

    // Track divider
    ctx.strokeStyle = `${BORDER}0.6)`
    ctx.lineWidth = 1
    ctx.setLineDash([3, 5])
    ctx.beginPath(); ctx.moveTo(10, H * 0.52); ctx.lineTo(W - 10, H * 0.52); ctx.stroke()
    ctx.setLineDash([])
  }, [])

  const ref = useHiDpiCanvas(draw)
  return <canvas ref={ref} className="w-full h-full" style={{ display: 'block' }} />
}

/* ─── Visual registry ──────────────────────────────────────────────────── */
export const VISUAL_MAP: Record<string, React.ComponentType> = {
  'orvix':                    OrvixVisual,
  'autodatabot':              AutoDataBotVisual,
  'open-cv-dashboard':        OpenCVVisual,
  'ai-utility-dashboard':     AiUtilityVisual,
  'email-scraper':            EmailScraperVisual,
  'rag-bot':                  RagBotVisual,
  'nlp-chatbot':              NlpChatbotVisual,
  'skin-cancer-prediction':   SkinCancerVisual,
  'house-titanic-prediction': HouseTitanicVisual,
}
