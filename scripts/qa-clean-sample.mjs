import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const FOOTER = 'FATMA A. EL-LICY — FGSSR — CAIRO UNIVERSITY';

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
  return { tealSlide, tealPct: Math.round((100 * tealHits) / samples) };
}

async function cleanOne(src, dest, slideNo) {
  const img = await loadImage(src);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const meta = cleanSlide(imageData);
  ctx.putImageData(imageData, 0, 0);
  const footerSize = Math.max(14, Math.round(img.height * 0.018));
  ctx.fillStyle = '#000000';
  ctx.font = `${footerSize}px sans-serif`;
  ctx.textBaseline = 'middle';
  const fy = img.height - 26;
  ctx.textAlign = 'left';
  ctx.fillText(FOOTER, 36, fy);
  ctx.textAlign = 'right';
  ctx.fillText(String(slideNo), img.width - 36, fy);
  fs.writeFileSync(dest, canvas.toBuffer('image/png'));
  console.log(dest, meta);
}

for (const [id, num] of [
  ['002', 2],
  ['013', 13],
  ['014', 14],
  ['015', 15],
]) {
  await cleanOne(
    `E:/AI/General/tools/print-tmp/one/slide-${id}.png`,
    `E:/AI/General/tools/print-tmp/qa-flood-${id}.png`,
    num,
  );
}
