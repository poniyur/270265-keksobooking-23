import {createMap, createNoticeMarkers} from './map.js';
import {fetchNotices} from './data.js';
import {createCards} from './cards.js';
import {reportUserError} from './alert.js';
import {init as initNoticeForm, changeAddress, lock as lockNoticeForm, unlock as unlockNoticeForm} from './notice-form.js';
import {filterData, activateFilterForm, lock as lockFilterForm, unlock as unlockFilterForm} from './filter-form.js';
import {debounce} from './utils/debounce.js';

let noticesData = null;

const dragEndSetNoticeCallback = (lat, long) => {
  changeAddress(lat.toFixed(5), long.toFixed(5));
};

const rerenderMarkers = () => {
  createNoticeMarkers( createCards( filterData(noticesData) ) );
};

const debouncedRerenderMarkers = debounce(rerenderMarkers, 500);

const setNoticeFormResetCallback = rerenderMarkers;

const run = () => {

  initNoticeForm(setNoticeFormResetCallback);

  lockFilterForm();
  lockNoticeForm();

  createMap(dragEndSetNoticeCallback);

  unlockNoticeForm();

  fetchNotices()
    .then((data) => {
      noticesData = data;
      return filterData(data);
    })
    .then((data) => createCards(data))
    .then((cards) => createNoticeMarkers(cards))
    .then(() => activateFilterForm(debouncedRerenderMarkers))
    .then(() => unlockFilterForm())
    .catch((err) => {
      reportUserError(err);
    });
};


export {run};
