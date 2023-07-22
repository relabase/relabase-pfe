import { hideContent, removeElement, updateEmptyListMessage } from './admin-utilities.js';

(function () {
  const UI = {
    // References to the elements in package-request.ejs
    packageRequests: document.querySelector('#pane2 .item-list.package-list'),
    packageContent: document.querySelector('#package-content'),
    noPackageSelectedMessage: document.querySelector('#package-no-content-selected'),
    contentTitle: document.querySelector('#package-content .large-header'),
    packageLink: document.querySelector('#package-link'),
    userOverlay: document.querySelector('#package-user-overlay'),
    emailLink: document.querySelector('#package-content .email-link'),
    applicationMessage: document.querySelector('#package-application-message'),
    approveButton: document.querySelector('#package-content .approve-button'),
    declineButton: document.querySelector('#package-content .decline-button'),
  };

  // Approve a package request
  function approvePackage(packageId) {
    // TODO: approve package logic
    console.log('approved ' + packageId);
    removePackage(packageId);
  }

  // Decline a package request
  function declinePackage(packageId) {
    // TODO: decline package logic
    console.log('declined ' + packageId);
    removePackage(packageId);
  }

  // Remove a package request from the list
  function removePackage(packageId) {
    removeElement(
      packageId,
      UI.packageRequests,
      clearPackageContent,
      UI.noPackageSelectedMessage,
      'No package to select',
      'No package selected'
    );
  }

  // Clear out package content
  function clearPackageContent() {
    hideContent(UI.packageContent, UI.noPackageSelectedMessage);
    UI.userOverlay.textContent = '';
    UI.emailLink.href = '';
    UI.emailLink.textContent = '';
    UI.applicationMessage.textContent = '';
  }

  // Show the content of the package request
  function showPackageContent(packageId, packageName, packageEmail, packageLink, userOverlay, packageApplicationMessage) {
    UI.packageContent.classList.remove('hide-content');
    UI.noPackageSelectedMessage.classList.add('hide-content');

    UI.contentTitle.textContent = packageName;
    UI.packageLink.href = packageLink;
    UI.packageLink.textContent = packageLink;
    UI.userOverlay.textContent = userOverlay;
    UI.emailLink.href = `mailto:${packageEmail}`;
    UI.emailLink.textContent = packageEmail;
    UI.applicationMessage.textContent = packageApplicationMessage;

    UI.approveButton.onclick = () => approvePackage(packageId);
    UI.declineButton.onclick = () => declinePackage(packageId);
  }

  // Event listener for clicking on package requests
  UI.packageRequests.addEventListener('click', function (e) {
    let target = e.target;
    while (target != this) {
      if (target.classList.contains('package-request')) {
        showPackageContent(
          target.id,
          target.dataset.name,
          target.dataset.email,
          target.dataset.packageLink,
          target.dataset.userOverlay,
          target.dataset.applicationMessage,
        );
        UI.approveButton.onclick = () => approvePackage(target.id);
        UI.declineButton.onclick = () => declinePackage(target.id);
        return;
      }
      target = target.parentNode;
    }
  });

  // Initial setup
  document.addEventListener('DOMContentLoaded', () => {
    UI.packageContent.classList.add('hide-content');
    updateEmptyListMessage(UI.packageRequests, UI.noPackageSelectedMessage, 'No package to select', 'No package selected');
  });
})();
