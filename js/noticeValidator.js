const startNoticeFormValidation = (domForm) => {

  // заголовок объявления
  {
    const titleInput = domForm.querySelector('#title');
    const MIN_TITLE_LENGTH = titleInput.getAttribute('minlength');
    const MAX_TITLE_LENGTH = titleInput.getAttribute('maxlength');

    titleInput.addEventListener('input', () => {
      const titleLength = titleInput.value.length;
      let customValidityText = '';

      if( titleInput.validity.tooShort ) {
        customValidityText = `Минимальная длина заголовка объявления - ${MIN_TITLE_LENGTH} символов. У вас - ${titleLength}.`;
      } else if(titleInput.validity.tooLong) {
        customValidityText = `Слишком длинный заголовок. Используйте не более ${MAX_TITLE_LENGTH} символов. У вас - ${titleLength}.`;
      }

      titleInput.setCustomValidity(customValidityText);
      titleInput.reportValidity();
    });
  }

  // тип жилья/цена за ночь
  {
    const relationTypePrice = {
      bungalow: 0,
      flat: 1000,
      hotel: 3000,
      house: 5000,
      palace: 10000,
    };

    const typeSelect = domForm.querySelector('#type');
    const priceInput = domForm.querySelector('#price');

    const MAX_PRICE = priceInput.getAttribute('max');

    const validatePrice = () => {
      let customValidityText = '';

      if( priceInput.validity.rangeUnderflow ) {
        customValidityText = `Вы заработать то хотите? Ставьте цену не менее ${priceInput.getAttribute('min')} рублей.`;
      } else if( priceInput.validity.rangeOverflow ) {
        customValidityText = `Такую цену осилит только Скурдж Макдак. Пожалуйста, сделайте скидочку, чтобы цена была меньше ${MAX_PRICE} рублей.`;
      }

      priceInput.setCustomValidity(customValidityText);
      priceInput.reportValidity();
    };

    const typeChanged = () => {
      priceInput.setAttribute('min', relationTypePrice[typeSelect.value]);
      priceInput.setAttribute('placeholder', relationTypePrice[typeSelect.value]);
      if( priceInput.value > 0 ) {
        validatePrice();
      }
    };

    priceInput.addEventListener('input', () => {
      validatePrice();
    });

    typeSelect.addEventListener('input', () => {
      typeChanged();
    });

    typeChanged();
  }

  // количество комнат и количество гостей
  {
    const roomSelect = domForm.querySelector('#room_number');
    const capacitySelect = domForm.querySelector('#capacity');
    const capacityOptions = capacitySelect.querySelectorAll('option');

    let prevRoomValue = roomSelect.value;

    // funcs
    const roomSelectChanged = () => {

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

    // events
    roomSelect.addEventListener('input', () => {
      roomSelectChanged();
    });

    // call funcs
    roomSelectChanged();
  }

  // Время заезда и выезда
  {
    const timeinSelect = domForm.querySelector('#timein');
    const timeoutSelect = domForm.querySelector('#timeout');

    const synhronizeValues = (from, to) => {
      to.value = from.value;
    };

    timeinSelect.addEventListener('input', () => {
      synhronizeValues(timeinSelect, timeoutSelect);
    });

    timeoutSelect.addEventListener('input', () => {
      synhronizeValues(timeoutSelect, timeinSelect);
    });
  }

};


export {startNoticeFormValidation};
