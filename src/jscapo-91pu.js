console.log('91pu網站轉調工具');
(() => {
  const [alphabets_s, alphabets_f] = [
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
  ];
  let i = 0;
  const key_to_num = [...alphabets_s, ...alphabets_f].reduce((acc, cur) => {
    return { ...acc, [cur]: i++ % alphabets_s.length };
  }, {});
  const transposition = ((s) => s[0].toUpperCase() + s.slice(1))(window.prompt('format: current ±n'));
  let [current_key, offset] = transposition.split(' ', 2);
  if (current_key.endsWith('m')) {
    current_key = current_key.slice(0, -1);
  }
  const current_num = key_to_num[current_key];
  const transpo_num = (current_num + Number(offset)) % alphabets_s.length;
  const key_sharp = ['C', 'G', 'D', 'A', 'E', 'B', 'F#'].map((a) => key_to_num[a]);
  const get_alphabets = (tonic_num) => {
    let re = key_sharp.includes(tonic_num) ? alphabets_s : alphabets_f;
    re = [...re.slice(tonic_num), ...re].slice(0, 12);
    return re;
  };
  const alphabets_old = get_alphabets(current_num);
  const alphabets_new = get_alphabets(transpo_num);
  const map = (() => {
    const a = alphabets_old.reduce((acc, cur, i) => ({ ...acc, [cur]: alphabets_new[i] }), {});
    const keys = [
      ...Object.keys(a).filter((e) => e.length === 2),
      ...Object.keys(a).filter((e) => e.length === 1),
    ];
    const re = {};
    keys.forEach((element) => {
      re[element] = a[element];
    });
    return re;
  })();
  const transpper = (input) => {
    const [chord, root] = input.split('/');
    const re = [];
    for (const [k, v] of Object.entries(map)) {
      if (chord.includes(k)) {
        re.push(chord.replace(k, v));
        break;
      }
    }
    if (root) {
      for ([k, v] of Object.entries(map)) {
        if (root.includes(k)) {
          re.push(root.replace(k, v));
          break;
        }
      }
    }
    return re.join('/');
  };
  const chord_nodes = document.querySelectorAll('.tf');
  chord_nodes.forEach((element) => {
    element.textContent = transpper(element.textContent);
  });
})();
