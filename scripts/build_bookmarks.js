const path = require('path');
const fs = require('fs');

const dist_dir = path.resolve(`${__dirname}/../dist`);
const bookmark_dir = path.resolve(`${__dirname}/../bookmarks⬅️`);
if (!fs.existsSync(bookmark_dir)) {
  fs.mkdirSync(bookmark_dir);
}

const create_md = (script) => {
  return '```javascript\njavascript: ' + script + '\n```';
};

const escape = (data) => {
  return data.replace(/"/g, '&quot;');
};

const create_row = (script, text) => {
  return `    <DT><A HREF="javascript: ${escape(script)}">${text}</A>`;
};

const create_bookmark = (rows) => {
  return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
${rows.join('\n')}
</DL><p>`;
};

const files = fs
  .readdirSync(dist_dir)
  .filter(
    (file) =>
      file.endsWith('.js') &&
      fs.lstatSync(path.resolve(dist_dir, file)).isFile()
  )
  .map((file) => path.resolve(dist_dir, file));

const rows = [];
for (file of files) {
  const script = fs.readFileSync(file, 'utf8');
  const basename = path.basename(file, path.extname(file));
  rows.push(create_row(script, basename));
  const newname = basename + '.md';
  fs.writeFileSync(path.resolve(bookmark_dir, newname), create_md(script));
}

const bookmark = create_bookmark(rows);
fs.writeFileSync(path.resolve(bookmark_dir, 'JSBookmark.html'), bookmark);
