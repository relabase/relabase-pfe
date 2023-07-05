(function () {
  const UI = {
    tabs: Array.from(document.getElementsByClassName('tab')),
    panes: Array.from(document.getElementsByClassName('tab-pane')),
    userApplications: document.querySelector('#pane1 .user-list'),
    userContent: document.querySelector('.user-content'),
    noUserSelectedMessage: document.querySelector('#no-content-selected'),
    contentTitle: document.querySelector('#pane1 .large-header'),
    emailLink: document.querySelector('#email-link'),
    applicationMessage: document.querySelector('#application-message'),
    approveButton: document.querySelector('#approve-button'),
    declineButton: document.querySelector('#decline-button'),
  };

  document.addEventListener('DOMContentLoaded', () => {
    handleTabs(UI.tabs, UI.panes);
    UI.userContent.classList.add('hide-content'); 
    generateDummyUsers(2);
  });

  function handleTabs(tabs, panes) {
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));
            panes.forEach(pane => pane.classList.remove('active'));
            tab.classList.add('active');
            panes[index].classList.add('active');
        });
    });

    // Set first tab as being active at the start
    tabs[0].classList.add('active');
    panes[0].classList.add('active');
  }

  function generateDummyUsers(count) {
    for (let i = 1; i <= count; i++) {
        const user = createDummyUser(i);
        UI.userApplications.appendChild(user);
    }
  }

  function createDummyUser(id) {
    const user = document.createElement('div');
    user.className = 'user-application';
    user.id = 'user-' + id;

    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';

    const userName = document.createElement('div');
    userName.className = 'small-header';
    userName.textContent = 'Test ' + id;
    userInfo.appendChild(userName);

    const userEmail = document.createElement('div');
    userEmail.className = 'smaller-header';
    userEmail.textContent = 'Email ' + id;
    userInfo.appendChild(userEmail);

    const arrow = document.createElement('div');
    arrow.className = 'arrow';

    user.appendChild(userInfo);
    user.appendChild(arrow);

    user.dataset.name = 'Test ' + id;
    user.dataset.email = 'Email ' + id;
    user.dataset.applicationMessage = 'Application message ' + id;

    user.addEventListener('click', () => {
        const allUsers = document.querySelectorAll('.user-application');
        allUsers.forEach(user => user.classList.remove('active'));
        user.classList.add('active');
        showUserContent(user.id, user.dataset.name, user.dataset.email, user.dataset.applicationMessage);
    });

    return user;
  }

  function showUserContent(userId, userName, userEmail, userApplicationMessage) {
    UI.userContent.classList.remove('hide-content');
    UI.noUserSelectedMessage.classList.add('hide-content');

    UI.contentTitle.textContent = userName;
    UI.emailLink.href = `mailto:${userEmail}`;
    UI.emailLink.textContent = userEmail;
    UI.applicationMessage.textContent = userApplicationMessage;

    UI.approveButton.onclick = () => approveUser(userId);
    UI.declineButton.onclick = () => declineUser(userId);
  }

  function hideUserContent() {
    UI.userContent.classList.add('hide-content');
    UI.noUserSelectedMessage.classList.remove('hide-content');
  }

  function approveUser(userId){
    console.log("approved " + userId);
    document.getElementById(userId).remove();

    if(document.querySelectorAll('.user-application').length === 0) {
      hideUserContent();
    }
  }
  function declineUser(userId){
    console.log("declined " + userId);
    document.getElementById(userId).remove();

    if(document.querySelectorAll('.user-application').length === 0) {
      hideUserContent();
    }
  }
})();