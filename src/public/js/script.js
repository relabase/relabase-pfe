(function() {
    console.log(window.location.href);
    const button = document.querySelector('#run-script-button');
    button.addEventListener("click", (event) => {
        let script = document.getElementById('script-textbox');
        sendScript(script.value);
    });

    async function sendScript(script) {
        console.log(script);
        const response = await fetch(window.location.href, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({script: script})
            });

            response.json().then(data => {
                document.getElementById("results").innerHTML = data.data;
            });
    }
 })();