window.onload = function () {
    document.getElementById('save-prohibited-commands').onclick = () => {
        updateBlacklist(document.getElementById('prohibited-script-commands').value);
    }
}

async function updateBlacklist(blacklist) {
    const res = await fetch('/admin/blacklist', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blacklist: blacklist }),
      });
      res.json().then(data => {
        if (data.success) {
          
          alert(data.message);
        } else {
          console.log('not success');
        }
      });
}