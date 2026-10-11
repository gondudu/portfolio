/**
 * Redesigned portfolio images for the Figma Accessibility Plugin.
 * Design direction: editorial minimalism — one concept per image, generous
 * negative space, no fake UI chrome. Plugin palette:
 *   bg #0A0A0D, surface #16161A, accent #9B72FF, yellow #F0C840
 *   text-primary #F0EFF5, text-secondary #6B6A7D
 * Run: node scripts/generate-a11y-images.mjs
 */
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../public/images/projects/figma-accessibility-plugin')

async function svgToJpg(svgString, filename, quality = 93) {
  const buf = Buffer.from(svgString)
  await sharp(buf).jpeg({ quality }).toFile(path.join(OUT, filename))
  console.log(`✓ ${filename}`)
}

// ─── THUMBNAIL (800×600) ─────────────────────────────────────────────────────
// Concept: single bold split — vivid red left, muted olive right.
// Clean halves, lots of dark top/bottom padding for text overlay readability.
async function thumbnail() {
  const W = 800, H = 600
  // Two dominant halves with a vertical divider — the core "before/after" idea
  // Top 30% and bottom 30% are near-black for text overlay legibility
  const midH = H * 0.36   // band height
  const midY = (H - midH) / 2

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <!-- background -->
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>

    <!-- left color block: vivid red (normal vision) -->
    <rect x="0" y="${midY}" width="${W / 2}" height="${midH}" fill="#D94035"/>
    <!-- right color block: protanopia simulation — same red looks like olive -->
    <rect x="${W / 2}" y="${midY}" width="${W / 2}" height="${midH}" fill="#A08830"/>

    <!-- hairline divider -->
    <line x1="${W / 2}" y1="${midY}" x2="${W / 2}" y2="${midY + midH}" stroke="#0A0A0D" stroke-width="2"/>

    <!-- subtle label inside blocks -->
    <text x="${W / 4}" y="${midY + midH / 2 + 5}" text-anchor="middle" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.35)" letter-spacing="2">NORMAL</text>
    <text x="${W * 3 / 4}" y="${midY + midH / 2 + 5}" text-anchor="middle" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.35)" letter-spacing="2">PROTANOPIA</text>

    <!-- top eyebrow -->
    <text x="${W / 2}" y="${midY - 20}" text-anchor="middle" font-family="monospace" font-size="9" fill="#6B6A7D" letter-spacing="3">ACCESSIBILITY PLUGIN</text>
  </svg>`
  await svgToJpg(svg, 'thumbnail.jpg')
}

// ─── HERO (1600×686, ~21:9) ──────────────────────────────────────────────────
// Concept: a full-width colour progression bar — 8 simulations as
// equal-width vertical bands, from vivid (normal) to greyscale (achromacy).
// Minimal text, maximum impact.
async function hero() {
  const W = 1600, H = 686
  const types = [
    { name: 'Normal',       color: '#D94035' },
    { name: 'Protanopia',   color: '#A08830' },
    { name: 'Deuteranopia', color: '#9E9630' },
    { name: 'Tritanopia',   color: '#3D80A8' },
    { name: 'Protanomaly',  color: '#C47A28' },
    { name: 'Deuteranomaly',color: '#7CA838' },
    { name: 'Tritanomaly',  color: '#3A6E7A' },
    { name: 'Achromacy',    color: '#888888' },
  ]

  const bandW = W / types.length
  const bandH = H * 0.42
  const bandY = (H - bandH) / 2

  const bands = types.map((t, i) => `
    <rect x="${i * bandW}" y="${bandY}" width="${bandW}" height="${bandH}" fill="${t.color}"/>
    <text x="${i * bandW + bandW / 2}" y="${bandY + bandH + 28}" text-anchor="middle" font-family="monospace" font-size="11" fill="#6B6A7D" letter-spacing="1">${t.name}</text>
  `).join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>
    ${bands}
    <!-- top label -->
    <text x="${W / 2}" y="${bandY - 32}" text-anchor="middle" font-family="monospace" font-size="11" fill="#6B6A7D" letter-spacing="4">HOW YOUR DESIGN LOOKS ACROSS 8 TYPES OF COLOUR VISION</text>
    <!-- bottom caption -->
    <text x="${W / 2}" y="${H - 28}" text-anchor="middle" font-family="monospace" font-size="10" fill="#3A3A48" letter-spacing="2">ONE CLICK · NON-DESTRUCTIVE · WCAG COMPLIANT</text>
  </svg>`
  await svgToJpg(svg, 'hero.jpg', 95)
}

// ─── INTRO (1600×900) ────────────────────────────────────────────────────────
// Concept: the plugin panel alone — clean, centred, no canvas noise.
async function intro() {
  const W = 1600, H = 900
  const pW = 320, pH = 620
  const pX = (W - pW) / 2
  const pY = (H - pH) / 2

  const items = [
    { label: 'Protanopia',    on: true  },
    { label: 'Deuteranopia',  on: true  },
    { label: 'Tritanopia',    on: false },
    { label: 'Protanomaly',   on: true  },
    { label: 'Deuteranomaly', on: false },
    { label: 'Achromatopsia', on: true  },
    { label: 'High Contrast', on: false },
  ]

  let iy = pY + 148
  const checkboxes = items.map(item => {
    const el = `
      <rect x="${pX + 24}" y="${iy}" width="16" height="16" rx="3" fill="${item.on ? '#9B72FF' : '#1C1C22'}" stroke="${item.on ? 'none' : '#38383F'}" stroke-width="1"/>
      ${item.on ? `<text x="${pX + 32}" y="${iy + 12}" text-anchor="middle" font-family="monospace" font-size="9" fill="white">✓</text>` : ''}
      <text x="${pX + 50}" y="${iy + 12}" font-family="monospace" font-size="12" fill="${item.on ? '#E8E7F2' : '#5A5A6A'}">${item.label}</text>
    `
    iy += 30
    return el
  }).join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>

    <!-- subtle grid dots -->
    ${Array.from({length: 26}, (_, i) => Array.from({length: 16}, (_, j) =>
      `<circle cx="${60 + i * 58}" cy="${55 + j * 52}" r="1" fill="#141418"/>`
    ).join('')).join('')}

    <!-- panel -->
    <rect x="${pX}" y="${pY}" width="${pW}" height="${pH}" rx="12" fill="#16161A" stroke="#222228" stroke-width="1"/>

    <!-- header -->
    <text x="${pX + 24}" y="${pY + 36}" font-family="monospace" font-size="13" font-weight="700" fill="#F0EFF5">Accessibility Variants</text>
    <line x1="${pX + 24}" y1="${pY + 52}" x2="${pX + pW - 24}" y2="${pY + 52}" stroke="#222228" stroke-width="1"/>

    <!-- tabs -->
    <rect x="${pX + 24}" y="${pY + 64}" width="124" height="28" rx="5" fill="#9B72FF" opacity="0.18"/>
    <text x="${pX + 86}" y="${pY + 82}" text-anchor="middle" font-family="monospace" font-size="11" fill="#9B72FF">Simulate</text>
    <text x="${pX + 224}" y="${pY + 82}" text-anchor="middle" font-family="monospace" font-size="11" fill="#5A5A6A">Contrast</text>

    <!-- section label -->
    <text x="${pX + 24}" y="${pY + 124}" font-family="monospace" font-size="9" fill="#6B6A7D" letter-spacing="2">COLOR VISION</text>

    ${checkboxes}

    <!-- divider -->
    <line x1="${pX + 24}" y1="${pY + 378}" x2="${pX + pW - 24}" y2="${pY + 378}" stroke="#222228" stroke-width="1"/>

    <!-- generate button -->
    <rect x="${pX + 24}" y="${pY + 396}" width="${pW - 48}" height="44" rx="8" fill="#9B72FF"/>
    <text x="${pX + pW / 2}" y="${pY + 423}" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="white">Generate Variants</text>

    <!-- free uses -->
    <text x="${pX + pW / 2}" y="${pY + 464}" text-anchor="middle" font-family="monospace" font-size="10" fill="#5A5A6A">4 of 5 free uses remaining</text>

    <!-- upgrade link -->
    <text x="${pX + pW / 2}" y="${pY + 488}" text-anchor="middle" font-family="monospace" font-size="10" fill="#9B72FF">Upgrade — €2 once</text>
  </svg>`
  await svgToJpg(svg, 'intro.jpg')
}

// ─── PROBLEM (1200×675) ──────────────────────────────────────────────────────
// Concept: one bold split rectangle — left red, right olive.
// Captions below each half. No UI chrome.
async function problem() {
  const W = 1200, H = 675
  const blockH = H * 0.45
  const blockY = (H - blockH) / 2
  const gap = 2
  const bW = W / 2 - gap

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>

    <!-- left: normal vision red -->
    <rect x="0" y="${blockY}" width="${bW}" height="${blockH}" fill="#D94035"/>
    <!-- right: protanopia olive -->
    <rect x="${W / 2 + gap}" y="${blockY}" width="${bW}" height="${blockH}" fill="#A08830"/>

    <!-- labels above -->
    <text x="${W / 4}" y="${blockY - 24}" text-anchor="middle" font-family="monospace" font-size="10" fill="#6B6A7D" letter-spacing="3">NORMAL VISION</text>
    <text x="${W * 3 / 4}" y="${blockY - 24}" text-anchor="middle" font-family="monospace" font-size="10" fill="#9B72FF" letter-spacing="3">PROTANOPIA</text>

    <!-- labels below -->
    <text x="${W / 4}" y="${blockY + blockH + 32}" text-anchor="middle" font-family="monospace" font-size="12" fill="#E8E7F2">Red</text>
    <text x="${W * 3 / 4}" y="${blockY + blockH + 32}" text-anchor="middle" font-family="monospace" font-size="12" fill="#E8E7F2">Looks the same</text>

    <!-- bottom stat -->
    <text x="${W / 2}" y="${H - 24}" text-anchor="middle" font-family="monospace" font-size="10" fill="#3A3A48" letter-spacing="2">8% OF MALES CANNOT DISTINGUISH RED FROM GREEN</text>
  </svg>`
  await svgToJpg(svg, 'problem.jpg')
}

// ─── SOLUTION (1200×675) ─────────────────────────────────────────────────────
// Concept: the generate button + 3 variant labels — captures the "one click" idea.
async function solution() {
  const W = 1200, H = 675
  const btnW = 400, btnH = 64
  const btnX = (W - btnW) / 2
  const btnY = (H - btnH) / 2

  // Variant labels above and below
  const labels = ['Protanopia', 'Deuteranopia', 'Tritanopia', 'Protanomaly', 'Achromatopsia', 'High Contrast']
  const labelColors = ['#A08830', '#9E9630', '#3D80A8', '#C47A28', '#888888', '#F0EFF5']

  const labelEls = labels.map((l, i) => {
    const x = 120 + i * 160
    const y = btnY - 80
    return `
      <circle cx="${x}" cy="${y - 16}" r="20" fill="${labelColors[i]}" opacity="0.8"/>
      <text x="${x}" y="${y + 16}" text-anchor="middle" font-family="monospace" font-size="10" fill="#6B6A7D">${l}</text>
      <line x1="${x}" y1="${y + 24}" x2="${W / 2}" y2="${btnY}" stroke="${labelColors[i]}" stroke-width="0.75" opacity="0.3"/>
    `
  }).join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>

    ${labelEls}

    <!-- button -->
    <rect x="${btnX}" y="${btnY}" width="${btnW}" height="${btnH}" rx="10" fill="#9B72FF"/>
    <text x="${W / 2}" y="${btnY + btnH / 2 + 5}" text-anchor="middle" font-family="monospace" font-size="16" font-weight="700" fill="white">Generate Variants</text>

    <!-- caption below -->
    <text x="${W / 2}" y="${btnY + btnH + 40}" text-anchor="middle" font-family="monospace" font-size="11" fill="#6B6A7D">Non-destructive · One undo step · Named groups on canvas</text>
  </svg>`
  await svgToJpg(svg, 'solution.jpg')
}

// ─── FEATURE 01 — Color vision types (1200×675) ──────────────────────────────
// Concept: 8 named colour circles in a single horizontal row.
// Clean, legible, no clutter.
async function feature01() {
  const W = 1200, H = 675
  const types = [
    { name: 'Normal',        color: '#D94035' },
    { name: 'Protanopia',    color: '#A08830' },
    { name: 'Deuteranopia',  color: '#9E9630' },
    { name: 'Tritanopia',    color: '#3D80A8' },
    { name: 'Protanomaly',   color: '#C47A28' },
    { name: 'Deuteranomaly', color: '#7CA838' },
    { name: 'Tritanomaly',   color: '#3A6E7A' },
    { name: 'Achromacy',     color: '#888888' },
  ]
  const r = 58
  const totalW = types.length * r * 2 + (types.length - 1) * 32
  const startX = (W - totalW) / 2 + r
  const cy = H / 2 - 20

  const circles = types.map((t, i) => {
    const cx = startX + i * (r * 2 + 32)
    return `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${t.color}"/>
      <text x="${cx}" y="${cy + r + 24}" text-anchor="middle" font-family="monospace" font-size="11" fill="#6B6A7D">${t.name}</text>
    `
  }).join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>
    <text x="${W / 2}" y="${cy - r - 36}" text-anchor="middle" font-family="monospace" font-size="10" fill="#6B6A7D" letter-spacing="3">COLOUR VISION SIMULATIONS · VIÉNOT 1999</text>
    ${circles}
    <!-- first circle annotation -->
    <text x="${startX}" y="${cy + r + 48}" text-anchor="middle" font-family="monospace" font-size="9" fill="#9B72FF">reference</text>
  </svg>`
  await svgToJpg(svg, 'feature-01.jpg')
}

// ─── FEATURE 02 — Contrast checker (1200×675) ────────────────────────────────
// Concept: The ratio number, dominant and centred. Pass/fail badges below.
async function feature02() {
  const W = 1200, H = 675
  const cy = H / 2

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>

    <!-- eyebrow -->
    <text x="${W / 2}" y="${cy - 120}" text-anchor="middle" font-family="monospace" font-size="10" fill="#6B6A7D" letter-spacing="3">CONTRAST RATIO</text>

    <!-- giant ratio -->
    <text x="${W / 2}" y="${cy + 24}" text-anchor="middle" font-family="monospace" font-size="128" font-weight="700" fill="#F0EFF5">12.4</text>

    <!-- AA / AAA badges -->
    <rect x="${W / 2 - 140}" y="${cy + 52}" width="120" height="40" rx="6" fill="#1A2E1A"/>
    <text x="${W / 2 - 80}" y="${cy + 68}" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="#2DB85A">WCAG AA</text>
    <text x="${W / 2 - 80}" y="${cy + 84}" text-anchor="middle" font-family="monospace" font-size="10" fill="#2DB85A">Pass ✓</text>

    <rect x="${W / 2 + 20}" y="${cy + 52}" width="120" height="40" rx="6" fill="#1A2E1A"/>
    <text x="${W / 2 + 80}" y="${cy + 68}" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="#2DB85A">WCAG AAA</text>
    <text x="${W / 2 + 80}" y="${cy + 84}" text-anchor="middle" font-family="monospace" font-size="10" fill="#2DB85A">Pass ✓</text>

    <!-- bottom note -->
    <text x="${W / 2}" y="${H - 36}" text-anchor="middle" font-family="monospace" font-size="10" fill="#3A3A48" letter-spacing="2">BACKGROUND DETECTED AUTOMATICALLY · CONTRAST CHECKER IS ALWAYS FREE</text>
  </svg>`
  await svgToJpg(svg, 'feature-02.jpg')
}

// ─── FEATURE 03 — Focus rings + text spacing (1200×675) ──────────────────────
// Concept: a single focused component with a yellow focus ring, and below it
// the WCAG text spacing spec as a minimal table.
async function feature03() {
  const W = 1200, H = 675

  // Focus ring demo: a button with a yellow ring
  const btnW = 260, btnH = 56
  const btnX = W / 2 - btnW / 2
  const btnY = H / 2 - 140
  const ringPad = 6

  // Text spacing spec table
  const specs = [
    { prop: 'Line height',     before: '1.2×', after: '1.5×' },
    { prop: 'Letter spacing',  before: '0',    after: '0.12em' },
    { prop: 'Word spacing',    before: '0',    after: '0.16em' },
    { prop: 'Para spacing',    before: '0',    after: '2×' },
  ]
  const tableY = H / 2 + 30
  const tableX = W / 2 - 240
  const rowH = 40

  const tableRows = specs.map((s, i) => {
    const y = tableY + i * rowH
    return `
      <text x="${tableX}" y="${y + 16}" font-family="monospace" font-size="12" fill="#6B6A7D">${s.prop}</text>
      <text x="${tableX + 240}" y="${y + 16}" text-anchor="middle" font-family="monospace" font-size="12" fill="#4A4A58" text-decoration="line-through">${s.before}</text>
      <text x="${tableX + 380}" y="${y + 16}" text-anchor="middle" font-family="monospace" font-size="12" fill="#F0C840">${s.after}</text>
    `
  }).join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0A0A0D"/>

    <!-- eyebrow -->
    <text x="${W / 2}" y="${btnY - 36}" text-anchor="middle" font-family="monospace" font-size="10" fill="#6B6A7D" letter-spacing="3">FOCUS RING OVERLAY</text>

    <!-- button -->
    <rect x="${btnX}" y="${btnY}" width="${btnW}" height="${btnH}" rx="8" fill="#9B72FF"/>
    <text x="${W / 2}" y="${btnY + btnH / 2 + 5}" text-anchor="middle" font-family="monospace" font-size="14" font-weight="600" fill="white">Submit</text>

    <!-- focus ring -->
    <rect x="${btnX - ringPad}" y="${btnY - ringPad}" width="${btnW + ringPad * 2}" height="${btnH + ringPad * 2}" rx="${8 + ringPad}" fill="none" stroke="#F0C840" stroke-width="2.5"/>

    <!-- divider -->
    <line x1="${W / 2 - 200}" y1="${tableY - 20}" x2="${W / 2 + 200}" y2="${tableY - 20}" stroke="#222228" stroke-width="1"/>

    <!-- table header -->
    <text x="${tableX + 240}" y="${tableY - 4}" text-anchor="middle" font-family="monospace" font-size="9" fill="#3A3A48" letter-spacing="2">BEFORE</text>
    <text x="${tableX + 380}" y="${tableY - 4}" text-anchor="middle" font-family="monospace" font-size="9" fill="#F0C840" letter-spacing="2">AFTER</text>

    ${tableRows}

    <!-- WCAG ref -->
    <text x="${W / 2}" y="${H - 32}" text-anchor="middle" font-family="monospace" font-size="10" fill="#3A3A48" letter-spacing="2">WCAG SC 1.4.12 — TEXT SPACING REQUIREMENT</text>
  </svg>`
  await svgToJpg(svg, 'feature-03.jpg')
}

// ─── RUN ALL ────────────────────────────────────────────────────────────────
;(async () => {
  console.log('Regenerating accessibility plugin images…\n')
  await Promise.all([
    thumbnail(),
    hero(),
    intro(),
    problem(),
    solution(),
    feature01(),
    feature02(),
    feature03(),
  ])
  console.log('\nDone.')
})()
