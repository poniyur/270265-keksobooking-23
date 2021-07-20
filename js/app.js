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

let noticesData = null;
let renderTimerId = null;
const RERENDER_COOLDOWN = 500;

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
  if( renderTimerId ) {
    clearTimeout(renderTimerId);
  }
  renderTimerId = setTimeout(
    () => createNoticeMarkers( createCards( filterData(noticesData)))
    , RERENDER_COOLDOWN);
};

const run = () => {

  // notrice form
  registerForm({
    formSelector: '.ad-form',
    inactiveClass: 'ad-form--disabled',
    interactiveElementSelectors: ['fieldset'],
  });

  initNoticeForm();

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
    .then(() => activateFilterForm(rerenderMarkers))
    .catch((err) => {
      reportUserError(err);
    });
};


export {run};
