import { hideContent, removeElement, updateEmptyListMessage } from './admin-utilities.js';

(function () {
  const UI = {
    // References to the elements in user-application.ejs
    userApplications: document.querySelector('#pane1 .item-list.user-list'),
    userContent: document.querySelector('#user-content'),
    noUserSelectedMessage: document.querySelector('#user-no-content-selected'),
    contentTitle: document.querySelector('#user-content .large-header'),
    emailLink: document.querySelector('#user-content .email-link'),
    applicationMessage: document.querySelector('#user-application-message'),
    approveButton: document.querySelector('#user-content .approve-button'),
    declineButton: document.querySelector('#user-content .decline-button'),
    idImage: document.querySelector('#user-id-image'),
  };

  // Approve user application
  function approveUser(userId) {
    //TODO: approve user logic
    console.log("approved " + userId);
    removeUser(userId);
  }

  // Decline user application
  function declineUser(userId) {
    //TODO: decline user logic
    console.log("decline " + userId);
    removeUser(userId);
  }

  // Remove user application from list
  function removeUser(userId) {
    removeElement(
      userId,
      UI.userApplications,
      clearUserContent,
      UI.noUserSelectedMessage,
      'No user to select',
      'No user selected'
    );
  }

  // Clear out user content 
  function clearUserContent() {
    hideContent(UI.userContent, UI.noUserSelectedMessage);
    UI.emailLink.href = '';
    UI.emailLink.textContent = '';
    UI.applicationMessage.textContent = '';
    UI.idImage.src = '';
  }

  // Show the content of the application
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

  // Event listener for clicking on user applications
  UI.userApplications.addEventListener('click', function (e) {
    let target = e.target;
    while (target != this) {
      if (target.classList.contains('user-application')) {
        let activeElement = this.querySelector('.active');
        if (activeElement) {
          activeElement.classList.remove('active');
        }

        target.classList.add('active');

        showUserContent(target.id, target.dataset.name, target.dataset.email, target.dataset.applicationMessage);
        return;
      }
      target = target.parentNode;
    }
  });

  // Initial setup
  document.addEventListener('DOMContentLoaded', () => {
    UI.userContent.classList.add('hide-content');
    updateEmptyListMessage(UI.userApplications, UI.noUserSelectedMessage, 'No user to select', 'No user selected');
  });

  // Event listener for unblurring user ID image
  document.querySelector('.unblur-button').addEventListener('click', function () {
    this.classList.add('hidden');
    UI.idImage.style.filter = 'none';
  });
})();
