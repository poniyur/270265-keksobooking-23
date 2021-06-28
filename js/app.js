import {generateTestData} from './dataGenerator.js';
import {init as cardsInit} from './cards.js';
import {
  setInactiveAll as setInactiveAllForms,
  // setActiveAll as setActiveAllForms, функция временно не используется
  register as registerForm
} from './form.js';

let adFormId = -1;
let mapFilterFormId = -1;

const setInactive = () => {
  setInactiveAllForms();
};

// пока не нужно вызывать, заккоменчу
// const setActive = () => {
//  setActiveAllForms
// };

const run = () => {

  adFormId = registerForm({
    formSelector: '.ad-form',
    inactiveClass: 'ad-form--disabled',
    interactiveElementSelectors: ['fieldset'],
  });

  mapFilterFormId = registerForm({
    formSelector: '.map__filters',
    inactiveClass: 'map__filters--disabled',
    interactiveElementSelectors: ['select', 'fieldset'],
  });

  adFormId, mapFilterFormId; // чтобы линтер не ругался

  setInactive();

  // loading map
  cardsInit(generateTestData());

  // after map ready
  // setActive();
};

export {run};
