window.onload = function () {
    document.getElementById('save-button').onclick = () => {
        let link = document.getElementById('package-request-input-url').value;
        let reason = document.getElementById('package-request-input-reason').value;
        if (validateCRANlink(link)) {
            let name = link.includes('=') ? link.split('=')[1] : null;
            submitPackageRequest(name, reason, link);
        } else {
            alert('An error occurred.');
        }
    }
}

async function submitPackageRequest(name, reason, link) {
    const res = await fetch('/package_requests', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name_package: name,
            message: reason,
            link: link
        })
    });
    res.json().then(data => {
        alert(data.message);
        if (data.success) {
            //empty fields for next request
            document.getElementById('package-request-input-url').value = '';
            document.getElementById('package-request-input-reason').value = '';
        }
    });
}

function validateCRANlink(url) {
    let div = document.getElementById('package-request-error-msg');
    if (url.startsWith('https://cran.r-project.org/package=')) {
        if (!div.classList.contains('hide-content')) {
            div.classList.add('hide-content');
        }
        return true;
    } else {
        if (div.classList.contains('hide-content')) {
            div.classList.remove('hide-content');
        }
        return false;
    }
}

