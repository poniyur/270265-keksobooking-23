import {submitForm} from './noticeForm.js';

const box = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const close = (event, element = undefined) => {

  if( element !== undefined ) {
    element.remove();
    return;
  }
  event.target.remove();
};

const report = (template) => {

  const newReport = template.cloneNode(true);
  box.appendChild(newReport);
  return newReport;
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


document.addEventListener('keydown', (event) => {
  if( event.key === 'Escape' || event.key === 'Esc') {
    const reportDiv = document.querySelector('body > div.error, body > div.success');
    if( reportDiv ) {
      close(null, reportDiv);
    }
  }
});

export {reportSuccess, reportError};
