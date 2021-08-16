import { object_flatter } from './utils';

console.log('印出結構化資料與 meta tag');

(() => {
  let schema = ((selector = 'script[type="application/ld+json"]', type_filter = 'Product') =>
    Array.from(document.querySelectorAll(selector), (s) => JSON.parse(s.textContent.replace(/\s/g, ''))).find(
      (s) => s['@type'] === type_filter
    ))();

  schema = object_flatter(schema, 'schema');
  console.warn('*** schema', schema);

  const metas = (() =>
    Array.from(document.querySelectorAll('meta'), (e) => {
      const s = {
        property: e.getAttribute('property'),
        name: e.getAttribute('name'),
        'http-equiv': e.getAttribute('http-equiv'),
      };
      const t = {
        content: e.getAttribute('content'),
        textContent: e.textContent,
      };
      let selector = '';
      for (const [k, v] of Object.entries(s)) {
        if (v) {
          selector = `document.querySelector('meta[${k}="${v}"]')`;
          break;
        }
      }
      let attr = '';
      let text = '';
      for (const [k, v] of Object.entries(t)) {
        if (v) {
          attr = `.${k}`;
          text = `${v}`;
          break;
        }
      }
      const re = [selector + attr, text];
      return re;
    }).reduce((acc, cur) => {
      let [k, v] = cur;
      while (k in acc) {
        k = k + '_d';
      }
      return { ...acc, [k]: v };
    }, {}))();
  console.warn('*** metas', metas);
})();
