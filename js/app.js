import {generateTestData} from './dataGenerator.js';
import {init as cardsInit} from './cards.js';
import {
  setInactiveAll as setInactiveAllForms,
  setActiveAll as setActiveAllForms,
  register as registerForm,
  changeInput
} from './form.js';
import {startNoticeFormValidation} from './noticeValidator.js';
import {init as mapInit} from './map.js';


const TOKIYO_LAT = 35.68449;
const TOKIYO_LONG = 139.75124;

let noticeFormId = -1;
let mapFilterFormId = -1;

const setInactive = () => {
  setInactiveAllForms();
};

let notices = {};


const setActive = () => {
  setActiveAllForms();
  changeInput(noticeFormId, '#address', `${TOKIYO_LAT}, ${TOKIYO_LONG}`);
};

const dragEndSetNoticeCallback = (lat, long) => {
  changeInput(noticeFormId, '#address', `${lat.toFixed(5)}, ${long.toFixed(5)}`);
};

const run = () => {

  notices = cardsInit(generateTestData());
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

  mapFilterFormId; // чтобы линтер не ругался

  setInactive();

  const noticePoints = [];
  for( const noticeId in notices  ) {
    const noticeData = notices[noticeId];
    noticePoints.push({
      id: noticeData.id,
      lat: noticeData.lat,
      long: noticeData.long,
      html: noticeData.html,
    });
  }

  mapInit({
    target: 'map-canvas',
    lat: TOKIYO_LAT,
    long:TOKIYO_LONG,
    callback: setActive,

    markers: {
      main: {
        iconUrl: './img/main-pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        draggable: true,
        dragEndCallback: dragEndSetNoticeCallback,
        points: [
          {
            id: 'main',
            lat: TOKIYO_LAT,
            long: TOKIYO_LONG,
          },
        ],
      },

      notice: {
        iconUrl: './img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        points: noticePoints,
      },

    },
  });
};

export {run};
