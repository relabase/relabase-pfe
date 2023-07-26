window.onload = function() {
    dateSearchFunction("home-date-from-search", "home-date-to-search", "home-table", 0);
    enforceDateFormat(document.getElementById('home-date-from-search'));
    enforceDateFormat(document.getElementById('home-date-to-search'));
  
    const scriptTextbox = document.querySelector('.script-textbox');
    const lineNumberElement = document.querySelector('.line-numbers');
    
    scriptTextbox.addEventListener('scroll', () => {
      lineNumberElement.scrollTop = scriptTextbox.scrollTop;
    });
  }
  
  function updateLineNumbers(script, lineNumberElement) {
    const lines = script.split('\n');
    lineNumberElement.innerText = lines.map((_, i) => i + 1 + '.').join('\n');
  }
  
  var tableRows = document.querySelectorAll('#home-table .table-row');
  tableRows.forEach(function(row) {
    row.addEventListener('click', function() {
      var timestamp = row.children[0].textContent.trim();
      var scriptData = row.getAttribute('data-text');
    
      document.querySelector('#modal-title').textContent = 'R Script generated on ' + timestamp;
      var scriptTextbox = document.querySelector('.script-textbox');
      scriptTextbox.textContent = scriptData;
      var lineNumberElement = document.querySelector('.line-numbers');
      updateLineNumbers(scriptData, lineNumberElement);
      document.querySelector('#modal').style.display = 'flex';
    });
  });
  
  document.querySelector('#close-modal').addEventListener('click', function() {
    document.querySelector('#modal').style.display = 'none';
  });
  
  document.getElementById('modal').addEventListener('click', function(event) {
    if (event.target == this) {
        this.style.display = "none";
    }
  });
  
  document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = "none";
  });
  