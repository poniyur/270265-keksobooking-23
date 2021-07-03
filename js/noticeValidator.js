const startNoticeFormValidation = (domForm) => {

  // заголовок объявления
  {
    const titleInput = domForm.querySelector('#title');
    // const MIN_TITLE_LENGTH = titleInput.getAttribute('minlength');
    // const MAX_TITLE_LENGTH = titleInput.getAttribute('maxlength');

    titleInput.addEventListener('input', () => {
      // const valueLength = titleInput.value.length;

      // if( valueLength < MIN_TITLE_LENGTH ) {
      //   titleInput.setCustomValidity(`${valueLength}/${MIN_TITLE_LENGTH}`);
      // } else if( valueLength > MAX_TITLE_LENGTH ) {
      //   titleInput.setCustomValidity(`${MAX_TITLE_LENGTH}/${valueLength}`);
      // } else {
      //   titleInput.setCustomValidity('');
      // }
      titleInput.reportValidity();
    });
  }

  // цена за ночь
  {
    const priceInput = domForm.querySelector('#price');
    // const MAX_VALUE = priceInput.getAttribute('max');

    priceInput.addEventListener('input', () => {
      // if( priceInput.value > MAX_VALUE ) {
      //   priceInput.setCustomValidity('Максимальное значение — 1000000');
      // } else {
      //   priceInput.setCustomValidity('');
      // }
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
