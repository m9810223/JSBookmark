const fs = require('fs');
const path = require('path');

const base_dir = path.resolve(`${__dirname}/..`);
const dist_dir = `${base_dir}/dist`;
const public_dir = `${base_dir}/public`;

const pub_html = `${public_dir}/html`;
const pub_md = `${public_dir}/md`;
const pub_all_bookmarks = `${public_dir}/all_bookmarks⬅️.html`;

const cleanup = (...dirs) => {
  dirs.forEach((dir) => {
    fs.rmdirSync(dir, { recursive: true });
    fs.mkdirSync(dir);
  });
};
cleanup(public_dir, pub_html, pub_md);

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
  .readdirSync(dist_dir)
  .filter((file) => file.endsWith('.js') && fs.lstatSync(path.resolve(dist_dir, file)).isFile())
  .map((file) => path.resolve(dist_dir, file));

const rows = [];

files.forEach((file) => {
  const script = fs.readFileSync(file, 'utf8');
  const basename = path.basename(file, path.extname(file));
  rows.push(create_row(script, basename));
  fs.writeFileSync(`${pub_html}/${basename}.html`, create_html(script));
  fs.writeFileSync(`${pub_md}/${basename}.md`, create_md(script));
});

fs.writeFileSync(pub_all_bookmarks, create_bookmark(rows));
