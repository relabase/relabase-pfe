window.onload = function () {
    initGoogleButton();
}

async function initGoogleButton() {
    const res = await fetch('/authenticate/client-id', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    res.json().then(data => {
        google.accounts.id.initialize({
            client_id: data.id,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("google-sign-in-div"),
            { theme: "outline", size: "large", text: "continue_with" } // customization attributes
        );
    });
}

async function handleCredentialResponse(response) {
    const res = await fetch('/authenticate', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential }),
    });
    res.json().then(data => {
        if (data.success) {
            window.location.href = '/' + data.redirectUrl;
        } else {
            alert(data.message);
        }
    });
}