const object_flattener = (obj, prefix = 'object_name') => {
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

      if (recorded.has(v)) {
        return;
      }
      recorded.add(v);

      if (['String', 'Number', 'Boolean'].includes(type)) {
        result[k] = v;
      } else if (['Object', 'Array'].includes(type)) {
        recur(k, v);
      } else if (['Window'].includes(type)) {
        // return;
      } else {
        if (!(type in others)) {
          others[type] = {};
        }
        others[type][k] = String(v);
      }
    });
  };

  recur(prefix, obj);

  result.others = others;
  return result;
};

// console.warn(object_flattener(window, 'window'));

export { object_flattener };
