
let currentIndex = 0;
export const handleTabs = (tabButtons, tabsBody, activeTab = '', activeTabBody = '') => {
  try {
    tabButtons[currentIndex].classList.add(activeTab);
    tabsBody[currentIndex].classList.add(activeTabBody);

    handleTabsAction (tabButtons, activeTab, tabsBody, activeTabBody);
  } catch (error) {
    console.log(error);
  }
}

function handleTabsAction (tabButtons, activeTabsClass, tabsBodyList, activeTabBodyClass) {
  tabButtons.forEach((action, index) => {
    action.addEventListener('click', () => {
      tabButtons[currentIndex].classList.remove(activeTabsClass);
      action.classList.add(activeTabsClass);

      currentIndex = index;

      handleTabsBody(tabsBodyList, index, activeTabBodyClass);
    });
  });
}

function handleTabsBody (tabsBodyList, indexActiveButton, activeClass) {
  tabsBodyList.forEach((item, index) => {
    indexActiveButton === index ?
      item.classList.add(activeClass) :
      item.classList.remove(activeClass);
  });
}
