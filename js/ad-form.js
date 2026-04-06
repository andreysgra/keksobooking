import {disableForm, enableForm} from './utils';
import {setValidation} from './validation';
import {offerPriceMin} from './const';

const adFormElement = document.querySelector('.ad-form');

const onAdFormSubmit = (evt) => {
  if (!setValidation()) {
    evt.preventDefault();
  }
};

const onOfferTypeChange = (evt) => {
  adFormElement.price.placeholder = offerPriceMin[evt.target.value];
};

const onTimeInChange = (evt) => {
  adFormElement.timeout.value = evt.target.value;
};

const onTimeOutChange = (evt) => {
  adFormElement.timein.value = evt.target.value;
};

export const disableAdForm = () => disableForm(adFormElement, 'ad-form--disabled');

export const enableAdForm = () => {
  adFormElement.addEventListener('submit', onAdFormSubmit);
  adFormElement.timein.addEventListener('change', onTimeInChange);
  adFormElement.timeout.addEventListener('change', onTimeOutChange);
  adFormElement.type.addEventListener('change', onOfferTypeChange);

  enableForm(adFormElement, 'ad-form--disabled');
};
