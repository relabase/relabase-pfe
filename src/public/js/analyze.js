(function () {
  const runScriptButton = document.querySelector('#run-script-button');
  const downloadFileButton = document.querySelector('#download-button');
  const textbox = document.getElementById('script-textbox');
  const lineNumbers = document.getElementById('line-numbers');
  filename = "";

  runScriptButton.addEventListener('click', event => {
    let script = textbox.value;
    sendScript(script);
  });

  downloadFileButton.addEventListener('click', event => {
    downloadHtmlFile(filename);
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
    document.getElementById('results').innerHTML = "Loading...";
    const response = await fetch(window.location.href, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ script: script }),
    });

    response.json().then(data => {
      filename = data.filename;
      document.getElementById('results').innerHTML = data.data;
    });
  }

  async function downloadHtmlFile(filename) {
    try {
      const response = await fetch(`/download/${encodeURIComponent(filename)}`, {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error('Error downloading file');
      }
  
      const link = document.createElement('a');
      const objectURL = URL.createObjectURL(await response.blob());
      link.href = objectURL;
      link.download = filename;
      link.style.display = 'none';
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error('Error:', error);
    }
  }
})();
