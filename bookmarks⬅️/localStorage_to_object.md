```javascript
javascript: (()=>{const e=((e=[])=>e.reduce(((e,t)=>{const[c,o]=t;return{...e,[c]:o}}),{}))(Object.entries(localStorage).map((([e,t])=>{let c;try{c=JSON.parse(decodeURIComponent(t))}catch{try{c=JSON.parse(t)}catch{c=t}}return[e,c]})));console.warn("*** localStorage_to_object",e)})();
```