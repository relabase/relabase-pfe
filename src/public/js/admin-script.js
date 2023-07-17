document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content > div');
  
    function deactivateTabs() {
      tabs.forEach(tab => {
        tab.classList.remove('active');
      });
  
      tabContents.forEach(content => {
        content.style.display = 'none';
      });
    }
  
    // Add click event listeners to the tabs
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        deactivateTabs();
  
        tab.classList.add('active');
        tabContents[index].style.display = 'block';
      });
    });
  
    // Activate the first tab by default
    tabs[0].click();
  });