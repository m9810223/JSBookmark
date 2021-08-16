```javascript
javascript: (e=>{const t=document.createElement("textarea");t.value=e,document.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)})([...document.querySelectorAll("textarea")].slice(-1)[0].getAttribute("aria-label").match(/AW-\d+\/(.*)'/).pop());
```