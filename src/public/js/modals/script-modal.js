window.onload = function() {

}


// Adds click event listeners to each element in the given array
function addClickListener(elements, titleCallback) {
    elements.forEach(function(element) {
        element.addEventListener('click', function() {
            document.querySelector('#modal-title').textContent = titleCallback(element);
            document.querySelector('#modal').style.display = 'flex';
        });
    });
}
