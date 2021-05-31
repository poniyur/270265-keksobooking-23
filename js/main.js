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
