import {generateTestData} from './dataGenerator.js';
import {init as cardsInit} from './cards.js';
import {
  setInactiveAll as setInactiveAllForms,
  setActiveAll as setActiveAllForms,
  register as registerForm
} from './form.js';
import {startNoticeFormValidation} from './noticeValidator.js';

let noticeFormId = -1;
let mapFilterFormId = -1;

const setInactive = () => {
  setInactiveAllForms();
};


const setActive = () => {
  setActiveAllForms();
};

const run = () => {

  noticeFormId = registerForm({
    formSelector: '.ad-form',
    inactiveClass: 'ad-form--disabled',
    interactiveElementSelectors: ['fieldset'],
    formCallback: startNoticeFormValidation,
  });

  mapFilterFormId = registerForm({
    formSelector: '.map__filters',
    inactiveClass: 'map__filters--disabled',
    interactiveElementSelectors: ['select', 'fieldset'],
  });

  noticeFormId, mapFilterFormId; // чтобы линтер не ругался

  setInactive();

  // loading map
  cardsInit(generateTestData());

  // after map ready
  setActive();
};

export {run};
