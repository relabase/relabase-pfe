window.onload = function () {
    initGoogleButton();
}

function initGoogleButton() {
    google.accounts.id.initialize({
        client_id: "clientid",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("google-sign-in-div"),
        { theme: "outline", size: "large", text: "signup_with" }  // customization attributes
    );
}

async function handleCredentialResponse(response) {
    const res = await fetch('/authprocess', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential }),
    });
    res.json().then(data => {
        window.location.href = '/' + data.redirectUrl
    });
}