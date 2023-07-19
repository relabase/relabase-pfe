document.addEventListener('DOMContentLoaded', () => {
  // Selecting all elements with class 'tab' and 'tab-content > div'
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content > div');

  // Function to deactivate all tabs
  function deactivateTabs() {
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    tabContents.forEach(content => {
      content.classList.remove('active');
    });
  }

  // Control visibility of tab UI
  function manageTabSpecificUI(tabType) {
    const noContentSelectedMessage = document.querySelector(`#${tabType}-no-content-selected`);
    const itemContent = document.querySelector(`#${tabType}-pane .item-content`);

    if (noContentSelectedMessage && itemContent) {
      noContentSelectedMessage.classList.remove('hide-content');
      itemContent.classList.add('hide-content');
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      deactivateTabs();
      tab.classList.add('active');
      tabContents[index].classList.add('active');
      manageTabSpecificUI(tab.dataset.tab);
    });
  });

  // Activate first tab by default
  tabs[0].click();
});
