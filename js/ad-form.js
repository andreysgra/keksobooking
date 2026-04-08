import {disableForm, enableForm} from './utils';
import {setValidation, validateElement} from './validation';
import {offerPriceMin, Price} from './const';
import {uploadFailMessage, uploadSuccessMessage} from './messages';
import {sendData} from './api';
import {resetMap} from './map';

const adFormElement = document.querySelector('.ad-form');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const mapFiltersFormElement = document.querySelector('.map__filters');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');

noUiSlider.create(sliderElement, {
  range: {
    min: Price.MIN,
    max: Price.MAX
  },
  start: offerPriceMin.flat,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value)
  }
});

sliderElement.noUiSlider.on('update', () => {
  adFormElement.price.value = sliderElement.noUiSlider.get();
  validateElement(adFormElement.price);
});

const disableSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const enableSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const resetForms = () => {
  adFormElement.reset();
  mapFiltersFormElement.reset();
  sliderElement.noUiSlider.set(offerPriceMin.flat);
  resetMap();
};

const onFailUpload = () => uploadFailMessage();

const onSuccessUpload = () => {
  uploadSuccessMessage();
  resetForms();
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  if (setValidation()) {
    disableSubmitButton();

    sendData(onSuccessUpload, onFailUpload, new FormData(evt.target))
      .then(enableSubmitButton);
  }
};

const onAdFormReset = (evt) => {
  evt.preventDefault();

  resetForms();
};

const onOfferTypeChange = (evt) => {
  adFormElement.price.placeholder = offerPriceMin[evt.target.value];
  validateElement(adFormElement.price);
};

const onTimeInChange = (evt) => {
  adFormElement.timeout.value = evt.target.value;
};

const onTimeOutChange = (evt) => {
  adFormElement.timein.value = evt.target.value;
};

const onPriceInput = (evt) => {
  const price = Number(evt.target.value);

  sliderElement.noUiSlider.set(price);

  if (evt.target.value !== price) {
    evt.target.value = price;
  }
};

export const disableAdForm = () => disableForm(adFormElement, 'ad-form--disabled');

export const enableAdForm = () => {
  adFormElement.addEventListener('submit', onAdFormSubmit);
  adFormElement.timein.addEventListener('change', onTimeInChange);
  adFormElement.timeout.addEventListener('change', onTimeOutChange);
  adFormElement.type.addEventListener('change', onOfferTypeChange);
  adFormElement.price.addEventListener('input', onPriceInput);
  resetButtonElement.addEventListener('click', onAdFormReset);

  enableForm(adFormElement, 'ad-form--disabled');
};
