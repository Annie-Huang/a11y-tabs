const tabsContainer = document.querySelector('.tabs-container');
const tabsList = tabsContainer.querySelector('ul');
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

tabButtons.forEach((tab, index) => {
  if (index === 0) {
    // we'll add something here
  } else {
    tabPanels[index].setAttribute('hidden', '');
  }
});

tabsContainer.addEventListener('click', (e) => {
  // This is to remove the function when we click the <a>, it will directly jump to the correct tab panel from the href setting.
  // That one is for when javascript is disabled, but if the code can run into here, it means javascript is enabled. So it is OK to remove the function
  e.preventDefault();
});
