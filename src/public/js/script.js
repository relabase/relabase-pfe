(function() {
    console.log(window.location.href);
    const button = document.querySelector('#run-script-button');
    button.addEventListener("click", (event) => {
        let script = document.getElementById('script-textbox');
        alert(script.value);
    });

    async function sendScript() {
        const response = await fetch("https://reqbin.com/echo/post/json", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: `{
            "Id": 78912,
            "Customer": "Jason Sweet",
            "Quantity": 1,
            "Price": 18.00
            }`,
            });
        
            response.json().then(data => {
            console.log(JSON.stringify(data));
            });
    }
 })();