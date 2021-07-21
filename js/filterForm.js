const MAX_COUNT = 10;
const form = document.querySelector('.map__filters');
let formData = new FormData(form);

const formFilters = {
  'housing-type' : (offer, filterValue) => {
    filterValue = filterValue.pop();
    if( filterValue === 'any' ) {
      return true;
    }

    return offer.type === filterValue;
  },

  'housing-price' : (offer, filterValue) => {
    filterValue = filterValue.pop();
    if( filterValue === 'any' ) {
      return true;
    }

    switch (filterValue) {
      case 'low':
        return offer.price < 10000;

      case 'middle':
        return offer.price >= 10000 && offer.price < 50000;

      case 'high':
        return offer.price >= 50000;

      default:
        return false;
    }
  },

  'housing-rooms' : (offer, filterValue) => {
    filterValue = filterValue.pop();
    if( filterValue === 'any' ) {
      return true;
    }

    return offer.rooms === +filterValue;
  },

  'housing-guests' : (offer, filterValue) => {
    filterValue = filterValue.pop();
    if( filterValue === 'any' ) {
      return true;
    }

    return offer.guests === +filterValue;
  },

  features: (offer, filterFeatures) => {
    if( filterFeatures === null ) {
      return true;
    }

    if( !offer.features ) {
      return false;
    }

    for( let index = 0; index < filterFeatures.length; index++ ) {
      if( offer.features.indexOf(filterFeatures[index]) === -1 ) {
        return false;
      }
    }
    return true;
  },
};

const checkOne = (offer) => {
  for( const filterName in formFilters ) {
    const filterFunc = formFilters[filterName];
    const check = filterFunc(offer, formData.getAll(filterName));
    if( !check ) {
      return false;
    }
  }
  return true;
};


const filterData = (data) => {

  const filteredData = [];
  let count = 0;
  formData = new FormData(form);

  for( let index = 0; index < data.length && count !== MAX_COUNT; index++ ) {
    if( checkOne(data[index].offer) ) {
      count++;
      filteredData.push(data[index]);
    }
  }

  return filteredData;
};

const activateFilterForm = (callback) => {
  form.querySelectorAll('select, input').forEach((formElement) => {
    formElement.addEventListener('change', callback);
  });
};

const resetFilterForm = () => {
  form.reset();
};

export {filterData, activateFilterForm, resetFilterForm};
