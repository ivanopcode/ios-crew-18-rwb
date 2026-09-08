#!/usr/bin/env node
// Visit every slide of a built deck, measure whether flowing content runs
// past the source-note line / slide bottom, and screenshot the final click
// state. Usage: node .scripts/audit-overflow.mjs <baseUrl> <outDir>
import { chromium } from 'playwright-chromium'
import fs from 'node:fs'
import path from 'node:path'

const base = process.argv[2] || 'http://localhost:3030/'
const out = process.argv[3] || '.temp/audit'
fs.mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
const errors = []
page.on('console', m => { if (m.type() === 'error' && !/Wake Lock/.test(m.text())) errors.push(m.text()) })
page.on('pageerror', e => { if (!/Wake Lock/.test(String(e))) errors.push(String(e)) })

// Slide count comes from the deck source: every `---` that opens a slide
// (a frontmatter block or a bare separator) starts a new page.
const deck = process.argv[4] || 'slides.md'
const lines = fs.readFileSync(deck, 'utf8').split('\n')
let total = 0
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() !== '---') continue
  total++
  if (i + 1 < lines.length && /^[A-Za-z_][\w-]*:/.test(lines[i + 1])) {
    i++
    while (i < lines.length && lines[i].trim() !== '---') i++
  }
}
if (!total) { console.error('could not determine slide count'); process.exit(2) }

const rows = []
for (let n = 1; n <= total; n++) {
  await page.goto(`${base}#/${n}?clicks=99`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const r = await page.evaluate(() => {
    const lay = document.querySelector('.slidev-page.slidev-page-' + location.hash.replace('#/', '').split('?')[0] + ' .slidev-layout')
      || document.querySelector('.slidev-layout')
    if (!lay) return null
    const L = lay.getBoundingClientRect()
    const scale = L.width / 980
    let contentBottom = 0
    let widest = 0
    for (const el of lay.querySelectorAll('*')) {
      const cs = getComputedStyle(el)
      if (cs.position === 'absolute' || cs.position === 'fixed') continue
      if (el.closest('.rwb-source, .rwb-pagenum')) continue
      const b = el.getBoundingClientRect()
      if (b.height === 0) continue
      contentBottom = Math.max(contentBottom, (b.bottom - L.top) / scale)
      widest = Math.max(widest, (b.right - L.left) / scale)
    }
    const hasSource = !!lay.querySelector('.rwb-source')
    const h1 = lay.querySelector('h1')?.textContent?.trim() || lay.querySelector('.statement')?.textContent?.trim().slice(0, 60) || ''
    const layoutName = [...lay.classList].find(c => c.startsWith('rwb-')) || ''
    return { contentBottom: Math.round(contentBottom), widest: Math.round(widest), hasSource, h1, layoutName }
  })
  const limit = r?.hasSource ? 498 : 536
  const over = r ? r.contentBottom - limit : 0
  rows.push({ n, ...r, limit, over: Math.round(over), overflow: over > 0 })
  await page.screenshot({ path: path.join(out, `slide-${String(n).padStart(2, '0')}.png`) })
}
await browser.close()
fs.writeFileSync(path.join(out, 'audit.json'), JSON.stringify({ total, errors, rows }, null, 2))
const bad = rows.filter(r => r.overflow)
console.log(`slides: ${total} · overflowing: ${bad.length} · console errors: ${errors.length}`)
for (const r of bad) console.log(`  #${String(r.n).padStart(2)} +${r.over}px ${r.layoutName.padEnd(14)} ${r.h1}`)
for (const e of errors.slice(0, 5)) console.log('  ! ' + e.slice(0, 160))
process.exit(bad.length || errors.length ? 1 : 0)
