import {disableForm, enableForm} from './utils';
import {setValidation} from './validation';
import {offerPriceMin, Price} from './const';

const adFormElement = document.querySelector('.ad-form');
const sliderElement = adFormElement.querySelector('.ad-form__slider');

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
});

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

  enableForm(adFormElement, 'ad-form--disabled');
};
