const object_flatter = (obj, prefix = 'object_name') => {
  if (!obj) return;
  const re = {};
  const recur = (prefix, obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      k = k.match(/^[a-zA-Z]+$/) ? `.${k}` : `['${k}']`;
      k = `${prefix}${k}`;
      if (v.constructor.name !== 'Object') {
        re[k] = v;
      } else {
        recur(k, v);
      }
    });
  };
  recur(prefix, obj);
  return re;
};
export { object_flatter };
