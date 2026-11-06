import fs from 'fs';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const OUT_DIR = path.resolve('public/slides');
const TMP_ROOT = path.resolve('tools/print-tmp/text-extract');
const FONT_PATH = 'C:/Windows/Fonts/arial.ttf';
const FONT_BOLD_PATH = 'C:/Windows/Fonts/arialbd.ttf';
const FONT_MATH_PATH = 'C:/Windows/Fonts/seguisym.ttf';

/** Code points that Arial lacks but Segoe UI Symbol draws correctly. */
const MATH_ONLY = new Set([
  0x2227, // ∧
  0x2228, // ∨
  0x21d2, // ⇒
  0x21d0, // ⇐
  0x21d4, // ⇔
  0x22a5, // ⊥
  0x22a4, // ⊤
  0x27a2, // ➢
  0x2192, // →
  0x2190, // ←
  0x2194, // ↔
  0x2208, // ∈
  0x2209, // ∉
  0x2282, // ⊂
  0x2211, // Σ
  0x220f, // ∏
  0x2203, // ∃
  0x221e, // ∞
  0x03c0, // π
  0x03b8, // θ
]);

const jobs = [
  {
    src: 'C:/Users/Lenovo/Downloads/Lecture one.pdf',
    out: 'lecture-one-handout.pdf',
    title: 'Lecture One — Construction of Correct Programs',
  },
  {
    src: 'C:/Users/Lenovo/Downloads/Lecture Two-sun.pdf',
    out: 'lecture-two-handout.pdf',
    title: 'Lecture Two',
  },
  {
    src: 'C:/Users/Lenovo/Downloads/Domain_addendum-lecture2.pdf',
    out: 'lecture-two-addendum-handout.pdf',
    title: 'Domain Addendum — Lecture Two',
  },
  {
    src: 'C:/Users/Lenovo/Downloads/Lecture Three-P1.pdf',
    out: 'lecture-three-handout.pdf',
    title: 'Lecture Three',
  },
];

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_ROOT, { recursive: true });

/**
 * PowerPoint/PDF Symbol-font glyphs often extract as Private Use Area (U+F0xx).
 * Arial cannot draw those → empty □ boxes. Map them to real Unicode math ops.
 */
const SYMBOL_PUA = {
  0xf024: '∃', // exists
  0xf053: 'Σ',
  0xf05e: '⊥', // bottom / false (Symbol)
  0xf070: 'π',
  0xf071: 'θ',
  0xf076: '•',
  0xf097: '•',
  0xf0a3: '≤',
  0xf0a5: '∞',
  0xf0a7: '•',
  0xf0ab: '↔',
  0xf0ae: '→',
  0xf0b3: '≥',
  0xf0b4: '×',
  0xf0b9: '≠',
  0xf0ba: '≡', // equivalence
  0xf0c3: '⊂',
  0xf0ce: '∈',
  0xf0cf: '∉',
  0xf0d5: '∏',
  0xf0d8: '¬', // not
  0xf0d9: '∧', // and
  0xf0da: '∨', // or
  0xf0db: '⇔',
  0xf0dc: '⇐', // implied-by
  0xf0dd: '⇔',
  0xf0de: '⇒', // implies
  0xf0df: '⇐',
  0xf0fc: '✓',
};

function normalizeSymbols(text) {
  let out = '';
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (SYMBOL_PUA[cp]) out += SYMBOL_PUA[cp];
    else if (cp >= 0xf000 && cp <= 0xf0ff) {
      // Unknown Symbol PUA — keep a visible marker rather than an empty box
      out += '�';
    } else out += ch;
  }
  // Prefer a consistent false/bottom glyph already used in the lectures
  out = out.replace(/\u22A5/g, '⊥');
  return out;
}

function itemsToText(items) {
  const rows = [];
  for (const item of items) {
    if (!('str' in item)) continue;
    if (item.str === undefined) continue;
    rows.push({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5],
      size: Math.hypot(item.transform[0], item.transform[1]) || 12,
      hasEOL: !!item.hasEOL,
    });
  }

  rows.sort((a, b) => {
    if (Math.abs(a.y - b.y) > 2) return b.y - a.y;
    return a.x - b.x;
  });

  const lines = [];
  let line = '';
  let lastY = null;
  let lastXEnd = null;

  for (const row of rows) {
    if (lastY !== null && Math.abs(row.y - lastY) > 2) {
      lines.push(line.replace(/\s+$/g, ''));
      line = '';
      lastXEnd = null;
    }

    if (line.length === 0) line = row.str;
    else {
      const needsSpace =
        lastXEnd !== null &&
        row.x - lastXEnd > Math.max(1.2, row.size * 0.08) &&
        !line.endsWith(' ') &&
        !row.str.startsWith(' ');
      line += (needsSpace ? ' ' : '') + row.str;
    }

    if (row.hasEOL) {
      lines.push(line.replace(/\s+$/g, ''));
      line = '';
      lastXEnd = null;
      lastY = row.y;
      continue;
    }

    lastY = row.y;
    lastXEnd = row.x + row.str.length * row.size * 0.45;
  }
  if (line) lines.push(line.replace(/\s+$/g, ''));

  const out = [];
  let blankRun = 0;
  for (const ln of lines) {
    if (!ln.trim()) {
      blankRun++;
      if (blankRun === 1) out.push('');
      continue;
    }
    blankRun = 0;
    out.push(ln);
  }
  return out.join('\n').trimEnd();
}

async function extractPages(srcPath) {
  const data = new Uint8Array(fs.readFileSync(srcPath));
  const doc = await getDocument({ data, useSystemFonts: true }).promise;
  const pages = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const tc = await page.getTextContent();
    pages.push({ n, text: itemsToText(tc.items) });
    if (n % 20 === 0 || n === doc.numPages) console.log(`    extracted ${n}/${doc.numPages}`);
  }
  return pages;
}

const FOOTER_RE =
  /^\s*(FATMA\s*A\.?\s*EL-?LICY.*|FGSSR.*CAIRO.*UNIVERSITY|12\s*October\s*2026.*|\d{1,3})\s*$/i;

function isBoilerplate(line) {
  const t = line.trim();
  if (!t) return false;
  if (FOOTER_RE.test(t)) return true;
  if (/^FATMA\s*A\.?\s*EL-?LICY/i.test(t)) return true;
  if (/CAIRO\s*UNIVERSITY/i.test(t) && t.length < 80) return true;
  if (/^\d{1,3}$/.test(t)) return true;
  if (/^12\s*October\s*2026/i.test(t)) return true;
  return false;
}

function isFormulaish(line) {
  const t = line.trim();
  if (!t) return false;
  if (t.length <= 3) return true;
  // mostly symbols / operators / short math tokens
  const symbolish = (t.match(/[≡≢≠≤≥⇒⇐⇔→←↔∧∨¬≔≠=<>()[\]{}+\-*/^_∫∑∏√⋅·∙⟹⟸⟺]/g) || []).length;
  const letters = (t.match(/[A-Za-z]/g) || []).length;
  return symbolish > 0 && letters <= 8 && t.length <= 40;
}

function endsSoft(line) {
  const t = line.trimEnd();
  if (!t) return false;
  if (/[.•:;!?)]$/.test(t)) return false;
  if (/[-–—]$/.test(t)) return true;
  return /[A-Za-z0-9,]$/.test(t) || isFormulaish(t);
}

function startsContinuation(line) {
  const t = line.trimStart();
  if (!t) return false;
  if (/^[•·●◦▪▫-]/.test(t)) return false;
  if (/^(Slide|Lecture|WHY|HOW|WHAT|NOTE|Read|Theorem|Proof|Example)\b/i.test(t)) return false;
  if (/^[A-Z]{3,}(\s|$)/.test(t)) return false; // likely a new heading
  return (
    /^[a-z0-9(]/.test(t) ||
    /^[A-Z][a-z]/.test(t) || // wrapped onto a Capitalized word
    isFormulaish(t) ||
    /^[≡≢≠≤≥⇒⇐⇔→←↔∧∨¬⊤⊥∈∉⊂]/.test(t)
  );
}

function looksLikeTruthTableLine(line) {
  const t = line.trim();
  if (!t || t.length > 48) return false;
  // Whole-token T / ⊥ cells only (do NOT match the letter t inside words)
  const cells = t.match(/(?:^|\s)(T|⊥|true|false)(?=\s|$)/gi);
  return !!cells && cells.length >= 3;
}

/** Study-ready cleanup: keep wording, fix wrap/boilerplate; don't smash tables. */
function enhanceForStudy(raw) {
  let lines = normalizeSymbols(raw)
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trimEnd());

  // Drop repeated slide chrome
  lines = lines.filter((l) => !isBoilerplate(l));

  const joined = [];
  for (let i = 0; i < lines.length; i++) {
    let t = lines[i].trim();
    if (!t) continue; // ignore blank extract gaps; soft-join handles wraps

    // Fix known PDF split-word artifacts only (avoid "A recent" → "Arecent")
    t = t.replace(/\b([SFTEP])\s(?=oftware\b|unction\b|heorem\b|xample\b|roof\b)/g, '$1');
    // Bullet lines sometimes extract as "• O nly" / "• O ver"
    t = t.replace(/^(•\s*)([A-Z])\s(?=[a-z]{2,})/g, '$1$2');
    // Fix spaced punctuation leftovers: "89 %." / "2025 ."
    t = t.replace(/\s+([%.,;:!?])/g, '$1');
    t = t.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
    t = t.replace(/,\(/g, ', (');

    const prev = joined.length ? joined[joined.length - 1] : '';
    const canJoin =
      prev &&
      !looksLikeTruthTableLine(prev) &&
      !looksLikeTruthTableLine(t) &&
      endsSoft(prev) &&
      startsContinuation(t) &&
      // don't glue a new bullet into previous line
      !t.startsWith('•');

    if (canJoin) {
      const glue = /[-–—]$/.test(prev) ? '' : ' ';
      joined[joined.length - 1] = prev.replace(/\s+$/g, '') + glue + t.replace(/^\s+/g, '');
    } else {
      joined.push(t.replace(/^[•·●◦▪▫]\s*/, '• '));
    }
  }

  return joined.join('\n').trim();
}

function charWidth(ch, size, bodyFont, mathFont) {
  const cp = ch.codePointAt(0);
  const font = MATH_ONLY.has(cp) ? mathFont : bodyFont;
  try {
    return font.widthOfTextAtSize(ch, size);
  } catch {
    return bodyFont.widthOfTextAtSize('?', size);
  }
}

function textWidth(text, size, bodyFont, mathFont) {
  let w = 0;
  for (const ch of text) w += charWidth(ch, size, bodyFont, mathFont);
  return w;
}

function wrapLine(text, bodyFont, mathFont, fontSize, maxWidth) {
  if (!text) return [''];
  const words = text.split(/(\s+)/);
  const lines = [];
  let current = '';
  for (const token of words) {
    const trial = current + token;
    if (textWidth(trial, fontSize, bodyFont, mathFont) <= maxWidth || current === '') current = trial;
    else {
      lines.push(current.replace(/\s+$/g, ''));
      current = token.replace(/^\s+/g, '');
    }
  }
  if (current !== '') lines.push(current.replace(/\s+$/g, ''));
  return lines.length ? lines : [''];
}

/** Draw a string using Arial for text and Segoe UI Symbol for logic ops. */
function drawMixed(page, text, x, y, size, bodyFont, mathFont, color) {
  let cx = x;
  let run = '';
  let runIsMath = null;
  const flush = () => {
    if (!run) return;
    const font = runIsMath ? mathFont : bodyFont;
    page.drawText(run, { x: cx, y, size, font, color });
    cx += font.widthOfTextAtSize(run, size);
    run = '';
  };
  for (const ch of text) {
    const isMath = MATH_ONLY.has(ch.codePointAt(0));
    if (runIsMath === null) runIsMath = isMath;
    if (isMath !== runIsMath) {
      flush();
      runIsMath = isMath;
    }
    run += ch;
  }
  flush();
  return cx - x;
}

function detectTitle(studyText) {
  const first = studyText
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith('•'));
  if (!first) return '';
  if (first.length <= 70 && first === first.toUpperCase() && /[A-Z]/.test(first)) return first;
  if (first.length <= 60 && /[A-Za-z]/.test(first) && !first.endsWith('.')) return first;
  return '';
}

async function buildStudyHandout(pages, outPath, lectureTitle) {
  const enhanced = pages.map((p) => ({
    n: p.n,
    raw: p.text,
    text: enhanceForStudy(p.text || ''),
  }));

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(fs.readFileSync(FONT_PATH), { subset: true });
  const fontBold = await doc.embedFont(fs.readFileSync(FONT_BOLD_PATH), { subset: true });
  const mathFont = await doc.embedFont(fs.readFileSync(FONT_MATH_PATH), { subset: true });

  const pageW = 595.28;
  const pageH = 841.89;
  // Study layout targeting ~12 pages for Lecture One (readable, not cramped)
  const marginX = 40;
  const marginY = 36;
  const colW = pageW - marginX * 2; // single column for clearer study reading
  const titleSize = 11;
  const bodySize = 10.5;
  const lineH = 13.5;
  const small = 9;
  const slideGap = 16;

  // Cover
  {
    const cover = doc.addPage([pageW, pageH]);
    drawMixed(cover, lectureTitle, marginX, pageH - 50, 16, fontBold, mathFont, rgb(0, 0, 0));
    const blurb = `Study handout — text extracted from the original slides (wording preserved). Logic symbols fixed (∧ ∨ ¬ ⇒ ⇐ ≡ ≠ ⊥). About half the paper or less. ${pages.length} slides. Black text on white.`;
    let y = pageH - 78;
    for (const line of wrapLine(blurb, font, mathFont, 9.5, pageW - marginX * 2)) {
      drawMixed(cover, line, marginX, y, 9.5, font, mathFont, rgb(0.15, 0.15, 0.15));
      y -= 13;
    }
    drawMixed(
      cover,
      'How to use: skim slide titles, study bullets in order, read formulas as written.',
      marginX,
      y - 8,
      9.5,
      font,
      mathFont,
      rgb(0.15, 0.15, 0.15),
    );
  }

  let page = doc.addPage([pageW, pageH]);
  let y = pageH - marginY;

  const colX = () => marginX;
  const ensureSpace = (need) => {
    if (y - need >= marginY) return;
    page = doc.addPage([pageW, pageH]);
    y = pageH - marginY;
  };

  const drawWrapped = (text, size, color = rgb(0, 0, 0)) => {
    const wrapped = wrapLine(text, font, mathFont, size, colW);
    for (const wline of wrapped) {
      ensureSpace(lineH);
      if (wline) drawMixed(page, wline, colX(), y - size, size, font, mathFont, color);
      y -= lineH;
    }
  };

  for (const slide of enhanced) {
    const title = detectTitle(slide.text);
    const body = title
      ? slide.text
          .split('\n')
          .filter((l, idx, arr) => !(idx === arr.findIndex((x) => x.trim() === title) && l.trim() === title))
          .join('\n')
          .trim()
      : slide.text;

    ensureSpace(lineH * 4);
    const head = `Slide ${slide.n}${title ? ' — ' + (title.length > 42 ? title.slice(0, 40) + '…' : title) : ''}`;
    drawMixed(page, head, colX(), y - titleSize, titleSize, fontBold, mathFont, rgb(0, 0, 0));
    y -= titleSize + 4;
    page.drawLine({
      start: { x: colX(), y },
      end: { x: colX() + colW, y },
      thickness: 0.5,
      color: rgb(0.65, 0.65, 0.65),
    });
    y -= 8;

    if (!body) {
      drawWrapped('(No body text on this slide.)', small, rgb(0.4, 0.4, 0.4));
    } else {
      for (const raw of body.split('\n')) {
        if (!raw.trim()) {
          y -= lineH * 0.45;
          continue;
        }
        drawWrapped(raw.trim(), bodySize);
      }
    }
    y -= slideGap;
  }

  // Page numbers on every page
  const totalPages = doc.getPageCount();
  for (let i = 0; i < totalPages; i++) {
    const p = doc.getPage(i);
    const label = `${i + 1} / ${totalPages}`;
    p.drawText(label, {
      x: pageW - marginX - font.widthOfTextAtSize(label, 7),
      y: 12,
      size: 7,
      font,
      color: rgb(0.35, 0.35, 0.35),
    });
  }

  fs.writeFileSync(outPath, await doc.save());

  const txtPath = outPath.replace(/\.pdf$/i, '.txt');
  const txt = enhanced
    .map((p) => {
      const title = detectTitle(p.text);
      return `===== SLIDE ${p.n}${title ? ' — ' + title : ''} =====\n${p.text}\n`;
    })
    .join('\n');
  fs.writeFileSync(txtPath, txt, 'utf8');

  console.log(
    `  wrote ${path.basename(outPath)} (${doc.getPageCount()} pages, target ≤ ${Math.ceil(pages.length / 2)}) + ${path.basename(txtPath)}`,
  );
}

for (const job of jobs) {
  if (!fs.existsSync(job.src)) {
    console.error('Missing', job.src);
    process.exit(1);
  }
  console.log('Extracting', path.basename(job.src));
  const pages = await extractPages(job.src);
  const extractJson = path.join(TMP_ROOT, path.basename(job.out, '.pdf') + '.json');
  fs.writeFileSync(extractJson, JSON.stringify(pages, null, 2), 'utf8');
  await buildStudyHandout(pages, path.join(OUT_DIR, job.out), job.title);
}

console.log('Done.');
