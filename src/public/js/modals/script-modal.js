window.onload = function () {
    
}


// Adds click event listeners to each element in the given array
function addClickListener(elements, titleCallback) {
    elements.forEach(function (element) {
        element.addEventListener('click', function () {
            document.querySelector('#modal-title').textContent = titleCallback(element);
            document.querySelector('#modal').style.display = 'flex';
            displayScript(element.querySelector('td').id);
        });
    });
}

async function displayScript(logId) {
    const iframeResults = document.getElementById('results-iframe');
    const iframeDocumentResults = iframeResults.contentDocument || iframeResults.contentWindow.document;
    const response = await fetch('/logs/' + logId, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    response.json().then(data => {
      if (data.success) {
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
      } else {
        alert(data.message);
      }
    });
}
