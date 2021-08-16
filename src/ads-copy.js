(() => {
  const copyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // copy
    document.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const targetText = [...document.querySelectorAll('textarea')]
    .slice(-1)[0]
    .getAttribute('aria-label')
    .match(/AW-\d+\/(.*)'/)
    .pop();

  copyTextToClipboard(targetText);
})();
