import { hideContent, remove, checkEmptyList } from './admin-utilities.js';

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

  // Generate dummy package data for testing
  function generateDummyPackages(count) {
    const packages = [];
    for (let i = 1; i <= count; i++) {
      const pack = {
        id: 'package-' + i,
        name: 'Package ' + i,
        email: 'email' + i + '@example.com',
        packageLink: 'https://example.com/package' + i,
        userOverlay: 'User ' + i,
        applicationMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      };
      packages.push(pack);
    }
    return packages;
  }

  // TODO: best way to do this?
  // Create HTML string for a single package request
  function createPackageHtml(pack) {
    return `
      <div class="package-request" id="${pack.id}" data-name="${pack.name}" data-email="${pack.email}" data-package-link="${pack.packageLink}" data-user-overlay="${pack.userOverlay}" data-application-message="${pack.applicationMessage}">
        <div class="package-info">
          <div class="small-header">${pack.name}</div>
          <div class="smaller-header">${pack.email}</div>
        </div>
        <div class="arrow"></div>
      </div>
    `;
  }

  // Add packages to the package requests list
  function addPackages(packages) {
    const packageHtml = packages.map(createPackageHtml).join('');
    UI.packageRequests.innerHTML += packageHtml;
    checkEmptyList(UI.packageRequests, UI.noPackageSelectedMessage, 'No package to select', 'No package selected');
  }

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
    remove(
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
    addPackages(generateDummyPackages(2));
  });
})();
