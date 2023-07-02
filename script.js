const tabsContainer = document.querySelector('.tabs-container');
const tabsList = tabsContainer.querySelector('ul');
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

tabsList.setAttribute('role', 'tablist');

// Remove the semantic of <li> because we only want to add the role=tab to the <a>
tabsList.querySelectorAll('li').forEach((listitem) => {
  listitem.setAttribute('role', 'presentation');
});

tabButtons.forEach((tab, index) => {
  if (index === 0) {
    // we'll add something here
  } else {
    tabPanels[index].setAttribute('hidden', '');
  }
});

tabsContainer.addEventListener('click', (e) => {
  // If user didn't even click close to a <a>, we do nothing.
  const clickedTab = e.target.closest('a');
  if (!clickedTab) return;

  // This is to remove the function when we click the <a>, it will directly jump to the correct tab panel from the href setting.
  // That one is for when javascript is disabled, but if the code can run into here, it means javascript is enabled. So it is OK to remove the function
  e.preventDefault();

  switchTab(clickedTab);
});

function switchTab(newTab) {
  // Get the href value
  const activePanelId = newTab.getAttribute('href');
  // Get the tab panel that has the matching ID.
  const activePanel = tabsContainer.querySelector(activePanelId);

  tabPanels.forEach((panel) => {
    panel.setAttribute('hidden', true);
  });

  activePanel.removeAttribute('hidden');
}
