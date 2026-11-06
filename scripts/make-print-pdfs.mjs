import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { PDFDocument } from 'pdf-lib';

/**
 * Manual-style printable pipeline:
 * 1) Rasterize each original lecture PDF → PNG slides
 * 2) Replace colorful teal backgrounds with white (ink-saving B&W)
 * 3) Place 2 cleaned slides per A4 page, fitted to the page
 */

const GS = 'C:\\Program Files\\gs\\gs10.04.0\\bin\\gswin64c.exe';
const OUT_DIR = path.resolve('public/slides');
const TMP_ROOT = path.resolve('tools/print-tmp');
const FOOTER = 'FATMA A. EL-LICY — FGSSR — CAIRO UNIVERSITY';
const FORCE_FRESH = process.argv.includes('--fresh') || process.argv.includes('--from-original');

const jobs = [
  {
    src: 'C:/Users/Lenovo/Downloads/Lecture one.pdf',
    out: 'lecture-one-handout.pdf',
    tag: 'one',
    slides: 76,
  },
  {
    src: 'C:/Users/Lenovo/Downloads/Lecture Two-sun.pdf',
    out: 'lecture-two-handout.pdf',
    tag: 'two',
    slides: 78,
  },
  {
    src: 'C:/Users/Lenovo/Downloads/Domain_addendum-lecture2.pdf',
    out: 'lecture-two-addendum-handout.pdf',
    tag: 'addendum',
    slides: 12,
  },
  {
    src: 'C:/Users/Lenovo/Downloads/Lecture Three-P1.pdf',
    out: 'lecture-three-handout.pdf',
    tag: 'three',
    slides: 78,
  },
];

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_ROOT, { recursive: true });

function rasterizePdf(src, dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  console.log('  rasterizing from original…');
  execFileSync(
    GS,
    [
      '-dSAFER',
      '-dBATCH',
      '-dNOPAUSE',
      '-dQUIET',
      '-sDEVICE=png16m',
      '-r150',
      '-dTextAlphaBits=4',
      '-dGraphicsAlphaBits=4',
      `-sOutputFile=${path.join(dir, 'slide-%03d.png')}`,
      src,
    ],
    { stdio: 'inherit' },
  );
  return fs
    .readdirSync(dir)
    .filter((f) => /^slide-\d+\.png$/i.test(f))
    .sort()
    .map((f) => path.join(dir, f));
}

function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isTealBg(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  if (lum(r, g, b) < 95) return false;
  if (g - r < 18 || b - r < 18) return false;
  return sat >= 0.12;
}

function isDarkTeal(r, g, b) {
  const L = lum(r, g, b);
  if (L >= 95) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  if (sat < 0.35) return false;
  return b - r >= 20 && b >= g - 8;
}

function isYellowish(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  return sat > 0.28 && r > 140 && g > 110 && b < r - 20 && b < g + 10;
}

/** Ink-saving: colorful teal fill → white; text/yellow → black. */
function cleanSlide(imageData) {
  const { data, width, height } = imageData;
  let tealHits = 0;
  let samples = 0;
  const ring = (x, y) => {
    const i = (y * width + x) * 4;
    samples++;
    if (isTealBg(data[i], data[i + 1], data[i + 2])) tealHits++;
  };
  for (let x = 0; x < width; x += 8) {
    ring(x, 2);
    ring(x, height - 3);
  }
  for (let y = 0; y < height; y += 8) {
    ring(2, y);
    ring(width - 3, y);
  }
  const tealSlide = tealHits / samples > 0.25;
  const margin = Math.round(width * 0.035);
  const footerClear = height - 52;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const L = lum(r, g, b);
      let out;

      if (tealSlide && (y >= footerClear || x < margin || x >= width - margin)) {
        out = 255;
      } else if (tealSlide) {
        if (isTealBg(r, g, b) || isDarkTeal(r, g, b)) out = 255;
        else if (isYellowish(r, g, b) || L < 140) out = 0;
        else out = 255;
      } else {
        out = Math.round(L);
        if (out > 245) out = 255;
        else if (out < 140) out = 0;
      }

      data[i] = data[i + 1] = data[i + 2] = out;
      data[i + 3] = 255;
    }
  }
}

async function pngToCleanBuffer(pngPath, slideNo) {
  const img = await loadImage(pngPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  cleanSlide(imageData);
  ctx.putImageData(imageData, 0, 0);

  // Original footer sits in dark gradient (same color as bg) — stamp a crisp one
  const footerSize = Math.max(14, Math.round(img.height * 0.018));
  ctx.fillStyle = '#000000';
  ctx.font = `${footerSize}px sans-serif`;
  ctx.textBaseline = 'middle';
  const fy = img.height - 26;
  ctx.textAlign = 'left';
  ctx.fillText(FOOTER, 36, fy);
  ctx.textAlign = 'right';
  ctx.fillText(String(slideNo), img.width - 36, fy);

  return canvas.toBuffer('image/png');
}

/** 2 slides per A4 page, each image fitted to fill its half-page slot. */
async function buildTwoUp(pngBuffers, outPath) {
  const out = await PDFDocument.create();
  const pageW = 595.28; // A4
  const pageH = 841.89;
  const margin = 10;
  const gap = 8;
  const slotH = (pageH - margin * 2 - gap) / 2;
  const slotW = pageW - margin * 2;

  for (let i = 0; i < pngBuffers.length; i += 2) {
    const sheet = out.addPage([pageW, pageH]);
    for (let idx = 0; idx < 2; idx++) {
      const buf = pngBuffers[i + idx];
      if (!buf) continue;
      const embedded = await out.embedPng(buf);
      // Fit fully inside the half-page slot (contain), maximize size
      const scale = Math.min(slotW / embedded.width, slotH / embedded.height);
      const drawW = embedded.width * scale;
      const drawH = embedded.height * scale;
      const x = margin + (slotW - drawW) / 2;
      const topY = pageH - margin - (slotH + gap) * idx - slotH;
      const y = topY + (slotH - drawH) / 2;
      sheet.drawImage(embedded, { x, y, width: drawW, height: drawH });
    }
  }

  fs.writeFileSync(outPath, await out.save());
  console.log(
    `  wrote ${path.basename(outPath)} — ${pngBuffers.length} slides → ${out.getPageCount()} pages`,
  );
}

const only = process.argv.find((a) => !a.startsWith('-') && a !== process.argv[0] && a !== process.argv[1]);

for (const job of jobs) {
  if (only && !FORCE_FRESH && only !== job.tag && process.argv.includes(only) && !only.endsWith('.mjs')) {
    // allow: node script.mjs one
  }
  if (only && ['one', 'two', 'three', 'addendum'].includes(only) && job.tag !== only) continue;
  if (!fs.existsSync(job.src)) {
    console.error('Missing', job.src);
    process.exit(1);
  }
  console.log('Processing', path.basename(job.src));
  const dir = path.join(TMP_ROOT, job.tag);
  let slides;
  if (FORCE_FRESH || !fs.existsSync(dir)) {
    slides = rasterizePdf(job.src, dir);
  } else {
    slides = fs
      .readdirSync(dir)
      .filter((f) => /^slide-\d+\.png$/i.test(f))
      .sort()
      .map((f) => path.join(dir, f));
    if (slides.length === 0) slides = rasterizePdf(job.src, dir);
    else console.log(`  reusing ${slides.length} rasters (pass --fresh to re-rasterize)`);
  }

  console.log(`  ink-saving cleanup (${slides.length})…`);
  const cleaned = [];
  for (let i = 0; i < slides.length; i++) {
    cleaned.push(await pngToCleanBuffer(slides[i], i + 1));
    if ((i + 1) % 15 === 0 || i + 1 === slides.length) {
      console.log(`    cleaned ${i + 1}/${slides.length}`);
    }
  }
  await buildTwoUp(cleaned, path.join(OUT_DIR, job.out));
}

console.log('Done.');
