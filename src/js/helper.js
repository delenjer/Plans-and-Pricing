
let currentIndex = 0;
export const handleTabs = (tabsAction, tabsBody, activeTabClass, activeTabBodyClass) => {
  tabsAction.forEach((action, i) => {
    tabsAction[currentIndex].classList.add(activeTabClass);
    tabsBody[currentIndex].classList.add(activeTabBodyClass);

    action.addEventListener('click', () => {
      tabsAction[currentIndex].classList.remove(activeTabClass);
      action.classList.add(activeTabClass);

      currentIndex = i;

      tabsBody.forEach((item, j) => {
        if (i === j) {
          item.classList.add(activeTabBodyClass);
        } else {
          item.classList.remove(activeTabBodyClass);
        }
      })
    });
  });
}
