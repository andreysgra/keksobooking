import {disableForm, enableForm} from './utils.js';
import {setValidation, validateElement} from './validation.js';
import {offerPriceMin, Price} from './const.js';
import {uploadFailMessage, uploadSuccessMessage} from './messages.js';
import {sendData} from './api.js';
import {resetMap} from './map.js';

const adFormElement = document.querySelector('.ad-form');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const mapFiltersFormElement = document.querySelector('.map__filters');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');
const photoElement = adFormElement.querySelector('.ad-form__photo');
const avatarElement = adFormElement.querySelector('.ad-form-header__preview img');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
  photoElement.removeAttribute('style');
  avatarElement.src = 'img/muffin-grey.svg';
  resetMap();
};

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const addPhotoPreview = (file) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    photoElement.style.backgroundImage = `url(${reader.result})`;
  });

  reader.readAsDataURL(file);
};

const addAvatarPreview = (file) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    avatarElement.src = reader.result;
  });

  reader.readAsDataURL(file);
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

const onUploadPhotoChange = () => {
  const file = adFormElement.images.files[0];

  if (!isValidFileType(file)) {
    return;
  }

  addPhotoPreview(file);
};

const onUploadAvatarChange = () => {
  const file = adFormElement.avatar.files[0];

  if (!isValidFileType(file)) {
    return;
  }

  addAvatarPreview(file);
};

export const disableAdForm = () => disableForm(adFormElement, 'ad-form--disabled');

export const enableAdForm = () => {
  adFormElement.addEventListener('submit', onAdFormSubmit);
  adFormElement.timein.addEventListener('change', onTimeInChange);
  adFormElement.timeout.addEventListener('change', onTimeOutChange);
  adFormElement.type.addEventListener('change', onOfferTypeChange);
  adFormElement.price.addEventListener('input', onPriceInput);
  resetButtonElement.addEventListener('click', onAdFormReset);
  adFormElement.images.addEventListener('change', onUploadPhotoChange);
  adFormElement.avatar.addEventListener('change', onUploadAvatarChange);

  enableForm(adFormElement, 'ad-form--disabled');
};
