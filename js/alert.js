const DEFAULT_TIME = 5000; // 5 secs

const TYPES = {
  ERROR: 'danger',
  SUCCESS: 'success',
};

const box = document.querySelector('.alerts');
const template = document.querySelector('#alert').content.querySelector('.alert');

const report = (text, type, time)  => {

  if( text === '' || !text ) {
    return;
  }

  const newAlert = template.cloneNode(true);

  newAlert.classList.add(`alerts__alert--${type}`);
  newAlert.querySelector('.alert__text').textContent = text;
  box.appendChild(newAlert);

  setTimeout(() => {
    newAlert.remove();
  }, time);
};

const reportUserError = (text, time = DEFAULT_TIME) => {
  report(text, TYPES.ERROR, time);
};

const reportUserSuccess = (text, time = DEFAULT_TIME) => {
  report(text, TYPES.SUCCESS, time);
};

export {reportUserError, reportUserSuccess};
