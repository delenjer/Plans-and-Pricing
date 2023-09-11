'use strict'

import {handleTabs} from './helper';

const tabsAction = document.querySelectorAll('.tabs__btn');
const tabsBody = document.querySelectorAll('.price');

handleTabs(tabsAction, tabsBody, 'active-tab', 'active-price');
