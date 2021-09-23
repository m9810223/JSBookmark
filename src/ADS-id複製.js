(() => {
  const copyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // copy
    const body = document.body;
    body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    body.removeChild(textArea);
  };

  const targetText = [...document.querySelectorAll('textarea')]
    .slice(-1)[0]
    .getAttribute('aria-label')
    .match(/AW-\d+\/(.*)'/)
    .pop();

  copyTextToClipboard(targetText);
})();
