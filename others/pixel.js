const initPixel = (pixel) => {
  console.log('initPixel', pixel);
  if (
    [...document.querySelectorAll('script')].filter(
      (script) => script.textContent.includes('fbq') && script.textContent.includes(pixel)
    ).length
  ) {
    console.log('重複', pixel);
    return;
  }
  const fbbase_script = document.createElement('script');
  fbbase_script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    // console.warn('init', ${pixel});
    fbq('init', ${pixel});
    // console.warn('track', 'PageView');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(fbbase_script);
  console.log(pixel, '埋了');
};

// const ainitPixel = async (pixel) => {
//   return new Promise((resolve) => {
//     const checker = setInterval(() => {
//       console.log('*** checker');
//       if (window?.fbq?.instance?.pixelsByID[pixel]) {
//         console.warn('*** pixel ok', pixel);
//         clearInterval(checker);
//         resolve();
//       }
//       const scriptInstalled = Array.from(
//         document.querySelectorAll('script'),
//         (s) => s.textContent
//       ).filter((t) => t.match(/fbq.{2}init/g) && t.includes(pixel)).length;
//       if (!scriptInstalled) {
//         const script = document.createElement('script');
//         script.innerHTML = `
//           !function(f,b,e,v,n,t,s)
//           {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//           n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//           if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//           n.queue=[];t=b.createElement(e);t.async=!0;
//           t.src=v;s=b.getElementsByTagName(e)[0];
//           s.parentNode.insertBefore(t,s)}(window, document,'script',
//           'https://connect.facebook.net/en_US/fbevents.js');
//           fbq('init', ${pixel});
//           fbq('track', 'PageView');
//       `;
//         document.head.appendChild(script);
//         console.warn('*** pixel script installed');
//       }
//     }, 500);
//   });
// };

const ainitPixel = async (pixel) => {
  return new Promise((resolve) => {
    if (window?.fbq?.instance?.pixelsByID[pixel]) {
      resolve('already installed', pixel);
    }

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixel);
    window.fbq('trackSingle', pixel, 'PageView');

    resolve('install for pta', pixel);
  });
};

const pixels = ['349034896886221', '558035352239207']; // 測試用 pixel
// initPixel('349034896886221');

const main = () => {
  pixels.forEach(async (p) => {
    await ainitPixel(p);
    window.fbq('trackSingle', p, `${p[0]}`);
    console.log('fbq');
    console.log('go');
  });
};

main();
