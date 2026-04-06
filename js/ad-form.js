import {disableForm, enableForm} from './utils';
import {setValidation} from './validation';

const adFormElement = document.querySelector('.ad-form');

const onAdFormSubmit = (evt) => {
  if (!setValidation()) {
    evt.preventDefault();
  }
};

export const disableAdForm = () => disableForm(adFormElement, 'ad-form--disabled');

export const enableAdForm = () => {
  adFormElement.addEventListener('submit', onAdFormSubmit);
  enableForm(adFormElement, 'ad-form--disabled');
};
