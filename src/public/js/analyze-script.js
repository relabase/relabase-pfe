(function () {
  const runScriptButton = document.querySelector('#run-script-button');
  const downloadFileButton = document.querySelector('#download-button');
  const textbox = document.querySelector('.script-textbox');
  const lineNumbers = document.querySelector('.line-numbers');
  const iframeResults = document.getElementById('results-iframe');
  const iframeDocumentResults = iframeResults.contentDocument || iframeResults.contentWindow.document;
  filename = '';

  runScriptButton.addEventListener('click', event => {
    let script = textbox.value;
    sendScript(script);
  });

  downloadFileButton.addEventListener('click', event => {
    downloadHtmlFile(filename);
  });

  const requestPackageButton = document.getElementById('request-package-button');

  requestPackageButton.addEventListener('click', () => {
    document.querySelector('#modal').style.display = 'flex';
  });

  //line numbers
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
    iframeDocumentResults.body.innerHTML = 'Loading...';
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
      iframeDocumentResults.head.innerHTML = `
    <style>
      html, body {
        font-size: 18px !important;
        background: linear-gradient(180deg, #fce5f1 0%, rgb(254 221 225 / 80%) 100%), #fce5f1;
      }

      body::-webkit-scrollbar {
        width: 0.625rem;
      }
      
      body::-webkit-scrollbar-track {
        border-radius: 2.5rem;
      }
      
      body::-webkit-scrollbar-thumb {
        background: #f0c2d8;
        border-radius: 2.5rem;
      }
      
      body::-webkit-scrollbar-thumb:hover,
      body::-webkit-scrollbar-thumb:active {
        background-color: #fda4cf;
      }
    </style>
  `;

      iframeDocumentResults.body.innerHTML = data.data;
    });
  }

  async function downloadHtmlFile(filename) {
    try {
      const response = await fetch(`/download/${encodeURIComponent(filename)}`, {
        method: 'GET',
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
