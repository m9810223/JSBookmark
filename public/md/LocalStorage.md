```javascript
javascript: (()=>{"use strict";(()=>{const e=((e=localStorage)=>{const t={};return Object.entries(e).forEach((([e,r])=>{let n;try{n=JSON.parse(decodeURIComponent(r))}catch{try{n=JSON.parse(r)}catch{n=r}}t[e]=n})),t})();((e,t="object_name")=>{if(!e)return;const r={},n=(new Set,{}),c=(e,t)=>{Object.entries(t).forEach((([t,o])=>{if(!o||t.includes(e))return;t=t.match(/^[a-zA-Z_]/)?`.${t}`:`['${t.replace(/'/g,"\\'")}']`,t=`${e}${t}`;let a="";try{a=o?.constructor.name}catch{return}["String","Number","Boolean"].includes(a)?r[t]=o:["Object","Array"].includes(a)?c(t,o):["Window"].includes(a)||(a in n||(n[a]={}),n[a][t]=String(o))}))};c(t,e),r.others=n})(e,"localStorage"),console.warn("*** localStorage\n",e),console.warn("*** CartInfo\n",e.CartInfo)})()})();
```