import { object_flattener } from './utils';

(() => {
  const ls_to_obj = (ls = localStorage) => {
    const result = {};
    Object.entries(ls).forEach(([k, v]) => {
      let val;
      try {
        val = JSON.parse(decodeURIComponent(v));
      } catch {
        try {
          val = JSON.parse(v);
        } catch {
          val = v;
        }
      }
      result[k] = val;
    });
    return result;
  };

  const ls_obj = ls_to_obj();
  const lsf = object_flattener(ls_obj, 'localStorage');

  console.warn('*** localStorage\n', ls_obj);
  console.log(lsf);
  console.table(lsf);
})();
