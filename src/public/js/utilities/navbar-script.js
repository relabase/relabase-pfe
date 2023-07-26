document.addEventListener('DOMContentLoaded', (event) => {
    var dropdownMenu = document.querySelector('.navbar-item-group-right');

    dropdownMenu.addEventListener('click', function () {
        var dropdownContent = document.getElementById('dropdown-content');
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    });

    document.getElementById('log-out-button').onclick = () => {
        logout();
    }
});

async function logout() {
    const res = await fetch('/logout', {
        method: 'GET'
    });
    res.json().then(data => {
        window.location.href = '/' + data.redirectUrl
    });
}