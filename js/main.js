// utils

const getRandomNumber = (min, max, precision = 0) => {
  // количество знаков не может быть меньше нуля
  if(precision < 0) {
    return NaN;
  }

  if( min > max ) {
    [min, max] = [max, min];
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
};

const getRandomPositiveFloat = (min, max, precision = 0) => {
  // генерируемые числа должны быть только в положительном промежутке
  if(min < 0 || max < 0 ) {
    return NaN;
  }
  return getRandomNumber(min, max, precision);
};

const getRandomPositiveInt = (min, max) =>  getRandomPositiveFloat(min, max);

getRandomNumber(4.444,-4.44444, 5);
getRandomPositiveFloat(1.11111, 10.99999, 5);
getRandomPositiveInt(1, 10);

const getRandomValueFromArray = (arr) => arr[getRandomNumber(0, arr.length -1)];

const getRandomValuesFromArray = (arr) => {
  const result = [...arr];
  const count = getRandomPositiveInt(1, result.length);
  while( result.length !== count ) {
    result.splice(getRandomNumber(0, result.length - 1), 1);
  }
  return result.sort(() => Math.random() - 0.5);
};


// генерация данных

const testAnnounceGenerator = () => {

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

    return {
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
  };

  return getAnnounce;
};
const generateTestData = () => Array.from({length: 10}, testAnnounceGenerator());

const mapData = generateTestData();
mapData;
