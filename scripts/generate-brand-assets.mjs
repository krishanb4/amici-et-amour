/**
 * Generates the Amici et Amour favicon suite + social/OG share image.
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Requires Node 22.13+ (use `nvm use 22.22.2`) and the dev deps `sharp` and
 * `opentype.js`. Fonts (Playfair Display + Inter) are downloaded once into
 * scripts/.fonts/ (gitignored). Text is rendered as vector PATHS via opentype.js
 * so no font is needed at render time — sharp's bundled librsvg can't resolve
 * custom fonts otherwise.
 *
 * Outputs to public/: favicon.svg, favicon.ico, favicon-16/32/48x48.png,
 * apple-touch-icon.png, icon-192/512.png, icon-maskable-192/512.png,
 * og-image.png, og-image.jpg.
 */
import sharp from "sharp"
import opentype from "opentype.js"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const HERE = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(HERE, "..", "public")
const FONT_DIR = join(HERE, ".fonts")

const FONT_URLS = {
  playfair: "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf",
  playfairItalic: "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay-Italic%5Bwght%5D.ttf",
  inter: "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf",
}

async function ensureFonts() {
  if (!existsSync(FONT_DIR)) mkdirSync(FONT_DIR, { recursive: true })
  const fonts = {}
  for (const [key, url] of Object.entries(FONT_URLS)) {
    const file = join(FONT_DIR, `${key}.ttf`)
    if (!existsSync(file)) {
      process.stdout.write(`downloading ${key}… `)
      const res = await fetch(url)
      if (!res.ok) throw new Error(`failed to fetch ${key}: ${res.status}`)
      writeFileSync(file, Buffer.from(await res.arrayBuffer()))
      console.log("ok")
    }
    const buf = readFileSync(file)
    fonts[key] = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
  }
  return fonts
}

// ---- Galleria palette ----
const PORC = "#FBFAF7", INK = "#14140F", GREEN = "#1F3A2E"
const GREENB = "#2E5A45", MUTED = "#6E6A60", HAIR = "#E4E1D8"
const CAP = 708 / 1000 // Playfair cap-height / em

let FONTS

// glyph-by-glyph layout (no GSUB shaping). Baseline at (x, y). → { d, width }
function layout(font, text, x, y, size, tracking = 0) {
  const scale = size / font.unitsPerEm
  let cx = x, d = "", prev = null
  for (const ch of text) {
    const g = font.charToGlyph(ch)
    if (prev) cx += font.getKerningValue(prev, g) * scale
    d += g.getPath(cx, y, size).toPathData(3)
    cx += g.advanceWidth * scale + tracking
    prev = g
  }
  return { d, width: cx - x - tracking }
}
const measure = (font, text, size, tracking = 0) => layout(font, text, 0, 0, size, tracking).width

function tileSVG(S, { round = true, capFrac = 0.52, frame = false } = {}) {
  const r = round ? S * 0.22 : 0
  const fs = (S * capFrac) / CAP
  const w = measure(FONTS.playfair, "A", fs)
  const A = layout(FONTS.playfair, "A", S / 2 - w / 2, S / 2 + (S * capFrac) / 2, fs).d
  const frameEl = frame
    ? `<rect x="${S * 0.09}" y="${S * 0.09}" width="${S * 0.82}" height="${S * 0.82}" rx="${r ? r * 0.55 : S * 0.04}" fill="none" stroke="${PORC}" stroke-opacity="0.26" stroke-width="${Math.max(1, S * 0.011)}"/>`
    : ""
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <rect width="${S}" height="${S}" rx="${r}" fill="${GREEN}"/>${frameEl}
  <path d="${A}" fill="${PORC}"/></svg>`
}

const png = (svg, S) => sharp(Buffer.from(svg)).resize(S, S).png({ compressionLevel: 9 }).toBuffer()

function buildIco(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(entries.length, 4)
  const dir = Buffer.alloc(16 * entries.length)
  let offset = 6 + dir.length
  entries.forEach((e, i) => {
    const o = i * 16
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o)
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1)
    dir.writeUInt16LE(1, o + 4)
    dir.writeUInt16LE(32, o + 6)
    dir.writeUInt32LE(e.buf.length, o + 8)
    dir.writeUInt32LE(offset, o + 12)
    offset += e.buf.length
  })
  return Buffer.concat([header, dir, ...entries.map((e) => e.buf)])
}

async function generateIcons() {
  const out = (name, buf) => writeFileSync(join(PUBLIC, name), buf)
  out("favicon.svg", tileSVG(100, { round: true, capFrac: 0.52, frame: true }))
  const f16 = await png(tileSVG(16, { capFrac: 0.56 }), 16)
  const f32 = await png(tileSVG(32, { capFrac: 0.54 }), 32)
  const f48 = await png(tileSVG(48, { capFrac: 0.52, frame: true }), 48)
  out("favicon-16x16.png", f16)
  out("favicon-32x32.png", f32)
  out("favicon-48x48.png", f48)
  out("favicon.ico", buildIco([{ size: 16, buf: f16 }, { size: 32, buf: f32 }, { size: 48, buf: f48 }]))
  out("apple-touch-icon.png", await png(tileSVG(180, { round: false, capFrac: 0.46, frame: true }), 180))
  out("icon-192.png", await png(tileSVG(192, { round: true, capFrac: 0.5, frame: true }), 192))
  out("icon-512.png", await png(tileSVG(512, { round: true, capFrac: 0.5, frame: true }), 512))
  out("icon-maskable-192.png", await png(tileSVG(192, { round: false, capFrac: 0.4 }), 192))
  out("icon-maskable-512.png", await png(tileSVG(512, { round: false, capFrac: 0.4 }), 512))
  console.log("✓ icons")
}

async function generateOG() {
  const W = 1200, H = 630, PHOTO_W = 470, PANEL_W = W - PHOTO_W, M = 80
  const maxText = PANEL_W - M - 64
  const fit = (font, text, target, start) => {
    let s = start
    while (measure(font, text, s) > target && s > 10) s -= 1
    return s
  }
  const TILE = 58, tileX = M, tileY = 66, tFs = (TILE * 0.54) / CAP
  const tAx = tileX + TILE / 2 - measure(FONTS.playfair, "A", tFs) / 2
  const tile = `<rect x="${tileX}" y="${tileY}" width="${TILE}" height="${TILE}" rx="${TILE * 0.22}" fill="${GREEN}"/>
    <path d="${layout(FONTS.playfair, "A", tAx, tileY + TILE / 2 + (TILE * 0.54) / 2, tFs).d}" fill="${PORC}"/>`
  const side = layout(FONTS.inter, "RISTORANTE · BAR", tileX + TILE + 22, tileY + TILE / 2 + 8, 24, 1.5)
  const eyebrow = layout(FONTS.inter, "ITALIAN SOUL · FRENCH FINESSE", M, 250, 21, 3.4)
  const line1 = layout(FONTS.playfair, "Amici", M, 356, fit(FONTS.playfair, "Amici", maxText, 128)).d
  const w2 = fit(FONTS.playfair, "et Amour", maxText, 128)
  const et = layout(FONTS.playfairItalic, "et", M, 468, w2).d
  const amour = layout(FONTS.playfair, "Amour", M + measure(FONTS.playfairItalic, "et ", w2), 468, w2).d
  const tagStr = "A modern Paris table — craft, tradition, passion."
  const tagline = layout(FONTS.playfairItalic, tagStr, M, 536, fit(FONTS.playfairItalic, tagStr, maxText, 29)).d
  const footer = layout(FONTS.inter, "AMICIETAMOUR.FR", M, 590, 18, 2.2)
  const f2 = "24 RUE DE CASTIGLIONE · PARIS"
  const footer2 = layout(FONTS.inter, f2, PANEL_W - 64 - measure(FONTS.inter, f2, 18, 2.2), 590, 18, 2.2).d

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="seam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${INK}" stop-opacity="0.18"/><stop offset="1" stop-color="${INK}" stop-opacity="0"/>
    </linearGradient></defs>
    <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="${HAIR}" stroke-width="2"/>
    <rect x="${PANEL_W}" y="18" width="70" height="${H - 36}" fill="url(#seam)"/>
    <rect x="${PANEL_W - 1.5}" y="18" width="3" height="${H - 36}" fill="${GREEN}"/>
    ${tile}
    <path d="${side.d}" fill="${MUTED}"/>
    <path d="${eyebrow.d}" fill="${GREENB}"/>
    <path d="${line1}" fill="${INK}"/><path d="${et}" fill="${GREENB}"/><path d="${amour}" fill="${INK}"/>
    <path d="${tagline}" fill="${MUTED}"/>
    <line x1="${M}" y1="562" x2="${PANEL_W - 64}" y2="562" stroke="${HAIR}" stroke-width="1.5"/>
    <path d="${footer.d}" fill="${MUTED}"/><path d="${footer2}" fill="${MUTED}"/>
  </svg>`

  const photo = await sharp(join(PUBLIC, "hero.jpg"))
    .resize(PHOTO_W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 1.03, saturation: 1.06 })
    .toBuffer()
  await sharp({ create: { width: W, height: H, channels: 3, background: PORC } })
    .composite([{ input: photo, left: PANEL_W, top: 0 }, { input: Buffer.from(overlay), left: 0, top: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, "og-image.png"))
  await sharp(join(PUBLIC, "og-image.png")).jpeg({ quality: 90, mozjpeg: true }).toFile(join(PUBLIC, "og-image.jpg"))
  console.log("✓ og-image")
}

FONTS = await ensureFonts()
await generateIcons()
await generateOG()
console.log("done →", PUBLIC)
