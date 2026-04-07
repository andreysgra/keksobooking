const FORM_SELECTORS = 'button, input, select, textarea';

export const getPlural = (count, words) => {
  const [one, few, many] = words;

  if (count % 100 >= 11 && count % 100 <= 14) {
    return many;
  }

  switch (count % 10) {
    case 1:
      return one;
    case 2:
    case 3:
    case 4:
      return few;
    default:
      return many;
  }
};

export const disableForm = (form, classDisable) => {
  form.querySelectorAll(FORM_SELECTORS)
    .forEach((element) => element.setAttribute('disabled', ''));

  form.classList.add(classDisable);
};

export const enableForm = (form, classDisable) => {
  form.querySelectorAll(FORM_SELECTORS)
    .forEach((element) => element.removeAttribute('disabled'));

  form.classList.remove(classDisable);
};
