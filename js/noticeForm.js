import { reportUserError } from './alert.js';
import { reportSuccess, reportError } from './noticeFormReport.js';
import { resetMainMarker } from './map.js';
import { registerPreviewInput, registerPreviewInputMultiple } from './previewImg.js';
import { resetFilterForm } from './filterForm.js';

const form = document.querySelector('.ad-form');

const URL = form.getAttribute('action');

const titleInput = form.querySelector('#title');
const MIN_TITLE_LENGTH = titleInput.getAttribute('minlength');
const MAX_TITLE_LENGTH = titleInput.getAttribute('maxlength');

const relationTypePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const MAX_PRICE = priceInput.getAttribute('max');

const roomSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');

const timeinSelect = form.querySelector('#timein');
const timeoutSelect = form.querySelector('#timeout');

const addressInput = form.querySelector('#address');

const TOKIYO_LAT = 35.68449;
const TOKIYO_LONG = 139.75124;

let onResetCallback = undefined;

const validateTitle = () => {

  let validity = true;
  const titleLength = titleInput.value.length;
  let customValidityText = '';

  if( titleInput.validity.tooShort ) {
    customValidityText = `Минимальная длина заголовка объявления - ${MIN_TITLE_LENGTH} символов. У вас - ${titleLength}.`;
  } else if(titleInput.validity.tooLong) {
    customValidityText = `Слишком длинный заголовок. Используйте не более ${MAX_TITLE_LENGTH} символов. У вас - ${titleLength}.`;
  } else if( titleInput.validity.valueMissing ) {
    customValidityText = 'Давайте придумаем название для объявления.';
  }

  if( customValidityText !== '' ) {
    validity = false;
  }

  titleInput.setCustomValidity(customValidityText);
  titleInput.reportValidity();

  return validity;
};

const validatePrice = () => {

  let validity = true;
  let customValidityText = '';

  if( priceInput.validity.rangeUnderflow ) {
    customValidityText = `Вы заработать то хотите? Ставьте цену не менее ${priceInput.getAttribute('min')} рублей.`;
  } else if( priceInput.validity.rangeOverflow ) {
    customValidityText = `Такую цену осилит только Скурдж Макдак. Пожалуйста, сделайте скидочку, чтобы цена была меньше ${MAX_PRICE} рублей.`;
  }

  if( customValidityText !== '' ) {
    validity = false;
  }

  priceInput.setCustomValidity(customValidityText);
  priceInput.reportValidity();

  return validity;
};

const typeChanged = () => {
  priceInput.setAttribute('min', relationTypePrice[typeSelect.value]);
  priceInput.setAttribute('placeholder', relationTypePrice[typeSelect.value]);
  if( priceInput.value > 0 ) {
    validatePrice();
  }
};

const roomSelectChanged = () => {

  let prevRoomValue = roomSelect.value;

  capacityOptions.forEach((el) => {
    if( +roomSelect.value === 100) {
      if( +el.value !== 0 )  {
        el.setAttribute('disabled', 'disabled');
      }
      capacitySelect.value = 0;
      return;
    }

    if( el.value > roomSelect.value ) {
      el.setAttribute('disabled', 'disabled');
    } else {
      el.removeAttribute('disabled');
    }

    if( prevRoomValue <= roomSelect.value &&  capacitySelect.value > roomSelect.value )  {
      capacitySelect.value = roomSelect.value;
    }

    prevRoomValue = roomSelect.value;
  });
};

const synhronizeValues = (from, to) => {
  to.value = from.value;
};

const startNoticeFormValidation = () => {

  titleInput.addEventListener('input', validateTitle );
  priceInput.addEventListener('input', validatePrice);
  typeSelect.addEventListener('input', typeChanged);
  roomSelect.addEventListener('input', roomSelectChanged);

  timeinSelect.addEventListener('input', () => {
    synhronizeValues(timeinSelect, timeoutSelect);
  });

  timeoutSelect.addEventListener('input', () => {
    synhronizeValues(timeoutSelect, timeinSelect);
  });

  typeChanged();
  roomSelectChanged();
};

const validate = () => validateTitle() && validatePrice();

const changeAddress = (lat, lng) => {
  addressInput.value = `${lat}, ${lng}`;
};

const resetAddress = () => {
  changeAddress(TOKIYO_LAT, TOKIYO_LONG);
};

const resetFormAndMap = () => {
  resetAddress();
  resetMainMarker();
};

const submitForm = () => {

  fetch(URL, {
    method: 'POST',
    body: new FormData(form),
  })
    .then((response) => {
      if( response.ok ) {
        reportSuccess();
        form.reset();
      } else {
        reportError();
      }
    })
    .catch(() => {
      reportUserError('Непредвиденная ошибка. Пожалуйста, попробуйте позже.');
    });
};

const onSubmit = (ev) => {
  ev.preventDefault();

  if( !validate() ) {
    reportUserError('Заполните форму.');
    return;
  }
  submitForm();
};

const onReset = () => {
  setTimeout(() => {
    resetFilterForm();
    resetFormAndMap();
    onResetCallback();
  });
};

const init = (_onResetCallback) => {
  onResetCallback = _onResetCallback;

  form.addEventListener('submit', onSubmit, false);
  form.addEventListener('reset', onReset, false);
  resetAddress();
  startNoticeFormValidation();

  registerPreviewInput(form.querySelector('#avatar'), form.querySelector('.ad-form-header__preview img'));
  registerPreviewInputMultiple(
    form.querySelector('#images'),
    form.querySelector('.ad-form__photo-container'),
    '.ad-form__photo:empty',
  );
};

export {init, submitForm, changeAddress};


