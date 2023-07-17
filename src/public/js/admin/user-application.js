(function () {
  const UI = {
    userApplications: document.querySelector('#pane1 .user-list'),
    userContent: document.querySelector('.user-content'),
    noUserSelectedMessage: document.querySelector('#no-content-selected'),
    contentTitle: document.querySelector('#pane1 .large-header'),
    emailLink: document.querySelector('#email-link'),
    applicationMessage: document.querySelector('#application-message'),
    approveButton: document.querySelector('#approve-button'),
    declineButton: document.querySelector('#decline-button'),
    idImage: document.querySelector('#user-id-image'),
  };

  document.addEventListener('DOMContentLoaded', () => {
    UI.userContent.classList.add('hide-content');
    addUsers(generateDummyUsers(2));
  });

  function generateDummyUsers(count) {
    const users = [];
    for (let i = 1; i <= count; i++) {
      const user = {
        id: 'user-' + i,
        name: 'Test ' + i,
        email: 'email' + i + '@example.com',
        applicationMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      };
      users.push(user);
    }
    return users;
  }

  function createUserHtml(user) {
    return `
      <div class="user-application" id="${user.id}" data-name="${user.name}" data-email="${user.email}" data-application-message="${user.applicationMessage}">
        <div class="user-info">
          <div class="small-header">${user.name}</div>
          <div class="smaller-header">${user.email}</div>
        </div>
        <div class="arrow"></div>
      </div>
    `;
  }

  function addUsers(users) {
    const userHtml = users.map(createUserHtml).join('');
    UI.userApplications.innerHTML += userHtml;
  }

  UI.userApplications.addEventListener('click', function (e) {
    let target = e.target;
    while (target != this) {
      if (target.classList.contains('user-application')) {
        showUserContent(target.id, target.dataset.name, target.dataset.email, target.dataset.applicationMessage);
        return;
      }
      target = target.parentNode;
    }
  });

  function showUserContent(userId, userName, userEmail, userApplicationMessage) {
    UI.userContent.classList.remove('hide-content');
    UI.noUserSelectedMessage.classList.add('hide-content');

    UI.contentTitle.textContent = userName;
    UI.emailLink.href = `mailto:${userEmail}`;
    UI.emailLink.textContent = userEmail;
    UI.applicationMessage.textContent = userApplicationMessage;
    UI.idImage.src = '../img/test-id.jpg';
    UI.idImage.style.filter = 'blur(10px)';

    UI.approveButton.onclick = () => approveUser(userId);
    UI.declineButton.onclick = () => declineUser(userId);
    document.querySelector('.unblur-button').classList.remove('hidden');
  }

  function hideUserContent() {
    UI.userContent.classList.add('hide-content');
    UI.noUserSelectedMessage.classList.remove('hide-content');
  }

  function approveUser(userId) {
    console.log('approved ' + userId);
    removeUser(userId);
  }

  function declineUser(userId) {
    console.log('declined ' + userId);
    removeUser(userId);
  }

  function removeUser(userId) {
    let userElement = document.getElementById(userId);
    let nextUser = userElement.nextElementSibling || userElement.previousElementSibling;
    userElement.remove();

    if (nextUser) {
      nextUser.click();
    } else {
      hideUserContent();
    }
  }

  document.querySelector('.unblur-button').addEventListener('click', function () {
    this.classList.add('hidden');
    UI.idImage.style.filter = 'none';
  });
})();
