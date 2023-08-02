function addClickListener(elements, titleCallback, emailCallback) {
    elements.forEach(function(element) {
        element.addEventListener('click', function() {
            document.querySelector('#modal-title .large-header').textContent = titleCallback(element);
            var emailLink = document.querySelector('#modal-title .email-link');
            emailLink.textContent = emailCallback(element);
            emailLink.href = "mailto:" + emailCallback(element);
            document.querySelector('#modal').style.display = 'flex';
        });
    });
}
