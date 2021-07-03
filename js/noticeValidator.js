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

  // цена за ночь
  {
    const priceInput = domForm.querySelector('#price');

    const MIN_PRICE = priceInput.getAttribute('min');
    const MAX_PRICE = priceInput.getAttribute('max');

    priceInput.addEventListener('input', () => {
      let customValidityText = '';

      if( priceInput.validity.rangeUnderflow ) {
        customValidityText = `Вы заработать то хотите? Ставьте цену не менее ${MIN_PRICE} рублей.`;
      } else if( priceInput.validity.rangeOverflow ) {
        customValidityText = `Такую цену осилит только Скурдж Макдак. Пожалуйста, сделайте скидочку, чтобы цена была меньше ${MAX_PRICE} рублей.`;
      }

      priceInput.setCustomValidity(customValidityText);
      priceInput.reportValidity();
    });
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
};


export {startNoticeFormValidation};
