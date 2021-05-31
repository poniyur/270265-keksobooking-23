function getRandomIntInRange(min, max) {

  if( min < 0 || max <= 0 ) {
    return NaN;
  }

  if( min >= max ) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatInRange(min, max, precision) {

  if( min < 0 || max <= 0 ) {
    return NaN;
  }

  if( min >= max ) {
    return NaN;
  }

  if(precision < 0) {
    return NaN;
  }

  return (Math.random() * (max - min + 1) + min).toFixed(precision);
}

getRandomIntInRange(1, 10);
getRandomFloatInRange(1.11111, 10.99999, 5);
