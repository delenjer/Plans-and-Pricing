'use strict'

const tabsAction = document.querySelectorAll('.tabs__btn');
const tabsBody = document.querySelectorAll('.price');

tabsAction.forEach((action) => {
  action.addEventListener('click', () => {
    if (!action.classList.contains('active-tab')) {
      const currentlyActiveButton = document.querySelector('.tabs__btn.active-tab');
      const currentlyActiveTabsBody = document.querySelector('.price.active-price');

      currentlyActiveButton?.classList.remove('active-tab');
      currentlyActiveTabsBody?.classList.remove('active-price');

      action.classList.add('active-tab');

      const tabBodyData = [...tabsBody].find(item => item.dataset.tabBody === action.dataset.period);
      tabBodyData?.classList.add('active-price');
    }
  });
});






