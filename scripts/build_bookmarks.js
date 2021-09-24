const fs = require('fs');
const path = require('path');

const dist_dir = path.resolve(`${__dirname}/../dist`);

const dist_js = `${dist_dir}/js`;

const dist_html = `${dist_dir}/html`;
const dist_md = `${dist_dir}/md`;
const dist_all_bookmarks = `${dist_dir}/all_bookmarks⬅️.html`;

const cleanup = (...dirs) => {
  dirs.forEach((dir) => {
    fs.rmdirSync(dir, { recursive: true });
    fs.mkdirSync(dir);
  });
};
cleanup(dist_html, dist_md);

const create_html = (script) => {
  return `javascript: ${script}`;
};

const create_md = (script) => {
  return `\`\`\`javascript\njavascript: ${script}\n\`\`\``;
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
  .readdirSync(dist_js)
  .filter((file) => file.endsWith('.js') && fs.lstatSync(path.resolve(dist_js, file)).isFile())
  .map((file) => path.resolve(dist_js, file));

const rows = [];

files.forEach((file) => {
  const script = fs.readFileSync(file, 'utf8');
  const basename = path.basename(file, path.extname(file));
  rows.push(create_row(script, basename));
  fs.writeFileSync(`${dist_html}/${basename}.html`, create_html(script));
  fs.writeFileSync(`${dist_md}/${basename}.md`, create_md(script));
});

fs.writeFileSync(dist_all_bookmarks, create_bookmark(rows));
