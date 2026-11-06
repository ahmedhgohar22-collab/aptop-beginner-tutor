const res = await fetch('https://www.cs.toronto.edu/~hehner/FMSD/');
const html = await res.text();
const rows = [];
const re =
  /Lecture <a href=(FMSD(\d+)\.mp4)>segment \d+<\/a> and <a href=(talk\d+\.pdf)>transcript \d+<\/a> and <a href=(show\d+\.pdf)>visuals \d+<\/a> \[([^\]]+)\] ([^;<]+)/g;
let m;
while ((m = re.exec(html))) {
  rows.push({
    id: Number(m[2]),
    video: m[1],
    transcript: m[3],
    visuals: m[4],
    duration: m[5],
    title: m[6].trim(),
  });
}
console.log(JSON.stringify(rows, null, 2));
