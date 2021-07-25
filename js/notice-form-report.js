import {submitForm} from './notice-form.js';

const box = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
let escEventBool = false;

const escEvent = (event) => {
  if( event.key === 'Escape' || event.key === 'Esc') {
    const reportDiv = document.querySelector('body > div.error, body > div.success');
    if( reportDiv ) {
      reportDiv.remove();
      if( !document.querySelector('body > div.error, body > div.success') )  {
        document.removeEventListener('keydown', escEvent);
        escEventBool = false;
      }
    }
  }
};

const setEscEvent = () => {
  document.addEventListener('keydown', escEvent);
  escEventBool = true;
};

const removeEscEvent = () => {
  document.removeEventListener('keydown', escEvent);
  escEventBool = false;
};

const report = (template) => {

  const newReport = template.cloneNode(true);
  box.appendChild(newReport);

  if( !escEventBool ) {
    setEscEvent();
  }

  return newReport;
};

const close = (event, element = undefined) => {
  if( element !== undefined ) {
    element.remove();
    return;
  }
  event.target.remove();
  if( !document.querySelector('body > div.error, body > div.success') )  {
    removeEscEvent();
  }
};

const reportSuccess = () => {

  const newReport = report(successTemplate);
  newReport.style.cursor = 'pointer';

  newReport.addEventListener('click', close);
  setTimeout(() => {
    close(undefined, newReport);
  }, 3000);
};

const reportError = () => {
  const newReport = report(errorTemplate);
  newReport.style.cursor = 'pointer';

  newReport.addEventListener('click', (ev) => {
    if( ev.target.classList.contains('error__button') ) {
      close(undefined, newReport);
      submitForm();
    } else {
      close(undefined, newReport);
    }
  });
};

export {reportSuccess, reportError};
