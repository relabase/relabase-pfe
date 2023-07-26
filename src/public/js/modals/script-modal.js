window.onload = function() {
    const scriptTextbox = document.querySelector('.script-textbox');
    const lineNumberElement = document.querySelector('.line-numbers');
  
    scriptTextbox.addEventListener('scroll', () => {
        lineNumberElement.scrollTop = scriptTextbox.scrollTop;
    });
}

// Updates the displayed line numbers based on the script content
function updateLineNumbers(script, lineNumberElement) {
    const lines = script.split('\n');
    lineNumberElement.innerText = lines.map((_, i) => i + 1 + '.').join('\n');
}

// Adds click event listeners to each element in the given array
function addClickListener(elements, titleCallback) {
    elements.forEach(function(element) {
        element.addEventListener('click', function() {
            var scriptData = element.getAttribute('data-text');
            
            var scriptTextbox = document.querySelector('.script-textbox');
            var lineNumberElement = document.querySelector('.line-numbers');

            document.querySelector('#modal-title').textContent = titleCallback(element);
            scriptTextbox.textContent = scriptData;
            updateLineNumbers(scriptData, lineNumberElement);
            
            document.querySelector('#modal').style.display = 'flex';
        });
    });
}
