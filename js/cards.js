const TEMPLATE_SELECTOR = '#card';
const TEMPLATE_BODY_SELECTOR = '.popup';
const TARGET_SELECTOR = '#map-canvas';

const typeRelationCyr = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const templateElement = document.querySelector(TEMPLATE_SELECTOR).content.querySelector(TEMPLATE_BODY_SELECTOR);
const target = document.querySelector(TARGET_SELECTOR);

const data = [];

const getNewCard = (cardData) => {

  const newCard = templateElement.cloneNode(true);
  const offer = cardData.offer || {};

  let el = null;
  let text = '';

  // title
  {
    el = newCard.querySelector('.popup__title');
    if( offer.title ) {
      el.textContent = offer.title;
    } else {
      el.classList.add('hidden');
    }
  }

  // address
  {
    el = newCard.querySelector('.popup__text--address');
    if( offer.address ) {
      el.textContent = offer.address;
    } else {
      el.classList.add('hidden');
    }
  }

  // price
  {
    el = newCard.querySelector('.popup__text--price');
    if( offer.price ) {
      el.textContent = `${offer.price} ₽/ночь`;
    } else {
      el.classList.add('hidden');
    }
  }

  // type
  {
    el = newCard.querySelector('.popup__type');
    text = typeRelationCyr[offer.type];
    if( text ) {
      el.textContent = text;
    } else {
      el.classList.add('hidden');
    }
  }

  // capacity
  {
    el = newCard.querySelector('.popup__text--capacity');
    text = '';

    if( offer.rooms && offer.guests ) {
      text = `${offer.rooms} комнаты для ${offer.guests} гостей`;

    } else if(offer.rooms) {
      text = `${offer.rooms} комнаты`;

    } else if(offer.guests) {
      text = `Вмещает ${offer.guests} гостей`;
    }

    if( text ) {
      el.textContent = text;
    } else {
      el.classList.add('hidden');
    }
  }

  // time
  {
    el = newCard.querySelector('.popup__text--time');
    text = '';

    if( offer.checkin && offer.checkout ) {
      text = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    } else if(offer.checkin) {
      text = `Заезд после ${offer.checkin}`;

    } else if(offer.checkout) {
      text = `Выезд до ${offer.checkout}`;
    }

    if( text ) {
      el.textContent = text;
    } else {
      el.classList.add('hidden');
    }
  }

  // features
  {
    if( offer.features ) {
      const featureSelectors = offer.features.map((feature) => `popup__feature--${feature}`);
      newCard.querySelectorAll('.popup__feature')
        .forEach((featureElement) => {
          if(featureSelectors.includes(featureElement.classList[1])) {
            featureElement.remove();
          }
        });
    }
  }

  // description
  {
    el = newCard.querySelector('.popup__description');
    if(offer.description) {
      el.textContent = offer.description;
    } else {
      el.classList.add('hidden');
    }
  }

  // photos
  {
    const photoBox = newCard.querySelector('.popup__photos');
    if(offer.photos) {
      const photoElement = photoBox.querySelector('.popup__photo');

      const photoFragment = document.createDocumentFragment();
      offer.photos.forEach((photoSrc) => {
        const newPhoto = photoElement.cloneNode();
        newPhoto.setAttribute('src', photoSrc);
        photoFragment.appendChild(newPhoto);
      });
      photoBox.appendChild(photoFragment);
      photoElement.remove();
    } else {
      photoBox.classList.add('hidden');
    }
  }

  // avatar
  {
    el = newCard.querySelector('.popup__avatar');

    if(cardData.author && cardData.author.avatar) {
      el.setAttribute('src', cardData.author.avatar);
    } else {
      el.classList.add('hidden');
    }
  }

  return newCard;
};

const renderAll = () => {
  const cardsFragment = document.createDocumentFragment();
  data.forEach((cardData) => cardsFragment.appendChild(getNewCard(cardData)));
  target.appendChild(cardsFragment);
};

const init = (_data) => {
  // only one!!
  data.push(_data[0]);
  // data.push(..._data);
  renderAll(data);
};


export {init};

