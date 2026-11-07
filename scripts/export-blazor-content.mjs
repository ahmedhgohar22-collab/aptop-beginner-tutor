import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'AptoP.Tutor', 'wwwroot', 'data');
mkdirSync(outDir, { recursive: true });

const courseUrl = pathToFileURL(join(root, 'src', 'content', 'course.ts')).href;
const glossaryUrl = pathToFileURL(join(root, 'src', 'content', 'glossary.ts')).href;
const midtermUrl = pathToFileURL(join(root, 'src', 'content', 'midterm.ts')).href;
const videosUrl = pathToFileURL(join(root, 'src', 'content', 'videos.ts')).href;
const printablesUrl = pathToFileURL(join(root, 'src', 'content', 'printables.ts')).href;

const { COURSE_META, lectures, contentById } = await import(courseUrl);
const { glossary } = await import(glossaryUrl);
const { midtermDrills, midtermExtraFiveSix, midtermReviewLink } = await import(midtermUrl);
const { videosByLecture, explainersByLecture } = await import(videosUrl);
const { printablesByLecture } = await import(printablesUrl);

const pack = {
  meta: COURSE_META,
  lectures,
  contentById,
  glossary,
  midtermDrills,
  midtermExtraFiveSix,
  midtermReviewLink,
  videosByLecture,
  explainersByLecture,
  printablesByLecture,
};

const outPath = join(outDir, 'course-pack.json');
writeFileSync(outPath, JSON.stringify(pack));
console.log(`Wrote ${outPath} (${Buffer.byteLength(JSON.stringify(pack))} bytes)`);
