const object_flatter = (obj, prefix = 'object_name') => {
  console.log('object_flatter', 'prefix:', prefix);

  if (!obj) {
    return;
  }
  const result = {};
  const recorded = new Set();
  const others = {};
  const recur = (prefix, obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      if (!v || k.includes(prefix)) {
        return;
      }
      k = k.match(/^[a-zA-Z_]+$/) ? `.${k}` : `['${k.replace(/'/g, "\\'")}']`;
      k = `${prefix}${k}`;
      let type = '';
      try {
        type = v?.constructor.name;
      } catch {
        return;
      }
      if (['Window'].includes(type)) {
        // return;
      } else if (['Array', 'Object'].includes(type)) {
        recur(k, v);
      } else if (['String', 'Number', 'Boolean'].includes(type)) {
        if (!recorded.has(v)) {
          result[k] = v;
          recorded.add(v);
        }
      } else {
        if (!(type in others)) {
          others[type] = [];
        }
        others[type].push(String(v));
      }
    });
  };
  recur(prefix, obj);
  result.others = others;
  return result;
};

// console.warn(object_flatter(window, 'window'));

export { object_flatter };
