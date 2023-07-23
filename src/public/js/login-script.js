(function () {
    // const button = document.querySelector('#sign-in-btn');
    // button.addEventListener("click", (event) => {
    //     signIn();
    // });

    window.onload = function () {
        google.accounts.id.initialize({
            client_id: "clientid",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("google-sign-in-div"),
            { theme: "outline", size: "large", text: "signup_with" }  // customization attributes
        );
        //google.accounts.id.prompt(); // also display the One Tap dialog
    }

    async function handleCredentialResponse(response) {
        console.log(response.credential);
        const ressponse = await fetch('/auth/verifyToken', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential: response.credential }),
          });
    }
    
    async function signIn() {
        console.log('ss');
    }

    function signUp() {
        console.log('su');
    }
})();