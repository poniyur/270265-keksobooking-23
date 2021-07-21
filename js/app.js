import {
  setInactiveAll as setInactiveAllForms,
  setActiveAll as setActiveAllForms,
  register as registerForm
} from './form.js';
import {createMap, createNoticeMarkers} from './map.js';
import {fetchNotices} from './data.js';
import {createCards} from './cards.js';
import {reportUserError} from './alert.js';
import {init as initNoticeForm, changeAddress} from './noticeForm.js';
import {filterData, activateFilterForm} from './filterForm.js';
import {debounce} from './utils/debounce.js';

let noticesData = null;

const setActive = () => {
  setActiveAllForms();
};

const setInactive = () => {
  setInactiveAllForms();
};

const dragEndSetNoticeCallback = (lat, long) => {
  changeAddress(lat.toFixed(5), long.toFixed(5));
};

const rerenderMarkers = () => {
  createNoticeMarkers( createCards( filterData(noticesData) ) );
};

const debouncedRerenderMarkers = debounce(rerenderMarkers, 500);

const setNoticeFormResetCallback = rerenderMarkers;

const run = () => {

  // notrice form
  registerForm({
    formSelector: '.ad-form',
    inactiveClass: 'ad-form--disabled',
    interactiveElementSelectors: ['fieldset'],
  });

  initNoticeForm(setNoticeFormResetCallback);

  // map filter
  registerForm({
    formSelector: '.map__filters',
    inactiveClass: 'map__filters--disabled',
    interactiveElementSelectors: ['select', 'fieldset'],
  });

  setInactive();

  createMap(dragEndSetNoticeCallback);

  setActive();

  fetchNotices()
    .then((data) => {
      noticesData = data;
      return filterData(data);
    })
    .then((data) => createCards(data))
    .then((cards) => createNoticeMarkers(cards))
    .then(() => activateFilterForm(debouncedRerenderMarkers))
    .catch((err) => {
      reportUserError(err);
    });
};


export {run};
