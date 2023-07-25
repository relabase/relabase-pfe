document.addEventListener('DOMContentLoaded', (event) => {
    var dropdownMenu = document.querySelector('.navbar-item-group-right');

    dropdownMenu.addEventListener('click', function() {
        var dropdownContent = document.getElementById('dropdown-content');
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    });
});
