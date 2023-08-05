window.onload = function () {
    const step_01_content = document.getElementById('step-01-content');
    const step_02_content = document.getElementById('step-02-content');
    const step_03_content = document.getElementById('step-03-content');

    document.getElementById('step-01-button').onclick = () => {
        show(step_01_content);
        hide(step_02_content);
        hide(step_03_content);
    }

    document.getElementById('step-02-button').onclick = () => {
        hide(step_01_content);
        show(step_02_content);
        hide(step_03_content);
    }

    document.getElementById('step-03-button').onclick = () => {
        hide(step_01_content);
        hide(step_02_content);
        show(step_03_content);
    }

    //files
    document.getElementById('file-upload').onchange = () => {
        show(document.getElementById('file-name'));
        document.getElementById('file-name').innerHTML = document.getElementById('file-upload').files[0].name;
    }

    document.getElementById('submit-button').onclick = () => {
        let first_name = document.getElementById('register-input-first-name').value;
        let last_name = document.getElementById('register-input-last-name').value;
        let email = document.getElementById('register-input-email').value;
        let file = document.getElementById('file-upload').files[0];
        let reason = document.getElementById('register-input-reason').value;
        let checkboxIsChecked = document.getElementById('checkbox-confirmation').checked;

        if (valid_string(first_name) && valid_string(last_name) && valid_email(email)
            && valid_file(file) && valid_string(reason) && checkboxIsChecked) {
                hide(document.getElementById('register-error-msg'));
                submit_user_application(first_name, last_name, email, file, reason);
        } else {
            show(document.getElementById('register-error-msg'));
        }
    }
}

async function submit_user_application(first_name, last_name, email, file, reason) {
    let form_data = new FormData();
        form_data.append('first_name', first_name);
        form_data.append('last_name', last_name);
        form_data.append('email', email);
        form_data.append('image', file);
        form_data.append('message', reason);

    const res = await fetch('/user_requests', {
        method: 'POST',
        body: form_data
    });
    res.json().then(data => {
        alert(data.message);
        if (!data.success) {
            window.location.href = '/';
        }
    });
}

function hide(div) {
    if (!div.classList.contains('hide-content')) {
        div.classList.add('hide-content');
    }
}

function show(div) {
    if (div.classList.contains('hide-content')) {
        div.classList.remove('hide-content');
    }
}

function valid_email(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

function valid_string(str) {
    return str !== null && str !== undefined && str.trim() !== '';
}

function valid_file(file) {
    return file !== undefined
}