const forms = [];

/*
  Регистрирует форму, возвращает её id, чтобы
  вызывать setInactive и setActive для отдельных форм, передавая их id
 */
const register = (config) => {
  const form = {};

  form.dom = document.querySelector(config.formSelector);
  form.interactiveElements = form.dom.querySelectorAll(config.interactiveElementSelectors.join(', '));
  form.inactiveClass = config.inactiveClass;

  forms.push(form);

  return forms.length - 1;
};

const setInactive = (formId) => {
  const form = forms[formId];
  form.dom.classList.add(form.inactiveClass);
  form.interactiveElements.forEach((el) => el.setAttribute('disabled', 'disabled'));
};

const setActive = (formId) => {
  const form = forms[formId];

  form.dom.classList.remove(form.inactiveClass);
};

const setActiveAll = () => {
  for(let id = 0; id < forms.length; ++id) {
    setActive(id);
  }
};

const setInactiveAll = () => {
  for(let id = 0; id < forms.length; ++id) {
    setInactive(id);
  }
};

export {setInactiveAll, setActiveAll, register};
