const TEMPLATE_SELECTOR = '#card';
const TEMPLATE_BODY_SELECTOR = '.popup';
const TARGET_SELECTOR = '#map-canvas';

const typeRelation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const templateElement = document.querySelector(TEMPLATE_SELECTOR).content.querySelector(TEMPLATE_BODY_SELECTOR);
const target = document.querySelector(TARGET_SELECTOR);

let data = [];
let newCard = null;
let cardData = {};
let offer = {};

const setTitle = () => {
  const el = newCard.querySelector('.popup__title');

  if( !offer.title ) {
    el.classList.add('hidden');
    return;
  }

  el.textContent = offer.title;
};

const setAddress = () => {
  const el = newCard.querySelector('.popup__text--address');

  if( !offer.address ) {
    el.classList.add('hidden');
    return;
  }

  el.textContent = offer.address;
};

const setPrice = () => {
  const el = newCard.querySelector('.popup__text--price');

  if( !offer.price ) {
    el.classList.add('hidden');
    return;
  }

  el.textContent = `${offer.price} ₽/ночь`;
};

const setType = () => {
  const el = newCard.querySelector('.popup__type');
  const text = typeRelation[offer.type];
  if( !text ) {
    el.classList.add('hidden');
    return;
  }

  el.textContent = text;
};

const setCapacity = () => {
  const el = newCard.querySelector('.popup__text--capacity');
  let text = '';

  if( offer.rooms && offer.guests ) {
    text = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  } else if(offer.rooms) {
    text = `${offer.rooms} комнаты`;

  } else if(offer.guests) {
    text = `Вмещает ${offer.guests} гостей`;

  } else {
    el.classList.add('hidden');
    return;
  }

  el.textContent = text;
};

const setTime = () => {
  const el = newCard.querySelector('.popup__text--time');
  let text = '';

  if( offer.checkin && offer.checkout ) {
    text = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  } else if(offer.checkin) {
    text = `Заезд после ${offer.checkin}`;

  } else if(offer.checkout) {
    text = `Выезд до ${offer.checkout}`;

  } else {
    el.classList.add('hidden');
    return;
  }

  el.textContent = text;
};

const setFeatures = () => {
  const featureSelectors = offer.features.map((feature) => `popup__feature--${feature}`);
  newCard.querySelectorAll('.popup__feature')
    .forEach((featureElement) => {
      if(featureSelectors.includes(featureElement.classList[1])) {
        featureElement.remove();
      }
    });
};

const setDescription = () => {
  const el = newCard.querySelector('.popup__description');

  if(!offer.description) {
    el.classList.add('hidden');
    return;
  }

  el.textContent = offer.description;
};

const setPhotos = () => {
  const photoBox = newCard.querySelector('.popup__photos');

  if(!offer.photos) {
    photoBox.classList.add('hidden');
    return;
  }

  const photoElement = photoBox.querySelector('.popup__photo');

  const photoFragment = document.createDocumentFragment();
  offer.photos.forEach((photoSrc) => {
    const newPhoto = photoElement.cloneNode();
    newPhoto.setAttribute('src', photoSrc);
    photoFragment.appendChild(newPhoto);
  });
  photoBox.appendChild(photoFragment);
  photoElement.remove();
};

const setAvatar = () => {
  const el = newCard.querySelector('.popup__avatar');

  if(!cardData.author.avatar) {
    el.classList.add('hidden');
    return;
  }

  el.setAttribute('src', cardData.author.avatar);
};

const getNewCard = (_cardData) => {
  cardData = _cardData;
  offer = cardData.offer;

  newCard = templateElement.cloneNode(true);

  setTitle();
  setAddress();
  setPrice();
  setType();
  setCapacity();
  setTime();
  setFeatures();
  setDescription();
  setPhotos();
  setAvatar();

  return newCard;
};

const renderAll = () => {
  const cardsFragment = document.createDocumentFragment();
  data.forEach((_cardData) => cardsFragment.appendChild(getNewCard(_cardData)));
  target.appendChild(cardsFragment);
};

const init = (_data) => {
  // only one!!
  data = [_data[0]];
  // data = _data;
  renderAll();
};


export {init};

