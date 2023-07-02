(function () {
  console.log(window.location.href);
  const button = document.querySelector('#run-script-button');
  const textbox = document.getElementById('script-textbox');
  const lineNumbers = document.getElementById('line-numbers');

  button.addEventListener('click', event => {
    let script = textbox.value;
    sendScript(script);
  });

  lineNumbers.innerText = '1.';

  // Add code line number to script textbox
  textbox.addEventListener('input', () => {
    const lines = textbox.value.split('\n');
    lineNumbers.innerText = lines.map((_, i) => i + 1 + '.').join('\n');
  });

  // Scroll line numbers with text area
  textbox.addEventListener('scroll', () => {
    lineNumbers.scrollTop = textbox.scrollTop;
  });

  async function sendScript(script) {
    console.log(script);
    const response = await fetch(window.location.href, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ script: script }),
    });

    response.json().then(data => {
      document.getElementById('results').innerHTML = data.data;
    });
  }
})();
