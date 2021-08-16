console.log('解除滑鼠右鍵封鎖');
(() => {
  const R = (evt_suffix) => {
    ona = 'on' + evt_suffix;
    window.addEventListener &&
      window.addEventListener(
        evt_suffix,
        (event) => {
          for (const n = event.originalTarget; n; n = n.parentNode) {
            n[ona] = null;
          }
        },
        true
      );
    window[ona] = null;
    document[ona] = null;
    document.onkeydown = null;
    document.body && (document.body[ona] = null);
    document.body.oncopy = null;
  };
  R('contextmenu');
  R('click');
  R('mousedown');
  R('mouseup');
  R('selectstart');
})();
