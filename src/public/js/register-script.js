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
        if (valid_string(first_name)
            && valid_string(last_name)
            && valid_email(email)
            && valid_file(file)
            && valid_string(reason)) {
                hide(document.getElementById('register-error-msg'));
        } else {
            show(document.getElementById('register-error-msg'));
        }
    }
}

function hide(div) {
    if (!div.classList.contains('display-none')) {
        div.classList.add('display-none');
    }
}

function show(div) {
    if (div.classList.contains('display-none')) {
        div.classList.remove('display-none');
    }
}

function valid_email(email) {
    if (/^\S+@\S+\.\S+$/.test(email)) {
        return true;
    }
    return false;
}

function valid_string(str) {
    if (str === null || str === undefined || str.trim() === '') {
        return false;
    }
    return true;
}

function valid_file(file) {
    if (file === undefined) {
        return false;
    }
    return true;
}