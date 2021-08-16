console.log('移除 fb bm 的 影響網站事件的重大變更 ... ');
(() => {
  const rm = (t) => {
    if (t) {
      t.remove();
      console.warn('*** remove fb banner');
      // clearInterval(a);
    }
  };
  const a = setInterval(() => {
    const t = document.querySelector('.eyzlfctb ._6_-k')?.parentNode;
    rm(t);
  }, 3000);
})();
