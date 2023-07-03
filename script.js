const tabsContainer = document.querySelector('.tabs-container');
const tabsList = tabsContainer.querySelector('ul');
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

// Note:
// 1. According to Kevin, the aria-control is not very useful now, a lot of screen reading remove announcement on it
//    That is why it was not added into here.
// 2. In order to see all the setting correctly, you really should open devtool to see all the attributes|roles that are added into different elements

tabsList.setAttribute('role', 'tablist');

// Remove the semantic of <li> because we only want to add the role=tab to the <a>
tabsList.querySelectorAll('li').forEach((listitem) => {
  listitem.setAttribute('role', 'presentation');
});

tabButtons.forEach((tab, index) => {
  tab.setAttribute('role', 'tab');
  if (index === 0) {
    tab.setAttribute('aria-selected', 'true');
    // we'll add something here
  } else {
    tab.setAttribute('tabindex', '-1');
    tabPanels[index].setAttribute('hidden', '');
  }
});

// Setting all the tab panel tab-able so when  user is click enter to a tab button, their
// next tab will be on the corresponding tab panel. Other tab panels because they have attribute hidden, by default it is not accessible
tabPanels.forEach((panel) => {
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');
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

tabsContainer.addEventListener('keydown', (e) => {
  moveLeft();
});

function moveLeft() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.previousElementSibling) {
    switchTab(tabButtons[tabButtons.length - 1]);
  } else {
    switchTab(
      currentTab.parentElement.previousElementSibling.querySelector('a')
    );
  }
}

function moveRight() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.nextElementSibling) {
    switchTab(tabButtons[0]);
  } else {
    switchTab(currentTab.parentElement.nextElementSibling.querySelector('a'));
  }
}

function switchTab(newTab) {
  // Get the href value
  const activePanelId = newTab.getAttribute('href');
  // Get the tab panel that has the matching ID.
  const activePanel = tabsContainer.querySelector(activePanelId);

  // Make all tab button no selected and not tab-able first.
  tabButtons.forEach((button) => {
    button.setAttribute('aria-selected', false);
    button.setAttribute('tabindex', '-1');
  });

  tabPanels.forEach((panel) => {
    panel.setAttribute('hidden', true);
  });

  activePanel.removeAttribute('hidden');

  // The following is switch selected tab styling.
  newTab.setAttribute('aria-selected', true);
  newTab.setAttribute('tabindex', '0');
  // This is more for keyboard event, because you don't want to left arrow key but the focus still stay the the old selected tab button
  newTab.focus();
}
