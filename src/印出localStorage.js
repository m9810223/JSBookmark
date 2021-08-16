const localStorage_to_object = (() => {
  const arrayToKVPair = (array = []) =>
    array.reduce((acc, cur) => {
      const [k, v] = cur;
      return { ...acc, [k]: v };
    }, {});
  const ls = Object.entries(localStorage).map(([k, v]) => {
    let obj;
    try {
      obj = JSON.parse(decodeURIComponent(v));
    } catch {
      try {
        obj = JSON.parse(v);
      } catch {
        obj = v;
      }
    }
    return [k, obj];
  });
  return arrayToKVPair(ls);
})();

console.warn('*** localStorage_to_object', localStorage_to_object);
