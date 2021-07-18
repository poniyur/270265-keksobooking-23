const URL = 'https://23.javascript.pages.academy/keksobooking/data';

const fetchNotices = () => fetch(URL)
  .then((response) => {
    if( response.ok ) {
      return response.json();
    } else {
      throw 'Упс! Мы сейчас не можем показать вам похожие объявления. Попробуйте обновить страницу попозже';
    }
  });

export {fetchNotices};
