document.addEventListener('DOMContentLoaded', (event) => {
    var dropdownMenu = document.querySelector('.navbar-item-group-right');

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