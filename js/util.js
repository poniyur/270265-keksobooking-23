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

const getRandomValueFromArray = (arr) => arr[getRandomNumber(0, arr.length -1)];

const getRandomValuesFromArray = (arr) => {
  const result = [...arr];
  const count = getRandomPositiveInt(1, result.length);
  while( result.length !== count ) {
    result.splice(getRandomNumber(0, result.length - 1), 1);
  }
  return result.sort(() => Math.random() - 0.5);
};

export {getRandomNumber, getRandomPositiveFloat, getRandomPositiveInt, getRandomValueFromArray, getRandomValuesFromArray};
