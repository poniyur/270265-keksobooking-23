import {getRandomPositiveFloat, getRandomPositiveInt, getRandomValueFromArray, getRandomValuesFromArray} from './util.js';

let announceIndex = 0;
const location = {
  lat: 0,
  lng: 0,
};
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getAvatar = () => {
  const avatarNumber = (announceIndex < 10) ? `0${announceIndex}` : `${announceIndex}`;
  return `img/avatars/user${avatarNumber}.png`;
};

const getTitle = () => `Тестовый заголовок № ${announceIndex}`;

const generateLocation = () => {
  location.lat = getRandomPositiveFloat(35.65, 35.7, 5);
  location.lng = getRandomPositiveFloat(139.7, 139.8, 5);
};

const getAddress = () => `${location.lat}, ${location.lng}`;

const getPrice = () => getRandomPositiveInt(1, 99999);

const getType = () => getRandomValueFromArray(types);

const getRoom = () => getRandomPositiveInt(1, 10);

const getGuests = () => getRandomPositiveInt(1, 10);

const getCheckIn = () => getRandomValueFromArray(times);

const getCheckOut = () => getRandomValueFromArray(times);

const getFeatures = () => getRandomValuesFromArray(features);

const getDescription = () => `Тестовое описание помещения № ${announceIndex}`;

const getPhotos = () => getRandomValuesFromArray(photos);

const getLocation = () => location;

const getAnnounce = () => {
  announceIndex++;
  generateLocation();

  const result = {
    author: {
      avatar: getAvatar(),
    },
    offer: {
      title: getTitle(),
      address: getAddress(),
      price: getPrice(),
      type: getType(),
      room: getRoom(),
      guests: getGuests(),
      checkin: getCheckIn(),
      checkout: getCheckOut(),
      features:   getFeatures(),
      description: getDescription(),
      photos: getPhotos(),
    },
    location: getLocation(),
  };

  return result;
};

const generateTestData = (count = 10) => Array.from({length: count}, getAnnounce);

export {generateTestData};
