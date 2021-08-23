import { object_flattener } from './utils';

console.log('印出結構化資料與 meta tag');

(() => {
  let schema = ((selector = 'script[type="application/ld+json"]', type_filter = 'Product') =>
    Array.from(document.querySelectorAll(selector), (s) => JSON.parse(s.textContent.replace(/\s/g, ''))).find(
      (s) => s['@type'] === type_filter
    ))();

  schema = object_flattener(schema, 'schema');
  console.warn('*** schema', schema);

  const metas = (() => {
    const result = {};
    document.querySelectorAll('meta').forEach((e) => {
      const s = {
        property: e.getAttribute('property'),
        name: e.getAttribute('name'),
        'http-equiv': e.getAttribute('http-equiv'),
      };
      let selector = '';
      for (const [k, v] of Object.entries(s)) {
        if (v) {
          selector = `document.querySelector('meta[${k}="${v}"]')`;
          break;
        }
      }

      const t = {
        content: e.getAttribute('content'),
        textContent: e.textContent,
      };
      let attr = '';
      let text = '';
      for (const [k, v] of Object.entries(t)) {
        if (v) {
          attr = `.${k}`;
          text = `${v}`;
          break;
        }
      }

      selector += attr;

      if (!(selector in result)) {
        result[selector] = [];
      }
      result[selector].push(text);
    });

    return result;
  })();
  console.warn('*** metas', metas);
})();
