console.log('確認埋 code 狀態');
(() => {
  const ecid = window.tagtoo_advertiser_id;
  const ss = [...document.querySelectorAll('script')].filter((e) =>
    e.src.includes('//ad.tagtoo.co/media/ad/track.js')
  );
  const l = ss.length;
  const pos = ss.map((s) => s.parentNode.tagName.toLowerCase()).join(', ');
  const result =
    (ecid && l === 1 ? `成功，ecid: ${ecid}` : `失敗，埋code次數: ${l}`) +
    (l ? `，在：${pos}` : '') +
    '。';

  // const div = document.createElement('div');
  // div.style =
  //   'display: block; font-size: 32px; z-index: -1000; color: rgb(245, 216, 52); background-color: rgb(37, 105, 252);';
  // div.textContent = result;

  // const t = document.title;
  // document.body.insertBefore(div, document.body.firstChild);
  // document.title = result;

  window.alert(result);

  // setTimeout(() => {
  //   div.remove();
  //   document.title = t;
  // }, 3000);
})();
